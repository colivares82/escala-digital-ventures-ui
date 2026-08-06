/**
 * Email provider abstraction — Spec SPEC-P2.6 FR-4.1
 *
 * sendContactNotification(payload) dispatches the notification email to the
 * internal recipient via the configured provider (default: Resend).
 * Uses native fetch — no additional npm dependency.
 *
 * Config (all via env — NEVER hardcoded):
 *   EMAIL_PROVIDER          = 'resend'                     (default: 'resend')
 *   EMAIL_API_KEY           = <provider key>
 *   CONTACT_TO              = <internal inbox>             (server-only, never in client code)
 *   CONTACT_FROM            = hola@escaladigitalventures.com (becomes verified in Phase 6)
 *   CONTACT_SUBJECT_PREFIX  = [Escala · Contacto]
 *
 * DRY_RUN mode (EMAIL_DRY_RUN=true OR no EMAIL_API_KEY): logs the payload instead of sending.
 * Phase 6 domain flip: change CONTACT_FROM + provider domain — ZERO code change needed.
 *
 * Honeypot decision: the server returns 200 without sending (FR-3.4 — does not reveal
 * rejection to automated scanners). This is documented in DECISIONS.md.
 */

export interface ContactPayload {
  name: string
  company: string
  email: string
  blocker: string
  locale?: string
  timestamp?: string
}

// ─── Env config ───────────────────────────────────────────────────────────────

const CONTACT_TO = process.env.CONTACT_TO
const CONTACT_FROM = process.env.CONTACT_FROM ?? 'onboarding@resend.dev'
const API_KEY = process.env.EMAIL_API_KEY
const SUBJECT_PREFIX =
  process.env.CONTACT_SUBJECT_PREFIX ?? '[Escala · Contacto]'

// DRY_RUN when explicitly enabled or when no API key exists (safe local dev)
const IS_DRY_RUN = process.env.EMAIL_DRY_RUN === 'true' || !API_KEY

// ─── Resend provider ──────────────────────────────────────────────────────────

async function sendViaResend(payload: ContactPayload): Promise<void> {
  const subject = `${SUBJECT_PREFIX} ${payload.company} — ${payload.name}`
  const ts = payload.timestamp ?? new Date().toISOString()

  const html = `
<p><strong>Nombre:</strong> ${payload.name}</p>
<p><strong>Empresa:</strong> ${payload.company}</p>
<p><strong>Email:</strong> ${payload.email}</p>
<p><strong>¿Qué frena su crecimiento?</strong></p>
<blockquote style="border-left:3px solid #FFB703;margin:0;padding-left:1em">
  ${payload.blocker}
</blockquote>
<hr/>
<p style="color:#888;font-size:12px">
  Locale: ${payload.locale ?? 'es'} · Fecha: ${ts}
</p>
`.trim()

  const text = [
    `Nombre:  ${payload.name}`,
    `Empresa: ${payload.company}`,
    `Email:   ${payload.email}`,
    '',
    '¿Qué frena su crecimiento?',
    payload.blocker,
    '',
    `Locale: ${payload.locale ?? 'es'}`,
    `Fecha:  ${ts}`,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: payload.email, // Carlos replies directly to the visitor
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend error ${res.status}: ${detail}`)
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Sends a contact notification email to the internal recipient (CONTACT_TO).
 *
 * In DRY_RUN mode (no API key or EMAIL_DRY_RUN=true): logs a well-formed
 * notification payload instead of calling the provider — safe for local dev.
 *
 * Throws on provider failure. The API route converts the thrown error to a 502.
 */
export async function sendContactNotification(
  payload: ContactPayload,
): Promise<void> {
  if (IS_DRY_RUN) {
    // DRY_RUN: no provider call — log so the integration can be verified locally.
    // No PII in production logs (this branch never runs in production).
    console.log(
      '[email:DRY_RUN] sendContactNotification',
      JSON.stringify(
        { ...payload, email: '[redacted-for-log]' },
        null,
        2,
      ),
    )
    return
  }

  if (!CONTACT_TO) {
    throw new Error(
      'CONTACT_TO env var is missing — cannot send notification email',
    )
  }

  const provider = process.env.EMAIL_PROVIDER ?? 'resend'
  switch (provider) {
    case 'resend':
      await sendViaResend(payload)
      break
    // TODO(P6): case 'sendgrid': await sendViaSendGrid(payload); break
    default:
      throw new Error(`Unknown EMAIL_PROVIDER: "${provider}"`)
  }
}
