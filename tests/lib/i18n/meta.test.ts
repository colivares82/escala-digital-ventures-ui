/**
 * Meta length limit enforcement — AC-7.
 * All ES page meta titles must be ≤60 chars, descriptions ≤155 chars.
 * Failing here means the SEO contract is broken before any page goes live.
 * Spec: SPEC-P1 FR-4.1
 */
import { homeContent } from '@/content/es/home'
import { aboutContent } from '@/content/es/about'
import { allianceContent } from '@/content/es/alliance'
import { casesContent } from '@/content/es/cases'
import { contactContent } from '@/content/es/contact'
import { legalContent } from '@/content/es/legal'
import { methodContent } from '@/content/es/method'
import { privacyContent } from '@/content/es/privacy'
import { servicesContent } from '@/content/es/services'
import { sharedContent } from '@/content/es/shared'

const PAGE_DICTIONARIES = [
  { id: 'home', meta: homeContent.meta },
  { id: 'services', meta: servicesContent.meta },
  { id: 'method', meta: methodContent.meta },
  { id: 'cases', meta: casesContent.meta },
  { id: 'alliance', meta: allianceContent.meta },
  { id: 'about', meta: aboutContent.meta },
  { id: 'contact', meta: contactContent.meta },
  { id: 'legal', meta: legalContent.meta },
  { id: 'privacy', meta: privacyContent.meta },
  // Shared global metadata
  { id: 'shared/global', meta: sharedContent.metadata },
] as const

// ---------------------------------------------------------------------------
// Title ≤60 characters
// ---------------------------------------------------------------------------
describe('ES page meta — title ≤60 characters', () => {
  PAGE_DICTIONARIES.forEach(({ id, meta }) => {
    it(`${id}: title is ≤60 chars (actual: ${meta.title.length})`, () => {
      expect(meta.title.length).toBeLessThanOrEqual(60)
    })
  })
})

// ---------------------------------------------------------------------------
// Description ≤155 characters
// ---------------------------------------------------------------------------
describe('ES page meta — description ≤155 characters', () => {
  PAGE_DICTIONARIES.forEach(({ id, meta }) => {
    it(`${id}: description is ≤155 chars (actual: ${meta.description.length})`, () => {
      expect(meta.description.length).toBeLessThanOrEqual(155)
    })
  })
})

// ---------------------------------------------------------------------------
// All meta fields are non-empty
// ---------------------------------------------------------------------------
describe('ES page meta — no empty values', () => {
  PAGE_DICTIONARIES.forEach(({ id, meta }) => {
    it(`${id}: title is non-empty`, () => {
      expect(meta.title.trim().length).toBeGreaterThan(0)
    })
    it(`${id}: description is non-empty`, () => {
      expect(meta.description.trim().length).toBeGreaterThan(0)
    })
  })
})

// ---------------------------------------------------------------------------
// AC-6: No ruso|russian traces in content (guard against regression)
// ---------------------------------------------------------------------------
describe('AC-6 — no ruso/russian in ES content', () => {
  const allContentAsString = JSON.stringify({
    home: homeContent,
    services: servicesContent,
    method: methodContent,
    cases: casesContent,
    alliance: allianceContent,
    about: aboutContent,
    contact: contactContent,
    legal: legalContent,
    privacy: privacyContent,
    shared: sharedContent,
  }).toLowerCase()

  it('contains no "ruso" references', () => {
    expect(allContentAsString).not.toContain('ruso')
  })

  it('contains no "russian" references', () => {
    expect(allContentAsString).not.toContain('russian')
  })
})
