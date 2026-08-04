/**
 * Locale-aware route map — single source of truth for all localized slugs.
 * Implements spec §4.1 exactly. No internal link may hard-code a URL string.
 *
 * Helpers:
 *   getPath(page, locale, params?)   → URL string
 *   resolvePath(segments)            → RouteResolution | null   (inverse of getPath)
 *   getAlternates(page, params?)     → Record<Locale, string>   (hreflang + LocaleSwitcher)
 *
 * ES is served at root (no /es prefix). Note: /es/... paths are NOT valid.
 * Spec: SPEC-P1 FR-1
 */

import {
  CASE_SLUGS,
  DEFAULT_LOCALE,
  LOCALES,
  type CaseSlug,
  type Locale,
  type PageId,
  type PageParams,
  type RouteResolution,
} from './types'

// ---------------------------------------------------------------------------
// Route map — spec §4.1 table, exactly.
// caseDetail uses {slug} placeholder; getPath substitutes it.
// ---------------------------------------------------------------------------
const ROUTE_MAP = {
  home:       { es: '/',                        en: '/en',                    ca: '/ca' },
  services:   { es: '/que-hacemos',             en: '/en/what-we-do',         ca: '/ca/que-fem' },
  method:     { es: '/como-trabajamos',         en: '/en/how-we-work',        ca: '/ca/com-treballem' },
  cases:      { es: '/casos-de-exito',          en: '/en/case-studies',       ca: '/ca/casos-dexit' },
  caseDetail: { es: '/casos-de-exito/{slug}',   en: '/en/case-studies/{slug}', ca: '/ca/casos-dexit/{slug}' },
  alliance:   { es: '/modelo-de-alianza',       en: '/en/alliance-model',     ca: '/ca/model-dalianca' },
  about:      { es: '/sobre-escala',            en: '/en/about-escala',       ca: '/ca/sobre-escala' },
  contact:    { es: '/contacto',                en: '/en/contact',            ca: '/ca/contacte' },
  legal:      { es: '/aviso-legal',             en: '/en/legal-notice',       ca: '/ca/avis-legal' },
  privacy:    { es: '/privacidad',              en: '/en/privacy',            ca: '/ca/privacitat' },
} as const satisfies Record<PageId, Record<Locale, string>>

// Export for inspection / testing (read-only).
export { ROUTE_MAP }

// ---------------------------------------------------------------------------
// getPath — segments → localized URL
// ---------------------------------------------------------------------------

/**
 * Returns the localized URL for a page + locale combination.
 * For caseDetail, params.slug is required and replaces the {slug} token.
 */
export function getPath(page: PageId, locale: Locale, params?: PageParams): string {
  const template: string = (ROUTE_MAP[page] as Record<Locale, string>)[locale]
  if (page === 'caseDetail') {
    if (!params?.slug) {
      throw new Error(`getPath: caseDetail requires params.slug`)
    }
    return template.replace('{slug}', params.slug)
  }
  return template
}

// ---------------------------------------------------------------------------
// resolvePath — URL path segments → RouteResolution | null
// Pre-built reverse lookup for O(1) resolution.
// ---------------------------------------------------------------------------

const PATH_TO_RESOLUTION = new Map<string, RouteResolution>()

// Build reverse lookup at module load.
;(Object.keys(ROUTE_MAP) as PageId[]).forEach((page) => {
  LOCALES.forEach((locale) => {
    const template: string = (ROUTE_MAP[page] as Record<Locale, string>)[locale]
    if (page === 'caseDetail') {
      CASE_SLUGS.forEach((slug: CaseSlug) => {
        const path = template.replace('{slug}', slug)
        PATH_TO_RESOLUTION.set(path, { page, locale, params: { slug } })
      })
    } else {
      PATH_TO_RESOLUTION.set(template, { page, locale })
    }
  })
})

/**
 * Converts URL path segments (from [[...path]] catch-all) to a canonical path string.
 * Strips trailing slashes (except for root '/').
 */
function segmentsToPath(segments: string[]): string {
  if (segments.length === 0) return '/'
  const raw = `/${segments.join('/')}`
  // Normalize trailing slash: /foo/ → /foo (root '/' unchanged)
  return raw.length > 1 && raw.endsWith('/') ? raw.slice(0, -1) : raw
}

/**
 * Resolves URL path segments to a typed RouteResolution.
 * Returns null for unknown paths (triggers notFound() in the catch-all page).
 *
 * Invalid paths (per spec §5):
 *   - /es/... (es prefix is NOT a valid locale prefix)
 *   - /foo    (unknown slug)
 *   - /en/foo (unknown EN slug)
 *   - /casos-de-exito/unknown-slug
 *   - Trailing slashes are normalized before lookup
 */
export function resolvePath(segments: string[]): RouteResolution | null {
  const path = segmentsToPath(segments)
  return PATH_TO_RESOLUTION.get(path) ?? null
}

// ---------------------------------------------------------------------------
// getAlternates — all localized URLs for one page (hreflang + LocaleSwitcher)
// ---------------------------------------------------------------------------

/**
 * Returns a locale → absolute-path map for a page + optional params.
 * Used to build hreflang alternates and the LocaleSwitcher href values.
 * x-default is the caller's responsibility (always point to ES).
 */
export function getAlternates(
  page: PageId,
  params?: PageParams,
): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, getPath(page, locale, params)]),
  ) as Record<Locale, string>
}

// ---------------------------------------------------------------------------
// Utility — default locale constant re-exported for convenience
// ---------------------------------------------------------------------------
export { DEFAULT_LOCALE, LOCALES, CASE_SLUGS } from './types'
