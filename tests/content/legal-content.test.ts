/**
 * Legal content tests — SPEC-P4 FR-7.1, §8.
 *
 * Verifies:
 * - /aviso-legal has exactly 5 sections with required IDs
 * - /privacidad has exactly 6 sections with required IDs
 * - Meta title/description length limits (≤60/≤155 chars)
 * - Privacy policy contains the no-tracking-cookies statement (AC-4)
 * - Privacy policy contains AEPD reference (AC-4)
 * - Placeholder detection: collectPlaceholders reports unresolved tokens (FR-4.2)
 * - No physical/street address in either dictionary (AC-8)
 */

import { describe, it, expect } from 'vitest'
import { legalContent } from '@/content/es/legal'
import { privacyContent } from '@/content/es/privacy'
import { collectPlaceholders } from '@/lib/placeholders'

// ---------------------------------------------------------------------------
// /aviso-legal
// ---------------------------------------------------------------------------
describe('legalContent — /aviso-legal (SPEC-P4 FR-2)', () => {
  it('has exactly 5 sections', () => {
    expect(legalContent.sections).toHaveLength(5)
  })

  it('sections have the required IDs in order', () => {
    const ids = legalContent.sections.map((s) => s.id)
    expect(ids).toEqual([
      'titular',
      'objeto',
      'propiedad-intelectual',
      'responsabilidad',
      'legislacion',
    ])
  })

  it('each section has index, name, title, and body', () => {
    for (const section of legalContent.sections) {
      expect(section.index).toBeTruthy()
      expect(section.name).toBeTruthy()
      expect(section.title).toBeTruthy()
      expect(section.body).toBeTruthy()
    }
  })

  it('titular section has kv rows with Denominación and email', () => {
    const titular = legalContent.sections.find((s) => s.id === 'titular')
    expect(titular?.kv).toBeDefined()
    const keys = titular?.kv?.map((r) => r.key) ?? []
    expect(keys).toContain('Denominación')
    expect(keys).toContain('Correo electrónico')
  })

  it('titular section Denominación value is Escala Digital Ventures, S.L.U.', () => {
    const titular = legalContent.sections.find((s) => s.id === 'titular')
    const denominacion = titular?.kv?.find((r) => r.key === 'Denominación')
    expect(denominacion?.value).toBe('Escala Digital Ventures, S.L.U.')
  })

  it('IP section states code/contents belong to Escala (AC-3)', () => {
    const ip = legalContent.sections.find((s) => s.id === 'propiedad-intelectual')
    expect(ip?.body).toMatch(/propiedad de Escala Digital Ventures/i)
  })

  it('meta title is ≤60 characters', () => {
    expect(legalContent.meta.title.length).toBeLessThanOrEqual(60)
  })

  it('meta description is ≤155 characters', () => {
    expect(legalContent.meta.description.length).toBeLessThanOrEqual(155)
  })

  it('has unresolved placeholders (expected — not yet publishable)', () => {
    const placeholders = collectPlaceholders(legalContent)
    // We expect placeholders to be present until Carlos fills them in.
    expect(placeholders.length).toBeGreaterThan(0)
    const tokens = placeholders.map((p) => p.token)
    expect(tokens).toContain('{{FECHA_ACTUALIZACION}}')
    expect(tokens).toContain('{{REGISTRO_MERCANTIL}}')
    expect(tokens).toContain('{{JURISDICCION}}')
  })
})

