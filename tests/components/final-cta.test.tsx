import { render, screen } from '@testing-library/react'
import { FinalCTA } from '@/components/final-cta'
import { homeContent } from '@/content/es/home'

const { finalCta } = homeContent

describe('FinalCTA', () => {
  it('renders the section with the contacto DOM id', () => {
    render(<FinalCTA content={finalCta} />)
    expect(document.getElementById('contacto')).toBeInTheDocument()
  })

  it('renders the heading with the CTA title', () => {
    render(<FinalCTA content={finalCta} />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('aria-label', finalCta.title)
  })

  it('renders the body copy', () => {
    render(<FinalCTA content={finalCta} />)
    expect(screen.getByText(finalCta.body)).toBeInTheDocument()
  })

  it('renders the contact form submit button', () => {
    render(<FinalCTA content={finalCta} />)
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument()
  })

  it('renders the email link in the address', () => {
    render(<FinalCTA content={finalCta} />)
    expect(
      screen.getByRole('link', { name: finalCta.email }),
    ).toHaveAttribute('href', `mailto:${finalCta.email}`)
  })

  it('renders the location', () => {
    render(<FinalCTA content={finalCta} />)
    expect(screen.getByText(finalCta.location)).toBeInTheDocument()
  })

  it('renders the languages line', () => {
    render(<FinalCTA content={finalCta} />)
    expect(screen.getByText(finalCta.languages)).toBeInTheDocument()
  })
})
