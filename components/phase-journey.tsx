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

  return (
    <div ref={rootRef} className="phase-journey" style={{
      '--journey-position': `${progress * 100}%`,
      '--path-x': `${5 + progress * 90}%`,
      '--path-y': `${78 - progress * 58}%`,
    } as CSSProperties}>
      <div className="phase-journey__pin">
        <div className="phase-journey__spine" aria-hidden="true">
          <span className="phase-journey__line" />
          <span className="phase-journey__line-complete" />
          {phases.map((item, index) => (
            <span
              className={`phase-journey__node ${index < active ? 'is-complete' : index === active ? 'is-active' : ''}`}
              style={{
                '--node-x': `${5 + (index / (phases.length - 1)) * 90}%`,
                '--node-y': `${78 - (index / (phases.length - 1)) * 58}%`,
              } as CSSProperties}
              key={item.name}
            >
              {pad(index)}
            </span>
          ))}
          <span className="phase-journey__pulse" />
        </div>

        <div className="phase-journey__active" aria-live="polite">
          <span className="phase-journey__number" aria-hidden="true">{pad(active)}</span>
          <p className="phase-journey__eyebrow">FASE {pad(active)} / {String(phases.length).padStart(2, '0')}</p>
          <h3>{phase.name}</h3>
          <p className="phase-journey__description">{phase.description}</p>
        </div>

        <div className="phase-journey__upcoming" aria-hidden="true">
          {phases.slice(active + 1, active + 4).map((item, index) => (
            <article
              className="phase-journey__preview"
              style={{
                left: `${47 + index * 17}%`,
                top: `${58 - index * 14}%`,
                '--preview-delay': `${index * -1.2}s`,
              } as CSSProperties}
              key={`${active}-${item.name}`}
            >
              <span>{pad(active + index + 1)}</span>
              <strong>{item.name}</strong>
            </article>
          ))}
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
