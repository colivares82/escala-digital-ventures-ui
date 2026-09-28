/**
 * LocaleSwitcher — preserves the current page when switching locale.
 * Spec: SPEC-P1 FR-5
 *
 * languagesLabel comes from the locale-aware shared dictionary (SPEC-P5 FR-5).
 *
 * FEAT-01 §3: emits `Locale Switch` {from, to} on click. Behaviour-only — the
 * rendered markup is unchanged. `'use client'` is inert here: every parent
 * (SiteHeader, MobileMenu, SiteFooter via site-chrome) is already a client
 * component.
 */
'use client'

import { trackEvent } from '@/lib/analytics'
import { ANALYTICS_EVENTS } from '@/lib/constants/analytics'
import { getAlternates } from '@/lib/i18n/routes'
import { LOCALES, type Locale, type PageId, type PageParams } from '@/lib/i18n/types'

export function LocaleSwitcher({
  currentPage,
  locale,
  pageParams,
  languagesLabel,
}: {
  currentPage: PageId
  locale: Locale
  pageParams?: PageParams
  languagesLabel: string
}) {
  const alternates = getAlternates(currentPage, pageParams)

  return (
    <nav
      aria-label={languagesLabel}
      className="locale-switcher"
    >
      {LOCALES.map((loc) => (
        <a
          key={loc}
          href={alternates[loc]}
          aria-current={loc === locale ? 'page' : undefined}
          className="locale-switcher__link"
          onClick={() => {
            // Clicking the active locale is not a switch — no event.
            if (loc !== locale) {
              trackEvent(ANALYTICS_EVENTS.LOCALE_SWITCH, { from: locale, to: loc })
            }
          }}
        >
          {loc.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}

