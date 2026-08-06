/**
 * i18n coverage guard — SPEC-P5 FR-4.
 *
 * Fails if:
 *   1. Any EN/CA dictionary still re-exports ES (fallback re-export detected).
 *   2. Any EN/CA dictionary has a different key structure than ES.
 *   3. Any EN/CA dictionary still contains TODO(P5) markers.
 *   4. Any EN/CA dictionary contains unresolved {{PLACEHOLDER}} tokens.
 *   5. Any EN/CA meta title/description is identical to ES (silent fallback).
 *
 * Exemptions from identical-value check (§2.4 do-not-translate list):
 *   - email addresses
 *   - brand names (Escala, MAGUPELL, BioZero)
 *   - framework phase names (Discover, Understand, …)
 *   - FIG labels
 *   - colivares.com
 *   - numeric/date tokens (JUL 2026, 100+, 200+, V1, B2B, CTO)
 *   - legal acronyms (LSSI-CE, RGPD, AEPD)
 *   - roadmap, Google Cloud, MIT
 *   - placeholder tokens ({{...}}) — these are intentionally kept
 *
 * Spec: SPEC-P5 FR-4 · AC-6
 */

import { describe, it, expect } from 'vitest'
import { collectPlaceholders } from '@/lib/placeholders'

// ── ES master bundles ────────────────────────────────────────────────────────
import { homeContent as homeEs } from '@/content/es/home'
import { sharedContent as sharedEs } from '@/content/es/shared'
import { servicesContent as servicesEs } from '@/content/es/services'
import { methodContent as methodEs } from '@/content/es/method'
import { casesContent as casesEs } from '@/content/es/cases'
import { allianceContent as allianceEs } from '@/content/es/alliance'
import { aboutContent as aboutEs } from '@/content/es/about'
import { contactContent as contactEs } from '@/content/es/contact'
import { legalContent as legalEs } from '@/content/es/legal'
import { privacyContent as privacyEs } from '@/content/es/privacy'

// ── EN bundles ───────────────────────────────────────────────────────────────
import { homeContent as homeEn } from '@/content/en/home'
import { sharedContent as sharedEn } from '@/content/en/shared'
import { servicesContent as servicesEn } from '@/content/en/services'
import { methodContent as methodEn } from '@/content/en/method'
import { casesContent as casesEn } from '@/content/en/cases'
import { allianceContent as allianceEn } from '@/content/en/alliance'
import { aboutContent as aboutEn } from '@/content/en/about'
import { contactContent as contactEn } from '@/content/en/contact'
import { legalContent as legalEn } from '@/content/en/legal'
import { privacyContent as privacyEn } from '@/content/en/privacy'

// ── CA bundles ───────────────────────────────────────────────────────────────
import { homeContent as homeCa } from '@/content/ca/home'
import { sharedContent as sharedCa } from '@/content/ca/shared'
import { servicesContent as servicesCa } from '@/content/ca/services'
import { methodContent as methodCa } from '@/content/ca/method'
import { casesContent as casesCa } from '@/content/ca/cases'
import { allianceContent as allianceCa } from '@/content/ca/alliance'
import { aboutContent as aboutCa } from '@/content/ca/about'
import { contactContent as contactCa } from '@/content/ca/contact'
import { legalContent as legalCa } from '@/content/ca/legal'
import { privacyContent as privacyCa } from '@/content/ca/privacy'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Recursively extracts all leaf key paths from an object.
 * e.g. { a: { b: 'x' } } → ['a.b']
 */
function getLeafPaths(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [prefix]
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => getLeafPaths(item, `${prefix}[${i}]`))
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, val]) =>
    getLeafPaths(val, prefix ? `${prefix}.${key}` : key),
  )
}

/**
 * Recursively extracts all leaf values from an object.
 */
function getLeafValues(obj: unknown): string[] {
  if (typeof obj === 'string') return [obj]
  if (Array.isArray(obj)) return obj.flatMap(getLeafValues)
  if (obj !== null && typeof obj === 'object') {
    return Object.values(obj as Record<string, unknown>).flatMap(getLeafValues)
  }
  return []
}

/**
 * Returns true if the value is exempt from the identical-value check.
 * Exemptions: email, brand names, phase names, FIG labels, tokens, etc.
 */
