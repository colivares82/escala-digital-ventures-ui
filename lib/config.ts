/**
 * Site-level configuration constants.
 * Values that vary by environment are read from env vars with safe defaults.
 */

/** Canonical origin for absolute URLs (sitemap, hreflang, OG). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://escaladigitalventures.com'
