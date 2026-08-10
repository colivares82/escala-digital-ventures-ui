'use client'

/**
 * Hero narrative diagram — FIG.01 (SPEC-POLISH-01).
 *
 * Three-act story: MANUAL PROCESSES → BESPOKE SYSTEM → REAL VALUE.
 * Particles follow the actual SVG paths via getPointAtLength (rAF loop).
 * Dense on input, brief hold at system boundary, sparse on output.
 * prefers-reduced-motion: full static fallback — no particles, story still clear.
 *
 * All copy comes from the heroFigure dictionary prop (no hardcoded strings).
 * Colors from design tokens only (no hardcoded hex).
 */

import { useEffect, useRef } from 'react'
import { DiagramReveal } from '@/components/motion-runtime'
import {
  HERO_PARTICLE_DOUBLE_CHANCE,
  HERO_PARTICLE_HOLD_MS,
  HERO_PARTICLE_IN_DURATION_MS,
  HERO_PARTICLE_IN_JITTER_MS,
  HERO_PARTICLE_OUT_DURATION_MS,
  HERO_PARTICLE_SPAWN_INTERVAL_MS,
} from '@/lib/motion-constants'

export interface HeroFigureContent {
  readonly zones: readonly [string, string, string]
  readonly inputs: readonly [string, string, string, string, string]
  readonly system: { readonly title: string; readonly innerLabel: string }
  readonly outputs: readonly [
    { readonly label: string; readonly sub: string },
    { readonly label: string; readonly sub: string },
  ]
  readonly caption: string
}

// ── SVG geometry constants (viewBox 780×460) ─────────────────────────────────
// These are layout values, not copy — intentionally not in the dictionary.

/** Input box x origin */
const IN_X = 24
/** Input box width */
const IN_W = 150
/** Input box height */
const IN_H = 26
/** Y positions for the 5 input boxes */
const IN_Y = [92, 150, 208, 266, 324] as const

/** System zone rect */
const SYS_X = 320
const SYS_Y = 150
const SYS_W = 140
const SYS_H = 160

/** Y positions where input paths arrive at the system left edge */
const SYS_IN_Y = [210, 220, 230, 242, 254] as const

/** Y positions of the two ordered output rails leaving the system right edge */
const SYS_OUT_Y = [205, 256] as const

/** Output box x origin */
const OUT_X = 600
/** Output box width */
const OUT_W = 164
/** Output box height */
const OUT_H = 50
/** Y positions for the 2 output boxes */
const OUT_Y = [126, 276] as const

// ── Path data ─────────────────────────────────────────────────────────────────

/** Dashed input paths: from right edge of each input box → system left edge */
const INPUT_PATHS = [
  `M${IN_X + IN_W} ${IN_Y[0] + IN_H / 2} C240 ${IN_Y[0] + IN_H / 2}, 270 200, ${SYS_X} ${SYS_IN_Y[0]}`,
  `M${IN_X + IN_W} ${IN_Y[1] + IN_H / 2} C240 ${IN_Y[1] + IN_H / 2}, 280 205, ${SYS_X} ${SYS_IN_Y[1]}`,
  `M${IN_X + IN_W} ${IN_Y[2] + IN_H / 2} C250 ${IN_Y[2] + IN_H / 2}, 285 225, ${SYS_X} ${SYS_IN_Y[2]}`,
  `M${IN_X + IN_W} ${IN_Y[3] + IN_H / 2} C250 ${IN_Y[3] + IN_H / 2}, 285 245, ${SYS_X} ${SYS_IN_Y[3]}`,
  `M${IN_X + IN_W} ${IN_Y[4] + IN_H / 2} C240 ${IN_Y[4] + IN_H / 2}, 280 260, ${SYS_X} ${SYS_IN_Y[4]}`,
] as const

/** Solid output paths: from system right edge → output box left edge */
const OUTPUT_PATHS = [
  `M${SYS_X + SYS_W} ${SYS_OUT_Y[0]} C540 ${SYS_OUT_Y[0]}, 560 ${OUT_Y[0] + OUT_H / 2}, ${OUT_X} ${OUT_Y[0] + OUT_H / 2}`,
  `M${SYS_X + SYS_W} ${SYS_OUT_Y[1]} C540 ${SYS_OUT_Y[1]}, 560 ${OUT_Y[1] + OUT_H / 2}, ${OUT_X} ${OUT_Y[1] + OUT_H / 2}`,
] as const

