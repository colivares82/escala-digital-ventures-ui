/**
 * CaseDossier component tests.
 * Tests the mode-aware template: data-forward (MAGUPELL) and capability-forward (BioZero).
 * Spec: SPEC-P2.3 FR-4 · AC-3 (sibling-not-copy differentiation) · AC-4 (data-driven)
 *
 * Note: vi.hoisted() is required because vi.mock factories are hoisted to the top of the
 * file before module-level const declarations. Any data used inside a vi.mock factory
 * must be declared via vi.hoisted() to be available at hoist time.
 */

import { render, screen } from '@testing-library/react'
import { CaseDossier } from '@/components/case-dossier'
import type { CaseStudy } from '@/content/data/cases'
import type { CasesDictionary } from '@/content/types'

// Declare shared test data via vi.hoisted so it is available inside vi.mock factories.
const { MAGUPELL_CASE, BIOZERO_CASE } = vi.hoisted(() => {
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
        title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
        text: '100+ requisitos',
        status: 'Ver caso',
      },
      en: {
        eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
        title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
        text: '100+ requisitos',
        status: 'Ver caso',
      },
      ca: {
        eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
        title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
        text: '100+ requisitos',
        status: 'Ver caso',
      },
    },
    cardSubtitle: 'Digitalización integral de la inspección de calidad.',
    plate: 'FIG. EXP-01\nESCALA · 2026',
    readouts: [
      { label: 'REQUISITOS', value: '100+', caption: 'funcionales en producción' },
      { label: 'PRUEBAS', value: '200+', caption: 'automatizadas' },
      { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio · Google Cloud' },
      { label: 'OPERATIVA', value: 'REAL', caption: 'factura a sus clientes en la plataforma' },
    ],
    fields: [
      { key: 'CONTEXTO', body: 'Contexto de MAGUPELL' },
      { key: 'PROBLEMA', body: 'El problema' },
      { key: 'SOLUCIÓN', body: 'La solución' },
      { key: 'IMPACTO', body: 'El impacto' },
      { key: 'SIGUIENTES PASOS', body: 'Próximos pasos' },
    ],
    meta: { title: 'MAGUPELL | Escala', description: 'Test meta' },
  }

  const BIOZERO_CASE: CaseStudy = {
    slug: 'biozero',
    order: 2,
    name: 'BioZero',
    href: '/casos-de-exito/biozero',
    sector: 'EXPEDIENTE 02 · CLÍNICA DENTAL · IA APLICADA',
    mode: 'capability-forward',
    brand: {
      name: 'BioZero',
      logo: { src: '/biozero-logo.png', width: 320, height: 112 },
      url: 'https://biozeroplus.com',
    },
    content: {
      es: {
        eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
        title: 'Plataforma de gestión clínica dental con IA',
        text: 'Registros colaborativos',
        status: 'Ver caso',
      },
      en: {
        eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
        title: 'Plataforma de gestión clínica dental con IA',
        text: 'Registros colaborativos',
        status: 'Ver caso',
      },
      ca: {
        eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
        title: 'Plataforma de gestión clínica dental con IA',
        text: 'Registros colaborativos',
        status: 'Ver caso',
      },
    },
    cardSubtitle: 'Gestión clínica con IA.',
    plate: 'FIG. EXP-02\nESCALA · PRIMER CLIENTE',
    readouts: [
      { label: 'ESTADO', value: 'V1 ENTREGADA', caption: 'base preparada para evolucionar' },
      { label: 'RELACIÓN', value: 'PRIMER CLIENTE', caption: 'de Escala' },
    ],
    capabilities: [
      { index: '01', title: 'Historiales clínicos colaborativos', body: 'Registro compartido.' },
      { index: '02', title: 'Gamificación del paciente', body: 'Mecánicas de implicación.' },
      { index: '03', title: 'Análisis de imágenes con IA', body: 'Modelos de visión aplicados.' },
    ],
    fields: [
      { key: 'CONTEXTO', body: 'BioZero fue el primer cliente de Escala.' },
      { key: 'SOLUCIÓN E IMPACTO', body: 'V1 entregada, digitalización completada.' },
      { key: 'LO QUE DEMUESTRA', body: 'Capacidad de aplicar IA en sector sensible.' },
    ],
    meta: { title: 'BioZero | Escala', description: 'Test meta' },
  }

  return { MAGUPELL_CASE, BIOZERO_CASE }
})

// Mock next/image
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

// Mock FinalCTA to isolate CaseDossier tests
vi.mock('@/components/final-cta', () => ({
  FinalCTA: () => <div data-testid="final-cta-mock" />,
}))

// Mock homeContent used by CaseDossier for FinalCTA content
vi.mock('@/content/es/home', () => ({
  homeContent: {
    finalCta: {
      title: 'Hablemos',
      body: '',
      email: 'hola@escaladigitalventures.com',
      success: 'Gracias',
      location: '',
      languages: '',
    },
  },
}))

// Mock the cases module — now safe to reference vi.hoisted constants
vi.mock('@/content/data/cases', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/content/data/cases')>()
  return {
    ...original,
    cases: [MAGUPELL_CASE, BIOZERO_CASE],
    getCase: (slug: string) =>
      [MAGUPELL_CASE, BIOZERO_CASE].find((c) => c.slug === slug) ?? null,
  }
})

