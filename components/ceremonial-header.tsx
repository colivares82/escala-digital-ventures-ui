/**
 * CeremonialHeader — A · ceremonial brand-document header for /sobre-escala.
 *
 * Deliberately NOT the standard PageHeader — this page presents as a brand/identity
 * document. Oversized H1 (clamp(3rem,7vw,6rem)), mono kicker, generous vertical padding.
 *
 * This is the single H1 for the /sobre-escala page (AC-3: exactly one H1).
 * All copy comes from props (content/es/about.ts) — zero literals.
 * Spec: SPEC-P2.5 FR-2
 */

export interface CeremonialHeaderProps {
  /** Mono kicker: "A · SOBRE ESCALA · ESTUDIO DE PRODUCTO Y TECNOLOGÍA" */
  kicker: string
  /** Page H1 — oversized Archivo, clamp(3rem,7vw,6rem). Only H1 on the page. */
  h1: string
  /** Sub-paragraph ~22px, ≤60ch */
  sub: string
}

export function CeremonialHeader({ kicker, h1, sub }: CeremonialHeaderProps) {
  return (
    <header className="ceremonial-header">
      <div className="page-shell ceremonial-header__inner">
        <p className="ceremonial-header__kicker">{kicker}</p>
        <h1 className="ceremonial-header__h1">{h1}</h1>
        <p className="ceremonial-header__sub">{sub}</p>
      </div>
    </header>
  )
}
