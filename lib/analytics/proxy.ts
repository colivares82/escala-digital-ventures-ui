/**
 * First-party analytics proxy logic — FEAT-01 R4 / AC-5.
 *
 * Kept out of the route handler so it is pure and unit-testable. The handler
 * (app/io/api/collect/route.ts) is a thin adapter over `forwardCollect`.
 */
import { SAVRI_COLLECT_URL } from '@/lib/constants/analytics'

/** Request headers relayed verbatim to Savri. Cookies are NEVER forwarded. */
const PASSTHROUGH_HEADERS = ['user-agent', 'accept-language', 'referer'] as const

/** Fallback content type: the SDK uses sendBeacon, which sends text/plain. */
const DEFAULT_CONTENT_TYPE = 'text/plain;charset=UTF-8'

/**
 * Extracts the real visitor IP.
 *
 * Assumption: on Cloud Run the Google front end sets `X-Forwarded-For` to
 * "<client-ip>, <google-frontend-ip>" — the left-most entry is the visitor.
 * Same convention as app/api/contact/route.ts (rate limiter).
 */
export function getClientIp(headers: Headers): string | null {
  const first = headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (first) return first
  return headers.get('x-real-ip')?.trim() || null
}

/**
 * Builds the upstream headers so Savri geolocates the VISITOR, not our Cloud
 * Run region (AC-5): the full inbound X-Forwarded-For chain is relayed, and
 * X-Real-IP is set to the client IP for upstreams that prefer it.
 */
export function buildUpstreamHeaders(inbound: Headers): Headers {
  const out = new Headers()
  out.set('content-type', inbound.get('content-type') ?? DEFAULT_CONTENT_TYPE)

  for (const name of PASSTHROUGH_HEADERS) {
    const value = inbound.get(name)
    if (value) out.set(name, value)
  }

  const clientIp = getClientIp(inbound)
  if (clientIp) {
    out.set('x-forwarded-for', inbound.get('x-forwarded-for') ?? clientIp)
    out.set('x-real-ip', clientIp)
  }
  return out
}

/**
 * Relays one collect request upstream. The raw body is forwarded untouched —
 * sendBeacon posts JSON as text/plain, so it must not be re-parsed.
 * Returns the upstream status; network failures map to 502.
 */
export async function forwardCollect(
  body: string,
  inbound: Headers,
  fetchImpl: typeof fetch = fetch,
): Promise<number> {
  try {
    const res = await fetchImpl(SAVRI_COLLECT_URL, {
      method: 'POST',
      headers: buildUpstreamHeaders(inbound),
      body,
      cache: 'no-store',
    })
    return res.status
  } catch {
    return 502
  }
}
