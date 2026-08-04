/**
 * BrandHeader — dossier header showing client logo, sector eyebrow,
 * H1 title, and engineering plate.
 * Logo: next/image static import. Falls back to placeholder box when null.
 * Logo alt: "<Client> — sitio web" per FR-2.3 (accessible, no functional overload).
 * Visit link: opens new tab, rel="noopener noreferrer" per FR-2.1.
 * Spec: SPEC-P2.3 FR-2
 */

import Image from 'next/image'
import type { CaseBrand } from '@/content/data/cases'

interface BrandHeaderProps {
  /** Sector eyebrow: "EXPEDIENTE 0X · SECTOR · …" */
  sector: string
  brand: CaseBrand
  /** Page H1 — dossier title. */
  title: string
  /** Engineering plate text — newlines rendered as <br>. */
  plate: string
  /** Label for the "visit site" link — from CasesDictionary.visitLabel. */
  visitLabel: string
}

export function BrandHeader({
  sector,
  brand,
  title,
  plate,
  visitLabel,
}: BrandHeaderProps) {
  const plateLines = plate.split('\n')

  return (
    <div className="brand-header">
      <div className="brand-header__meta">
        <div>
          <p className="brand-header__sector">{sector}</p>
          <div className="brand-header__brandrow">
            {/* Logo — real image or dashed placeholder */}
            {brand.logo ? (
              <div className="brand-header__logo-wrap">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} — sitio web`}
                  className="brand-header__logo"
                  style={{ height: '56px', width: 'auto' }}
                />
              </div>
            ) : (
              /*
               * Placeholder: shown when logo asset is not yet provided.
               * Page is NOT publishable in this state (SPEC-P2.3 FR-3.4).
               * TODO: replace with real logo from public/brand/ once provided.
               */
              <div
                className="brand-header__logo-placeholder"
                aria-label={`[LOGO ${brand.name}] — pendiente`}
              >
                {`[LOGO ${brand.name}]`}
              </div>
            )}
            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-header__visit"
            >
              {brand.url.replace('https://', '')} ↗
            </a>
          </div>
          <h1 className="brand-header__title">{title}</h1>
        </div>
        <p className="brand-header__plate" aria-hidden="true">
          {plateLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < plateLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
