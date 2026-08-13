import { render, screen } from '@testing-library/react'
import { AiBuildBlock } from '@/components/ai-build-block'
import { methodContent } from '@/content/es/method'

const { aiBuild } = methodContent

function renderBlock() {
  return render(
    <AiBuildBlock
      sectionIndex={aiBuild.sectionIndex}
      sectionLabel={aiBuild.sectionEyebrow}
      title={aiBuild.title}
      body={aiBuild.body}
      figure={aiBuild.figure}
      legend={aiBuild.legend}
    />,
  )
}

describe('AiBuildBlock', () => {
  it('renders the section title', () => {
    renderBlock()
    expect(screen.getByRole('heading', { level: 2, name: aiBuild.title })).toBeInTheDocument()
  })

  it('renders the section eyebrow label', () => {
    renderBlock()
    expect(screen.getByText(aiBuild.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the body paragraph verbatim from §3.2', () => {
    renderBlock()
    expect(screen.getByText(aiBuild.body)).toBeInTheDocument()
  })

  it('renders the HowWeBuildFig figure', () => {
    renderBlock()
    expect(screen.getByRole('img', { name: aiBuild.figure.ariaLabel })).toBeInTheDocument()
  })

  it('renders a four-item legend mapping to the figure layers', () => {
    renderBlock()
    const items = document.querySelectorAll('.ai-build__legend-item')
    expect(items.length).toBe(4)
    aiBuild.legend.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
      expect(screen.getByText(item.text)).toBeInTheDocument()
    })
  })

  it('legend is a definition list for semantic 1:1 label/text pairing', () => {
    renderBlock()
    expect(document.querySelector('dl.ai-build__legend')).toBeInTheDocument()
  })

  it('contains no vendor or model names (editorial guardrail FR-6.3)', () => {
    renderBlock()
    const text = document.body.textContent ?? ''
    expect(text).not.toMatch(/openai|claude|anthropic|gpt|gemini|llama/i)
  })
})
