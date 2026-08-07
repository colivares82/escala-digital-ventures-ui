/**
 * ContactSuccess tests — SPEC-P2.6 FR-5.1
 * Reusable confirmation card used by both FinalCTA (section) and /contacto (dossier).
 * Phase 5: copy is now a required prop.
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactSuccess } from '@/components/contact-success'
import { sharedContent } from '@/content/es/shared'

const copy = sharedContent.contactForm

describe('ContactSuccess', () => {
  // ── Section variant (FinalCTA default) ────────────────────────────────────

  it('renders section variant with role="status"', () => {
    render(<ContactSuccess copy={copy} variant="section" onResend={vi.fn()} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows the successH2 and successBody copy', () => {
    render(<ContactSuccess copy={copy} variant="section" onResend={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(copy.successH2)
    expect(screen.getByText(copy.successBody)).toBeInTheDocument()
  })

  it('shows the successHeader label in section variant', () => {
    render(<ContactSuccess copy={copy} variant="section" onResend={vi.fn()} />)
    expect(screen.getByText(copy.successHeader)).toBeInTheDocument()
  })

  it('renders the resend button', () => {
    render(<ContactSuccess copy={copy} variant="section" onResend={vi.fn()} />)
    expect(screen.getByRole('button', { name: copy.successResend })).toBeInTheDocument()
  })

  it('calls onResend when resend button is clicked', async () => {
    const onResend = vi.fn()
    const user = userEvent.setup()
    render(<ContactSuccess copy={copy} variant="section" onResend={onResend} />)

    await user.click(screen.getByRole('button', { name: copy.successResend }))
    expect(onResend).toHaveBeenCalledTimes(1)
  })

  // ── Dossier variant (/contacto) ──────────────────────────────────────────

  it('renders dossier variant with header title + ref', () => {
    render(
      <ContactSuccess
        copy={copy}
        variant="dossier"
        dossierRef="ESCALA · REF. CONTACTO"
        onResend={vi.fn()}
      />,
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(copy.successHeader)).toBeInTheDocument()
    expect(screen.getByText('ESCALA · REF. CONTACTO')).toBeInTheDocument()
  })

  it('dossier variant does NOT render the section label', () => {
    const { container } = render(
      <ContactSuccess copy={copy} variant="dossier" onResend={vi.fn()} />,
    )
    // section variant uses .contact-success__label; dossier does not
    expect(container.querySelector('.contact-success__label')).toBeNull()
  })

  it('section variant does NOT render the dossier header bar', () => {
    const { container } = render(
      <ContactSuccess copy={copy} variant="section" onResend={vi.fn()} />,
    )
    expect(container.querySelector('.contact-success__header')).toBeNull()
  })

  // ── SVG check-mark ────────────────────────────────────────────────────────

  it('renders the ambre check-circle SVG as aria-hidden', () => {
    const { container } = render(<ContactSuccess copy={copy} onResend={vi.fn()} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
