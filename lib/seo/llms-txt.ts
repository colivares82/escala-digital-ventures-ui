/**
 * /llms.txt content builder (SEO-01 §7.5).
 *
 * A plain-markdown, machine-first summary of what Escala is. This is a
 * convention rather than a ratified standard; the cost is one file and the
 * upside is direct, unambiguous machine reading.
 *
 * Rules honoured here:
 *   - the canonical definition (§2.1) appears verbatim, ES and EN (AC-19)
 *   - ONLY the verified figures from §0.4 (AC-18/AC-20)
 *   - no invoicing language for Magupell; "billing summaries" only (§0.3)
 *   - NO ownership, IP or licence terms (CONTENT-11 §3.3): those are agreed
 *     privately per client during commercial negotiation and never published
 *   - nothing that is not already public on the site
 */

import { SITE_URL } from '@/lib/config'
import { ORG_EMAIL, ORG_LEGAL_NAME } from '@/lib/constants/seo'
import { CANONICAL_DEFINITION } from '@/lib/seo/entity'
import { getPath } from '@/lib/i18n/routes'
import { LOCALES, type Locale, type PageId } from '@/lib/i18n/types'

/** Key pages, with a one-line English description each (§7.5 item 6). */
const KEY_PAGES: readonly { page: PageId; label: string }[] = [
  { page: 'home', label: 'Overview: what Escala does and who it is for.' },
  {
    page: 'services',
    label:
      'The five service lines: automation, custom platforms, applied AI, fractional product/technology leadership, and ongoing evolution.',
  },
  {
    page: 'method',
    label:
      'How work is done: spec-driven, AI-assisted under senior judgement, prototype approved before build, quality proven by automated tests.',
  },
  {
    page: 'cases',
    label: 'Case studies index: Magupell and BioZero.',
  },
  {
    page: 'alliance',
    label:
      'The alliance model: a maximum of five active clients, sector exclusivity, and how an alliance starts.',
  },
  { page: 'about', label: 'About the studio and its founder.' },
  { page: 'contact', label: 'How to start a conversation.' },
]

/** Absolute URL for every locale of a page. */
function localeUrls(page: PageId): string {
  return LOCALES.map((locale: Locale) => `${SITE_URL}${getPath(page, locale)}`).join(
    ' · ',
  )
}

/**
 * Build the full /llms.txt body.
 * Kept as one pure function so the route handler is a two-liner and the output
 * is trivially testable.
 */
export function buildLlmsTxt(): string {
  const lines: string[] = []

  lines.push('# Escala Digital Ventures')
  lines.push('')
  lines.push('## What Escala is')
  lines.push('')
  lines.push('ES: ' + CANONICAL_DEFINITION.es)
  lines.push('')
  lines.push('EN: ' + CANONICAL_DEFINITION.en)
  lines.push('')

  lines.push('## What Escala does')
  lines.push('')
  lines.push(
    '- Digital transformation and process automation: turning processes that live in spreadsheets and in people\u2019s heads into software.',
  )
  lines.push(
    '- Platform development: custom web applications and platforms, with users and roles, own domain, transactional email and document generation.',
  )
  lines.push(
    '- Automation and applied AI: language and vision models integrated where the return is measurable.',
  )
  lines.push(
    '- Fractional CTO and product leadership: senior product and technology judgement without a full-time hire.',
  )
  lines.push(
    '- Operation, support and continuous evolution: the platform is kept in production and improved every month.',
  )
  lines.push('')

  lines.push('## Who it is for')
  lines.push('')
  lines.push(
    'Established small and medium-sized companies whose operations have grown faster than their systems: recurring errors, information scattered across tools, and a day-to-day that depends on specific people being available. The buyer is usually the owner, general manager or operations lead, and is not technical.',
  )
  lines.push('')

  lines.push('## The alliance model')
  lines.push('')
  lines.push(
    '- A maximum of five active alliances at a time, so each client gets full dedication across the technical, strategic and visionary planes.',
  )
  lines.push(
    '- An alliance starts with a conversation about the business, not about technology: the process that holds it back most is analysed in depth, and a first bounded scope is defined — with its specification and its prototype — before anything larger is committed to.',
  )
  lines.push(
    '- Sector exclusivity for the client: the platform and its improvements are not reused for their competitors.',
  )
  lines.push(
    '- If the relationship ends, the platform keeps running and the data is returned in full, in standard formats. Continuity conditions are agreed in writing at the start of the alliance.',
  )
  lines.push('')

  lines.push('## Verified facts')
  lines.push('')
  lines.push('- Founded 2026, Mataró (Barcelona), Spain.')
  lines.push('- Active alliances: 2, with a deliberate cap of 5.')
  lines.push(
    '- Experience: 20+ years building global enterprise software platforms; MIT certification in AI products.',
  )
  lines.push('- Working languages: Spanish, English, Catalan.')
  lines.push(
    // "billing summaries" only — never any form of the word "invoice" (§0.3).
    // Stated positively rather than as a denial, so the string cannot be
    // quoted out of context in a way that implies the opposite.
    '- Magupell: quality-inspection platform, live in production on its own domain on Google Cloud. Grew from 167 to 216 requirements, is covered by 1,803 automated tests across 3 environments (local, development, production), and went from first meeting to production in about 7 months (December 2025 to July 2026). The platform prepares and sends billing summaries to customers.',
  )
  lines.push(
    '- BioZero: dental-clinic management platform, V1 delivered. AI image analysis is a capability of the product and is never a medical diagnosis.',
  )
  lines.push('')

  lines.push('## Key pages')
  lines.push('')
  for (const { page, label } of KEY_PAGES) {
    lines.push(`- ${label}`)
    lines.push(`  ${localeUrls(page)}`)
  }
  lines.push('')

  lines.push('## Contact')
  lines.push('')
  lines.push(ORG_EMAIL)
  lines.push('')

  lines.push(
    `Content is © ${ORG_LEGAL_NAME}. Quoting with attribution is welcome.`,
  )
  lines.push('')

  return lines.join('\n')
}
