/**
 * ContactSection — the full dossier two-column contact block.
 *
 * Renders identically on every page (as a section at the end) AND
 * on the dedicated /contacto page. Single source of truth for the
 * contact design — no duplication.
 *
 * Props:
 *   mode="page"    — standalone full-viewport page (used by ContactPage)
 *   mode="section" — embedded section at the end of interior pages (used by FinalCTA)
 *
 * All copy from contactContent (content/es/contact.ts) — zero literals.
 */
'use client'

import { ContactForm } from '@/components/contact-form'
import { contactContent } from '@/content/es/contact'

interface ContactSectionProps {
  mode?: 'page' | 'section'
}

export function ContactSection({ mode = 'section' }: ContactSectionProps) {
  const { pageHeader, affinityFilter, directMeta, dossierHeader, trustLine } =
    contactContent

  const isPage = mode === 'page'

  return (
    <div
      className={`contact-page${isPage ? '' : ' contact-page--section'}`}
      id={isPage ? undefined : 'contacto'}
    >
      <div className="contact-page__grid">

        {/* ── LEFT — invitation + affinity filter + meta ── */}
        <div className="contact-page__left">

          <div className="contact-page__intro">
            <p className="contact-page__eyebrow">{pageHeader.eyebrow}</p>
            {isPage ? (
              <h1 className="contact-page__h1">{pageHeader.h1}</h1>
            ) : (
              <h2 className="contact-page__h1">{pageHeader.h1}</h2>
            )}
            <p className="contact-page__lead">{pageHeader.lead}</p>
          </div>

          {/* Affinity filter — ch. 12/18: Escala chooses partners too */}
          <div className="contact-page__filter">
            <p className="contact-page__filter-heading">
              {affinityFilter.heading}
            </p>
            <ul className="contact-page__filter-list">
              {affinityFilter.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Mono meta block — public address only */}
          <address className="contact-page__meta">
            <div>
              <span className="contact-page__meta-key">
                {directMeta.emailLabel}
              </span>{' '}
              <a href={`mailto:${directMeta.email}`}>{directMeta.email}</a>
            </div>
            <div>
              <span className="contact-page__meta-key">
                {directMeta.locationLabel}
              </span>{' '}
              {directMeta.location}
            </div>
            <div>
              <span className="contact-page__meta-key">
                {directMeta.languagesLabel}
              </span>{' '}
              {directMeta.languages}
            </div>
            <div>
              <span className="contact-page__meta-key">
                {directMeta.responseLabel}
              </span>{' '}
              {directMeta.response}
            </div>
          </address>

        </div>

        {/* ── RIGHT — form as dossier ficha ── */}
        <div className="contact-page__right">
          <div className="contact-page__formcard">
            <ContactForm
              email={directMeta.email}
              variant="dossier"
              dossierTitle={dossierHeader.title}
              dossierRef={dossierHeader.ref}
            />
            <p className="contact-page__trust">{trustLine}</p>
          </div>
        </div>

      </div>
    </div>
  )
}
