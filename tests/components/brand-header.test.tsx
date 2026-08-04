/**
 * BrandHeader component tests.
 * Spec: SPEC-P2.3 FR-2
 */

import { render, screen } from '@testing-library/react'
import { BrandHeader } from '@/components/brand-header'
import type { CaseBrand } from '@/content/data/cases'

// Mock next/image — static image imports return URL strings in jsdom/vitest.
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
    style,
  }: {
    src: unknown
    alt?: string
    className?: string
    style?: React.CSSProperties
  }) => {
    const imgSrc =
      typeof src === 'object' && src !== null
        ? (src as { src: string }).src
        : String(src ?? '')
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgSrc} alt={alt} className={className} style={style} />
  },
}))

const REAL_BRAND: CaseBrand = {
  name: 'MAGUPELL',
  logo: { src: '/magupell-logo.png', width: 320, height: 112 },
  url: 'https://www.magupell.com',
}

const NULL_BRAND: CaseBrand = {
  name: 'CLIENTE FUTURO',
  logo: null,
  url: 'https://ejemplo.com',
}

describe('BrandHeader — real logo', () => {
  const defaultProps = {
    sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B',
    brand: REAL_BRAND,
    title: 'Digitalización integral de la inspección de calidad',
    plate: 'FIG. EXP-01\nESCALA · 2026',
    visitLabel: 'visitar sitio ↗',
  }

  it('renders the sector eyebrow', () => {
    render(<BrandHeader {...defaultProps} />)
    expect(screen.getByText('EXPEDIENTE 01 · SECTOR PIEL · B2B')).toBeInTheDocument()
  })

  it('renders the H1 title', () => {
    render(<BrandHeader {...defaultProps} />)
    expect(
      screen.getByRole('heading', { level: 1, name: /Digitalización integral/ }),
    ).toBeInTheDocument()
  })

  it('renders the real logo image', () => {
    render(<BrandHeader {...defaultProps} />)
    const img = screen.getByAltText('MAGUPELL — sitio web')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
  })

  it('does NOT render placeholder when logo is present', () => {
    render(<BrandHeader {...defaultProps} />)
    expect(screen.queryByText(/\[LOGO/)).not.toBeInTheDocument()
  })

  it('renders visit link with noopener noreferrer', () => {
    render(<BrandHeader {...defaultProps} />)
    const link = screen.getByRole('link', { name: /magupell\.com/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('href', 'https://www.magupell.com')
  })

  it('renders the engineering plate with aria-hidden', () => {
    render(<BrandHeader {...defaultProps} />)
    const plate = document.querySelector('.brand-header__plate')
    expect(plate).toHaveAttribute('aria-hidden', 'true')
    expect(plate).toHaveTextContent('FIG. EXP-01')
    expect(plate).toHaveTextContent('ESCALA · 2026')
  })
})

describe('BrandHeader — placeholder state', () => {
  const placeholderProps = {
    sector: 'EXPEDIENTE 03 · SECTOR EJEMPLO',
    brand: NULL_BRAND,
    title: 'Placeholder para un futuro expediente',
    plate: 'FIG. EXP-03\nESCALA · 2026',
    visitLabel: 'visitar sitio ↗',
  }

  it('renders placeholder box when logo is null', () => {
    render(<BrandHeader {...placeholderProps} />)
    expect(screen.getByText('[LOGO CLIENTE FUTURO]')).toBeInTheDocument()
  })

  it('does NOT render an img element when logo is null', () => {
    render(<BrandHeader {...placeholderProps} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('placeholder has accessible aria-label', () => {
    render(<BrandHeader {...placeholderProps} />)
    const placeholder = document.querySelector('.brand-header__logo-placeholder')
    expect(placeholder).toHaveAttribute('aria-label', '[LOGO CLIENTE FUTURO] — pendiente')
  })
})
