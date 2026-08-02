import { render, screen } from '@testing-library/react'
import { SiteHeader, SiteFooter } from '@/components/site-chrome'
import { sharedContent } from '@/content/es/shared'

const { header, footer } = sharedContent

describe('SiteHeader', () => {
  it('renders the brand name', () => {
    render(<SiteHeader content={header} />)
    expect(screen.getByText('ESCALA')).toBeInTheDocument()
  })

  it('renders brand as a landmark link', () => {
    render(<SiteHeader content={header} />)
    expect(
      screen.getByRole('link', { name: sharedContent.accessibility.homeLabel }),
    ).toBeInTheDocument()
  })

  it('renders all navigation items', () => {
    render(<SiteHeader content={header} />)
    header.nav.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    })
  })

  it('renders the primary navigation landmark', () => {
    render(<SiteHeader content={header} />)
    expect(
      screen.getByRole('navigation', {
        name: sharedContent.accessibility.primaryNavigation,
      }),
    ).toBeInTheDocument()
  })

  it('renders the locale switcher', () => {
    render(<SiteHeader content={header} />)
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
    expect(screen.getByText('CA')).toBeInTheDocument()
  })

  it('marks the first locale as the current page', () => {
    render(<SiteHeader content={header} />)
    expect(screen.getByText('ES')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('EN')).not.toHaveAttribute('aria-current')
  })

  it('renders the contact CTA with correct text', () => {
    render(<SiteHeader content={header} />)
    expect(screen.getByRole('link', { name: header.contact })).toBeInTheDocument()
  })
})

describe('SiteFooter', () => {
  it('renders the primary claim', () => {
    render(<SiteFooter content={footer} />)
    expect(screen.getByText(footer.claim)).toBeInTheDocument()
  })

  it('renders the company line', () => {
    render(<SiteFooter content={footer} />)
    expect(screen.getByText(footer.company)).toBeInTheDocument()
  })

  it('renders the direction reference (no link)', () => {
    render(<SiteFooter content={footer} />)
    expect(screen.getByText(footer.direction)).toBeInTheDocument()
  })

  it('renders all footer navigation links', () => {
    render(<SiteFooter content={footer} />)
    footer.navigation.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument()
    })
  })

  it('renders the footer navigation landmark', () => {
    render(<SiteFooter content={footer} />)
    expect(
      screen.getByRole('navigation', {
        name: sharedContent.accessibility.footerNavigation,
      }),
    ).toBeInTheDocument()
  })

  it('renders both legal links with correct hrefs', () => {
    render(<SiteFooter content={footer} />)
    const legal = footer.legal
    legal.forEach((item) => {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.href,
      )
    })
  })
})
