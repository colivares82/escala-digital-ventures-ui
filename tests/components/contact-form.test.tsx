/**
 * ContactForm tests — SPEC-P2.6 FR-2, FR-5, FR-6
 *
 * Phase 2.6 upgrade: form now POSTs to /api/contact.
 * fetch is mocked globally for each API-path test.
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/contact-form'
import { sharedContent } from '@/content/es/shared'

const copy = sharedContent.contactForm

const DEFAULT_PROPS = {
  email: 'hola@escaladigitalventures.com',
}

function mockFetchOk() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
  )
}

function mockFetchFail() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'fail' }) }),
  )
}

function mockFetchNetworkError() {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ContactForm', () => {
  // ── Renders ──────────────────────────────────────────────────────────────

  it('renders all form fields', () => {
    render(<ContactForm {...DEFAULT_PROPS} />)
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/frena tu crecimiento/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument()
  })

  it('renders honeypot input that is visually hidden', () => {
    render(<ContactForm {...DEFAULT_PROPS} />)
    const honeypot = document.querySelector('input[name="website"]')
    expect(honeypot).toBeInTheDocument()
    expect(honeypot).toHaveAttribute('aria-hidden', 'true')
    expect(honeypot).toHaveAttribute('tabIndex', '-1')
    expect(honeypot).toHaveClass('contact-hp')
  })

  it('renders dossier variant with header when title + ref provided', () => {
    render(
      <ContactForm
        {...DEFAULT_PROPS}
        variant="dossier"
        dossierTitle="FICHA DE CONTACTO"
        dossierRef="ESCALA · REF. CONTACTO"
      />,
    )
    expect(screen.getByText('FICHA DE CONTACTO')).toBeInTheDocument()
    expect(screen.getByText('ESCALA · REF. CONTACTO')).toBeInTheDocument()
  })

  // ── Seeded states (for styleguide/testing) ───────────────────────────────

  it('shows success card when initialState="success"', () => {
    render(<ContactForm {...DEFAULT_PROPS} initialState="success" />)
    const status = screen.getByRole('status')
    expect(status).toBeInTheDocument()
    expect(status).toHaveTextContent(/Recibido/i)
    expect(screen.getByRole('button', { name: /enviar otro/i })).toBeInTheDocument()
  })

  it('shows all field errors when initialState="error"', () => {
    render(<ContactForm {...DEFAULT_PROPS} initialState="error" />)
    expect(screen.getByText(/Introduce tu nombre/i)).toBeInTheDocument()
    expect(screen.getByText(/Introduce tu empresa/i)).toBeInTheDocument()
    expect(screen.getByText(/Introduce tu email/i)).toBeInTheDocument()
    expect(screen.getByText(/Cuéntanos qué frena/i)).toBeInTheDocument()
    expect(screen.getByText(/consentimiento/i)).toBeInTheDocument()
  })

  // ── Client-side validation (no API call) ─────────────────────────────────

  it('shows required-field errors on empty submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Introduce tu nombre/i)).toBeInTheDocument()
      expect(screen.getByText(/Introduce tu empresa/i)).toBeInTheDocument()
    })
  })

  it('shows invalid email error for malformed email', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala')
    await user.type(screen.getByLabelText(/Email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/frena/i), 'Los procesos manuales.')
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByText(/email válido/i)).toBeInTheDocument()
    })
  })

  it('shows validation fallback link when there are errors', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: DEFAULT_PROPS.email }),
      ).toBeInTheDocument()
    })
  })

  // ── API submission — happy path ──────────────────────────────────────────

  it('shows success card after successful API submit', async () => {
    mockFetchOk()
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos Olivares')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala Digital')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Los procesos manuales nos ralentizan bastante.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Recibido/i)
    })
  })

  it('POSTs to /api/contact with correct fields', async () => {
    mockFetchOk()
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Test User')
    await user.type(screen.getByLabelText(/Empresa/i), 'Test Co')
    await user.type(screen.getByLabelText(/Email/i), 'test@example.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Message longer than twenty chars.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      const fetchMock = vi.mocked(fetch)
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: expect.stringContaining('"name":"Test User"'),
        }),
      )
    })
  })

  // ── API submission — error path ──────────────────────────────────────────

  it('shows API error message (form populated) on server failure', async () => {
    mockFetchFail()
    const user = userEvent.setup()
    const { container } = render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Error path test message.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      // API error element is present (text is split by inline anchor so check class)
      expect(container.querySelector('.contact-api-error')).toBeInTheDocument()
      // Form fields still populated (form not cleared on error)
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
    })
  })

  it('shows API error on network failure', async () => {
    mockFetchNetworkError()
    const user = userEvent.setup()
    const { container } = render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Network error test message.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(container.querySelector('.contact-api-error')).toBeInTheDocument()
    })
  })

  // ── Loading state ────────────────────────────────────────────────────────

  it('disables submit button while loading', async () => {
    // Fetch that never resolves — keeps the form in loading state
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Loading state test message.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      const button = screen.getByRole('button', { name: new RegExp(copy.sending, 'i') })
      expect(button).toBeDisabled()
    })
  })

  // ── Resend action ────────────────────────────────────────────────────────

  it('resend action restores empty form from success state', async () => {
    mockFetchOk()
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    // Submit
    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(
      screen.getByLabelText(/frena tu crecimiento/i),
      'Resend test message.',
    )
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    // Wait for success
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    // Click resend
    await user.click(screen.getByRole('button', { name: /enviar otro/i }))

    // Form is restored
    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
  })

  // ── Accessibility ────────────────────────────────────────────────────────

  it('sets aria-invalid on fields that have errors', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre/i)).toHaveAttribute('aria-invalid', 'true')
      expect(screen.getByLabelText(/Email/i)).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('links each error message to its field via aria-describedby', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/Nombre/i)
      const describedById = nameInput.getAttribute('aria-describedby')
      expect(describedById).toBeTruthy()
      expect(document.getElementById(describedById!)).toBeInTheDocument()
    })
  })
})
