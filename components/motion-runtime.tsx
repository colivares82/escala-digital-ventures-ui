"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useRef, useState } from "react"

export function MotionRuntime({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  if (reduced) return children
  return <ReactLenis root options={{ duration: 0.9, smoothWheel: true, syncTouch: false, anchors: true }}>{children}</ReactLenis>
}

function useVisible<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.visible = "true"
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      node.dataset.visible = "true"
      observer.disconnect()
    }, { threshold })
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const match = value.match(/([+-]?)(\d+)(.*)/)
    if (!match) return
    const [, sign, digits, suffix] = match
    const target = Number(digits)
    setDisplay(`${sign}0${suffix}`)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 500, 1)
        setDisplay(`${sign}${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref} aria-label={value}>{display}</span>
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useVisible<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export function DiagramReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useVisible<HTMLDivElement>(0.12)
  return <div ref={ref} className={`diagram-reveal ${className}`}>{children}</div>
}

export function WordReveal({ text, as = "h2", className = "" }: { text: string; as?: "h1" | "h2" | "p"; className?: string }) {
  const ref = useVisible<HTMLElement>(0.25)
  const Tag = as
  return (
    <Tag ref={ref as React.Ref<never>} className={`word-reveal ${className}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="word-reveal__mask" aria-hidden="true" key={`${word}-${index}`}>
          <span style={{ "--word-index": index } as React.CSSProperties}>{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  )
}
