/**
 * HeroNarrativeFig component tests — SPEC-POLISH-01.
 * Verifies: SVG role/aria-label, three acts rendered, particles layer aria-hidden,
 * figcaption, zone labels, input labels, output labels, system inner label.
 */
import { render, screen } from '@testing-library/react'
import { HeroNarrativeFig } from '@/components/hero-narrative-fig'
import type { HeroFigureContent } from '@/components/hero-narrative-fig'

const mockContent: HeroFigureContent = {
  zones: ['01 · PROCESOS MANUALES', '02 · SISTEMA A MEDIDA', '03 · VALOR REAL Y MEDIBLE'],
  inputs: ['CORREOS', 'HOJAS DE CÁLCULO', 'NOTAS', 'CATÁLOGO', 'HISTORIALES'],
  system: { title: '02 · SISTEMA A MEDIDA', innerLabel: 'ORDENA · MODELA' },
  outputs: [
    { label: 'INSIGHT', sub: 'Decisiones y datos' },
    { label: 'OPTIMIZACIÓN', sub: 'de procesos' },
  ],
  caption: 'FIG. 01 — DE MUCHOS PROCESOS MANUALES A VALOR REAL Y MEDIBLE',
}

describe('HeroNarrativeFig', () => {
  it('renders an SVG with the provided aria-label', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test aria label" />)
    expect(screen.getByRole('img', { name: 'Test aria label' })).toBeInTheDocument()
  })

  it('renders a figure element', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('figure')).toBeInTheDocument()
  })

  it('renders the figcaption with the caption text', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test" />)
    expect(screen.getByText(mockContent.caption)).toBeInTheDocument()
  })

  it('renders all three zone labels', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test" />)
    mockContent.zones.forEach((zone) => {
      expect(screen.getByText(zone)).toBeInTheDocument()
    })
  })

  it('renders all five input labels', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test" />)
    mockContent.inputs.forEach((input) => {
      expect(screen.getByText(input)).toBeInTheDocument()
    })
  })

  it('renders the system inner label', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test" />)
    expect(screen.getByText(mockContent.system.innerLabel)).toBeInTheDocument()
  })

  it('renders both output labels', () => {
    render(<HeroNarrativeFig content={mockContent} ariaLabel="Test" />)
    mockContent.outputs.forEach((out) => {
      expect(screen.getByText(out.label)).toBeInTheDocument()
      expect(screen.getByText(out.sub)).toBeInTheDocument()
    })
  })

  it('renders the particle layer with aria-hidden', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const particleLayer = container.querySelector('.hero-particle-layer')
    expect(particleLayer).toBeInTheDocument()
    expect(particleLayer).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders 5 input path elements', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const inPaths = container.querySelectorAll('.hero-fig__in-path')
    expect(inPaths).toHaveLength(5)
  })

  it('renders 2 output path elements', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const outPaths = container.querySelectorAll('.hero-fig__out-path')
    expect(outPaths).toHaveLength(2)
  })

  it('renders 5 input box rects', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const inputBoxes = container.querySelectorAll('.hero-fig__input-box')
    expect(inputBoxes).toHaveLength(5)
  })

  it('renders 2 output box rects', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const outputBoxes = container.querySelectorAll('.hero-fig__output-box')
    expect(outputBoxes).toHaveLength(2)
  })

  it('renders the system zone rect', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    expect(container.querySelector('.hero-fig__system-rect')).toBeInTheDocument()
  })

  it('renders corner tick paths', () => {
    const { container } = render(
      <HeroNarrativeFig content={mockContent} ariaLabel="Test" />,
    )
    const ticks = container.querySelector('.diagram-frame-ticks')
    expect(ticks).toBeInTheDocument()
    expect(ticks?.querySelectorAll('path')).toHaveLength(4)
  })
})
