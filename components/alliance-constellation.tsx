'use client'

/**
 * AllianceConstellation — parameterized SVG constellation diagram.
 *
 * Renders 5 seats in a regular pentagon around a central ESCALA node.
 * First seat at the top (−90°), every 72° clockwise.
 * - Occupied seats: solid connector + ambre pulse + solid ring + solid label.
 * - Free seats: dashed connector + dashed ring at reduced opacity + dim label.
 *
 * Three sizes:
 *   'compact'     — 280×280, used inside the home FIG.05 Plate (SystemDiagram outcome branch).
 *   'large'       — 420×420, used on /modelo-de-alianza (the protagonist view).
 *   'protagonist' — 960×620 viewBox (responsive width), used on home section 05 (SPEC-POLISH-04).
 *                   Larger core (r46/r60), larger nodes (r30), orbit radius 200.
 *                   Adds corner ticks, coreSubLabel, and traveling ambre pulse animation.
 *
 * Animation:
 *   compact/large: draw-on-scroll via CSS classes driven by DiagramReveal (IntersectionObserver).
 *   protagonist:   SVG <animate> traveling pulse from core ring edge → node edge for occupied seats,
 *                  staggered, looping. Reduced-motion: pulse elements hidden, full static figure visible.
 *
 * Label anchoring (protagonist + all sizes):
 *   Right-side seats (cosA > 0.25)  → text-anchor="start"  (text to the right of node)
 *   Left-side seats  (cosA < −0.25) → text-anchor="end"    (text to the left of node)
 *   Top/bottom seats                → text-anchor="middle" (text above/below node)
 *   Vertical offset by sinA so labels never overlap their node.
 *
 * SPEC: SPEC-P2.4 FR-3 · SPEC-POLISH-04 · Decision 1: one component, three instances.
 * See DECISIONS.md.
 */

import type { AllianceSeat } from '@/content/types'

