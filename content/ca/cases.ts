/**
 * Casos d'èxit — CA locale (index page).
 * SPEC-P5 FR-1.1 · Glossary: docs/i18n-glossary.md
 * Pending Carlos register review (AC-9).
 */
import type { CasesDictionary } from '@/content/types'

export const casesContent = {
  // SEO-01 §3.3 — primary term: "casos de digitalització de processos".
  meta: {
    title: "Casos d'èxit: processos manuals fets plataforma",
    description:
      "Magupell i BioZero: dues empreses que van substituir l'operativa manual per una plataforma pròpia. Dades verificables, amb permís del client.",
  },
  pageHeader: {
    eyebrow: "A / CASOS D'ÈXIT",
    title: "Casos d'èxit",
    lead: "Més que projectes: transformació empresarial. Expliquem cada cas amb dades verificables i amb el permís del client.",
  },
  card: {
    expedienteLabel: 'EXPEDIENT',
    openLabel: 'OBRIR EXPEDIENT ↗',
  },
  visitLabel: 'visitar lloc ↗',
  capabilitiesLabel: 'CAPACITATS LLIURADES',
  nextLabel: 'SEGÜENT EXPEDIENT ↓',
  backLabel: "TORNAR A L'ÍNDEX ↑",
} as const satisfies CasesDictionary

export type CasesContent = typeof casesContent
