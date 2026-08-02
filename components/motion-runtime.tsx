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
  return <ReactLenis root options={{ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: true }}>{children}</ReactLenis>
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
        const progress = Math.min((now - start) / 900, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(`${sign}${Math.round(target * eased)}${suffix}`)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref} aria-label={value}>{display}</span>
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.dataset.visible = "true"
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}
