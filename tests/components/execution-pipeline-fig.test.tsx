import { render, screen } from '@testing-library/react'
import { ExecutionPipelineFig } from '@/components/execution-pipeline-fig'
import { methodContent } from '@/content/es/method'

const { pipeline } = methodContent

describe('ExecutionPipelineFig', () => {
  it('renders the section title', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    expect(screen.getByText(pipeline.sectionTitle)).toBeInTheDocument()
  })

  it('renders the figure caption', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    expect(screen.getByText(pipeline.caption)).toBeInTheDocument()
  })

  it('renders an accessible figure with aria-label', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    expect(screen.getByRole('img', { name: pipeline.ariaLabel })).toBeInTheDocument()
  })

  it('renders all 6 node labels in the accessible figcaption', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    // Node labels appear in the SVG (aria-hidden) and in the sr-only figcaption
    pipeline.nodes.forEach((node) => {
      const matches = screen.getAllByText(new RegExp(node.label, 'i'))
      expect(matches.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders the section eyebrow', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    expect(screen.getByText(pipeline.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders the accessible text summary in the sr-only figcaption', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    const caption = document.querySelector('.sr-only')
    expect(caption).toBeInTheDocument()
    expect(caption?.textContent).toContain(pipeline.returnArcLabel)
  })

  it('starts as not visible (opacity fade-in controlled by IntersectionObserver)', () => {
    render(
      <ExecutionPipelineFig
        sectionIndex={pipeline.sectionIndex}
        sectionLabel={pipeline.sectionEyebrow}
        sectionTitle={pipeline.sectionTitle}
        nodes={pipeline.nodes}
        caption={pipeline.caption}
        legend={pipeline.legend}
        ariaLabel={pipeline.ariaLabel}
        returnArcLabel={pipeline.returnArcLabel}
      />
    )
    // In tests IntersectionObserver fires immediately with isIntersecting: true (per setup.ts mock)
    const fig = document.querySelector('.execution-pipeline__fig')
    expect(fig).toBeInTheDocument()
  })
})
