/**
 * Tests for lib/i18n/dictionary.ts
 * Verifies getDictionary returns the correct bundle shape for all locales.
 * Spec: SPEC-P1 FR-3.4
 */
import { describe, expect, it } from 'vitest'
import { getDictionary } from '@/lib/i18n/dictionary'
import { LOCALES } from '@/lib/i18n/types'
import type { Locale } from '@/lib/i18n/types'

describe('getDictionary', () => {
  it('returns a bundle for every locale', () => {
    LOCALES.forEach((locale: Locale) => {
      const dict = getDictionary(locale)
      expect(dict).toBeTruthy()
    })
  })

  it('bundle contains all required page dictionaries', () => {
    const dict = getDictionary('es')
    expect(dict.home).toBeTruthy()
    expect(dict.shared).toBeTruthy()
    expect(dict.services).toBeTruthy()
    expect(dict.method).toBeTruthy()
    expect(dict.cases).toBeTruthy()
    expect(dict.alliance).toBeTruthy()
    expect(dict.about).toBeTruthy()
    expect(dict.contact).toBeTruthy()
    expect(dict.legal).toBeTruthy()
    expect(dict.privacy).toBeTruthy()
  })

  it('every page dictionary has a meta object with title and description', () => {
    const dict = getDictionary('es')
    const pages = [
      dict.home, dict.services, dict.method, dict.cases,
      dict.alliance, dict.about, dict.contact, dict.legal, dict.privacy,
    ] as Array<{ meta: { title: string; description: string } }>
    pages.forEach((page) => {
      expect(page.meta.title).toBeTruthy()
      expect(page.meta.description).toBeTruthy()
    })
  })

  it('Phase 5: EN and CA return their own localized bundles (different from ES)', () => {
    // Phase 5: EN and CA have real translations — they must differ from ES
    const es = getDictionary('es')
    const en = getDictionary('en')
    const ca = getDictionary('ca')
    // EN and CA home titles must differ from ES
    expect(en.home.meta.title).not.toBe(es.home.meta.title)
    expect(ca.home.meta.title).not.toBe(es.home.meta.title)
    // Bundles are distinct objects
    expect(en).not.toBe(es)
    expect(ca).not.toBe(es)
    expect(en).not.toBe(ca)
  })

  it('shared dictionary has accessibility labels', () => {
    const dict = getDictionary('es')
    expect(dict.shared.accessibility).toBeTruthy()
    expect(dict.shared.accessibility.skipToContent).toBeTruthy()
  })
})
