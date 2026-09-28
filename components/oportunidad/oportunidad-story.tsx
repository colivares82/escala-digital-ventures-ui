/**
 * § 01 Un lunes cualquiera · § 02 Escenarios · § 03 Alianza.
 */
import { AllianceConstellation } from '@/components/alliance-constellation'
import { GridBackground } from '@/components/grid-background'
import { DiagramReveal } from '@/components/motion-runtime'
import type { AllianceFigureContent, OportunidadDictionary } from '@/content/types'
import { DayComparison } from './day-comparison'
import { ScenarioCard } from './scenario-card'
import { SectionHead } from './section-head'
import { OPORTUNIDAD_ANCHORS } from './constants'

export function DaySection({ content }: { content: OportunidadDictionary['day'] }) {
  return (
    <section className="section section--light oport-section">
      <div className="page-shell">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <DayComparison content={content.table} />
        <p className="oport-closing">{content.closing}</p>
      </div>
    </section>
  )
}

export function ScenariosSection({ content }: { content: OportunidadDictionary['scenarios'] }) {
  return (
    <section
      id={OPORTUNIDAD_ANCHORS.ESCENARIOS}
      className="section section--light oport-section oport-section--alt"
    >
      <div className="page-shell">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <div className="oport-cards">
          {content.items.map((scenario) => (
            <ScenarioCard
              key={scenario.eyebrow}
              scenario={scenario}
              flowLabels={content.flowLabels}
              outcomeLabel={content.outcomeLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * § 03 — dark abisal surface because the shared AllianceConstellation is
 * designed for abisal (paper strokes/labels). Seats, aria and core sub-label
 * come from the home dictionary so client names stay single-sourced.
 */
export function AllianceSection({
  content,
  figure,
}: {
  content: OportunidadDictionary['alliance']
  figure: AllianceFigureContent
}) {
  return (
    <section
      id={OPORTUNIDAD_ANCHORS.ALIANZA}
      className="section section--dark dark-surface oport-section oport-section--dark"
    >
      <GridBackground />
      <div className="page-shell oport-section__inner">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <div className="oport-alliance">
          <figure className="oport-alliance__fig">
            <DiagramReveal>
              <AllianceConstellation
                seats={figure.seats}
                size="protagonist"
                ariaLabel={figure.figAria}
                coreSubLabel={figure.coreSubLabel}
              />
            </DiagramReveal>
            <figcaption className="oport-fig__caption">{content.figCaption}</figcaption>
          </figure>
          <ul className="oport-planes">
            {content.planes.map((plane) => (
              <li key={plane.label} className="oport-planes__item">
                <p className="oport-planes__label">{plane.label}</p>
                <h3 className="oport-planes__title">{plane.title}</h3>
                <p className="oport-planes__body">{plane.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="oport-not">
          <p className="oport-not__label">{content.notLabel}</p>
          <ul className="oport-not__list">
            {content.notItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true">{content.notMark} </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
