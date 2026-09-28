/**
 * § 04 Quién está detrás · § 05 Cómo empezamos.
 * Contact is the site-wide FinalCTA, composed in components/pages/oportunidad.tsx.
 */
import { SectionIndex } from '@/components/section-index'
import type { OportunidadDictionary } from '@/content/types'
import { SectionHead } from './section-head'

export function AboutSection({
  content,
  casesHref,
}: {
  content: OportunidadDictionary['about']
  casesHref: string
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
        <a className="text-link text-link--dark oport-about__link" href={casesHref}>
          {content.link}
        </a>
      </div>
    </section>
  )
}

export function StartSection({ content }: { content: OportunidadDictionary['start'] }) {
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
        <div className="oport-invest">
          <div className="oport-price">
            <p className="oport-price__label">{content.price.label}</p>
            <p className="oport-price__value">{content.price.value}</p>
            <p className="oport-price__note">{content.price.note}</p>
          </div>
          <div className="oport-offer dark-surface">
            <p className="oport-offer__label">{content.offer.label}</p>
            <p className="oport-offer__big">{content.offer.big}</p>
            <p className="oport-offer__line">{content.offer.line}</p>
            <p className="oport-offer__note">{content.offer.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
