/**
 * Case studies — EN locale (index page).
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { CasesDictionary } from '@/content/types'

export const casesContent = {
  meta: {
    title: 'Case studies | Escala Digital Ventures',
    description:
      'Real projects: Magupell and BioZero. Automation with verified results.',
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
