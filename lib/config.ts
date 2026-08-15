/**
 * Site-level configuration constants.
 * Values that vary by environment are read from env vars with safe defaults.
 */

/**
 * Canonical origin for absolute URLs (sitemap, hreflang, OG, JSON-LD).
 *
 * Canonical host is `www` (R-7.9): the apex is served via hardcoded Google A/AAAA
 * records, whereas `www` is a CNAME to ghs.googlehosted.com and therefore survives
 * Google rotating its front-end IPs. The apex 301-redirects to `www` in
 * next.config.mjs — keep both in sync or the redirect will contradict the sitemap.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.escaladigitalventures.com'
