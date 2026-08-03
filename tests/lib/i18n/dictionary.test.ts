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

  it('Phase 1: all locales return the same ES content bundle', () => {
    // EN and CA re-export ES content — all three are the same object in Phase 1
    const es = getDictionary('es')
    const en = getDictionary('en')
    const ca = getDictionary('ca')
    // Same home title (ES content for all locales in Phase 1)
    expect(en.home.meta.title).toBe(es.home.meta.title)
    expect(ca.home.meta.title).toBe(es.home.meta.title)
  })

  it('shared dictionary has accessibility labels', () => {
    const dict = getDictionary('es')
    expect(dict.shared.accessibility).toBeTruthy()
    expect(dict.shared.accessibility.skipToContent).toBeTruthy()
  })
})
