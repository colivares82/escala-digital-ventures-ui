/**
 * Content-derived lastmod for the sitemap (SEO-01 §7.2 · SEO-01a §4b).
 *
 * ── Why this is a maintained table and not a filesystem or git lookup ──
 * The previous implementation used `statSync().mtimeMs` on each route's
 * content modules. That is correct in principle and worked locally, but it
 * cannot survive this project's container build: `Dockerfile` line 40 does a
 * `COPY . .`, and Docker sets the mtime of every copied file to the layer
 * creation time. Every content file therefore ends up with one identical
 * timestamp, frozen at image-build time.
 *
 * The live consequence, confirmed on 13 Sep 2026: all 33 sitemap entries
 * carried `2026-08-17T22:01:53Z`, a build timestamp that predated the SEO-01
 * deployment. Google reads that as "nothing changed since 17 August" and
 * deprioritises recrawling — the most likely reason the SEO-01 metadata had
 * not been picked up.
 *
 * Deriving the date from git (SEO-01a §4b option 1) is also impossible here:
 * `.git` is not present in the build image, so `git log` cannot run at build
 * or request time. A fresh build timestamp (option 3) is explicitly a last
 * resort and would still move every URL on every unrelated deploy.
 *
 * That leaves option 2: an explicit per-page date, maintained here. It is
 * honest (it only moves when a human moves it), stable across rebuilds, and
 * differs per page. The cost is that it must be updated by hand when a page's
 * copy changes — see the contract below.
 */

import type { PageId } from '@/lib/i18n/types'

/**
 * Date each route's content last changed, as a W3C `YYYY-MM-DD` string (UTC).
 *
 * ⚠️ CONTRACT: when you change a page's copy in `content/{es,en,ca}/<page>.ts`
 * (or `content/data/cases.ts` for case details), update that page's date here
 * in the same commit. A stale date here is invisible in the UI and only shows
 * up as suppressed recrawling weeks later.
 *
 * Seeded to the SEO-01a deployment date for every page, which is accurate:
 * SEO-01 rewrote the metadata of all 27 page metas + 6 case metas, so every
 * route genuinely changed. Dates are intentionally allowed to diverge from
 * this point on — that divergence is the signal Google needs.
 */
export const PAGE_LAST_MODIFIED: Record<PageId, string> = {
  home: '2026-09-13',
  services: '2026-09-13',
  method: '2026-09-13',
  cases: '2026-09-13',
  caseDetail: '2026-09-13',
  alliance: '2026-09-13',
  about: '2026-09-13',
  contact: '2026-09-13',
  legal: '2026-09-13',
  privacy: '2026-09-13',
  // LANDING-01 — ES-only, noindex, never emitted in the sitemap. Kept only
  // because this record is exhaustive over PageId.
  oportunidad: '2026-09-28',
}

/**
 * The `lastmod` value for a route, as a `YYYY-MM-DD` string.
 *
 * Date-level precision is deliberate (SEO-01a §4b): Google ignores anything
 * finer, and the millisecond timestamps the old implementation emitted were
 * pure noise that made the all-identical bug harder to spot.
 */
export function getLastModified(page: PageId): string {
  return PAGE_LAST_MODIFIED[page]
}
