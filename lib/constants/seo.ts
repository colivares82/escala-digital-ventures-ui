/**
 * SEO constants — crawl policy, Open Graph, and structured-data identifiers.
 *
 * Single source of truth for every SEO literal. No SEO string may be inlined
 * in a route handler or component (engineering-foundations: no hardcoded values).
 *
 * Spec: SEO-01 §3.5 · §6 · §7.1
 */

import { SITE_URL } from '@/lib/config'
import type { Locale } from '@/lib/i18n/types'

// ---------------------------------------------------------------------------
// Organization identity (SEO-01 §6.1)
// ---------------------------------------------------------------------------

export const ORG_NAME = 'Escala Digital Ventures'

/**
 * Read from /aviso-legal § 01 "Denominación" — never invented (SEO-01 §10.1).
 * Source: content/{es,en,ca}/legal.ts, section id 'titular'.
 */
export const ORG_LEGAL_NAME = 'Escala Digital Ventures, S.L.U.'

export const ORG_EMAIL = 'hola@escaladigitalventures.com'

/** SEO-01 §0.4 — founded 2026, Mataró (Barcelona). */
export const ORG_FOUNDING_DATE = '2026'

/**
 * Locality-level address only. SEO-01 §0.3 forbids any street address
 * and §6.1 forbids streetAddress / postalCode in structured data.
 */
export const ORG_ADDRESS = {
  locality: 'Mataró',
  region: 'Barcelona',
  country: 'ES',
} as const

/** SEO-01 §6.1 — areaServed. */
export const ORG_AREA_SERVED = ['Spain', 'Europe'] as const

/**
 * Stable @id fragments so JSON-LD nodes can reference each other across pages
 * (SEO-01 §6). Absolute, rooted at the canonical origin.
 */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  founder: `${SITE_URL}/#carlos-olivares`,
  website: `${SITE_URL}/#website`,
} as const

/** Suffix appended to a page URL to build its WebPage @id (SEO-01 §6.4). */
export const WEBPAGE_ID_SUFFIX = '#webpage'

// ---------------------------------------------------------------------------
// Founder (SEO-01 §6.2 · §10.3 / §10.4)
// ---------------------------------------------------------------------------

export const FOUNDER_NAME = 'Carlos Olivares'

/**
 * Confirmed by the owner (SEO-01 §10.3). LinkedIn answers unauthenticated
 * requests with a 301 to its auth wall, so the handle cannot be verified over
 * HTTP — it is authoritative by owner statement.
 */
export const FOUNDER_SAME_AS = [
  'https://www.linkedin.com/in/carlosolivaresve/',
  'https://github.com/colivares82',
] as const

/**
 * Organization.sameAs stays EMPTY until the company LinkedIn page exists
 * (SEO-01 §10.2 / AC-10). Never populate it with a personal profile, and never
 * reference colivares.com (SEO-01 §0.3).
 */
export const ORG_SAME_AS: readonly string[] = []

// ---------------------------------------------------------------------------
// Open Graph / Twitter (SEO-01 §3.5)
// ---------------------------------------------------------------------------

export const OG_SITE_NAME = 'Escala Digital Ventures'

/** og:locale per locale. EN targets Europe → en_GB, not en_US (SEO-01 §3.5 · §8). */
export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_GB',
  ca: 'ca_ES',
}

export const TWITTER_CARD_TYPE = 'summary_large_image'

/**
 * The social card image (BRAND-01 Z5 · §7).
 *
 * ONE image serves all three locales: it carries no text, so it needs no
 * translation and produces no dictionary keys (§7). 1200×630.
 *
 * ── Why this is declared explicitly rather than left to the file convention ──
 * `app/opengraph-image.*` only applies to routes in its OWN segment, and every
 * page here renders from the optional catch-all `app/[[...path]]/`. Next.js
 * refuses to place a metadata file inside an optional catch-all ("Optional
 * catch-all must be the last part of the URL"), so the asset cannot be
 * colocated with the pages either.
 *
 * Net effect: `og:image` was NEVER emitted on any page — verified empirically
 * against the pre-BRAND-01 commit, so this is a PRE-EXISTING bug, not a
 * regression from the brand swap. SEO-01 fixed the sibling bug (an explicit
 * `openGraph.images` override suppressing injection) but the injection it was
 * protecting never reached these routes. Declaring the URL here is the
 * supported fix and keeps the asset a static file.
 */
export const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: ORG_NAME,
} as const

// ---------------------------------------------------------------------------
// Icons (BRAND-01 Z5 · §7)
// ---------------------------------------------------------------------------

/**
 * Browser icon set. Served from `public/brand/` and declared explicitly for the
 * same reason as OG_IMAGE: file-convention metadata in `app/` does not reach the
 * optional catch-all that renders every page.
 */
export const FAVICON_SIZES = [16, 32, 48, 96, 192, 512] as const

export const FAVICON_ICONS = FAVICON_SIZES.map((size) => ({
  url: `/brand/favicon-${size}.png`,
  sizes: `${size}x${size}`,
  type: 'image/png',
}))

/**
 * iOS home-screen icon: 180×180, full bleed. The asset must NOT be pre-rounded
 * — iOS applies its own corner radius (§7).
 */
export const APPLE_TOUCH_ICON = {
  url: '/brand/apple-touch-icon.png',
  sizes: '180x180',
  type: 'image/png',
} as const

/** The brand suffix stripped from og:title (SEO-01 §3.5). */
export const BRAND_TITLE_SUFFIX = ' | Escala'

// ---------------------------------------------------------------------------
// Crawl policy (SEO-01 §7.1)
// ---------------------------------------------------------------------------

/**
 * AI crawlers explicitly allowed by name so the policy is auditable.
 * Decision recorded in SEO-01 §7.1: Carlos permits AI crawlers, including
 * training crawlers. Revisit only on explicit instruction.
 */
export const ALLOWED_AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bingbot',
  'Googlebot',
] as const

/** Paths no crawler should index (SEO-01 §7.1). */
export const CRAWL_DISALLOW = ['/api/', '/styleguide'] as const

/** Route path for the LLM-facing plain-text summary (SEO-01 §7.5). */
export const LLMS_TXT_PATH = '/llms.txt'
