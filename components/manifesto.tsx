'use client'

/**
 * Manifesto — E · El Manifiesto de Escala (abisal surface).
 *
 * NEW design: 10 stacked "strata" plates — a vertical core-sample layout.
 * Each plate: ghost number (Archivo, ~2.6rem, paper 25%) / belief text / mono meta.
 * Shared 1px borders, no doubling. A 3px ambre left bar grows (scaleY 0→1)
 * once per plate as the container enters the viewport (staggered).
 *
 * Scroll reveal: IntersectionObserver on the manifesto container sets
 * `data-visible="true"`; CSS transitions on `.manifesto__bar` fire with
 * per-plate `--man-delay` stagger. Bars reveal once and stay.
 *
 * Reduced-motion: all bars rendered at full scaleY(1) with no transition
 * via `@media (prefers-reduced-motion: reduce)` CSS rule.
 *
 * colivares.com plain-text line appears after the plates (FR-8.1).
 * NOT a link — guard: no <a> element until the site is live.
 * // TODO: linkify colivares.com when live.
 *
 * Spec: SPEC-P2.5 FR-7 / FR-8
 */

import { useEffect, useRef } from 'react'
import { GridBackground } from '@/components/grid-background'
import { DIAGRAM_REVEAL_THRESHOLD } from '@/lib/motion-constants'

// Stagger step in ms per plate
const PLATE_STAGGER_MS = 60

export interface ManifestoProps {
  /** Section eyebrow: "E / EL MANIFIESTO" */
  sectionEyebrow: string
  /** H2 heading: "El Manifiesto de Escala" */
  heading: string
  /** Mono lead: "DIEZ CREENCIAS · UNA FORMA DE ENTENDER LA TECNOLOGÍA" */
  lead: string
  /** Exactly 10 beliefs verbatim from Libro Ch. 3 */
  beliefs: ReadonlyArray<string>
  /**
   * Mono plain-text attribution line for colivares.com.
   * Rendered as plain text (not a link) until the site is live.
   */
  colivaresLine: string
}

export function Manifesto({
  sectionEyebrow,
  heading,
  lead,
  beliefs,
  colivaresLine,
}: ManifestoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    // Reduced-motion: mark visible immediately so CSS sets bars to full.
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
      { threshold: DIAGRAM_REVEAL_THRESHOLD },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="manifesto dark-surface">
      <GridBackground />
      <div className="page-shell manifesto__inner">
        {/* Section header */}
        <div className="manifesto__head">
          <div>
            <p className="manifesto__eyebrow">{sectionEyebrow}</p>
            <h2 className="manifesto__heading">{heading}</h2>
          </div>
          <p className="manifesto__lead">{lead}</p>
        </div>

        {/* 10 strata plates */}
        <div
          className="manifesto__plates"
          ref={containerRef}
          data-visible="false"
        >
          {beliefs.map((belief, i) => {
            const num = String(i + 1).padStart(2, '0')
            const delayMs = i * PLATE_STAGGER_MS
            return (
              <div
                key={num}
                className="manifesto__plate"
                style={{ '--man-delay': `${delayMs}ms` } as React.CSSProperties}
              >
                {/* Ambre bar — reveals scaleY 0→1 on scroll entry */}
                <span className="manifesto__bar" aria-hidden="true" />
                {/* Ghost number */}
                <span className="manifesto__num" aria-hidden="true">
                  {num}
                </span>
                {/* Belief text */}
                <p className="manifesto__belief">{belief}</p>
                {/* Right meta */}
                <span className="manifesto__meta">{`${num}/10`}</span>
              </div>
            )
          })}
        </div>

        {/* colivares.com attribution — plain text, NOT a link (FR-8.1). */}
        {/* TODO: linkify colivares.com when live. */}
        <p className="manifesto__colv">{colivaresLine}</p>
      </div>
    </section>
  )
}
