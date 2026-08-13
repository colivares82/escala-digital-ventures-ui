/**
 * CaseReadoutGrid — canonical n-cell readout grid (2×3 for Magupell, adapts
 * to fewer cells for other cases via CSS grid auto-flow).
 * Page-local rendering, deliberately not shared with the home ProofSection
 * (SPEC-CASE-01 §3 — "do not extract, share or refactor the home component").
 * Each cell: mono key ("DAT.01"), label, amber tick, mono value, caption.
 * Spec: SPEC-CASE-01 §3
 */

import type { CaseReadoutCell } from '@/content/data/cases'

interface CaseReadoutGridProps {
  readouts: readonly CaseReadoutCell[]
}

export function CaseReadoutGrid({ readouts }: CaseReadoutGridProps) {
  return (
    <div className="case-readout-grid" role="list" aria-label="Datos del proyecto">
      {readouts.map((ro) => (
        <div key={ro.key} className="case-readout-grid__cell" role="listitem">
          <span className="case-readout-grid__key">
            {ro.key} / {ro.label}
          </span>
          <span className="case-readout-grid__tick" aria-hidden="true" />
          <span className="case-readout-grid__value">{ro.value}</span>
          <span className="case-readout-grid__caption">{ro.caption}</span>
        </div>
      ))}
    </div>
  )
}