const DICT: CasesDictionary = {
  meta: {
    title: 'Casos de éxito | Escala Digital Ventures',
    description: 'Test description',
  },
  pageHeader: {
    eyebrow: 'A / CASOS DE ÉXITO',
    title: 'Casos de éxito',
    lead: 'Más que proyectos.',
  },
  card: {
    expedienteLabel: 'EXPEDIENTE',
    openLabel: 'ABRIR EXPEDIENTE ↗',
  },
  visitLabel: 'visitar sitio ↗',
  capabilitiesLabel: 'CAPACIDADES ENTREGADAS',
  nextLabel: 'SIGUIENTE EXPEDIENTE ↓',
  backLabel: 'VOLVER AL ÍNDICE ↑',
}

describe('CaseDossier — MAGUPELL (data-forward)', () => {
  beforeEach(() => {
    render(<CaseDossier caseStudy={MAGUPELL_CASE} dict={DICT} locale="es" />)
  })

  it('renders the sector eyebrow', () => {
    expect(screen.getByText('EXPEDIENTE 01 · SECTOR PIEL · B2B')).toBeInTheDocument()
  })

  it('renders the H1 title from locale content', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /Digitalización integral/ }),
    ).toBeInTheDocument()
  })

  it('renders all 4 readout values', () => {
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('200+')).toBeInTheDocument()
    expect(screen.getByText('JUL 2026')).toBeInTheDocument()
    expect(screen.getByText('REAL')).toBeInTheDocument()
  })

  it('does NOT render CapabilityGrid for data-forward case', () => {
    expect(screen.queryByText('CAPACIDADES ENTREGADAS')).not.toBeInTheDocument()
    expect(screen.queryByText('CAP · 01')).not.toBeInTheDocument()
  })

  it('renders all 5 dossier field keys', () => {
    expect(screen.getByText('CONTEXTO')).toBeInTheDocument()
    expect(screen.getByText('PROBLEMA')).toBeInTheDocument()
    expect(screen.getByText('SOLUCIÓN')).toBeInTheDocument()
    expect(screen.getByText('IMPACTO')).toBeInTheDocument()
    expect(screen.getByText('SIGUIENTES PASOS')).toBeInTheDocument()
  })

  it('renders "next case" navigation pointing to BioZero', () => {
    const nextLink = screen.getByRole('link', { name: /BioZero/i })
    expect(nextLink).toHaveAttribute('href', '/casos-de-exito/biozero')
    expect(screen.getByText('SIGUIENTE EXPEDIENTE ↓')).toBeInTheDocument()
  })

  it('renders FinalCTA', () => {
    expect(screen.getByTestId('final-cta-mock')).toBeInTheDocument()
  })
})

describe('CaseDossier — BioZero (capability-forward)', () => {
  beforeEach(() => {
    render(<CaseDossier caseStudy={BIOZERO_CASE} dict={DICT} locale="es" />)
  })

  it('renders the sector eyebrow', () => {
    expect(screen.getByText('EXPEDIENTE 02 · CLÍNICA DENTAL · IA APLICADA')).toBeInTheDocument()
  })

  it('renders ReadoutStrip with 2 status readouts', () => {
    expect(screen.getByText('V1 ENTREGADA')).toBeInTheDocument()
    expect(screen.getByText('PRIMER CLIENTE')).toBeInTheDocument()
  })

  it('renders CapabilityGrid for capability-forward case', () => {
    expect(screen.getByText('CAPACIDADES ENTREGADAS')).toBeInTheDocument()
    expect(screen.getByText('CAP · 01')).toBeInTheDocument()
    expect(screen.getByText('Historiales clínicos colaborativos')).toBeInTheDocument()
  })

  it('renders 3 dossier field keys', () => {
    expect(screen.getByText('CONTEXTO')).toBeInTheDocument()
    expect(screen.getByText('SOLUCIÓN E IMPACTO')).toBeInTheDocument()
    expect(screen.getByText('LO QUE DEMUESTRA')).toBeInTheDocument()
  })

  it('renders "back to index" nav as the last case (AC-3 sibling differentiation)', () => {
    expect(screen.getByText('VOLVER AL ÍNDICE ↑')).toBeInTheDocument()
    const backLink = screen.getByRole('link', { name: /Casos de éxito/i })
    expect(backLink).toHaveAttribute('href', '/casos-de-exito')
  })

  it('AC-10: CapabilityGrid content is capability-framed (no diagnostic terms)', () => {
    const capGrid = screen.getByRole('list')
    expect(capGrid.textContent).not.toMatch(/diagnos/i)
    expect(capGrid.textContent).toContain('Modelos de visión aplicados')
  })
})

describe('CaseDossier — AC-4 data-driven (3rd case)', () => {
  const THIRD_CASE: CaseStudy = {
    ...MAGUPELL_CASE,
    order: 3,
    name: 'TERCER CLIENTE',
    sector: 'EXPEDIENTE 03 · SECTOR TEST',
    mode: 'data-forward',
    readouts: [
      { label: 'MÉTRICA A', value: '50+', caption: 'test caption A' },
      { label: 'MÉTRICA B', value: '99%', caption: 'test caption B' },
    ],
    fields: [
      { key: 'CONTEXTO', body: 'Contexto del tercer cliente.' },
      { key: 'IMPACTO', body: 'Impacto verificado.' },
    ],
  }

  it('renders a new case from data only — no component changes needed', () => {
    render(<CaseDossier caseStudy={THIRD_CASE} dict={DICT} locale="es" />)
    // The template renders whatever data is passed — it is truly data-driven
    expect(screen.getByText('EXPEDIENTE 03 · SECTOR TEST')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('99%')).toBeInTheDocument()
    expect(screen.getByText('Contexto del tercer cliente.')).toBeInTheDocument()
    expect(screen.getByText('Impacto verificado.')).toBeInTheDocument()
  })
})
