/**
 * Readout component tests — SPEC-POLISH-03.
 * New API: label, value, kind, caption, plotVariant, index.
 * No source suffix, no CountUp — values are exact and static.
 */
import { render, screen } from '@testing-library/react'
import { Readout } from '@/components/readout'

const BASE_PROPS = {
  label: 'REQUISITOS',
  value: '167 → 216',
  kind: 'number' as const,
  caption: 'Requisitos funcionales refinados con iteración y prototipo.',
  plotVariant: 'growth',
  index: 0,
}

describe('Readout', () => {
  it('renders the DAT.XX / LABEL eyebrow', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(screen.getByText(/DAT\.01/)).toBeInTheDocument()
    expect(screen.getByText(/REQUISITOS/)).toBeInTheDocument()
  })

  it('renders the padded DAT index correctly', () => {
    render(<Readout {...BASE_PROPS} index={5} />)
    expect(screen.getByText(/DAT\.06/)).toBeInTheDocument()
  })

  it('renders the value as plain text', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(screen.getByText('167 → 216')).toBeInTheDocument()
  })

  it('renders a phrase value for kind=phrase', () => {
    render(<Readout {...BASE_PROPS} value="Sustituyó lo manual." kind="phrase" />)
    expect(screen.getByText('Sustituyó lo manual.')).toBeInTheDocument()
  })

  it('renders the caption text in body font', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(
      screen.getByText('Requisitos funcionales refinados con iteración y prototipo.'),
    ).toBeInTheDocument()
  })

  it('renders the decorative micro-plot SVG as aria-hidden', () => {
    const { container } = render(<Readout {...BASE_PROPS} />)
    const svg = container.querySelector('.readout__plot')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies readout__value--number class for kind=number', () => {
    const { container } = render(<Readout {...BASE_PROPS} kind="number" />)
    const dd = container.querySelector('.readout__value--number')
    expect(dd).toBeInTheDocument()
  })

  it('applies readout__value--phrase class for kind=phrase', () => {
    const { container } = render(<Readout {...BASE_PROPS} kind="phrase" value="A medida de cada rol." />)
    const dd = container.querySelector('.readout__value--phrase')
    expect(dd).toBeInTheDocument()
  })

  it('renders the caption in a dt element', () => {
    const { container } = render(<Readout {...BASE_PROPS} />)
    const dt = container.querySelector('dt.readout__caption')
    expect(dt).toBeInTheDocument()
    expect(dt?.textContent).toBe('Requisitos funcionales refinados con iteración y prototipo.')
  })

  it('renders the value in a dd element', () => {
    const { container } = render(<Readout {...BASE_PROPS} />)
    const dd = container.querySelector('dd.readout__value')
    expect(dd).toBeInTheDocument()
    expect(dd?.textContent).toBe('167 → 216')
  })

  it('renders all 6 real Magupell readouts without error', () => {
    const readouts = [
      { label: 'REQUISITOS', value: '167 → 216', kind: 'number' as const, caption: 'Requisitos funcionales refinados con iteración y prototipo.', plotVariant: 'growth' },
      { label: 'PRUEBAS', value: '1.803', kind: 'number' as const, caption: 'Pruebas automatizadas: 1.042 backend + 761 frontend. Estabilidad garantizada en cada cambio.', plotVariant: 'steps' },
      { label: 'ENTORNOS', value: '3 entornos', kind: 'number' as const, caption: 'Local, desarrollo y producción, con pipelines protegidas.', plotVariant: 'bars' },
      { label: 'TIEMPO A PRODUCCIÓN', value: '7 meses', kind: 'number' as const, caption: 'De los primeros requerimientos a producción.', plotVariant: 'stair' },
      { label: 'IMPACTO', value: 'Sustituyó lo manual.', kind: 'phrase' as const, caption: 'El sistema orquesta la operación y da insights de datos. En su primer mes, ya es una realidad para todos los usuarios.', plotVariant: 'impact' },
      { label: 'A MEDIDA', value: 'A medida de cada rol.', kind: 'phrase' as const, caption: 'Admin, cliente, inspector y proveedor: cada función con lo que necesita, con control y auditoría completa.', plotVariant: 'roles' },
    ]
    readouts.forEach((r, i) => {
      const { unmount } = render(<Readout {...r} index={i} />)
      expect(screen.getByText(r.value)).toBeInTheDocument()
      unmount()
    })
  })
})
