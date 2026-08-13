/**
 * ServicesPage — /que-hacemos (Phase 2.2).
 * All copy from content dictionary via props (zero literals in JSX).
 * Spec: SPEC-P2.2
 */

import { FaqBlock } from '@/components/faq-block'
import { FinalCTA } from '@/components/final-cta'
import { IdealClientNote } from '@/components/ideal-client-note'
import { PageHeader } from '@/components/page-header'
import { ServiceFig } from '@/components/service-fig'
import { ServiceRow } from '@/components/service-row'
import { Reveal } from '@/components/motion-runtime'
import { getPath } from '@/lib/i18n/routes'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

export function ServicesPage({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { services } = dict
  const { pageHeader, idealClient } = services

  // Locale-aware contact link
  const contactHref = getPath('contact', locale)

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
        ctaHref={contactHref}
      />

      {/* C · Q&A — after the last content section, before FinalCTA (SEO-01 §5.2) */}
      <FaqBlock
        sectionEyebrow={services.faq.sectionEyebrow}
        sectionIndex={services.faq.sectionIndex}
        heading={services.faq.heading}
        items={services.faq.items}
      />

      {/* FinalCTA — reused component (abisal) */}
      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
