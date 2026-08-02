import { render, screen } from '@testing-library/react'
import { SectionIndex } from '@/components/section-index'

describe('SectionIndex', () => {
  it('renders the index number', () => {
    render(<SectionIndex index="03" label="MÉTODO" />)
    expect(screen.getByText('03')).toBeInTheDocument()
  })

  it('renders the label', () => {
    render(<SectionIndex index="03" label="MÉTODO" />)
    expect(screen.getByText('MÉTODO')).toBeInTheDocument()
  })

  it('renders the separator as aria-hidden', () => {
    render(<SectionIndex index="01" label="TEST" />)
    const separator = screen.getByText('/')
    expect(separator).toHaveAttribute('aria-hidden', 'true')
  })
})
