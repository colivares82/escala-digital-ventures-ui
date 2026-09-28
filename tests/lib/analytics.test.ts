/**
 * lib/analytics facade tests — FEAT-01 R1 · D3 · D6.
 *
 * The SDK is mocked: these tests assert the gate, never real network traffic.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@savri/tracker', () => ({ trackEvent: vi.fn() }))
vi.mock('@/lib/constants/analytics', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/constants/analytics')>()),
  SAVRI_SITE_ID: 'test-site-id',
}))

import { trackEvent as savriTrackEvent } from '@savri/tracker'
import {
  getCurrentLocale,
  getLocaleFromPath,
  isAnalyticsEnabled,
  isAnalyticsEnabledInBrowser,
  trackEvent,
} from '@/lib/analytics'
import { ANALYTICS_EVENTS } from '@/lib/constants/analytics'

const PROD_HOST = 'www.escaladigitalventures.com'

function setLocation(url: string) {
  vi.stubGlobal('location', new URL(url))
}

beforeEach(() => vi.mocked(savriTrackEvent).mockClear())
afterEach(() => vi.unstubAllGlobals())

describe('isAnalyticsEnabled (R1 — production hostnames only)', () => {
  it.each([PROD_HOST, 'escaladigitalventures.com'])('enables on %s', (host) => {
    expect(isAnalyticsEnabled(host, 'id')).toBe(true)
  })

  it.each([
    'localhost',
    '127.0.0.1',
    'escala-web-dev-abc123-ew.a.run.app',
    'escala-web-prod-abc123-ew.a.run.app',
    'dev.escaladigitalventures.com',
    'escaladigitalventures.com.evil.io',
  ])('disables on %s', (host) => {
    expect(isAnalyticsEnabled(host, 'id')).toBe(false)
  })

  it('fails closed on a production host when the site ID is empty', () => {
    expect(isAnalyticsEnabled(PROD_HOST, '')).toBe(false)
  })
})

describe('isAnalyticsEnabledInBrowser', () => {
  it('reads window.location.hostname', () => {
    setLocation(`https://${PROD_HOST}/`)
    expect(isAnalyticsEnabledInBrowser()).toBe(true)
    setLocation('http://localhost:3000/')
    expect(isAnalyticsEnabledInBrowser()).toBe(false)
  })
})

describe('getLocaleFromPath', () => {
  it.each([
    ['/', 'es'],
    ['/contacto', 'es'],
    ['/en', 'en'],
    ['/en/what-we-do', 'en'],
    ['/ca/que-fem', 'ca'],
    ['/es', 'es'],
    ['/english-page', 'es'],
    ['', 'es'],
  ])('%s → %s', (path, expected) => {
    expect(getLocaleFromPath(path)).toBe(expected)
  })

  it('getCurrentLocale uses window.location.pathname', () => {
    setLocation(`https://${PROD_HOST}/ca/contacte`)
    expect(getCurrentLocale()).toBe('ca')
  })
})

describe('trackEvent (gated)', () => {
  it('forwards to the SDK on a production host', () => {
    setLocation(`https://${PROD_HOST}/`)
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'header', locale: 'es' })
    expect(savriTrackEvent).toHaveBeenCalledWith('CTA Click', {
      location: 'header',
      locale: 'es',
    })
  })

  it('is a silent no-op on localhost (AC-2)', () => {
    setLocation('http://localhost:3000/')
    trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'header', locale: 'es' })
    expect(savriTrackEvent).not.toHaveBeenCalled()
  })

  it('is a silent no-op on the dev Cloud Run URL (AC-2)', () => {
    setLocation('https://escala-web-dev-abc123-ew.a.run.app/')
    trackEvent(ANALYTICS_EVENTS.EMAIL_CLICK, { location: 'footer', locale: 'es' })
    expect(savriTrackEvent).not.toHaveBeenCalled()
  })
})
