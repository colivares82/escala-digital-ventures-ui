/**
 * ScenarioFlow — HOY (dashed, broken by ×) vs CON TU SISTEMA (solid, arrows)
 * mini-diagram inside each ScenarioCard (LANDING-01 §3.3).
 *
 * One component, three instances. Geometry from the wireframe (372×124).
 * Links are drawn before boxes and end on box edges.
 */
import type { ScenarioFlowLabels, ScenarioFlowRow } from '@/content/types'

const VIEWBOX = '0 0 372 124'
const BOX_W = 108
const BOX_H = 28
const GAP = 18
const X0 = 6
const BEFORE = { labelY: 12, boxY: 22 } as const
const AFTER = { labelY: 82, boxY: 92 } as const
const BREAK_HALF = 3
const ARROW = 6
const BAR_W = 4

const boxX = (i: number) => X0 + i * (BOX_W + GAP)

export interface ScenarioFlowProps {
  before: ScenarioFlowRow
  after: ScenarioFlowRow
  labels: ScenarioFlowLabels
}

export function ScenarioFlow({ before, after, labels }: ScenarioFlowProps) {
  const beforeMid = BEFORE.boxY + BOX_H / 2
  const afterMid = AFTER.boxY + BOX_H / 2

  return (
    <svg className="scenario-flow" viewBox={VIEWBOX} width="100%" role="img" aria-label={labels.aria}>
      <text className="scenario-flow__row-label" x={X0} y={BEFORE.labelY}>
        {labels.before}
      </text>
      {[0, 1].map((i) => {
        const x1 = boxX(i) + BOX_W
        const mid = x1 + GAP / 2
        return (
          <g key={`b-link-${i}`}>
            <line className="scenario-flow__link--dashed" x1={x1} y1={beforeMid} x2={mid - BREAK_HALF - 1} y2={beforeMid} />
            <path
              className="scenario-flow__break"
              d={`M${mid - BREAK_HALF} ${beforeMid - BREAK_HALF}l${BREAK_HALF * 2} ${BREAK_HALF * 2}M${mid + BREAK_HALF} ${beforeMid - BREAK_HALF}l${-BREAK_HALF * 2} ${BREAK_HALF * 2}`}
            />
            <line className="scenario-flow__link--faded" x1={mid + BREAK_HALF + 1} y1={beforeMid} x2={boxX(i + 1)} y2={beforeMid} />
          </g>
        )
      })}
      {before.map((label, i) => (
        <g key={`b-${label}`}>
          <rect className="scenario-flow__box--dashed" x={boxX(i)} y={BEFORE.boxY} width={BOX_W} height={BOX_H} />
          <text className="scenario-flow__box-label--muted" x={boxX(i) + BOX_W / 2} y={beforeMid + 4} textAnchor="middle">
            {label}
          </text>
        </g>
      ))}

      <text className="scenario-flow__row-label scenario-flow__row-label--after" x={X0} y={AFTER.labelY}>
        {labels.after}
      </text>
      {[0, 1].map((i) => {
        const x1 = boxX(i) + BOX_W
        const x2 = boxX(i + 1)
        return (
          <g key={`a-link-${i}`}>
            <line className="scenario-flow__link--solid" x1={x1} y1={afterMid} x2={x2 - 5} y2={afterMid} />
            <path className="scenario-flow__arrow" d={`M${x2 - ARROW} ${afterMid - 4} L${x2} ${afterMid} L${x2 - ARROW} ${afterMid + 4}`} />
          </g>
        )
      })}
      {after.map((label, i) => (
        <g key={`a-${label}`}>
          <rect className="scenario-flow__box--solid" x={boxX(i)} y={AFTER.boxY} width={BOX_W} height={BOX_H} />
          {i === after.length - 1 && (
            <rect className="scenario-flow__bar" x={boxX(i)} y={AFTER.boxY} width={BAR_W} height={BOX_H} />
          )}
          <text className="scenario-flow__box-label" x={boxX(i) + BOX_W / 2} y={afterMid + 4} textAnchor="middle">
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}
