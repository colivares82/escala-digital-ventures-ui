/**
 * OportunidadConstellation — FIG. 02, static 5-seat pentagon on paper
 * (LANDING-01 §3.4, D6 fallback).
 *
 * Why not AllianceConstellation: that component is abisal-only (paper-coloured
 * strokes/labels), its sizes are fixed presets, and its core is two rings with
 * a hardcoded label. Reusing it on this paper surface would require new props
 * — a stop condition — so the spec-sanctioned page-local fallback is used.
 * The geometry helper mirrors its seat placement (first seat at top, 72° step).
 *
 * Connectors run from the core edge to the node edge (never cross either).
 * Active nodes pulse via CSS; reduced-motion removes the animation.
 */
import type { OportunidadConstellationContent } from '@/content/types'

const SIZE = 220
const C = SIZE / 2
const CY = 98
const ORBIT = 66
const NODE_R = 7
const CORE_R = 24
const LABEL_GAP = 12
const ACTIVE_SEATS = 2
const SEAT_COUNT = 5

function polar(angleRad: number, r: number) {
  return { x: C + r * Math.cos(angleRad), y: CY + r * Math.sin(angleRad) }
}

function labelFor(angleRad: number, x: number, y: number) {
  const cos = Math.cos(angleRad)
  const sin = Math.sin(angleRad)
  const anchor: 'start' | 'end' | 'middle' = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle'
  const lx = anchor === 'middle' ? x : x + Math.sign(cos) * LABEL_GAP
  const ly = sin < -0.5 ? y - LABEL_GAP - 4 : sin > 0.5 ? y + LABEL_GAP + 4 : y - 6
  return { lx, ly, anchor }
}

export function OportunidadConstellation({ content }: { content: OportunidadConstellationContent }) {
  const seats = Array.from({ length: SEAT_COUNT }, (_, i) => {
    const angle = ((-90 + i * 72) * Math.PI) / 180
    const node = polar(angle, ORBIT)
    return {
      i,
      active: i < ACTIVE_SEATS,
      node,
      from: polar(angle, CORE_R),
      to: polar(angle, ORBIT - NODE_R),
      label: labelFor(angle, node.x, node.y),
    }
  })

  return (
    <figure className="oport-constellation">
      <svg viewBox={`0 0 ${SIZE} ${SIZE - 20}`} width="100%" role="img" aria-label={content.aria}>
        {seats.map((s) => (
          <line
            key={`c-${s.i}`}
            className={s.active ? 'oport-constellation__conn--solid' : 'oport-constellation__conn--dashed'}
            x1={s.from.x}
            y1={s.from.y}
            x2={s.to.x}
            y2={s.to.y}
          />
        ))}
        {seats.map((s) => (
          <g key={`n-${s.i}`}>
            <circle
              className={s.active ? 'oport-constellation__node--active' : 'oport-constellation__node--free'}
              cx={s.node.x}
              cy={s.node.y}
              r={NODE_R}
            />
            <text
              className={s.active ? 'oport-constellation__label' : 'oport-constellation__label--free'}
              x={s.label.lx}
              y={s.label.ly}
              textAnchor={s.label.anchor}
            >
              {s.active ? content.active : content.available}
            </text>
          </g>
        ))}
        <circle className="oport-constellation__core" cx={C} cy={CY} r={CORE_R} />
        <text className="oport-constellation__core-label" x={C} y={CY + 3.5} textAnchor="middle">
          {content.core}
        </text>
      </svg>
      <figcaption className="oport-fig__caption oport-fig__caption--light">{content.caption}</figcaption>
    </figure>
  )
}
