/**
 * Backward-compat adapter for home-page proof section and existing tests.
 * Source of truth has moved to content/data/cases.ts (SPEC-P1 FR-3.1).
 * HOME-V2: the home builds locale-aware case links from CaseStudy directly
 * (components/pages/home.tsx); this ES adapter now serves /styleguide, the
 * `Client` type and tests only.
 */
import { cases } from '@/content/data/cases'

export type Client = {
  readonly name: string
  readonly eyebrow: string
  readonly title: string
  readonly text: string
  readonly href: string
  readonly status: string
}

/** Flat ES-locale view of case studies — used by /styleguide and tests. */
export const clients: readonly Client[] = cases.map((c) => ({
  name: c.name,
  href: c.href,
  eyebrow: c.content.es.eyebrow,
  title: c.content.es.title,
  text: c.content.es.text,
  status: c.content.es.status,
}))