// ---------------------------------------------------------------------------
// /privacidad
// ---------------------------------------------------------------------------
describe('privacyContent — /privacidad (SPEC-P4 FR-3)', () => {
  it('has exactly 6 sections', () => {
    expect(privacyContent.sections).toHaveLength(6)
  })

  it('sections have the required IDs in order', () => {
    const ids = privacyContent.sections.map((s) => s.id)
    expect(ids).toEqual([
      'responsable',
      'datos-finalidad',
      'base-legal',
      'conservacion',
      'destinatarios',
      'derechos',
    ])
  })

  it('each section has index, name, title, and body', () => {
    for (const section of privacyContent.sections) {
      expect(section.index).toBeTruthy()
      expect(section.name).toBeTruthy()
      expect(section.title).toBeTruthy()
      expect(section.body).toBeTruthy()
    }
  })

  it('responsable section has kv rows with Responsable and Contacto', () => {
    const responsable = privacyContent.sections.find((s) => s.id === 'responsable')
    expect(responsable?.kv).toBeDefined()
    const keys = responsable?.kv?.map((r) => r.key) ?? []
    expect(keys).toContain('Responsable')
    expect(keys).toContain('Contacto')
  })

  it('destinatarios section states no tracking cookies are used (AC-4)', () => {
    const destinatarios = privacyContent.sections.find((s) => s.id === 'destinatarios')
    expect(destinatarios?.body).toMatch(/no utiliza cookies de seguimiento/i)
  })

  it('derechos section references AEPD (AC-4)', () => {
    const derechos = privacyContent.sections.find((s) => s.id === 'derechos')
    expect(derechos?.body).toMatch(/aepd\.es/i)
  })

  it('meta title is ≤60 characters', () => {
    expect(privacyContent.meta.title.length).toBeLessThanOrEqual(60)
  })

  it('meta description is ≤155 characters', () => {
    expect(privacyContent.meta.description.length).toBeLessThanOrEqual(155)
  })

  it('has unresolved placeholders (expected — not yet publishable)', () => {
    const placeholders = collectPlaceholders(privacyContent)
    expect(placeholders.length).toBeGreaterThan(0)
    const tokens = placeholders.map((p) => p.token)
    expect(tokens).toContain('{{FECHA_ACTUALIZACION}}')
  })
})

// ---------------------------------------------------------------------------
// Address guard — AC-8
// No physical/street address must appear in either dictionary.
// ---------------------------------------------------------------------------
describe('Address guard — AC-8', () => {
  const STREET_PATTERNS = [
    /calle\s+\w+/i,
    /carrer\s+\w+/i,
    /avinguda\s+\w+/i,
    /avenida\s+\w+/i,
    /passeig\s+\w+/i,
    /paseo\s+\w+/i,
    /\bc\/\s*\w+/i,
    // Postal code patterns (Spanish 5-digit)
    /\b\d{5}\b.*barcelona/i,
    /\b\d{5}\b.*mataró/i,
  ]

  function stringifyContent(obj: unknown): string {
    return JSON.stringify(obj)
  }

  it('legalContent contains no street address', () => {
    const text = stringifyContent(legalContent)
    for (const pattern of STREET_PATTERNS) {
      expect(text, `Pattern ${pattern} matched in legalContent`).not.toMatch(pattern)
    }
  })

  it('privacyContent contains no street address', () => {
    const text = stringifyContent(privacyContent)
    for (const pattern of STREET_PATTERNS) {
      expect(text, `Pattern ${pattern} matched in privacyContent`).not.toMatch(pattern)
    }
  })
})

// ---------------------------------------------------------------------------
// Placeholder utility unit tests
// ---------------------------------------------------------------------------
describe('collectPlaceholders utility', () => {
  it('detects a placeholder in a string', () => {
    const result = collectPlaceholders('Hello {{NAME}}')
    expect(result).toHaveLength(1)
    expect(result[0].token).toBe('{{NAME}}')
  })

  it('detects multiple placeholders in nested objects', () => {
    const obj = { a: '{{A}}', b: { c: '{{C}}' }, d: ['{{D}}'] }
    const result = collectPlaceholders(obj)
    expect(result).toHaveLength(3)
    const tokens = result.map((r) => r.token)
    expect(tokens).toContain('{{A}}')
    expect(tokens).toContain('{{C}}')
    expect(tokens).toContain('{{D}}')
  })

  it('returns empty array for clean content', () => {
    const result = collectPlaceholders({ a: 'clean', b: 'also clean' })
    expect(result).toHaveLength(0)
  })
})
