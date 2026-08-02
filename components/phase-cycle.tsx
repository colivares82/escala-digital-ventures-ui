'use client'

import { useEffect, useRef, useState } from 'react'
import {
  PHASE_CYCLE_VISIBLE_THRESHOLD,
  REDUCED_MOTION_QUERY,
} from '@/lib/motion-constants'
import { ROUTES } from '@/lib/routes'

type Phase = { readonly name: string; readonly description: string }

const SIZE = 520
const CENTER = SIZE / 2
const RADIUS = 185
const LABEL_RADIUS = RADIUS + 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Zero-based index → zero-padded two-digit string ("01", "02", …). */
const pad = (value: number) => String(value + 1).padStart(2, '0')

/** Cartesian point on the ring for a given phase index. */
function ringPoint(index: number, count: number, radius = RADIUS) {
  const angle = (-90 + index * (360 / count)) * (Math.PI / 180)
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  }
}

export type PhaseCycleProps = {
  phases: readonly Phase[]
  title: string
  action: string
  /** Section eyebrow label (e.g. "EL CICLO DE CRECIMIENTO"). */
  sectionLabel: string
  /** One-line descriptor below the title (e.g. "DIEZ FASES · UN CICLO CONTINUO"). */
  lead: string
  /** Accessible label for the SVG ring. */
  ariaLabel: string
  /** Prefix for the phase eyebrow counter (e.g. "FASE"). */
  phasePrefix: string
}

export function PhaseCycle({
  phases,
  title,
  action,
  sectionLabel,
  lead,
  ariaLabel,
  phasePrefix,
}: PhaseCycleProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Trigger fade-in of the ring once it first enters the viewport.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          visibilityObserver.disconnect()
        }
      },
      { threshold: PHASE_CYCLE_VISIBLE_THRESHOLD },
    )
    visibilityObserver.observe(root)

    let frame = 0

    const update = () => {
      frame = 0
      // The pinned scroll layout is only active on large screens with motion.
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return
      const rect = root.getBoundingClientRect()
      const distance = Math.max(root.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, -rect.top / distance))
      setActive(Math.min(phases.length - 1, Math.floor(progress * phases.length)))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      visibilityObserver.disconnect()
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [phases.length])

  const selectPhase = (index: number) => {
    setActive(index)
    const root = rootRef.current
    if (!root || window.matchMedia(REDUCED_MOTION_QUERY).matches) return
    const distance = root.offsetHeight - window.innerHeight
    window.scrollTo({
      top: root.offsetTop + (index / Math.max(phases.length - 1, 1)) * distance,
      behavior: 'smooth',
    })
  }

  const phase = phases[active]
  const progressLength = CIRCUMFERENCE * (active / phases.length)
  const evolvePoint = ringPoint(phases.length - 1, phases.length, RADIUS + 26)
  const discoverPoint = ringPoint(0, phases.length, RADIUS + 26)

  return (
    <div ref={rootRef} className={`phase-cycle${visible ? ' is-visible' : ''}`}>
      {/* ── Desktop pinned layout (hidden on mobile / reduced-motion via CSS) ── */}
      <div className="phase-cycle__pin">
        <header className="phase-cycle__header">
          <div className="phase-cycle__meta">
            <p className="section-index">
              <span>03</span>
              <span aria-hidden="true">/</span>
              <span>{sectionLabel}</span>
            </p>
            <a className="text-link" href={ROUTES.METHOD}>
              {action}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <h2 className="phase-cycle__section-title">{title}</h2>
          <p className="phase-cycle__lead">{lead}</p>
        </header>

        <div className="phase-cycle__body">
          <div className="phase-cycle__phase" aria-live="polite">
            <p className="phase-cycle__eyebrow">
              {phasePrefix} {pad(active)} / {String(phases.length).padStart(2, '0')}
            </p>
            <h3>{phase.name}</h3>
            <p className="phase-cycle__description">{phase.description}</p>
          </div>

          <div className="phase-cycle__ring-wrap">
            <span className="phase-cycle__ghost" aria-hidden="true">
              {pad(active)}
            </span>
            <svg
              className="phase-cycle__ring"
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              role="group"
              aria-label={ariaLabel}
            >
              <circle className="phase-cycle__base" cx={CENTER} cy={CENTER} r={RADIUS} />
              <circle
                className="phase-cycle__progress"
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                strokeDasharray={`${progressLength} ${CIRCUMFERENCE}`}
              />
              <path
                className="phase-cycle__return"
                d={`M ${evolvePoint.x} ${evolvePoint.y} A ${RADIUS + 26} ${RADIUS + 26} 0 0 1 ${discoverPoint.x} ${discoverPoint.y}`}
              />

              {phases.map((item, index) => {
                const node = ringPoint(index, phases.length)
                const labelPos = ringPoint(index, phases.length, LABEL_RADIUS)
                const state =
                  index < active
                    ? 'is-complete'
                    : index === active
                      ? 'is-active'
                      : 'is-upcoming'

                return (
                  <g
                    className={`phase-cycle__node ${state}`}
                    key={item.name}
                    role="button"
                    tabIndex={0}
                    aria-label={`Fase ${pad(index)}: ${item.name}`}
                    aria-current={index === active ? 'step' : undefined}
                    onClick={() => selectPhase(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        selectPhase(index)
                      }
                    }}
                  >
                    <circle cx={node.x} cy={node.y} r={index === active ? 18 : 13} />
                    <text className="phase-cycle__node-number" x={node.x} y={node.y + 3.5}>
                      {pad(index)}
                    </text>
                    <text
                      className="phase-cycle__node-label"
                      x={labelPos.x}
                      y={labelPos.y + 3}
                    >
                      {item.name.toUpperCase()}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ── Mobile / reduced-motion fallback (shown via CSS when pin is hidden) ── */}
      <div className="phase-cycle__static-header">
        <p className="section-index">
          <span>03</span>
          <span aria-hidden="true">/</span>
          <span>{sectionLabel}</span>
        </p>
        <h2>{title}</h2>
        <p>{lead}</p>
        <a className="text-link" href={ROUTES.METHOD}>
          {action}
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <ol className="phase-cycle__static">
        {phases.map((item, index) => (
          <li key={item.name}>
            <span>{pad(index)}</span>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
