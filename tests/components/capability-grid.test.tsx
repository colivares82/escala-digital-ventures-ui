/**
 * CapabilityGrid component tests.
 * Spec: SPEC-P2.3 FR-4.4
 * Editorial guardrail: capability-framed only, no diagnostic language (AC-10).
 */

import { render, screen } from '@testing-library/react'
import { CapabilityGrid } from '@/components/capability-grid'

const CAPABILITIES = [
  {
    index: '01',
    title: 'Historiales clínicos colaborativos',
    body: 'Registro compartido y trazable del historial del paciente.',
  },
  {
    index: '02',
    title: 'Gamificación del paciente',
    body: 'Mecánicas de implicación para mejorar la adherencia.',
  },
  {
    index: '03',
    title: 'Análisis de imágenes con IA',
    body: 'Modelos de visión de última generación aplicados al análisis de salud oral.',
  },
] as const

describe('CapabilityGrid', () => {
  it('renders the section label eyebrow', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    expect(screen.getByText('CAPACIDADES ENTREGADAS')).toBeInTheDocument()
  })

  it('renders all 3 capability cards', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    expect(screen.getByText('Historiales clínicos colaborativos')).toBeInTheDocument()
    expect(screen.getByText('Gamificación del paciente')).toBeInTheDocument()
    expect(screen.getByText('Análisis de imágenes con IA')).toBeInTheDocument()
  })

  it('renders CAP · 0X index for each card', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    expect(screen.getByText('CAP · 01')).toBeInTheDocument()
    expect(screen.getByText('CAP · 02')).toBeInTheDocument()
    expect(screen.getByText('CAP · 03')).toBeInTheDocument()
  })

  it('returns null for empty capabilities array (MAGUPELL guard)', () => {
    const { container } = render(
      <CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={[]} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('capability bodies contain no diagnostic language (AC-10 editorial guardrail)', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    const allText = screen.getAllByRole('listitem').map((el) => el.textContent).join(' ')
    expect(allText).not.toMatch(/diagnos/i)
    expect(allText).not.toMatch(/medical diagnosis/i)
  })

  it('imaging capability is framed as analysis, not diagnosis', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    const imagingCard = screen.getByText('Análisis de imágenes con IA').closest('[role="listitem"]')
    // toHaveTextContent is case-sensitive; title is "Modelos" (capital M)
    expect(imagingCard).toHaveTextContent('Modelos de visión')
    expect(imagingCard?.textContent).not.toMatch(/diagnos/i)
  })

  it('grid has role="list" and cards have role="listitem"', () => {
    render(<CapabilityGrid sectionLabel="CAPACIDADES ENTREGADAS" capabilities={CAPABILITIES} />)
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})
