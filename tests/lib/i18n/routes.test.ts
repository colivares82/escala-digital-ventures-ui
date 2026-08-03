/**
 * Tests for lib/i18n/routes.ts
 * AC-7: inverse property over the full route map, null on unknown paths,
 *        alternates correctness including caseDetail params.
 * Spec: SPEC-P1 FR-1
 */
import {
  CASE_SLUGS,
  LOCALES,
  ROUTE_MAP,
  getAlternates,
  getPath,
  resolvePath,
} from '@/lib/i18n/routes'
import type { CaseSlug, Locale, PageId } from '@/lib/i18n/types'

// ---------------------------------------------------------------------------
// Helpers — mirror the internal segmentsToPath logic for test clarity
// ---------------------------------------------------------------------------
function pathToSegments(path: string): string[] {
  if (path === '/') return []
  return path.replace(/^\//, '').split('/')
}

// ---------------------------------------------------------------------------
// getPath
// ---------------------------------------------------------------------------
describe('getPath', () => {
  it('returns / for ES home', () => {
    expect(getPath('home', 'es')).toBe('/')
  })

  it('returns /en for EN home', () => {
    expect(getPath('home', 'en')).toBe('/en')
  })

  it('returns /ca for CA home', () => {
    expect(getPath('home', 'ca')).toBe('/ca')
  })

  it('returns correct ES slug for services', () => {
    expect(getPath('services', 'es')).toBe('/que-hacemos')
  })

  it('returns correct EN slug for services', () => {
    expect(getPath('services', 'en')).toBe('/en/what-we-do')
  })

  it('returns correct CA slug for services', () => {
    expect(getPath('services', 'ca')).toBe('/ca/que-fem')
  })

  it('returns caseDetail path with slug substituted', () => {
    expect(getPath('caseDetail', 'es', { slug: 'magupell' })).toBe(
      '/casos-de-exito/magupell',
    )
    expect(getPath('caseDetail', 'en', { slug: 'biozero' })).toBe(
      '/en/case-studies/biozero',
    )
    expect(getPath('caseDetail', 'ca', { slug: 'magupell' })).toBe(
      '/ca/casos-dexit/magupell',
    )
  })

  it('throws when caseDetail called without slug', () => {
    expect(() => getPath('caseDetail', 'es')).toThrow()
  })

  it('all non-caseDetail paths start with /', () => {
    const pages: PageId[] = [
      'home', 'services', 'method', 'cases',
      'alliance', 'about', 'contact', 'legal', 'privacy',
    ]
    pages.forEach((page) => {
      LOCALES.forEach((locale) => {
        expect(getPath(page, locale)).toMatch(/^\//)
      })
    })
  })

  it('EN and CA paths are prefixed correctly', () => {
    const pages: PageId[] = [
      'services', 'method', 'cases',
      'alliance', 'about', 'contact', 'legal', 'privacy',
    ]
    pages.forEach((page) => {
      expect(getPath(page, 'en')).toMatch(/^\/en\//)
      expect(getPath(page, 'ca')).toMatch(/^\/ca\//)
    })
  })

  it('ES paths do NOT have a /es prefix', () => {
    const pages: PageId[] = [
      'services', 'method', 'cases',
      'alliance', 'about', 'contact', 'legal', 'privacy',
    ]
    pages.forEach((page) => {
      expect(getPath(page, 'es')).not.toMatch(/^\/es\//)
    })
  })
})

// ---------------------------------------------------------------------------
// resolvePath — inverse property over the entire route map
// AC-7: getPath and resolvePath are inverse for every entry
// ---------------------------------------------------------------------------
describe('resolvePath — inverse property', () => {
  // Test all non-caseDetail pages × locales
  const pages: PageId[] = [
    'home', 'services', 'method', 'cases',
    'alliance', 'about', 'contact', 'legal', 'privacy',
  ]

  pages.forEach((page) => {
    LOCALES.forEach((locale) => {
      it(`resolves ${page} × ${locale}`, () => {
        const path = getPath(page, locale)
        const segments = pathToSegments(path)
        const result = resolvePath(segments)
        expect(result).not.toBeNull()
        expect(result?.page).toBe(page)
        expect(result?.locale).toBe(locale)
        expect(result?.params).toBeUndefined()
      })
    })
  })

  // Test caseDetail × all locales × all slugs
  LOCALES.forEach((locale) => {
    CASE_SLUGS.forEach((slug) => {
      it(`resolves caseDetail × ${locale} × ${slug}`, () => {
        const path = getPath('caseDetail', locale, { slug })
        const segments = pathToSegments(path)
        const result = resolvePath(segments)
        expect(result).not.toBeNull()
        expect(result?.page).toBe('caseDetail')
        expect(result?.locale).toBe(locale)
        expect(result?.params?.slug).toBe(slug)
      })
    })
  })
})

// ---------------------------------------------------------------------------
// resolvePath — null cases (per spec §5 edge cases)
// ---------------------------------------------------------------------------
describe('resolvePath — null on unknown paths', () => {
  it('returns null for completely unknown path', () => {
    expect(resolvePath(['foo'])).toBeNull()
  })

  it('returns null for /es/... (es prefix is NOT valid per spec)', () => {
    expect(resolvePath(['es'])).toBeNull()
    expect(resolvePath(['es', 'que-hacemos'])).toBeNull()
  })

  it('returns null for unknown EN slug', () => {
    expect(resolvePath(['en', 'foo'])).toBeNull()
  })

  it('returns null for unknown CA slug', () => {
    expect(resolvePath(['ca', 'foo'])).toBeNull()
  })

  it('returns null for caseDetail with unknown slug', () => {
    expect(resolvePath(['casos-de-exito', 'unknown-client'])).toBeNull()
    expect(resolvePath(['en', 'case-studies', 'unknown-client'])).toBeNull()
  })

  it('treats /casos-de-exito/ (trailing slash) as the cases index — not null', () => {
    // ['casos-de-exito', ''] → '/casos-de-exito/' → strip → '/casos-de-exito' (cases index)
    // Trailing slash normalization: this is VALID behavior, not a null case.
    const result = resolvePath(['casos-de-exito', ''])
    expect(result).toEqual({ page: 'cases', locale: 'es' })
  })
})

// ---------------------------------------------------------------------------
// Trailing slash normalization (spec §5)
// ---------------------------------------------------------------------------
describe('resolvePath — trailing slash normalization', () => {
  it('resolves /que-hacemos/ to the same as /que-hacemos', () => {
    const withSlash = resolvePath(['que-hacemos', ''])
    const without = resolvePath(['que-hacemos'])
    // trailing-slash path ['que-hacemos', ''] normalizes to /que-hacemos/ → /que-hacemos
    // Both should return the same resolution
    expect(without).toEqual({ page: 'services', locale: 'es' })
    // The trailing slash variant strips to /que-hacemos and resolves correctly
    // Note: ['que-hacemos', ''] → '/que-hacemos/' → strip → '/que-hacemos'
    expect(withSlash).toEqual({ page: 'services', locale: 'es' })
  })

  it('root path always resolves regardless of empty segments', () => {
    expect(resolvePath([])).toEqual({ page: 'home', locale: 'es' })
  })
})

// ---------------------------------------------------------------------------
// getAlternates — correctness incl. caseDetail params
// ---------------------------------------------------------------------------
describe('getAlternates', () => {
  it('returns one URL per locale', () => {
    const alts = getAlternates('home')
    expect(Object.keys(alts)).toHaveLength(3)
    expect(alts.es).toBe('/')
    expect(alts.en).toBe('/en')
    expect(alts.ca).toBe('/ca')
  })

  it('returns localized URLs for services', () => {
    const alts = getAlternates('services')
    expect(alts.es).toBe('/que-hacemos')
    expect(alts.en).toBe('/en/what-we-do')
    expect(alts.ca).toBe('/ca/que-fem')
  })

  it('preserves slug across locales for caseDetail', () => {
    const alts = getAlternates('caseDetail', { slug: 'magupell' })
    expect(alts.es).toBe('/casos-de-exito/magupell')
    expect(alts.en).toBe('/en/case-studies/magupell')
    expect(alts.ca).toBe('/ca/casos-dexit/magupell')
  })

  it('preserves biozero slug correctly', () => {
    const alts = getAlternates('caseDetail', { slug: 'biozero' })
    expect(alts.es).toBe('/casos-de-exito/biozero')
    expect(alts.en).toBe('/en/case-studies/biozero')
    expect(alts.ca).toBe('/ca/casos-dexit/biozero')
  })

  it('all alternate values start with /', () => {
    const pages: PageId[] = ['home', 'services', 'method', 'contact']
    pages.forEach((page) => {
      const alts = getAlternates(page)
      Object.values(alts).forEach((url) => {
        expect(url).toMatch(/^\//)
      })
    })
  })
})

// ---------------------------------------------------------------------------
// Route map structural invariants
// ---------------------------------------------------------------------------
describe('ROUTE_MAP structural invariants', () => {
  it('every page has entries for all 3 locales', () => {
    ;(Object.keys(ROUTE_MAP) as PageId[]).forEach((page) => {
      const entry = ROUTE_MAP[page] as Record<Locale, string>
      expect(Object.keys(entry)).toEqual(expect.arrayContaining(['es', 'en', 'ca']))
    })
  })

  it('all ES paths do not start with /en/ or /ca/ locale prefix', () => {
    ;(Object.keys(ROUTE_MAP) as PageId[]).forEach((page) => {
      if (page === 'caseDetail') return // template with {slug}, not a final path
      const entry = ROUTE_MAP[page] as Record<Locale, string>
      const esPath = entry.es
      // ES paths have no locale prefix — note: /ca(?!s) guard:
      // use /\/(en|ca)\// to avoid false positive on /casos-de-exito
      expect(esPath).not.toMatch(/^\/(en|ca)\//)
    })
  })

  it('caseDetail templates contain {slug}', () => {
    const entry = ROUTE_MAP['caseDetail'] as Record<Locale, string>
    LOCALES.forEach((locale) => {
      expect(entry[locale]).toContain('{slug}')
    })
  })

  it('no two different page+locale pairs share the same path', () => {
    const seenPaths = new Set<string>()
    ;(Object.keys(ROUTE_MAP) as PageId[]).forEach((page) => {
      const entry = ROUTE_MAP[page] as Record<Locale, string>
      if (page === 'caseDetail') return // templates, not final paths
      LOCALES.forEach((locale) => {
        const path = entry[locale]
        expect(seenPaths.has(path)).toBe(false)
        seenPaths.add(path)
      })
    })
  })
})
