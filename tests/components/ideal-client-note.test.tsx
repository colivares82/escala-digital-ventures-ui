/**
 * IdealClientNote component tests.
 * Verifies eyebrow, title, body, and CTA render correctly.
 * Spec: SPEC-P2.2 FR-5
 */

import { render, screen } from '@testing-library/react'
import { IdealClientNote } from '@/components/ideal-client-note'
import { servicesContent } from '@/content/es/services'

const { idealClient } = servicesContent

function renderNote(ctaHref = '#contacto') {
  return render(
    <IdealClientNote
      eyebrow={idealClient.eyebrow}
      sectionIndex="B"
      title={idealClient.title}
      body={idealClient.body}
      cta={idealClient.cta}
      ctaHref={ctaHref}
    />,
  )
}

describe('IdealClientNote', () => {
  // ── Section index eyebrow ────────────────────────────────────────────────
  it('renders the section index "B"', () => {
    renderNote()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders the eyebrow label', () => {
    renderNote()
    expect(screen.getByText(idealClient.eyebrow)).toBeInTheDocument()
  })

  // ── Title ────────────────────────────────────────────────────────────────
  it('renders the title as h2', () => {
    renderNote()
    expect(screen.getByRole('heading', { level: 2, name: idealClient.title })).toBeInTheDocument()
  })

  // ── Body ─────────────────────────────────────────────────────────────────
  it('renders the body text from Libro Ch. 12', () => {
    renderNote()
    // Check a key phrase from the verbatim Libro Ch. 12 copy
    expect(screen.getByText(new RegExp('relación de largo plazo'))).toBeInTheDocument()
  })

  it('renders the full body paragraph', () => {
    renderNote()
    const body = screen.getByText(new RegExp(idealClient.body.slice(0, 40)))
    expect(body).toBeInTheDocument()
  })

  // ── CTA ──────────────────────────────────────────────────────────────────
  it('renders the CTA link with correct text', () => {
    renderNote()
    expect(screen.getByRole('link', { name: new RegExp(idealClient.cta) })).toBeInTheDocument()
  })

  it('CTA href resolves to #contacto (interim anchor — BACKLOG: switch to /contacto)', () => {
    renderNote('#contacto')
    const link = screen.getByRole('link', { name: new RegExp(idealClient.cta) })
    expect(link).toHaveAttribute('href', '#contacto')
  })

  // ── Surface ──────────────────────────────────────────────────────────────
  it('renders on dark (abisal) surface', () => {
    const { container } = renderNote()
    expect(container.querySelector('.ideal-client')).toBeInTheDocument()
    // dark-surface class indicates abisal background
    expect(container.querySelector('.dark-surface')).toBeInTheDocument()
  })

  // ── Libro Ch. 12 copy guard ──────────────────────────────────────────────
  it('body contains Libro Ch. 12 verbatim phrase about ideal client', () => {
    renderNote()
    expect(
      screen.getByText(new RegExp('empresas familiares y pymes consolidadas')),
    ).toBeInTheDocument()
  })

  it('body contains reference to B2B nicho', () => {
    renderNote()
    expect(screen.getByText(new RegExp('negocios de nicho B2B'))).toBeInTheDocument()
  })
})
