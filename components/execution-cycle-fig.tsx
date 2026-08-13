'use client'

/**
 * ExecutionCycleFig — FIG.06 closed execution cycle diagram.
 * Replaces ExecutionPipelineFig (open-ended pipeline) with a single closed ring:
 * five stations clockwise from 12 o'clock, an amber return edge (station 5 → 1)
 * with an arrowhead that stops at the station-1 marker, and always-visible
 * direction chevrons at the midpoint of each arc.
 * Geometry source of truth: specs/mockups/polish-06-fig06-execution-cycle.html
 * Spec: SPEC-POLISH-06 §2
 */

import { useEffect, useRef, useState } from 'react'
import { SectionIndex } from '@/components/section-index'
import { EXEC_CYCLE_PULSE_DUR_S, EXEC_CYCLE_STATION_STAGGER_S } from '@/lib/motion-constants'

export interface CycleStation {
  readonly label: string
  readonly sub: string
  readonly actor: 'escala' | 'client'
}

export interface ExecutionCycleFigProps {
  sectionIndex: string
  sectionLabel: string
  sectionTitle: string
  lead: string
  /** Exactly 5 stations, clockwise from 12 o'clock. */
  stations: readonly CycleStation[]
  /** Two centre mono lines. */
  centre: readonly [string, string]
  /** Return-edge label (station 5 → station 1, amber). */
  returnLabel: string
  caption: string
  ariaLabel: string
}

// Ring geometry — mirrors the wireframe's 1100×530 viewBox exactly.
const CX = 550
const CY = 300
const R = 180

// Station marker positions, clockwise from 12 o'clock (angles: -90, -18, 54, 126, 198 deg).
const MARKERS = [
  { x: 550, y: 120 },
  { x: 721.2, y: 244.4 },
  { x: 655.8, y: 445.6 },
  { x: 444.2, y: 445.6 },
  { x: 378.8, y: 244.4 },
] as const

// Station box geometry: [x, y, width, height, labelAnchorX, labelY, subY]
const BOXES = [
  { x: 440, y: 33, w: 220, h: 54, lx: 550, ly: 55, sy: 72 },
  { x: 751, y: 208, w: 220, h: 54, lx: 861, ly: 230, sy: 247 },
  { x: 690, y: 443, w: 220, h: 54, lx: 800, ly: 465, sy: 482 },
  { x: 190, y: 443, w: 220, h: 54, lx: 300, ly: 465, sy: 482 },
  { x: 129, y: 208, w: 220, h: 54, lx: 239, ly: 230, sy: 247 },
] as const

// Radial tick endpoints from each marker outward.
const TICKS = [
  { x1: 550, y1: 120, x2: 550, y2: 87 },
  { x1: 721.2, y1: 244.4, x2: 751, y2: 238 },
  { x1: 655.8, y1: 445.6, x2: 690, y2: 462 },
  { x1: 444.2, y1: 445.6, x2: 410, y2: 462 },
  { x1: 378.8, y1: 244.4, x2: 349, y2: 238 },
] as const

// Chevron placements at the midpoint of each of the 5 arcs (translate + rotate deg).
const CHEVRONS = [
  { x: 655.8, y: 154.4, rot: 36, amber: false },
  { x: 721.2, y: 355.6, rot: 108, amber: false },
  { x: 550, y: 480, rot: 180, amber: false },
  { x: 378.8, y: 355.6, rot: 252, amber: false },
  { x: 444.2, y: 154.4, rot: 324, amber: true },
] as const

const RETURN_ARC_D = 'M378.8,244.4 A180,180 0 0,1 550,120'
const PULSE_PATH = `M550,120 A${R},${R} 0 0,1 550,480 A${R},${R} 0 0,1 550,120`

