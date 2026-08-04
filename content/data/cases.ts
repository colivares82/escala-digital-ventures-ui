/**
 * Case study data — locale-aware, single source of truth for all case content.
 * Slugs are shared across locales (magupell, biozero); copy fields are per-locale.
 * Phase 5 will locale-key readouts/fields/capabilities; ES populated for now.
 * Spec: SPEC-P2.3 §4 (data model)
 *
 * Logo assets: app/assets/brand/*.png — static import via next/image.
 * Decision: kept in app/assets/brand/ (not public/brand/) for build-time
 * missing-file detection and content-hash caching. See DECISIONS.md.
 *
 * TODO(Phase 7): Confirm logo-display permission with Carlos before go-live
 * per FR-3.6 / Definition of Done.
 */

import type { StaticImageData } from 'next/image'
import magupellLogo from '@/app/assets/brand/magupell-logo.png'
import biozeroLogo from '@/app/assets/brand/biozero-logo.png'

import type { CaseSlug } from '@/lib/i18n/types'

// ---------------------------------------------------------------------------
// Per-locale index copy (used by home ProofSection / CaseCard)
// ---------------------------------------------------------------------------

export type CaseStudyCopy = {
  readonly eyebrow: string
  readonly title: string
  readonly text: string
  readonly status: string
}

// ---------------------------------------------------------------------------
// Dossier types — SPEC-P2.3 §4
// ---------------------------------------------------------------------------

export type CaseReadout = {
  readonly label: string
  readonly value: string
  readonly caption: string
}

export type CaseCapability = {
  /** Zero-padded ordinal string: "01", "02", … */
  readonly index: string
  readonly title: string
  readonly body: string
}

export type DossierField = {
  /** Field name shown in the key column: "CONTEXTO", "PROBLEMA", etc. */
  readonly key: string
  readonly body: string
}

/** Presentation mode — drives ReadoutStrip vs. CapabilityGrid prominence. */
export type CaseMode = 'data-forward' | 'capability-forward'

export type CaseBrand = {
  readonly name: string
  /**
   * Static image import from next/image.
   * null → renders a dashed placeholder box (page is NOT publishable until real).
   * TODO(Phase 7): confirm logo-display permission with Carlos (FR-3.6).
   */
  readonly logo: StaticImageData | null
  /** Canonical public URL — opens in new tab with rel="noopener noreferrer". */
  readonly url: string
}

/** Detail-page meta (per-case). Index meta lives in CasesDictionary. */
export type CaseDetailMeta = {
  /** ≤60 characters. Enforced in tests/lib/i18n/meta.test.ts. */
  readonly title: string
  /** ≤155 characters. Enforced in tests/lib/i18n/meta.test.ts. */
  readonly description: string
}

export type CaseStudy = {
  readonly slug: CaseSlug
  /** 1-based display order on the index page. */
  readonly order: number
  readonly name: string
  /** ES absolute path — used by home ClientChip adapter. Localized via getPath in components. */
  readonly href: string
  /** Sector eyebrow rendered in BrandHeader: "EXPEDIENTE 0X · SECTOR · …" */
  readonly sector: string
  /** Drives which block is protagonist in CaseDossier. */
  readonly mode: CaseMode
  readonly brand: CaseBrand
  /** Per-locale index card copy (used by home ProofSection + CaseCard). */
  readonly content: {
    readonly es: CaseStudyCopy
    readonly en: CaseStudyCopy
    readonly ca: CaseStudyCopy
  }
  /** One-line subtitle shown in CaseCard below the case name. */
  readonly cardSubtitle: string
  /** Engineering plate shown top-right of BrandHeader. Use '\n' for line breaks. */
  readonly plate: string
  /** Dossier readouts: 4 for MAGUPELL (data-forward), 2 for BioZero (capability-forward). */
  readonly readouts: readonly CaseReadout[]
  /** Optional capability grid — only present for capability-forward cases. */
  readonly capabilities?: readonly CaseCapability[]
  /** Numbered narrative fields: 5 for MAGUPELL, 3 for BioZero. */
  readonly fields: readonly DossierField[]
  /** Detail-page SEO meta. */
  readonly meta: CaseDetailMeta
}

// ---------------------------------------------------------------------------
// MAGUPELL — data-forward (readouts as protagonist)
// ---------------------------------------------------------------------------

const magupellEs: CaseStudyCopy = {
  eyebrow: 'EN PRODUCCIÓN · SECTOR PIEL',
  title: 'Digitalización integral de la inspección de calidad en el sector de la piel',
  text: '100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma',
  status: 'Ver caso',
}

