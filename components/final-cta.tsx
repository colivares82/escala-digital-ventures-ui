'use client'

import { useState, type FormEvent } from 'react'
import { WordReveal } from '@/components/motion-runtime'
import { SectionIndex } from '@/components/section-index'
import { homeContent } from '@/content/es/home'

type ContactField = 'name' | 'company' | 'email' | 'blocker' | 'consent'
type Errors = Partial<Record<ContactField, string>>

export function FinalCTA({ content }: { content: typeof homeContent.finalCta }) {
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors: Errors = {}
    const email = String(data.get('email') ?? '').trim()

    if (!String(data.get('name') ?? '').trim()) nextErrors.name = 'Introduce tu nombre.'
    if (!String(data.get('company') ?? '').trim()) nextErrors.company = 'Introduce tu empresa.'
    if (!email) nextErrors.email = 'Introduce tu email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Introduce un email válido.'
    if (!String(data.get('blocker') ?? '').trim()) nextErrors.blocker = 'Cuéntanos qué frena tu crecimiento.'
    if (data.get('consent') !== 'on') nextErrors.consent = 'Necesitamos tu consentimiento para responderte.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    // TODO: POST the validated form data to the contact API route when the backend is connected.
    setSubmitted(true)
  }

  return (
    <section className="final-cta dark-surface" id="contacto">
      <div className="page-shell final-cta__inner">
        <SectionIndex index="07" label="CONVERSACIÓN" />
        <div className="final-cta__grid">
          <div className="final-cta__intro">
            <WordReveal as="h2" text={content.title} className="final-cta__title" />
            <p>{content.body}</p>
          </div>
          <div className="final-cta__contact">
            {submitted ? (
              <div className="contact-success" role="status" tabIndex={-1}>
                <span>ENVÍO / CONFIRMADO</span>
                <p>{content.success}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <ContactInput id="contact-name" name="name" label="Nombre" error={errors.name} />
                <ContactInput id="contact-company" name="company" label="Empresa" error={errors.company} />
                <ContactInput id="contact-email" name="email" label="Email" type="email" error={errors.email} />
                <div className="contact-field contact-field--wide">
                  <label htmlFor="contact-blocker">¿Qué frena tu crecimiento?</label>
                  <textarea id="contact-blocker" name="blocker" rows={4} aria-invalid={Boolean(errors.blocker)} aria-describedby={errors.blocker ? 'contact-blocker-error' : undefined} />
                  {errors.blocker && <span className="contact-error" id="contact-blocker-error">{errors.blocker}</span>}
                </div>
                <div className="contact-consent contact-field--wide">
                  <input id="contact-consent" name="consent" type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'contact-consent-error' : undefined} />
                  <label htmlFor="contact-consent">Acepto el tratamiento de mis datos conforme a la <a href="/privacidad">política de privacidad</a>.</label>
                  {errors.consent && <span className="contact-error" id="contact-consent-error">{errors.consent}</span>}
                </div>
                <button type="submit">Enviar <span aria-hidden="true">↗</span></button>
                {Object.keys(errors).length > 0 && <p className="contact-fallback">¿Prefieres escribirnos directamente? <a href={`mailto:${content.email}`}>{content.email}</a></p>}
              </form>
            )}
            <address className="contact-meta">
              <a href={`mailto:${content.email}`}>{content.email}</a>
              <span>{content.location}</span>
              <span>{content.languages}</span>
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactInput({ id, name, label, type = 'text', error }: { id: string; name: ContactField; label: string; type?: string; error?: string }) {
  const errorId = `${id}-error`
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <span className="contact-error" id={errorId}>{error}</span>}
    </div>
  )
}
