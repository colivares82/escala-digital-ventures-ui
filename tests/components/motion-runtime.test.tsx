import { render, screen } from '@testing-library/react'
import { Reveal, DiagramReveal, WordReveal, MotionRuntime } from '@/components/motion-runtime'

describe('MotionRuntime', () => {
  it('renders children', () => {
    render(
      <MotionRuntime>
        <p>Content</p>
      </MotionRuntime>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

describe('Reveal', () => {
  it('renders children inside a div with reveal class', () => {
    const { container } = render(<Reveal><span>Hello</span></Reveal>)
    expect(container.querySelector('.reveal')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('appends extra className to reveal div', () => {
    const { container } = render(
      <Reveal className="extra-class"><span>x</span></Reveal>,
    )
    expect(container.querySelector('.reveal.extra-class')).toBeInTheDocument()
  })

  it('sets data-visible="true" after IntersectionObserver fires', () => {
    const { container } = render(<Reveal><span>visible</span></Reveal>)
    // Our mock observer fires immediately with isIntersecting: true
    expect(container.querySelector('[data-visible="true"]')).toBeInTheDocument()
  })
})

describe('DiagramReveal', () => {
  it('renders with diagram-reveal class', () => {
    const { container } = render(
      <DiagramReveal><svg /></DiagramReveal>,
    )
    expect(container.querySelector('.diagram-reveal')).toBeInTheDocument()
  })
})

describe('WordReveal', () => {
  it('renders as h2 by default with aria-label matching text', () => {
    render(<WordReveal text="Hello World" />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', 'Hello World')
  })

  it('renders as h1 when as="h1"', () => {
    render(<WordReveal text="Title" as="h1" />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('wraps each word in a mask span', () => {
    const { container } = render(<WordReveal text="A B C" />)
    const masks = container.querySelectorAll('.word-reveal__mask')
    expect(masks).toHaveLength(3)
  })

  it('applies custom className', () => {
    const { container } = render(<WordReveal text="Test" className="my-title" />)
    expect(container.querySelector('.word-reveal.my-title')).toBeInTheDocument()
  })
})