// ── Particle hook ─────────────────────────────────────────────────────────────

/**
 * Spawns ambre particles that travel input paths → hold → output paths.
 * Bails entirely when prefers-reduced-motion is set.
 */
function useParticles(
  svgRef: React.RefObject<SVGSVGElement | null>,
  inPathRefs: React.RefObject<SVGPathElement | null>[],
  outPathRefs: React.RefObject<SVGPathElement | null>[],
) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const svg = svgRef.current
    if (!svg) return

    const NS = 'http://www.w3.org/2000/svg'
    let running = true

    function spawnParticle() {
      if (!running || !svg) return

      const inPath = inPathRefs[Math.floor(Math.random() * inPathRefs.length)].current
      const outPath = outPathRefs[Math.floor(Math.random() * outPathRefs.length)].current
      if (!inPath || !outPath) return

      const dot = document.createElementNS(NS, 'circle')
      dot.setAttribute('r', '2.7')
      dot.setAttribute('class', 'hero-particle')
      dot.setAttribute('aria-hidden', 'true')
      svg.querySelector('.hero-particle-layer')?.appendChild(dot)

      const inLen = inPath.getTotalLength()
      const outLen = outPath.getTotalLength()
      const inDur = HERO_PARTICLE_IN_DURATION_MS + Math.random() * HERO_PARTICLE_IN_JITTER_MS
      const t0 = performance.now()

      function frame(now: number) {
        const elapsed = now - t0
        let pt: DOMPoint | null = null

        if (elapsed < inDur) {
          const progress = elapsed / inDur
          pt = inPath!.getPointAtLength(progress * inLen)
          dot.setAttribute('opacity', String(Math.min(0.45 + 0.55 * progress, 1).toFixed(2)))
        } else if (elapsed < inDur + HERO_PARTICLE_HOLD_MS) {
          pt = inPath!.getPointAtLength(inLen)
          dot.setAttribute('opacity', '1')
        } else if (elapsed < inDur + HERO_PARTICLE_HOLD_MS + HERO_PARTICLE_OUT_DURATION_MS) {
          const k = (elapsed - inDur - HERO_PARTICLE_HOLD_MS) / HERO_PARTICLE_OUT_DURATION_MS
          pt = outPath!.getPointAtLength(k * outLen)
        } else {
          dot.remove()
          return
        }

        if (pt) {
          dot.setAttribute('cx', String(pt.x))
          dot.setAttribute('cy', String(pt.y))
        }
        requestAnimationFrame(frame)
      }

      requestAnimationFrame(frame)
    }

    const iv = setInterval(() => {
      if (!running) return
      spawnParticle()
      if (Math.random() < HERO_PARTICLE_DOUBLE_CHANCE) spawnParticle()
    }, HERO_PARTICLE_SPAWN_INTERVAL_MS)

    return () => {
      running = false
      clearInterval(iv)
    }
  }, [svgRef, inPathRefs, outPathRefs])
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroNarrativeFig({
  content,
  ariaLabel,
}: {
  content: HeroFigureContent
  ariaLabel: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)

  // One ref per input path (5) and output path (2)
  const inRefs = [
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
  ] as const

  const outRefs = [
    useRef<SVGPathElement>(null),
    useRef<SVGPathElement>(null),
  ] as const

  useParticles(svgRef, [...inRefs], [...outRefs])

  return (
    <DiagramReveal className="hero-plate">
      <figure className="system-diagram">
        <svg
          ref={svgRef}
          viewBox="0 0 780 460"
          role="img"
          aria-label={ariaLabel}
        >
          {/* ── Corner ticks (kit grammar) ── */}
          <g className="diagram-frame-ticks">
            <path d="M24 54 h-14 v14" />
            <path d="M756 54 h14 v14" />
            <path d="M24 430 h-14 v-14" />
            <path d="M756 430 h14 v-14" />
          </g>

          {/* ── Zone labels ── */}
          <text x="30" y="44" className="hero-fig__zone hero-fig__zone--left">
            {content.zones[0]}
          </text>
          <text x="390" y="44" className="hero-fig__zone hero-fig__zone--center" textAnchor="middle">
            {content.zones[1]}
          </text>
          <text x="750" y="44" className="hero-fig__zone hero-fig__zone--right" textAnchor="end">
            {content.zones[2]}
          </text>

          {/* ── Act 01: 5 named input boxes ── */}
          <g className="hero-fig__inputs">
            {content.inputs.map((label, i) => (
              <g key={label}>
                <rect
                  x={IN_X}
                  y={IN_Y[i]}
                  width={IN_W}
                  height={IN_H}
                  className="hero-fig__input-box"
                />
                <text
                  x={IN_X + 12}
                  y={IN_Y[i] + IN_H / 2 + 4}
                  className="hero-fig__input-label"
                >
                  {label}
                </text>
              </g>
            ))}
          </g>

          {/* ── Input paths (dashed = manual) ── */}
          <g className="hero-fig__in-paths">
            {INPUT_PATHS.map((d, i) => (
              <path
                key={i}
                ref={inRefs[i]}
                d={d}
                className="hero-fig__in-path"
              />
            ))}
          </g>

          {/* ── Act 02: System zone ── */}
          <g className="hero-fig__system">
            <rect
              x={SYS_X}
              y={SYS_Y}
              width={SYS_W}
              height={SYS_H}
              className="hero-fig__system-rect"
            />
            {/* Mixed lines entering on the left, converging to 2 rails on the right */}
            <g className="hero-fig__system-reorder">
              <path d={`M${SYS_X} ${SYS_IN_Y[0]} C360 ${SYS_IN_Y[0]}, 370 195, 400 195`} />
              <path d={`M${SYS_X} ${SYS_IN_Y[1]} C360 ${SYS_IN_Y[1]}, 372 205, 400 205`} />
              <path d={`M${SYS_X} ${SYS_IN_Y[2]} C362 ${SYS_IN_Y[2]}, 372 215, 400 215`} />
              <path d={`M${SYS_X} ${SYS_IN_Y[3]} C360 ${SYS_IN_Y[3]}, 372 250, 400 250`} />
              <path d={`M${SYS_X} ${SYS_IN_Y[4]} C360 ${SYS_IN_Y[4]}, 372 262, 400 262`} />
            </g>
            {/* Two ordered output rails */}
            <g className="hero-fig__system-rails">
              <line x1="400" y1={SYS_OUT_Y[0]} x2={SYS_X + SYS_W} y2={SYS_OUT_Y[0]} />
              <line x1="400" y1={SYS_OUT_Y[1]} x2={SYS_X + SYS_W} y2={SYS_OUT_Y[1]} />
            </g>
            <text
              x={SYS_X + SYS_W / 2}
              y={SYS_Y + SYS_H - 14}
              textAnchor="middle"
              className="hero-fig__system-inner"
            >
              {content.system.innerLabel}
            </text>
          </g>

          {/* ── Output paths (solid = ordered) ── */}
          <g className="hero-fig__out-paths">
            {OUTPUT_PATHS.map((d, i) => (
              <path
                key={i}
                ref={outRefs[i]}
                d={d}
                className="hero-fig__out-path"
              />
            ))}
          </g>

          {/* ── Act 03: 2 output value boxes ── */}
          <g className="hero-fig__outputs">
            {content.outputs.map((out, i) => (
              <g key={out.label}>
                <rect
                  x={OUT_X}
                  y={OUT_Y[i]}
                  width={OUT_W}
                  height={OUT_H}
                  className="hero-fig__output-box"
                />
                <text
                  x={OUT_X + 12}
                  y={OUT_Y[i] + 20}
                  className="hero-fig__output-label"
                >
                  {out.label}
                </text>
                <text
                  x={OUT_X + 12}
                  y={OUT_Y[i] + 38}
                  className="hero-fig__output-sub"
                >
                  {out.sub}
                </text>
              </g>
            ))}
          </g>

          {/* ── Particle layer (aria-hidden — decorative) ── */}
          <g className="hero-particle-layer" aria-hidden="true" />
        </svg>

        <figcaption>{content.caption}</figcaption>
      </figure>
    </DiagramReveal>
  )
}
