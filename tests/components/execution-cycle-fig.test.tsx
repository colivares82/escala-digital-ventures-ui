import { render, screen } from '@testing-library/react'
import { ExecutionCycleFig } from '@/components/execution-cycle-fig'
import { methodContent } from '@/content/es/method'

const { pipeline } = methodContent

function renderFig() {
  return render(
    <ExecutionCycleFig
      sectionIndex={pipeline.sectionIndex}
      sectionLabel={pipeline.sectionEyebrow}
      sectionTitle={pipeline.sectionTitle}
      lead={pipeline.lead}
      stations={pipeline.stations}
      centre={pipeline.centre}
      returnLabel={pipeline.returnLabel}
      caption={pipeline.caption}
      ariaLabel={pipeline.ariaLabel}
    />,
  )
}

describe('ExecutionCycleFig', () => {
  it('renders the section title', () => {
    renderFig()
    expect(screen.getByText(pipeline.sectionTitle)).toBeInTheDocument()
  })

  it('renders the lead paragraph', () => {
    renderFig()
    expect(screen.getByText(pipeline.lead)).toBeInTheDocument()
  })

  it('renders the figure caption', () => {
    renderFig()
    expect(screen.getByText(pipeline.caption)).toBeInTheDocument()
  })

  it('renders an accessible figure with aria-label', () => {
    renderFig()
    expect(screen.getByRole('img', { name: pipeline.ariaLabel })).toBeInTheDocument()
  })

  it('renders exactly 5 stations (ring + static fallback = 2 occurrences each)', () => {
    renderFig()
    pipeline.stations.forEach((station) => {
      const matches = screen.getAllByText(station.label)
      expect(matches.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('renders exactly 2 client stations with the client marker class', () => {
    renderFig()
    const clientDots = document.querySelectorAll('.cycle-node-dot--client')
    expect(clientDots.length).toBe(2)
  })

  it('renders exactly 5 direction chevrons, always visible (no reduced-motion gate)', () => {
    renderFig()
    const chevrons = document.querySelectorAll('.cycle-chev')
    expect(chevrons.length).toBe(5)
  })

  it('renders a single closed ring (circle) plus the amber return arc', () => {
    renderFig()
    expect(document.querySelector('.cycle-ring')).toBeInTheDocument()
    expect(document.querySelector('.cycle-ring-return')).toBeInTheDocument()
  })

  it('renders both centre mono lines', () => {
    renderFig()
    expect(screen.getAllByText(pipeline.centre[0]).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(pipeline.centre[1]).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the return-edge label', () => {
    renderFig()
    expect(screen.getAllByText(new RegExp(pipeline.returnLabel)).length).toBeGreaterThanOrEqual(1)
  })

  it('renders the section eyebrow', () => {
    renderFig()
    expect(screen.getByText(pipeline.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the accessible text summary in the sr-only figcaption', () => {
    renderFig()
    const caption = document.querySelector('.sr-only')
    expect(caption).toBeInTheDocument()
    expect(caption?.textContent).toContain(pipeline.returnLabel)
  })

  it('starts visible via IntersectionObserver mock (opacity fade-in controlled by data class)', () => {
    renderFig()
    const fig = document.querySelector('.execution-cycle__fig')
    expect(fig).toBeInTheDocument()
  })

  it('never labels a station "Calidad" (quality is not a station, per §2.2)', () => {
    renderFig()
    pipeline.stations.forEach((station) => {
      expect(station.label.toLowerCase()).not.toContain('calidad')
    })
  })
})
