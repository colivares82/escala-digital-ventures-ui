/**
 * Case study data — locale-aware, single source of truth.
 * Slugs are shared across locales (magupell, biozero); copy fields are per-locale.
 * Phase 1: EN/CA re-use ES copy (TODO P5: provide translated copy).
 * Spec: SPEC-P1 FR-3.1 — content/data/cases.ts with per-locale text fields.
 */

import type { CaseSlug } from '@/lib/i18n/types'

export type CaseStudyCopy = {
  readonly eyebrow: string
  readonly title: string
  readonly text: string
  readonly status: string
}

export type CaseStudy = {
  readonly slug: CaseSlug
  readonly name: string
  /** href to the full case-study page (ES path — localized path via getPath in components). */
  readonly href: string
  readonly content: {
    readonly es: CaseStudyCopy
    readonly en: CaseStudyCopy
    readonly ca: CaseStudyCopy
  }
}

const magupellEs: CaseStudyCopy = {
  eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
  title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
  text: '100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma',
  status: 'Ver caso',
}

const biozeroEs: CaseStudyCopy = {
  eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
  title: 'Plataforma de gestión clínica dental con IA',
  text: 'Registros clínicos colaborativos, gamificación del paciente y análisis de imágenes con modelos de visión de última generación.',
  status: 'Ver caso',
}

export const cases: readonly CaseStudy[] = [
  {
    slug: 'magupell',
    name: 'MAGUPELL',
    href: '/casos-de-exito/magupell',
    content: {
      es: magupellEs,
      // TODO(P5): translate to EN
      en: magupellEs,
      // TODO(P5): translate to CA
      ca: magupellEs,
    },
  },
  {
    slug: 'biozero',
    name: 'BioZero',
    href: '/casos-de-exito/biozero',
    content: {
      es: biozeroEs,
      // TODO(P5): translate to EN
      en: biozeroEs,
      // TODO(P5): translate to CA
      ca: biozeroEs,
    },
  },
] as const
