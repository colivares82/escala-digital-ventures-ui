/**
 * getDictionary — locale → typed content bundle.
 * Components must receive content via props; never import content directly
 * from inside a component (except the home composition layer, per systemPatterns).
 *
 * Phase 1: EN/CA re-export ES content (TODO P5: real translations).
 * The function signature is stable; implementations swap in Phase 5.
 * Spec: SPEC-P1 FR-3.4
 */

import type { Locale } from './types'
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

/**
 * Returns the typed content bundle for the requested locale.
 * EN and CA return the ES bundle until Phase 5 translations land.
 */
export function getDictionary(_locale: Locale): Dictionary {
  // Phase 1: all locales use ES content — Phase 5 will fork per locale.
  // TODO(P5): switch (_locale) { case 'en': return EN_BUNDLE; case 'ca': return CA_BUNDLE; }
  return ES_BUNDLE
}
