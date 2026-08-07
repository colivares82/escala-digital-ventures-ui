/**
 * Case study data — locale-aware, single source of truth for all case content.
 * Slugs are shared across locales (magupell, biozero); copy fields are per-locale.
 * Phase 5: locale-keyed sector/readouts/capabilities/fields/meta added via *ByLocale fields.
 * Spec: SPEC-P2.3 §4 (data model) · SPEC-P5 FR-1
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

/** Locale-keyed dossier content (Phase 5). */
export type CaseDossierLocale = {
  readonly sector: string
  readonly readouts: readonly CaseReadout[]
  readonly capabilities?: readonly CaseCapability[]
  readonly fields: readonly DossierField[]
  readonly meta: CaseDetailMeta
}

export type CaseStudy = {
  readonly slug: CaseSlug
  /** 1-based display order on the index page. */
  readonly order: number
  readonly name: string
  /** ES absolute path — used by home ClientChip adapter. Localized via getPath in components. */
  readonly href: string
  /** Sector eyebrow rendered in BrandHeader (ES). Use sectorByLocale for locale-aware. */
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
  /** Dossier readouts (ES). Use dossierByLocale for locale-aware. */
  readonly readouts: readonly CaseReadout[]
  /** Optional capability grid (ES). Use dossierByLocale for locale-aware. */
  readonly capabilities?: readonly CaseCapability[]
  /** Numbered narrative fields (ES). Use dossierByLocale for locale-aware. */
  readonly fields: readonly DossierField[]
  /** Detail-page SEO meta (ES). Use metaByLocale for locale-aware. */
  readonly meta: CaseDetailMeta
  /**
   * Locale-keyed dossier content (Phase 5).
   * CaseDossier uses dossierByLocale[locale] ?? ES fallback.
   */
  readonly dossierByLocale: {
    readonly es: CaseDossierLocale
    readonly en: CaseDossierLocale
    readonly ca: CaseDossierLocale
  }
  /**
   * Locale-keyed meta (Phase 5).
   * generateMetadata uses metaByLocale[locale] ?? meta (ES fallback).
   */
  readonly metaByLocale: {
    readonly es: CaseDetailMeta
    readonly en: CaseDetailMeta
    readonly ca: CaseDetailMeta
  }
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

const magupellEn: CaseStudyCopy = {
  eyebrow: 'IN PRODUCTION · LEATHER SECTOR',
  title: 'Full digitalisation of quality inspection in the leather sector',
  text: '100+ functional requirements · 200+ automated tests · Production: 1 July 2026 · Real billing through the platform',
  status: 'View case',
}

const magupellCa: CaseStudyCopy = {
  eyebrow: 'EN PRODUCCIÓ · SECTOR PELL',
  title: 'Digitalització integral de la inspecció de qualitat en el sector de la pell',
  text: '100+ requisits funcionals · 200+ proves automatitzades · Producció: 1 juliol 2026 · Facturació real a través de la plataforma',
  status: 'Veure cas',
}

const magupellDossierEs: CaseDossierLocale = {
  sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B',
  readouts: [
    { label: 'REQUISITOS', value: '100+', caption: 'funcionales en producción' },
    { label: 'PRUEBAS', value: '200+', caption: 'automatizadas' },
    { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio · Google Cloud' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'factura a sus clientes en la plataforma' },
  ],
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

const magupellDossierEn: CaseDossierLocale = {
  sector: 'DOSSIER 01 · LEATHER SECTOR · B2B',
  readouts: [
    { label: 'REQUIREMENTS', value: '100+', caption: 'functional, in production' },
    { label: 'TESTS', value: '200+', caption: 'automated' },
    { label: 'PRODUCTION', value: 'JUL 2026', caption: 'own domain · Google Cloud' },
    { label: 'OPERATION', value: 'REAL', caption: 'invoicing clients through the platform' },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'MAGUPELL, S.L. carries out quality inspections of leather for luxury brands. Its operations — inspection, batch results, technical data sheets, catalogues, clients and billing — depended on manual processes and unsystematised knowledge.',
    },
    {
      key: 'PROBLEM',
      body: 'The core of the business lived outside any system: hard to trace, hard to invoice, impossible to scale.',
    },
    {
      key: 'SOLUTION',
      body: 'Escala designed and built its complete platform: a custom B2B web application covering the entire operational cycle, from inspection registration with photographic evidence through to client invoicing, with user and role management, a master product catalogue, a batch results model adapted to the sector, transactional email on the client\'s domain and document generation.',
    },
    {
      key: 'IMPACT',
      body: 'From initial requirements to production with more than a hundred functional requirements and more than two hundred automated tests. Live on 1 July 2026 on its own domain on Google Cloud, generating value from the first month: strong user adoption, operational stability and a key milestone — the company now operates and invoices its clients directly through the application.',
    },
    {
      key: 'NEXT STEPS',
      body: 'The alliance continues with monthly support and evolution, with new features entering production based on real user feedback.',
    },
  ],
  meta: {
    title: 'MAGUPELL — Leather sector digitalisation | Escala',
    description:
      'How Escala designed and built the MAGUPELL B2B platform: 100+ requirements, 200+ automated tests, live on Google Cloud since July 2026.',
  },
}

const magupellDossierCa: CaseDossierLocale = {
  sector: 'EXPEDIENT 01 · SECTOR PELL · B2B',
  readouts: [
    { label: 'REQUISITS', value: '100+', caption: 'funcionals en producció' },
    { label: 'PROVES', value: '200+', caption: 'automatitzades' },
    { label: 'PRODUCCIÓ', value: 'JUL 2026', caption: 'domini propi · Google Cloud' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'factura els seus clients a la plataforma' },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'MAGUPELL, S.L. realitza inspeccions de qualitat de pells per a marques de luxe. La seva operativa —inspecció, resultats per lot, fitxes tècniques, catàlegs, clients i cobraments— depenia de processos manuals i de coneixement no sistematitzat.',
    },
    {
      key: 'PROBLEMA',
      body: 'El cor del negoci vivia fora de qualsevol sistema: difícil de traçar, difícil de facturar, impossible d\'escalar.',
    },
    {
      key: 'SOLUCIÓ',
      body: 'Escala va dissenyar i construir la seva plataforma completa: una aplicació web B2B a mida que cobreix tot el cicle operatiu, des del registre de la inspecció amb evidència fotogràfica fins a la facturació als seus clients, amb gestió d\'usuaris i rols, catàleg mestre de productes, model de resultats de lot adaptat al sector, correu transaccional amb el domini del client i generació de documents.',
    },
    {
      key: 'IMPACTE',
      body: 'Dels requisits inicials a producció amb més de cent requisits funcionals i més de dues-centes proves automatitzades. En producció l\'1 de juliol de 2026 en domini propi sobre Google Cloud, generant valor des del primer mes: gran acceptació dels usuaris, estabilitat operativa i una fita clau — l\'empresa ja opera i factura els seus clients directament a través de l\'aplicació.',
    },
    {
      key: 'PASSOS SEGÜENTS',
      body: 'L\'aliança continua en suport i evolució mensual, amb noves funcionalitats entrant en producció a partir del feedback real dels usuaris.',
    },
  ],
  meta: {
    title: 'MAGUPELL — Digitalització del sector pell | Escala',
    description:
      'Com Escala va dissenyar i construir la plataforma B2B de MAGUPELL: 100+ requisits, 200+ proves automatitzades, en producció a Google Cloud des del juliol 2026.',
  },
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
    en: magupellEn,
    ca: magupellCa,
  },
  cardSubtitle:
    'Digitalización integral de la inspección de calidad en el sector de la piel.',
  plate: 'FIG. EXP-01\nESCALA · 2026',
  // ES backward-compat fields (used by existing tests)
  readouts: magupellDossierEs.readouts,
  fields: magupellDossierEs.fields,
  meta: magupellDossierEs.meta,
  dossierByLocale: {
    es: magupellDossierEs,
    en: magupellDossierEn,
    ca: magupellDossierCa,
  },
  metaByLocale: {
    es: magupellDossierEs.meta,
    en: magupellDossierEn.meta,
    ca: magupellDossierCa.meta,
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

const biozeroEn: CaseStudyCopy = {
  eyebrow: 'V1 DELIVERED · DENTAL CLINIC + AI',
  title: 'Dental clinic management platform with AI',
  text: 'Collaborative clinical records, patient gamification and image analysis with state-of-the-art vision models.',
  status: 'View case',
}

const biozeroCa: CaseStudyCopy = {
  eyebrow: 'V1 LLIURADA · CLÍNICA DENTAL + IA',
  title: 'Plataforma de gestió clínica dental amb IA',
  text: 'Historials clínics col·laboratius, gamificació del pacient i anàlisi d\'imatges amb models de visió d\'última generació.',
  status: 'Veure cas',
}

const biozeroDossierEs: CaseDossierLocale = {
  sector: 'EXPEDIENTE 02 · CLÍNICA DENTAL · IA APLICADA',
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

const biozeroDossierEn: CaseDossierLocale = {
  sector: 'DOSSIER 02 · DENTAL CLINIC · APPLIED AI',
  readouts: [
    { label: 'STATUS', value: 'V1 DELIVERED', caption: 'foundation ready to evolve' },
    { label: 'RELATIONSHIP', value: 'FIRST CLIENT', caption: 'of Escala' },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Collaborative clinical records',
      body: 'Shared and traceable patient history record.',
    },
    {
      index: '02',
      title: 'Patient gamification',
      body: 'Engagement mechanics to improve adherence.',
    },
    {
      index: '03',
      title: 'AI image analysis',
      // EDITORIAL GUARDRAIL: capability-framed only — not diagnostic.
      body: 'State-of-the-art vision models applied to oral health analysis.',
    },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'BioZero was Escala\'s first client: a management platform for dental clinics with AI-assisted oral health analysis.',
    },
    {
      key: 'SOLUTION & IMPACT',
      body: 'The first version, already delivered, digitalised key processes and established a technology foundation ready to evolve. The project was conceived from the outset as a strategic asset that will grow alongside the business.',
    },
    {
      key: 'WHAT IT DEMONSTRATES',
      // EDITORIAL GUARDRAIL: capability-framed proof point — not a diagnostic claim.
      body: 'BioZero demonstrates Escala\'s ability to apply AI in a useful and concrete way in a regulated and sensitive sector, and to take a product from concept to a first functional version in the client\'s hands.',
    },
  ],
  meta: {
    title: 'BioZero — Dental clinic management with AI | Escala',
    description:
      'How Escala built the BioZero platform: collaborative records, patient gamification and AI image analysis. V1 delivered.',
  },
}

const biozeroDossierCa: CaseDossierLocale = {
  sector: 'EXPEDIENT 02 · CLÍNICA DENTAL · IA APLICADA',
  readouts: [
    { label: 'ESTAT', value: 'V1 LLIURADA', caption: 'base preparada per evolucionar' },
    { label: 'RELACIÓ', value: 'PRIMER CLIENT', caption: "d'Escala" },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Historials clínics col·laboratius',
      body: 'Registre compartit i traçable de l\'historial del pacient.',
    },
    {
      index: '02',
      title: 'Gamificació del pacient',
      body: 'Mecàniques d\'implicació per millorar l\'adherència.',
    },
    {
      index: '03',
      title: 'Anàlisi d\'imatges amb IA',
      // EDITORIAL GUARDRAIL: capability-framed only — not diagnostic.
      body: 'Models de visió d\'última generació aplicats a l\'anàlisi de salut oral.',
    },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'BioZero va ser el primer client d\'Escala: una plataforma de gestió per a clíniques dentals amb anàlisi de salut oral assistida per intel·ligència artificial.',
    },
    {
      key: 'SOLUCIÓ I IMPACTE',
      body: 'La primera versió, ja lliurada, va digitalitzar processos clau i va establir una base tecnològica preparada per evolucionar. El projecte es va concebre des de l\'inici com un actiu estratègic que creixerà juntament amb el negoci.',
    },
    {
      key: 'QUÈ DEMOSTRA',
      // EDITORIAL GUARDRAIL: capability-framed proof point — not a diagnostic claim.
      body: 'BioZero acredita la capacitat d\'Escala per aplicar IA de forma útil i concreta en un sector regulat i sensible, i per portar un producte des del concepte fins a una primera versió funcional en mans del client.',
    },
  ],
  meta: {
    title: 'BioZero — Gestió clínica dental amb IA | Escala',
    description:
      'Com Escala va construir la plataforma de BioZero: historials col·laboratius, gamificació del pacient i anàlisi d\'imatges amb IA. V1 lliurada.',
  },
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
    en: biozeroEn,
    ca: biozeroCa,
  },
  cardSubtitle:
    'Plataforma de gestión clínica dental con análisis asistido por IA.',
  plate: 'FIG. EXP-02\nESCALA · PRIMER CLIENTE',
  // ES backward-compat fields (used by existing tests)
  readouts: biozeroDossierEs.readouts,
  capabilities: biozeroDossierEs.capabilities,
  fields: biozeroDossierEs.fields,
  meta: biozeroDossierEs.meta,
  dossierByLocale: {
    es: biozeroDossierEs,
    en: biozeroDossierEn,
    ca: biozeroDossierCa,
  },
  metaByLocale: {
    es: biozeroDossierEs.meta,
    en: biozeroDossierEn.meta,
    ca: biozeroDossierCa.meta,
  },
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const cases: readonly CaseStudy[] = [MAGUPELL, BIOZERO] as const

/**
 * Returns the CaseStudy for the given slug, or null if not found.
 */
export function getCase(slug: string, _locale?: string): CaseStudy | null {
  return cases.find((c) => c.slug === slug) ?? null
}
