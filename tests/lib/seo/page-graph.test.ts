/**
 * Per-page @graph composition — SEO-01 §6 / AC-8, AC-11.
 *
 * Asserts the graph a real route would emit, using the real dictionaries, so a
 * content change that breaks the contract fails here rather than in production.
 */

import { buildPageGraph } from '@/lib/seo/page-graph'
import { getDictionary } from '@/lib/i18n/dictionary'
import { LOCALES, type Locale, type PageId } from '@/lib/i18n/types'
import type { SchemaNode } from '@/lib/seo/types'

const typesOf = (nodes: readonly SchemaNode[]): string[] =>
  nodes.map((n) =>
    Array.isArray(n['@type']) ? n['@type'].join('+') : String(n['@type']),
  )

const graphFor = (
  page: PageId,
  locale: Locale = 'es',
  slug?: 'magupell' | 'biozero',
) =>
  buildPageGraph({
    dict: getDictionary(locale),
    page,
    locale,
    params: slug ? { slug } : undefined,
  })

/** Every page id, plus the two case-detail variants. */
const ALL_ROUTES: readonly { page: PageId; slug?: 'magupell' | 'biozero' }[] = [
  { page: 'home' },
  { page: 'services' },
  { page: 'method' },
  { page: 'cases' },
  { page: 'caseDetail', slug: 'magupell' },
  { page: 'caseDetail', slug: 'biozero' },
  { page: 'alliance' },
  { page: 'about' },
  { page: 'contact' },
  { page: 'legal' },
  { page: 'privacy' },
]

describe('buildPageGraph — universal invariants', () => {
  it('always uses the schema.org context', () => {
    expect(graphFor('home')['@context']).toBe('https://schema.org')
  })

  it.each(ALL_ROUTES)('emits no duplicate @id on $page', ({ page, slug }) => {
    for (const locale of LOCALES) {
      const nodes = graphFor(page, locale, slug)['@graph']
      const ids = nodes.map((n) => n['@id']).filter(Boolean)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it.each(ALL_ROUTES)('describes $page exactly once', ({ page, slug }) => {
    const nodes = graphFor(page, 'es', slug)['@graph']
    const pageNodes = typesOf(nodes).filter(
      (t) => t === 'WebPage' || t === 'ContactPage',
    )
    expect(pageNodes).toHaveLength(1)
  })

  it.each(ALL_ROUTES)(
    'carries Organization + Person + WebSite on $page',
    ({ page, slug }) => {
      const types = typesOf(graphFor(page, 'es', slug)['@graph'])
      expect(types).toContain('Organization+ProfessionalService')
      expect(types).toContain('Person')
      expect(types).toContain('WebSite')
    },
  )

  /**
   * AC-9 / AC-10 / §0.3 — checked on the serialised graph of every route.
   *
   * The placeholder pattern matches a TOKEN (`{{IDENTIFIER}}`), not a bare
   * `}}`: JSON.stringify emits `}}` legitimately whenever two objects close
   * together, so the looser form would flag every nested node.
   */
  it.each(ALL_ROUTES)(
    '$page leaks no address, placeholder or forbidden link',
    ({ page, slug }) => {
      for (const locale of LOCALES) {
        const json = JSON.stringify(graphFor(page, locale, slug))
        expect(json).not.toMatch(/streetAddress|postalCode/)
        expect(json).not.toMatch(/\{\{[A-Z_0-9]+\}\}/)
        expect(json).not.toMatch(/colivares\.com/)
      }
    },
  )
})

describe('buildPageGraph — breadcrumbs (§6.5)', () => {
  it('omits BreadcrumbList on the home page', () => {
    expect(typesOf(graphFor('home')['@graph'])).not.toContain('BreadcrumbList')
  })

  it.each(ALL_ROUTES.filter((r) => r.page !== 'home'))(
    'includes BreadcrumbList on $page',
    ({ page, slug }) => {
      expect(typesOf(graphFor(page, 'es', slug)['@graph'])).toContain(
        'BreadcrumbList',
      )
    },
  )

  it('nests a case detail under the cases index', () => {
    const nodes = graphFor('caseDetail', 'es', 'magupell')['@graph']
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList')
    const items = crumbs?.itemListElement as Record<string, unknown>[]
    expect(items).toHaveLength(3)
    expect(items[1].item).toContain('/casos-de-exito')
    expect(items[2].name).toBe('Magupell')
  })
})

describe('buildPageGraph — Service nodes (§6.6)', () => {
  it('emits exactly five Service nodes on /que-hacemos', () => {
    const types = typesOf(graphFor('services')['@graph'])
    expect(types.filter((t) => t === 'Service')).toHaveLength(5)
  })

  it.each(ALL_ROUTES.filter((r) => r.page !== 'services'))(
    'emits no Service node on $page',
    ({ page, slug }) => {
      expect(typesOf(graphFor(page, 'es', slug)['@graph'])).not.toContain(
        'Service',
      )
    },
  )
})

describe('buildPageGraph — FAQPage (§6.8 / AC-11)', () => {
  const FAQ_PAGES = ['services', 'method', 'alliance'] as const

  it.each(FAQ_PAGES)('emits FAQPage on %s', (page) => {
    expect(typesOf(graphFor(page)['@graph'])).toContain('FAQPage')
  })

  it.each(
    ALL_ROUTES.filter(
      (r) => !(FAQ_PAGES as readonly PageId[]).includes(r.page),
    ),
  )('emits NO FAQPage on $page', ({ page, slug }) => {
    expect(typesOf(graphFor(page, 'es', slug)['@graph'])).not.toContain(
      'FAQPage',
    )
  })

  // AC-11: the JSON-LD must mirror the visible text exactly. Both read the same
  // dictionary object, so this asserts the wiring has not been bypassed.
  it.each(FAQ_PAGES)(
    'FAQ text matches the rendered dictionary on %s',
    (page) => {
      for (const locale of LOCALES) {
        const dict = getDictionary(locale)
        const visible = (
          dict[page] as unknown as {
            faq: { items: readonly { question: string; answer: string }[] }
          }
        ).faq.items

        const node = graphFor(page, locale)['@graph'].find(
          (n) => n['@type'] === 'FAQPage',
        )
        const entities = node?.mainEntity as Record<string, unknown>[]

        expect(entities).toHaveLength(visible.length)
        visible.forEach((item, i) => {
          expect(entities[i].name).toBe(item.question)
          expect(
            (entities[i].acceptedAnswer as Record<string, unknown>).text,
          ).toBe(item.answer)
        })
      }
    },
  )
})

describe('buildPageGraph — Article (§6.7)', () => {
  it('emits Article on case details only', () => {
    expect(
      typesOf(graphFor('caseDetail', 'es', 'magupell')['@graph']),
    ).toContain('Article')
    expect(typesOf(graphFor('cases')['@graph'])).not.toContain('Article')
  })

  it('names the sector in `about`, localised', () => {
    const node = graphFor('caseDetail', 'en', 'magupell')['@graph'].find(
      (n) => n['@type'] === 'Article',
    )
    expect(String(node?.about)).toMatch(/LEATHER/i)
  })
})

describe('buildPageGraph — ContactPage (§6.9)', () => {
  it('uses ContactPage instead of WebPage on /contacto', () => {
    const types = typesOf(graphFor('contact')['@graph'])
    expect(types).toContain('ContactPage')
    expect(types).not.toContain('WebPage')
  })
})
