/**
 * Tests for components/page-header.tsx
 * Spec: SPEC-P1 FR-6.1
 */
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageHeader } from '@/components/page-header'

describe('PageHeader', () => {
  it('renders eyebrow, title, and lead on paper surface', () => {
    const { getByText } = render(
      <PageHeader
        eyebrow="01 / TEST"
        title="Test Title"
        lead="A lead paragraph."
        surface="paper"
      />,
    )
    expect(getByText('01 / TEST')).toBeInTheDocument()
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('A lead paragraph.')).toBeInTheDocument()
  })

  it('renders eyebrow and title without lead (lead is optional)', () => {
    const { getByText, queryByRole } = render(
      <PageHeader eyebrow="02 / NO LEAD" title="No lead here" surface="paper" />,
    )
    expect(getByText('02 / NO LEAD')).toBeInTheDocument()
    expect(getByText('No lead here')).toBeInTheDocument()
  })

  it('uses a <header> element as the root', () => {
    const { container } = render(
      <PageHeader eyebrow="EY" title="Title" surface="paper" />,
    )
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('renders h1 for the title', () => {
    const { getByRole } = render(
      <PageHeader eyebrow="EY" title="The Title" surface="paper" />,
    )
    expect(getByRole('heading', { level: 1, name: 'The Title' })).toBeInTheDocument()
  })

  it('applies dark-surface class on abisal surface', () => {
    const { container } = render(
      <PageHeader eyebrow="EY" title="Dark" surface="abisal" />,
    )
    expect(container.querySelector('.page-header')).toHaveClass('dark-surface')
  })

  it('does NOT apply dark-surface class on paper surface', () => {
    const { container } = render(
      <PageHeader eyebrow="EY" title="Light" surface="paper" />,
    )
    expect(container.querySelector('.page-header')).not.toHaveClass('dark-surface')
  })

  it('applies page-header CSS class', () => {
    const { container } = render(
      <PageHeader eyebrow="EY" title="T" surface="paper" />,
    )
    expect(container.querySelector('.page-header')).toBeInTheDocument()
  })
})
