/**
 * Content-derived lastmod for the sitemap (SEO-01 §7.2).
 *
 * The spec requires a REAL lastmod "derived from content, not build time".
 * Each route's copy lives in a known content module, so the modification time
 * of that file is the honest signal: it changes when the page's copy changes
 * and stays put when unrelated code is deployed.
 *
 * Read at module scope (build/server start) with `statSync` — this runs on the
 * server only, inside the sitemap route.
 */

import { statSync } from 'node:fs'
import path from 'node:path'
import type { PageId } from '@/lib/i18n/types'

/**
 * Content files backing each route, relative to the repo root.
 * A page's date is the NEWEST mtime across its locale dictionaries, so a
 * translation-only change still refreshes the date for every locale URL.
 */
const CONTENT_SOURCES: Record<PageId, readonly string[]> = {
  home: ['content/es/home.ts', 'content/en/home.ts', 'content/ca/home.ts'],
  services: [
    'content/es/services.ts',
    'content/en/services.ts',
    'content/ca/services.ts',
  ],
  method: [
    'content/es/method.ts',
    'content/en/method.ts',
    'content/ca/method.ts',
  ],
  cases: ['content/es/cases.ts', 'content/en/cases.ts', 'content/ca/cases.ts'],
  caseDetail: ['content/data/cases.ts'],
  alliance: [
    'content/es/alliance.ts',
    'content/en/alliance.ts',
    'content/ca/alliance.ts',
  ],
  about: ['content/es/about.ts', 'content/en/about.ts', 'content/ca/about.ts'],
  contact: [
    'content/es/contact.ts',
    'content/en/contact.ts',
    'content/ca/contact.ts',
  ],
  legal: ['content/es/legal.ts', 'content/en/legal.ts', 'content/ca/legal.ts'],
  privacy: [
    'content/es/privacy.ts',
    'content/en/privacy.ts',
    'content/ca/privacy.ts',
  ],
}

/**
 * Newest mtime among a page's content files.
 *
 * Falls back to `undefined` when a file cannot be stat'ed (e.g. a trimmed
 * production image) — Next then omits <lastmod> for that URL, which is
 * correct: a wrong date is worse than no date.
 */
export function getLastModified(page: PageId): Date | undefined {
  const files = CONTENT_SOURCES[page]
  let newest: number | undefined

  for (const file of files) {
    try {
      const { mtimeMs } = statSync(path.join(process.cwd(), file))
      if (newest === undefined || mtimeMs > newest) newest = mtimeMs
    } catch {
      // Unreadable file → ignore it and rely on the remaining sources.
    }
  }

  return newest === undefined ? undefined : new Date(newest)
}
