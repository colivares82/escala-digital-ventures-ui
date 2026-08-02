import { render, screen } from '@testing-library/react'
import { SystemDiagram } from '@/components/system-diagram'

describe('SystemDiagram', () => {
  describe('kind="hero"', () => {
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

  describe('kind="problem"', () => {
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
