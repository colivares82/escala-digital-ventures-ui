'use client'

/**
 * ServiceFig — FIG. 07–11 service diagram family.
 * DRAFT VISUAL — iterated per service (PLAN 2.2)
 *
 * ONE parameterized component with five isolated variant renderers. AC-4/AC-5.
 * Changing one variant must not touch the others — each has its own render function.
 * Labels are passed from the content dictionary (figLabels). No hardcoded copy.
 * Spec: SPEC-P2.2 FR-4
 */

import { useEffect, useRef, useState } from 'react'
import type { ServiceFigVariant } from '@/content/types'

export interface ServiceFigProps {
  /** One of five service variants — determines which figure geometry is rendered. */
  variant: ServiceFigVariant
  /** SVG node labels from the content dictionary (figLabels). */
  labels: readonly string[]
  /** Caption text (figCaption from dictionary): "FIG. XX — NAME". */
  caption: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Variant renderers — each variant is a fully isolated function.
// Changing one variant here must NOT affect the others. AC-5.
// ─────────────────────────────────────────────────────────────────────────────

interface VariantProps {
  labels: readonly string[]
  visible: boolean
}

/** FIG. 07 — CAPTURA A INFORME */
function CaptureFig({ labels, visible }: VariantProps) {
  // DRAFT VISUAL — iterated per service (PLAN 2.2)
  // Dashed inputs (dispersed) → ambre-ringed PROCESO node → solid ordered outputs
  const [l0 = 'HOJA', l1 = 'CORREO', l2 = 'DATO', l3 = 'PROCESO', l4 = 'INFORME', l5 = 'FACTURA'] = labels
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="service-fig__svg">
      <g stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="4 3">
        <path d="M60 35 C110 35 120 75 150 75" />
        <path d="M60 75 L150 75" />
        <path d="M60 115 C110 115 120 75 150 75" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <rect x="18" y="26" width="42" height="18" />
        <rect x="18" y="66" width="42" height="18" />
        <rect x="18" y="106" width="42" height="18" />
        <circle cx="150" cy="75" r="9" stroke="var(--ambre)" />
        <path d="M159 75 L230 75" />
        <rect x="230" y="46" width="72" height="18" />
        <rect x="230" y="86" width="72" height="18" />
        <path d="M266 64 L266 86" />
      </g>
      {visible && (
        <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
          <animateMotion dur="2s" repeatCount="indefinite" path="M159 75 L230 75" />
        </circle>
      )}
      <g className="service-fig__label">
        <text x="22" y="38">{l0}</text>
        <text x="22" y="78">{l1}</text>
        <text x="22" y="118">{l2}</text>
        <text x="140" y="62">{l3}</text>
        <text x="236" y="58">{l4}</text>
        <text x="234" y="98">{l5}</text>
      </g>
    </svg>
  )
}

/** FIG. 08 — ARQUITECTURA MODULAR */
function PlatformFig({ labels, visible }: VariantProps) {
  // DRAFT VISUAL — iterated per service (PLAN 2.2)
  // Ambre-ringed PLATAFORMA core with five satellite modules connected by solid strokes
  const [l0 = 'PLATAFORMA', l1 = 'USUARIOS · ROLES', l2 = 'DOMINIO', l3 = 'CORREO', l4 = 'DOCUMENTOS', l5 = 'FACTURACIÓN'] = labels
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="service-fig__svg">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <circle cx="160" cy="75" r="24" stroke="var(--ambre)" />
        <rect x="120" y="16" width="80" height="16" />
        <rect x="18" y="46" width="64" height="16" />
        <rect x="238" y="46" width="64" height="16" />
        <rect x="18" y="100" width="64" height="16" />
        <rect x="238" y="100" width="64" height="16" />
        <path d="M160 51 L160 32" />
        <path d="M140 66 L82 54" />
        <path d="M180 66 L238 54" />
        <path d="M140 86 L82 108" />
        <path d="M180 86 L238 108" />
      </g>
      {visible && (
        <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M160 51 L160 32" />
        </circle>
      )}
      <text x="160" y="79" textAnchor="middle" className="service-fig__label">{l0}</text>
      <g className="service-fig__label">
        <text x="126" y="27">{l1}</text>
        <text x="22" y="57">{l2}</text>
        <text x="242" y="57">{l3}</text>
        <text x="22" y="111">{l4}</text>
        <text x="242" y="111">{l5}</text>
      </g>
    </svg>
  )
}