export interface AllianceConstellationProps {
  /** Exactly 5 seats. First seat at top, rest clockwise every 72°. */
  seats: ReadonlyArray<AllianceSeat>
  /** 'compact' (280px) for home FIG.05 | 'large' (420px) for alliance page | 'protagonist' (960×620) for home section 05. */
  size?: 'compact' | 'large' | 'protagonist'
  /** Aria-label for the SVG figure. */
  ariaLabel: string
  /**
   * Text rendered inside the SVG below the pentagon (protagonist only).
   * e.g. "2 ALIANZAS ACTIVAS · 3 DISPONIBLES"
   */
  coreSubLabel?: string
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

/**
 * Computes the text-anchor and (lx, ly) for a seat label so it never
 * overlaps its node. Anchors by horizontal direction (cosA) and vertical
 * position (sinA). Matches wireframe-p05-alianza-FINAL.html label logic.
 */
function labelPosition(
  nx: number,
  ny: number,
  nodeR: number,
  angleRad: number,
): { lx: number; ly: number; anchor: 'start' | 'end' | 'middle' } {
  const cosA = Math.cos(angleRad)
  const sinA = Math.sin(angleRad)

  let lx: number
  let ly: number
  let anchor: 'start' | 'end' | 'middle'

  // Horizontal anchor
  if (cosA > 0.25) {
    anchor = 'start'
    lx = nx + nodeR + 10
  } else if (cosA < -0.25) {
    anchor = 'end'
    lx = nx - nodeR - 10
  } else {
    anchor = 'middle'
    lx = nx
  }

  // Vertical offset
  if (sinA < -0.5) {
    ly = ny - nodeR - 14
  } else if (sinA > 0.5) {
    ly = ny + nodeR + 22
  } else {
    ly = ny + 4
  }

  return { lx, ly, anchor }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AllianceConstellation({
  seats,
  size = 'compact',
  ariaLabel,
  coreSubLabel,
}: AllianceConstellationProps) {
  const isProtagonist = size === 'protagonist'

  // ── Geometry ──────────────────────────────────────────────────────────────
  // compact/large: square viewBox, proportional measurements.
  // protagonist: fixed 960×620 viewBox matching the wireframe.
  const dim = size === 'large' ? 420 : 280

  const viewBoxW = isProtagonist ? 960 : dim
  const viewBoxH = isProtagonist ? 620 : dim
  const CX = isProtagonist ? 480 : dim / 2
  const CY = isProtagonist ? 310 : dim / 2

  // Orbit radius
  const R = isProtagonist ? 200 : dim * 0.357
  // Node circle radius
  const NODE_R = isProtagonist ? 30 : dim * 0.052
  // Core inner/outer ring radii
  const CORE_R1 = isProtagonist ? 46 : dim * 0.072
  const CORE_R2 = isProtagonist ? 60 : dim * 0.10

  // Pulse animation timing (protagonist only)
  const PULSE_DUR = '1.2s'
  const PULSE_STAGGER = 0.6 // seconds between active seat pulses

  return (
    <svg
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      width={isProtagonist ? '100%' : dim}
      height={isProtagonist ? undefined : dim}
      role="img"
      aria-label={ariaLabel}
      className={`alliance-constellation alliance-constellation--${size}`}
    >
      {/* ── Corner ticks (protagonist only) ── */}
      {isProtagonist && (
        <g
          stroke="rgba(247,247,244,.3)"
          strokeWidth="1"
          fill="none"
          aria-hidden="true"
        >
          <path d="M60 90 h-16 v16" />
          <path d="M840 90 h16 v16" />
          <path d="M60 560 h-16 v-16" />
          <path d="M840 560 h16 v-16" />
        </g>
      )}

      {/* ── Core — double concentric rings + ESCALA label ── */}
      <circle
        className="ac-core ac-draw ac-core1"
        cx={CX}
        cy={CY}
        r={CORE_R1}
        fill={isProtagonist ? 'rgba(255,183,3,.03)' : 'none'}
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
        y={CY + (isProtagonist ? 5 : dim * 0.011)}
        textAnchor="middle"
      >
        ESCALA
      </text>

      {/* Core sub-label (protagonist only) — below the pentagon */}
      {isProtagonist && coreSubLabel && (
        <text
          className="ac-core-sublabel"
          x={CX}
          y={CY + R + NODE_R + 36}
          textAnchor="middle"
          aria-hidden="true"
        >
          {coreSubLabel}
        </text>
      )}

      {/* ── Seats ── */}
      {seats.map((seat, i) => {
        const { x: sx, y: sy } = seatPosition(i, CX, CY, R)
        const isOccupied = seat.state === 'occupied'

        const angleDeg = -90 + i * 72
        const angleRad = (angleDeg * Math.PI) / 180

        // Connector: from core OUTER ring edge to node edge (never crosses core or node)
        const cx0 = CX + CORE_R2 * Math.cos(angleRad)
        const cy0 = CY + CORE_R2 * Math.sin(angleRad)
        const cx1 = sx - NODE_R * Math.cos(angleRad)
        const cy1 = sy - NODE_R * Math.sin(angleRad)

        // Label position: anchored by direction, offset outside node
        const { lx, ly, anchor } = labelPosition(sx, sy, NODE_R, angleRad)

        // Stagger delays for compact/large draw-on-scroll animation
        const baseDelay = 0.35 + i * 0.12
        const connDelay  = baseDelay
        const nodeDelay  = baseDelay + 0.20
        const pulseDelay = baseDelay + 0.30
        const lblDelay   = baseDelay + 0.35

        // Protagonist pulse stagger: active seats only, offset by index among active seats
        const activeIndex = seats
          .slice(0, i)
          .filter((s) => s.state === 'occupied').length
        const pulseBegin = `${activeIndex * PULSE_STAGGER}s`

        return (
          <g
            key={`seat-${i}`}
            className={`ac-seat ${isOccupied ? 'ac-seat--occupied' : 'ac-seat--free'}`}
          >
            {/* Connector */}
            <line
              className={`ac-connector ac-draw ${isOccupied ? 'ac-conn--solid' : 'ac-conn--dashed'}`}
              x1={cx0} y1={cy0} x2={cx1} y2={cy1}
              style={
                isProtagonist
                  ? undefined
                  : ({ '--ac-delay': `${connDelay}s` } as React.CSSProperties)
              }
            />

            {/* Ambre pulse — compact/large: static dot at midpoint */}
            {!isProtagonist && isOccupied && (
              <circle
                className="ac-pulse ac-draw"
                cx={(cx0 + cx1) / 2}
                cy={(cy0 + cy1) / 2}
                r={size === 'large' ? 4 : 3}
                style={{ '--ac-delay': `${pulseDelay}s` } as React.CSSProperties}
              />
            )}

            {/* Ambre pulse — protagonist: traveling dot from core edge to node edge */}
            {isProtagonist && isOccupied && (
              <circle
                className="ac-pulse-travel"
                cx={cx0}
                cy={cy0}
                r={4}
                fill="var(--ambre)"
                aria-hidden="true"
              >
                <animate
                  attributeName="cx"
                  from={cx0}
                  to={cx1}
                  dur={PULSE_DUR}
                  begin={pulseBegin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from={cy0}
                  to={cy1}
                  dur={PULSE_DUR}
                  begin={pulseBegin}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="1"
                  to="0.2"
                  dur={PULSE_DUR}
                  begin={pulseBegin}
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Node ring */}
            <circle
              className={`ac-node ac-draw ${isOccupied ? 'ac-node--solid' : 'ac-node--dashed'}`}
              cx={sx} cy={sy} r={NODE_R}
              style={
                isProtagonist
                  ? undefined
                  : ({ '--ac-delay': `${nodeDelay}s` } as React.CSSProperties)
              }
            />

            {/* Seat label — anchored by direction, never overlaps node */}
            <text
              className={`ac-label ac-draw ${isOccupied ? 'ac-label--occupied' : 'ac-label--free'}`}
              x={lx}
              y={ly}
              textAnchor={anchor}
              style={
                isProtagonist
                  ? undefined
                  : ({ '--ac-delay': `${lblDelay}s` } as React.CSSProperties)
              }
            >
              {seat.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
