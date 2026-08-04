/**
 * ReadoutStrip — bordered grid of case-study readout cells.
 * Adapts column count to the number of readouts (2 or 4) via CSS custom property.
 * Spec: SPEC-P2.3 FR-4.2
 */

import type { CaseReadout } from '@/content/data/cases'

interface ReadoutStripProps {
  readouts: readonly CaseReadout[]
}

export function ReadoutStrip({ readouts }: ReadoutStripProps) {
  const cols = readouts.length

  return (
    <div
      className="readout-strip"
      style={{ '--readout-cols': cols } as React.CSSProperties}
      aria-label="Datos del proyecto"
    >
      {readouts.map((ro) => (
        <div key={ro.label} className="readout-strip__cell">
          <span className="readout-strip__label">{ro.label}</span>
          <span className="readout-strip__value">{ro.value}</span>
          <span className="readout-strip__caption">{ro.caption}</span>
        </div>
      ))}
    </div>
  )
}