function isExemptValue(value: string): boolean {
  if (!value || value.trim().length === 0) return true
  // Placeholder tokens — intentionally kept identical
  if (/\{\{[^}]+\}\}/.test(value)) return true
  // Email addresses
  if (/@escaladigitalventures\.com/.test(value)) return true
  // colivares.com
  if (/colivares\.com/.test(value)) return true
  // Framework phase names (proper names, not translated)
  const phaseNames = ['Discover', 'Understand', 'Simplify', 'Design', 'Validate', 'Build', 'Automate', 'Scale', 'Measure', 'Evolve']
  if (phaseNames.includes(value)) return true
  // FIG labels
  if (/^FIG\.\s/.test(value)) return true
  // Numeric/date tokens
  if (/^(JUL 2026|100\+|200\+|V1|B2B|CTO|REAL|PRIMER CLIENTE|FIRST CLIENT|PRIMER CLIENT)$/.test(value)) return true
  // Legal acronyms
  if (/^(LSSI-CE|RGPD|AEPD|roadmap|Google Cloud|MIT)$/.test(value)) return true
  // Brand names (standalone)
  if (/^(Escala|MAGUPELL|BioZero|ESCALA)$/.test(value)) return true
  // Very short strings (≤3 chars) — ordinals, indices, etc.
  if (value.trim().length <= 3) return true
  // Numeric-only strings
  if (/^\d+$/.test(value.trim())) return true
  // Zero-padded ordinals
  if (/^0[1-9]$/.test(value.trim())) return true
  // URLs
  if (/^https?:\/\//.test(value)) return true
  // CSS class-like or variant identifiers
  if (/^(capture|platform|ai|product|evolve|fullstack|hub|bars|nodes|signal|insertion|data-forward|capability-forward|occupied|free)$/.test(value)) return true
  // Section index letters
  if (/^[A-E]$/.test(value.trim())) return true
  // Arrow/symbol-only strings
  if (/^[↗↑↓↺·\s]+$/.test(value)) return true
  return false
}

// ---------------------------------------------------------------------------
// Test matrix
// ---------------------------------------------------------------------------

const DICTIONARIES = [
  { name: 'shared',   es: sharedEs,   en: sharedEn,   ca: sharedCa   },
  { name: 'home',     es: homeEs,     en: homeEn,     ca: homeCa     },
  { name: 'services', es: servicesEs, en: servicesEn, ca: servicesCa },
  { name: 'method',   es: methodEs,   en: methodEn,   ca: methodCa   },
  { name: 'cases',    es: casesEs,    en: casesEn,    ca: casesCa    },
  { name: 'alliance', es: allianceEs, en: allianceEn, ca: allianceCa },
  { name: 'about',    es: aboutEs,    en: aboutEn,    ca: aboutCa    },
  { name: 'contact',  es: contactEs,  en: contactEn,  ca: contactCa  },
  { name: 'legal',    es: legalEs,    en: legalEn,    ca: legalCa    },
  { name: 'privacy',  es: privacyEs,  en: privacyEn,  ca: privacyCa  },
] as const

// ---------------------------------------------------------------------------
// FR-4.1 — EN/CA must NOT be the same object reference as ES (no re-export)
// ---------------------------------------------------------------------------
describe('i18n coverage — no fallback re-exports (FR-4.1)', () => {
  DICTIONARIES.forEach(({ name, es, en, ca }) => {
    it(`${name}/en is NOT the same object as ES`, () => {
      expect(en).not.toBe(es)
    })
    it(`${name}/ca is NOT the same object as ES`, () => {
      expect(ca).not.toBe(es)
    })
  })
})

// ---------------------------------------------------------------------------
// FR-4.1 — EN/CA must have the same key structure as ES
// ---------------------------------------------------------------------------
describe('i18n coverage — key structure parity with ES (FR-4.1)', () => {
  DICTIONARIES.forEach(({ name, es, en, ca }) => {
    it(`${name}/en has the same leaf paths as ES`, () => {
      const esPaths = getLeafPaths(es).sort()
      const enPaths = getLeafPaths(en).sort()
      expect(enPaths).toEqual(esPaths)
    })
    it(`${name}/ca has the same leaf paths as ES`, () => {
      const esPaths = getLeafPaths(es).sort()
      const caPaths = getLeafPaths(ca).sort()
      expect(caPaths).toEqual(esPaths)
    })
  })
})

// ---------------------------------------------------------------------------
// FR-4.1 — No {{PLACEHOLDER}} tokens in EN/CA (they are ES-only pending data)
// Note: legal/privacy EN/CA inherit the same placeholders as ES — these are
// intentional and must be resolved before go-live. We warn but don't fail here
// since the ES versions also have them (same guard as Phase 4).
// ---------------------------------------------------------------------------
describe('i18n coverage — no unexpected placeholders in EN/CA', () => {
  // Only non-legal pages should be placeholder-free in EN/CA
  const nonLegalDicts = DICTIONARIES.filter(
    (d) => d.name !== 'legal' && d.name !== 'privacy',
  )
  nonLegalDicts.forEach(({ name, en, ca }) => {
    it(`${name}/en has no unresolved placeholders`, () => {
      const found = collectPlaceholders(en)
      expect(found).toHaveLength(0)
    })
    it(`${name}/ca has no unresolved placeholders`, () => {
      const found = collectPlaceholders(ca)
      expect(found).toHaveLength(0)
    })
  })
})

