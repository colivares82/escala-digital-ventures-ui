/**
 * CaseNarrative component tests — variant dispatcher (SPEC-CASE-01).
 * Verifies each of the 6 narrative variants renders through its own component.
 */
import { render, screen } from '@testing-library/react'
import { CaseNarrative } from '@/components/case-narrative'
import type { CaseNarrativeBlock } from '@/content/data/cases'

const BLOCKS: CaseNarrativeBlock[] = [
  {
    variant: 'prose',
    num: '01',
    label: 'CONTEXTO',
    paragraphs: ['Párrafo de contexto.'],
  },
  {
    variant: 'flow-fig',
    num: '03',
    label: 'SOLUCIÓN',
    paragraphs: ['Párrafo de solución.'],
    flowNodes: [
      { index: '01', title: 'Catálogo', detail: 'detalle 1' },
      { index: '02', title: 'Inspección', detail: 'detalle 2' },
    ],
    flowBand: 'UN SOLO DATO',
    flowCaption: 'FIG. EXP-02 — TEST',
    flowAriaLabel: 'flujo de prueba',
  },
  {
    variant: 'roles',
    num: '04',
    label: 'A MEDIDA DE CADA ROL',
    lead: 'Lead de roles.',
    roles: [{ index: 'ROL 01', title: 'Admin', body: 'body admin' }],
  },
  {
    variant: 'governance',
    num: '05',
    label: 'GOBERNANZA',
    heading: 'Heading gobernanza',
    lead: 'Lead gobernanza.',
    cards: [{ label: 'ACCESO', body: 'body acceso' }],
  },
  {
    variant: 'capabilities',
    num: '02',
    label: 'CAPACIDADES',
    sectionLabel: 'CAPACIDADES ENTREGADAS',
    capabilities: [{ index: '01', title: 'Capacidad 1', body: 'body capacidad' }],
  },
  {
    variant: 'timeline',
    num: '06',
    label: 'IMPACTO',
    paragraphs: ['Párrafo de impacto.'],
    milestones: [{ date: 'JUL 2026', title: 'Producción', detail: 'detalle producción' }],
    timelineCaption: 'FIG. EXP-03 — TEST',
    timelineAriaLabel: 'cronología de prueba',
  },
]

describe('CaseNarrative', () => {
  it('renders one section per block, numbered and labeled', () => {
    const { container } = render(<CaseNarrative blocks={BLOCKS} />)
    const sections = container.querySelectorAll('.case-narrative__section')
    expect(sections).toHaveLength(BLOCKS.length)
    BLOCKS.forEach((b, i) => {
      const section = sections[i]!
      expect(section.querySelector('.case-narrative__num')?.textContent).toBe(b.num)
      expect(section.querySelector('.case-narrative__label')?.textContent).toBe(b.label)
    })
  })

  it('renders prose paragraphs', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('Párrafo de contexto.')).toBeInTheDocument()
  })

  it('renders the flow-fig block via CaseFlowFig (band text present)', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('UN SOLO DATO')).toBeInTheDocument()
  })

  it('renders the roles block via CaseRolesGrid', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('renders the governance block via CaseGovernance', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('Heading gobernanza')).toBeInTheDocument()
  })

  it('renders the capabilities block via CapabilityGrid', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('Capacidad 1')).toBeInTheDocument()
  })

  it('renders the timeline block via CaseTimelineLadder', () => {
    render(<CaseNarrative blocks={BLOCKS} />)
    expect(screen.getByText('detalle producción')).toBeInTheDocument()
  })

  it('applies a variant-scoped class per section', () => {
    const { container } = render(<CaseNarrative blocks={BLOCKS} />)
    expect(container.querySelector('.case-narrative__section--governance')).toBeInTheDocument()
    expect(container.querySelector('.case-narrative__section--prose')).toBeInTheDocument()
  })
})
