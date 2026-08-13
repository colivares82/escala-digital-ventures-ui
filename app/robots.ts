/**
 * robots.txt — allow all, name every AI crawler explicitly, block dev routes.
 *
 * SEO-01 §7.1. AI crawlers (including training crawlers) are permitted by an
 * explicit decision recorded in the spec — revisit only on instruction. They
 * are listed BY NAME, even though `User-agent: *` already allows them, so the
 * policy is unambiguous and auditable at a glance (AC-12).
 *
 * No crawl-delay. Sitemap referenced absolutely.
 * Spec: SPEC-P1 FR-4.4 · SEO-01 §7.1
 */
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { ALLOWED_AI_CRAWLERS, CRAWL_DISALLOW } from '@/lib/constants/seo'

export default function robots(): MetadataRoute.Robots {
  const disallow = [...CRAWL_DISALLOW]

  return {
    rules: [
      // Default policy for every agent not named below.
      { userAgent: '*', allow: '/', disallow },
      // Named AI + search crawlers — same policy, stated explicitly.
      ...ALLOWED_AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
