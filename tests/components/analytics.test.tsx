/**
 * Analytics components — FEAT-01 §3 · R1 · D5.
 *   - TrackedLink: byte-identical <a>, emits one event per click.
 *   - AnalyticsRuntime: mounts SavriProvider on prod hosts only, auto-tracking off.
 *   - LocaleSwitcher: Locale Switch {from, to}; none for the active locale.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const providerSpy = vi.fn()
vi.mock('@savri/tracker', () => ({ trackEvent: vi.fn() }))
vi.mock('@savri/tracker/react', () => ({
  SavriProvider: (props: { children: ReactNode }) => {
    providerSpy(props)
    return <div data-testid="savri-provider">{props.children}</div>
  },
}))
vi.mock('@/lib/constants/analytics', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/constants/analytics')>()),
  SAVRI_SITE_ID: 'test-site-id',
}))

import { trackEvent as savriTrackEvent } from '@savri/tracker'
import { AnalyticsRuntime } from '@/components/analytics/analytics-runtime'
import { TrackedLink } from '@/components/analytics/tracked-link'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ANALYTICS_EVENTS, ANALYTICS_LOCATIONS } from '@/lib/constants/analytics'

const PROD = 'https://www.escaladigitalventures.com'

function setLocation(url: string) {
  vi.stubGlobal('location', new URL(url))
}

beforeEach(() => {
  vi.mocked(savriTrackEvent).mockClear()
  providerSpy.mockClear()
})
afterEach(() => vi.unstubAllGlobals())

describe('TrackedLink', () => {
  it('renders exactly the same <a> as a plain anchor (no DOM delta)', () => {
    const { container: tracked } = render(
      <TrackedLink
        event={ANALYTICS_EVENTS.CTA_CLICK}
        location={ANALYTICS_LOCATIONS.HEADER}
        className="header-cta"
        href="#contacto"
        aria-current="page"
      >
        Hablemos
      </TrackedLink>,
    )
    const { container: plain } = render(
      <a className="header-cta" href="#contacto" aria-current="page">
        Hablemos
      </a>,
    )
    expect(tracked.innerHTML).toBe(plain.innerHTML)
  })

  it('emits the event with location + locale on click in production', async () => {
    setLocation(`${PROD}/en/what-we-do`)
    render(
      <TrackedLink
        event={ANALYTICS_EVENTS.EMAIL_CLICK}
        location={ANALYTICS_LOCATIONS.FOOTER}
        href="mailto:hola@escaladigitalventures.com"
      >
        hola
      </TrackedLink>,
    )
    await userEvent.click(screen.getByRole('link', { name: 'hola' }))
    expect(savriTrackEvent).toHaveBeenCalledTimes(1)
    expect(savriTrackEvent).toHaveBeenCalledWith('Email Click', {
      location: 'footer',
      locale: 'en',
    })
  })

  it('still runs a caller-supplied onClick', async () => {
    setLocation(`${PROD}/`)
    const onClick = vi.fn()
    render(
      <TrackedLink
        event={ANALYTICS_EVENTS.CTA_CLICK}
        location={ANALYTICS_LOCATIONS.MOBILE_MENU}
        href="#x"
        onClick={onClick}
      >
        cta
      </TrackedLink>,
    )
    await userEvent.click(screen.getByRole('link', { name: 'cta' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(savriTrackEvent).toHaveBeenCalledTimes(1)
  })

  it('sends nothing on localhost (AC-2)', async () => {
    setLocation('http://localhost:3000/')
    render(
      <TrackedLink event={ANALYTICS_EVENTS.CTA_CLICK} location="hero" href="#contacto">
        cta
      </TrackedLink>,
    )
    await userEvent.click(screen.getByRole('link', { name: 'cta' }))
    expect(savriTrackEvent).not.toHaveBeenCalled()
  })
})

describe('AnalyticsRuntime', () => {
  it('mounts SavriProvider via the first-party proxy with auto-tracking off (D4/D5)', () => {
    setLocation(`${PROD}/`)
    render(<AnalyticsRuntime><p>page</p></AnalyticsRuntime>)

    expect(screen.getByTestId('savri-provider')).toBeInTheDocument()
    expect(screen.getByText('page')).toBeInTheDocument()
    const props = providerSpy.mock.calls.at(-1)?.[0]
    expect(props).toMatchObject({ siteId: 'test-site-id', apiUrl: '/io' })
    for (const flag of ['trackForms', 'trackOutboundLinks', 'trackFileDownloads', 'trackScrollDepth']) {
      expect(props[flag]).toBeUndefined()
    }
  })

  it.each(['http://localhost:3000/', 'https://escala-web-dev-x-ew.a.run.app/'])(
    'renders children without the provider on %s (AC-2)',
    (url) => {
      setLocation(url)
      render(<AnalyticsRuntime><p>page</p></AnalyticsRuntime>)
      expect(screen.getByText('page')).toBeInTheDocument()
      expect(screen.queryByTestId('savri-provider')).not.toBeInTheDocument()
      expect(providerSpy).not.toHaveBeenCalled()
    },
  )
})

describe('LocaleSwitcher — Locale Switch event', () => {
  it('emits {from, to} when switching locale', async () => {
    setLocation(`${PROD}/que-hacemos`)
    render(<LocaleSwitcher currentPage="services" locale="es" languagesLabel="Idiomas" />)
    await userEvent.click(screen.getByRole('link', { name: 'CA' }))
    expect(savriTrackEvent).toHaveBeenCalledWith('Locale Switch', { from: 'es', to: 'ca' })
  })

  it('emits nothing when clicking the active locale', async () => {
    setLocation(`${PROD}/que-hacemos`)
    render(<LocaleSwitcher currentPage="services" locale="es" languagesLabel="Idiomas" />)
    await userEvent.click(screen.getByRole('link', { name: 'ES' }))
    expect(savriTrackEvent).not.toHaveBeenCalled()
  })
})
