/**
 * Readout — a single evidence cell in the ProofSection 2×3 grid.
 * SPEC-POLISH-03: redesigned for real Magupell data.
 *
 * Props:
 *   label      — mono eyebrow (e.g. "REQUISITOS")
 *   value      — the figure or phrase to display
 *   kind       — 'number' renders larger Archivo; 'phrase' renders slightly smaller
 *   caption    — body-font description (~15px, max 42ch)
 *   plotVariant — which decorative micro-plot to render (aria-hidden)
 *   index      — 0-based position (used for DAT.XX label)
 *
 * No CountUp animation — values are real, exact, and should not animate.
 * No source suffix — removed per wireframe (SPEC-POLISH-03 §3.2).
 * Colors from design tokens only; no hardcoded hex.
 */

/** Decorative SVG micro-plot paths per variant. All aria-hidden. */
const MICRO_PLOTS: Record<string, React.ReactNode> = {
  /** growth: ascending line (167→216 requisitos) */
  growth: (
    <>
      <polyline points="0,30 90,28 91,16 200,8" fill="none" strokeWidth="1.5" />
      <circle cx="200" cy="8" r="3" className="readout__plot-dot" />
    </>
  ),
  /** steps: steady ascending steps (1803 tests) */
  steps: (
    <>
      <polyline points="0,32 50,26 100,20 150,12 200,6" fill="none" strokeWidth="1.5" />
      <circle cx="200" cy="6" r="3" className="readout__plot-dot" />
    </>
  ),
  /** bars: three connected boxes (3 environments) */
  bars: (
    <g strokeWidth="1.5" fill="none">
      <rect x="16" y="12" width="34" height="14" />
      <rect x="83" y="12" width="34" height="14" />
      <rect x="150" y="12" width="34" height="14" />
      <line x1="50" y1="19" x2="83" y2="19" />
      <line x1="117" y1="19" x2="150" y2="19" />
    </g>
  ),
  /** stair: ascending stair (7 months) */
  stair: (
    <>
      <polyline points="0,32 40,32 40,24 90,24 90,16 140,16 140,8 200,8" fill="none" strokeWidth="1.5" />
      <circle cx="200" cy="8" r="3" className="readout__plot-dot" />
    </>
  ),
  /** impact: dashed then solid (manual→digital) */
  impact: (
    <g strokeWidth="1.5" fill="none">
      <path d="M4 30 C40 30 40 10 80 10" strokeDasharray="3 3" opacity=".5" />
      <path d="M80 10 L196 10" />
      <circle cx="196" cy="10" r="3" className="readout__plot-dot" />
    </g>
  ),
  /** roles: four circles (4 roles) */
  roles: (
    <g strokeWidth="1.5" fill="none">
      <circle cx="30" cy="19" r="6" />
      <circle cx="80" cy="19" r="6" />
      <circle cx="130" cy="19" r="6" />
      <circle cx="180" cy="19" r="6" />
    </g>
  ),
}

export function Readout({
  label,
  value,
  kind,
  caption,
  plotVariant,
  index,
}: {
  label: string
  value: string
  kind: 'number' | 'phrase'
  caption: string
  plotVariant: string
  index: number
}) {
  const plot = MICRO_PLOTS[plotVariant] ?? MICRO_PLOTS['growth']

  return (
    <div className="readout">
      {/* DAT.XX / LABEL — mono eyebrow */}
      <p className="readout__eyebrow">
        DAT.{String(index + 1).padStart(2, '0')} / {label}
      </p>

      {/* Decorative micro-plot — aria-hidden */}
      <svg
        className="readout__plot"
        viewBox="0 0 200 38"
        aria-hidden="true"
        focusable="false"
      >
        <g className="readout__plot-lines">{plot}</g>
      </svg>

      {/* Value — Archivo display, larger for number, slightly smaller for phrase */}
      <dd className={`readout__value readout__value--${kind}`}>
        {value}
      </dd>

      {/* Caption — body font ~15px, max 42ch */}
      <dt className="readout__caption">{caption}</dt>
    </div>
  )
}
