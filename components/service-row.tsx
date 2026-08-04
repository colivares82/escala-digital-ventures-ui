/**
 * ServiceRow — single service entry in the /que-hacemos list.
 * Three-column grid: index (64px) · text block · ServiceFig (320px).
 * Problem line uses --ambre-dk (AA on paper). Borders per wireframe.
 * Spec: SPEC-P2.2 FR-3
 */

import type React from 'react'

export interface ServiceRowProps {
  /** Zero-padded ordinal: "01"–"05" */
  index: string
  title: string
  /** Problem line text (without prefix). */
  problem: string
  /** Prefix for the problem line — from content dict (e.g. "EL PROBLEMA"). */
  problemPrefix: string
  deliverable: string
  /** Rendered ServiceFig element — parent passes the configured figure. */
  fig: React.ReactNode
  /** Adds bottom border on the last row. */
  isLast?: boolean
}

export function ServiceRow({
  index,
  title,
  problem,
  problemPrefix,
  deliverable,
  fig,
  isLast = false,
}: ServiceRowProps) {
  return (
    <article className={`service-row${isLast ? ' service-row--last' : ''}`}>
      {/* Left: mono index */}
      <span className="service-row__index" aria-hidden="true">
        {index}
      </span>

      {/* Centre: text block */}
      <div className="service-row__text">
        <h2 className="service-row__title">{title}</h2>
        {/* Problem line — mono, --ambre-dk. Prefix separated for i18n (FR-3.3). */}
        <p className="service-row__problem">
          <span className="service-row__problem-prefix">{problemPrefix} · </span>
          {problem}
        </p>
        <p className="service-row__deliverable">{deliverable}</p>
      </div>

      {/* Right: service figure — mobile stacks below text */}
      <div className="service-row__fig">{fig}</div>
    </article>
  )
}
