import { render, screen } from '@testing-library/react'
import { HowWeBuildFig } from '@/components/how-we-build-fig'
import { methodContent } from '@/content/es/method'

const { figure } = methodContent.aiBuild

function renderFig() {
  return render(<HowWeBuildFig content={figure} />)
}

describe('HowWeBuildFig', () => {
  it('renders an accessible figure with aria-label', () => {
    renderFig()
    expect(screen.getByRole('img', { name: figure.ariaLabel })).toBeInTheDocument()
  })

  it('renders the figure caption', () => {
    renderFig()
    expect(screen.getByText(figure.caption)).toBeInTheDocument()
  })

  it('renders the dashed governing frame label', () => {
    renderFig()
    expect(screen.getByText(figure.frame)).toBeInTheDocument()
    expect(document.querySelector('.build-frame')).toBeInTheDocument()
  })

  it('renders the entry node (approved specification)', () => {
    renderFig()
    expect(screen.getByText(figure.entry)).toBeInTheDocument()
    expect(screen.getByText(figure.entrySub)).toBeInTheDocument()
  })

  it('renders all three named parallel lanes', () => {
    renderFig()
    figure.lanes.forEach((lane) => {
      expect(screen.getByText(lane)).toBeInTheDocument()
    })
  })

  it('renders exactly two amber gates, each labelled', () => {
    renderFig()
    expect(document.querySelectorAll('.build-gate').length).toBe(2)
    expect(screen.getByText(figure.gate1)).toBeInTheDocument()
    expect(screen.getByText(figure.gate2)).toBeInTheDocument()
  })

  it('renders the production exit node', () => {
    renderFig()
    expect(screen.getByText(figure.exit)).toBeInTheDocument()
    expect(screen.getByText(figure.exitSub)).toBeInTheDocument()
  })

  it('renders the amber return-path label', () => {
    renderFig()
    expect(screen.getByText(figure.returnLabel)).toBeInTheDocument()
    expect(document.querySelectorAll('.build-ret').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the accessible text summary in the sr-only figcaption', () => {
    renderFig()
    const caption = document.querySelector('.sr-only')
    expect(caption).toBeInTheDocument()
    expect(caption?.textContent).toContain(figure.returnLabel)
  })

  it('starts as visible via the IntersectionObserver mock', () => {
    renderFig()
    const fig = document.querySelector('.how-we-build__fig')
    expect(fig).toBeInTheDocument()
  })

  it('contains no vendor or model names (editorial guardrail)', () => {
    renderFig()
    const text = document.body.textContent ?? ''
    expect(text).not.toMatch(/openai|claude|anthropic|gpt|gemini|llama/i)
  })
})
