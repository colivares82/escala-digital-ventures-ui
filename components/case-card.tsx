/**
 * CaseCard — index-page card for a single case study.
 * Shows: mono eyebrow (EXPEDIENTE · 0X · SECTOR), logo, name, subtitle, CTA.
 * Link uses getPath to produce the correct localized detail URL.
 * Spec: SPEC-P2.3 FR-3.2
 */

import Image from 'next/image'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'
import type { CaseStudy } from '@/content/data/cases'

interface CaseCardProps {
  caseStudy: CaseStudy
  locale: Locale
  /** "EXPEDIENTE" prefix label from CasesDictionary.card.expedienteLabel */
  expedienteLabel: string
  /** "ABRIR EXPEDIENTE ↗" CTA label from CasesDictionary.card.openLabel */
  openLabel: string
}

export function CaseCard({
  caseStudy,
  locale,
  expedienteLabel,
  openLabel,
}: CaseCardProps) {
  const { slug, order, name, cardSubtitle, cardSubtitleByLocale, sector, brand } = caseStudy

  // Prefer the locale-keyed subtitle (SPEC-CASE-01 §5); fall back to the ES-only field.
  const subtitle = cardSubtitleByLocale?.[locale] ?? cardSubtitle

  // Build "EXPEDIENTE · 01 · SECTOR PIEL" from sector string
  // sector already is the full eyebrow, but we render the expediente prefix separately
  const orderStr = String(order).padStart(2, '0')
  // Extract sector part after "EXPEDIENTE 0X · "
  const sectorPart = sector.replace(/^EXPEDIENTE \d{2} · /, '')
  const detailHref = getPath('caseDetail', locale, { slug })

  return (
    <article className="case-index-card">
      <p className="case-index-card__eyebrow">
        {expedienteLabel} · {orderStr} · {sectorPart}
      </p>

      {/* Logo — real image or placeholder */}
      {brand.logo ? (
        <div className="case-index-card__logo">
          <Image
            src={brand.logo}
            alt={`${brand.name} — sitio web`}
            style={{ height: '44px', width: 'auto' }}
          />
        </div>
      ) : (
        <div
          className="case-index-card__logo-placeholder"
          aria-label={`[LOGO ${name}] — pendiente`}
        >
          {`[LOGO ${name}]`}
        </div>
      )}

      <h3 className="case-index-card__name">{name}</h3>
      <p className="case-index-card__subtitle">{subtitle}</p>

      <a href={detailHref} className="case-index-card__cta">
        {openLabel}
      </a>
    </article>
  )
}
