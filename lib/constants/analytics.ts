/**
 * Analytics constants — FEAT-01 (cookieless analytics via Savri).
 *
 * Single source of truth for every analytics literal (engineering-foundations:
 * no hardcoded values). Nothing analytics-related is inlined elsewhere.
 *
 * Spec: FEAT-01 §1 · §2 · §3
 */

/**
 * Savri site ID (R2). Public — it is visible in the browser on every request —
 * so it lives in versioned config rather than an env var. This also sidesteps
 * the SSG trap: a runtime env var would never reach prerendered HTML.
 *
 * Fail-closed: while this is empty, tracking stays disabled everywhere,
 * including production. TODO(FEAT-01 §6.1): Carlos to supply the ID before
 * the prod deploy.
 */
export const SAVRI_SITE_ID = ''

/**
 * Upstream Savri origin + collect path, read from the installed SDK
 * (`@savri/tracker@1.0.0` dist/index.js: default apiUrl + `/api/collect`).
 * It is the ONLY endpoint the SDK calls, so the proxy forwards only this.
 *
 * AC-5 fallback: if the proxy cannot preserve visitor country, point the SDK
 * straight at this origin by setting ANALYTICS_API_URL = SAVRI_UPSTREAM_ORIGIN.
 */
export const SAVRI_UPSTREAM_ORIGIN = 'https://besokskollen.se'
export const SAVRI_COLLECT_PATH = '/api/collect'
export const SAVRI_COLLECT_URL = `${SAVRI_UPSTREAM_ORIGIN}${SAVRI_COLLECT_PATH}`

/**
 * First-party proxy (D4 / R4). The SDK hard-codes the `/api/collect` suffix and
 * appends it to `apiUrl`, so an apiUrl of `/io` makes the browser POST to
 * `/io/api/collect` (served by app/io/api/collect/route.ts). Neutral prefix —
 * avoids the ad-blocker names (`/analytics`, `/tracking`, `/savri`, `/stats`),
 * cannot collide with `/api/contact`, and is not `_`-prefixed (Next.js treats
 * `_folders` in app/ as private, non-routable).
 */
export const ANALYTICS_API_URL = '/io'
export const ANALYTICS_PROXY_PATH = `${ANALYTICS_API_URL}${SAVRI_COLLECT_PATH}`

/**
 * Hostnames on which tracking is active (R1 / D3). Evaluated at runtime in the
 * browser because the same image is deployed to dev and prod — a build-time
 * flag would be identical in both. Anything else (localhost, *.run.app, dev) is
 * disabled with zero network calls.
 */
export const PRODUCTION_HOSTNAMES: readonly string[] = [
  'www.escaladigitalventures.com',
  'escaladigitalventures.com',
]

/** Custom event names (§3). English and identical across locales (D7). */
export const ANALYTICS_EVENTS = {
  CONTACT_SUBMITTED: 'Contact Submitted',
  CTA_CLICK: 'CTA Click',
  EMAIL_CLICK: 'Email Click',
  LOCALE_SWITCH: 'Locale Switch',
} as const

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]

/** Stable `location` slugs for CTA Click / Email Click (§3). */
export const ANALYTICS_LOCATIONS = {
  /** Desktop header «Hablemos» (CTA) */
  HEADER: 'header',
  /** Mobile overlay «Hablemos» (CTA) + overlay email (Email) */
  MOBILE_MENU: 'mobile-menu',
  /** Home hero primary CTA (CTA) */
  HERO: 'hero',
  /** Footer «Hablemos» link (CTA) + footer email (Email) */
  FOOTER: 'footer',
  /** /que-hacemos «¿Encajamos?» CTA (CTA) */
  IDEAL_CLIENT: 'ideal-client',
  /** /oportunidad hero primary CTA (CTA) */
  OPORTUNIDAD_HERO: 'oportunidad-hero',
  /** /oportunidad «¿Te suena?» diagnosis panel CTA (CTA) */
  DIAGNOSIS_PANEL: 'diagnosis-panel',
  /** Email in the /contacto page meta block (Email) */
  CONTACT_PAGE: 'contact-page',
  /** Email in the FinalCTA contact section at the end of pages (Email) */
  FINAL_CTA: 'final-cta',
  /** Email fallback links inside the contact form's error states (Email) */
  CONTACT_FORM: 'contact-form',
} as const

export type AnalyticsLocation =
  (typeof ANALYTICS_LOCATIONS)[keyof typeof ANALYTICS_LOCATIONS]
