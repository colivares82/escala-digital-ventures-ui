import { render, screen } from '@testing-library/react'
import { Readout } from '@/components/readout'

const BASE_PROPS = {
  value: '100+',
  label: 'REQUISITOS',
  caption: 'implementados y verificados en producción',
  source: 'MAGUPELL',
  index: 0,
}

describe('Readout', () => {
  it('renders the label in the data header', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(screen.getByText(/REQUISITOS/)).toBeInTheDocument()
  })

  it('renders the source name in the data header', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(screen.getByText(/MAGUPELL/)).toBeInTheDocument()
  })

  it('renders the padded DAT index', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(screen.getByText(/DAT\.01/)).toBeInTheDocument()
  })

  it('renders the caption text', () => {
    render(<Readout {...BASE_PROPS} />)
    expect(
      screen.getByText('implementados y verificados en producción'),
    ).toBeInTheDocument()
  })

  it('uses CountUp (aria-label) for numeric values', () => {
    render(<Readout {...BASE_PROPS} />)
    // CountUp renders a <span aria-label={value}> — queryable via getByLabelText
    const span = screen.getByLabelText('100+')
    expect(span).toBeInTheDocument()
    expect(span.tagName.toLowerCase()).toBe('span')
  })

  it('renders non-numeric values as plain text', () => {
    render(<Readout {...BASE_PROPS} value="REAL" />)
    expect(screen.getByText('REAL')).toBeInTheDocument()
  })

  it('renders an SVG sparkline with an aria-label', () => {
    render(<Readout {...BASE_PROPS} />)
    const svg = screen.getByRole('img', { name: /trazado de requisitos/i })
    expect(svg).toBeInTheDocument()
  })

  it('renders with different index values correctly', () => {
    render(<Readout {...BASE_PROPS} index={3} />)
    expect(screen.getByText(/DAT\.04/)).toBeInTheDocument()
  })
})
