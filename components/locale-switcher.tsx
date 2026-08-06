/**
 * LocaleSwitcher — preserves the current page when switching locale.
 * Spec: SPEC-P1 FR-5
 *
 * languagesLabel comes from the locale-aware shared dictionary (SPEC-P5 FR-5).
 */
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
        >
          {loc.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}
