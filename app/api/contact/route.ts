/**
 * POST /api/contact — Spec SPEC-P2.6 FR-3
 *
 * Pipeline:
 *   1. Per-IP in-memory rate limit (5/min; TODO(P6): swap to Redis/Upstash)
 *   2. Parse JSON body
 *   3. Honeypot check — filled → 200 without sending (silent reject, FR-3.4)
 *   4. Server-side validation (never trust the client, FR-3.2)
 *   5. sendContactNotification → notification email to CONTACT_TO
 *
 * Security notes (FR-3.5):
 *   - No PII logged beyond what's needed to debug provider errors
 *   - Field-enumeration not exposed in 400 responses
 *   - Gmail address never referenced here — only in CONTACT_TO env var
 */

import { type NextRequest, NextResponse } from 'next/server'
import {
  sendContactConfirmation,
  sendContactNotification,
} from '@/lib/email'

// Explicit Node.js runtime — required for Cloud Run compatibility (FR-3.1).
// Default in Next.js App Router, made explicit for future deployment clarity.
export const runtime = 'nodejs'

// ─── Rate limiter ─────────────────────────────────────────────────────────────
// In-memory token bucket per IP.
// TODO(P6): swap to durable store (Redis/Upstash) — Cloud Run instances are
// ephemeral, so this counter resets on cold-start. Acceptable pre-launch.

const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT_PER_MIN ?? '5', 10)
const ipBuckets = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = ipBuckets.get(ip)

  if (!bucket || now >= bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT) return false

  bucket.count += 1
  return true
}

// ─── Per-address limiter (SPEC-contact-email §5.4) ───────────────────────────
// The auto-confirmation means a valid submission sends mail to an address the
// submitter controls. Without a per-address cap, the form could be used to
// deliver repeated mail to a third party. Max 3 per address per 24h.
//
// KNOWN LIMITATION — accepted, do not "fix": Cloud Run is scale-to-zero, so
// this in-memory counter resets on cold start. At current traffic, in-memory
// plus the existing honeypot is proportionate. Deliberately NOT introducing
// Firestore/Redis for this.

const ADDRESS_WINDOW_MS = 24 * 60 * 60 * 1000
const ADDRESS_LIMIT = 3
const addressBuckets = new Map<string, { count: number; resetAt: number }>()

function checkAddressLimit(email: string): boolean {
  const key = email.toLowerCase()
  const now = Date.now()
  const bucket = addressBuckets.get(key)

  if (!bucket || now >= bucket.resetAt) {
    addressBuckets.set(key, { count: 1, resetAt: now + ADDRESS_WINDOW_MS })
    return true
  }
  if (bucket.count >= ADDRESS_LIMIT) return false

  bucket.count += 1
  return true
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LEN = 20

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // IP for rate limiting — injected by Cloud Run/proxy; fallback for local dev
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return badRequest('Invalid request body')
  }

  // ── Honeypot ────────────────────────────────────────────────────────────────
  // Filled → silent 200, no email sent. Prevents tipping off automated bots
  // (they receive the same response as a legitimate submission). FR-3.4.
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  // ── Server-side validation ──────────────────────────────────────────────────
  const name = String(body.name ?? '').trim()
  const company = String(body.company ?? '').trim()
  const email = String(body.email ?? '').trim()
  const blocker = String(body.blocker ?? '').trim()
  const consent = body.consent === true

  if (!name) return badRequest('name is required')
  if (!company) return badRequest('company is required')
  if (!email) return badRequest('email is required')
  if (!EMAIL_RE.test(email)) return badRequest('email format is invalid')
  if (blocker.length < MIN_MESSAGE_LEN)
    return badRequest(`blocker must be at least ${MIN_MESSAGE_LEN} characters`)
  if (!consent) return badRequest('consent is required')

  // ── Per-address limit (§5.4) ────────────────────────────────────────────────
  // Checked after validation so only well-formed addresses consume quota.
  if (!checkAddressLimit(email)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const payload = {
    name,
    company,
    email,
    blocker,
    locale: String(body.locale ?? 'es'),
    timestamp: new Date().toISOString(),
  }

  // ── 1. Notification — MUST succeed (§5.2) ───────────────────────────────────
  // A failure here means the lead is lost, so the user sees an error and the
  // existing error UI offers the direct address as a fallback. Never show
  // success over a lost lead.
  try {
    await sendContactNotification(payload)
  } catch (err) {
    // Log server-side only — response contains no PII or internal detail (FR-3.5)
    console.error(
      '[contact/api] sendContactNotification failed:',
      err instanceof Error ? err.message : String(err),
    )
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 })
  }

  // ── 2. Confirmation — best effort (§5.2) ────────────────────────────────────
  // The lead is already safe. A failed courtesy email is logged and swallowed:
  // it is not worth failing the request the visitor sees.
  try {
    await sendContactConfirmation(payload)
  } catch (err) {
    console.error(
      '[contact/api] sendContactConfirmation failed (non-fatal):',
      err instanceof Error ? err.message : String(err),
    )
  }

  return NextResponse.json({ ok: true })
}
