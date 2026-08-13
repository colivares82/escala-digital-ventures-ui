/**
 * CaseGovernance — section 05 "Gobernanza": the only block on the case page
 * rendered on the abisal dark surface. 2×2 cards, AA contrast on --abisal
 * using existing tokens only (--ambre for labels, translucent white for body).
 * Spec: SPEC-CASE-01 §3
 */

import type { CaseGovernanceCard } from '@/content/data/cases'

interface CaseGovernanceProps {
  heading: string
  lead: string
  cards: readonly CaseGovernanceCard[]
}

export function CaseGovernance({ heading, lead, cards }: CaseGovernanceProps) {
  return (
    <div className="case-governance">
      <h3 className="case-governance__heading">{heading}</h3>
      <p className="case-governance__lead">{lead}</p>
      <div className="case-governance__grid" role="list">
        {cards.map((card) => (
          <div key={card.label} className="case-governance__card" role="listitem">
            <span className="case-governance__label">{card.label}</span>
            <p className="case-governance__body">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
