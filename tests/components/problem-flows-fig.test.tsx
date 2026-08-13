/**
 * ProblemFlowsFig component tests — SPEC-POLISH-02.
 * Verifies: SVG role/aria-label, five pieces, core labels, solid segments,
 * dashed stubs, pulse layer aria-hidden, figcaption, note, corner ticks.
 */
import { render, screen } from '@testing-library/react'
import { ProblemFlowsFig } from '@/components/problem-flows-fig'
import type { ProblemFlowsFigContent } from '@/components/problem-flows-fig'

const mockContent: ProblemFlowsFigContent = {
  pieces: [
    'HOJAS DE CÁLCULO',
    'CORREOS',
    'NOTAS',
    'CATÁLOGO',
    'HISTORIAL',
  ],
  core: ['PROCESOS', 'MANUALES'],
  caption: 'FIG. 02 — UNA OPERATIVA QUE DEPENDE DE PROCESOS MANUALES: LOS FLUJOS NO SE COMPLETAN',
  note: 'CADA PIEZA INTENTA CONECTARSE · EL FLUJO SE CORTA EN EL PASO MANUAL',
}

describe('ProblemFlowsFig', () => {
  it('renders an SVG with the provided aria-label', () => {
    render(<ProblemFlowsFig content={mockContent} ariaLabel="Test aria label" />)
    expect(screen.getByRole('img', { name: 'Test aria label' })).toBeInTheDocument()
  })

  it('renders a figure element', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('figure')).toBeInTheDocument()
  })

  it('renders the figcaption with the caption text', () => {
    render(<ProblemFlowsFig content={mockContent} ariaLabel="Test" />)
    expect(screen.getByText(mockContent.caption)).toBeInTheDocument()
  })

  it('renders the note text', () => {
    render(<ProblemFlowsFig content={mockContent} ariaLabel="Test" />)
    expect(screen.getByText(mockContent.note)).toBeInTheDocument()
  })

  it('renders all five piece labels', () => {
    render(<ProblemFlowsFig content={mockContent} ariaLabel="Test" />)
    mockContent.pieces.forEach((piece) => {
      expect(screen.getByText(piece)).toBeInTheDocument()
    })
  })

  it('renders both core label lines', () => {
    render(<ProblemFlowsFig content={mockContent} ariaLabel="Test" />)
    mockContent.core.forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument()
    })
  })

  it('renders the pulse layer with aria-hidden', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    const pulseLayer = container.querySelector('.problem-pulse-layer')
    expect(pulseLayer).toBeInTheDocument()
    expect(pulseLayer).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders 5 solid connector segments', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    const solids = container.querySelectorAll('.problem-fig__solid')
    expect(solids).toHaveLength(5)
  })

  it('renders 4 dashed stubs (CORREOS has no stub)', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    const stubs = container.querySelectorAll('.problem-fig__stub')
    expect(stubs).toHaveLength(4)
  })

  it('renders 5 piece rects', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    const rects = container.querySelectorAll('.problem-fig__piece-rect')
    expect(rects).toHaveLength(5)
  })

  it('renders the core ring', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('.problem-fig__core-ring')).toBeInTheDocument()
  })

  it('renders corner tick paths', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    const ticks = container.querySelector('.diagram-frame-ticks')
    expect(ticks).toBeInTheDocument()
    expect(ticks?.querySelectorAll('path')).toHaveLength(4)
  })

  it('renders the caption with the problem-fig__caption class', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('.problem-fig__caption')).toBeInTheDocument()
  })

  it('renders the note with the problem-fig__note class', () => {
    const { container } = render(
      <ProblemFlowsFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('.problem-fig__note')).toBeInTheDocument()
  })
})
