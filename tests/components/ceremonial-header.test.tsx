/**
 * CeremonialHeader — unit tests.
 * Spec: SPEC-P2.5 FR-2 / AC-3 · BRAND-01 Z4
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CeremonialHeader } from '@/components/ceremonial-header'
import {
  BRAND_SEAL_HEIGHT_PX,
  BRAND_SEAL_WIDTH_PX,
} from '@/lib/brand-constants'

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

  // ── BRAND-01 Z4 · decorative seal ─────────────────────────────────────────

  describe('brand seal (BRAND-01 Z4)', () => {
    it('renders the L01 seal image', () => {
      const { container } = render(<CeremonialHeader {...PROPS} />)
      const img = container.querySelector('.ceremonial-header__seal-img')
      expect(img).not.toBeNull()
      expect(img!.tagName).toBe('IMG')
    })

    it('is DECORATIVE: empty alt and hidden from assistive technology', () => {
      // §6 is explicit: the seal carries no information the copy does not
      // already carry, so it must NOT get descriptive alt text.
      const { container } = render(<CeremonialHeader {...PROPS} />)
      expect(container.querySelector('.ceremonial-header__seal-img')).toHaveAttribute('alt', '')
      expect(container.querySelector('.ceremonial-header__seal')).toHaveAttribute(
        'aria-hidden',
        'true',
      )
    })

    it('exposes no extra accessible image to assistive technology', () => {
      // A decorative image must not surface as an img role.
      render(<CeremonialHeader {...PROPS} />)
      expect(screen.queryAllByRole('img')).toHaveLength(0)
    })

    it('declares intrinsic dimensions so CLS does not regress (AC-8)', () => {
      const { container } = render(<CeremonialHeader {...PROPS} />)
      const img = container.querySelector('.ceremonial-header__seal-img')
      expect(img).toHaveAttribute('width', String(BRAND_SEAL_WIDTH_PX))
      expect(img).toHaveAttribute('height', String(BRAND_SEAL_HEIGHT_PX))
    })

    it('keeps the copy in its own column beside the seal', () => {
      // The grid wrapper must hold both the text column and the seal column,
      // and the H1 must stay inside the text column (still the only H1).
      const { container } = render(<CeremonialHeader {...PROPS} />)
      const inner = container.querySelector('.ceremonial-header__inner')
      expect(inner!.querySelector('.ceremonial-header__text h1')).not.toBeNull()
      expect(inner!.querySelector('.ceremonial-header__seal')).not.toBeNull()
    })

    it('still renders exactly one H1 after the grid change (AC-3)', () => {
      const { container } = render(<CeremonialHeader {...PROPS} />)
      expect(container.querySelectorAll('h1')).toHaveLength(1)
    })
  })
})
