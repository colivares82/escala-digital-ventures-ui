/**
 * GridBackground — reusable abisal engineering-grid overlay.
 *
 * Renders two linear-gradient grid lines + an optional radial tonal gradient
 * as an absolutely-positioned, pointer-events-none layer behind section content.
 *
 * Usage: place as the first child of a `position: relative` abisal section.
 *
 * NOTE: Existing abisal sections (hero, framework, ideal-client, alliance-why,
 * alliance-planes) continue to use their hand-rolled CSS backgrounds. They are
 * functionally equivalent but differ in ellipse position. Migrating them is a
 * non-zero visual risk, so they are left as-is with a TODO comment until a
 * dedicated refactor is scheduled.
 * // TODO: migrate existing abisal sections to <GridBackground /> in a future pass.
 *
 * Decision: default lineOpacity 0.05 (matching every as-built section) rather
 * than the spec's suggested 0.045. Rationale in DECISIONS.md.
 *
 * Spec: SPEC-P2.5 FR-6
 */

export interface GridBackgroundProps {
  /** Grid cell size. Default '3rem' (48 px at base 16 px). */
  cellSize?: string
  /**
   * Grid line opacity — fractional (0–1).
   * Default 0.05 (matches all existing as-built abisal sections).
   * Spec suggestion was 0.045; kept at 0.05 for visual consistency. See DECISIONS.md.
   */
  lineOpacity?: number
  /**
   * Whether to render the radial tonal gradient behind the grid.
   * Default true. Set false if the section already has a background gradient.
   */
  radialGradient?: boolean
}

export function GridBackground({
  cellSize = '3rem',
  lineOpacity = 0.05,
  radialGradient = true,
}: GridBackgroundProps) {
  // Use CSS custom properties so the BEM class handles positioning;
  // inline styles carry the configurable props only.
  const style: React.CSSProperties & {
    '--gb-cell': string
    '--gb-opacity': number
  } = {
    '--gb-cell': cellSize,
    '--gb-opacity': lineOpacity,
  }

  return (
    <span
      aria-hidden="true"
      className={`grid-bg${radialGradient ? ' grid-bg--radial' : ''}`}
      style={style}
    />
  )
}