const MAGUPELL: CaseStudy = {
  slug: 'magupell',
  order: 1,
  name: 'MAGUPELL',
  href: '/casos-de-exito/magupell',
  sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B',
  mode: 'data-forward',
  brand: {
    name: 'MAGUPELL',
    logo: magupellLogo,
    url: 'https://www.magupell.com',
  },
  content: {
    es: magupellEs,
    en: magupellEs, // TODO(P5): translate to EN
    ca: magupellEs, // TODO(P5): translate to CA
  },
  cardSubtitle:
    'Digitalización integral de la inspección de calidad en el sector de la piel.',
  plate: 'FIG. EXP-01\nESCALA · 2026',
  readouts: [
    { label: 'REQUISITOS', value: '100+', caption: 'funcionales en producción' },
    { label: 'PRUEBAS', value: '200+', caption: 'automatizadas' },
    { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio · Google Cloud' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'factura a sus clientes en la plataforma' },
  ],
  // MAGUPELL is data-forward — no capabilities grid.
  fields: [
    {
      key: 'CONTEXTO',
      body: 'MAGUPELL, S.L. realiza inspecciones de calidad de pieles para marcas de lujo. Su operativa —inspección, resultados por lote, fichas técnicas, catálogos, clientes y cobros— dependía de procesos manuales y de conocimiento no sistematizado.',
    },
    {
      key: 'PROBLEMA',
      body: 'El corazón del negocio vivía fuera de cualquier sistema: difícil de trazar, difícil de facturar, imposible de escalar.',
    },
    {
      key: 'SOLUCIÓN',
      body: 'Escala diseñó y construyó su plataforma completa: una aplicación web B2B a medida que cubre todo el ciclo operativo, desde el registro de la inspección con evidencia fotográfica hasta la facturación a sus clientes, con gestión de usuarios y roles, catálogo maestro de productos, modelo de resultados de lote adaptado al sector, correo transaccional con el dominio del cliente y generación de documentos.',
    },
    {
      key: 'IMPACTO',
      body: 'De los requisitos iniciales a producción con más de cien requisitos funcionales y más de doscientas pruebas automatizadas. En producción el 1 de julio de 2026 en dominio propio sobre Google Cloud, generando valor desde el primer mes: gran aceptación de los usuarios, estabilidad operativa y un hito clave — la empresa ya opera y factura a sus clientes directamente a través de la aplicación.',
    },
    {
      key: 'SIGUIENTES PASOS',
      body: 'La alianza continúa en soporte y evolución mensual, con nuevas funcionalidades entrando en producción a partir del feedback real de los usuarios.',
    },
  ],
  meta: {
    title: 'MAGUPELL — Digitalización del sector piel | Escala',
    description:
      'Cómo Escala diseñó y construyó la plataforma B2B de MAGUPELL: 100+ requisitos, 200+ pruebas automatizadas, en producción en Google Cloud desde julio 2026.',
  },
}

// ---------------------------------------------------------------------------
// BioZero — capability-forward (capability grid as protagonist)
// EDITORIAL GUARDRAIL (FR-3.6): BioZero is a health-sector product.
// Describe capabilities only — never imply medical diagnosis.
// ---------------------------------------------------------------------------

const biozeroEs: CaseStudyCopy = {
  eyebrow: 'V1 ENTREGADA · CLÍNICA DENTAL + IA',
  title: 'Plataforma de gestión clínica dental con IA',
  text: 'Registros clínicos colaborativos, gamificación del paciente y análisis de imágenes con modelos de visión de última generación.',
  status: 'Ver caso',
}

const BIOZERO: CaseStudy = {
  slug: 'biozero',
  order: 2,
  name: 'BioZero',
  href: '/casos-de-exito/biozero',
  sector: 'EXPEDIENTE 02 · CLÍNICA DENTAL · IA APLICADA',
  mode: 'capability-forward',
  brand: {
    name: 'BioZero',
    logo: biozeroLogo,
    url: 'https://biozeroplus.com',
  },
  content: {
    es: biozeroEs,
    en: biozeroEs, // TODO(P5): translate to EN
    ca: biozeroEs, // TODO(P5): translate to CA
  },
  cardSubtitle:
    'Plataforma de gestión clínica dental con análisis asistido por IA.',
  plate: 'FIG. EXP-02\nESCALA · PRIMER CLIENTE',
  readouts: [
    { label: 'ESTADO', value: 'V1 ENTREGADA', caption: 'base preparada para evolucionar' },
    { label: 'RELACIÓN', value: 'PRIMER CLIENTE', caption: 'de Escala' },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Historiales clínicos colaborativos',
      body: 'Registro compartido y trazable del historial del paciente.',
    },
    {
      index: '02',
      title: 'Gamificación del paciente',
      body: 'Mecánicas de implicación para mejorar la adherencia.',
    },
    {
      index: '03',
      title: 'Análisis de imágenes con IA',
      // EDITORIAL GUARDRAIL: capability-framed only — not diagnostic.
      body: 'Modelos de visión de última generación aplicados al análisis de salud oral.',
    },
  ],
  fields: [
    {
      key: 'CONTEXTO',
      body: 'BioZero fue el primer cliente de Escala: una plataforma de gestión para clínicas dentales con análisis de salud oral asistido por inteligencia artificial.',
    },
    {
      key: 'SOLUCIÓN E IMPACTO',
      body: 'La primera versión, ya entregada, digitalizó procesos clave y estableció una base tecnológica preparada para evolucionar. El proyecto se concibió desde el inicio como un activo estratégico que crecerá junto con el negocio.',
    },
    {
      key: 'LO QUE DEMUESTRA',
      // EDITORIAL GUARDRAIL: capability-framed proof point — not a diagnostic claim.
      body: 'BioZero acredita la capacidad de Escala para aplicar IA de forma útil y concreta en un sector regulado y sensible, y para llevar un producto desde el concepto hasta una primera versión funcional en manos del cliente.',
    },
  ],
  meta: {
    title: 'BioZero — Gestión clínica dental con IA | Escala',
    description:
      'Cómo Escala construyó la plataforma de BioZero: historiales colaborativos, gamificación del paciente y análisis de imágenes con IA. V1 entregada.',
  },
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const cases: readonly CaseStudy[] = [MAGUPELL, BIOZERO] as const

/**
 * Returns the CaseStudy for the given slug, or null if not found.
 * Locale param is reserved for Phase 5 when text fields are locale-keyed.
 */
export function getCase(slug: string, _locale?: string): CaseStudy | null {
  return cases.find((c) => c.slug === slug) ?? null
}
