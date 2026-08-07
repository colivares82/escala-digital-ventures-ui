/**
 * CasesPage — /casos-de-exito index page.
 * Shows PageHeader + 2-column CaseCard grid + FinalCTA.
 * Data-driven: adding a 3rd case in cases.ts produces a 3rd card automatically (AC-4).
 * Spec: SPEC-P2.3 FR-3
 */

import { CaseCard } from '@/components/case-card'
import { FinalCTA } from '@/components/final-cta'
import { PageHeader } from '@/components/page-header'
import { cases } from '@/content/data/cases'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale } from '@/lib/i18n/types'

interface CasesPageProps {
  dict: Dictionary
  locale: Locale
}

export function CasesPage({ dict, locale }: CasesPageProps) {
  const { cases: casesDict } = dict
  const { pageHeader, card } = casesDict

  // Sort cases by order for predictable rendering (AC-4: third case = new card only)
  const sorted = [...cases].sort((a, b) => a.order - b.order)

  return (
    <>
      {/* A · PageHeader */}
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        lead={pageHeader.lead}
        surface="paper"
      />

      {/* A (cont.) · Case grid */}
      <section className="cases-index">
        <div className="page-shell cases-index__inner">
          <div className="cases-index-grid">
            {sorted.map((c) => (
              <CaseCard
                key={c.slug}
                caseStudy={c}
                locale={locale}
                expedienteLabel={card.expedienteLabel}
                openLabel={card.openLabel}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FinalCTA — reused (SPEC-P2.3 FR-5) */}
      <FinalCTA dict={dict} locale={locale} />
    </>
  )
}
