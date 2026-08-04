/**
 * CommitmentsBand — unit tests.
 * Spec: SPEC-P2.4 FR-5 / AC-6
 *
 * Critical: commitment 01 MUST use "A MEDIDA" tag (§0 / FR-6).
 * NO code-ownership wording anywhere.
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CommitmentsBand } from '@/components/commitments-band'
import type { AllianceCommitment } from '@/content/types'

const FIVE_COMMITMENTS: AllianceCommitment[] = [
  { n: '01', tag: 'A MEDIDA',      body: 'Soluciones ajustadas a las necesidades reales.' },
  { n: '02', tag: 'ESPECIFICACIÓN', body: 'Cada funcionalidad se especifica antes.' },
  { n: '03', tag: 'CALIDAD',        body: 'Se demuestra con pruebas automatizadas.' },
  { n: '04', tag: 'SOPORTE',        body: 'Continuo, trazable y transparente.' },
  { n: '05', tag: 'MEDIDA',         body: 'Un único indicador: el crecimiento.' },
]

describe('CommitmentsBand', () => {
  it('renders the section heading', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Compromisos de cada alianza"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Compromisos de cada alianza' })).toBeInTheDocument()
  })

  it('renders the section eyebrow', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByText('D / COMPROMISOS')).toBeInTheDocument()
  })

  it('renders exactly 5 cells', () => {
    const { container } = render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    const cells = container.querySelectorAll('.commitments-band__cell')
    expect(cells).toHaveLength(5)
  })

  it('renders commitment 01 with tag "A MEDIDA" (§0 FR-6 corrected framing)', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByText('A MEDIDA')).toBeInTheDocument()
  })

  it('renders all ordinal numbers 01–05', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
    expect(screen.getByText('05')).toBeInTheDocument()
  })

  it('renders all commitment tags', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByText('ESPECIFICACIÓN')).toBeInTheDocument()
    expect(screen.getByText('CALIDAD')).toBeInTheDocument()
    expect(screen.getByText('SOPORTE')).toBeInTheDocument()
    expect(screen.getByText('MEDIDA')).toBeInTheDocument()
  })

  it('renders all body texts', () => {
    render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    expect(screen.getByText('Soluciones ajustadas a las necesidades reales.')).toBeInTheDocument()
    expect(screen.getByText('Cada funcionalidad se especifica antes.')).toBeInTheDocument()
    expect(screen.getByText('Se demuestra con pruebas automatizadas.')).toBeInTheDocument()
    expect(screen.getByText('Continuo, trazable y transparente.')).toBeInTheDocument()
    expect(screen.getByText('Un único indicador: el crecimiento.')).toBeInTheDocument()
  })

  it('renders 5 ambre tick elements', () => {
    const { container } = render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    const ticks = container.querySelectorAll('.commitments-band__tick')
    expect(ticks).toHaveLength(5)
  })

  it('does NOT contain code-ownership wording (§0 / FR-6 enforcement)', () => {
    const { container } = render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    const text = container.textContent ?? ''
    // Must not claim client owns the code or IP
    expect(text).not.toMatch(/propietari[oa] de (tu|su) (código|plataforma, su código)/i)
  })

  it('renders commitment tags with the number element', () => {
    const { container } = render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    const numbers = container.querySelectorAll('.commitments-band__number')
    expect(numbers).toHaveLength(5)
  })

  it('renders on a light surface (no dark-surface class)', () => {
    const { container } = render(
      <CommitmentsBand
        sectionEyebrow="D / COMPROMISOS"
        heading="Heading"
        items={FIVE_COMMITMENTS}
      />
    )
    const section = container.querySelector('section')
    expect(section?.classList.contains('dark-surface')).toBe(false)
  })
})
