import { render, screen } from '@testing-library/react'
import { ExecutionPractices } from '@/components/execution-practices'
import { methodContent } from '@/content/es/method'

const { executionPractices } = methodContent

describe('ExecutionPractices', () => {
  it('renders the section title', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    expect(screen.getByText(executionPractices.title)).toBeInTheDocument()
  })

  it('renders the lead text', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    expect(screen.getByText(executionPractices.lead)).toBeInTheDocument()
  })

  it('renders the section eyebrow label', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    expect(screen.getByText(executionPractices.sectionEyebrow)).toBeInTheDocument()
  })

  it('renders all 5 practice panels', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    const panels = document.querySelectorAll('.practice-panel')
    expect(panels).toHaveLength(5)
  })

  it('renders each practice title', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    executionPractices.practices.forEach((practice) => {
      expect(screen.getByText(practice.title)).toBeInTheDocument()
    })
  })

  it('renders each practice tie label', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    executionPractices.practices.forEach((practice) => {
      expect(screen.getByText(practice.tie)).toBeInTheDocument()
    })
  })

  it('renders the section as a landmark with heading', () => {
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={executionPractices.practices}
      />
    )
    expect(screen.getByRole('region', { name: executionPractices.title })).toBeInTheDocument()
  })

  it('renders a subset of practices correctly', () => {
    const singlePractice = [executionPractices.practices[0]!]
    render(
      <ExecutionPractices
        sectionIndex={executionPractices.sectionIndex}
        sectionLabel={executionPractices.sectionEyebrow}
        title={executionPractices.title}
        lead={executionPractices.lead}
        practices={singlePractice}
      />
    )
    const panels = document.querySelectorAll('.practice-panel')
    expect(panels).toHaveLength(1)
    expect(screen.getByText(singlePractice[0]!.title)).toBeInTheDocument()
  })
})
