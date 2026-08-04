/**
 * PageHeader — reusable header for interior pages.
 * Composition: eyebrow top-left, asymmetric title (cols 1–7), lead ≤60ch.
 * No new visual language — applies approved identity tokens only.
 * Spec: SPEC-P1 FR-6.1
 */

export type PageHeaderSurface = 'paper' | 'abisal'

export interface PageHeaderProps {
  /** Short mono eyebrow label (e.g. "01 / CAPACIDADES" or "CÓMO TRABAJAMOS") */
  eyebrow: string
  /** Page H1 — rendered at --text-display-lg */
  title: string
  /** Optional lead paragraph — max 60ch recommended */
  lead?: string
  /** Surface colour: 'paper' (light) or 'abisal' (dark) */
  surface: PageHeaderSurface
}

export function PageHeader({ eyebrow, title, lead, surface }: PageHeaderProps) {
  const isDark = surface === 'abisal'

  return (
    <header
      className={`page-header${isDark ? ' dark-surface' : ''}`}
    >
      <div className="page-shell page-header__inner">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
        {lead && <p className="page-header__lead">{lead}</p>}
      </div>
    </header>
  )
}
