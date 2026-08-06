import { render, screen } from '@testing-library/react'
import { FinalCTA } from '@/components/final-cta'
import { contactContent } from '@/content/es/contact'

const { pageHeader, directMeta, affinityFilter } = contactContent

describe('FinalCTA', () => {
  it('renders the section with the contacto DOM id', () => {
    render(<FinalCTA />)
    expect(document.getElementById('contacto')).toBeInTheDocument()
  })

  it('renders the heading with the CTA title', () => {
    render(<FinalCTA />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(pageHeader.h1)
  })

  it('renders the lead copy', () => {
    render(<FinalCTA />)
    expect(screen.getByText(pageHeader.lead)).toBeInTheDocument()
  })

  it('renders the contact form ENVIAR MENSAJE button', () => {
    render(<FinalCTA />)
    expect(screen.getByRole('button', { name: /ENVIAR MENSAJE/i })).toBeInTheDocument()
  })

  it('renders the email link in the meta', () => {
    render(<FinalCTA />)
    expect(
      screen.getByRole('link', { name: directMeta.email }),
    ).toHaveAttribute('href', `mailto:${directMeta.email}`)
  })

  it('renders the affinity filter heading', () => {
    render(<FinalCTA />)
    expect(screen.getByText(affinityFilter.heading)).toBeInTheDocument()
  })

  it('renders the FICHA DE CONTACTO dossier header', () => {
    render(<FinalCTA />)
    expect(screen.getByText(contactContent.dossierHeader.title)).toBeInTheDocument()
  })
})
