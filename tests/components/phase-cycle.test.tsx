import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PhaseCycle } from '@/components/phase-cycle'
import { homeContent } from '@/content/es/home'

// window.scrollTo is not implemented in jsdom
Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() })

const PROPS = {
  phases: homeContent.framework.phases,
  title: homeContent.framework.title,
  action: homeContent.framework.action,
  sectionLabel: homeContent.labels.framework,
  lead: homeContent.labels.frameworkLead,
  ariaLabel: homeContent.labels.frameworkAria,
  phasePrefix: homeContent.labels.phasePrefix,
}

// Regression props for the method page (no action, letter sectionIndex)
const METHOD_PROPS = {
  phases: homeContent.framework.phases,
  title: 'Un método propio: el Escala Growth Framework',
  sectionLabel: 'EL CICLO DE CRECIMIENTO',
  sectionIndex: 'B',
  lead: 'DIEZ FASES · UN CICLO CONTINUO DE MEJORA',
  ariaLabel: 'Ciclo de crecimiento de diez fases',
  phasePrefix: 'FASE',
}

describe('PhaseCycle', () => {
  it('renders the section heading', () => {
    render(<PhaseCycle {...PROPS} />)
    // Title appears in both the pinned header and the static header
    expect(screen.getAllByText(PROPS.title)[0]).toBeInTheDocument()
  })

  it('renders the section label in the eyebrow', () => {
    render(<PhaseCycle {...PROPS} />)
    expect(screen.getAllByText(PROPS.sectionLabel)[0]).toBeInTheDocument()
  })

  it('renders the lead text', () => {
    render(<PhaseCycle {...PROPS} />)
    expect(screen.getAllByText(PROPS.lead)[0]).toBeInTheDocument()
  })

  it('renders the SVG ring with its aria-label', () => {
    render(<PhaseCycle {...PROPS} />)
    expect(screen.getByRole('group', { name: PROPS.ariaLabel })).toBeInTheDocument()
  })

  it('shows the first phase name in the active panel by default', () => {
    render(<PhaseCycle {...PROPS} />)
    // The active panel h3 shows the first phase
    expect(screen.getAllByText('Discover')[0]).toBeInTheDocument()
  })

  it('renders the static fallback list with all 10 phases', () => {
    render(<PhaseCycle {...PROPS} />)
    const staticList = document.querySelector('.phase-cycle__static')
    expect(staticList).toBeInTheDocument()
    PROPS.phases.forEach((phase) => {
      expect(screen.getAllByText(phase.name).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders the action link to the method page', () => {
    render(<PhaseCycle {...PROPS} />)
    const links = screen.getAllByRole('link', { name: new RegExp(PROPS.action) })
    expect(links.length).toBeGreaterThanOrEqual(1)
    expect(links[0]).toHaveAttribute('href', '/como-trabajamos')
  })

  it('renders 10 phase nodes as interactive buttons', () => {
    render(<PhaseCycle {...PROPS} />)
    const phaseButtons = screen.getAllByRole('button')
    expect(phaseButtons.length).toBe(10)
  })

  it('marks the first node as the current step by default', () => {
    render(<PhaseCycle {...PROPS} />)
    const currentNode = screen.getByRole('button', {
      name: /Fase 01/i,
    })
    expect(currentNode).toHaveAttribute('aria-current', 'step')
  })

  it('changes the active phase when a node is clicked', async () => {
    const user = userEvent.setup()
    render(<PhaseCycle {...PROPS} />)

    const secondPhaseButton = screen.getByRole('button', { name: /Fase 02/i })
    await user.click(secondPhaseButton)

    expect(secondPhaseButton).toHaveAttribute('aria-current', 'step')
  })

  it('responds to Enter key on phase nodes', async () => {
    const user = userEvent.setup()
    render(<PhaseCycle {...PROPS} />)

    const thirdPhaseButton = screen.getByRole('button', { name: /Fase 03/i })
    thirdPhaseButton.focus()
    await user.keyboard('{Enter}')

    expect(thirdPhaseButton).toHaveAttribute('aria-current', 'step')
  })

  it('responds to Space key on phase nodes', async () => {
    const user = userEvent.setup()
    render(<PhaseCycle {...PROPS} />)

    const fourthPhaseButton = screen.getByRole('button', { name: /Fase 04/i })
    fourthPhaseButton.focus()
    await user.keyboard(' ')

    expect(fourthPhaseButton).toHaveAttribute('aria-current', 'step')
  })

  // ── Regression: sectionIndex + optional action (SPEC-P2.1 FR-3.3) ────────

  it('defaults sectionIndex to "03" when not provided', () => {
    render(<PhaseCycle {...PROPS} />)
    // Both the pinned and static headers should show "03"
    const indexes = screen.getAllByText('03')
    expect(indexes.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the custom sectionIndex letter when provided', () => {
    render(<PhaseCycle {...METHOD_PROPS} />)
    const indexes = screen.getAllByText('B')
    expect(indexes.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render an action link when action is omitted (method page self-link suppression)', () => {
    render(<PhaseCycle {...METHOD_PROPS} />)
    // No link should be present (action is undefined)
    const links = screen.queryAllByRole('link')
    expect(links).toHaveLength(0)
  })

  it('home page still renders action link when action is provided (no regression)', () => {
    render(<PhaseCycle {...PROPS} />)
    const links = screen.getAllByRole('link', { name: /Cómo trabajamos/ })
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
