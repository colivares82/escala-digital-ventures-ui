import { render, screen } from '@testing-library/react'
import { SystemDiagram } from '@/components/system-diagram'
import type { HeroFigureContent } from '@/components/hero-narrative-fig'
import type { ProblemFlowsFigContent } from '@/components/problem-flows-fig'

const mockHeroFigure: HeroFigureContent = {
  zones: ['01 · PROCESOS MANUALES', '02 · SISTEMA A MEDIDA', '03 · VALOR REAL Y MEDIBLE'],
  inputs: ['CORREOS', 'HOJAS DE CÁLCULO', 'NOTAS', 'CATÁLOGO', 'HISTORIALES'],
  system: { title: '02 · SISTEMA A MEDIDA', innerLabel: 'ORDENA · MODELA' },
  outputs: [
    { label: 'INSIGHT', sub: 'Decisiones y datos' },
    { label: 'OPTIMIZACIÓN', sub: 'de procesos' },
  ],
  caption: 'FIG. 01 — DE MUCHOS PROCESOS MANUALES A VALOR REAL Y MEDIBLE',
}

const mockProblemFigure: ProblemFlowsFigContent = {
  pieces: [
    'HOJAS DE CÁLCULO',
    'CORREOS',
    'NOTAS',
    'CATÁLOGO',
    'HISTORIAL',
  ],
  core: ['PROCESOS', 'MANUALES'],
  caption: 'FIG. 02 — UNA OPERATIVA QUE DEPENDE DE PROCESOS MANUALES: LOS FLUJOS NO SE COMPLETAN',
  note: 'CADA PIEZA INTENTA CONECTARSE · EL FLUJO SE CORTA EN EL PASO MANUAL',
}

describe('SystemDiagram', () => {
  describe('kind="hero" with heroFigure (narrative redesign)', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="hero" label="Hero diagram" heroFigure={mockHeroFigure} />)
      expect(screen.getByRole('img', { name: 'Hero diagram' })).toBeInTheDocument()
    })

    it('renders the figcaption from heroFigure.caption', () => {
      render(<SystemDiagram kind="hero" label="Hero diagram" heroFigure={mockHeroFigure} />)
      expect(screen.getByText(mockHeroFigure.caption)).toBeInTheDocument()
    })

    it('renders a figure element', () => {
      const { container } = render(
        <SystemDiagram kind="hero" label="Hero" heroFigure={mockHeroFigure} />,
      )
      expect(container.querySelector('figure')).toBeInTheDocument()
    })

    it('renders the particle layer with aria-hidden', () => {
      const { container } = render(
        <SystemDiagram kind="hero" label="Hero" heroFigure={mockHeroFigure} />,
      )
      const layer = container.querySelector('.hero-particle-layer')
      expect(layer).toBeInTheDocument()
      expect(layer).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('kind="hero" without heroFigure (legacy fallback)', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="hero" label="Hero diagram" />)
      expect(screen.getByRole('img', { name: 'Hero diagram' })).toBeInTheDocument()
    })

    it('renders FIG. 01 in the figcaption', () => {
      render(<SystemDiagram kind="hero" label="Hero diagram" />)
      expect(screen.getByText(/FIG\. 01/)).toBeInTheDocument()
    })

    it('renders a figure element', () => {
      const { container } = render(<SystemDiagram kind="hero" label="Hero" />)
      expect(container.querySelector('figure')).toBeInTheDocument()
    })
  })

  describe('kind="problem" with problemFigure (redesign SPEC-POLISH-02)', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="problem" label="Problem diagram" problemFigure={mockProblemFigure} />)
      expect(screen.getByRole('img', { name: 'Problem diagram' })).toBeInTheDocument()
    })

    it('renders the figcaption from problemFigure.caption', () => {
      render(<SystemDiagram kind="problem" label="Problem diagram" problemFigure={mockProblemFigure} />)
      expect(screen.getByText(mockProblemFigure.caption)).toBeInTheDocument()
    })

    it('renders the note from problemFigure.note', () => {
      render(<SystemDiagram kind="problem" label="Problem diagram" problemFigure={mockProblemFigure} />)
      expect(screen.getByText(mockProblemFigure.note)).toBeInTheDocument()
    })

    it('renders the pulse layer with aria-hidden', () => {
      const { container } = render(
        <SystemDiagram kind="problem" label="Problem diagram" problemFigure={mockProblemFigure} />,
      )
      const layer = container.querySelector('.problem-pulse-layer')
      expect(layer).toBeInTheDocument()
      expect(layer).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('kind="problem" without problemFigure (legacy fallback)', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="problem" label="Problem diagram" />)
      expect(screen.getByRole('img', { name: 'Problem diagram' })).toBeInTheDocument()
    })

    it('renders FIG. 02 in the figcaption', () => {
      render(<SystemDiagram kind="problem" label="Problem diagram" />)
      expect(screen.getByText(/FIG\. 02/)).toBeInTheDocument()
    })
  })

  describe('kind="proof"', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="proof" label="Proof diagram" />)
      expect(screen.getByRole('img', { name: 'Proof diagram' })).toBeInTheDocument()
    })

    it('renders FIG. 04 in the figcaption', () => {
      render(<SystemDiagram kind="proof" label="Proof diagram" />)
      expect(screen.getByText(/FIG\. 04/)).toBeInTheDocument()
    })
  })

  describe('kind="outcome"', () => {
    it('renders an SVG with the provided aria-label', () => {
      render(<SystemDiagram kind="outcome" label="Alliance diagram" />)
      expect(screen.getByRole('img', { name: 'Alliance diagram' })).toBeInTheDocument()
    })

    it('renders FIG. 05 in the figcaption', () => {
      render(<SystemDiagram kind="outcome" label="Alliance diagram" />)
      expect(screen.getByText(/FIG\. 05/)).toBeInTheDocument()
    })
  })

  it('renders the label text in the figcaption for all kinds', () => {
    const kinds = ['hero', 'problem', 'proof', 'outcome'] as const
    kinds.forEach((kind) => {
      const { unmount } = render(
        <SystemDiagram kind={kind} label={`Test label ${kind}`} />,
      )
      expect(screen.getByText(new RegExp(`Test label ${kind}`))).toBeInTheDocument()
      unmount()
    })
  })
})
