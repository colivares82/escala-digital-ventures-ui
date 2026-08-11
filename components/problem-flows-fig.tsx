'use client'

/**
 * Problem flows diagram — FIG.02 (SPEC-POLISH-02).
 *
 * Five named pieces arranged around a fragile PROCESOS MANUALES core.
 * Each piece connects toward the core via a DISCONTINUOUS flow:
 *   solid segment (the connection that should exist) → GAP → dashed stub (the break).
 * Ambre pulses travel the solid segment and stop at the break.
 * The core pulses with a slow scale animation.
 *
 * prefers-reduced-motion: full static fallback — no pulses, no scale.
 * All copy comes from the content prop (no hardcoded strings).
 * Colors from design tokens only (no hardcoded hex).
 */

import { useEffect, useRef } from 'react'
import { DiagramReveal } from '@/components/motion-runtime'
import {
  PROBLEM_CORE_PULSE_AMPLITUDE,
  PROBLEM_CORE_PULSE_SPEED,
  PROBLEM_PULSE_DURATION_MS,
  PROBLEM_PULSE_FADE_MS,
  PROBLEM_PULSE_INTERVAL_MS,
} from '@/lib/motion-constants'

export interface ProblemFlowsFigContent {
  /** Five named piece labels arranged around the core */
  readonly pieces: readonly [string, string, string, string, string]
  /** Two-line core label: ['PROCESOS', 'MANUALES'] */
  readonly core: readonly [string, string]
  /** Figcaption: "FIG. 02 — …" */
  readonly caption: string
  /** Small note line below the caption */
  readonly note: string
}

// ── SVG geometry constants (viewBox 640×300) ──────────────────────────────────
// Layout values only — not copy. Derived from the approved wireframe.

/** Core circle center and radius */
const CORE_CX = 320
const CORE_CY = 150
const CORE_R = 46

/**
 * Piece box definitions: [x, y, width, height, label-x, label-y]
 * Boxes are positioned around the core; labels are inside the box.
 * Order matches content.pieces: [HOJAS DE CÁLCULO, CORREOS, NOTAS, CATÁLOGO, HISTORIAL]
 */
const PIECE_BOXES = [
  { x: 24,  y: 34,  w: 130, h: 30, lx: 34,  ly: 53 },  // 0: HOJAS DE CÁLCULO (top-left)
  { x: 266, y: 20,  w: 90,  h: 30, lx: 276, ly: 39 },  // 1: CORREOS (top-center)
  { x: 500, y: 38,  w: 90,  h: 30, lx: 510, ly: 57 },  // 2: NOTAS (top-right)
  { x: 34,  y: 228, w: 100, h: 30, lx: 44,  ly: 247 }, // 3: CATÁLOGO (bottom-left)
  { x: 486, y: 226, w: 110, h: 30, lx: 496, ly: 245 }, // 4: HISTORIAL (bottom-right)
] as const

/**
 * Solid connector segments: from piece edge toward core, stopping AT the core border.
 * Each segment is a straight line [x1, y1, x2, y2].
 * CORREOS (index 1): solid goes from bottom of box (314,50) to top of core (320,104).
 * All others stop before the core border; dashed stubs bridge the gap.
 */
const SOLID_SEGMENTS = [
  [154, 52,  250, 118], // 0: HOJAS DE CÁLCULO → stops before core
  [314, 50,  320, 104], // 1: CORREOS → stops exactly at core top border (cy-r=104)
  [500, 56,  392, 118], // 2: NOTAS → stops before core
  [134, 240, 252, 178], // 3: CATÁLOGO → stops before core
  [486, 238, 390, 176], // 4: HISTORIAL → stops before core
] as const

/**
 * Dashed stubs: short segments near the core (the break).
 * CORREOS has no stub — its solid segment reaches the core border exactly.
 * null = no stub for that piece.
 */
const DASHED_STUBS: (readonly [number, number, number, number] | null)[] = [
  [288, 143, 306, 152], // 0: HOJAS DE CÁLCULO stub
  null,                  // 1: CORREOS — no stub needed
  [352, 143, 334, 152], // 2: NOTAS stub
  [290, 158, 306, 152], // 3: CATÁLOGO stub
  [352, 158, 334, 152], // 4: HISTORIAL stub
]

// ── Pulse animation hook ───────────────────────────────────────────────────────

/**
 * Spawns ambre pulses that travel a random solid segment and stop at the break.
 * Also drives the core scale pulse.
 * Bails entirely when prefers-reduced-motion is set.
 */
