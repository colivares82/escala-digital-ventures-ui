/**
 * Contact content integrity tests — SPEC-P2.6 FR-7.1, AC-5, AC-8
 *
 * Guards:
 *   - ContactDictionary shape is satisfied
 *   - meta lengths (≤60 title, ≤155 desc)
 *   - affinityFilter has exactly 3 items
 *   - Gmail address NEVER appears in this dictionary
 *   - Public email (hola@...) appears only in directMeta, never elsewhere
 */
import { describe, expect, it } from 'vitest'
import { contactContent } from '@/content/es/contact'

const GMAIL = 'carlos.olivares.ve@gmail.com'
const PUBLIC_EMAIL = 'hola@escaladigitalventures.com'

describe('contactContent integrity', () => {
  // ── Meta ──────────────────────────────────────────────────────────────────

  it('meta.title is ≤60 characters', () => {
    expect(contactContent.meta.title.length).toBeLessThanOrEqual(60)
  })

  it('meta.description is ≤155 characters', () => {
    expect(contactContent.meta.description.length).toBeLessThanOrEqual(155)
  })

  // ── pageHeader ────────────────────────────────────────────────────────────

  it('pageHeader.eyebrow is defined and non-empty', () => {
    expect(contactContent.pageHeader.eyebrow).toBeTruthy()
  })

  it('pageHeader.h1 is defined and non-empty', () => {
    expect(contactContent.pageHeader.h1).toBeTruthy()
  })

  it('pageHeader.lead is defined and ≥20 chars', () => {
    expect(contactContent.pageHeader.lead.length).toBeGreaterThanOrEqual(20)
  })

  // ── Affinity filter ───────────────────────────────────────────────────────

  it('affinityFilter.heading is defined', () => {
    expect(contactContent.affinityFilter.heading).toBeTruthy()
  })

  it('affinityFilter has exactly 3 items', () => {
    expect(contactContent.affinityFilter.items).toHaveLength(3)
  })

  it('every affinity item is a non-empty string', () => {
    for (const item of contactContent.affinityFilter.items) {
      expect(typeof item).toBe('string')
      expect(item.length).toBeGreaterThan(0)
    }
  })

  // ── directMeta ────────────────────────────────────────────────────────────

  it('directMeta.email is the public address', () => {
    expect(contactContent.directMeta.email).toBe(PUBLIC_EMAIL)
  })

  it('directMeta labels are all defined', () => {
    const { emailLabel, locationLabel, languagesLabel, responseLabel } =
      contactContent.directMeta
    expect(emailLabel).toBeTruthy()
    expect(locationLabel).toBeTruthy()
    expect(languagesLabel).toBeTruthy()
    expect(responseLabel).toBeTruthy()
  })

  it('directMeta.location is defined', () => {
    expect(contactContent.directMeta.location).toBeTruthy()
  })

  // ── dossierHeader ─────────────────────────────────────────────────────────

  it('dossierHeader.title is defined', () => {
    expect(contactContent.dossierHeader.title).toBeTruthy()
  })

  it('dossierHeader.ref is defined', () => {
    expect(contactContent.dossierHeader.ref).toBeTruthy()
  })

  // ── trustLine ─────────────────────────────────────────────────────────────

  it('trustLine is defined and non-empty', () => {
    expect(contactContent.trustLine).toBeTruthy()
  })

  // ── Security: Gmail leak guard (AC-5) ─────────────────────────────────────

  it('NEVER contains the internal Gmail address (AC-5)', () => {
    const serialized = JSON.stringify(contactContent)
    expect(serialized).not.toContain(GMAIL)
  })

  it('public email only appears in directMeta.email', () => {
    const { directMeta, ...rest } = contactContent
    // Remove directMeta (which legitimately has it), check the rest
    const restStr = JSON.stringify(rest)
    expect(restStr).not.toContain(PUBLIC_EMAIL)
  })
})
