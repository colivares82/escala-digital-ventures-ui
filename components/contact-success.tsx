/**
 * ContactSuccess — confirmation card shown after a successful form submission.
 *
 * Reused by:
 *   - FinalCTA (home / all interior pages) → variant="section"
 *   - /contacto dossier form            → variant="dossier" (shows header + ref line)
 *
 * All copy from sharedContent.contactForm — zero literals in this file.
 * Spec: SPEC-P2.6 FR-5.1
 */
'use client'

import { sharedContent } from '@/content/es/shared'

export interface ContactSuccessProps {
  /** Layout variant. 'dossier' shows the MENSAJE ENVIADO header bar. */
  variant?: 'section' | 'dossier'
  /** Optional ref text for dossier variant — e.g. "ESCALA · REF. CONTACTO" */
  dossierRef?: string
  /** Callback that restores the empty form (the "ENVIAR OTRO MENSAJE ↺" action). */
  onResend: () => void
}

export function ContactSuccess({
  variant = 'section',
  dossierRef,
  onResend,
}: ContactSuccessProps) {
  const copy = sharedContent.contactForm

  return (
    <div
      className={`contact-success contact-success--${variant}`}
      role="status"
      tabIndex={-1}
    >
      {variant === 'dossier' && (
        <div className="contact-success__header">
          <span className="contact-success__title">{copy.successHeader}</span>
          {dossierRef && (
            <span className="contact-success__ref">{dossierRef}</span>
          )}
        </div>
      )}

      {variant === 'section' && (
        <span className="contact-success__label">{copy.successHeader}</span>
      )}

      <div className="contact-success__mark">
        {/* Ambre check-circle — decorative, role="status" on container covers a11y */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="var(--ambre)"
            strokeWidth="1.5"
          />
          <path
            d="M15 24 L21 30 L34 17"
            fill="none"
            stroke="var(--ambre)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="contact-success__h2">{copy.successH2}</h2>
      </div>

      <p className="contact-success__body">{copy.successBody}</p>

      <button
        type="button"
        className="contact-success__resend"
        onClick={onResend}
      >
        {copy.successResend}
      </button>
    </div>
  )
}
