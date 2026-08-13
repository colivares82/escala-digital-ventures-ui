/**
 * CaseNarrative — renders the canonical numbered narrative for a case,
 * dispatching each block on its `variant`. This is what makes CaseDossier
 * a genuinely data-driven canonical template (SPEC-CASE-01): a case supplies
 * narrative[] and the right section type renders automatically.
 */

import { CapabilityGrid } from '@/components/capability-grid'
import { CaseFlowFig } from '@/components/case-flow-fig'
import { CaseGovernance } from '@/components/case-governance'
import { CaseRolesGrid } from '@/components/case-roles-grid'
import { CaseTimelineLadder } from '@/components/case-timeline-ladder'
import type { CaseNarrativeBlock } from '@/content/data/cases'

interface CaseNarrativeProps {
  blocks: readonly CaseNarrativeBlock[]
}

export function CaseNarrative({ blocks }: CaseNarrativeProps) {
  return (
    <div className="case-narrative">
      {blocks.map((block) => (
        <section
          key={`${block.num}-${block.label}`}
          className={`case-narrative__section case-narrative__section--${block.variant}`}
        >
          <div className="case-narrative__index">
            <span className="case-narrative__num" aria-hidden="true">
              {block.num}
            </span>
            <span className="case-narrative__label">{block.label}</span>
          </div>

          {block.variant === 'prose' && (
            <div className="case-narrative__prose">
              {block.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {block.variant === 'flow-fig' && (
            <>
              <div className="case-narrative__prose">
                {block.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <CaseFlowFig
                nodes={block.flowNodes}
                band={block.flowBand}
                caption={block.flowCaption}
                ariaLabel={block.flowAriaLabel}
              />
            </>
          )}

          {block.variant === 'roles' && <CaseRolesGrid lead={block.lead} roles={block.roles} />}

          {block.variant === 'governance' && (
            <CaseGovernance heading={block.heading} lead={block.lead} cards={block.cards} />
          )}

          {block.variant === 'capabilities' && (
            <CapabilityGrid sectionLabel={block.sectionLabel} capabilities={block.capabilities} />
          )}

          {block.variant === 'timeline' && (
            <>
              <div className="case-narrative__prose">
                {block.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <CaseTimelineLadder
                milestones={block.milestones}
                caption={block.timelineCaption}
                ariaLabel={block.timelineAriaLabel}
              />
            </>
          )}
        </section>
      ))}
    </div>
  )
}
