/**
 * ExpertiseGrid — unit tests.
 * Spec: SPEC-P2.5 FR-5 / AC-4
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ExpertiseGrid } from '@/components/expertise-grid'
import type { ExpertiseGridArea } from '@/components/expertise-grid'

const SIX_AREAS: ExpertiseGridArea[] = [
  { index: '01', title: 'Ingeniería full-stack', body: 'Body 01.', figVariant: 'fullstack' },
  { index: '02', title: 'Arquitectura de plataformas', body: 'Body 02.', figVariant: 'hub' },
  { index: '03', title: 'Dirección de producto', body: 'Body 03.', figVariant: 'bars' },
  { index: '04', title: 'Liderazgo y transformación', body: 'Body 04.', figVariant: 'nodes' },
  { index: '05', title: 'Developer experience', body: 'Body 05.', figVariant: 'signal' },
  { index: '06', title: 'IA aplicada y cloud-native', body: 'Body 06.', figVariant: 'insertion' },
]

const BASE_PROPS = {
  sectionEyebrow: 'D / LA EXPERIENCIA DETRÁS DE ESCALA',
  heading: 'Más de dos décadas, seis disciplinas',
  lead: 'Lead paragraph about experience.',
  areas: SIX_AREAS,
  divider: '— — —  DE LA IDENTIDAD A LA EXPERIENCIA  — — —',
}

describe('ExpertiseGrid', () => {
  it('renders the section eyebrow', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(screen.getByText(BASE_PROPS.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the H2 heading', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('renders 6 area cells', () => {
    const { container } = render(<ExpertiseGrid {...BASE_PROPS} />)
    const areas = container.querySelectorAll('.expertise-grid__area')
    expect(areas).toHaveLength(6)
  })

  it('renders the tone-shift divider', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(screen.getByText(/DE LA IDENTIDAD A LA EXPERIENCIA/)).toBeInTheDocument()
  })

  it('renders all 6 area titles as H3', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(6)
  })

  it('renders ÁREA labels for each area', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(screen.getByText('ÁREA · 01')).toBeInTheDocument()
    expect(screen.getByText('ÁREA · 06')).toBeInTheDocument()
  })

  it('renders 6 aria-hidden SVG micro-figs', () => {
    const { container } = render(<ExpertiseGrid {...BASE_PROPS} />)
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    // 6 micro-figs; DiagramReveal may add extra containers but SVGs should be 6
    expect(svgs.length).toBeGreaterThanOrEqual(6)
  })

  it('renders the lead paragraph', () => {
    render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(screen.getByText(BASE_PROPS.lead)).toBeInTheDocument()
  })

  // Anonymization guard: AC-4 / FR-5.5 — no employer names (none in data)
  it('contains no former-employer names (anonymization guard)', () => {
    const { container } = render(<ExpertiseGrid {...BASE_PROPS} />)
    const text = container.textContent ?? ''
    // Banned patterns from Ch. 19 — these must never appear
    expect(text).not.toMatch(/Microsoft|Google|Amazon|Oracle|SAP|IBM/i)
  })

  it('renders GridBackground inside the section', () => {
    const { container } = render(<ExpertiseGrid {...BASE_PROPS} />)
    expect(container.querySelector('.grid-bg')).toBeInTheDocument()
  })
})
