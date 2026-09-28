/**
 * POST /io/api/collect — first-party proxy for the Savri collect endpoint.
 * FEAT-01 D4 · R4 · AC-4 · AC-5
 *
 * The SDK is configured with apiUrl `/io` and appends `/api/collect` itself,
 * so this is the ONLY path it calls. Forwarding logic: lib/analytics/proxy.ts.
 *
 * - Never cached (force-dynamic + no-store) so requests are never merged.
 * - Sets no cookies; forwards none.
 * - Always answers 204 to the browser: sendBeacon ignores the response, and
 *   echoing upstream errors would only leak implementation detail.
 */
import { forwardCollect } from '@/lib/analytics/proxy'

// Explicit Node.js runtime — same as app/api/contact (Cloud Run compatibility).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

export async function POST(request: Request): Promise<Response> {
  const body = await request.text()
  await forwardCollect(body, request.headers)
  return new Response(null, { status: 204, headers: NO_STORE_HEADERS })
}
