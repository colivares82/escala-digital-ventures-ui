/**
 * AiBuildBlock — Section E on /como-trabajamos ("Cómo construimos").
 * Purpose: signal AI-assisted engineering maturity WITHOUT becoming the page protagonist.
 * Editorial guardrail: only claims from Libro v2.1 Ch. 7 / Ch. 9 — no invented metrics,
 * no specific vendor/model names, no former-employer references. (FR-6.3)
 * Spec: SPEC-P2.1 FR-6
 */

import { SectionIndex } from '@/components/section-index'

export interface AiBuildBlockProps {
  sectionIndex: string
  sectionLabel: string
  title: string
  /** Lead paragraph — verbatim from Libro Ch. 7 "IA también en cómo se construye". */
  lead: string
  /** 3–4 mono points (only Libro language). */
  points: readonly string[]
  /** Inline flow diagram labels: left → right (4 steps). */
  diagram: readonly string[]
}

export function AiBuildBlock({
  sectionIndex,
  sectionLabel,
  title,
  lead,
  points,
  diagram,
}: AiBuildBlockProps) {
  return (
    <section
      className="section section--dark dark-surface ai-build"
      aria-labelledby="ai-build-title"
    >
      <div className="page-shell ai-build__inner">
        <SectionIndex index={sectionIndex} label={sectionLabel} />

        <div className="ai-build__grid">
          {/* Left: text content */}
          <div className="ai-build__text">
            {/* h2 at ~2.2rem per FR-6.1 — smaller than page H1 */}
            <h2 id="ai-build-title" className="ai-build__title">{title}</h2>
            <p className="ai-build__lead">{lead}</p>
            <ul className="ai-build__points" aria-label="Claves del modelo de ingeniería">
              {points.map((point) => (
                <li key={point} className="ai-build__point">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: small supporting line diagram (kit grammar) */}
          <aside className="ai-build__diagram" aria-label="Diagrama del proceso de ingeniería asistida por IA">
            <div className="ai-diagram" aria-hidden="true">
              {diagram.map((step, i) => (
                <div key={step} className="ai-diagram__step">
                  <span className="ai-diagram__label">{step}</span>
                  {i < diagram.length - 1 && (
                    <span className="ai-diagram__arrow" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
            {/* Accessible text equivalent */}
            <p className="sr-only">{diagram.join(' → ')}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
