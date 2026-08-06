/**
 * aboutContent — content integrity and spec compliance tests.
 * Spec: SPEC-P2.5 FR-9 / AC-4 / AC-7 / AC-8
 */

import { describe, it, expect } from 'vitest'
import { aboutContent } from '@/content/es/about'
import { sharedContent } from '@/content/es/shared'
import type { ExpertiseFigVariant } from '@/content/types'

describe('aboutContent — SPEC-P2.5', () => {
  // ── Meta ──────────────────────────────────────────────────────────────────

  it('has valid meta title', () => {
    expect(aboutContent.meta.title).toBeTruthy()
  })

  it('meta title is ≤60 characters', () => {
    expect(aboutContent.meta.title.length).toBeLessThanOrEqual(60)
  })

  it('meta description is ≤155 characters', () => {
    expect(aboutContent.meta.description.length).toBeLessThanOrEqual(155)
  })

  // ── Ceremonial ────────────────────────────────────────────────────────────

  it('has ceremonial H1 — "Construimos capacidades" (Libro Ch. 17)', () => {
    expect(aboutContent.ceremonial.h1).toContain('Construimos capacidades')
  })

  it('has ceremonial kicker mentioning "SOBRE ESCALA"', () => {
    expect(aboutContent.ceremonial.kicker).toContain('SOBRE ESCALA')
  })

  it('ceremonial sub mentions Mataró (company location)', () => {
    expect(aboutContent.ceremonial.sub).toContain('Mataró')
  })

  // ── DNA ───────────────────────────────────────────────────────────────────

  it('has DNA section eyebrow', () => {
    expect(aboutContent.dna.sectionEyebrow).toBeTruthy()
  })

  it('has ten-year pull-quote (Libro Ch. 1)', () => {
    expect(aboutContent.dna.quote).toContain('diez años')
  })

  it('mission mentions "alianzas de crecimiento" (Libro Ch. 1 verbatim)', () => {
    expect(aboutContent.dna.mission).toContain('alianzas de crecimiento')
  })

  it('vision mentions "departamento externo" (Libro Ch. 1 verbatim)', () => {
    expect(aboutContent.dna.vision).toContain('departamento externo')
  })

  // ── Values ────────────────────────────────────────────────────────────────

  it('has exactly 5 values (SPEC-P2.5 FR-4.2)', () => {
    expect(aboutContent.values.items).toHaveLength(5)
  })

  it('values are indexed 01–05', () => {
    const ns = aboutContent.values.items.map((v) => v.n)
    expect(ns).toEqual(['01', '02', '03', '04', '05'])
  })

  it('every value has n, title, and body', () => {
    aboutContent.values.items.forEach((v) => {
      expect(v.n).toBeTruthy()
      expect(v.title).toBeTruthy()
      expect(v.body).toBeTruthy()
    })
  })

  it('first value is "Compromiso de socio"', () => {
    expect(aboutContent.values.items[0]!.title).toBe('Compromiso de socio')
  })

  // ── Expertise areas ───────────────────────────────────────────────────────

  it('has exactly 6 expertise areas (SPEC-P2.5 FR-5.3)', () => {
    expect(aboutContent.expertise.areas).toHaveLength(6)
  })

  it('areas are indexed 01–06', () => {
    const indices = aboutContent.expertise.areas.map((a) => a.index)
    expect(indices).toEqual(['01', '02', '03', '04', '05', '06'])
  })

  it('every area has index, title, body, and figVariant', () => {
    aboutContent.expertise.areas.forEach((area) => {
      expect(area.index).toBeTruthy()
      expect(area.title).toBeTruthy()
      expect(area.body).toBeTruthy()
      expect(area.figVariant).toBeTruthy()
    })
  })

  const VALID_FIG_VARIANTS: ExpertiseFigVariant[] = [
    'fullstack', 'hub', 'bars', 'nodes', 'signal', 'insertion',
  ]

  it('every area has a valid ExpertiseFigVariant', () => {
    aboutContent.expertise.areas.forEach((area) => {
      expect(VALID_FIG_VARIANTS).toContain(area.figVariant)
    })
  })

  it('all 6 figVariants are unique', () => {
    const variants = aboutContent.expertise.areas.map((a) => a.figVariant)
    const unique = new Set(variants)
    expect(unique.size).toBe(6)
  })

  // Anonymization guard (Libro Ch. 19) — AC-4
  it('expertise lead uses anonymized formula (no employer names) — AC-4', () => {
    const allText = JSON.stringify(aboutContent.expertise)
    expect(allText).not.toMatch(/Microsoft|Google|Amazon|Oracle|SAP|IBM/i)
    expect(allText).toContain('plataformas de software empresarial de alcance global')
  })

  it('MIT certification may be named (it is allowed per Ch. 19)', () => {
    const aiArea = aboutContent.expertise.areas.find((a) => a.figVariant === 'insertion')
    expect(aiArea?.body).toContain('MIT')
  })

  // ── Manifesto ─────────────────────────────────────────────────────────────

  it('has exactly 10 beliefs (SPEC-P2.5 FR-7.2)', () => {
    expect(aboutContent.manifesto.beliefs).toHaveLength(10)
  })

  it('every belief is a non-empty string', () => {
    aboutContent.manifesto.beliefs.forEach((belief) => {
      expect(typeof belief).toBe('string')
      expect(belief.length).toBeGreaterThan(10)
    })
  })

  it('first belief mentions technology improving lives (Libro Ch. 3)', () => {
    expect(aboutContent.manifesto.beliefs[0]).toContain('tecnología')
  })

  it('second belief: software is strategic asset (Libro Ch. 3)', () => {
    expect(aboutContent.manifesto.beliefs[1]).toContain('activo estratégico')
  })

  it('manifesto lead is the mono caption', () => {
    expect(aboutContent.manifesto.lead).toContain('DIEZ CREENCIAS')
  })

  // ── colivares.com ─────────────────────────────────────────────────────────

  it('colivaresLine mentions "colivares.com" as plain text', () => {
    expect(aboutContent.colivaresLine).toContain('colivares.com')
    expect(aboutContent.colivaresLine).toContain('DIRECCIÓN GENERAL')
  })

  // ── FinalCTA ──────────────────────────────────────────────────────────────

  it('finalCta email matches expected domain', () => {
    expect(sharedContent.finalCta.email).toMatch(/@escaladigitalventures\.com$/)
  })

  it('finalCta has all required fields', () => {
    expect(sharedContent.finalCta.title).toBeTruthy()
    expect(sharedContent.finalCta.body).toBeTruthy()
    expect(sharedContent.finalCta.location).toBeTruthy()
    expect(sharedContent.finalCta.languages).toBeTruthy()
  })

  // ── Ownership guard (SPEC-FIX-01) ─────────────────────────────────────────

  it('does not contain code-ownership wording (SPEC-FIX-01 guard) — AC-8', () => {
    const allText = JSON.stringify(aboutContent)
    expect(allText).not.toMatch(/propietari[oa] de (tu|su) código/i)
    expect(allText).not.toMatch(/propietari[oa] de tu plataforma, tu código/i)
  })

  // ── Russian guard ──────────────────────────────────────────────────────────

  it('contains no Russian language — AC-8', () => {
    const allText = JSON.stringify(aboutContent)
    expect(allText).not.toMatch(/ruso|rusa|русский|russian/i)
  })

  // ── Nav routing (AC-10) ────────────────────────────────────────────────────

  it('shared nav "Sobre Escala" points to /sobre-escala — AC-10', () => {
    const aboutNav = sharedContent.header.nav.find((n) => n.pageId === 'about')
    expect(aboutNav?.href).toBe('/sobre-escala')
  })
})
