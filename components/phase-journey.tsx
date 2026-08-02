'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Phase = { readonly name: string; readonly description: string }

const pad = (value: number) => String(value + 1).padStart(2, '0')

export function PhaseJourney({ phases }: { phases: readonly Phase[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = root.getBoundingClientRect()
      const distance = Math.max(root.offsetHeight - window.innerHeight, 1)
      const nextProgress = Math.min(1, Math.max(0, -rect.top / distance))
      setProgress(nextProgress)
      setActive(Math.min(phases.length - 1, Math.floor(nextProgress * phases.length)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [phases.length])

  const phase = phases[active]
  const localProgress = Math.min(1, Math.max(0, progress * phases.length - active))

  return (
    <div ref={rootRef} className="phase-journey" style={{ '--journey-position': `${progress * 100}%`, '--phase-position': `${localProgress * 88}%` } as CSSProperties}>
      <div className="phase-journey__pin">
        <div className="phase-journey__active" aria-live="polite">
          <span className="phase-journey__number" aria-hidden="true">{pad(active)}</span>
          <p className="phase-journey__eyebrow">FASE {pad(active)} / {String(phases.length).padStart(2, '0')}</p>
          <h3>{phase.name}</h3>
          <p className="phase-journey__description">{phase.description}</p>
        </div>

        <div className="phase-journey__path" aria-hidden="true">
          <span className="phase-journey__line" />
          <span className="phase-journey__pulse" />
          <div className="phase-journey__upcoming">
            {phases.slice(active + 1, active + 4).map((item, index) => (
              <article className="phase-journey__preview" key={item.name}>
                <span>{pad(active + index + 1)}</span>
                <strong>{item.name}</strong>
              </article>
            ))}
          </div>
        </div>

        <ol className="phase-journey__rail" aria-label="Progreso del Escala Growth Framework">
          {phases.map((item, index) => (
            <li key={item.name} className={index < active ? 'is-complete' : index === active ? 'is-active' : ''} aria-current={index === active ? 'step' : undefined}>
              <span>{pad(index)}</span><i aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>

      <ol className="phase-journey__static">
        {phases.map((item, index) => (
          <li key={item.name}>
            <span>{pad(index)}</span>
            <div><h3>{item.name}</h3><p>{item.description}</p></div>
          </li>
        ))}
      </ol>
    </div>
  )
}
