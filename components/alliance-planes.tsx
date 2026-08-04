/**
 * AlliancePlanes — three-column acompañamiento grid (Section C).
 *
 * Three equal columns, middle one (index 1) highlighted with ambre border
 * and a very subtle ambre-tinted background for the strategic plane.
 * Each column: mono "PLANO · 0X" label, Archivo H3, body copy, bottom depth line.
 * Mobile (<768px): columns stack vertically; highlighted middle keeps its accent.
 *
 * All copy received via props from the alliance dictionary — zero literals.
 * Spec: SPEC-P2.4 FR-4
 */

import type { AlliancePlane } from '@/content/types'
import { Reveal } from '@/components/motion-runtime'

export interface AlliancePlanesProps {
  sectionEyebrow: string
  heading: string
  lead: string
  /** Exactly 3 planes (index 0 = Técnico, 1 = Estratégico [highlighted], 2 = Visionario). */
  items: ReadonlyArray<AlliancePlane>
}

export function AlliancePlanes({
  sectionEyebrow,
  heading,
  lead,
  items,
}: AlliancePlanesProps) {
  return (
    <section className="alliance-planes dark-surface">
      <div className="page-shell alliance-planes__inner">
        <p className="alliance-planes__eyebrow">{sectionEyebrow}</p>
        <h2 className="alliance-planes__heading">{heading}</h2>
        <p className="alliance-planes__lead">{lead}</p>

        <div className="alliance-planes__grid">
          {items.map((plane, idx) => {
            /*
             * Middle column (index 1: Estratégico) carries the highlight.
             * ambre border + very subtle ambre-tinted bg for emphasis.
             * Both non-middle columns have a subtle paper-opacity border.
             * Assumption: exactly 3 items; index 1 is always the strategic plane.
             */
            const isHighlighted = idx === 1
            return (
              <Reveal key={plane.index}>
                <div
                  className={`alliance-planes__col${isHighlighted ? ' alliance-planes__col--highlighted' : ''}`}
                >
                  <p className="alliance-planes__col-label">
                    {`PLANO · ${plane.index}`}
                  </p>
                  <h3 className="alliance-planes__col-title">{plane.title}</h3>
                  <p className="alliance-planes__col-body">{plane.body}</p>
                  <p className="alliance-planes__col-depth">{plane.depth}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
