/**
 * AlliancePage — /modelo-de-alianza (Phase 2.4).
 * All copy from content dictionary via props — zero literals.
 * Spec: SPEC-P2.4 FR-1 through FR-7
 */

import { AllianceConstellation } from '@/components/alliance-constellation'
import { AlliancePlanes } from '@/components/alliance-planes'
import { CommitmentsBand } from '@/components/commitments-band'
import { FaqBlock } from '@/components/faq-block'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { DiagramReveal, Reveal } from '@/components/motion-runtime'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function AlliancePage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { alliance } = dict
  const { pageHeader, whyFive, seats, planes, commitments } = alliance

  return (
    <>
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        lead={pageHeader.lead}
        surface="paper"
      />

      <section className="alliance-why dark-surface">
        <div className="page-shell alliance-why__inner">
          <p className="alliance-why__eyebrow">{whyFive.sectionEyebrow}</p>

          <Reveal>
            <div className="alliance-why__text">
              <h2 className="alliance-why__heading">{whyFive.heading}</h2>
              <p className="alliance-why__body">{whyFive.body}</p>
            </div>
          </Reveal>

          {/*
           * Protagonist size (960×620 viewBox, responsive width) — same
           * configuration as the home page constellation (SPEC-POLISH-04).
           * 'large' (fixed 420×420) left no horizontal margin for labels at
           * the pentagon's widest points, clipping "BIOZERO" and "DISPONIBLE"
           * at the SVG edge. POLISH-09.
           */}
          <div className="alliance-why__stage">
            <DiagramReveal>
              <AllianceConstellation
                seats={seats}
                size="protagonist"
                ariaLabel={whyFive.constellationAria}
              />
            </DiagramReveal>
          </div>
        </div>
      </section>

      <AlliancePlanes
        sectionEyebrow={planes.sectionEyebrow}
        heading={planes.heading}
        lead={planes.lead}
        items={planes.items}
      />

      <CommitmentsBand
        sectionEyebrow={commitments.sectionEyebrow}
        heading={commitments.heading}
        items={commitments.items}
      />

      {/* E · Q&A — after the last content section, before FinalCTA (SEO-01 §5.2) */}
      <FaqBlock
        sectionEyebrow={alliance.faq.sectionEyebrow}
        sectionIndex={alliance.faq.sectionIndex}
        heading={alliance.faq.heading}
        items={alliance.faq.items}
      />

      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
