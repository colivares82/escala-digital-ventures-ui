'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'
import {
  COUNT_UP_DURATION_MS,
  COUNT_UP_THRESHOLD,
  DIAGRAM_REVEAL_THRESHOLD,
  REVEAL_THRESHOLD,
  WORD_REVEAL_THRESHOLD,
} from '@/lib/motion-constants'

/** Wraps the page with Lenis smooth scroll, skipped when prefers-reduced-motion is set. */
export function MotionRuntime({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (reduced) return children
  return (
    <ReactLenis
      root
      options={{ duration: 0.9, smoothWheel: true, syncTouch: false, anchors: true }}
    >
      {children}
    </ReactLenis>
  )
}

/**
 * Observes when an element enters the viewport and sets `data-visible="true"`.
 * Reduced-motion users receive the visible state immediately (no animation delay).
 */
function useVisible<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        node.dataset.visible = 'true'
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

/** Animates a numeric string (e.g. "100+") from zero to its target when it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const match = value.match(/([+-]?)(\d+)(.*)/)
    if (!match) return

    const [, sign, digits, suffix] = match
    const target = Number(digits)

    // Intentional state reset before the observer-driven count-up begins.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplay(`${sign}0${suffix}`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1)
          setDisplay(
            `${sign}${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`,
          )
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: COUNT_UP_THRESHOLD },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} aria-label={value}>
      {display}
    </span>
  )
}

/** Slides children into view from below when scrolled into viewport. */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useVisible<HTMLDivElement>(REVEAL_THRESHOLD)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/** Reveal wrapper optimised for SVG diagrams (lower threshold for large elements). */
export function DiagramReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useVisible<HTMLDivElement>(DIAGRAM_REVEAL_THRESHOLD)
  return (
    <div ref={ref} className={`diagram-reveal ${className}`}>
      {children}
    </div>
  )
}

/**
 * Renders a heading where each word slides up on scroll.
 * The full text is set as aria-label so screen readers read it once, cleanly.
 */
export function WordReveal({
  text,
  as = 'h2',
  className = '',
}: {
  text: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
}) {
  const ref = useVisible<HTMLElement>(WORD_REVEAL_THRESHOLD)
  const Tag = as

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`word-reveal ${className}`}
      aria-label={text}
    >
      {text.split(' ').map((word, index) => (
        <span
          className="word-reveal__mask"
          aria-hidden="true"
          key={`${word}-${index}`}
        >
          <span style={{ '--word-index': index } as React.CSSProperties}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  )
}
