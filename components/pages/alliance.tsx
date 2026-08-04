/**
 * AlliancePage — /modelo-de-alianza (Phase 2.4).
 *
 * Page structure per SPEC-P2.4 §3:
 *   A · PageHeader (paper)
 *   B · WhyFive + large AllianceConstellation (abisal)
 *   C · AlliancePlanes — three columns (abisal)
 *   D · CommitmentsBand — horizontal band of 5 (paper)
 *   FinalCTA (abisal, reused)
 *
 * All copy from content/es/alliance.ts via Dictionary props — zero literals.
 * Spec: SPEC-P2.4 FR-1 through FR-7
 */

import { AllianceConstellation } from '@/components/alliance-constellation'
import { AlliancePlanes } from '@/components/alliance-planes'
import { CommitmentsBand } from '@/components/commitments-band'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { DiagramReveal, Reveal } from '@/components/motion-runtime'
import type { Dictionary } from '@/lib/i18n/dictionary'

export function AlliancePage({ dict }: { dict: Dictionary }) {
  const { alliance } = dict
  const { pageHeader, whyFive, seats, planes, commitments, finalCta } = alliance

  return (
    <>
      {/* A · PageHeader (paper surface) */}
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        lead={pageHeader.lead}
        surface="paper"
      />

      {/* B · Por qué solo cinco + constellation (abisal) */}
      <section className="alliance-why dark-surface">
        <div className="page-shell alliance-why__inner">
          {/* Eyebrow: the string already contains the letter prefix "B / POR QUÉ SOLO CINCO" */}
          <p className="alliance-why__eyebrow">{whyFive.sectionEyebrow}</p>

          <div className="alliance-why__grid">
            {/* Left: heading + body */}
            <Reveal>
              <div className="alliance-why__text">
                <h2 className="alliance-why__heading">{whyFive.heading}</h2>
                <p className="alliance-why__body">{whyFive.body}</p>
              </div>
            </Reveal>

            {/* Right: large constellation — protagonist, ~420px */}
            <div className="alliance-why__figure">
              <DiagramReveal>
                <AllianceConstellation
                  seats={seats}
                  size="large"
                  ariaLabel={whyFive.constellationAria}
                />
              </DiagramReveal>
            </div>
          </div>
        </div>
      </section>

      {/* C · Tres planos de acompañamiento (abisal) */}
      <AlliancePlanes
        sectionEyebrow={planes.sectionEyebrow}
        heading={planes.heading}
        lead={planes.lead}
        items={planes.items}
      />

      {/* D · Compromisos de cada alianza (paper) */}
      <CommitmentsBand
        sectionEyebrow={commitments.sectionEyebrow}
        heading={commitments.heading}
        items={commitments.items}
      />

      {/* FinalCTA — reused (abisal) */}
      <FinalCTA content={finalCta} />
    </>
  )
}
