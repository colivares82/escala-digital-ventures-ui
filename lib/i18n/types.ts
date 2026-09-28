/**
 * Core i18n types for escaladigitalventures.com.
 * Single source of truth for locale definitions and page identifiers.
 * Spec: SPEC-P1 §3
 */

export type Locale = 'es' | 'en' | 'ca'

export const LOCALES = ['es', 'en', 'ca'] as const satisfies readonly Locale[]

/** ES served at root (no /es prefix). EN at /en, CA at /ca. */
export const DEFAULT_LOCALE: Locale = 'es'

export type PageId =
  | 'home'
  | 'services'
  | 'method'
  | 'cases'
  | 'caseDetail'
  | 'alliance'
  | 'about'
  | 'contact'
  | 'legal'
  | 'privacy'
  | 'oportunidad'

/**
 * Pages that exist in ES only (LANDING-01 D1). They have no EN/CA slug: the
 * route helpers resolve their EN/CA alternates to that locale's home, and
 * only the ES path is registered for reverse lookup (so EN/CA 404).
 */
export type EsOnlyPageId = 'oportunidad'

/** Pages localised in every locale — the keys of ROUTE_MAP. */
export type LocalizedPageId = Exclude<PageId, EsOnlyPageId>

export type CaseSlug = 'magupell' | 'biozero'
export const CASE_SLUGS = ['magupell', 'biozero'] as const satisfies readonly CaseSlug[]

/** Params carried by pages with dynamic segments. Currently only caseDetail uses slug. */
export type PageParams = { readonly slug: CaseSlug }

/** Resolved route: page identity + locale + optional dynamic params. */
export type RouteResolution = {
  readonly page: PageId
  readonly locale: Locale
  readonly params?: PageParams
}
