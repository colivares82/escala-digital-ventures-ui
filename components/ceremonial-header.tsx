/**
 * CeremonialHeader — A · ceremonial brand-document header for /sobre-escala.
 *
 * Deliberately NOT the standard PageHeader — this page presents as a brand/identity
 * document. Oversized H1 (clamp(3rem,7vw,6rem)), mono kicker, generous vertical padding.
 *
 * This is the single H1 for the /sobre-escala page (AC-3: exactly one H1).
 * All copy comes from props (content/es/about.ts) — zero literals.
 * Spec: SPEC-P2.5 FR-2 · BRAND-01 Z4
 *
 * BRAND-01 Z4 adds the L01 seal to a right-hand column. The spec describes that
 * column as "already allocated and currently empty", but it did not exist: this
 * component was single-column. A two-column grid is therefore introduced here,
 * collapsing at the project's existing 767px breakpoint (NOT the wireframe's
 * 900px, which appears nowhere in globals.css). The kicker/H1/sub markup and
 * copy are unchanged.
 */

import Image from 'next/image'
import seal from '@/app/assets/escala-brand/logo-01-seal-ink.png'
import { BRAND_SEAL_HEIGHT_PX, BRAND_SEAL_WIDTH_PX } from '@/lib/brand-constants'

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
        <div className="ceremonial-header__text">
          <p className="ceremonial-header__kicker">{kicker}</p>
          <h1 className="ceremonial-header__h1">{h1}</h1>
          <p className="ceremonial-header__sub">{sub}</p>
        </div>

        {/*
          BRAND-01 Z4 — L01 seal, `ink` variant on this light `paper` surface.
          DECORATIVE (§6): it carries no information the surrounding copy does
          not already carry, so it takes an empty alt AND is hidden from
          assistive technology. Deliberately no descriptive alt text.
          Top-aligned to the body paragraph, not the H1 — see the CSS.
        */}
        <div className="ceremonial-header__seal" aria-hidden="true">
          <Image
            src={seal}
            alt=""
            width={BRAND_SEAL_WIDTH_PX}
            height={BRAND_SEAL_HEIGHT_PX}
            className="ceremonial-header__seal-img"
          />
        </div>
      </div>
    </header>
  )
}
