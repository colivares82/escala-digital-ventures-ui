/**
 * AlliancePage — unit tests.
 * Spec: SPEC-POLISH-09 (constellation clipping fix + layout restructure)
 *
 * Covers the "Por qué solo cinco" section restructure: text above,
 * protagonist constellation below at full width, scroll reveal preserved.
 * Does NOT touch AllianceConstellation/GridBackground — those keep their
 * own dedicated test files unchanged (POLISH-09 AC-1).
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AlliancePage } from '@/components/pages/alliance'
import { getDictionary } from '@/lib/i18n/dictionary'

const dict = getDictionary('es')

describe('AlliancePage — Por qué solo cinco (POLISH-09)', () => {
  it('renders the section heading and body copy unchanged', () => {
    render(<AlliancePage dict={dict} locale="es" />)
    expect(
      screen.getByRole('heading', { name: dict.alliance.whyFive.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(dict.alliance.whyFive.body)).toBeInTheDocument()
  })

  it('renders the constellation at protagonist size, not large', () => {
    const { container } = render(<AlliancePage dict={dict} locale="es" />)
    expect(
      container.querySelector('.alliance-constellation--protagonist'),
    ).toBeInTheDocument()
    expect(
      container.querySelector('.alliance-constellation--large'),
    ).not.toBeInTheDocument()
  })

  it('no longer renders the legacy side-by-side grid wrapper', () => {
    const { container } = render(<AlliancePage dict={dict} locale="es" />)
    expect(container.querySelector('.alliance-why__grid')).not.toBeInTheDocument()
    expect(container.querySelector('.alliance-why__figure')).not.toBeInTheDocument()
  })

  it('renders the constellation inside the full-width stage wrapper', () => {
    const { container } = render(<AlliancePage dict={dict} locale="es" />)
    const stage = container.querySelector('.alliance-why__stage')
    expect(stage).toBeInTheDocument()
    expect(stage?.querySelector('.alliance-constellation')).toBeInTheDocument()
  })

  it('keeps the constellation wrapped in the scroll-reveal mechanism', () => {
    const { container } = render(<AlliancePage dict={dict} locale="es" />)
    const stage = container.querySelector('.alliance-why__stage')
    expect(stage?.querySelector('.diagram-reveal')).toBeInTheDocument()
  })

  it('renders exactly 5 seats with fully-formed text content (no truncation)', () => {
    render(<AlliancePage dict={dict} locale="es" />)
    // Occupied seats keep their exact casing; free seats read DISPONIBLE in full.
    expect(screen.getByText('Magupell')).toBeInTheDocument()
    expect(screen.getByText('BioZero')).toBeInTheDocument()
    expect(screen.getAllByText('DISPONIBLE')).toHaveLength(3)
  })

  it('does not pass a coreSubLabel (no dictionary key exists for this page)', () => {
    const { container } = render(<AlliancePage dict={dict} locale="es" />)
    expect(container.querySelector('.ac-core-sublabel')).not.toBeInTheDocument()
  })

  it('other alliance sections (planes, commitments, header) still render', () => {
    render(<AlliancePage dict={dict} locale="es" />)
    expect(
      screen.getByRole('heading', { name: dict.alliance.pageHeader.title }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: dict.alliance.planes.heading }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: dict.alliance.commitments.heading }),
    ).toBeInTheDocument()
  })
})