export function ExecutionCycleFig({
  sectionIndex,
  sectionLabel,
  sectionTitle,
  lead,
  stations,
  centre,
  returnLabel,
  caption,
  ariaLabel,
}: ExecutionCycleFigProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section section--dark dark-surface execution-cycle"
      aria-labelledby="exec-cycle-title"
    >
      <div className="page-shell execution-cycle__inner">
        <SectionIndex index={sectionIndex} label={sectionLabel} />
        <h2 id="exec-cycle-title" className="execution-cycle__title">{sectionTitle}</h2>
        <p className="execution-cycle__lead">{lead}</p>

        <figure
          className={`execution-cycle__fig${visible ? ' is-visible' : ''}`}
          aria-label={ariaLabel}
          role="img"
        >
          <figcaption className="sr-only">
            {caption}. {returnLabel}.
          </figcaption>

          {/* <720px fallback: vertical station sequence (§2.4) — same pattern as PhaseCycle */}
          <ol className="execution-cycle__static" aria-hidden="true">
            <li className="execution-cycle__static-centre">{centre[0]} · {centre[1]}</li>
            {stations.map((station, i) => (
              <li
                key={station.label}
                className={`execution-cycle__static-item${station.actor === 'client' ? ' execution-cycle__static-item--client' : ''}`}
              >
                <span className="execution-cycle__static-dot" />
                <span className="execution-cycle__static-label">{station.label}</span>
                <span className="execution-cycle__static-sub">{station.sub}</span>
                {i === stations.length - 1 && (
                  <span className="execution-cycle__static-return">↑ {returnLabel}</span>
                )}
              </li>
            ))}
          </ol>

          <div className="execution-cycle__svg-wrap">
          <svg
            viewBox="0 0 1100 530"
            aria-hidden="true"
            className="execution-cycle__svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle className="cycle-ring" cx={CX} cy={CY} r={R} />
            <path className="cycle-ring-return" d={RETURN_ARC_D} />

            {CHEVRONS.map((c, i) => (
              <g key={`chev-${i}`} className={`cycle-chev${c.amber ? ' cycle-chev--amber' : ''}`}>
                <path d="M-5,-5 L5,0 L-5,5" transform={`translate(${c.x},${c.y}) rotate(${c.rot})`} />
              </g>
            ))}

            <text className="cycle-core" x={CX} y={CY - 8} textAnchor="middle">{centre[0]}</text>
            <text className="cycle-core" x={CX} y={CY + 12} textAnchor="middle">{centre[1]}</text>

            {/* Return-edge label, wrapped to 2 lines at the wireframe's exact positions so it
                never crosses the ring or the return arc (clears both by well over 24px). */}
            {(() => {
              const words = returnLabel.split(' ')
              const mid = Math.ceil(words.length / 2)
              const line1 = words.slice(0, mid).join(' ')
              const line2 = words.slice(mid).join(' ')
              return (
                <>
                  <text className="cycle-arc-lbl" x="415" y="128" textAnchor="end">{line1}</text>
                  <text className="cycle-arc-lbl" x="415" y="142" textAnchor="end">{line2}</text>
                </>
              )
            })()}

            {TICKS.map((t, i) => (
              <line key={`tick-${i}`} className="cycle-tick" x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
            ))}

            {stations.map((station, i) => {
              const box = BOXES[i]!
              const marker = MARKERS[i]!
              const isClient = station.actor === 'client'
              return (
                <g
                  key={station.label}
                  className="cycle-station"
                  style={{ animationDelay: `${i * EXEC_CYCLE_STATION_STAGGER_S}s` }}
                >
                  <rect
                    className={`cycle-box${isClient ? ' cycle-box--client' : ''}`}
                    x={box.x}
                    y={box.y}
                    width={box.w}
                    height={box.h}
                  />
                  <text className="cycle-lbl" x={box.lx} y={box.ly} textAnchor="middle">{station.label}</text>
                  <text className="cycle-sub" x={box.lx} y={box.sy} textAnchor="middle">{station.sub}</text>
                  <circle
                    className={isClient ? 'cycle-node-dot--client' : 'cycle-node-dot'}
                    cx={marker.x}
                    cy={marker.y}
                    r={5}
                  />
                </g>
              )
            })}

            {visible && (
              <circle className="cycle-pulse" r={6}>
                <animateMotion
                  dur={`${EXEC_CYCLE_PULSE_DUR_S}s`}
                  repeatCount="indefinite"
                  path={PULSE_PATH}
                />
              </circle>
            )}
          </svg>
          </div>

          <p className="execution-cycle__caption">{caption}</p>
        </figure>
      </div>
    </section>
  )
}
