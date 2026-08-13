/**
 * /llms.txt — plain-text machine summary of the site (SEO-01 §7.5).
 *
 * Served as text/plain so crawlers and language models read it directly
 * (AC-18). Content is built in lib/seo/llms-txt.ts; this handler only serves.
 *
 * A Route Handler (not a static file in public/) so the URLs and the canonical
 * definition come from the same single sources the rest of the site uses —
 * a public/ copy would silently drift.
 */

import { buildLlmsTxt } from '@/lib/seo/llms-txt'

/** Static: the content depends only on committed source, not on the request. */
export const dynamic = 'force-static'

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Long-lived but revalidatable: the file changes only on deploy.
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  })
}
