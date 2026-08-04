'use client'

/**
 * ExecutionPipelineFig — FIG.06 execution pipeline diagram.
 * PROVISIONAL VISUAL — see PLAN 2.1 note. Carlos will redesign this diagram.
 * This component is intentionally isolated and swappable: clean prop interface,
 * self-contained internals. Replace only this file when the visual is updated.
 * Spec: SPEC-P2.1 FR-5
 */

import { useEffect, useRef, useState } from 'react'
import { SectionIndex } from '@/components/section-index'

export interface PipelineNode {
  readonly label: string
}

export interface ExecutionPipelineFigProps {
  sectionIndex: string
  sectionLabel: string
  sectionTitle: string
  /** Exactly 6 nodes (ESPECIFICACIÓN → PROTOTIPO → CONSTRUCCIÓN → CALIDAD → PRODUCCIÓN → FEEDBACK). */
  nodes: readonly PipelineNode[]
  caption: string
  legend: string
  ariaLabel: string
  returnArcLabel: string
}

const SVG_WIDTH = 1100
const SVG_HEIGHT = 160
const NODE_Y = 70
const NODE_H = 36
const NODE_W = [140, 110, 130, 100, 110, 110]
const NODE_X = [40, 220, 380, 550, 700, 860]
const LINE_Y = 70
const LINE_X1 = 90
const LINE_X2 = 1010

/** Duration of the ambre pulse travelling the full pipeline (ms). */
const PULSE_DURATION_MS = 5400

export function ExecutionPipelineFig({
  sectionIndex,
  sectionLabel,
  sectionTitle,
  nodes,
  caption,
  legend,
  ariaLabel,
  returnArcLabel,
}: ExecutionPipelineFigProps) {
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

  // Node centers on the horizontal axis (mid-x of each rect)
  const nodeCenters = NODE_X.map((x, i) => x + NODE_W[i]! / 2)

  return (
    <section
      ref={sectionRef}
      className="section section--dark dark-surface execution-pipeline"
      aria-labelledby="pipeline-title"
    >
      <div className="page-shell execution-pipeline__inner">
        <SectionIndex index={sectionIndex} label={sectionLabel} />
        <h2 id="pipeline-title" className="execution-pipeline__title">{sectionTitle}</h2>

        <figure
          className={`execution-pipeline__fig${visible ? ' is-visible' : ''}`}
          aria-label={ariaLabel}
          role="img"
        >
          {/* Accessible text summary for screen readers */}
          <figcaption className="sr-only">
            {caption}. {legend}. {returnArcLabel}.
          </figcaption>

          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            aria-hidden="true"
            className="execution-pipeline__svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Base spine */}
            <line
              className="pipeline-spine"
              x1={LINE_X1}
              y1={LINE_Y}
              x2={LINE_X2}
              y2={LINE_Y}
            />

            {/* Node rectangles + labels */}
            {nodes.map((node, i) => (
              <g key={node.label} className="pipeline-node">
                <rect
                  x={NODE_X[i]}
                  y={NODE_Y - NODE_H / 2}
                  width={NODE_W[i]}
                  height={NODE_H}
                  className="pipeline-node__rect"
                />
                <text
                  x={(NODE_X[i]! + NODE_W[i]! / 2)}
                  y={NODE_Y + 4}
                  className="pipeline-node__label"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            ))}

            {/* Ambre return arc: FEEDBACK → ESPECIFICACIÓN (dashed) */}
            <path
              className="pipeline-return"
              d={`M ${nodeCenters[5]} ${NODE_Y + NODE_H / 2} Q 970 135 700 138 Q 400 141 ${nodeCenters[0]} ${NODE_Y + NODE_H / 2}`}
              aria-label={returnArcLabel}
            />

            {/* Ambre legend text below arc */}
            <text
              x={SVG_WIDTH / 2}
              y={150}
              className="pipeline-legend"
              textAnchor="middle"
            >
              {legend}
            </text>

            {/* Ambre pulse — a circle traveling the spine on loop */}
            {visible && (
              <circle className="pipeline-pulse" r={6} cx={LINE_X1} cy={LINE_Y}>
                <animateMotion
                  dur={`${PULSE_DURATION_MS}ms`}
                  repeatCount="indefinite"
                  path={`M ${LINE_X1} ${LINE_Y} L ${LINE_X2} ${LINE_Y}`}
                />
              </circle>
            )}
          </svg>

          {/* Visible caption (kit grammar) */}
          <p className="execution-pipeline__caption">{caption}</p>
        </figure>
      </div>
    </section>
  )
}
