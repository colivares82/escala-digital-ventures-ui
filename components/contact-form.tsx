/**
 * ContactForm — reusable form used on every page via FinalCTA and /contacto.
 *
 * Variants:
 *   'section'  (default) — home / interior pages via FinalCTA, existing look.
 *   'dossier'            — /contacto page, ficha-de-expediente framing.
 *
 * Behaviour shared across both variants:
 *   - Client-side validation with inline errors (aria-describedby, aria-invalid)
 *   - Hidden honeypot field (silent server-side reject on fill)
 *   - POST to /api/contact on valid submit
 *   - Loading state: button disabled, label → ENVIANDO…
 *   - Success: form replaced in-place by ContactSuccess card
 *   - API error: form stays populated + error message with mailto fallback
 *
 * Spec: SPEC-P2.6 FR-2, FR-3, FR-5, FR-6
 */
'use client'

import { useState, type FormEvent } from 'react'
import { ContactSuccess } from '@/components/contact-success'
import { sharedContent } from '@/content/es/shared'
import { ROUTES } from '@/lib/routes'

// ─── Types ────────────────────────────────────────────────────────────────────

type ContactField = 'name' | 'company' | 'email' | 'blocker' | 'consent'
type Errors = Partial<Record<ContactField, string>>
type FormState = 'idle' | 'loading' | 'success' | 'apiError'

export type ContactFormProps = {
  /** Public display email — shown in fallback links. Never the internal Gmail. */
  email: string
  /** Layout variant (default: 'section'). */
  variant?: 'section' | 'dossier'
  /** Dossier header title — e.g. "FICHA DE CONTACTO". Only in 'dossier' variant. */
  dossierTitle?: string
  /** Dossier header ref text — e.g. "ESCALA · REF. CONTACTO". Only in 'dossier' variant. */
  dossierRef?: string
  /**
   * Seed initial state — for testing / styleguide demos only.
   * 'error': pre-fills all validation errors (form in idle with errors).
   * 'success': renders success card immediately (skips API call).
   */
  initialState?: 'default' | 'error' | 'success'
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactForm({
  email,
  variant = 'section',
  dossierTitle,
  dossierRef,
  initialState = 'default',
}: ContactFormProps) {
  const copy = sharedContent.contactForm

  const seededErrors: Errors =
    initialState === 'error'
      ? {
          name: copy.errors.name,
          company: copy.errors.company,
          email: copy.errors.emailRequired,
          blocker: copy.errors.blocker,
          consent: copy.errors.consent,
        }
      : {}

  const [errors, setErrors] = useState<Errors>(seededErrors)
  const [formState, setFormState] = useState<FormState>(
    initialState === 'success' ? 'success' : 'idle',
  )

  function resetForm() {
    setErrors({})
    setFormState('idle')
  }

  if (formState === 'success') {
    return (
      <ContactSuccess
        variant={variant}
        dossierRef={dossierRef}
        onResend={resetForm}
      />
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // ── Client-side validation ──────────────────────────────────────────────
    const nextErrors: Errors = {}
    const emailValue = String(data.get('email') ?? '').trim()

    if (!String(data.get('name') ?? '').trim()) nextErrors.name = copy.errors.name
    if (!String(data.get('company') ?? '').trim()) nextErrors.company = copy.errors.company
    if (!emailValue) {
      nextErrors.email = copy.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = copy.errors.emailInvalid
    }
    if (String(data.get('blocker') ?? '').trim().length < 20)
      nextErrors.blocker = copy.errors.blocker
    if (data.get('consent') !== 'on') nextErrors.consent = copy.errors.consent

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // ── API submission ──────────────────────────────────────────────────────
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name')).trim(),
          company: String(data.get('company')).trim(),
          email: emailValue,
          blocker: String(data.get('blocker')).trim(),
          consent: true,
          website: data.get('website') ?? '', // honeypot — always empty on legit submit
        }),
      })
      setFormState(res.ok ? 'success' : 'apiError')
    } catch {
      setFormState('apiError')
    }
  }

  const isLoading = formState === 'loading'
  const isApiError = formState === 'apiError'
  const submitLabel = isLoading
    ? copy.sending
    : variant === 'dossier'
      ? copy.sendLabel
      : copy.submit

  return (
    <form
      className={`contact-form contact-form--${variant}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Dossier variant header — title + ref from content props, no literals here */}
      {variant === 'dossier' && (dossierTitle ?? dossierRef) && (
        <div className="contact-form__dossier-head">
          {dossierTitle && (
            <span className="contact-form__dossier-title">{dossierTitle}</span>
          )}
          {dossierRef && (
            <span className="contact-form__dossier-ref">{dossierRef}</span>
          )}
        </div>
      )}

      <ContactInput id="contact-name" name="name" label={copy.fields.name} error={errors.name} />
      <ContactInput id="contact-company" name="company" label={copy.fields.company} error={errors.company} />
      <ContactInput id="contact-email" name="email" label={copy.fields.email} type="email" error={errors.email} />

      <div className="contact-field contact-field--wide">
        <label htmlFor="contact-blocker">{copy.fields.blocker}</label>
        <textarea
          id="contact-blocker"
          name="blocker"
          rows={4}
          aria-invalid={Boolean(errors.blocker)}
          aria-describedby={errors.blocker ? 'contact-blocker-error' : undefined}
        />
        {errors.blocker && (
          <span className="contact-error" id="contact-blocker-error">
            {errors.blocker}
          </span>
        )}
      </div>

      {/* Honeypot — visually hidden, aria-hidden; must stay empty on legit submit */}
      <input
        type="text"
        name="website"
        className="contact-hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-consent contact-field--wide">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
        />
        <label htmlFor="contact-consent">
          {copy.consentPrefix}{' '}
          <a href={ROUTES.PRIVACY}>{copy.privacyLabel}</a>.
        </label>
        {errors.consent && (
          <span className="contact-error" id="contact-consent-error">
            {errors.consent}
          </span>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {submitLabel} <span aria-hidden="true">↗</span>
      </button>

      {/* API error — form stays populated; public email shown as fallback */}
      {isApiError && (
        <p className="contact-api-error contact-field--wide">
          {copy.errorApiPrefix}{' '}
          <a href={`mailto:${email}`}>{email}</a>{' '}
          {copy.errorApiSuffix}
        </p>
      )}

      {/* Validation error fallback */}
      {Object.keys(errors).length > 0 && !isApiError && (
        <p className="contact-fallback">
          {copy.fallback}{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
    </form>
  )
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function ContactInput({
  id,
  name,
  label,
  type = 'text',
  error,
}: {
  id: string
  name: ContactField
  label: string
  type?: string
  error?: string
}) {
  const errorId = `${id}-error`
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span className="contact-error" id={errorId}>
          {error}
        </span>
      )}
    </div>
  )
}