/** FIG. 09 — IA EN EL PROCESO */
function AiFig({ labels, visible }: VariantProps) {
  // DRAFT VISUAL — iterated per service (PLAN 2.2)
  // Horizontal process line (ENTRADA → PROCESO → DECISIÓN) + ambre IA node above via dashed connector
  const [l0 = 'ENTRADA', l1 = 'PROCESO', l2 = 'DECISIÓN', l3 = 'IA', l4 = 'DONDE APORTA'] = labels
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="service-fig__svg">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <line x1="24" y1="95" x2="296" y2="95" />
        <rect x="24" y="86" width="42" height="18" />
        <rect x="120" y="86" width="42" height="18" />
        <rect x="230" y="86" width="42" height="18" />
        <circle cx="141" cy="45" r="16" stroke="var(--ambre)" />
        <path d="M141 61 L141 86" stroke="var(--ambre)" strokeDasharray="3 3" />
      </g>
      <circle cx="141" cy="95" r="3.5" fill="var(--ambre)" />
      {visible && (
        <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M24 95 L296 95" />
        </circle>
      )}
      <text x="141" y="49" textAnchor="middle" className="service-fig__label">{l3}</text>
      <g className="service-fig__label">
        <text x="28" y="98">{l0}</text>
        <text x="123" y="98">{l1}</text>
        <text x="236" y="98">{l2}</text>
        <text x="108" y="30" fill="var(--ambre-dk)">{l4}</text>
      </g>
    </svg>
  )
}

/** FIG. 10 — DIRECCIÓN DE PRODUCTO */
function ProductFig({ labels, visible }: VariantProps) {
  // DRAFT VISUAL — iterated per service (PLAN 2.2)
  // Baseline with ascending bars; one bar highlighted in ambre with PRIORIDAD marker
  const [l0 = 'AHORA', l1 = 'SIGUIENTE', l2 = 'DESPUÉS', l3 = 'PRIORIDAD'] = labels
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="service-fig__svg">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <line x1="24" y1="120" x2="296" y2="120" />
        <line x1="60" y1="114" x2="60" y2="126" />
        <line x1="120" y1="114" x2="120" y2="126" />
        <line x1="180" y1="114" x2="180" y2="126" />
        <line x1="240" y1="114" x2="240" y2="126" />
        <rect x="48" y="96" width="24" height="18" />
        <rect x="108" y="78" width="24" height="36" />
        <rect x="168" y="52" width="24" height="62" stroke="var(--ambre)" />
        <rect x="228" y="88" width="24" height="26" />
      </g>
      <circle cx="180" cy="44" r="3.5" fill="var(--ambre)" />
      {visible && (
        <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M180 114 L180 52" />
        </circle>
      )}
      <g className="service-fig__label">
        <text x="150" y="38" fill="var(--ambre-dk)">{l3}</text>
        <text x="44" y="139">{l0}</text>
        <text x="100" y="139">{l1}</text>
        <text x="230" y="139">{l2}</text>
      </g>
    </svg>
  )
}

/** FIG. 11 — EVOLUCIÓN CONTINUA */
function EvolveFig({ labels, visible }: VariantProps) {
  // DRAFT VISUAL — iterated per service (PLAN 2.2)
  // Closed loop (USO → FEEDBACK → MEJORA) with ambre progress arc — echoes PhaseCycle ring language
  const [l0 = 'USO', l1 = 'FEEDBACK', l2 = 'MEJORA'] = labels
  return (
    <svg viewBox="0 0 320 150" aria-hidden="true" className="service-fig__svg">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        <circle cx="160" cy="75" r="46" />
        <circle cx="160" cy="29" r="8" stroke="var(--ambre)" />
        <circle cx="200" cy="98" r="8" />
        <circle cx="120" cy="98" r="8" />
      </g>
      <path
        d="M160 29 A46 46 0 0 1 200 98"
        fill="none"
        stroke="var(--ambre)"
        strokeWidth="2.5"
      />
      {visible && (
        <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M160 29 A46 46 0 0 1 200 98 A46 46 0 0 1 120 98 A46 46 0 0 1 160 29"
          />
        </circle>
      )}
      <g className="service-fig__label" textAnchor="middle">
        <text x="160" y="17">{l0}</text>
        <text x="228" y="102">{l1}</text>
        <text x="92" y="102">{l2}</text>
      </g>
    </svg>
  )
}

// Variant map — keyed by variant name. Only the matching entry is called. AC-5.
const VARIANT_RENDERERS: Record<ServiceFigVariant, (props: VariantProps) => React.ReactElement> = {
  capture: CaptureFig,
  platform: PlatformFig,
  ai: AiFig,
  product: ProductFig,
  evolve: EvolveFig,
}

// ─────────────────────────────────────────────────────────────────────────────
// ServiceFig — public component
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceFig({ variant, labels, caption }: ServiceFigProps) {
  const figRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = figRef.current
    if (!el) return
    // Reduced-motion: skip observer; visible stays false → no animateMotion elements rendered.
    // All static SVG nodes/labels are always in the DOM regardless of `visible`. FR-4.4.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const VariantRenderer = VARIANT_RENDERERS[variant]

  return (
    <figure ref={figRef} className="service-fig" aria-label={caption} role="img">
      {/* Accessible text summary for screen readers */}
      <figcaption className="sr-only">{caption}</figcaption>

      <VariantRenderer labels={labels} visible={visible} />

      {/* Visible kit-grammar caption (not sr-only — intentionally shown) */}
      <p className="service-fig__caption" aria-hidden="true">{caption}</p>
    </figure>
  )
}
