/**
 * ReadoutStrip component tests.
 * Spec: SPEC-P2.3 FR-4.2
 */

import { render, screen } from '@testing-library/react'
import { ReadoutStrip } from '@/components/readout-strip'

const READOUTS_4 = [
  { label: 'REQUISITOS', value: '100+', caption: 'funcionales en producción' },
  { label: 'PRUEBAS', value: '200+', caption: 'automatizadas' },
  { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio' },
  { label: 'OPERATIVA', value: 'REAL', caption: 'factura a sus clientes' },
] as const

const READOUTS_2 = [
  { label: 'ESTADO', value: 'V1 ENTREGADA', caption: 'base preparada' },
  { label: 'RELACIÓN', value: 'PRIMER CLIENTE', caption: 'de Escala' },
] as const

describe('ReadoutStrip', () => {
  it('renders all 4 readout cells for data-forward', () => {
    render(<ReadoutStrip readouts={READOUTS_4} />)
    expect(screen.getByText('REQUISITOS')).toBeInTheDocument()
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByText('funcionales en producción')).toBeInTheDocument()
    expect(screen.getByText('PRUEBAS')).toBeInTheDocument()
    expect(screen.getByText('200+')).toBeInTheDocument()
    expect(screen.getByText('PRODUCCIÓN')).toBeInTheDocument()
    expect(screen.getByText('JUL 2026')).toBeInTheDocument()
    expect(screen.getByText('OPERATIVA')).toBeInTheDocument()
    expect(screen.getByText('REAL')).toBeInTheDocument()
  })

  it('renders both readout cells for capability-forward', () => {
    render(<ReadoutStrip readouts={READOUTS_2} />)
    expect(screen.getByText('ESTADO')).toBeInTheDocument()
    expect(screen.getByText('V1 ENTREGADA')).toBeInTheDocument()
    expect(screen.getByText('RELACIÓN')).toBeInTheDocument()
    expect(screen.getByText('PRIMER CLIENTE')).toBeInTheDocument()
  })

  it('sets --readout-cols CSS custom property matching readout count', () => {
    const { container } = render(<ReadoutStrip readouts={READOUTS_4} />)
    const strip = container.querySelector('.readout-strip') as HTMLElement
    expect(strip.style.getPropertyValue('--readout-cols')).toBe('4')
  })

  it('sets --readout-cols to 2 for 2-readout strip', () => {
    const { container } = render(<ReadoutStrip readouts={READOUTS_2} />)
    const strip = container.querySelector('.readout-strip') as HTMLElement
    expect(strip.style.getPropertyValue('--readout-cols')).toBe('2')
  })

  it('has accessible aria-label', () => {
    render(<ReadoutStrip readouts={READOUTS_4} />)
    expect(screen.getByRole('generic', { name: 'Datos del proyecto' })).toBeInTheDocument()
  })

  it('renders label, value, caption for each cell', () => {
    const { container } = render(<ReadoutStrip readouts={READOUTS_4} />)
    const cells = container.querySelectorAll('.readout-strip__cell')
    expect(cells).toHaveLength(4)
    cells.forEach((cell) => {
      expect(cell.querySelector('.readout-strip__label')).toBeInTheDocument()
      expect(cell.querySelector('.readout-strip__value')).toBeInTheDocument()
      expect(cell.querySelector('.readout-strip__caption')).toBeInTheDocument()
    })
  })
})
