/**
 * JSON-LD node builders (SEO-01 §6).
 *
 * Every page emits exactly ONE <script type="application/ld+json"> containing
 * an @graph (AC-8). No node may appear twice on a page, so builders are pure
 * and the page composes the list once (see lib/seo/graph.ts).
 *
 * Hard rules enforced here:
 *   - locality-level address only; no streetAddress, no postalCode (AC-9)
 *   - Organization.sameAs never carries a personal profile (AC-10)
 *   - no telephone node (§6.1)
 *   - no vatID/taxID while /aviso-legal still holds placeholder tokens (§10.1)
 */

import { SITE_URL } from '@/lib/config'
import {
  FOUNDER_NAME,
  FOUNDER_SAME_AS,
  ORG_ADDRESS,
  ORG_AREA_SERVED,
  ORG_EMAIL,
  ORG_FOUNDING_DATE,
  ORG_LEGAL_NAME,
  ORG_NAME,
  ORG_SAME_AS,
  SCHEMA_IDS,
  WEBPAGE_ID_SUFFIX,
} from '@/lib/constants/seo'
import {
  CANONICAL_DEFINITION,
  FOUNDER_CREDENTIAL,
  FOUNDER_JOB_TITLE,
  KNOWS_ABOUT,
} from '@/lib/seo/entity'
import type { Locale } from '@/lib/i18n/types'
import type {
  BreadcrumbEntry,
  FaqItem,
  SchemaNode,
  SchemaRef,
} from '@/lib/seo/types'

/** Reference another graph node by @id. */
const ref = (id: string): SchemaRef => ({ '@id': id })

/** BCP-47 language tag for schema `inLanguage`. */
const IN_LANGUAGE: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en-GB',
  ca: 'ca-ES',
}

export const inLanguage = (locale: Locale): string => IN_LANGUAGE[locale]

/** Place nodes for areaServed, shared by Organization and Service. */
const areaServedNodes = () =>
  ORG_AREA_SERVED.map((name) => ({ '@type': 'Place', name }))

// ---------------------------------------------------------------------------
// §6.1 Organization + ProfessionalService (site-wide)
// ---------------------------------------------------------------------------

export function buildOrganization(
  locale: Locale,
  options: { readonly slogan: string; readonly logoUrl?: string },
): SchemaNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': SCHEMA_IDS.organization,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    description: CANONICAL_DEFINITION[locale],
    url: SITE_URL,
    email: ORG_EMAIL,
    foundingDate: ORG_FOUNDING_DATE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG_ADDRESS.locality,
      addressRegion: ORG_ADDRESS.region,
      addressCountry: ORG_ADDRESS.country,
    },
    areaServed: areaServedNodes(),
    knowsAbout: KNOWS_ABOUT[locale],
    slogan: options.slogan,
    founder: ref(SCHEMA_IDS.founder),
    // Omitted entirely while empty — an empty array is noise (§6.1 / AC-10).
    ...(ORG_SAME_AS.length > 0 ? { sameAs: ORG_SAME_AS } : {}),
    // Omitted rather than pointing at a placeholder asset (§10.5).
    ...(options.logoUrl
      ? {
          logo: { '@type': 'ImageObject', url: options.logoUrl },
          image: options.logoUrl,
        }
      : {}),
  }
}

// ---------------------------------------------------------------------------
// §6.2 Person (founder)
// ---------------------------------------------------------------------------

export function buildFounder(locale: Locale): SchemaNode {
  return {
    '@type': 'Person',
    '@id': SCHEMA_IDS.founder,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_JOB_TITLE[locale],
    worksFor: ref(SCHEMA_IDS.organization),
    sameAs: FOUNDER_SAME_AS,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: FOUNDER_CREDENTIAL[locale],
    },
  }
}

// ---------------------------------------------------------------------------
// §6.3 WebSite — no SearchAction (there is no site search)
// ---------------------------------------------------------------------------

export function buildWebSite(locale: Locale): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': SCHEMA_IDS.website,
    url: SITE_URL,
    name: ORG_NAME,
    publisher: ref(SCHEMA_IDS.organization),
    inLanguage: inLanguage(locale),
  }
}

// ---------------------------------------------------------------------------
// §6.4 WebPage (every page)
// ---------------------------------------------------------------------------

export function buildWebPage(args: {
  readonly url: string
  readonly name: string
  readonly description: string
  readonly locale: Locale
  readonly primaryImageUrl?: string
}): SchemaNode {
  return {
    '@type': 'WebPage',
    '@id': `${args.url}${WEBPAGE_ID_SUFFIX}`,
    url: args.url,
    name: args.name,
    description: args.description,
    isPartOf: ref(SCHEMA_IDS.website),
    about: ref(SCHEMA_IDS.organization),
    inLanguage: inLanguage(args.locale),
    ...(args.primaryImageUrl
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: args.primaryImageUrl,
          },
        }
      : {}),
  }
}

// ---------------------------------------------------------------------------
// §6.5 BreadcrumbList — every page below the root
// ---------------------------------------------------------------------------

export function buildBreadcrumbs(
  entries: readonly BreadcrumbEntry[],
): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  }
}

// ---------------------------------------------------------------------------
// §6.6 Service ×5 (/que-hacemos only)
// ---------------------------------------------------------------------------

export function buildService(args: {
  readonly name: string
  readonly description: string
  readonly locale: Locale
  readonly serviceType: string
}): SchemaNode {
  return {
    '@type': 'Service',
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    provider: ref(SCHEMA_IDS.organization),
    areaServed: areaServedNodes(),
    inLanguage: inLanguage(args.locale),
  }
}

// ---------------------------------------------------------------------------
// §6.7 Article (case studies) — no Review, no AggregateRating, no invented date
// ---------------------------------------------------------------------------

export function buildArticle(args: {
  readonly url: string
  readonly headline: string
  readonly description: string
  readonly locale: Locale
  readonly about: string
  readonly datePublished?: string
}): SchemaNode {
  return {
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    url: args.url,
    author: ref(SCHEMA_IDS.organization),
    publisher: ref(SCHEMA_IDS.organization),
    inLanguage: inLanguage(args.locale),
    about: args.about,
    ...(args.datePublished ? { datePublished: args.datePublished } : {}),
  }
}

// ---------------------------------------------------------------------------
// §6.8 FAQPage — ONLY where a visible Q&A block exists; text must match exactly
// ---------------------------------------------------------------------------

export function buildFaqPage(items: readonly FaqItem[]): SchemaNode {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ---------------------------------------------------------------------------
// §6.9 ContactPage
// ---------------------------------------------------------------------------

export function buildContactPage(args: {
  readonly url: string
  readonly name: string
  readonly description: string
  readonly locale: Locale
}): SchemaNode {
  return {
    '@type': 'ContactPage',
    '@id': `${args.url}${WEBPAGE_ID_SUFFIX}`,
    url: args.url,
    name: args.name,
    description: args.description,
    isPartOf: ref(SCHEMA_IDS.website),
    mainEntity: ref(SCHEMA_IDS.organization),
    inLanguage: inLanguage(args.locale),
  }
}
