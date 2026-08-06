/**
 * SiteHeader + SiteFooter tests.
 * Phase 5: SiteHeader and SiteFooter now require an `accessibility` prop.
 */
import { act, render, screen } from '@testing-library/react'
import { SiteHeader, SiteFooter } from '@/components/site-chrome'
import { sharedContent } from '@/content/es/shared'
import {
  HEADER_COMPACT_THRESHOLD_PX,
  HEADER_SCROLL_SHADOW_PX,
} from '@/lib/motion-constants'

const { header, footer, accessibility } = sharedContent

/** Simulate a scroll event at the given scrollY position. */
function simulateScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: y })
  window.dispatchEvent(new Event('scroll'))
}

describe('SiteHeader', () => {
  it('renders the brand name', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(screen.getByText('ESCALA')).toBeInTheDocument()
  })

  it('renders brand as a landmark link', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(
      screen.getByRole('link', { name: accessibility.homeLabel }),
    ).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    header.nav.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    })
  })

  it('renders the primary navigation landmark', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(
      screen.getByRole('navigation', {
        name: accessibility.primaryNavigation,
      }),
    ).toBeInTheDocument()
  })

  it('renders the locale switcher', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('CA')).toBeInTheDocument()
  })

  it('marks the first locale as the current page', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(screen.getByText('ES')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('EN')).not.toHaveAttribute('aria-current')
  })

  it('renders the contact CTA with correct text', () => {
    render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(screen.getByRole('link', { name: header.contact })).toBeInTheDocument()
  })

  // ── Scroll behavior ──────────────────────────────────────────────────────

  it('does not have is-scrolled class at the top of the page', () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} />)
    const headerEl = container.querySelector('.site-header')
    expect(headerEl).not.toHaveClass('is-scrolled')
  })

  it('adds is-scrolled class when scrolled past the shadow threshold', async () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} />)
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
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} />)
    expect(container.querySelector('.site-header')).not.toHaveClass('is-compact')
  })

  it('adds is-compact class when scrolling down past the threshold', async () => {
    // Start past threshold so the first scroll "down" triggers compact.
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: HEADER_COMPACT_THRESHOLD_PX })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} />)
    const headerEl = container.querySelector('.site-header')

    await act(async () => {
      simulateScroll(HEADER_COMPACT_THRESHOLD_PX + 40) // scroll down
      await new Promise((r) => setTimeout(r, 0))
    })

    expect(headerEl).toHaveClass('is-compact')
  })

  it('removes is-compact class when scrolling back up', async () => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: HEADER_COMPACT_THRESHOLD_PX + 40 })
    const { container } = render(<SiteHeader content={header} accessibility={accessibility} />)

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
