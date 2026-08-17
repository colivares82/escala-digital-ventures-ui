/**
 * SEO-01 §0.3 absolute prohibitions — permanent site-wide guard.
 *
 * AC-20 / AC-21. This complements tests/content/ownership-guard.test.ts (which
 * covers the ES ownership wording) by sweeping EVERY locale dictionary, the
 * case data, and the SEO layer for each forbidden pattern in one place.
 *
 * If one of these fires, do not relax the assertion — fix the copy. Each rule
 * exists because the claim is either legally significant, factually unverified,
 * or a client-confidentiality matter.
 */

import { getDictionary } from '@/lib/i18n/dictionary'
import { cases } from '@/content/data/cases'
import { buildLlmsTxt } from '@/lib/seo/llms-txt'
import { buildPageGraph } from '@/lib/seo/page-graph'
import { LOCALES, type Locale, type PageId } from '@/lib/i18n/types'

const ALL_PAGES: readonly PageId[] = [
  'home',
  'services',
  'method',
  'cases',
  'alliance',
  'about',
  'contact',
  'legal',
  'privacy',
]

/** Every user-facing and machine-readable string we ship, per locale. */
function surfaceFor(locale: Locale): string {
  const graphs = ALL_PAGES.map((page) =>
    JSON.stringify(buildPageGraph({ dict: getDictionary(locale), page, locale })),
  )
  const caseGraphs = (['magupell', 'biozero'] as const).map((slug) =>
    JSON.stringify(
      buildPageGraph({
        dict: getDictionary(locale),
        page: 'caseDetail',
        locale,
        params: { slug },
      }),
    ),
  )
  return [
    JSON.stringify(getDictionary(locale)),
    JSON.stringify(cases),
    ...graphs,
    ...caseGraphs,
  ].join('\n')
}

const SURFACES: readonly { locale: Locale; text: string }[] = LOCALES.map(
  (locale) => ({ locale, text: surfaceFor(locale) }),
)

const LLMS = buildLlmsTxt()

describe('SEO-01 §0.3 — no unverified figures (AC-20)', () => {
  it.each(SURFACES)('$locale: no "100+" or "200+" placeholders', ({ text }) => {
    expect(text).not.toMatch(/100\+/)
    expect(text).not.toMatch(/200\+/)
  })

  it('/llms.txt uses no rounded or extrapolated figure', () => {
    expect(LLMS).not.toMatch(/100\+|200\+/)
  })
})

describe('SEO-01 §0.3 — Magupell never issues invoices (AC-20)', () => {
  /**
   * The platform prepares and sends BILLING SUMMARIES (resúmenes de cobro).
   * Only metadata, structured data and Q&A answers are covered by the spec's
   * prohibition, so this checks the Magupell case meta + the graph output,
   * where the claim would be machine-read.
   */
  it.each(LOCALES)('%s: Magupell meta carries no invoicing language', (locale) => {
    const magupell = cases.find((c) => c.slug === 'magupell')
    const meta = magupell?.metaByLocale[locale]
    const text = `${meta?.title} ${meta?.description}`
    expect(text).not.toMatch(/factura|facturaci|invoic/i)
  })

  it('/llms.txt says billing summaries, and never uses "invoice"', () => {
    // No form of the word at all — not even in a denial, which could be quoted
    // out of context.
    expect(LLMS).not.toMatch(/\binvoic/i)
    expect(LLMS).toMatch(/billing summaries/i)
  })
})

describe('SEO-01 §0.3 — the client never owns the code', () => {
  /**
   * Only CODE/IP ownership is forbidden. "The client owns their data" is
   * required by the corrected model, so the patterns below deliberately bind to
   * code/IP nouns rather than matching "owns" generically.
   */
  it.each(SURFACES)('$locale: no code-ownership claim', ({ text }) => {
    expect(text).not.toMatch(/owns? (the|your|their) (source )?code/i)
    expect(text).not.toMatch(/client owns .{0,20}(code|intellectual property)/i)
    expect(text).not.toMatch(/propietari[oa] del c[oó]di/i)
    expect(text).not.toMatch(/(tu|su) (propiedad del )?c[oó]digo es tuy/i)
    expect(text).not.toMatch(/dueñ[oa] del c[oó]digo/i)
  })

  /**
   * CONTENT-11 §3.4 replaces the previous "IP is attributed to Escala where
   * discussed" rule. Attribution is no longer the test, because platform IP and
   * licence terms are not discussed publicly at all — they are agreed privately
   * per client. The only sanctioned IP mention left is the legal pages' own
   * website-content copyright notice, which is about Escala's site, not about a
   * client's platform. Full term blocklist: tests/content/ownership-guard.test.ts.
   */
  it.each(SURFACES)('$locale: no client-platform licence terms are published', ({ text }) => {
    expect(text).not.toMatch(/licencia de uso/i)
    expect(text).not.toMatch(/licen[cs]e to (use|operate)/i)
    expect(text).not.toMatch(/llic[eè]ncia d.[uú]s/i)
    expect(text).not.toMatch(/intransferible|non-transferable/i)
  })
})

describe('SEO-01 §0.3 — no former employer names', () => {
  /**
   * Experience is always anonymised ("plataformas de software empresarial de
   * alcance global"). This asserts the anonymised formula is what ships; the
   * employer names themselves are deliberately not written here, since naming
   * them in a committed test file would defeat the purpose.
   */
  it.each(SURFACES)('$locale: experience stays anonymised', ({ text }) => {
    expect(text).toMatch(
      /alcance global|abast global|used worldwide|global enterprise/i,
    )
  })
})

describe('SEO-01 §0.3 — no Russian as a working language', () => {
  it.each(SURFACES)('$locale: no Russian reference', ({ text }) => {
    expect(text.toLowerCase()).not.toMatch(/ruso|rusa|russian|русск/)
  })

  it('/llms.txt lists only Spanish, English and Catalan', () => {
    expect(LLMS).toMatch(/Spanish, English, Catalan/)
    expect(LLMS.toLowerCase()).not.toMatch(/russian/)
  })
})

describe('SEO-01 §0.3 — spelling is Magupell, never MAGUPELL (AC-21)', () => {
  /**
   * The all-caps form must not appear as a standalone word. Checked with a
   * word-boundary match so unrelated shouty strings elsewhere cannot mask a
   * real regression, and so "Magupell" itself never trips the rule.
   */
  it.each(SURFACES)('$locale: no all-caps MAGUPELL', ({ text }) => {
    expect(text).not.toMatch(/\bMAGUPELL\b/)
  })

  it('/llms.txt spells it Magupell', () => {
    expect(LLMS).not.toMatch(/\bMAGUPELL\b/)
    expect(LLMS).toContain('Magupell')
  })
})

describe('SEO-01 §0.3 — no colivares.com link', () => {
  it.each(SURFACES)('$locale: colivares.com is never a URL', ({ text }) => {
    // Plain-text mention is permitted; a link or sameAs entry is not.
    expect(text).not.toMatch(/https?:\/\/(www\.)?colivares\.com/i)
  })
})

describe('SEO-01 §0.3 — no street address anywhere (AC-9)', () => {
  it.each(SURFACES)('$locale: locality-level only', ({ text }) => {
    expect(text).not.toMatch(/streetAddress|postalCode/)
  })
})
