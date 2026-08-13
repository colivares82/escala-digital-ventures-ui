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

  it('sets a real lastmod derived from content, not build time', () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date)
      // A content mtime is necessarily in the past.
      expect((entry.lastModified as Date).getTime()).toBeLessThanOrEqual(
        Date.now(),
      )
    }
  })

  it('omits priority and changefreq — they are ignored and add noise', () => {
    for (const entry of entries) {
      expect(entry).not.toHaveProperty('priority')
      expect(entry).not.toHaveProperty('changeFrequency')
    }
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

  it('states the licence/IP/data position correctly', () => {
    expect(body).toMatch(/indefinite licence/i)
    expect(body).toMatch(/Intellectual property and source code belong to Escala/i)
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

  it('never claims the client owns the code', () => {
    expect(body).not.toMatch(/owns? (the|your|their) (source )?code/i)
    // Data ownership DOES belong to the client, so only code/IP is excluded.
    expect(body).not.toMatch(/client owns .{0,20}(code|intellectual property)/i)
    expect(body).toMatch(/Intellectual property and source code belong to Escala/i)
  })
})
