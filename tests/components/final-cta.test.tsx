/**
 * FinalCTA tests — SPEC-P2.6 FR-4
 * Phase 5: FinalCTA now requires dict + locale props.
 */
import { render, screen } from '@testing-library/react'
import { FinalCTA } from '@/components/final-cta'
import { getDictionary } from '@/lib/i18n/dictionary'

const dict = getDictionary('es')
const { pageHeader, directMeta, affinityFilter, dossierHeader } = dict.contact

describe('FinalCTA', () => {
  it('renders the section with the contacto DOM id', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(document.getElementById('contacto')).toBeInTheDocument()
  })

  it('renders the heading with the CTA title', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(pageHeader.h1)
  })

  it('renders the lead copy', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(screen.getByText(pageHeader.lead)).toBeInTheDocument()
  })

  it('renders the contact form ENVIAR MENSAJE button', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(screen.getByRole('button', { name: /ENVIAR MENSAJE/i })).toBeInTheDocument()
  })

  it('renders the email link in the meta', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(
      screen.getByRole('link', { name: directMeta.email }),
    ).toHaveAttribute('href', `mailto:${directMeta.email}`)
  })

  it('renders the affinity filter heading', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(screen.getByText(affinityFilter.heading)).toBeInTheDocument()
  })

  it('renders the FICHA DE CONTACTO dossier header', () => {
    render(<FinalCTA dict={dict} locale="es" />)
    expect(screen.getByText(dossierHeader.title)).toBeInTheDocument()
  })
})
