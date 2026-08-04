import { render, screen } from '@testing-library/react'
import { AiBuildBlock } from '@/components/ai-build-block'
import { methodContent } from '@/content/es/method'

const { aiBuild } = methodContent

describe('AiBuildBlock', () => {
  it('renders the section title', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    expect(screen.getByRole('heading', { level: 2, name: aiBuild.title })).toBeInTheDocument()
  })

  it('renders the section eyebrow label', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    expect(screen.getByText(aiBuild.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the lead paragraph verbatim from Libro Ch. 7', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    expect(screen.getByText(aiBuild.lead)).toBeInTheDocument()
  })

  it('renders all mono points', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    aiBuild.points.forEach((point) => {
      expect(screen.getByText(point)).toBeInTheDocument()
    })
  })

  it('renders between 3 and 4 points (sobriety guard per FR-6.2)', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    const listItems = document.querySelectorAll('.ai-build__point')
    expect(listItems.length).toBeGreaterThanOrEqual(3)
    expect(listItems.length).toBeLessThanOrEqual(4)
  })

  it('renders the diagram step labels', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    aiBuild.diagram.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument()
    })
  })

  it('renders an accessible diagram aside', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    expect(screen.getByRole('complementary', { name: /diagrama/i })).toBeInTheDocument()
  })

  it('contains no vendor or model names (editorial guardrail FR-6.3)', () => {
    render(
      <AiBuildBlock
        sectionIndex={aiBuild.sectionIndex}
        sectionLabel={aiBuild.sectionEyebrow}
        title={aiBuild.title}
        lead={aiBuild.lead}
        points={aiBuild.points}
        diagram={aiBuild.diagram}
      />
    )
    const text = document.body.textContent ?? ''
    // No specific vendor/model names per editorial guardrail
    expect(text).not.toMatch(/openai|claude|anthropic|gpt|gemini|llama/i)
  })
})
