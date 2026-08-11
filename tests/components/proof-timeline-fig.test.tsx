/**
 * ProofTimelineFig component tests — SPEC-POLISH-03.
 * Verifies: 5 milestones rendered, aria-label, figcaption, production accent.
 */
import { render, screen } from '@testing-library/react'
import { ProofTimelineFig } from '@/components/proof-timeline-fig'
import type { ProofTimelineFigContent } from '@/components/proof-timeline-fig'

const MOCK_CONTENT: ProofTimelineFigContent = {
  timeline: [
    { date: 'DIC 2025', deliverable: 'Requerimientos' },
    { date: 'ENE 2026', deliverable: 'Prototipo' },
    { date: 'ABR 2026', deliverable: 'Desarrollo' },
    { date: 'MAY–JUN 2026', deliverable: 'Preproducción' },
    { date: 'JUL 2026', deliverable: 'Producción' },
  ],
  timelineCaption: 'FIG. 04 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS',
  timelineAria: 'Cronología verificada de Magupell: de requerimientos en diciembre de 2025 a producción en julio de 2026',
}

describe('ProofTimelineFig', () => {
  it('renders an SVG with the correct aria-label', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    expect(screen.getByRole('img', { name: MOCK_CONTENT.timelineAria })).toBeInTheDocument()
  })

  it('renders the figcaption with FIG. 04', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    expect(screen.getByText(/FIG\. 04/)).toBeInTheDocument()
  })

  it('renders the full figcaption text', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    expect(screen.getByText(MOCK_CONTENT.timelineCaption)).toBeInTheDocument()
  })

  it('renders all 5 date labels', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    MOCK_CONTENT.timeline.forEach((m) => {
      expect(screen.getByText(m.date)).toBeInTheDocument()
    })
  })

  it('renders all 5 deliverable labels', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    MOCK_CONTENT.timeline.forEach((m) => {
      expect(screen.getByText(m.deliverable)).toBeInTheDocument()
    })
  })

  it('renders the production deliverable with the production CSS class', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const productionLabel = container.querySelector('.proof-timeline__deliverable--production')
    expect(productionLabel).toBeInTheDocument()
    expect(productionLabel?.textContent).toBe('Producción')
  })

  it('renders the production node with the production CSS class', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const productionNode = container.querySelector('.proof-timeline__node--production')
    expect(productionNode).toBeInTheDocument()
  })

  it('renders a figure element', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    expect(container.querySelector('figure')).toBeInTheDocument()
  })

  it('renders the stair path', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const stair = container.querySelector('.proof-timeline__stair')
    expect(stair).toBeInTheDocument()
  })

  it('renders the fill path under the stair', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const fill = container.querySelector('.proof-timeline__fill')
    expect(fill).toBeInTheDocument()
  })

  it('renders corner ticks (kit grammar)', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const ticks = container.querySelector('.proof-timeline__ticks')
    expect(ticks).toBeInTheDocument()
  })

  it('renders exactly 5 label groups', () => {
    const { container } = render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    const groups = container.querySelectorAll('.proof-timeline__label-group')
    expect(groups).toHaveLength(5)
  })

  it('mentions 7 months in the caption', () => {
    render(<ProofTimelineFig content={MOCK_CONTENT} ariaLabel={MOCK_CONTENT.timelineAria} />)
    expect(screen.getByText(/7 MESES/)).toBeInTheDocument()
  })
})
