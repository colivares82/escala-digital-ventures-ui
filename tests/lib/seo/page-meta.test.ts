/**
 * Page metadata — SEO-01 §3 / §3.5 · AC-2, AC-14, AC-15.
 *
 * Critically, the title length is asserted on the RENDERED title, closing the
 * blind spot that let the double-brand bug ship: the previous guard measured
 * only the dictionary string and never the `%s | Escala Digital Ventures`
 * template applied on top of it.
 */

import { buildPageMetadata, ogTitle } from '@/lib/seo/page-meta'
import { getDictionary } from '@/lib/i18n/dictionary'
import { SITE_URL } from '@/lib/config'
import { OG_IMAGE } from '@/lib/constants/seo'
import { LOCALES, type Locale, type PageId } from '@/lib/i18n/types'
import { getCase } from '@/content/data/cases'

/**
 * next/font/google runs a build-time loader that cannot execute under jsdom, so
 * importing app/layout for its `metadata` export throws "Archivo is not a
 * function". Mocked to a minimal font object; only `metadata` is under test.
 */
vi.mock('next/font/google', () => {
  const font = () => ({ variable: 'mock-font-variable', className: 'mock-font' })
  return { Archivo: font, IBM_Plex_Mono: font, Instrument_Sans: font }
})

/** Imported lazily inside the test: top-level await is off in this tsconfig. */
const loadRootMetadata = async () => (await import('@/app/layout')).metadata

/**
 * Pages with their own dictionary slice. `caseDetail` is excluded: its meta
 * lives in content/data/cases.ts, and is asserted separately below.
 */
const PAGES = [
  'home',
  'services',
  'method',
  'cases',
  'alliance',
  'about',
  'contact',
  'legal',
  'privacy',
] as const satisfies readonly PageId[]

type DictPage = (typeof PAGES)[number]

const metaFor = (page: DictPage, locale: Locale) => {
  const slice = getDictionary(locale)[page] as unknown as {
    meta: { title: string; description: string }
  }
  return buildPageMetadata({
    page,
    locale,
    title: slice.meta.title,
    description: slice.meta.description,
  })
}

// AC-2: the root template must not re-append the brand.
describe('root metadata (AC-2)', () => {
  it('uses a pass-through title template — no brand duplication', async () => {
    const rootMetadata = await loadRootMetadata()
    const title = rootMetadata.title as { default: string; template: string }
    expect(title.template).toBe('%s')
  })

  it('renders no page title containing the brand twice', () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const rendered = String(metaFor(page, locale).title)
        const occurrences = rendered.split('Escala Digital Ventures').length - 1
        expect(occurrences).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe('metadata lengths (AC-2)', () => {
  it('every rendered title is ≤60 characters', () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const rendered = String(metaFor(page, locale).title)
        expect(rendered.length).toBeLessThanOrEqual(60)
      }
    }
  })

  it('every description is ≤155 characters', () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        expect(String(metaFor(page, locale).description).length,
        ).toBeLessThanOrEqual(155)
      }
    }
  })

  it('case-detail metas are within limits in every locale', () => {
    for (const slug of ['magupell', 'biozero'] as const) {
      const caseData = getCase(slug)
      for (const locale of LOCALES) {
        const meta = caseData?.metaByLocale[locale]
        expect(meta!.title.length).toBeLessThanOrEqual(60)
        expect(meta!.description.length).toBeLessThanOrEqual(155)
      }
    }
  })
})

describe('canonical and hreflang (AC-14 / AC-15)', () => {
  it('emits a self-referencing absolute canonical', () => {
    const meta = metaFor('services', 'es')
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/que-hacemos`)
  })

  it('emits reciprocal hreflang with x-default → ES on every page', () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const langs = metaFor(page, locale).alternates?.languages as Record<
          string,
          string
        >
        expect(Object.keys(langs).sort()).toEqual([
          'ca',
          'en',
          'es',
          'x-default',
        ])
        expect(langs['x-default']).toBe(langs.es)
        // The same page in every locale must agree on the alternate set.
        const fromEs = metaFor(page, 'es').alternates?.languages as Record<
          string,
          string
        >
        expect(langs).toEqual(fromEs)
      }
    }
  })
})

describe('Open Graph and Twitter (§3.5)', () => {
  it('strips the " | Escala" suffix from og:title', () => {
    expect(ogTitle('Contacto — Hablemos de tu negocio | Escala')).toBe(
      'Contacto — Hablemos de tu negocio',
    )
    expect(ogTitle('Cómo trabajamos: del proceso manual a la plataforma')).toBe(
      'Cómo trabajamos: del proceso manual a la plataforma',
    )
  })

  // `openGraph` and `twitter` are discriminated unions in Next's Metadata type,
  // so reads go through a Record cast rather than the narrowed member.
  it('sets og:type to website, and article on case studies', () => {
    const home = metaFor('home', 'es').openGraph as Record<string, unknown>
    expect(home.type).toBe('website')

    const caseMeta = buildPageMetadata({
      page: 'caseDetail',
      locale: 'es',
      params: { slug: 'magupell' },
      title: 'T',
      description: 'D',
    })
    expect((caseMeta.openGraph as Record<string, unknown>).type).toBe('article')
  })

  it('uses en_GB for English, never en_US (§3.5 / §8)', () => {
    const og = metaFor('home', 'en').openGraph as Record<string, unknown>
    expect(og.locale).toBe('en_GB')
    expect(og.alternateLocale).toEqual(['es_ES', 'ca_ES'])
  })

  it('sets og:site_name and the large Twitter card', () => {
    const meta = metaFor('home', 'es')
    expect((meta.openGraph as Record<string, unknown>).siteName).toBe(
      'Escala Digital Ventures',
    )
    expect((meta.twitter as Record<string, unknown>).card).toBe(
      'summary_large_image',
    )
  })

  /*
   * BRAND-01 Z5 — this assertion is INVERTED from its SEO-01 form.
   *
   * It used to require that `openGraph.images` be absent, so Next's
   * app/opengraph-image.* file convention could inject og:image. That
   * injection never actually reached these routes: every page renders from the
   * optional catch-all `app/[[...path]]/`, which a metadata file cannot live
   * inside, and a metadata file in `app/` does not apply to it. Verified
   * empirically against the pre-BRAND-01 build — zero og:image tags on any
   * page. The old assertion passed while the real output was broken, because
   * it only checked the override was absent, never that the tag was emitted.
   *
   * og:image is now declared explicitly and asserted end-to-end below.
   */
  it('declares one og:image for every page and locale', () => {
    for (const locale of LOCALES) {
      const images = metaFor('home', locale).openGraph?.images
      expect(images, `og:image missing for ${locale}`).toEqual([OG_IMAGE])
    }
  })

  it('uses the same text-free OG image across all locales (§7)', () => {
    // One image serves all three: it carries no text, so no per-locale variant
    // and no new dictionary key.
    const urls = LOCALES.map((l) => {
      const images = metaFor('home', l).openGraph?.images as readonly { url: string }[]
      return images[0]!.url
    })
    expect(new Set(urls).size).toBe(1)
  })

  it('sets the OG image to 1200x630 (§7)', () => {
    expect(OG_IMAGE.width).toBe(1200)
    expect(OG_IMAGE.height).toBe(630)
  })

  it('mirrors the OG image on the Twitter card', () => {
    expect(metaFor('home', 'es').twitter?.images).toEqual([OG_IMAGE.url])
  })

  it('points the OG image at an absolute URL (required by crawlers)', () => {
    expect(OG_IMAGE.url).toMatch(/^https?:\/\//)
  })
})
