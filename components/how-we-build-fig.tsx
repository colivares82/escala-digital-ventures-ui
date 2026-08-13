'use client'

/**
 * HowWeBuildFig — FIG.12 layered system diagram for "Cómo construimos" (§3.3).
 * A dashed governing frame contains the approved specification, three named
 * parallel agent lanes, and two amber gates; production sits outside the frame,
 * with an amber return path re-entering it. Deliberately NOT a second
 * left-to-right chain — the frame is the argument.
 * Geometry source of truth: specs/mockups/polish-06-fig07-how-we-build.html
 * Spec: SPEC-POLISH-06 §3
 */

import { useEffect, useRef, useState } from 'react'
import {
  HOW_WE_BUILD_GATE_OFFSET_S,
  HOW_WE_BUILD_PULSE_DUR_S,
  HOW_WE_BUILD_PULSE_STAGGER_S,
  HOW_WE_BUILD_RETURN_PULSE_DUR_S,
} from '@/lib/motion-constants'

export interface HowWeBuildFigContent {
  readonly frame: string
  readonly entry: string
  readonly entrySub: string
  readonly lanePrefix: string
  readonly lanes: readonly [string, string, string]
  readonly gate1: string
  readonly gate2: string
  readonly gate2Sub: string
  readonly exit: string
  readonly exitSub: string
  readonly returnLabel: string
  readonly caption: string
  readonly ariaLabel: string
}

export interface HowWeBuildFigProps {
  content: HowWeBuildFigContent
}

// Lane Y centers (implementación / pruebas / documentación).
const LANE_Y = [175, 245, 315] as const
const LANE_PATHS = [
  'M250,245 L272,245 L272,175 L540,175 L540,245 L850,245',
  'M250,245 L850,245',
  'M250,245 L272,245 L272,315 L540,315 L540,245 L850,245',
] as const
const RETURN_PULSE_PATH = 'M955,270 L955,465 L170,465 L170,410'

export function HowWeBuildFig({ content }: HowWeBuildFigProps) {
  const figRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = figRef.current
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
    <figure
      ref={figRef}
      className={`how-we-build__fig${visible ? ' is-visible' : ''}`}
      aria-label={content.ariaLabel}
      role="img"
    >
      <figcaption className="sr-only">
        {content.caption}. {content.returnLabel}.
      </figcaption>

      <svg
        viewBox="0 0 1100 500"
        aria-hidden="true"
        className="how-we-build__svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer dashed governing frame — contains entry, lanes and both gates */}
        <rect className="build-frame" x="40" y="80" width="760" height="330" />
        <text className="build-frame-lbl" x="60" y="108">{content.frame}</text>

        {/* Entry: approved specification */}
        <rect className="build-box" x="70" y="220" width="180" height="50" />
        <text className="build-lbl" x="160" y="241" textAnchor="middle">{content.entry}</text>
        <text className="build-sub" x="160" y="257" textAnchor="middle">{content.entrySub}</text>

        {/* Wires from entry, fanning into the three lanes */}
        <line className="build-wire" x1="250" y1="245" x2="272" y2="245" />
        <line className="build-wire" x1="272" y1="175" x2="272" y2="315" />
        <line className="build-wire" x1="272" y1="175" x2="300" y2="175" />
        <line className="build-wire" x1="272" y1="245" x2="300" y2="245" />
        <line className="build-wire" x1="272" y1="315" x2="300" y2="315" />

        {/* Three named parallel agent lanes */}
        {content.lanes.map((lane, i) => (
          <g key={lane}>
            <rect className="build-box" x="300" y={LANE_Y[i]! - 25} width="200" height="50" />
            <text className="build-lbl" x="400" y={LANE_Y[i]! - 4} textAnchor="middle">{content.lanePrefix}</text>
            <text className="build-sub" x="400" y={LANE_Y[i]! + 12} textAnchor="middle">{lane}</text>
          </g>
        ))}

        {/* Lanes converge, cross the two gates, exit the frame to production */}
        <line className="build-wire" x1="500" y1="175" x2="540" y2="175" />
        <line className="build-wire" x1="500" y1="245" x2="540" y2="245" />
        <line className="build-wire" x1="500" y1="315" x2="540" y2="315" />
        <line className="build-wire" x1="540" y1="175" x2="540" y2="315" />
        <line className="build-wire" x1="540" y1="245" x2="844" y2="245" />
        <path className="build-wire" d="M838,239 L850,245 L838,251" />

        <rect className="build-gate build-gate--1" x="600" y="160" width="6" height="170" />
        <text className="build-gate-lbl" x="603" y="150" textAnchor="middle">{content.gate1}</text>

        <rect className="build-gate build-gate--2" x="690" y="160" width="6" height="170" />
        <text className="build-gate-lbl" x="693" y="352" textAnchor="middle">{content.gate2}</text>
        <text className="build-sub" x="693" y="368" textAnchor="middle">{content.gate2Sub}</text>

        {/* Exit, outside the frame */}
        <rect className="build-box" x="850" y="220" width="210" height="50" />
        <text className="build-lbl" x="955" y="241" textAnchor="middle">{content.exit}</text>
        <text className="build-sub" x="955" y="257" textAnchor="middle">{content.exitSub}</text>

        {/* Return path, in amber, back into the frame */}
        <path className="build-ret" d="M955,270 L955,465 L170,465 L170,416" />
        <path className="build-ret" d="M164,422 L170,410 L176,422" />
        <text className="build-ret-lbl" x="562" y="452" textAnchor="middle">{content.returnLabel}</text>

        {visible && (
          <>
            {LANE_PATHS.map((path, i) => (
              <circle key={path} className="build-pulse" r={5}>
                <animateMotion
                  dur={`${HOW_WE_BUILD_PULSE_DUR_S}s`}
                  begin={`${i * HOW_WE_BUILD_PULSE_STAGGER_S}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </circle>
            ))}
            <circle className="build-pulse build-pulse--return" r={4}>
              <animateMotion
                dur={`${HOW_WE_BUILD_RETURN_PULSE_DUR_S}s`}
                begin={`${HOW_WE_BUILD_GATE_OFFSET_S * 6}s`}
                repeatCount="indefinite"
                path={RETURN_PULSE_PATH}
              />
            </circle>
          </>
        )}
      </svg>

      <p className="how-we-build__caption">{content.caption}</p>
    </figure>
  )
}
