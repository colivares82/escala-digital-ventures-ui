/**
 * § 01 Un lunes cualquiera · § 02 Escenarios · § 03 Alianza.
 */
import type { OportunidadDictionary } from '@/content/types'
import { DayComparison } from './day-comparison'
import { ScenarioCard } from './scenario-card'
import { OportunidadConstellation } from './oportunidad-constellation'
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

export function AllianceSection({ content }: { content: OportunidadDictionary['alliance'] }) {
  return (
    <section className="section section--light oport-section">
      <div className="page-shell">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <div className="oport-alliance">
          <OportunidadConstellation content={content.constellation} />
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