function useProblemPulses(
  svgRef: React.RefObject<SVGSVGElement | null>,
  segRefs: React.RefObject<SVGLineElement | null>[],
  coreRef: React.RefObject<SVGCircleElement | null>,
) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const svg = svgRef.current
    if (!svg) return

    const NS = 'http://www.w3.org/2000/svg'
    let running = true
    let coreAngle = 0

    /*
     * Core scale pulse — uses setInterval (not recursive rAF) to avoid
     * infinite recursion in the test environment where rAF is mocked to
     * fire immediately. ~40ms interval ≈ 25fps, sufficient for a slow pulse.
     */
    const coreIv = setInterval(() => {
      if (!running) return
      coreAngle += PROBLEM_CORE_PULSE_SPEED
      const scale = 1 + Math.sin(coreAngle) * PROBLEM_CORE_PULSE_AMPLITUDE
      const core = coreRef.current
      if (core) {
        core.setAttribute(
          'transform',
          `translate(${CORE_CX} ${CORE_CY}) scale(${scale}) translate(-${CORE_CX} -${CORE_CY})`,
        )
      }
    }, 40)

    // Pulse spawner
    function spawnPulse() {
      if (!running || !svg) return

      // Pick a random solid segment
      const idx = Math.floor(Math.random() * segRefs.length)
      const seg = segRefs[idx].current
      if (!seg) return

      const len = seg.getTotalLength()
      const dot = document.createElementNS(NS, 'circle')
      dot.setAttribute('r', '3')
      dot.setAttribute('class', 'problem-pulse')
      dot.setAttribute('aria-hidden', 'true')
      svg.querySelector('.problem-pulse-layer')?.appendChild(dot)

      const t0 = performance.now()

      function frame(now: number) {
        const elapsed = now - t0

        if (elapsed < PROBLEM_PULSE_DURATION_MS) {
          // Travel the solid segment
          const progress = elapsed / PROBLEM_PULSE_DURATION_MS
          const pt = seg!.getPointAtLength(progress * len)
          dot.setAttribute('cx', String(pt.x))
          dot.setAttribute('cy', String(pt.y))
          dot.setAttribute('opacity', '1')
          requestAnimationFrame(frame)
        } else if (elapsed < PROBLEM_PULSE_DURATION_MS + PROBLEM_PULSE_FADE_MS) {
          // Flash ambre-dk at the break and fade
          const fadeProgress = (elapsed - PROBLEM_PULSE_DURATION_MS) / PROBLEM_PULSE_FADE_MS
          const pt = seg!.getPointAtLength(len)
          dot.setAttribute('cx', String(pt.x))
          dot.setAttribute('cy', String(pt.y))
          dot.setAttribute('class', 'problem-pulse problem-pulse--break')
          dot.setAttribute('opacity', String((1 - fadeProgress).toFixed(2)))
          requestAnimationFrame(frame)
        } else {
          dot.remove()
        }
      }

      requestAnimationFrame(frame)
    }

    const iv = setInterval(() => {
      if (running) spawnPulse()
    }, PROBLEM_PULSE_INTERVAL_MS)

    return () => {
      running = false
      clearInterval(iv)
      clearInterval(coreIv)
    }
  }, [svgRef, segRefs, coreRef])
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProblemFlowsFig({
  content,
  ariaLabel,
}: {
  content: ProblemFlowsFigContent
  ariaLabel: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const coreRef = useRef<SVGCircleElement>(null)

  // One ref per solid segment (5 pieces)
  const segRefs = [
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
    useRef<SVGLineElement>(null),
  ] as const

  useProblemPulses(svgRef, [...segRefs], coreRef)

  return (
    <DiagramReveal className="problem-plate">
      <figure className="system-diagram">
        <svg
          ref={svgRef}
          viewBox="0 0 640 300"
          role="img"
          aria-label={ariaLabel}
        >
          {/* ── Corner ticks (kit grammar §3.3) ── */}
          <g className="diagram-frame-ticks">
            <path d="M16 24 h-10 v10" />
            <path d="M624 24 h10 v10" />
            <path d="M16 276 h-10 v-10" />
            <path d="M624 276 h10 v-10" />
          </g>

          {/* ── Five piece boxes ── */}
          <g className="problem-fig__pieces">
            {PIECE_BOXES.map((box, i) => (
              <g key={content.pieces[i]} className="problem-fig__piece">
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  className="problem-fig__piece-rect"
                />
                <text
                  x={box.lx}
                  y={box.ly}
                  className="problem-fig__piece-label"
                >
                  {content.pieces[i]}
                </text>
              </g>
            ))}
          </g>

          {/* ── Solid connector segments (the connections that should exist) ── */}
          <g className="problem-fig__solids">
            {SOLID_SEGMENTS.map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                ref={segRefs[i]}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="problem-fig__solid"
              />
            ))}
          </g>

          {/* ── Dashed stubs near the core (the break) ── */}
          <g className="problem-fig__stubs">
            {DASHED_STUBS.map((stub, i) =>
              stub ? (
                <line
                  key={i}
                  x1={stub[0]}
                  y1={stub[1]}
                  x2={stub[2]}
                  y2={stub[3]}
                  className="problem-fig__stub"
                />
              ) : null,
            )}
          </g>

          {/* ── Fragile core: PROCESOS MANUALES ── */}
          <g className="problem-fig__core">
            <circle
              ref={coreRef}
              cx={CORE_CX}
              cy={CORE_CY}
              r={CORE_R}
              className="problem-fig__core-ring"
            />
            <text
              x={CORE_CX}
              y={CORE_CY - 7}
              textAnchor="middle"
              className="problem-fig__core-label"
            >
              {content.core[0]}
            </text>
            <text
              x={CORE_CX}
              y={CORE_CY + 9}
              textAnchor="middle"
              className="problem-fig__core-label"
            >
              {content.core[1]}
            </text>
          </g>

          {/* ── Pulse layer (aria-hidden — decorative) ── */}
          <g className="problem-pulse-layer" aria-hidden="true" />
        </svg>

        <figcaption className="problem-fig__caption">
          {content.caption}
        </figcaption>
        <p className="problem-fig__note">{content.note}</p>
      </figure>
    </DiagramReveal>
  )
}
