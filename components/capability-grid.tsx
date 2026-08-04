/**
 * CapabilityGrid — 3-up capability grid for capability-forward cases.
 * Rendered only when capabilities array is present and non-empty.
 * Spec: SPEC-P2.3 FR-4.4
 *
 * EDITORIAL GUARDRAIL (FR-3.6): for health-sector cases (BioZero), capability
 * descriptions must remain capability-framed — never imply medical diagnosis.
 */

import type { CaseCapability } from '@/content/data/cases'

interface CapabilityGridProps {
  /** Section eyebrow label: "CAPACIDADES ENTREGADAS" */
  sectionLabel: string
  capabilities: readonly CaseCapability[]
}

export function CapabilityGrid({ sectionLabel, capabilities }: CapabilityGridProps) {
  if (!capabilities.length) return null

  return (
    <div className="capability-grid-section">
      <p className="capability-grid-section__eyebrow">{sectionLabel}</p>
      <div className="capability-grid" role="list">
        {capabilities.map((cap) => (
          <div key={cap.index} className="capability-card" role="listitem">
            <span className="capability-card__index">{`CAP · ${cap.index}`}</span>
            <h3 className="capability-card__title">{cap.title}</h3>
            <p className="capability-card__body">{cap.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
