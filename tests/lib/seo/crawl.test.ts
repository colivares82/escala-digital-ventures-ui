/**
 * Crawl layer — robots.txt, sitemap.xml, /llms.txt.
 * SEO-01 §7.1 / §7.2 / §7.5 · AC-12, AC-13, AC-18.
 */

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { buildLlmsTxt } from '@/lib/seo/llms-txt'
import { ALLOWED_AI_CRAWLERS } from '@/lib/constants/seo'
import { SITE_URL } from '@/lib/config'
import { CANONICAL_DEFINITION } from '@/lib/seo/entity'
import { PAGE_LAST_MODIFIED } from '@/lib/seo/lastmod'
import { buildPageMetadata } from '@/lib/seo/page-meta'
import { LOCALES } from '@/lib/i18n/types'

/**
 * The date SEO-01 reached production. Every sitemap lastmod must be at or
 * after this: the live site was reporting 2026-08-17, which predated the
 * deployment and told Google the new metadata did not exist (SEO-01a §4b).
 */
const SEO_01_DEPLOYMENT_DATE = '2026-08-18'

describe('robots.txt (§7.1 / AC-12)', () => {
  const result = robots()
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
  const agents = rules.map((r) => r?.userAgent)

  it('keeps a default allow-all rule', () => {
    const wildcard = rules.find((r) => r?.userAgent === '*')
    expect(wildcard?.allow).toBe('/')
  })

  // AC-12: every named AI crawler must be present.
  it.each(ALLOWED_AI_CRAWLERS)('names %s explicitly', (crawler) => {
    expect(agents).toContain(crawler)
  })

  it('disallows /api/ and /styleguide for every rule', () => {
    for (const rule of rules) {
      expect(rule?.disallow).toContain('/api/')
      expect(rule?.disallow).toContain('/styleguide')
    }
  })

  it('references the sitemap absolutely', () => {
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`)
  })

  it('sets no crawl-delay (§7.1)', () => {
    expect(JSON.stringify(result)).not.toMatch(/crawlDelay|crawl-delay/i)
  })
})

describe('sitemap.xml (§7.2 / AC-13)', () => {
  const entries = sitemap()

  it('lists 11 pages × 3 locales', () => {
    expect(entries).toHaveLength(33)
  })

  it('uses absolute URLs on the canonical origin', () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE_URL}`)).toBe(true)
    }
  })

  it('has no duplicate URL', () => {
    const urls = entries.map((e) => e.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  // AC-13: x-default on every entry, pointing at the ES URL.
  it('carries es/en/ca + x-default alternates on every entry', () => {
    for (const entry of entries) {
      const langs = entry.alternates?.languages as Record<string, string>
      expect(Object.keys(langs).sort()).toEqual([
        'ca',
        'en',
        'es',
        'x-default',
      ])
      expect(langs['x-default']).toBe(langs.es)
    }
  })

  // AC-13: no 404, no noindex, no excluded route.
  it('excludes /api, /styleguide and any unknown route', () => {
    for (const entry of entries) {
      expect(entry.url).not.toMatch(/\/api|\/styleguide/)
    }
  })

  /*
   * SEO-01a §4b — this assertion is REWRITTEN from its SEO-01 form.
   *
   * It used to assert `lastModified instanceof Date` and "not in the future",
   * which the old mtime implementation satisfied while being completely
   * broken in production: Docker's `COPY . .` reset every content file's
   * mtime to the layer build time, so all 33 entries emitted one identical,
   * stale timestamp. Both assertions passed the whole time.
   *
   * The lesson is the same one the og:image bug taught: asserting a value's
   * *shape* proves nothing about its *correctness*. These assertions now pin
   * the actual contract — a date-level string, from the maintained table.
   */
  it('sets a date-level lastmod string, never a build timestamp', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })

  it('sources every lastmod from the maintained per-page table', () => {
    const known = new Set(Object.values(PAGE_LAST_MODIFIED))
    for (const entry of entries) {
      expect(known).toContain(entry.lastModified as string)
    }
  })

  /*
   * The defect that made this spec necessary: a stale date suppresses
   * recrawling. Guard the failure mode directly — no entry may predate the
   * SEO-01 deployment, which is what Google was being told on 13 Sep 2026.
   */
  it('has no lastmod earlier than the SEO-01 deployment', () => {
    for (const entry of entries) {
      expect(
        (entry.lastModified as string) >= SEO_01_DEPLOYMENT_DATE,
        `${entry.url} reports ${entry.lastModified as string}`,
      ).toBe(true)
    }
  })

  it('omits priority and changefreq — they are ignored and add noise', () => {
    for (const entry of entries) {
      expect(entry).not.toHaveProperty('priority')
      expect(entry).not.toHaveProperty('changeFrequency')
    }
  })

  it('lists the root as the bare origin, matching the canonical tag', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain(SITE_URL)
    expect(urls).not.toContain(`${SITE_URL}/`)
  })
})

/*
 * SEO-01a §4 — the check that was missing.
 *
 * Canonical and sitemap <loc> were each tested in isolation and both passed,
 * while disagreeing with each other on the root URL in production. Neither
 * suite could catch that, because neither one ever compared the two. This
 * describe block exists solely to hold them against each other.
 */
