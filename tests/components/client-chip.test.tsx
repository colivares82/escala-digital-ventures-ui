import { render, screen } from '@testing-library/react'
import { ClientChip } from '@/components/client-chip'
import type { Client } from '@/content/es/clients'

const client: Client = {
  name: 'Magupell',
  eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
  title: 'Digitalización integral de la inspección de calidad',
  text: '100+ requisitos funcionales',
  href: '/casos-de-exito/magupell',
  status: 'Ver caso',
}

describe('ClientChip', () => {
  it('renders the client name', () => {
    render(<ClientChip client={client} />)
    expect(screen.getByText('Magupell')).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<ClientChip client={client} />)
    expect(screen.getByText('EN PRODUCCIÓN · SECTOR PIEL')).toBeInTheDocument()
  })

  it('renders the status link in uppercase', () => {
    render(<ClientChip client={client} />)
    expect(screen.getByRole('link', { name: /VER CASO/i })).toBeInTheDocument()
  })

  it('link points to the correct href', () => {
    render(<ClientChip client={client} />)
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/casos-de-exito/magupell',
    )
  })

  it('does not apply delayed class by default', () => {
    const { container } = render(<ClientChip client={client} />)
    expect(container.firstChild).not.toHaveClass('client-chip--delayed')
  })

  it('applies delayed class when delayed=true', () => {
    const { container } = render(<ClientChip client={client} delayed />)
    const revealDiv = container.querySelector('.client-chip--delayed')
    expect(revealDiv).toBeInTheDocument()
  })
})
