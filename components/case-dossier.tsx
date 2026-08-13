/**
 * CaseDossier — the canonical case-detail template (SPEC-CASE-01).
 *
 * Approved deviation from the original per-mode split (SPEC-P2.3): this is now
 * the single source of truth for every case going forward. A case supplies
 * `readoutGrid` + `narrative` (canonical shape) to render through CaseReadoutGrid
 * + CaseNarrative; if a case supplies neither, the template falls back to the
 * legacy ReadoutStrip / DossierField / CapabilityGrid rendering so minimal or
 * future data-only cases keep working without new data (AC-4 preserved).
 * See DECISIONS.md for the rationale and docs/CHANGELOG.md for the migration.
 * Spec: SPEC-P2.3 FR-4 · SPEC-P5 FR-1 · SPEC-CASE-01
 */

import { BrandHeader } from '@/components/brand-header'
import { CapabilityGrid } from '@/components/capability-grid'
import { CaseNarrative } from '@/components/case-narrative'
import { CaseReadoutGrid } from '@/components/case-readout-grid'
import { DossierField } from '@/components/dossier-field'
import { FinalCTA } from '@/components/final-cta'
import { ReadoutStrip } from '@/components/readout-strip'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'
import { cases } from '@/content/data/cases'
import type { CaseStudy } from '@/content/data/cases'
import type { CasesDictionary } from '@/content/types'
import type { Dictionary } from '@/lib/i18n/dictionary'

interface CaseDossierProps {
  caseStudy: CaseStudy
  dict: CasesDictionary
  locale: Locale
  /** Full dictionary needed for FinalCTA (SPEC-P5 FR-5). */
  fullDict?: Dictionary
}

export function CaseDossier({ caseStudy, dict, locale, fullDict }: CaseDossierProps) {
  const { brand, mode } = caseStudy

  // Use locale-keyed dossier content (Phase 5)
  const dossier = caseStudy.dossierByLocale[locale] ?? caseStudy.dossierByLocale.es
  const { sector, readouts, capabilities, fields, readoutGrid, narrative } = dossier
  const isCanonical = Boolean(readoutGrid && narrative)

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

  // Localized nav aria-label (use dict.pageHeader.title as the "cases index" label)
  const navAriaLabel = locale === 'en'
    ? 'Navigation between dossiers'
    : locale === 'ca'
      ? 'Navegació entre expedients'
      : 'Navegación entre expedientes'

  const backAriaLabel = locale === 'en'
    ? 'Back to case studies index'
    : locale === 'ca'
      ? "Tornar a l'índex de casos"
      : 'Volver al índice de casos'

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
            plate={caseStudy.plate}
            visitLabel={dict.visitLabel}
          />

          {/* B · Readouts — canonical CaseReadoutGrid when present, else legacy ReadoutStrip */}
          {isCanonical && readoutGrid ? (
            <CaseReadoutGrid readouts={readoutGrid} />
          ) : (
            <ReadoutStrip readouts={readouts} />
          )}

          {/* C · Legacy CapabilityGrid — only for non-canonical capability-forward cases.
              Canonical cases render their capabilities block via CaseNarrative instead. */}
          {!isCanonical && mode === 'capability-forward' && capabilities && capabilities.length > 0 && (
            <CapabilityGrid
              sectionLabel={dict.capabilitiesLabel}
              capabilities={capabilities}
            />
          )}

          {/* D · Narrative — canonical CaseNarrative when present, else legacy DossierField list */}
          {isCanonical && narrative ? (
            <CaseNarrative blocks={narrative} />
          ) : (
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
          )}

          {/* E · Next-case / back-to-index navigation */}
          <nav className="dossier-nextcase" aria-label={navAriaLabel}>
            <a href={nextHref} className="dossier-nextcase__link">
              <span className="dossier-nextcase__label">{nextLabel}</span>
              <span className="dossier-nextcase__name">{nextName}</span>
            </a>
            {!isLast && (
              <a
                href={getPath('cases', locale)}
                className="dossier-nextcase__back"
                aria-label={backAriaLabel}
              >
                {dict.backLabel}
              </a>
            )}
          </nav>
        </div>
      </section>

      {/* F · FinalCTA — reused (SPEC-P2.3 FR-5) */}
      {fullDict && <FinalCTA dict={fullDict} locale={locale} />}
    </>
  )
}
