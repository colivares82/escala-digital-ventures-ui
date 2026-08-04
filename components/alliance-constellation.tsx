'use client'

/**
 * AllianceConstellation — parameterized SVG constellation diagram.
 *
 * Renders 5 seats in a regular pentagon around a central ESCALA node.
 * First seat at the top (−90°), every 72° clockwise.
 * - Occupied seats: solid connector + ambre pulse dot + solid ring + solid label.
 * - Free seats: dashed connector + dashed ring at reduced opacity + dim label.
 *
 * Two sizes:
 *   'compact' — 280×280, used inside the home FIG.05 Plate (SystemDiagram outcome branch).
 *   'large'   — 420×420, used on /modelo-de-alianza (the protagonist view).
 *
 * Animation: draw-on-scroll via CSS classes driven by DiagramReveal (IntersectionObserver).
 * Staggered: center → connectors → nodes → ambre pulses → labels, one per seat.
 * Reduced-motion: `@media (prefers-reduced-motion: reduce)` CSS makes all elements
 * immediately visible (static complete figure).
 *
 * SPEC: SPEC-P2.4 FR-3 · Decision 1: one component, two instances (compact on home,
 * large on alliance page). See DECISIONS.md.
 */

import type { AllianceSeat } from '@/content/types'

export interface AllianceConstellationProps {
  /** Exactly 5 seats. First seat at top, rest clockwise every 72°. */
  seats: ReadonlyArray<AllianceSeat>
  /** 'compact' (280px) for home FIG.05 | 'large' (420px) for alliance page. */
  size?: 'compact' | 'large'
  /** Aria-label for the SVG figure. */
  ariaLabel: string
}

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Returns (x, y) for a seat on a regular pentagon, first seat at top. */
function seatPosition(
  index: number,
  centerX: number,
  centerY: number,
  radius: number,
): { x: number; y: number } {
  const angleDeg = -90 + index * 72
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleRad),
    y: centerY + radius * Math.sin(angleRad),
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AllianceConstellation({
  seats,
  size = 'compact',
  ariaLabel,
}: AllianceConstellationProps) {
  const dim = size === 'large' ? 420 : 280

  // Proportional geometry: all measurements scale with the viewBox.
  const CX = dim / 2
  const CY = dim / 2
  // Orbit radius: 36% of half-dimension so labels stay within viewBox.
  const R = dim * 0.357
  // Node circle radius: 5.2% of dim.
  const NODE_R = dim * 0.052
  // Core inner/outer ring radii.
  const CORE_R1 = dim * 0.072
  const CORE_R2 = dim * 0.10
  // Label offset outside the node: 9.5% of dim.
  const LABEL_OFFSET = dim * 0.095

  return (
    <svg
      viewBox={`0 0 ${dim} ${dim}`}
      width={dim}
      height={dim}
      role="img"
      aria-label={ariaLabel}
      className={`alliance-constellation alliance-constellation--${size}`}
    >
      {/* Core — two concentric rings + ESCALA label */}
      <circle
        className="ac-core ac-draw ac-core1"
        cx={CX}
        cy={CY}
        r={CORE_R1}
        fill="none"
      />
      <circle
        className="ac-core ac-draw ac-core2"
        cx={CX}
        cy={CY}
        r={CORE_R2}
        fill="none"
      />
      <text
        className="ac-core-label ac-draw ac-core2"
        x={CX}
        y={CY + dim * 0.011}
        textAnchor="middle"
      >
        ESCALA
      </text>

      {/* Seats — rendered in order so occupied seats visually overlap free ones */}
      {seats.map((seat, i) => {
        const { x: sx, y: sy } = seatPosition(i, CX, CY, R)
        const isOccupied = seat.state === 'occupied'

        // Connector: from core-ring edge to node-circle edge.
        const angleDeg = -90 + i * 72
        const angleRad = (angleDeg * Math.PI) / 180
        const cx0 = CX + CORE_R2 * Math.cos(angleRad)
        const cy0 = CY + CORE_R2 * Math.sin(angleRad)
        const cx1 = sx - NODE_R * Math.cos(angleRad)
        const cy1 = sy - NODE_R * Math.sin(angleRad)

        // Label position: radially outside the node.
        const lx = CX + (R + LABEL_OFFSET) * Math.cos(angleRad)
        const ly = CY + (R + LABEL_OFFSET) * Math.sin(angleRad)

        // Stagger delays: connector first, then node, then pulse, then label.
        const baseDelay = 0.35 + i * 0.12
        const connDelay  = baseDelay
        const nodeDelay  = baseDelay + 0.20
        const pulseDelay = baseDelay + 0.30
        const lblDelay   = baseDelay + 0.35

        return (
          <g key={`seat-${i}`} className={`ac-seat ${isOccupied ? 'ac-seat--occupied' : 'ac-seat--free'}`}>
            {/* Connector */}
            <line
              className={`ac-connector ac-draw ${isOccupied ? 'ac-conn--solid' : 'ac-conn--dashed'}`}
              x1={cx0} y1={cy0} x2={cx1} y2={cy1}
              style={{ '--ac-delay': `${connDelay}s` } as React.CSSProperties}
            />

            {/* Ambre pulse dot at mid-connector (occupied only) */}
            {isOccupied && (
              <circle
                className="ac-pulse ac-draw"
                cx={(cx0 + cx1) / 2}
                cy={(cy0 + cy1) / 2}
                r={size === 'large' ? 4 : 3}
                style={{ '--ac-delay': `${pulseDelay}s` } as React.CSSProperties}
              />
            )}

            {/* Node ring */}
            <circle
              className={`ac-node ac-draw ${isOccupied ? 'ac-node--solid' : 'ac-node--dashed'}`}
              cx={sx} cy={sy} r={NODE_R}
              style={{ '--ac-delay': `${nodeDelay}s` } as React.CSSProperties}
            />

            {/* Seat label — radially outside, never clipped by viewBox */}
            <text
              className={`ac-label ac-draw ${isOccupied ? 'ac-label--occupied' : 'ac-label--free'}`}
              x={lx} y={ly + dim * 0.008}
              textAnchor="middle"
              style={{ '--ac-delay': `${lblDelay}s` } as React.CSSProperties}
            >
              {seat.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
