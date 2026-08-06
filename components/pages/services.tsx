/**
 * ServicesPage — /que-hacemos (Phase 2.2).
 * Sections: A·PageHeader (paper) → A(cont.)·Five ServiceRows (paper)
 *           → B·IdealClientNote (abisal) → FinalCTA (abisal).
 * All copy from content dictionary via props (zero literals in JSX).
 * Spec: SPEC-P2.2
 */

import { FinalCTA } from '@/components/final-cta'
import { IdealClientNote } from '@/components/ideal-client-note'
import { PageHeader } from '@/components/page-header'
import { ServiceFig } from '@/components/service-fig'
import { ServiceRow } from '@/components/service-row'
import { Reveal } from '@/components/motion-runtime'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'
import { ROUTES } from '@/lib/routes'

export function ServicesPage({ dict, locale: _locale }: { dict: Dictionary; locale: Locale }) {
  const { services } = dict
  const { pageHeader, idealClient } = services

  return (
    <>
      {/* A · PageHeader (paper surface) */}
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        lead={pageHeader.lead}
        surface="paper"
      />

      {/* A (cont.) · Five ServiceRows — constant three-column rhythm */}
      <section className="service-rows">
        <div className="page-shell service-rows__list">
          {services.services.map((svc, idx) => (
            /*
             * Each row wrapped in staggered Reveal.
             * CSS transition-delay via --row-index custom property.
             * Reduced-motion: Reveal sets data-visible immediately → no delay.
             */
            <div
              key={svc.index}
              style={{ '--row-index': idx } as React.CSSProperties}
              className="service-rows__reveal-wrap"
            >
              <Reveal>
                <ServiceRow
                  index={svc.index}
                  title={svc.title}
                  problem={svc.problem}
                  problemPrefix={pageHeader.problemPrefix}
                  deliverable={svc.deliverable}
                  isLast={idx === services.services.length - 1}
                  fig={
                    <ServiceFig
                      variant={svc.figVariant}
                      labels={svc.figLabels}
                      caption={svc.figCaption}
                    />
                  }
                />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* B · ¿Encajamos? (abisal) */}
      <IdealClientNote
        eyebrow={idealClient.eyebrow}
        sectionIndex="B"
        title={idealClient.title}
        body={idealClient.body}
        cta={idealClient.cta}
        // Phase 2.6: link to /contacto page (SPEC-P2.6 FR-8.1)
        ctaHref={ROUTES.CONTACT}
      />

      {/* FinalCTA — reused component (abisal) */}
      <FinalCTA />
    </>
  )
}
