/**
 * Analytics facade over the official `@savri/tracker` SDK — FEAT-01.
 *
 * Why a facade instead of the SDK's `useTracker()` hook directly: `useTracker()`
 * THROWS when no SavriProvider is mounted, and the provider is intentionally
 * absent outside production (D3 / R1). Components therefore call `trackEvent`
 * from here, which is a silent no-op whenever tracking is disabled — so
 * localhost and dev make zero network calls and never crash.
 *
 * No personal data ever passes through here (D6): callers only send the fixed
 * slugs/locale values typed below, never form field values.
 */
import { trackEvent as savriTrackEvent } from '@savri/tracker'
import {
  PRODUCTION_HOSTNAMES,
  SAVRI_SITE_ID,
  type AnalyticsEventName,
} from '@/lib/constants/analytics'
import { LOCALES, type Locale } from '@/lib/i18n/types'

export type AnalyticsProps = Record<string, string>

/**
 * True only on a production hostname AND with a configured site ID.
 * `siteId` is injectable for tests; defaults to the versioned constant.
 */
export function isAnalyticsEnabled(
  hostname: string,
  siteId: string = SAVRI_SITE_ID,
): boolean {
  return siteId.length > 0 && PRODUCTION_HOSTNAMES.includes(hostname)
}

/** Browser-side check. Always false during SSR/prerender. */
export function isAnalyticsEnabledInBrowser(): boolean {
  if (typeof window === 'undefined') return false
  return isAnalyticsEnabled(window.location.hostname)
}

/**
 * Derives the active locale from a pathname. ES is served at the root with no
 * prefix; EN/CA use `/en` and `/ca` (lib/i18n/routes.ts).
 */
export function getLocaleFromPath(pathname: string): Locale {
  const first = pathname.split('/')[1] ?? ''
  const match = LOCALES.find((loc) => loc !== 'es' && loc === first)
  return match ?? 'es'
}

/** Current locale from the browser location (defaults to ES during SSR). */
export function getCurrentLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  return getLocaleFromPath(window.location.pathname)
}

/** Sends a custom event — no-op unless analytics is enabled. */
export function trackEvent(name: AnalyticsEventName, props: AnalyticsProps): void {
  if (!isAnalyticsEnabledInBrowser()) return
  savriTrackEvent(name, props)
}
