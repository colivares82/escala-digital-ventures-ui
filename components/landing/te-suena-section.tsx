'use client'

/**
 * § 01 ¿Te suena? — interactive self-diagnosis, first section after the hero
 * (LANDING-01A). Purely client-side: nothing stored, sent or tracked.
 * Wireframe: specs/mockups/wireframe-landing01c-te-suena.html
 */
import type { OportunidadDictionary } from '@/content/types'
import { DiagnosisPanel } from './diagnosis-panel'
import { PhraseWall } from './phrase-wall'
import { SectionHead } from './section-head'
import { usePhraseSelection } from './use-phrase-selection'
import { OPORTUNIDAD_ANCHORS } from './constants'

export function TeSuenaSection({ content }: { content: OportunidadDictionary['teSuena'] }) {
  const { marked, count, toggle, enhanced } = usePhraseSelection()

  return (
    <section
      id={OPORTUNIDAD_ANCHORS.TE_SUENA}
      className="section section--light oport-section oport-section--alt oport-tesuena"
      data-enhanced={enhanced ? 'true' : undefined}
    >
      <div className="page-shell">
        <SectionHead sectionIndex={content.sectionIndex} title={content.title} lead={content.lead} />
        <div className="oport-tesuena__body">
          <PhraseWall
            phrases={content.phrases}
            answerLabel={content.answerLabel}
            marked={marked}
            onToggle={toggle}
          />
          <DiagnosisPanel count={count} total={content.phrases.length} content={content.panel} />
        </div>
        <p className="oport-tesuena__closing">
          {content.closing.lead} <em>{content.closing.accent}</em>
        </p>
      </div>
    </section>
  )
}
