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
  // Phase 4 — uncomment when legal pages are built:
  // { page: 'legal' },
  // { page: 'privacy' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const { page, params } of BUILT_PAGES) {
    const alternates = getAlternates(page, params)
    const languageAlternates: Record<string, string> = {}
    LOCALES.forEach((locale) => {
      languageAlternates[locale] = `${SITE_URL}${alternates[locale]}`
    })

    // One sitemap entry per locale URL, each with full language alternates
    LOCALES.forEach((locale) => {
      entries.push({
        url: `${SITE_URL}${getPath(page, locale, params)}`,
        alternates: {
          languages: languageAlternates,
        },
      })
    })
  }

  return entries
}
