import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/contact-form'

const DEFAULT_PROPS = {
  email: 'hola@escaladigitalventures.com',
  success: 'Recibido.',
}

describe('ContactForm', () => {
  // ── Happy path ──────────────────────────────────────────────────────────────

  it('renders all form fields', () => {
    render(<ContactForm {...DEFAULT_PROPS} />)
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/frena tu crecimiento/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument()
  })

  it('shows success state when initialState="success"', () => {
    render(<ContactForm {...DEFAULT_PROPS} initialState="success" />)
    expect(screen.getByRole('status')).toHaveTextContent('Recibido.')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows all field errors when initialState="error"', () => {
    render(<ContactForm {...DEFAULT_PROPS} initialState="error" />)
    expect(screen.getByText(/Introduce tu nombre/i)).toBeInTheDocument()
    expect(screen.getByText(/Introduce tu empresa/i)).toBeInTheDocument()
    expect(screen.getByText(/Introduce tu email/i)).toBeInTheDocument()
    expect(screen.getByText(/Cuéntanos qué frena/i)).toBeInTheDocument()
    expect(screen.getByText(/consentimiento/i)).toBeInTheDocument()
  })

  it('submits without errors when all fields are valid', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.type(screen.getByLabelText(/Nombre/i), 'Carlos Olivares')
    await user.type(screen.getByLabelText(/Empresa/i), 'Escala Digital')
    await user.type(screen.getByLabelText(/Email/i), 'hola@escaladigitalventures.com')
    await user.type(screen.getByLabelText(/frena tu crecimiento/i), 'Los procesos manuales nos ralentizan.')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(DEFAULT_PROPS.success)
    })
  })

  // ── Error handling ──────────────────────────────────────────────────────────

  it('shows required-field errors when submitted empty', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Introduce tu nombre/i)).toBeInTheDocument()
      expect(screen.getByText(/Introduce tu empresa/i)).toBeInTheDocument()
    })
  })

  it('shows invalid email error when email format is wrong', async () => {
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

  it('shows fallback email link when there are validation errors', async () => {
    const user = userEvent.setup()
    render(<ContactForm {...DEFAULT_PROPS} />)

    await user.click(screen.getByRole('button', { name: /Enviar/i }))

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: DEFAULT_PROPS.email }),
      ).toBeInTheDocument()
    })
  })

  // ── Accessibility ───────────────────────────────────────────────────────────

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
