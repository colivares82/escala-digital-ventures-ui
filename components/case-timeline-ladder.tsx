/**
 * CaseTimelineLadder — FIG. EXP-03, the chronology ladder for section 06 "Impacto".
 * Repeats the five milestones from the home ProofTimelineFig with one added
 * detail line each. Page-local rendering — does not extend or import
 * ProofTimelineFig (SPEC-CASE-01 §3: "render locally, do not touch the home
 * component"). Rendered as a simple 5-column bordered strip (not an SVG stair)
 * since the extra detail line needs full-width prose room per step.
 */

import { DiagramReveal } from '@/components/motion-runtime'
import type { CaseTimelineMilestone } from '@/content/data/cases'

interface CaseTimelineLadderProps {
  milestones: readonly CaseTimelineMilestone[]
  caption: string
  ariaLabel: string
}

export function CaseTimelineLadder({ milestones, caption, ariaLabel }: CaseTimelineLadderProps) {
  return (
    <DiagramReveal className="case-timeline-ladder">
      <figure className="case-timeline-ladder__figure" role="img" aria-label={ariaLabel}>
        <div className="case-timeline-ladder__steps">
          {milestones.map((m) => (
            <div key={m.date} className="case-timeline-ladder__step">
              <span className="case-timeline-ladder__date">{m.date}</span>
              <span className="case-timeline-ladder__title">{m.title}</span>
              <span className="case-timeline-ladder__detail">{m.detail}</span>
            </div>
          ))}
        </div>
        <figcaption className="case-timeline-ladder__caption">{caption}</figcaption>
      </figure>
    </DiagramReveal>
  )
}
