/**
 * ProofTimelineFig — FIG.04 ascending stair timeline (SPEC-POLISH-03).
 *
 * Five milestones with REAL dates, each label pair (date + deliverable)
 * anchored to and aligned with its own step tread. Production node accented
 * in ambre; "Producción" label in ambre-dk.
 *
 * All copy comes from the content prop (no hardcoded strings).
 * Colors from design tokens only (no hardcoded hex).
 * Micro-plots are aria-hidden (decorative).
 *
 * Spec: SPEC-POLISH-03 §3.3 · §5.5
 */

import { DiagramReveal } from '@/components/motion-runtime'

export interface ProofTimelineMilestone {
  /** Date label, e.g. "DIC 2025" */
  readonly date: string
  /** Deliverable label, e.g. "Requerimientos" */
  readonly deliverable: string
}

export interface ProofTimelineFigContent {
  /** Exactly 5 milestones in chronological order. */
  readonly timeline: readonly [
    ProofTimelineMilestone,
    ProofTimelineMilestone,
    ProofTimelineMilestone,
    ProofTimelineMilestone,
    ProofTimelineMilestone,
  ]
  /** Figcaption: "FIG. 04 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS" */
  readonly timelineCaption: string
  /** aria-label for the SVG (role="img") */
  readonly timelineAria: string
}

// ── SVG geometry constants (viewBox 720×400) ─────────────────────────────────
// Derived from the approved wireframe (specs/mockups/wireframe-p04-evidencia-FINAL.html).
// Tread y-levels and x-ranges define where each step sits.

/**
 * Stair path: 5 steps ascending left→right.
 * Each step: horizontal tread then vertical riser.
 */
const STAIR_PATH = 'M60 340 L180 340 L180 284 L320 284 L320 228 L460 228 L460 172 L580 172 L580 100 L660 100'

/** Fill polygon under the stair */
const FILL_PATH = 'M60 340 L180 340 L180 284 L320 284 L320 228 L460 228 L460 172 L580 172 L580 100 L660 100 L660 360 L60 360 Z'

/**
 * Step marker positions (circle at the top of each riser, i.e. the tread start).
 * Step 1 starts at x=60 (no riser before it — leftmost point).
 * Steps 2–4: at the riser top (x of next tread, y of that tread).
 * Step 5 (production): ambre circle, larger.
 */
const STEP_MARKERS = [
  { cx: 180, cy: 340, production: false },
  { cx: 320, cy: 284, production: false },
  { cx: 460, cy: 228, production: false },
  { cx: 580, cy: 172, production: false },
  { cx: 660, cy: 100, production: true },
] as const

/**
 * Label anchor positions for each milestone.
 * Each label pair sits ABOVE its own tread, anchored to the tread's left x.
 * date: larger, mar color; deliverable: smaller, below date.
 * Tread x-ranges: [60-180], [180-320], [320-460], [460-580], [580-660].
 */
const LABEL_ANCHORS = [
  { x: 66,  dateY: 326, deliverableY: 311 }, // tread 1: y=340
  { x: 186, dateY: 270, deliverableY: 255 }, // tread 2: y=284
  { x: 326, dateY: 214, deliverableY: 199 }, // tread 3: y=228
  { x: 466, dateY: 158, deliverableY: 143 }, // tread 4: y=172
  { x: 586, dateY: 86,  deliverableY: 71  }, // tread 5: y=100 (production)
] as const

export function ProofTimelineFig({
  content,
  ariaLabel,
}: {
  content: ProofTimelineFigContent
  ariaLabel: string
}) {
  return (
    <DiagramReveal className="proof-timeline-plate">
      <figure className="system-diagram proof-timeline">
        <svg
          viewBox="0 0 720 400"
          role="img"
          aria-label={ariaLabel}
        >
          {/* ── Corner ticks (kit grammar §3.3) ── */}
          <g className="diagram-frame-ticks proof-timeline__ticks">
            <path d="M16 24 h-10 v10" />
            <path d="M704 24 h10 v10" />
            <path d="M16 376 h-10 v-10" />
            <path d="M704 376 h10 v-10" />
          </g>

          {/* ── Fill under stair ── */}
          <path
            className="proof-timeline__fill"
            d={FILL_PATH}
          />

          {/* ── Stair line ── */}
          <path
            className="proof-timeline__stair"
            d={STAIR_PATH}
          />

          {/* ── Step markers ── */}
          {STEP_MARKERS.map((m, i) =>
            m.production ? (
              <circle
                key={i}
                cx={m.cx}
                cy={m.cy}
                r={6}
                className="proof-timeline__node proof-timeline__node--production"
              />
            ) : (
              <circle
                key={i}
                cx={m.cx}
                cy={m.cy}
                r={3.5}
                className="proof-timeline__node"
              />
            ),
          )}

          {/* ── Labels: each anchored to its own tread ── */}
          {content.timeline.map((milestone, i) => {
            const anchor = LABEL_ANCHORS[i]!
            const isProduction = i === 4
            return (
              <g key={i} className="proof-timeline__label-group">
                <text
                  x={anchor.x}
                  y={anchor.dateY}
                  className="proof-timeline__date"
                >
                  {milestone.date}
                </text>
                <text
                  x={anchor.x}
                  y={anchor.deliverableY}
                  className={
                    isProduction
                      ? 'proof-timeline__deliverable proof-timeline__deliverable--production'
                      : 'proof-timeline__deliverable'
                  }
                >
                  {milestone.deliverable}
                </text>
              </g>
            )
          })}
        </svg>

        <figcaption className="proof-timeline__caption">
          {content.timelineCaption}
        </figcaption>
      </figure>
    </DiagramReveal>
  )
}
