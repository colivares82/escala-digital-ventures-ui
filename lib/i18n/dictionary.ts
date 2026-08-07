/**
 * getDictionary — locale → typed content bundle.
 * Components must receive content via props; never import content directly
 * from inside a component (except the home composition layer, per systemPatterns).
 *
 * Phase 5: EN and CA bundles now use real translated content.
 * Spec: SPEC-P1 FR-3.4 · SPEC-P5 FR-1
 */

import type { Locale } from './types'

// ── ES ───────────────────────────────────────────────────────────────────────
import { homeContent as homeEs } from '@/content/es/home'
import { sharedContent as sharedEs } from '@/content/es/shared'
import { aboutContent as aboutEs } from '@/content/es/about'
import { allianceContent as allianceEs } from '@/content/es/alliance'
import { casesContent as casesEs } from '@/content/es/cases'
import { contactContent as contactEs } from '@/content/es/contact'
import { legalContent as legalEs } from '@/content/es/legal'
import { methodContent as methodEs } from '@/content/es/method'
import { privacyContent as privacyEs } from '@/content/es/privacy'
import { servicesContent as servicesEs } from '@/content/es/services'

// ── EN ───────────────────────────────────────────────────────────────────────
import { homeContent as homeEn } from '@/content/en/home'
import { sharedContent as sharedEn } from '@/content/en/shared'
import { aboutContent as aboutEn } from '@/content/en/about'
import { allianceContent as allianceEn } from '@/content/en/alliance'
import { casesContent as casesEn } from '@/content/en/cases'
import { contactContent as contactEn } from '@/content/en/contact'
import { legalContent as legalEn } from '@/content/en/legal'
import { methodContent as methodEn } from '@/content/en/method'
import { privacyContent as privacyEn } from '@/content/en/privacy'
import { servicesContent as servicesEn } from '@/content/en/services'

// ── CA ───────────────────────────────────────────────────────────────────────
import { homeContent as homeCa } from '@/content/ca/home'
import { sharedContent as sharedCa } from '@/content/ca/shared'
import { aboutContent as aboutCa } from '@/content/ca/about'
import { allianceContent as allianceCa } from '@/content/ca/alliance'
import { casesContent as casesCa } from '@/content/ca/cases'
import { contactContent as contactCa } from '@/content/ca/contact'
import { legalContent as legalCa } from '@/content/ca/legal'
import { methodContent as methodCa } from '@/content/ca/method'
import { privacyContent as privacyCa } from '@/content/ca/privacy'
import { servicesContent as servicesCa } from '@/content/ca/services'

/** Typed content bundle for a single locale. */
export type Dictionary = {
  readonly shared: typeof sharedEs
  readonly home: typeof homeEs
  readonly services: typeof servicesEs
  readonly method: typeof methodEs
  readonly cases: typeof casesEs
  readonly alliance: typeof allianceEs
  readonly about: typeof aboutEs
  readonly contact: typeof contactEs
  readonly legal: typeof legalEs
  readonly privacy: typeof privacyEs
}

const ES_BUNDLE: Dictionary = {
  shared: sharedEs,
  home: homeEs,
  services: servicesEs,
  method: methodEs,
  cases: casesEs,
  alliance: allianceEs,
  about: aboutEs,
  contact: contactEs,
  legal: legalEs,
  privacy: privacyEs,
}

const EN_BUNDLE = {
  shared: sharedEn,
  home: homeEn,
  services: servicesEn,
  method: methodEn,
  cases: casesEn,
  alliance: allianceEn,
  about: aboutEn,
  contact: contactEn,
  legal: legalEn,
  privacy: privacyEn,
} as const

const CA_BUNDLE = {
  shared: sharedCa,
  home: homeCa,
  services: servicesCa,
  method: methodCa,
  cases: casesCa,
  alliance: allianceCa,
  about: aboutCa,
  contact: contactCa,
  legal: legalCa,
  privacy: privacyCa,
} as const

/**
 * Returns the typed content bundle for the requested locale.
 * Phase 5: EN and CA now return their own real bundles.
 */
export function getDictionary(locale: Locale): Dictionary {
  switch (locale) {
    case 'en':
      return EN_BUNDLE as unknown as Dictionary
    case 'ca':
      return CA_BUNDLE as unknown as Dictionary
    default:
      return ES_BUNDLE
  }
}
