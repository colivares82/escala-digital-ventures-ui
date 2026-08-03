/**
 * LocaleSwitcher — preserves the current page when switching locale.
 * Spec: SPEC-P1 FR-5
 *
 * Rules:
 *   - Links (not buttons): URL is the only source of locale truth (no JS, no cookies).
 *   - Active locale: --ambre colour via aria-current="page".
 *   - Inactive: 50% opacity.
 *   - Keyboard operable; visible focus ring.
 *   - Wrapped in <nav aria-label> per spec FR-5.3.
 */
import { sharedContent } from '@/content/es/shared'
import { getAlternates } from '@/lib/i18n/routes'
import { LOCALES, type Locale, type PageId, type PageParams } from '@/lib/i18n/types'

export function LocaleSwitcher({
  currentPage,
  locale,
  pageParams,
}: {
  currentPage: PageId
  locale: Locale
  pageParams?: PageParams
}) {
  const alternates = getAlternates(currentPage, pageParams)
  const { accessibility } = sharedContent

  return (
    <nav
      aria-label={accessibility.languages}
      className="locale-switcher"
    >
      {LOCALES.map((loc) => (
        <a
          key={loc}
          href={alternates[loc]}
          aria-current={loc === locale ? 'page' : undefined}
          className="locale-switcher__link"
        >
          {loc.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}
