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
import {
  SERVICE_FIG_AI_CONNECTOR_PULSE_DUR_S,
  SERVICE_FIG_AI_FLOW_PULSE_DUR_S,
  SERVICE_FIG_EVOLVE_ARC_DUR_S,
  SERVICE_FIG_LEGACY_OFFSET_X,
  SERVICE_FIG_LEGACY_OFFSET_Y,
  SERVICE_FIG_PLATFORM_PULSE_DUR_S,
  SERVICE_FIG_PLATFORM_PULSE_STAGGER_S,
  SERVICE_FIG_VIEWBOX_H,
  SERVICE_FIG_VIEWBOX_W,
} from '@/lib/motion-constants'

/** Shared viewBox string for all five variants (SPEC-POLISH-05 canvas normalisation). */
const SHARED_VIEWBOX = `0 0 ${SERVICE_FIG_VIEWBOX_W} ${SERVICE_FIG_VIEWBOX_H}`

/** Wraps legacy (FIG.07/FIG.10) geometry — untouched coordinates — centered on the
 *  shared 340×180 canvas via a single translate. No coordinate in the wrapped
 *  markup changes; this only normalises the canvas so all five figures render
 *  at equal height in the 320px column (SPEC-POLISH-05 AC-5). */
function LegacyCanvas({ children }: { children: React.ReactNode }) {
  return (
    <g transform={`translate(${SERVICE_FIG_LEGACY_OFFSET_X} ${SERVICE_FIG_LEGACY_OFFSET_Y})`}>
      {children}
    </g>
  )
}

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
    <svg viewBox={SHARED_VIEWBOX} aria-hidden="true" className="service-fig__svg">
      {/* Canvas normalised to the shared 340×180 grid (SPEC-POLISH-05) — geometry below is untouched */}
      <LegacyCanvas>
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
      </LegacyCanvas>
    </svg>
  )
}

// ── FIG.08 geometry — core + five modules (SPEC-POLISH-05) ────────────────────
// Module boxes are sized to fit their longest label at 8.5px mono; connector
// endpoints on the core side are computed from the core center/radius so every
// line meets the ring border exactly (AC-2) — never short, never crossing in.

/** Core PLATAFORMA circle: center + radius, on the shared 340×180 canvas. */
const PLATFORM_CORE = { cx: 170, cy: 95, r: 30 }

/** Module box definitions: [x, y, width, height] — sized to their label text. */
const PLATFORM_MODULE_BOXES = [
  { x: 118, y: 10, w: 104, h: 22 }, // 0: USUARIOS · ROLES (top)
  { x: 8, y: 58, w: 74, h: 22 }, // 1: DOMINIO (left-top)
  { x: 258, y: 58, w: 74, h: 22 }, // 2: CORREO (right-top)
  { x: 2, y: 120, w: 92, h: 22 }, // 3: DOCUMENTOS (left-bottom)
  { x: 246, y: 120, w: 92, h: 22 }, // 4: FACTURACIÓN (right-bottom)
] as const

/** Point on each module's edge the connector starts from (module-facing side). */
const PLATFORM_MODULE_ANCHORS = [
  { x: 170, y: 32 }, // 0: bottom-center of top box
  { x: 82, y: 69 }, // 1: right edge of left-top box
  { x: 258, y: 69 }, // 2: left edge of right-top box
  { x: 94, y: 131 }, // 3: right edge of left-bottom box
  { x: 246, y: 131 }, // 4: left edge of right-bottom box
] as const

/** Computes the point on the core ring closest to `anchor` — the exact border
 *  intersection of the line from the core center through the module anchor. */
function pointOnCoreBorder(anchor: { x: number; y: number }) {
  const { cx, cy, r } = PLATFORM_CORE
  const vx = anchor.x - cx
  const vy = anchor.y - cy
  const dist = Math.hypot(vx, vy) || 1
  return { x: cx + (r * vx) / dist, y: cy + (r * vy) / dist }
}

