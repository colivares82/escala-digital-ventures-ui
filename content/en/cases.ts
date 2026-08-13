/**
 * Case studies — EN locale (index page).
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { CasesDictionary } from '@/content/types'

export const casesContent = {
  // SEO-01 §3.2 — primary term: "process digitisation case studies".
  meta: {
    title: 'Case Studies — Manual Processes Turned Into Platforms',
    description:
      'Magupell and BioZero: two companies that replaced manual operations with a platform of their own. Verifiable figures, published with client permission.',
  },
  pageHeader: {
    eyebrow: 'A / CASE STUDIES',
    title: 'Case studies',
    lead: 'More than projects: business transformation. We tell each case with verifiable data and with the client\'s permission.',
  },
  card: {
    expedienteLabel: 'DOSSIER',
    openLabel: 'OPEN DOSSIER ↗',
  },
  visitLabel: 'visit site ↗',
  capabilitiesLabel: 'CAPABILITIES DELIVERED',
  nextLabel: 'NEXT DOSSIER ↓',
  backLabel: 'BACK TO INDEX ↑',
} as const satisfies CasesDictionary

export type CasesContent = typeof casesContent
