/**
 * CaseFlowFig component tests — FIG. EXP-02 (SPEC-CASE-01 §4).
 */
import { render, screen } from '@testing-library/react'
import { CaseFlowFig } from '@/components/case-flow-fig'
import type { CaseFlowNode } from '@/content/data/cases'

const NODES: CaseFlowNode[] = [
  { index: '01', title: 'Catálogo', detail: 'Clientes, proveedores y estándares' },
  { index: '02', title: 'Inspección', detail: 'En tablet, sobre el terreno' },
  { index: '03', title: 'Revisión y envío', detail: 'Aprobación interna' },
  { index: '04', title: 'Cobro', detail: 'Resumen del período' },
]

const BAND = 'UN SOLO DATO · TRAZABILIDAD COMPLETA · NOTIFICACIONES EN TIEMPO REAL'
const CAPTION = 'FIG. EXP-02 — UN ÚNICO FLUJO, DE LA INSPECCIÓN AL COBRO'
const ARIA_LABEL = 'Ciclo operativo de cuatro etapas'

describe('CaseFlowFig', () => {
  it('renders an accessible figure with the given aria-label', () => {
    render(<CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    expect(screen.getByRole('img', { name: ARIA_LABEL })).toBeInTheDocument()
  })

  it('renders all 4 node titles', () => {
    render(<CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    NODES.forEach((n) => {
      expect(screen.getByText(n.title)).toBeInTheDocument()
    })
  })

  it('renders all 4 node detail lines', () => {
    render(<CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    NODES.forEach((n) => {
      expect(screen.getByText(n.detail)).toBeInTheDocument()
    })
  })

  it('renders exactly 3 connectors between 4 nodes', () => {
    const { container } = render(
      <CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />,
    )
    expect(container.querySelectorAll('.case-flow-fig__connector')).toHaveLength(3)
  })

  it('renders the cross-cutting band text', () => {
    render(<CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    expect(screen.getByText(BAND)).toBeInTheDocument()
  })

  it('renders the figcaption', () => {
    render(<CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />)
    expect(screen.getByText(CAPTION)).toBeInTheDocument()
  })

  it('renders 4 node index marks', () => {
    const { container } = render(
      <CaseFlowFig nodes={NODES} band={BAND} caption={CAPTION} ariaLabel={ARIA_LABEL} />,
    )
    expect(container.querySelectorAll('.case-flow-fig__index')).toHaveLength(4)
  })
})
