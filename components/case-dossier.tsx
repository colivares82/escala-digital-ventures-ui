/**
 * CaseDossier — single mode-aware template rendering both case detail pages.
 * The `mode` field on CaseStudy drives density:
 *   - data-forward (MAGUPELL): ReadoutStrip with 4 numeric readouts → 5 DossierFields.
 *   - capability-forward (BioZero): ReadoutStrip with 2 status readouts →
 *     CapabilityGrid (3 capabilities) → 3 DossierFields.
 * Template is genuinely data-driven: adding a 3rd case requires data only (AC-4).
 * Spec: SPEC-P2.3 FR-4
 */

import { BrandHeader } from '@/components/brand-header'
import { CapabilityGrid } from '@/components/capability-grid'
import { DossierField } from '@/components/dossier-field'
import { FinalCTA } from '@/components/final-cta'
import { ReadoutStrip } from '@/components/readout-strip'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'
import { cases } from '@/content/data/cases'
import type { CaseStudy } from '@/content/data/cases'
import type { CasesDictionary } from '@/content/types'
import { homeContent } from '@/content/es/home'

interface CaseDossierProps {
  caseStudy: CaseStudy
  dict: CasesDictionary
  locale: Locale
}

export function CaseDossier({ caseStudy, dict, locale }: CaseDossierProps) {
  const { brand, sector, plate, readouts, capabilities, fields, mode } = caseStudy

  // Determine next case (by order) and build nextcase nav
  const sorted = [...cases].sort((a, b) => a.order - b.order)
  const currentIdx = sorted.findIndex((c) => c.slug === caseStudy.slug)
  const nextCase = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null
  const isLast = !nextCase

  const nextHref = nextCase
    ? getPath('caseDetail', locale, { slug: nextCase.slug })
    : getPath('cases', locale)

  const nextLabel = isLast ? dict.backLabel : dict.nextLabel
  const nextName = isLast ? dict.pageHeader.title : (nextCase?.name ?? '')

  // Dossier title from per-locale content
  const copy = caseStudy.content[locale] ?? caseStudy.content.es

  return (
    <>
      {/* Dossier header */}
      <section className="dossier-page">
        <div className="page-shell dossier-page__inner">
          {/* A · BrandHeader */}
          <BrandHeader
            sector={sector}
            brand={brand}
            title={copy.title}
            plate={plate}
            visitLabel={dict.visitLabel}
          />

          {/* B · ReadoutStrip — protagonist for data-forward, context for capability-forward */}
          <ReadoutStrip readouts={readouts} />

          {/* C · CapabilityGrid — only for capability-forward cases */}
          {mode === 'capability-forward' && capabilities && capabilities.length > 0 && (
            <CapabilityGrid
              sectionLabel={dict.capabilitiesLabel}
              capabilities={capabilities}
            />
          )}

          {/* D · Narrative fields */}
          <div className="dossier-narrative">
            {fields.map((field, idx) => (
              <DossierField
                key={field.key}
                num={String(idx + 1).padStart(2, '0')}
                fieldKey={field.key}
                body={field.body}
              />
            ))}
          </div>

          {/* E · Next-case / back-to-index navigation */}
          <nav className="dossier-nextcase" aria-label="Navegación entre expedientes">
            <a href={nextHref} className="dossier-nextcase__link">
              <span className="dossier-nextcase__label">{nextLabel}</span>
              <span className="dossier-nextcase__name">{nextName}</span>
            </a>
            {!isLast && (
              <a
                href={getPath('cases', locale)}
                className="dossier-nextcase__back"
                aria-label="Volver al índice de casos"
              >
                {dict.backLabel}
              </a>
            )}
          </nav>
        </div>
      </section>

      {/* F · FinalCTA — reused (SPEC-P2.3 FR-5) */}
      <FinalCTA content={homeContent.finalCta} />
    </>
  )
}
