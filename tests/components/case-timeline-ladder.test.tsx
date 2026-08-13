/**
 * CaseTimelineLadder component tests — FIG. EXP-03 (SPEC-CASE-01 §3).
 */
import { render, screen } from '@testing-library/react'
import { CaseTimelineLadder } from '@/components/case-timeline-ladder'
import type { CaseTimelineMilestone } from '@/content/data/cases'

const MILESTONES: CaseTimelineMilestone[] = [
  { date: 'DIC 2025', title: 'Requerimientos', detail: 'Análisis del negocio, proceso a proceso.' },
  { date: 'ENE 2026', title: 'Prototipo', detail: 'Prototipo navegable aprobado antes de construir.' },
  { date: 'ABR 2026', title: 'Desarrollo', detail: 'Construcción con pruebas automatizadas.' },
  { date: 'MAY–JUN 2026', title: 'Preproducción', detail: 'Validación y puesta a punto.' },
  { date: 'JUL 2026', title: 'Producción', detail: 'Dominio propio sobre Google Cloud.' },
]

const CAPTION = 'FIG. EXP-03 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS'
const ARIA_LABEL = 'Cronología de siete meses'

describe('CaseTimelineLadder', () => {
  it('renders an accessible figure with the given aria-label', () => {
    render(<CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    expect(screen.getByRole('img', { name: ARIA_LABEL })).toBeInTheDocument()
  })

  it('renders all 5 dates', () => {
    render(<CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    MILESTONES.forEach((m) => {
      expect(screen.getByText(m.date)).toBeInTheDocument()
    })
  })

  it('renders all 5 titles', () => {
    render(<CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    MILESTONES.forEach((m) => {
      expect(screen.getByText(m.title)).toBeInTheDocument()
    })
  })

  it('renders all 5 detail lines (one per milestone)', () => {
    render(<CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    MILESTONES.forEach((m) => {
      expect(screen.getByText(m.detail)).toBeInTheDocument()
    })
  })

  it('renders the figcaption', () => {
    render(<CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    expect(screen.getByText(CAPTION)).toBeInTheDocument()
  })

  it('renders exactly 5 steps', () => {
    const { container } = render(
      <CaseTimelineLadder milestones={MILESTONES} caption={CAPTION} ariaLabel={ARIA_LABEL} />,
    )
    expect(container.querySelectorAll('.case-timeline-ladder__step')).toHaveLength(5)
  })
})
