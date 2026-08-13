/**
 * Per-page metadata assembly (SEO-01 §3 · §3.5).
 *
 * Keeps app/[[...path]]/page.tsx thin: this module owns the mapping from a
 * resolved route to a complete Next.js Metadata object, including Open Graph,
 * Twitter, canonical and hreflang.
 */

import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import {
  BRAND_TITLE_SUFFIX,
  OG_LOCALE,
  OG_SITE_NAME,
  TWITTER_CARD_TYPE,
} from '@/lib/constants/seo'
import { getAlternates, getPath } from '@/lib/i18n/routes'
import { LOCALES } from '@/lib/i18n/types'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'

/** Case-study pages are articles; everything else is a website (§3.5). */
const ARTICLE_PAGES: readonly PageId[] = ['caseDetail']

/**
 * og:title is the page title minus any trailing " | Escala" suffix (§3.5).
 * The suffix is a SERP disambiguator; inside a social card the site name is
 * already carried by og:site_name, so repeating it wastes the line.
 */
export function ogTitle(title: string): string {
  return title.endsWith(BRAND_TITLE_SUFFIX)
    ? title.slice(0, -BRAND_TITLE_SUFFIX.length)
    : title
}

/** The other two locales, for og:locale:alternate (§3.5). */
function alternateOgLocales(locale: Locale): string[] {
  return LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l])
}

export interface PageMetadataInput {
  readonly page: PageId
  readonly locale: Locale
  readonly params?: PageParams
  readonly title: string
  readonly description: string
}

/**
 * Build the complete Metadata object for one resolved route.
 *
 * Canonical, hreflang (es/en/ca + x-default → ES) and the full OG/Twitter set
 * are emitted for every page. og:image is left to Next.js, which injects the
 * app/opengraph-image.tsx file convention automatically — but ONLY if this
 * object does not override `openGraph.images`, so we deliberately omit it.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const { page, locale, params, title, description } = input

  const canonicalPath = getPath(page, locale, params)
  const canonical = `${SITE_URL}${canonicalPath}`
  const alternates = getAlternates(page, params)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}${alternates.es}`,
        en: `${SITE_URL}${alternates.en}`,
        ca: `${SITE_URL}${alternates.ca}`,
        'x-default': `${SITE_URL}${alternates.es}`,
      },
    },
    openGraph: {
      title: ogTitle(title),
      description,
      url: canonical,
      siteName: OG_SITE_NAME,
      type: ARTICLE_PAGES.includes(page) ? 'article' : 'website',
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: TWITTER_CARD_TYPE,
      title: ogTitle(title),
      description,
    },
  }
}