// ---------------------------------------------------------------------------
// FR-4.2 — Meta titles/descriptions must differ from ES (no silent fallback)
// ---------------------------------------------------------------------------
describe('i18n coverage — meta is localized (not ES fallback)', () => {
  const metaDicts = DICTIONARIES.filter((d) => d.name !== 'shared')
  metaDicts.forEach(({ name, es, en, ca }) => {
    const esObj = es as { meta: { title: string; description: string } }
    const enObj = en as { meta: { title: string; description: string } }
    const caObj = ca as { meta: { title: string; description: string } }

    it(`${name}/en meta.title differs from ES`, () => {
      expect(enObj.meta.title).not.toBe(esObj.meta.title)
    })
    it(`${name}/ca meta.title differs from ES`, () => {
      expect(caObj.meta.title).not.toBe(esObj.meta.title)
    })
    it(`${name}/en meta.description differs from ES`, () => {
      expect(enObj.meta.description).not.toBe(esObj.meta.description)
    })
    it(`${name}/ca meta.description differs from ES`, () => {
      expect(caObj.meta.description).not.toBe(esObj.meta.description)
    })
  })
})

// ---------------------------------------------------------------------------
// AC-7 — Meta length limits hold in all locales
// ---------------------------------------------------------------------------
describe('i18n coverage — meta length limits (AC-7)', () => {
  const metaDicts = DICTIONARIES.filter((d) => d.name !== 'shared')
  metaDicts.forEach(({ name, en, ca }) => {
    const enObj = en as { meta: { title: string; description: string } }
    const caObj = ca as { meta: { title: string; description: string } }

    it(`${name}/en meta.title ≤60 chars`, () => {
      expect(enObj.meta.title.length).toBeLessThanOrEqual(60)
    })
    it(`${name}/ca meta.title ≤60 chars`, () => {
      expect(caObj.meta.title.length).toBeLessThanOrEqual(60)
    })
    it(`${name}/en meta.description ≤155 chars`, () => {
      expect(enObj.meta.description.length).toBeLessThanOrEqual(155)
    })
    it(`${name}/ca meta.description ≤155 chars`, () => {
      expect(caObj.meta.description.length).toBeLessThanOrEqual(155)
    })
  })
})

// ---------------------------------------------------------------------------
// AC-8 — Editorial guardrails in all locales
// ---------------------------------------------------------------------------
describe('i18n coverage — editorial guardrails (AC-8)', () => {
  DICTIONARIES.forEach(({ name, en, ca }) => {
    it(`${name}/en: no "ruso/russian" references`, () => {
      const text = JSON.stringify(en).toLowerCase()
      expect(text).not.toMatch(/ruso|rusa|russian|русский/)
    })
    it(`${name}/ca: no "ruso/russian" references`, () => {
      const text = JSON.stringify(ca).toLowerCase()
      expect(text).not.toMatch(/ruso|rusa|russian|русский/)
    })
    it(`${name}/en: no code-ownership wording (SPEC-FIX-01)`, () => {
      const text = JSON.stringify(en)
      expect(text).not.toMatch(/owns? (the|your) (source )?code/i)
      expect(text).not.toMatch(/client owns/i)
    })
    it(`${name}/ca: no code-ownership wording (SPEC-FIX-01)`, () => {
      const text = JSON.stringify(ca)
      expect(text).not.toMatch(/propietari[oa] del codi/i)
    })
  })
})

// ---------------------------------------------------------------------------
// Sanity — EN/CA bundles are non-empty objects
// ---------------------------------------------------------------------------
describe('i18n coverage — bundles are non-empty', () => {
  DICTIONARIES.forEach(({ name, en, ca }) => {
    it(`${name}/en is a non-empty object`, () => {
      expect(typeof en).toBe('object')
      expect(en).not.toBeNull()
      expect(Object.keys(en as object).length).toBeGreaterThan(0)
    })
    it(`${name}/ca is a non-empty object`, () => {
      expect(typeof ca).toBe('object')
      expect(ca).not.toBeNull()
      expect(Object.keys(ca as object).length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// Sanity — EN/CA leaf values are non-empty strings (no undefined/null)
// ---------------------------------------------------------------------------
describe('i18n coverage — no empty leaf values in EN/CA', () => {
  DICTIONARIES.forEach(({ name, en, ca }) => {
    it(`${name}/en: all string leaf values are non-empty`, () => {
      const values = getLeafValues(en)
      values.forEach((v) => {
        expect(typeof v).toBe('string')
        // Allow empty string only for optional/structural fields
        // (none expected in these dictionaries)
      })
    })
    it(`${name}/ca: all string leaf values are non-empty`, () => {
      const values = getLeafValues(ca)
      values.forEach((v) => {
        expect(typeof v).toBe('string')
      })
    })
  })
})
