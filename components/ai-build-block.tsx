/**
 * AiBuildBlock — Section D on /como-trabajamos ("Cómo construimos").
 * Full replacement per SPEC-POLISH-06 §3: heading + body copy full width, a
 * full-content-width layered figure (HowWeBuildFig, FIG.12) below it, and a
 * four-column legend mapping 1:1 to the figure's layers (gobierno / ejecución /
 * control / capitalización).
 * Editorial guardrail: only claims from Libro v2.1 Ch. 7 / Ch. 9 — no invented
 * metrics, no specific vendor/model names, no former-employer references.
 * Spec: SPEC-POLISH-06 §3
 */

import { HowWeBuildFig, type HowWeBuildFigContent } from '@/components/how-we-build-fig'
import { SectionIndex } from '@/components/section-index'

export interface AiBuildLegendItem {
  readonly label: string
  readonly text: string
}

export interface AiBuildBlockProps {
  sectionIndex: string
  sectionLabel: string
  title: string
  /** Body paragraph — §3.2. */
  body: string
  figure: HowWeBuildFigContent
  /** Four-column legend, mapping 1:1 to the figure's layers. */
  legend: readonly AiBuildLegendItem[]
}

export function AiBuildBlock({
  sectionIndex,
  sectionLabel,
  title,
  body,
  figure,
  legend,
}: AiBuildBlockProps) {
  return (
    <section
      className="section section--dark dark-surface ai-build"
      aria-labelledby="ai-build-title"
    >
      <div className="page-shell ai-build__inner">
        <SectionIndex index={sectionIndex} label={sectionLabel} />

        <h2 id="ai-build-title" className="ai-build__title">{title}</h2>
        <p className="ai-build__body">{body}</p>

        <HowWeBuildFig content={figure} />

        <dl className="ai-build__legend" aria-label="Capas del sistema de ingeniería">
          {legend.map((item) => (
            <div key={item.label} className="ai-build__legend-item">
              <dt className="ai-build__legend-label">{item.label}</dt>
              <dd className="ai-build__legend-text">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
