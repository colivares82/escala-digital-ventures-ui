/**
 * CaseGovernance component tests — section 05, abisal surface (SPEC-CASE-01 §3).
 */
import { render, screen } from '@testing-library/react'
import { CaseGovernance } from '@/components/case-governance'
import type { CaseGovernanceCard } from '@/content/data/cases'

const HEADING = 'Crecer sin perder el control de lo que ocurre.'
const LEAD = 'Abrir la operación a más usuarios solo es posible si cada uno ve estrictamente lo suyo.'
const CARDS: CaseGovernanceCard[] = [
  { label: 'ACCESO', body: 'Permisos por rol.' },
  { label: 'TRAZABILIDAD', body: 'Quién hizo qué, cuándo.' },
  { label: 'DATOS EN LA UE', body: 'Alojamiento en Google Cloud, región europea.' },
  { label: 'CAMBIOS SEGUROS', body: '1.803 pruebas automatizadas.' },
]

describe('CaseGovernance', () => {
  it('renders the heading', () => {
    render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    expect(screen.getByText(HEADING)).toBeInTheDocument()
  })

  it('renders the lead paragraph', () => {
    render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    expect(screen.getByText(LEAD)).toBeInTheDocument()
  })

  it('renders exactly 4 governance cards', () => {
    render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
  })

  it('renders every card label', () => {
    render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    CARDS.forEach((c) => {
      expect(screen.getByText(c.label)).toBeInTheDocument()
    })
  })

  it('renders every card body', () => {
    render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    CARDS.forEach((c) => {
      expect(screen.getByText(c.body)).toBeInTheDocument()
    })
  })

  it('does not hardcode a hex color inline (tokens only)', () => {
    const { container } = render(<CaseGovernance heading={HEADING} lead={LEAD} cards={CARDS} />)
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,6}/)
  })
})
