/**
 * § Quién está detrás · § Cómo empezamos.
 * Shared by /oportunidad and the home (HOME-V2 §B.1). Contact is the site-wide
 * FinalCTA, composed by each page.
 */
import { SectionIndex } from '@/components/section-index'
import type { OportunidadDictionary } from '@/content/types'
import { SectionHead } from './section-head'
import { OPORTUNIDAD_ANCHORS, toHash } from './constants'

export function AboutSection({
  content,
  linkHref,
}: {
  content: OportunidadDictionary['about']
  /** /oportunidad → cases index; home → /sobre-escala. Localized by the caller. */
  linkHref: string
}) {
  return (
    <section className="section section--light oport-section oport-section--alt">
      <div className="page-shell">
        <SectionIndex index={content.sectionIndex.index} label={content.sectionIndex.label} />
        <div className="split-heading oport-head">
          <div>
            <h2 className="oport-head__title">{content.title}</h2>
            <p className="oport-person">
              <span className="oport-person__name">{content.name}</span>
              <span className="oport-person__role">{content.role}</span>
            </p>
          </div>
          <p className="lead-copy oport-head__lead">{content.lead}</p>
        </div>
        <dl className="oport-readouts">
          {content.readouts.map((ro) => (
            <div key={ro.label} className="oport-readouts__cell">
              <dt className="oport-readouts__label">{ro.label}</dt>
              <dd className="oport-readouts__value">{ro.value}</dd>
              <dd className="oport-readouts__caption">{ro.caption}</dd>
            </div>
          ))}
        </dl>
        <a className="text-link text-link--dark oport-about__link" href={linkHref}>
          {content.link}
        </a>
      </div>
    </section>
  )
}

/**
 * Investment/offer boxes render only when the dictionary carries them
 * (/oportunidad). The home dictionary omits price + offer (HOME-V2 price rule)
 * and supplies `cta` instead, which needs `methodHref`.
 */
export function StartSection({
  content,
  methodHref,
}: {
  content: OportunidadDictionary['start']
  methodHref?: string
}) {
  const { price, offer, cta } = content
  return (
    <section className="section section--light oport-section">
      <div className="page-shell">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <ol className="oport-steps">
          {content.steps.map((step) => (
            <li key={step.n} className="oport-steps__item">
              <span className="oport-steps__n" aria-hidden="true">
                {step.n}
              </span>
              <div>
                <h3 className="oport-steps__title">{step.title}</h3>
                <p className="oport-steps__body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {price && offer && (
          <div className="oport-invest">
            <div className="oport-price">
              <p className="oport-price__label">{price.label}</p>
              <p className="oport-price__value">{price.value}</p>
              <p className="oport-price__note">{price.note}</p>
            </div>
            <div className="oport-offer dark-surface">
              <p className="oport-offer__label">{offer.label}</p>
              <p className="oport-offer__big">{offer.big}</p>
              <p className="oport-offer__line">{offer.line}</p>
              <p className="oport-offer__note">{offer.note}</p>
            </div>
          </div>
        )}
        {cta && (
          <div className="hero__actions oport-start__actions">
            <a className="oport-cta" href={toHash(OPORTUNIDAD_ANCHORS.CONTACTO)}>
              {cta.primary}
            </a>
            {methodHref && (
              <a className="text-link text-link--dark" href={methodHref}>
                {cta.secondary}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
