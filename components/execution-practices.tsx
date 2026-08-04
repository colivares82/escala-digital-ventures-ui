/**
 * ExecutionPractices — stacked scroll panels (Section C on /como-trabajamos).
 * Desktop: CSS sticky stacking, no scroll-jacking (pure position:sticky).
 * Mobile (<768px) + prefers-reduced-motion: plain vertical stack.
 * Spec: SPEC-P2.1 FR-4
 */

import { SectionIndex } from '@/components/section-index'

export interface Practice {
  /** Zero-padded ordinal string: "01", "02", … */
  readonly index: string
  readonly title: string
  readonly body: string
  /** Ambre mono label tying the practice to a framework phase. */
  readonly tie: string
}

export interface ExecutionPracticesProps {
  sectionIndex: string
  sectionLabel: string
  title: string
  lead: string
  practices: readonly Practice[]
}

/** Top offset for the first sticky panel (px). Each subsequent panel adds 16px. */
const BASE_TOP_PX = 80
const TOP_STEP_PX = 16

export function ExecutionPractices({
  sectionIndex,
  sectionLabel,
  title,
  lead,
  practices,
}: ExecutionPracticesProps) {
  return (
    <section className="section section--light execution-practices" aria-labelledby="practices-title">
      <div className="page-shell execution-practices__inner">
        <SectionIndex index={sectionIndex} label={sectionLabel} />
        <h2 id="practices-title" className="execution-practices__title">{title}</h2>
        <p className="execution-practices__lead">{lead}</p>

        <div className="execution-practices__stack">
          {practices.map((practice, i) => (
            <article
              key={practice.index}
              className="practice-panel"
              // staggered top offsets via inline style — CSS sticky cannot read JS variables
              style={{ top: `${BASE_TOP_PX + i * TOP_STEP_PX}px` }}
              aria-labelledby={`practice-title-${practice.index}`}
            >
              <p className="practice-panel__index">{practice.index} · PRÁCTICA</p>
              <h3
                id={`practice-title-${practice.index}`}
                className="practice-panel__title"
              >
                {practice.title}
              </h3>
              <p className="practice-panel__body">{practice.body}</p>
              <p className="practice-panel__tie">{practice.tie}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
