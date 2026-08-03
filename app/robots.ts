/**
 * robots.txt — allow all, disallow developer-only routes.
 * Spec: SPEC-P1 FR-4.4
 */
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/styleguide',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
