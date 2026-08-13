/**
 * CaseReadoutGrid component tests — SPEC-CASE-01 §3.
 */
import { render, screen } from '@testing-library/react'
import { CaseReadoutGrid } from '@/components/case-readout-grid'
import type { CaseReadoutCell } from '@/content/data/cases'

const READOUTS: CaseReadoutCell[] = [
  { key: 'DAT.01', label: 'REQUISITOS', value: '167 → 216', caption: 'refinados con iteración' },
  { key: 'DAT.02', label: 'PRUEBAS', value: '1.803', caption: '1.042 backend + 761 frontend' },
  { key: 'DAT.03', label: 'TIEMPO A PRODUCCIÓN', value: '7 meses', caption: 'de requerimientos a producción' },
]

describe('CaseReadoutGrid', () => {
  it('renders one cell per readout', () => {
    render(<CaseReadoutGrid readouts={READOUTS} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders the mono key and label together', () => {
    render(<CaseReadoutGrid readouts={READOUTS} />)
    expect(screen.getByText('DAT.01 / REQUISITOS')).toBeInTheDocument()
  })

  it('renders every value', () => {
    render(<CaseReadoutGrid readouts={READOUTS} />)
    READOUTS.forEach((r) => {
      expect(screen.getByText(r.value)).toBeInTheDocument()
    })
  })

  it('renders every caption', () => {
    render(<CaseReadoutGrid readouts={READOUTS} />)
    READOUTS.forEach((r) => {
      expect(screen.getByText(r.caption)).toBeInTheDocument()
    })
  })

  it('renders an amber tick per cell', () => {
    const { container } = render(<CaseReadoutGrid readouts={READOUTS} />)
    expect(container.querySelectorAll('.case-readout-grid__tick')).toHaveLength(3)
  })

  it('has an accessible list label', () => {
    render(<CaseReadoutGrid readouts={READOUTS} />)
    expect(screen.getByRole('list', { name: 'Datos del proyecto' })).toBeInTheDocument()
  })
})
