/**
 * CaseFlowFig — FIG. EXP-02 "El ciclo operativo".
 * Four nodes on a horizontal axis (01 Catálogo → 04 Cobro), connectors that
 * terminate exactly at each node's border, and a cross-cutting amber band
 * below stating the properties that apply across every stage.
 * Page-local: must not reuse ServiceFig, AllianceConstellation or GridBackground
 * (SPEC-CASE-01 §4).
 *
 * Motion: one directional left→right traversal on entry (data-visible), narrative
 * not decorative. Full static fallback under prefers-reduced-motion (CSS only —
 * see app/globals.css .case-flow-fig__traversal rules).
 * Below the tablet breakpoint the nodes stack vertically (CSS grid switch);
 * the band moves below the stack in both layouts.
 *
 * Spec: SPEC-CASE-01 §4
 */

import { DiagramReveal } from '@/components/motion-runtime'
import type { CaseFlowNode } from '@/content/data/cases'

interface CaseFlowFigProps {
  nodes: readonly CaseFlowNode[]
  band: string
  caption: string
  ariaLabel: string
}

export function CaseFlowFig({ nodes, band, caption, ariaLabel }: CaseFlowFigProps) {
  return (
    <DiagramReveal className="case-flow-fig">
      <figure className="case-flow-fig__figure" role="img" aria-label={ariaLabel}>
        <div className="case-flow-fig__row">
          {nodes.map((node, i) => (
            <div key={node.index} className="case-flow-fig__node-wrap">
              <div className="case-flow-fig__node">
                <span className="case-flow-fig__index" aria-hidden="true">
                  {node.index}
                </span>
                <h3 className="case-flow-fig__title">{node.title}</h3>
                <p className="case-flow-fig__detail">{node.detail}</p>
              </div>
              {i < nodes.length - 1 && (
                <span className="case-flow-fig__connector" aria-hidden="true">
                  <span className="case-flow-fig__traversal" />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="case-flow-fig__band">
          <p className="case-flow-fig__band-text">{band}</p>
        </div>

        <figcaption className="case-flow-fig__caption">{caption}</figcaption>
      </figure>
    </DiagramReveal>
  )
}
