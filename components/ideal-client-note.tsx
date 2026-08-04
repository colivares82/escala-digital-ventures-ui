/**
 * IdealClientNote — B / ¿Encajamos? section on abisal surface.
 * Eyebrow · H2 · Libro Ch. 12 body · CTA to contact.
 * Spec: SPEC-P2.2 FR-5
 */

import { SectionIndex } from '@/components/section-index'

export interface IdealClientNoteProps {
  eyebrow: string
  /** Section letter index (e.g. "B"). */
  sectionIndex: string
  title: string
  body: string
  /** CTA label text. */
  cta: string
  /** CTA href — interim #contacto anchor until Phase 3 ships /contacto. */
  ctaHref: string
}

export function IdealClientNote({
  eyebrow,
  sectionIndex,
  title,
  body,
  cta,
  ctaHref,
}: IdealClientNoteProps) {
  return (
    <section className="ideal-client dark-surface">
      <div className="page-shell ideal-client__inner">
        <SectionIndex index={sectionIndex} label={eyebrow} />
        <h2 className="ideal-client__title">{title}</h2>
        <p className="ideal-client__body">{body}</p>
        <a href={ctaHref} className="ideal-client__cta primary-link">
          {cta}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
