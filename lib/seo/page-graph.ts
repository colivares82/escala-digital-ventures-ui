/**
 * Route → @graph adapter (SEO-01 §6).
 *
 * Reads the resolved route's dictionary and produces the GraphInput that
 * lib/seo/graph.ts turns into JSON-LD. All localised strings come from the
 * content dictionaries — nothing is authored here (no hardcoded copy).
 */

import { SITE_URL } from '@/lib/config'
import { getPath } from '@/lib/i18n/routes'
import type { Dictionary } from '@/lib/i18n/dictionary'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import { buildGraph, type GraphInput } from '@/lib/seo/graph'
import type { BreadcrumbEntry, FaqItem, SchemaGraph } from '@/lib/seo/types'
import { getCase } from '@/content/data/cases'

/** Shape of the optional FAQ block carried by a page dictionary (§5). */
interface FaqCarrier {
  readonly faq?: {
    readonly heading: string
    readonly items: readonly FaqItem[]
  }
}

/** Shape of the five service lines on /que-hacemos (§6.6). */
interface ServiceCarrier {
  readonly services?: readonly {
    readonly title: string
    readonly deliverable: string
  }[]
}

/** Page dictionaries expose a `meta` plus, on some pages, extra SEO carriers. */
type PageDictionary = {
  readonly meta: { readonly title: string; readonly description: string }
} & FaqCarrier &
  ServiceCarrier

/**
 * The dictionary slice for a page id. `caseDetail` has no slice of its own —
 * its copy lives in content/data/cases.ts — so it borrows `cases`.
 */
function dictFor(dict: Dictionary, page: PageId): PageDictionary {
  const map: Record<PageId, unknown> = {
    home: dict.home,
    services: dict.services,
    method: dict.method,
    cases: dict.cases,
    caseDetail: dict.cases,
    alliance: dict.alliance,
    about: dict.about,
    contact: dict.contact,
    legal: dict.legal,
    privacy: dict.privacy,
  }
  return map[page] as PageDictionary
}

/**
 * Breadcrumb trail for a page (§6.5). Root first, localised labels, absolute
 * URLs. The home page gets an empty trail — a single-item breadcrumb is noise.
 *
 * Labels reuse existing navigation copy so no new strings are introduced.
 */
function breadcrumbsFor(
  dict: Dictionary,
  page: PageId,
  locale: Locale,
  params?: PageParams,
): readonly BreadcrumbEntry[] {
  if (page === 'home') return []

  const homeLabel = dict.shared.header.brand
  const trail: BreadcrumbEntry[] = [
    { name: homeLabel, url: `${SITE_URL}${getPath('home', locale)}` },
  ]

  // A case detail sits under the cases index: ESCALA / Casos / <Client>.
  if (page === 'caseDetail' && params?.slug) {
    const casesLabel = navLabel(dict, 'cases') ?? dict.cases.meta.title
    trail.push({
      name: casesLabel,
      url: `${SITE_URL}${getPath('cases', locale)}`,
    })
    const caseData = getCase(params.slug)
    if (caseData) {
      trail.push({
        name: caseData.brand.name,
        url: `${SITE_URL}${getPath('caseDetail', locale, params)}`,
      })
    }
    return trail
  }

  trail.push({
    name: navLabel(dict, page) ?? dictFor(dict, page).meta.title,
    url: `${SITE_URL}${getPath(page, locale, params)}`,
  })
  return trail
}

/** Short nav label for a page, when the header carries one. */
function navLabel(dict: Dictionary, page: PageId): string | undefined {
  const nav = dict.shared.header.nav as readonly {
    readonly label: string
    readonly pageId: string
  }[]
  return nav.find((item) => item.pageId === page)?.label
}

/** Build the JSON-LD graph for a resolved route. */
export function buildPageGraph(args: {
  readonly dict: Dictionary
  readonly page: PageId
  readonly locale: Locale
  readonly params?: PageParams
}): SchemaGraph {
  const { dict, page, locale, params } = args
  const pageDict = dictFor(dict, page)

  // Case details carry their own locale-keyed meta (content/data/cases.ts).
  const caseData =
    page === 'caseDetail' && params?.slug ? getCase(params.slug) : null
  const caseMeta = caseData?.metaByLocale?.[locale] ?? caseData?.meta

  const title = caseMeta?.title ?? pageDict.meta.title
  const description = caseMeta?.description ?? pageDict.meta.description

  const input: GraphInput = {
    page,
    locale,
    params,
    title,
    description,
    // Primary claim in the page's locale → Organization.slogan (§6.1).
    slogan: dict.shared.footer.claim,
    breadcrumbs: breadcrumbsFor(dict, page, locale, params),
    // §6.6 — five Service nodes, /que-hacemos only. Descriptions are drawn
    // from existing on-page copy, never newly authored.
    ...(page === 'services' && pageDict.services
      ? {
          services: pageDict.services.map((service) => ({
            name: service.title,
            description: service.deliverable,
            serviceType: service.title,
          })),
        }
      : {}),
    // §6.8 — FAQPage only where a visible Q&A block exists; text is the same
    // object the component renders, so the two cannot drift (AC-11).
    ...(pageDict.faq ? { faq: pageDict.faq.items } : {}),
    // §6.7 — Article on case pages. `about` names the sector, taken from the
    // locale-correct dossier (falls back to the ES sector). No invented date:
    // `datePublished` is omitted because no publication date is recorded.
    ...(caseData
      ? {
          article: {
            about:
              caseData.dossierByLocale?.[locale]?.sector ?? caseData.sector,
          },
        }
      : {}),
  }

  return buildGraph(input)
}
