/**
 * HOME-V2 — home composition (/, /en, /ca). Encodes the checkable ACs:
 * B1 order + anchors · B2 H1 · B4 price rule · B5 removed sections · B7 routes.
 */
import { render, screen, within } from '@testing-library/react'
import { HomePage } from '@/components/pages/home'
import { getDictionary } from '@/lib/i18n/dictionary'
import { getPath } from '@/lib/i18n/routes'
import { LOCALES, type Locale } from '@/lib/i18n/types'

const renderHome = (locale: Locale) =>
  render(<HomePage dict={getDictionary(locale)} locale={locale} />)

/** AC-B4 — none of these may appear anywhere in the home markup. */
const PRICE_PATTERNS = [/€/, /2\.000/, /2,000/, /−10%/, /-10%/, /\boferta\b/i, /\boffer\b/i, /cuánto cuesta/i, /Inversión/]

describe.each(LOCALES)('HomePage (%s)', (locale) => {
  const dict = getDictionary(locale)
  const c = dict.home.landing

  it('renders 00–08 then the shared contact block, in order (AC-B1)', () => {
    const { container } = renderHome(locale)
    const indexes = [...container.querySelectorAll('.section-index span:first-child')].map((n) => n.textContent)
    expect(indexes).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08'])
    const last = container.lastElementChild as HTMLElement
    expect(last).toHaveAttribute('id', 'contacto')
    expect(last).toHaveClass('contact-page--section')
  })

  it('exposes every anchor an in-page CTA targets (AC-B1)', () => {
    const { container } = renderHome(locale)
    ;['inicio', 'te-suena', 'escenarios', 'alianza', 'contacto'].forEach((id) =>
      expect(container.querySelector(`#${id}`)).toBeInTheDocument(),
    )
    container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      expect(container.querySelector(a.getAttribute('href') as string)).toBeInTheDocument(),
    )
  })

  it('keeps the primary claim as the only H1, with the kicker below it (AC-B2)', () => {
    renderHome(locale)
    const [h1] = screen.getAllByRole('heading', { level: 1 })
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(h1).toHaveTextContent(c.hero.title1)
    expect(screen.getByText(c.hero.kicker)).toHaveClass('oport-hero__kicker')
  })

  it('hero CTAs: primary → #contacto, secondary → #te-suena; 5 dots, 2 filled', () => {
    const { container } = renderHome(locale)
    const hero = container.querySelector('#inicio') as HTMLElement
    expect(within(hero).getByRole('link', { name: c.hero.ctaPrimary })).toHaveAttribute('href', '#contacto')
    expect(within(hero).getByRole('link', { name: c.hero.ctaSecondary })).toHaveAttribute('href', '#te-suena')
    expect(hero.querySelectorAll('.oport-dots i')).toHaveLength(5)
    expect(hero.querySelectorAll('.oport-dots i.is-on')).toHaveLength(2)
  })

  it('contains no price, amount, currency, discount or offer wording (AC-B4)', () => {
    const { container } = renderHome(locale)
    PRICE_PATTERNS.forEach((re) => expect(container.textContent).not.toMatch(re))
    expect(container.querySelector('.oport-invest')).not.toBeInTheDocument()
  })

  it('never hands the /oportunidad slice (price/offer) to the client contact module (AC-B4)', async () => {
    const finalCta = await import('@/components/final-cta')
    const spy = vi.spyOn(finalCta, 'FinalCTA')
    renderHome(locale)
    const passed = spy.mock.calls.at(-1)?.[0].dict
    expect(passed).toBeDefined()
    expect(passed).not.toHaveProperty('oportunidad')
    spy.mockRestore()
  })

  it('evidence renders DAT.01/02/04/05 only, plus both case links (§B.3)', () => {
    const { container } = renderHome(locale)
    const labels = [...container.querySelectorAll('.home-evidence .readout__eyebrow')].map((n) =>
      n.textContent?.slice(0, 6),
    )
    expect(labels).toEqual(['DAT.01', 'DAT.02', 'DAT.04', 'DAT.05'])
    const chips = container.querySelectorAll<HTMLAnchorElement>('.home-evidence .client-chip a')
    expect([...chips].map((a) => a.getAttribute('href'))).toEqual([
      getPath('caseDetail', locale, { slug: 'magupell' }),
      getPath('caseDetail', locale, { slug: 'biozero' }),
    ])
  })

  it('section links + A fondo tiles resolve to localized routes (AC-B7)', () => {
    renderHome(locale)
    expect(screen.getByRole('link', { name: c.alliance.link })).toHaveAttribute('href', getPath('alliance', locale))
    expect(screen.getByRole('link', { name: c.about.link })).toHaveAttribute('href', getPath('about', locale))
    expect(screen.getByRole('link', { name: c.start.cta.secondary })).toHaveAttribute('href', getPath('method', locale))
    expect(screen.getByRole('link', { name: c.start.cta.primary })).toHaveAttribute('href', '#contacto')
    c.deepLinks.items.forEach((item) =>
      expect(screen.getByRole('link', { name: new RegExp(item.title) })).toHaveAttribute('href', getPath(item.page, locale)),
    )
  })

  it('removed sections do not render (AC-B5)', () => {
    const { container } = renderHome(locale)
    ;['.claims-marquee', '.phase-cycle', '.proof-timeline', '.service-list', '#problema', '#metodo'].forEach((sel) =>
      expect(container.querySelector(sel)).not.toBeInTheDocument(),
    )
  })
})

describe('HomePage — EN/CA parity', () => {
  it('EN/CA use the approved claims as H1', () => {
    expect(getDictionary('en').home.landing.hero.title1).toBe('We automate your business. We scale with you.')
    expect(getDictionary('ca').home.landing.hero.title1).toBe('Automatitzem el teu negoci. Escalem amb tu.')
  })
})