describe('canonical ↔ sitemap URL agreement (SEO-01a §4)', () => {
  const sitemapUrls = new Set(sitemap().map((e) => e.url))

  /**
   * The canonical as the BROWSER receives it, not as the Metadata object
   * holds it.
   *
   * These differ, and that difference is the entire bug: `buildPageMetadata`
   * returns `https://…com/` for the home route, but Next.js resolves every
   * canonical against `metadataBase` (app/layout.tsx) before rendering, and
   * `new URL('https://…com/').href.replace(...)` normalisation drops the
   * trailing slash — so the tag that ships says `https://…com`.
   *
   * Comparing the raw object here would assert the wrong thing and "pass"
   * against output that is still mismatched in production — the same trap the
   * double-brand title bug and the og:image bug both fell into. So we apply
   * the framework's own normalisation before comparing.
   */
  const renderedCanonical = (value: string): string =>
    new URL(value, SITE_URL).href.replace(/\/$/, '') || value

  it('every sitemap URL is byte-identical to that page canonical', () => {
    // Rebuild the same route set the sitemap walks, then ask the metadata
    // layer for its canonical and require an exact string match.
    const cases: { page: Parameters<typeof buildPageMetadata>[0]['page']; params?: { slug: 'magupell' | 'biozero' } }[] = [
      { page: 'home' },
      { page: 'method' },
      { page: 'services' },
      { page: 'cases' },
      { page: 'caseDetail', params: { slug: 'magupell' } },
      { page: 'caseDetail', params: { slug: 'biozero' } },
      { page: 'alliance' },
      { page: 'about' },
      { page: 'contact' },
      { page: 'legal' },
      { page: 'privacy' },
    ]

    for (const { page, params } of cases) {
      for (const locale of LOCALES) {
        const canonical = buildPageMetadata({
          page,
          locale,
          params,
          title: 'T',
          description: 'D',
        }).alternates?.canonical as string

        const rendered = renderedCanonical(canonical)
        expect(
          sitemapUrls.has(rendered),
          `canonical ${rendered} (${page}/${locale}) is absent from the sitemap`,
        ).toBe(true)
      }
    }
  })

  it('covers every sitemap URL — no orphan entries', () => {
    expect(sitemapUrls.size).toBe(33)
  })
})

describe('/llms.txt (§7.5 / AC-18)', () => {
  const body = buildLlmsTxt()

  it('opens with the brand heading', () => {
    expect(body.startsWith('# Escala Digital Ventures')).toBe(true)
  })

  // AC-19: canonical definition verbatim, ES and EN.
  it('contains the canonical definition verbatim in ES and EN', () => {
    expect(body).toContain(CANONICAL_DEFINITION.es)
    expect(body).toContain(CANONICAL_DEFINITION.en)
  })

  it('includes every required section (§7.5)', () => {
    for (const section of [
      '## What Escala is',
      '## What Escala does',
      '## Who it is for',
      '## The alliance model',
      '## Verified facts',
      '## Key pages',
      '## Contact',
    ]) {
      expect(body).toContain(section)
    }
  })

  // CONTENT-11 §3.3: these assertions used to REQUIRE the licence/IP sentences.
  // They now require their absence — commercial terms are agreed privately per
  // client and never published, so the AEO surface must not carry them either.
  it('publishes no licence or IP position', () => {
    expect(body).not.toMatch(/indefinite licence/i)
    expect(body).not.toMatch(/intellectual property/i)
    expect(body).not.toMatch(/source code/i)
  })

  it('states the alliance position in operational terms', () => {
    expect(body).toMatch(/sector exclusivity/i)
    expect(body).toMatch(/returned in full/i)
  })

  it('lists the contact address and the copyright line', () => {
    expect(body).toContain('hola@escaladigitalventures.com')
    expect(body).toMatch(/© Escala Digital Ventures, S\.L\.U\./)
    expect(body).toMatch(/attribution is welcome/i)
  })

  it('links key pages in all three locales', () => {
    expect(body).toContain(`${SITE_URL}/que-hacemos`)
    expect(body).toContain(`${SITE_URL}/en/what-we-do`)
    expect(body).toContain(`${SITE_URL}/ca/que-fem`)
  })

  // AC-18 / AC-20: only verified figures.
  it('uses only the verified figures and no forbidden claim', () => {
    expect(body).toContain('167 to 216')
    expect(body).toContain('1,803')
    expect(body).not.toMatch(/100\+|200\+/)
    expect(body).not.toMatch(/\binvoic/i)
    expect(body).toMatch(/billing summaries/i)
  })

  it('makes no code-ownership claim in either direction', () => {
    expect(body).not.toMatch(/owns? (the|your|their) (source )?code/i)
    expect(body).not.toMatch(/client owns .{0,20}(code|intellectual property)/i)
    // CONTENT-11: the counter-claim ("…belong to Escala") is gone too. The
    // subject is simply not raised on a public surface.
    expect(body).not.toMatch(/belong to Escala/i)
  })
})
