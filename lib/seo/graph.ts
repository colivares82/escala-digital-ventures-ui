/**
 * Per-page @graph composition (SEO-01 §6).
 *
 * One graph per page, built once. AC-8: exactly one JSON-LD script per page,
 * zero duplicate nodes. The page-type switch below is the single place that
 * decides which nodes a route carries.
 */

import { SITE_URL } from '@/lib/config'
import { getPath } from '@/lib/i18n/routes'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import {
  buildArticle,
  buildBreadcrumbs,
  buildContactPage,
  buildFaqPage,
  buildFounder,
  buildOrganization,
  buildService,
  buildWebPage,
  buildWebSite,
} from '@/lib/seo/schema'
import type {
  BreadcrumbEntry,
  FaqItem,
  SchemaGraph,
  SchemaNode,
} from '@/lib/seo/types'

/** Everything a page needs to describe itself structurally. */
export interface GraphInput {
  readonly page: PageId
  readonly locale: Locale
  readonly params?: PageParams
  readonly title: string
  readonly description: string
  /** Primary claim in the page's locale → Organization.slogan (§6.1). */
  readonly slogan: string
  /** Absolute breadcrumb trail, root first. Empty on the home page (§6.5). */
  readonly breadcrumbs: readonly BreadcrumbEntry[]
  /** Five service lines — /que-hacemos only (§6.6). */
  readonly services?: readonly {
    readonly name: string
    readonly description: string
    readonly serviceType: string
  }[]
  /** Visible Q&A, mirrored verbatim into FAQPage (§6.8 / AC-11). */
  readonly faq?: readonly FaqItem[]
  /** Case-study framing — caseDetail only (§6.7). */
  readonly article?: {
    readonly about: string
    readonly datePublished?: string
  }
  /** Absolute OG image URL, reused as primaryImageOfPage (§6.4). */
  readonly primaryImageUrl?: string
}

/** Absolute canonical URL for a page. */
export function absoluteUrl(
  page: PageId,
  locale: Locale,
  params?: PageParams,
): string {
  return `${SITE_URL}${getPath(page, locale, params)}`
}

/**
 * Compose the full graph for one page.
 *
 * Node order is stable and meaningful for readability of the emitted JSON:
 * Organization → Person → WebSite → (WebPage | ContactPage) → Breadcrumbs
 * → Services → Article → FAQPage.
 */
export function buildGraph(input: GraphInput): SchemaGraph {
  const url = absoluteUrl(input.page, input.locale, input.params)

  const nodes: SchemaNode[] = [
    buildOrganization(input.locale, { slogan: input.slogan }),
    buildFounder(input.locale),
    buildWebSite(input.locale),
  ]

  // §6.9 — /contacto uses ContactPage INSTEAD of WebPage, so the page is
  // described exactly once (no duplicate @id).
  if (input.page === 'contact') {
    nodes.push(
      buildContactPage({
        url,
        name: input.title,
        description: input.description,
        locale: input.locale,
      }),
    )
  } else {
    nodes.push(
      buildWebPage({
        url,
        name: input.title,
        description: input.description,
        locale: input.locale,
        primaryImageUrl: input.primaryImageUrl,
      }),
    )
  }

  // §6.5 — only below the root.
  if (input.breadcrumbs.length > 0) {
    nodes.push(buildBreadcrumbs(input.breadcrumbs))
  }

  // §6.6 — /que-hacemos only.
  input.services?.forEach((service) => {
    nodes.push(
      buildService({
        name: service.name,
        description: service.description,
        serviceType: service.serviceType,
        locale: input.locale,
      }),
    )
  })

  // §6.7 — case study pages.
  if (input.article) {
    nodes.push(
      buildArticle({
        url,
        headline: input.title,
        description: input.description,
        locale: input.locale,
        about: input.article.about,
        datePublished: input.article.datePublished,
      }),
    )
  }

  // §6.8 — only the three pages with a visible Q&A block.
  if (input.faq && input.faq.length > 0) {
    nodes.push(buildFaqPage(input.faq))
  }

  return { '@context': 'https://schema.org', '@graph': nodes }
}
