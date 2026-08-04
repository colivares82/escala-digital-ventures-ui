/**
 * DossierField component tests.
 * Spec: SPEC-P2.3 FR-4.3
 */

import { render, screen } from '@testing-library/react'
import { DossierField } from '@/components/dossier-field'

describe('DossierField', () => {
  it('renders the ordinal number', () => {
    render(<DossierField num="01" fieldKey="CONTEXTO" body="Texto del contexto" />)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('renders the field key', () => {
    render(<DossierField num="02" fieldKey="PROBLEMA" body="El problema descrito" />)
    expect(screen.getByText('PROBLEMA')).toBeInTheDocument()
  })

  it('renders the body text', () => {
    render(
      <DossierField
        num="03"
        fieldKey="SOLUCIÓN"
        body="Escala diseñó y construyó la plataforma completa"
      />,
    )
    expect(screen.getByText('Escala diseñó y construyó la plataforma completa')).toBeInTheDocument()
  })

  it('has the dossier-field class', () => {
    const { container } = render(
      <DossierField num="01" fieldKey="CONTEXTO" body="Body text" />,
    )
    expect(container.querySelector('.dossier-field')).toBeInTheDocument()
  })

  it('ordinal number has aria-hidden (decorative)', () => {
    render(<DossierField num="04" fieldKey="IMPACTO" body="Impacto descrito" />)
    const numEl = screen.getByText('04')
    expect(numEl).toHaveAttribute('aria-hidden', 'true')
  })

  it('key is rendered in the key column', () => {
    const { container } = render(
      <DossierField num="05" fieldKey="SIGUIENTES PASOS" body="Próximos pasos" />,
    )
    const keyEl = container.querySelector('.dossier-field__key')
    expect(keyEl).toHaveTextContent('SIGUIENTES PASOS')
  })

  it('body is rendered in the body paragraph', () => {
    const { container } = render(
      <DossierField num="01" fieldKey="TEST" body="Texto del cuerpo completo" />,
    )
    const body = container.querySelector('.dossier-field__body')
    expect(body).toHaveTextContent('Texto del cuerpo completo')
  })
})
