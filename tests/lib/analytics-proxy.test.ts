/**
 * First-party analytics proxy tests — FEAT-01 R4 · AC-4 · AC-5.
 */
import { describe, expect, it, vi } from 'vitest'
import {
  buildUpstreamHeaders,
  forwardCollect,
  getClientIp,
} from '@/lib/analytics/proxy'
import { SAVRI_COLLECT_URL } from '@/lib/constants/analytics'
import { POST } from '@/app/io/api/collect/route'

const BEACON_BODY = JSON.stringify({ site: 'id', type: 'pageview', path: '/' })

describe('getClientIp', () => {
  it('takes the left-most X-Forwarded-For entry (the visitor)', () => {
    const h = new Headers({ 'x-forwarded-for': '81.0.0.1, 34.1.2.3' })
    expect(getClientIp(h)).toBe('81.0.0.1')
  })

  it('falls back to X-Real-IP', () => {
    expect(getClientIp(new Headers({ 'x-real-ip': '81.0.0.2' }))).toBe('81.0.0.2')
  })

  it('returns null when no IP header is present', () => {
    expect(getClientIp(new Headers())).toBeNull()
  })
})

describe('buildUpstreamHeaders', () => {
  it('relays the full XFF chain and sets X-Real-IP to the visitor (AC-5)', () => {
    const out = buildUpstreamHeaders(
      new Headers({ 'x-forwarded-for': '81.0.0.1, 34.1.2.3' }),
    )
    expect(out.get('x-forwarded-for')).toBe('81.0.0.1, 34.1.2.3')
    expect(out.get('x-real-ip')).toBe('81.0.0.1')
  })

  it('synthesises XFF from X-Real-IP when XFF is absent', () => {
    const out = buildUpstreamHeaders(new Headers({ 'x-real-ip': '81.0.0.2' }))
    expect(out.get('x-forwarded-for')).toBe('81.0.0.2')
  })

  it('passes user-agent / accept-language / referer through', () => {
    const out = buildUpstreamHeaders(
      new Headers({
        'user-agent': 'UA/1',
        'accept-language': 'ca-ES',
        referer: 'https://www.escaladigitalventures.com/ca',
      }),
    )
    expect(out.get('user-agent')).toBe('UA/1')
    expect(out.get('accept-language')).toBe('ca-ES')
    expect(out.get('referer')).toBe('https://www.escaladigitalventures.com/ca')
  })

  it('never forwards cookies', () => {
    const out = buildUpstreamHeaders(new Headers({ cookie: 'a=b' }))
    expect(out.get('cookie')).toBeNull()
  })

  it('defaults the content type to sendBeacon text/plain', () => {
    expect(buildUpstreamHeaders(new Headers()).get('content-type')).toBe(
      'text/plain;charset=UTF-8',
    )
  })
})

describe('forwardCollect', () => {
  it('POSTs the raw body, uncached, to the Savri collect endpoint only', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 202 }))
    const status = await forwardCollect(BEACON_BODY, new Headers(), fetchImpl)

    expect(status).toBe(202)
    expect(fetchImpl).toHaveBeenCalledWith(
      SAVRI_COLLECT_URL,
      expect.objectContaining({ method: 'POST', body: BEACON_BODY, cache: 'no-store' }),
    )
    expect(SAVRI_COLLECT_URL).toBe('https://besokskollen.se/api/collect')
  })

  it('maps network failures to 502 instead of throwing', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('down'))
    expect(await forwardCollect(BEACON_BODY, new Headers(), fetchImpl)).toBe(502)
  })
})

describe('POST /io/api/collect', () => {
  it('forwards upstream and answers 204, no-store, with no cookies', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 202 }))
    vi.stubGlobal('fetch', fetchMock)

    const res = await POST(
      new Request('https://www.escaladigitalventures.com/io/api/collect', {
        method: 'POST',
        body: BEACON_BODY,
        headers: { 'x-forwarded-for': '81.0.0.1', cookie: 'a=b' },
      }),
    )

    expect(res.status).toBe(204)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(res.headers.get('set-cookie')).toBeNull()
    const [, init] = fetchMock.mock.calls[0]
    expect(init.body).toBe(BEACON_BODY)
    expect((init.headers as Headers).get('cookie')).toBeNull()
    vi.unstubAllGlobals()
  })

  it('still answers 204 when upstream is down', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    const res = await POST(
      new Request('https://x/io/api/collect', { method: 'POST', body: BEACON_BODY }),
    )
    expect(res.status).toBe(204)
    vi.unstubAllGlobals()
  })
})
