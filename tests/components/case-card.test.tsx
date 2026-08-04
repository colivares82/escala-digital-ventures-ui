/**
 * CaseCard component tests.
 * Spec: SPEC-P2.3 FR-3.2
 */

import { render, screen } from '@testing-library/react'
import { CaseCard } from '@/components/case-card'
import type { CaseStudy } from '@/content/data/cases'

// Mock next/image — static image imports return URL strings in jsdom/vitest.
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    style,
  }: {
    src: unknown
    alt?: string
    style?: React.CSSProperties
  }) => {
    const imgSrc =
      typeof src === 'object' && src !== null
        ? (src as { src: string }).src
        : String(src ?? '')
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgSrc} alt={alt} style={style} />
  },
}))

const MAGUPELL_CASE: CaseStudy = {
  slug: 'magupell',
  order: 1,
  name: 'MAGUPELL',
  href: '/casos-de-exito/magupell',
  sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B',
  mode: 'data-forward',
  brand: {
    name: 'MAGUPELL',
    logo: { src: '/magupell-logo.png', width: 320, height: 112 },
    url: 'https://www.magupell.com',
  },
  content: {
    es: {
      eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
      title: 'Digitalización integral',
      text: '100+ requisitos',
      status: 'Ver caso',
    },
    en: {
      eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
      title: 'Digitalización integral',
      text: '100+ requisitos',
      status: 'Ver caso',
    },
    ca: {
      eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
      title: 'Digitalización integral',
      text: '100+ requisitos',
      status: 'Ver caso',
    },
  },
  cardSubtitle: 'Digitalización integral de la inspección de calidad.',
  plate: 'FIG. EXP-01\nESCALA · 2026',
  readouts: [
    { label: 'REQUISITOS', value: '100+', caption: 'funcionales' },
    { label: 'PRUEBAS', value: '200+', caption: 'automatizadas' },
    { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'factura a sus clientes' },
  ],
  fields: [
    { key: 'CONTEXTO', body: 'Contexto de la empresa' },
    { key: 'PROBLEMA', body: 'El problema' },
    { key: 'SOLUCIÓN', body: 'La solución' },
    { key: 'IMPACTO', body: 'El impacto' },
    { key: 'SIGUIENTES PASOS', body: 'Próximos pasos' },
  ],
  meta: {
    title: 'MAGUPELL — Test',
    description: 'Test description',
  },
}

const NO_LOGO_CASE: CaseStudy = {
  ...MAGUPELL_CASE,
  slug: 'biozero',
  name: 'BioZero',
  brand: { name: 'BioZero', logo: null, url: 'https://biozeroplus.com' },
  cardSubtitle: 'Gestión clínica dental con IA.',
}

describe('CaseCard — with real logo', () => {
  const defaultProps = {
    caseStudy: MAGUPELL_CASE,
    locale: 'es' as const,
    expedienteLabel: 'EXPEDIENTE',
    openLabel: 'ABRIR EXPEDIENTE ↗',
  }

  it('renders the case name', () => {
    render(<CaseCard {...defaultProps} />)
    expect(screen.getByRole('heading', { level: 3, name: 'MAGUPELL' })).toBeInTheDocument()
  })

  it('renders the cardSubtitle', () => {
    render(<CaseCard {...defaultProps} />)
    expect(screen.getByText('Digitalización integral de la inspección de calidad.')).toBeInTheDocument()
  })

  it('renders the expedition eyebrow with order and sector', () => {
    render(<CaseCard {...defaultProps} />)
    const eyebrow = document.querySelector('.case-index-card__eyebrow')
    expect(eyebrow).toHaveTextContent('EXPEDIENTE')
    expect(eyebrow).toHaveTextContent('01')
    // Sector part (after stripping EXPEDIENTE XX · prefix)
    expect(eyebrow).toHaveTextContent('SECTOR PIEL · B2B')
  })

  it('renders the real logo image with correct alt text', () => {
    render(<CaseCard {...defaultProps} />)
    const img = screen.getByAltText('MAGUPELL — sitio web')
    expect(img).toBeInTheDocument()
  })

  it('renders the CTA link with correct href', () => {
    render(<CaseCard {...defaultProps} />)
    const cta = screen.getByRole('link', { name: 'ABRIR EXPEDIENTE ↗' })
    expect(cta).toHaveAttribute('href', '/casos-de-exito/magupell')
  })

  it('renders as an article element', () => {
    render(<CaseCard {...defaultProps} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('does NOT render placeholder when logo is present', () => {
    render(<CaseCard {...defaultProps} />)
    expect(screen.queryByText(/\[LOGO/)).not.toBeInTheDocument()
  })
})

describe('CaseCard — placeholder logo state', () => {
  it('renders placeholder when logo is null', () => {
    render(
      <CaseCard
        caseStudy={NO_LOGO_CASE}
        locale="es"
        expedienteLabel="EXPEDIENTE"
        openLabel="ABRIR EXPEDIENTE ↗"
      />,
    )
    expect(screen.getByText('[LOGO BioZero]')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})

describe('CaseCard — locale routing (AC-9 home chip compatible)', () => {
  it('ES locale generates correct ES path', () => {
    render(
      <CaseCard
        caseStudy={MAGUPELL_CASE}
        locale="es"
        expedienteLabel="EXPEDIENTE"
        openLabel="ABRIR EXPEDIENTE ↗"
      />,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/casos-de-exito/magupell')
  })

  it('EN locale generates correct EN path', () => {
    render(
      <CaseCard
        caseStudy={MAGUPELL_CASE}
        locale="en"
        expedienteLabel="EXPEDIENTE"
        openLabel="ABRIR EXPEDIENTE ↗"
      />,
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/case-studies/magupell')
  })
})
