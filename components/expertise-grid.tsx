'use client'

/**
 * ExpertiseGrid — D · La experiencia detrás de Escala (abisal surface).
 *
 * 3×2 grid of 6 discipline areas, each with a mono label, Archivo title,
 * body copy, and a bottom MicroFig in kit grammar. Uses GridBackground.
 *
 * Anonymization rule (Libro Ch. 19): no former-employer names anywhere.
 * MIT certification is allowed (it is Escala's own, not an employer's).
 *
 * MicroFigs are static SVGs (80×30) revealed once when the section enters
 * the viewport via DiagramReveal wrapper. Reduced-motion: static.
 *
 * Spec: SPEC-P2.5 FR-5
 */

import { DiagramReveal } from '@/components/motion-runtime'
import { GridBackground } from '@/components/grid-background'
import type { ExpertiseFigVariant } from '@/content/types'

// ─── Micro-fig renderers (one per ExpertiseFigVariant) ───────────────────────
// Each is 80×30, uses only --paper (paper colour) strokes + single --ambre accent.
// Motif per spec FR-5.4 and wireframe.

function MicroFigFullstack() {
  // Blocks pipeline: three rects connected by lines, ambre dot at end
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <rect x="2" y="8" width="14" height="14" />
        <rect x="24" y="8" width="14" height="14" />
        <rect x="46" y="8" width="14" height="14" />
        <line x1="16" y1="15" x2="24" y2="15" />
        <line x1="38" y1="15" x2="46" y2="15" />
        <line x1="60" y1="15" x2="68" y2="15" />
      </g>
      <circle cx="71" cy="15" r="3" fill="var(--ambre)" />
    </svg>
  )
}

function MicroFigHub() {
  // Hub topology: centre circle with 4 radiating spokes
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <circle cx="40" cy="15" r="7" />
        <line x1="40" y1="8" x2="40" y2="2" />
        <line x1="46" y1="12" x2="60" y2="6" />
        <line x1="46" y1="18" x2="60" y2="24" />
        <line x1="34" y1="12" x2="20" y2="6" />
        <line x1="34" y1="18" x2="20" y2="24" />
      </g>
      <circle cx="40" cy="15" r="3" fill="var(--ambre)" />
    </svg>
  )
}

function MicroFigBars() {
  // Prioritized bars: vertical bars on a baseline, one ambre-highlighted
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <line x1="4" y1="26" x2="76" y2="26" />
        <rect x="10" y="16" width="8" height="10" />
        <rect x="28" y="10" width="8" height="16" />
        <rect x="64" y="14" width="8" height="12" />
      </g>
      {/* Middle bar highlighted ambre — the prioritized item */}
      <rect x="46" y="4" width="8" height="22" stroke="var(--ambre)" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

function MicroFigNodes() {
  // Connected nodes: three circles linked by lines
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <circle cx="15" cy="15" r="5" />
        <circle cx="40" cy="15" r="5" />
        <circle cx="65" cy="15" r="5" />
        <line x1="20" y1="15" x2="35" y2="15" />
        <line x1="45" y1="15" x2="60" y2="15" />
      </g>
      <circle cx="40" cy="15" r="3" fill="var(--ambre)" />
    </svg>
  )
}

function MicroFigSignal() {
  // Signal line: horizontal line with a single peak, ambre peak dot
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <path d="M6 15 L26 15 L32 8 L44 22 L50 15 L74 15" />
      </g>
      <circle cx="32" cy="8" r="2.5" fill="var(--ambre)" />
    </svg>
  )
}

function MicroFigInsertion() {
  // AI insertion node: baseline with descending ambre node
  return (
    <svg
      viewBox="0 0 80 30"
      width="80"
      height="30"
      aria-hidden="true"
      className="expertise-grid__fig-svg"
    >
      <g stroke="var(--paper)" strokeWidth="1.2" fill="none" opacity="0.75">
        <line x1="8" y1="22" x2="72" y2="22" />
      </g>
      <circle cx="40" cy="9" r="6" stroke="var(--ambre)" strokeWidth="1.2" fill="none" />
      <line
        x1="40"
        y1="15"
        x2="40"
        y2="22"
        stroke="var(--ambre)"
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

const MICRO_FIGS: Record<ExpertiseFigVariant, () => React.ReactElement> = {
  fullstack: MicroFigFullstack,
  hub: MicroFigHub,
  bars: MicroFigBars,
  nodes: MicroFigNodes,
  signal: MicroFigSignal,
  insertion: MicroFigInsertion,
}

// ─── ExpertiseArea cell ───────────────────────────────────────────────────────

interface ExpertiseAreaProps {
  index: string
  title: string
  body: string
  figVariant: ExpertiseFigVariant
}

function ExpertiseArea({ index, title, body, figVariant }: ExpertiseAreaProps) {
  const Fig = MICRO_FIGS[figVariant]
  return (
    <div className="expertise-grid__area">
      <p className="expertise-grid__area-label">{`ÁREA · ${index}`}</p>
      <h3 className="expertise-grid__area-title">{title}</h3>
      <p className="expertise-grid__area-body">{body}</p>
      <div className="expertise-grid__area-fig">
        <DiagramReveal>
          <Fig />
        </DiagramReveal>
      </div>
    </div>
  )
}

// ─── ExpertiseGrid ────────────────────────────────────────────────────────────

export interface ExpertiseGridArea {
  index: string
  title: string
  body: string
  figVariant: ExpertiseFigVariant
}

export interface ExpertiseGridProps {
  /** Section eyebrow: "D / LA EXPERIENCIA DETRÁS DE ESCALA" */
  sectionEyebrow: string
  /** H2 heading */
  heading: string
  /** Lead paragraph (Libro Ch. 4, anonymized) */
  lead: string
  /** Exactly 6 areas */
  areas: ReadonlyArray<ExpertiseAreaProps>
  /** Tone-shift divider text: "— — — DE LA IDENTIDAD A LA EXPERIENCIA — — —" */
  divider: string
}

export function ExpertiseGrid({
  sectionEyebrow,
  heading,
  lead,
  areas,
  divider,
}: ExpertiseGridProps) {
  return (
    <section className="expertise-section dark-surface">
      <GridBackground />
      <div className="page-shell expertise-section__inner">
        <p className="expertise-section__divider">{divider}</p>
        <p className="expertise-section__eyebrow">{sectionEyebrow}</p>
        <h2 className="expertise-section__heading">{heading}</h2>
        <p className="expertise-section__lead">{lead}</p>
        <div className="expertise-grid">
          {areas.map((area) => (
            <ExpertiseArea key={area.index} {...area} />
          ))}
        </div>
      </div>
    </section>
  )
}
