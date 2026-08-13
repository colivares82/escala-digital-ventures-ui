/**
 * SiteHeader + SiteFooter tests.
 * Phase 5: SiteHeader and SiteFooter now require an `accessibility` prop.
 * SPEC-POLISH-07: SiteHeader now requires an `email` prop (mobile overlay foot).
 */
import { act, render, screen } from '@testing-library/react'
import { SiteHeader, SiteFooter } from '@/components/site-chrome'
import { sharedContent } from '@/content/es/shared'
import {
  HEADER_COMPACT_THRESHOLD_PX,
  HEADER_SCROLL_SHADOW_PX,
} from '@/lib/motion-constants'

const { header, footer, accessibility, finalCta } = sharedContent
const email = finalCta.email

/** Simulate a scroll event at the given scrollY position. */
function simulateScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: y })
  window.dispatchEvent(new Event('scroll'))
}

describe('SiteHeader', () => {
  it('renders the brand name', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(screen.getByText('ESCALA')).toBeInTheDocument()
  })

  it('renders brand as a landmark link', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(
      screen.getAllByRole('link', { name: accessibility.homeLabel })[0],
    ).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    header.nav.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    })
  })

  it('renders the primary navigation landmark', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(
      screen.getByRole('navigation', {
        name: accessibility.primaryNavigation,
      }),
    ).toBeInTheDocument()
  })

  it('renders the locale switcher', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('CA')).toBeInTheDocument()
  })

  it('marks the first locale as the current page', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(screen.getByText('ES')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('EN')).not.toHaveAttribute('aria-current')
  })

  it('renders the contact CTA with correct text', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(screen.getByRole('link', { name: header.contact })).toBeInTheDocument()
  })

  it('renders the desktop nav separators as decorative (aria-hidden, not in any link name)', () => {
    const { container } = render(
      <SiteHeader content={header} accessibility={accessibility} email={email} />,
    )
    const seps = container.querySelectorAll('.site-header__sep')
    // 5 nav items → 4 separators between them.
    expect(seps).toHaveLength(header.nav.length - 1)
    seps.forEach((sep) => {
      expect(sep).toHaveAttribute('aria-hidden', 'true')
    })
    header.nav.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label }).textContent).toBe(item.label)
    })
  })

  it('renders a dimensioned brand slot', () => {
    const { container } = render(
      <SiteHeader content={header} accessibility={accessibility} email={email} />,
    )
    expect(container.querySelector('.site-brand')).toBeInTheDocument()
  })

  it('renders the mobile menu trigger with correct ARIA wiring', () => {
    render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    const trigger = screen.getByRole('button', { name: accessibility.menuOpen })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  // ── Regression: bugs found in live QA after initial POLISH-07 ship ────────

  it('gives the primary nav its own scoping class, distinct from any other <nav> in the header (locale switcher / overlay)', () => {
    // Regression for: `.site-header nav` (bare descendant selector) matched
    // EVERY <nav> in the header, zeroing the locale switcher's gap (CSS) and,
    // while MobileMenu still lived inside <header>, hiding the overlay's own
    // <nav> below 1024px. The primary nav must carry a class no other <nav>
    // in the header shares.
    const { container } = render(
      <SiteHeader content={header} accessibility={accessibility} email={email} />,
    )
    const primaryNav = container.querySelector('nav.site-header__nav')
    expect(primaryNav).toBeInTheDocument()
    // The locale switcher is also a <nav> inside the header — it must NOT
    // carry the primary-nav class (that was the source of the leak).
    const localeNav = container.querySelector('.locale-switcher')
    expect(localeNav).not.toHaveClass('site-header__nav')
  })

  it('renders the open MobileMenu as a sibling of <header>, not a descendant', async () => {
    // Regression: MobileMenu used to be the last child of <header>, so any
    // `.site-header ...` descendant rule (e.g. hiding nav below 1024px) could
    // reach into the overlay. Open the menu and confirm #mobile-menu is NOT
    // nested inside <header> — it must render outside it.
    const { container } = render(
      <SiteHeader content={header} accessibility={accessibility} email={email} />,
    )
    const trigger = screen.getByRole('button', { name: accessibility.menuOpen })
    await act(async () => {
      trigger.click()
    })

    const headerEl = container.querySelector('header.site-header')
    const overlay = container.querySelector('#mobile-menu')
    expect(headerEl).not.toBeNull()
    expect(overlay).not.toBeNull()
    expect(headerEl!.contains(overlay)).toBe(false)
  })

  it('renders the brand wordmark inside the open mobile overlay, not just the symbol', async () => {
    // Regression: the overlay's brand slot rendered only the 3-square symbol
    // and dropped the "ESCALA" wordmark text entirely.
    const { container } = render(
      <SiteHeader content={header} accessibility={accessibility} email={email} />,
    )
    const trigger = screen.getByRole('button', { name: accessibility.menuOpen })
    await act(async () => {
      trigger.click()
    })

    const overlayBrand = container.querySelector('.mobile-menu__brand-slot')
    expect(overlayBrand).not.toBeNull()
    expect(overlayBrand!.textContent).toContain(header.brand)
  })

  // ── Scroll behavior ──────────────────────────────────────────────────────

  it('does not have is-scrolled class at the top of the page', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    const headerEl = container.querySelector('.site-header')
    expect(headerEl).not.toHaveClass('is-scrolled')
  })

  it('adds is-scrolled class when scrolled past the shadow threshold', async () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    const headerEl = container.querySelector('.site-header')

    await act(async () => {
      simulateScroll(HEADER_SCROLL_SHADOW_PX + 1)
      // Let rAF (mocked to fire immediately) flush
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(headerEl).toHaveClass('is-scrolled')
  })

  it('does not have is-compact class at top of page', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    expect(container.querySelector('.site-header')).not.toHaveClass('is-compact')
  })

  it('adds is-compact class when scrolling down past the threshold', async () => {
    // Start past threshold so the first scroll "down" triggers compact.
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: HEADER_COMPACT_THRESHOLD_PX })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} email={email} />)
    const headerEl = container.querySelector('.site-header')

    await act(async () => {
      simulateScroll(HEADER_COMPACT_THRESHOLD_PX + 40) // scroll down
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(headerEl).toHaveClass('is-compact')
  })

  it('removes is-compact class when scrolling back up', async () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: HEADER_COMPACT_THRESHOLD_PX + 40 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} email={email} />)

    // First scroll down to activate compact.
    await act(async () => {
      simulateScroll(HEADER_COMPACT_THRESHOLD_PX + 80)
      await new Promise((r) => setTimeout(r, 0))
    })

    // Then scroll up.
    await act(async () => {
      simulateScroll(HEADER_COMPACT_THRESHOLD_PX + 20)
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(container.querySelector('.site-header')).not.toHaveClass('is-compact')
  })
})

describe('SiteFooter', () => {
  it('renders the primary claim', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    expect(screen.getByText(footer.claim)).toBeInTheDocument()
  })

  it('renders the company line', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    expect(screen.getByText(footer.company)).toBeInTheDocument()
  })

  it('renders the direction reference (no link)', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    expect(screen.getByText(footer.direction)).toBeInTheDocument()
  })

  it('renders all footer navigation links', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    footer.navigation.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    })
  })

  it('renders the footer navigation landmark', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    expect(
      screen.getByRole('navigation', {
        name: accessibility.footerNavigation,
      }),
    ).toBeInTheDocument()
  })

  it('renders both legal links with correct hrefs', () => {
    render(<SiteFooter content={footer} accessibility={accessibility} />)
    const legal = footer.legal
    legal.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.href,
      )
    })
  })
})
