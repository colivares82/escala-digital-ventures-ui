/**
 * CeremonialHeader — unit tests.
 * Spec: SPEC-P2.5 FR-2 / AC-3
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CeremonialHeader } from '@/components/ceremonial-header'

const PROPS = {
  kicker: 'A · SOBRE ESCALA · ESTUDIO DE PRODUCTO Y TECNOLOGÍA',
  h1: 'Construimos capacidades, no aplicaciones.',
  sub: 'Escala Digital Ventures, S.L.U. es un estudio de producto y tecnología.',
}

describe('CeremonialHeader', () => {
  it('renders the H1 text', () => {
    render(<CeremonialHeader {...PROPS} />)
    expect(
      screen.getByRole('heading', { level: 1, name: /Construimos capacidades/i })
    ).toBeInTheDocument()
  })

  it('renders the kicker text', () => {
    render(<CeremonialHeader {...PROPS} />)
    expect(screen.getByText(PROPS.kicker)).toBeInTheDocument()
  })

  it('renders the sub paragraph', () => {
    render(<CeremonialHeader {...PROPS} />)
    expect(screen.getByText(/Escala Digital Ventures/)).toBeInTheDocument()
  })

  it('uses a <header> element (semantic landmark)', () => {
    const { container } = render(<CeremonialHeader {...PROPS} />)
    expect(container.querySelector('header.ceremonial-header')).toBeInTheDocument()
  })

  it('H1 has ceremonial-header__h1 class', () => {
    const { container } = render(<CeremonialHeader {...PROPS} />)
    const h1 = container.querySelector('h1')
    expect(h1?.classList.contains('ceremonial-header__h1')).toBe(true)
  })

  it('does NOT use a standard page-header class (brand-document distinction)', () => {
    const { container } = render(<CeremonialHeader {...PROPS} />)
    expect(container.querySelector('.page-header')).toBeNull()
  })
})