/** Full connector paths: module edge → core border, computed once at module scope. */
const PLATFORM_CONNECTORS = PLATFORM_MODULE_ANCHORS.map((anchor) => {
  const end = pointOnCoreBorder(anchor)
  return `M${anchor.x} ${anchor.y} L${end.x.toFixed(2)} ${end.y.toFixed(2)}`
})

/** FIG. 08 — ARQUITECTURA MODULAR */
function PlatformFig({ labels, visible }: VariantProps) {
  // Ambre-ringed PLATAFORMA core with five satellite modules connected by solid
  // strokes that terminate exactly on the core border (AC-2, SPEC-POLISH-05).
  const [l0 = 'PLATAFORMA', l1 = 'USUARIOS · ROLES', l2 = 'DOMINIO', l3 = 'CORREO', l4 = 'DOCUMENTOS', l5 = 'FACTURACIÓN'] = labels
  const moduleLabels = [l1, l2, l3, l4, l5]
  return (
    <svg viewBox={SHARED_VIEWBOX} aria-hidden="true" className="service-fig__svg">
      {/* Module boxes — sized to their text, label centered inside */}
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
        {PLATFORM_MODULE_BOXES.map((box, i) => (
          <rect key={i} x={box.x} y={box.y} width={box.w} height={box.h} />
        ))}
      </g>
      {/* Connectors: module edge → core border (computed, AC-2) */}
      <g stroke="var(--ink)" strokeWidth="1.3" fill="none">
        {PLATFORM_CONNECTORS.map((d, i) => (
          <path key={i} className="service-fig__connector" d={d} />
        ))}
      </g>
      {/* Core circle drawn after connectors so its border reads clean */}
      <circle
        cx={PLATFORM_CORE.cx}
        cy={PLATFORM_CORE.cy}
        r={PLATFORM_CORE.r}
        fill="var(--paper)"
        stroke="var(--ambre)"
        strokeWidth="1.6"
      />
      {visible && (
        <>
          {PLATFORM_CONNECTORS.map((d, i) => (
            <circle key={i} r="3" fill="var(--ambre)" className="service-fig__pulse">
              <animateMotion
                dur={`${SERVICE_FIG_PLATFORM_PULSE_DUR_S}s`}
                begin={`${i * SERVICE_FIG_PLATFORM_PULSE_STAGGER_S}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}
        </>
      )}
      <text
        x={PLATFORM_CORE.cx}
        y={PLATFORM_CORE.cy + 3}
        textAnchor="middle"
        className="service-fig__label"
      >
        {l0}
      </text>
      <g className="service-fig__label" textAnchor="middle">
        {PLATFORM_MODULE_BOXES.map((box, i) => (
          <text key={i} x={box.x + box.w / 2} y={box.y + box.h / 2 + 3}>
            {moduleLabels[i]}
          </text>
        ))}
      </g>
    </svg>
  )
}

// ── FIG.09 geometry — process line + IA insertion node (SPEC-POLISH-05) ────────
// The flow line is split into two edge-to-edge segments so it never crosses a
// box's text; boxes get an opaque fill as a second line of defense (AC-3).

/** Process boxes: [x, y, width, height] — ENTRADA · PROCESO · DECISIÓN. */
const AI_PROCESS_BOXES = [
  { x: 14, y: 108, w: 72, h: 26 },
  { x: 134, y: 108, w: 72, h: 26 },
  { x: 254, y: 108, w: 72, h: 26 },
] as const

/** Flow segments between adjacent box edges (never over a box). */
const AI_FLOW_SEGMENTS = [
  'M86 121 L134 121',
  'M206 121 L254 121',
] as const

/** IA node center + radius; the PROCESO box (index 1) top edge y-coordinate. */
const AI_NODE = { cx: 170, cy: 46, r: 16 }
const AI_PROCESO_TOP_Y = AI_PROCESS_BOXES[1].y

/** FIG. 09 — IA EN EL PROCESO */
function AiFig({ labels, visible }: VariantProps) {
  // Horizontal process line (ENTRADA → PROCESO → DECISIÓN), edges only, never
  // crossing box text; IA node above with "DONDE APORTA" off the diagram (AC-3).
  const [l0 = 'ENTRADA', l1 = 'PROCESO', l2 = 'DECISIÓN', l3 = 'IA', l4 = 'DONDE APORTA'] = labels
  const boxLabels = [l0, l1, l2]
  return (
    <svg viewBox={SHARED_VIEWBOX} aria-hidden="true" className="service-fig__svg">
      {/* Flow line — edge-to-edge segments only, drawn behind the boxes */}
      <g stroke="var(--ink)" strokeWidth="1.4" fill="none">
        {AI_FLOW_SEGMENTS.map((d, i) => (
          <path key={i} className="service-fig__connector" d={d} />
        ))}
      </g>
      {/* Process boxes — opaque fill so the line reads as passing behind them */}
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5">
        {AI_PROCESS_BOXES.map((box, i) => (
          <rect key={i} x={box.x} y={box.y} width={box.w} height={box.h} />
        ))}
      </g>
      {/* Dashed IA connector — drops to the PROCESO box top edge, not through it */}
      <path
        d={`M${AI_NODE.cx} ${AI_NODE.cy + AI_NODE.r} L${AI_NODE.cx} ${AI_PROCESO_TOP_Y}`}
        stroke="var(--ambre)"
        strokeWidth="1.3"
        strokeDasharray="3 3"
        fill="none"
      />
      <circle cx={AI_NODE.cx} cy={AI_NODE.cy} r={AI_NODE.r} fill="var(--paper)" stroke="var(--ambre)" strokeWidth="1.5" />
      {visible && (
        <>
          {AI_FLOW_SEGMENTS.map((d, i) => (
            <circle key={i} r="3" fill="var(--ambre)" className="service-fig__pulse">
              <animateMotion
                dur={`${SERVICE_FIG_AI_FLOW_PULSE_DUR_S}s`}
                begin={`${i * SERVICE_FIG_AI_FLOW_PULSE_DUR_S}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          ))}
          <circle r="3" fill="var(--ambre)" className="service-fig__pulse">
            <animateMotion
              dur={`${SERVICE_FIG_AI_CONNECTOR_PULSE_DUR_S}s`}
              repeatCount="indefinite"
              path={`M${AI_NODE.cx} ${AI_NODE.cy + AI_NODE.r} L${AI_NODE.cx} ${AI_PROCESO_TOP_Y}`}
            />
          </circle>
        </>
      )}
      <text x={AI_NODE.cx} y={AI_NODE.cy + 3} textAnchor="middle" className="service-fig__label">{l3}</text>
      {/* "DONDE APORTA" above the IA node, off the diagram — never overlaps the process line (AC-3) */}
      <text x={AI_NODE.cx} y={AI_NODE.cy - AI_NODE.r - 8} textAnchor="middle" fill="var(--ambre-dk)" className="service-fig__label">{l4}</text>
      <g className="service-fig__label" textAnchor="middle">
        {AI_PROCESS_BOXES.map((box, i) => (
          <text key={i} x={box.x + box.w / 2} y={box.y + box.h / 2 + 3}>
            {boxLabels[i]}
          </text>
        ))}
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
    <svg viewBox={SHARED_VIEWBOX} aria-hidden="true" className="service-fig__svg">
      {/* Canvas normalised to the shared 340×180 grid (SPEC-POLISH-05) — geometry below is untouched */}
      <LegacyCanvas>
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
      </LegacyCanvas>
    </svg>
  )
}

// ── FIG.11 geometry — closed loop with full-circle progress arc (SPEC-POLISH-05) ──
// Draw order matters here: circle stroke FIRST, then the three nodes LAST with an
// opaque fill so the circle behind each node is hidden (AC-4).

const EVOLVE_CIRCLE = { cx: 170, cy: 92, r: 52 }
const EVOLVE_NODES = [
  { cx: 170, cy: 40 }, // USO (top)
  { cx: 214, cy: 118 }, // FEEDBACK (bottom-right)
  { cx: 126, cy: 118 }, // MEJORA (bottom-left)
] as const
const EVOLVE_NODE_R = 9

/** Full circle traced via two semicircle arcs (a single arc command cannot
 *  express a 360° sweep back to its own start point). */
const EVOLVE_ARC_PATH = `M${EVOLVE_CIRCLE.cx} ${EVOLVE_CIRCLE.cy - EVOLVE_CIRCLE.r} A${EVOLVE_CIRCLE.r} ${EVOLVE_CIRCLE.r} 0 1 1 ${EVOLVE_CIRCLE.cx} ${EVOLVE_CIRCLE.cy + EVOLVE_CIRCLE.r} A${EVOLVE_CIRCLE.r} ${EVOLVE_CIRCLE.r} 0 1 1 ${EVOLVE_CIRCLE.cx} ${EVOLVE_CIRCLE.cy - EVOLVE_CIRCLE.r}`

/** Arc circumference — the dash length driving the full-loop animation. */
const EVOLVE_ARC_LENGTH = 2 * Math.PI * EVOLVE_CIRCLE.r

/** FIG. 11 — EVOLUCIÓN CONTINUA */
function EvolveFig({ labels, visible }: VariantProps) {
  // Closed loop (USO → FEEDBACK → MEJORA); the ambre arc traces the FULL circle
  // continuously (not a quarter) — echoes PhaseCycle ring language (AC-6).
  const [l0 = 'USO', l1 = 'FEEDBACK', l2 = 'MEJORA'] = labels
  const nodeLabels = [l0, l1, l2]
  return (
    <svg viewBox={SHARED_VIEWBOX} aria-hidden="true" className="service-fig__svg">
      {/* 1) circle stroke drawn first (underneath) */}
      <circle
        cx={EVOLVE_CIRCLE.cx}
        cy={EVOLVE_CIRCLE.cy}
        r={EVOLVE_CIRCLE.r}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      {/* Ambre progress arc — full circle, looping when visible; complete+static otherwise */}
      <path
        d={EVOLVE_ARC_PATH}
        fill="none"
        stroke="var(--ambre)"
        strokeWidth="2.5"
        strokeDasharray={visible ? EVOLVE_ARC_LENGTH : undefined}
      >
        {visible && (
          <animate
            attributeName="stroke-dashoffset"
            values={`${EVOLVE_ARC_LENGTH};0`}
            dur={`${SERVICE_FIG_EVOLVE_ARC_DUR_S}s`}
            repeatCount="indefinite"
          />
        )}
      </path>
      {/* 2) nodes drawn LAST, on top, with opaque fill — hides the circle stroke behind them (AC-4) */}
      <g stroke="var(--ink)" strokeWidth="1.4">
        {EVOLVE_NODES.map((node, i) => (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r={EVOLVE_NODE_R}
            fill="var(--paper)"
            stroke={i === 0 ? 'var(--ambre)' : 'var(--ink)'}
          />
        ))}
      </g>
      {/* Labels stay outside the nodes, non-overlapping */}
      <text x={EVOLVE_NODES[0].cx} y={EVOLVE_NODES[0].cy - EVOLVE_NODE_R - 6} textAnchor="middle" className="service-fig__label">{nodeLabels[0]}</text>
      <text x={EVOLVE_NODES[1].cx + EVOLVE_NODE_R + 4} y={EVOLVE_NODES[1].cy + 3} textAnchor="start" className="service-fig__label">{nodeLabels[1]}</text>
      <text x={EVOLVE_NODES[2].cx - EVOLVE_NODE_R - 4} y={EVOLVE_NODES[2].cy + 3} textAnchor="end" className="service-fig__label">{nodeLabels[2]}</text>
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
