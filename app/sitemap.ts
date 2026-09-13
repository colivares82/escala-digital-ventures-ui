/**
 * Sitemap — Phase 1 (Option A): only built pages emitted.
 * Add entries here as Phase 2 pages are built. The full route map is already
 * defined in lib/i18n/routes.ts for link generation and testing.
 *
 * Per Google spec, every locale URL is listed as its own entry with all
 * locale alternates. Spec: SPEC-P1 FR-4.3
 */
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { getAlternates, getPath } from '@/lib/i18n/routes'
import { getLastModified } from '@/lib/seo/lastmod'
import { LOCALES } from '@/lib/i18n/types'
import type { PageId, PageParams } from '@/lib/i18n/types'

type BuiltPageEntry = { page: PageId; params?: PageParams }

/**
 * Phase 1: only home is built.
 * Phase 2.1: method added.
 * Phase 2.n: add each page when its component ships.
 * Phase 2.3: add { page: 'caseDetail', params: { slug: 'magupell' } }, etc.
 */
const BUILT_PAGES: BuiltPageEntry[] = [
  { page: 'home' },
  { page: 'method' },                             // Phase 2.1 — SPEC-P2.1
  { page: 'services' },                           // Phase 2.2 — SPEC-P2.2
  { page: 'cases' },                              // Phase 2.3 — SPEC-P2.3
  { page: 'caseDetail', params: { slug: 'magupell' } }, // Phase 2.3
  { page: 'caseDetail', params: { slug: 'biozero' } },  // Phase 2.3
  { page: 'alliance' },                                  // Phase 2.4 — SPEC-P2.4
  { page: 'about' },                                     // Phase 2.5 — SPEC-P2.5
  { page: 'contact' },                                   // Phase 2.6 — SPEC-P2.6
  { page: 'legal' },                                     // Phase 4 — SPEC-P4 (indexable per FR-6.3)
  { page: 'privacy' },                                   // Phase 4 — SPEC-P4 (indexable per FR-6.3)
]

/**
 * Absolute URL for a route path, in the SAME form the canonical tag uses.
 *
 * ── Why the root is special-cased (SEO-01a §4) ──
 * `getPath('home', 'es')` returns '/', so the naive `${SITE_URL}${path}`
 * produced `https://www.escaladigitalventures.com/` here while the rendered
 * <link rel="canonical"> was `https://www.escaladigitalventures.com` — no
 * trailing slash. Confirmed live on 13 Sep 2026, on the single most important
 * URL of the site. Google treats a canonical that disagrees with the sitemap
 * <loc> as a competing signal for the same page.
 *
 * The mismatch is NOT fixable from the metadata side: `buildPageMetadata`
 * already returns the trailing-slash form (verified), and Next.js strips it
 * when resolving the value against `metadataBase` in app/layout.tsx. Framework
 * normalisation, not application code — so the sitemap is what must yield.
 *
 * Net effect: root → bare origin; every other route is unchanged (their paths
 * never end in a slash). All 33 URLs were verified to return HTTP 200 with no
 * redirect in both forms, so no entry starts 301-ing as a result of this.
 */
function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const { page, params } of BUILT_PAGES) {
    const alternates = getAlternates(page, params)
    const languageAlternates: Record<string, string> = {}
    LOCALES.forEach((locale) => {
      languageAlternates[locale] = absoluteUrl(alternates[locale])
    })
    // x-default → the ES URL, matching the hreflang emitted in <head>.
    // SEO-01 §7.2 / AC-13.
    languageAlternates['x-default'] = absoluteUrl(alternates.es)

    // Content date, maintained per page — never a build timestamp.
    // SEO-01 §7.2 · SEO-01a §4b (see lib/seo/lastmod.ts for why).
    const lastModified = getLastModified(page)

    // One sitemap entry per locale URL, each with full language alternates
    LOCALES.forEach((locale) => {
      entries.push({
        url: absoluteUrl(getPath(page, locale, params)),
        lastModified,
        alternates: {
          languages: languageAlternates,
        },
      })
    })
  }

  return entries
}
