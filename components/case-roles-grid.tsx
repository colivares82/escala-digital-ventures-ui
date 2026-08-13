/**
 * CaseRolesGrid — section 04 "A medida de cada rol": 2×2 role cards.
 * Page-local, new section type introduced by SPEC-CASE-01 §3.
 */

import type { CaseRole } from '@/content/data/cases'

interface CaseRolesGridProps {
  lead: string
  roles: readonly CaseRole[]
}

export function CaseRolesGrid({ lead, roles }: CaseRolesGridProps) {
  return (
    <div className="case-roles">
      <p className="case-roles__lead">{lead}</p>
      <div className="case-roles__grid" role="list">
        {roles.map((role) => (
          <div key={role.index} className="case-roles__card" role="listitem">
            <span className="case-roles__index">{role.index}</span>
            <h3 className="case-roles__title">{role.title}</h3>
            <p className="case-roles__body">{role.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
