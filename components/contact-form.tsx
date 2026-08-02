'use client'

import { useState, type FormEvent } from 'react'
import { sharedContent } from '@/content/es/shared'
import { ROUTES } from '@/lib/routes'

type ContactField = 'name' | 'company' | 'email' | 'blocker' | 'consent'
type Errors = Partial<Record<ContactField, string>>

type ContactFormProps = {
  email: string
  success: string
  initialState?: 'default' | 'error' | 'success'
}

export function ContactForm({
  email,
  success,
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
  const [submitted, setSubmitted] = useState(initialState === 'success')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Errors = {}
    const emailValue = String(data.get('email') ?? '').trim()

    if (!String(data.get('name') ?? '').trim()) {
      nextErrors.name = copy.errors.name
    }
    if (!String(data.get('company') ?? '').trim()) {
      nextErrors.company = copy.errors.company
    }
    if (!emailValue) {
      nextErrors.email = copy.errors.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = copy.errors.emailInvalid
    }
    if (!String(data.get('blocker') ?? '').trim()) {
      nextErrors.blocker = copy.errors.blocker
    }
    if (data.get('consent') !== 'on') {
      nextErrors.consent = copy.errors.consent
    }

    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-success" role="status" tabIndex={-1}>
        <span>{copy.successLabel}</span>
        <p>{success}</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <ContactInput
        id="contact-name"
        name="name"
        label={copy.fields.name}
        error={errors.name}
      />
      <ContactInput
        id="contact-company"
        name="company"
        label={copy.fields.company}
        error={errors.company}
      />
      <ContactInput
        id="contact-email"
        name="email"
        label={copy.fields.email}
        type="email"
        error={errors.email}
      />

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

      <button type="submit">
        {copy.submit} <span aria-hidden="true">↗</span>
      </button>

      {Object.keys(errors).length > 0 && (
        <p className="contact-fallback">
          {copy.fallback}{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
    </form>
  )
}

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
