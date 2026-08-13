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

/** Presentation mode — drives ReadoutStrip vs. CapabilityGrid prominence (legacy cases). */
export type CaseMode = 'data-forward' | 'capability-forward'

// ---------------------------------------------------------------------------
// Canonical dossier blocks — SPEC-CASE-01 §3.
// CaseDossier is the single source of truth for every case going forward
// (approved deviation from the original per-mode split — see DECISIONS.md).
// A case supplies `readoutGrid` + `narrative` to render through the canonical
// template; legacy `readouts`/`fields`/`capabilities` remain supported as a
// fallback so existing/future minimal cases keep working without new data.
// ---------------------------------------------------------------------------

/** One cell in the 2×3 (or n-cell) canonical readout grid. */
export type CaseReadoutCell = {
  /** Mono key prefix, e.g. "DAT.01". */
  readonly key: string
  /** Label after the key, e.g. "REQUISITOS". */
  readonly label: string
  readonly value: string
  readonly caption: string
}

/** A plain numbered narrative block ("prose") — CONTEXTO, PUNTO DE PARTIDA, etc. */
export type CaseNarrativeProse = {
  readonly variant: 'prose'
  readonly num: string
  readonly label: string
  readonly paragraphs: readonly string[]
}

/** One node in the operational-flow figure (FIG. EXP-02). */
export type CaseFlowNode = {
  readonly index: string
  readonly title: string
  readonly detail: string
}

/** The "solución" block: prose + the operational-flow figure. */
export type CaseNarrativeFlowFig = {
  readonly variant: 'flow-fig'
  readonly num: string
  readonly label: string
  readonly paragraphs: readonly string[]
  readonly flowNodes: readonly CaseFlowNode[]
  readonly flowBand: string
  readonly flowCaption: string
  readonly flowAriaLabel: string
}

/** One role card in the "a medida de cada rol" section. */
export type CaseRole = {
  readonly index: string
  readonly title: string
  readonly body: string
}

/** Section 04 — role cards. */
export type CaseNarrativeRoles = {
  readonly variant: 'roles'
  readonly num: string
  readonly label: string
  readonly lead: string
  readonly roles: readonly CaseRole[]
}

/** One governance card (dark abisal surface). */
export type CaseGovernanceCard = {
  readonly label: string
  readonly body: string
}

/** Section 05 — governance, rendered on the abisal surface. */
export type CaseNarrativeGovernance = {
  readonly variant: 'governance'
  readonly num: string
  readonly label: string
  readonly heading: string
  readonly lead: string
  readonly cards: readonly CaseGovernanceCard[]
}

/** Section 03 (BioZero legacy) — capability grid, still supported. */
export type CaseNarrativeCapabilities = {
  readonly variant: 'capabilities'
  readonly num: string
  readonly label: string
  readonly sectionLabel: string
  readonly capabilities: readonly CaseCapability[]
}

/** One rung in the chronology ladder (FIG. EXP-03). */
export type CaseTimelineMilestone = {
  readonly date: string
  readonly title: string
  readonly detail: string
}

/** Section 06 — impact narrative + chronology ladder. */
export type CaseNarrativeTimeline = {
  readonly variant: 'timeline'
  readonly num: string
  readonly label: string
  readonly paragraphs: readonly string[]
  readonly milestones: readonly CaseTimelineMilestone[]
  readonly timelineCaption: string
  readonly timelineAriaLabel: string
}

/** Discriminated union of every narrative block variant. */
export type CaseNarrativeBlock =
  | CaseNarrativeProse
  | CaseNarrativeFlowFig
  | CaseNarrativeRoles
  | CaseNarrativeGovernance
  | CaseNarrativeCapabilities
  | CaseNarrativeTimeline

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
  /**
   * Canonical readout grid (SPEC-CASE-01). When present, CaseDossier renders
   * this via CaseReadoutGrid instead of the legacy ReadoutStrip.
   */
  readonly readoutGrid?: readonly CaseReadoutCell[]
  /**
   * Canonical numbered narrative (SPEC-CASE-01). When present, CaseDossier
   * renders this via CaseNarrative instead of the legacy DossierField list.
   */
  readonly narrative?: readonly CaseNarrativeBlock[]
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
  /** One-line subtitle shown in CaseCard below the case name (ES fallback). */
  readonly cardSubtitle: string
  /**
   * Locale-keyed card subtitle (SPEC-CASE-01 §5). Optional so existing cases
   * without a translated subtitle keep working via the ES fallback above.
   */
  readonly cardSubtitleByLocale?: {
    readonly es: string
    readonly en: string
    readonly ca: string
  }
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
  title: 'De la inspección manual a una plataforma que orquesta todo el negocio',
  text: '167 → 216 requisitos · 1.803 pruebas automatizadas · 7 meses a producción · 4 roles, un solo dato',
  status: 'Ver caso',
}

const magupellEn: CaseStudyCopy = {
  eyebrow: 'IN PRODUCTION · LEATHER SECTOR',
  title: 'From manual inspection to a platform that runs the whole business',
  text: '167 → 216 requirements · 1,803 automated tests · 7 months to production · 4 roles, one dataset',
  status: 'View case',
}

const magupellCa: CaseStudyCopy = {
  eyebrow: 'EN PRODUCCIÓ · SECTOR PELL',
  title: "De la inspecció manual a una plataforma que orquestra tot el negoci",
  text: '167 → 216 requisits · 1.803 proves automatitzades · 7 mesos a producció · 4 rols, una sola dada',
  status: 'Veure cas',
}

// ── Canonical readout grid (DAT.01–06) — SPEC-CASE-01 §2 ────────────────────
const MAGUPELL_READOUT_GRID_ES: readonly CaseReadoutCell[] = [
  { key: 'DAT.01', label: 'REQUISITOS', value: '167 → 216', caption: 'Refinados con iteración y prototipo antes de construir.' },
  { key: 'DAT.02', label: 'PRUEBAS', value: '1.803', caption: '1.042 backend + 761 frontend. Cada cambio se despliega con la red puesta.' },
  { key: 'DAT.03', label: 'TIEMPO A PRODUCCIÓN', value: '7 meses', caption: 'De los primeros requerimientos a la operación real.' },
  { key: 'DAT.04', label: 'ROLES', value: '4 roles', caption: 'Administración, inspector, cliente y proveedor, cada uno con su propio panel.' },
  { key: 'DAT.05', label: 'ENTORNOS', value: '3 entornos', caption: 'Local, desarrollo y producción, con pipelines protegidas.' },
  { key: 'DAT.06', label: 'OPERATIVA', value: 'REAL', caption: 'En producción desde jul 2026 en dominio propio sobre Google Cloud. Los resúmenes de cobro se preparan y se envían desde la plataforma.' },
]

// ── Canonical numbered narrative (sections 01–07) — SPEC-CASE-01 §3 ─────────
const MAGUPELL_NARRATIVE_ES: readonly CaseNarrativeBlock[] = [
  {
    variant: 'prose',
    num: '01',
    label: 'CONTEXTO',
    paragraphs: [
      'Magupell, S.L. inspecciona la calidad de las pieles que las marcas de lujo de moda y marroquinería compran a sus tenerías. Es un negocio de nicho, técnico y exigente: cada lote se clasifica, se somete a pruebas, se contrasta contra un patrón de referencia acordado y se documenta con evidencia fotográfica.',
      'Un servicio que funciona y que creció más rápido que los sistemas que lo sostenían.',
    ],
  },
  {
    variant: 'prose',
    num: '02',
    label: 'PUNTO DE PARTIDA',
    paragraphs: [
      'El corazón del negocio —inspección, resultados por lote, fichas técnicas, catálogos, clientes y cobros— vivía fuera de cualquier sistema: hojas de cálculo, documentos sueltos y conocimiento no sistematizado. Difícil de trazar, difícil de cobrar, imposible de escalar.',
      'No era un fallo del negocio: era el límite de la operativa manual.',
    ],
  },
  {
    variant: 'flow-fig',
    num: '03',
    label: 'SOLUCIÓN',
    paragraphs: [
      'Escala diseñó y construyó la plataforma completa: una aplicación web B2B a medida que cubre el ciclo operativo de extremo a extremo. Del catálogo de clientes, proveedores y estándares de calidad acordados, a la inspección en campo desde tablet con evidencia fotográfica; de ahí a la revisión y aprobación interna, la distribución del informe y el resumen de cobro que cierra el período.',
      'Con gestión de usuarios y roles, generación de documentos, correo transaccional con el dominio corporativo del cliente y notificaciones en tiempo real. Una arquitectura preparada para evolucionar durante años.',
    ],
    flowNodes: [
      { index: '01', title: 'Catálogo', detail: 'Clientes, proveedores y estándares de calidad acordados' },
      { index: '02', title: 'Inspección', detail: 'En tablet, sobre el terreno, con evidencia fotográfica' },
      { index: '03', title: 'Revisión y envío', detail: 'Aprobación interna y distribución del informe' },
      { index: '04', title: 'Cobro', detail: 'Resumen del período, calculado y enviado desde el sistema' },
    ],
    flowBand: 'UN SOLO DATO · TRAZABILIDAD COMPLETA · NOTIFICACIONES EN TIEMPO REAL',
    flowCaption: 'FIG. EXP-02 — UN ÚNICO FLUJO, DE LA INSPECCIÓN AL COBRO',
    flowAriaLabel:
      'Ciclo operativo de cuatro etapas: catálogo, inspección, revisión y envío, cobro. Un solo dato y trazabilidad completa en todas las etapas.',
  },
  {
    variant: 'roles',
    num: '04',
    label: 'A MEDIDA DE CADA ROL',
    lead: 'Una sola plataforma, cuatro formas de trabajar. Cada rol entra y ve exactamente lo que necesita —ni más, ni menos— con su propio cuadro de mando.',
    roles: [
      {
        index: 'ROL 01',
        title: 'Administración',
        body: 'Dirige la operación de principio a fin: configura, revisa, aprueba, distribuye y cierra el período, con una visión del negocio en tiempo real.',
      },
      {
        index: 'ROL 02',
        title: 'Inspector',
        body: 'Trabaja sobre el terreno desde la tablet: registra la inspección con su evidencia fotográfica y la envía a revisión sin pasar por el papel ni por la hoja de cálculo.',
      },
      {
        index: 'ROL 03',
        title: 'Cliente',
        body: 'Accede a su portal para consultar y descargar los informes de sus lotes y seguir la evolución de la calidad recibida.',
      },
      {
        index: 'ROL 04',
        title: 'Proveedor',
        body: 'Consulta el resultado de las inspecciones de los lotes que ha producido, con la información acotada a lo que le corresponde.',
      },
    ],
  },
  {
    variant: 'governance',
    num: '05',
    label: 'GOBERNANZA',
    heading: 'Crecer sin perder el control de lo que ocurre.',
    lead: 'Abrir la operación a más usuarios solo es posible si cada uno ve estrictamente lo suyo y toda decisión queda registrada. Esa es la diferencia entre digitalizar y poder escalar.',
    cards: [
      { label: 'ACCESO', body: 'Permisos por rol: cada usuario accede únicamente a la información que le corresponde.' },
      { label: 'TRAZABILIDAD', body: 'Quién hizo qué, cuándo y sobre qué lote. Las decisiones quedan registradas con su justificación.' },
      { label: 'DATOS EN LA UE', body: 'Alojamiento en Google Cloud, región europea, sin transferencias fuera del EEE, con copias de seguridad automáticas.' },
      { label: 'CAMBIOS SEGUROS', body: '1.803 pruebas automatizadas y tres entornos con pipelines protegidas: la plataforma evoluciona cada mes sin poner en riesgo la operación.' },
    ],
  },
  {
    variant: 'timeline',
    num: '06',
    label: 'IMPACTO',
    paragraphs: [
      'En su primer mes en producción, la plataforma dejó de ser un proyecto para convertirse en la forma de trabajar. Todos los perfiles operan dentro del sistema: la inspección nace sobre el terreno y llega al resumen de cobro sin salir de él.',
      'El cambio no es solo de herramienta. Magupell pasó de reconstruir su información a consultarla, y lo hizo con el estándar de ingeniería del software empresarial global aplicado a un negocio de nicho.',
    ],
    milestones: [
      { date: 'DIC 2025', title: 'Requerimientos', detail: 'Análisis del negocio, proceso a proceso.' },
      { date: 'ENE 2026', title: 'Prototipo', detail: 'Prototipo navegable aprobado antes de construir. 167 → 216 requisitos.' },
      { date: 'ABR 2026', title: 'Desarrollo', detail: 'Construcción con pruebas automatizadas desde el primer día.' },
      { date: 'MAY–JUN 2026', title: 'Preproducción', detail: 'Validación y puesta a punto con los usuarios.' },
      { date: 'JUL 2026', title: 'Producción', detail: 'Dominio propio sobre Google Cloud. Operación real desde el primer mes.' },
    ],
    timelineCaption: 'FIG. EXP-03 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS',
    timelineAriaLabel:
      'Cronología de siete meses: diciembre 2025 requerimientos, enero 2026 prototipo, abril 2026 desarrollo, mayo a junio 2026 preproducción, julio 2026 producción.',
  },
  {
    variant: 'prose',
    num: '07',
    label: 'SIGUIENTES PASOS',
    paragraphs: [
      'La alianza continúa en soporte y evolución mensual: cada mejora se especifica, se acuerda y entra en producción a partir del feedback real de quienes usan el sistema todos los días. La plataforma no está terminada — está viva, y crece al ritmo del negocio.',
    ],
  },
]

const magupellDossierEs: CaseDossierLocale = {
  sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B · EN PRODUCCIÓN',
  // Legacy fields kept for backward compatibility; CaseDossier prefers
  // readoutGrid/narrative below when present.
  readouts: [
    { label: 'REQUISITOS', value: '167 → 216', caption: 'refinados con iteración y prototipo' },
    { label: 'PRUEBAS', value: '1.803', caption: '1.042 backend + 761 frontend' },
    { label: 'PRODUCCIÓN', value: 'JUL 2026', caption: 'dominio propio · Google Cloud' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'resúmenes de cobro desde la plataforma' },
  ],
  fields: [
    {
      key: 'CONTEXTO',
      body: 'Magupell, S.L. inspecciona la calidad de las pieles que las marcas de lujo compran a sus tenerías. Su operativa dependía de procesos manuales y de conocimiento no sistematizado.',
    },
    {
      key: 'PUNTO DE PARTIDA',
      body: 'El corazón del negocio vivía fuera de cualquier sistema: difícil de trazar, difícil de cobrar, imposible de escalar.',
    },
    {
      key: 'SOLUCIÓN',
      body: 'Escala diseñó y construyó su plataforma completa: una aplicación web B2B a medida que cubre todo el ciclo operativo de extremo a extremo, del catálogo a la inspección, la revisión y el resumen de cobro.',
    },
    {
      key: 'IMPACTO',
      body: 'De los primeros requerimientos a producción en 7 meses, con 1.803 pruebas automatizadas. En producción desde julio 2026 en dominio propio sobre Google Cloud.',
    },
    {
      key: 'SIGUIENTES PASOS',
      body: 'La alianza continúa en soporte y evolución mensual, con nuevas funcionalidades entrando en producción a partir del feedback real de los usuarios.',
    },
  ],
  // SEO-01 §3.1 — primary term: "digitalización de inspección de calidad".
  // "cobro" (billing summary), never "factura" — §0.3.
  meta: {
    title: 'Caso Magupell — Inspección de calidad digitalizada',
    description:
      '216 requisitos, 1.803 pruebas automatizadas y siete meses de la primera reunión a producción. Un solo flujo, de la inspección al cobro.',
  },
  readoutGrid: MAGUPELL_READOUT_GRID_ES,
  narrative: MAGUPELL_NARRATIVE_ES,
}

const MAGUPELL_READOUT_GRID_EN: readonly CaseReadoutCell[] = [
  { key: 'DAT.01', label: 'REQUIREMENTS', value: '167 → 216', caption: 'Refined through iteration and a prototype before build.' },
  { key: 'DAT.02', label: 'TESTS', value: '1,803', caption: '1,042 backend + 761 frontend. Every change ships with the safety net in place.' },
  { key: 'DAT.03', label: 'TIME TO PRODUCTION', value: '7 months', caption: 'From the first requirements to real operation.' },
  { key: 'DAT.04', label: 'ROLES', value: '4 roles', caption: 'Admin, inspector, client and supplier, each with their own dashboard.' },
  { key: 'DAT.05', label: 'ENVIRONMENTS', value: '3 environments', caption: 'Local, development and production, with protected pipelines.' },
  { key: 'DAT.06', label: 'OPERATION', value: 'REAL', caption: 'Live since Jul 2026 on its own domain on Google Cloud. Billing summaries are prepared and sent from the platform.' },
]

const MAGUPELL_NARRATIVE_EN: readonly CaseNarrativeBlock[] = [
  {
    variant: 'prose',
    num: '01',
    label: 'CONTEXT',
    paragraphs: [
      'Magupell, S.L. inspects the quality of the leather that luxury fashion and leather-goods brands buy from their tanneries. It is a niche, technical and demanding business: every batch is classified, tested, checked against an agreed reference standard and documented with photographic evidence.',
      'A service that works, and that grew faster than the systems supporting it.',
    ],
  },
  {
    variant: 'prose',
    num: '02',
    label: 'STARTING POINT',
    paragraphs: [
      'The heart of the business — inspection, batch results, technical data sheets, catalogues, clients and billing — lived outside any system: spreadsheets, loose documents and unsystematised knowledge. Hard to trace, hard to bill, impossible to scale.',
      'It was not a failure of the business: it was the limit of manual operation.',
    ],
  },
  {
    variant: 'flow-fig',
    num: '03',
    label: 'SOLUTION',
    paragraphs: [
      'Escala designed and built the complete platform: a custom B2B web application covering the operational cycle end to end. From the catalogue of clients, suppliers and agreed quality standards, to field inspection from a tablet with photographic evidence; from there to internal review and approval, report distribution and the billing summary that closes the period.',
      "With user and role management, document generation, transactional email on the client's corporate domain and real-time notifications. An architecture built to evolve for years.",
    ],
    flowNodes: [
      { index: '01', title: 'Catalogue', detail: 'Clients, suppliers and agreed quality standards' },
      { index: '02', title: 'Inspection', detail: 'On tablet, in the field, with photographic evidence' },
      { index: '03', title: 'Review & send', detail: 'Internal approval and report distribution' },
      { index: '04', title: 'Billing', detail: 'Period summary, calculated and sent from the system' },
    ],
    flowBand: 'ONE DATASET · FULL TRACEABILITY · REAL-TIME NOTIFICATIONS',
    flowCaption: 'FIG. EXP-02 — ONE SINGLE FLOW, FROM INSPECTION TO BILLING',
    flowAriaLabel:
      'Four-stage operational cycle: catalogue, inspection, review and send, billing. One dataset and full traceability across every stage.',
  },
  {
    variant: 'roles',
    num: '04',
    label: 'BUILT AROUND EACH ROLE',
    lead: 'One platform, four ways of working. Each role logs in and sees exactly what it needs — no more, no less — with its own dashboard.',
    roles: [
      { index: 'ROLE 01', title: 'Admin', body: 'Runs the operation end to end: configures, reviews, approves, distributes and closes the period, with a real-time view of the business.' },
      { index: 'ROLE 02', title: 'Inspector', body: 'Works in the field from a tablet: records the inspection with photographic evidence and sends it for review without paper or spreadsheets.' },
      { index: 'ROLE 03', title: 'Client', body: 'Accesses their portal to view and download batch reports and track the quality received over time.' },
      { index: 'ROLE 04', title: 'Supplier', body: "Checks the inspection results of the batches they produced, with information limited to what's relevant to them." },
    ],
  },
  {
    variant: 'governance',
    num: '05',
    label: 'GOVERNANCE',
    heading: 'Growing without losing control of what happens.',
    lead: 'Opening the operation to more users is only possible if each one sees strictly their own data and every decision is logged. That is the difference between digitalising and being able to scale.',
    cards: [
      { label: 'ACCESS', body: 'Role-based permissions: each user accesses only the information that belongs to them.' },
      { label: 'TRACEABILITY', body: 'Who did what, when, and on which batch. Decisions are logged with their justification.' },
      { label: 'DATA IN THE EU', body: 'Hosted on Google Cloud, European region, no transfers outside the EEA, with automatic backups.' },
      { label: 'SAFE CHANGES', body: '1,803 automated tests and three environments with protected pipelines: the platform evolves every month without risking operations.' },
    ],
  },
  {
    variant: 'timeline',
    num: '06',
    label: 'IMPACT',
    paragraphs: [
      'In its first month in production, the platform stopped being a project and became the way of working. Every profile operates inside the system: inspection is born in the field and reaches the billing summary without ever leaving it.',
      "The change isn't just a tool. Magupell went from rebuilding its information to consulting it, and did so with the engineering standard of global enterprise software applied to a niche business.",
    ],
    milestones: [
      { date: 'DEC 2025', title: 'Requirements', detail: 'Business analysis, process by process.' },
      { date: 'JAN 2026', title: 'Prototype', detail: 'Navigable prototype approved before build. 167 → 216 requirements.' },
      { date: 'APR 2026', title: 'Development', detail: 'Build with automated tests from day one.' },
      { date: 'MAY–JUN 2026', title: 'Pre-production', detail: 'Validation and fine-tuning with users.' },
      { date: 'JUL 2026', title: 'Production', detail: 'Own domain on Google Cloud. Real operation from the first month.' },
    ],
    timelineCaption: 'FIG. EXP-03 — FROM REQUIREMENTS TO PRODUCTION IN 7 MONTHS, WITH VERIFIED DATES',
    timelineAriaLabel:
      'Seven-month timeline: December 2025 requirements, January 2026 prototype, April 2026 development, May to June 2026 pre-production, July 2026 production.',
  },
  {
    variant: 'prose',
    num: '07',
    label: 'NEXT STEPS',
    paragraphs: [
      "The alliance continues with monthly support and evolution: every improvement is specified, agreed and shipped to production based on real feedback from the people who use the system every day. The platform isn't finished — it's alive, and it grows at the pace of the business.",
    ],
  },
]

const magupellDossierEn: CaseDossierLocale = {
  sector: 'DOSSIER 01 · LEATHER SECTOR · B2B · IN PRODUCTION',
  readouts: [
    { label: 'REQUIREMENTS', value: '167 → 216', caption: 'refined through iteration and a prototype' },
    { label: 'TESTS', value: '1,803', caption: '1,042 backend + 761 frontend' },
    { label: 'PRODUCTION', value: 'JUL 2026', caption: 'own domain · Google Cloud' },
    { label: 'OPERATION', value: 'REAL', caption: 'billing summaries from the platform' },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'Magupell, S.L. inspects the quality of the leather that luxury brands buy from their tanneries. Its operations depended on manual processes and unsystematised knowledge.',
    },
    {
      key: 'STARTING POINT',
      body: 'The heart of the business lived outside any system: hard to trace, hard to bill, impossible to scale.',
    },
    {
      key: 'SOLUTION',
      body: 'Escala designed and built its complete platform: a custom B2B web application covering the entire operational cycle end to end, from the catalogue to inspection, review and the billing summary.',
    },
    {
      key: 'IMPACT',
      body: 'From the first requirements to production in 7 months, with 1,803 automated tests. Live since July 2026 on its own domain on Google Cloud.',
    },
    {
      key: 'NEXT STEPS',
      body: 'The alliance continues with monthly support and evolution, with new features entering production based on real user feedback.',
    },
  ],
  // SEO-01 §3.2 — "billing summary", never "invoicing" (§0.3).
  // EN number formatting: 1,803 (§8).
  meta: {
    title: 'Magupell Case Study — Quality Inspection Digitised',
    description:
      '216 requirements, 1,803 automated tests and seven months from first meeting to production. One flow, from inspection to billing summary.',
  },
  readoutGrid: MAGUPELL_READOUT_GRID_EN,
  narrative: MAGUPELL_NARRATIVE_EN,
}

const MAGUPELL_READOUT_GRID_CA: readonly CaseReadoutCell[] = [
  { key: 'DAT.01', label: 'REQUISITS', value: '167 → 216', caption: 'Refinats amb iteració i prototip abans de construir.' },
  { key: 'DAT.02', label: 'PROVES', value: '1.803', caption: '1.042 backend + 761 frontend. Cada canvi es desplega amb la xarxa posada.' },
  { key: 'DAT.03', label: 'TEMPS A PRODUCCIÓ', value: '7 mesos', caption: 'Dels primers requeriments a l\'operació real.' },
  { key: 'DAT.04', label: 'ROLS', value: '4 rols', caption: 'Administració, inspector, client i proveïdor, cadascun amb el seu propi panell.' },
  { key: 'DAT.05', label: 'ENTORNS', value: '3 entorns', caption: 'Local, desenvolupament i producció, amb pipelines protegides.' },
  { key: 'DAT.06', label: 'OPERATIVA', value: 'REAL', caption: 'En producció des de jul 2026 en domini propi sobre Google Cloud. Els resums de cobrament es preparen i s\'envien des de la plataforma.' },
]

const MAGUPELL_NARRATIVE_CA: readonly CaseNarrativeBlock[] = [
  {
    variant: 'prose',
    num: '01',
    label: 'CONTEXT',
    paragraphs: [
      'Magupell, S.L. inspecciona la qualitat de les pells que les marques de luxe de moda i marroquineria compren a les seves teneries. És un negoci de nínxol, tècnic i exigent: cada lot es classifica, se sotmet a proves, es contrasta contra un patró de referència acordat i es documenta amb evidència fotogràfica.',
      'Un servei que funciona i que va créixer més ràpid que els sistemes que el sostenien.',
    ],
  },
  {
    variant: 'prose',
    num: '02',
    label: 'PUNT DE PARTIDA',
    paragraphs: [
      'El cor del negoci —inspecció, resultats per lot, fitxes tècniques, catàlegs, clients i cobraments— vivia fora de qualsevol sistema: fulls de càlcul, documents solts i coneixement no sistematitzat. Difícil de traçar, difícil de cobrar, impossible d\'escalar.',
      'No era una fallada del negoci: era el límit de l\'operativa manual.',
    ],
  },
  {
    variant: 'flow-fig',
    num: '03',
    label: 'SOLUCIÓ',
    paragraphs: [
      'Escala va dissenyar i construir la plataforma completa: una aplicació web B2B a mida que cobreix el cicle operatiu d\'extrem a extrem. Del catàleg de clients, proveïdors i estàndards de qualitat acordats, a la inspecció en camp des de tablet amb evidència fotogràfica; d\'allà a la revisió i aprovació interna, la distribució de l\'informe i el resum de cobrament que tanca el període.',
      'Amb gestió d\'usuaris i rols, generació de documents, correu transaccional amb el domini corporatiu del client i notificacions en temps real. Una arquitectura preparada per evolucionar durant anys.',
    ],
    flowNodes: [
      { index: '01', title: 'Catàleg', detail: 'Clients, proveïdors i estàndards de qualitat acordats' },
      { index: '02', title: 'Inspecció', detail: 'En tablet, sobre el terreny, amb evidència fotogràfica' },
      { index: '03', title: 'Revisió i enviament', detail: 'Aprovació interna i distribució de l\'informe' },
      { index: '04', title: 'Cobrament', detail: 'Resum del període, calculat i enviat des del sistema' },
    ],
    flowBand: 'UNA SOLA DADA · TRAÇABILITAT COMPLETA · NOTIFICACIONS EN TEMPS REAL',
    flowCaption: 'FIG. EXP-02 — UN ÚNIC FLUX, DE LA INSPECCIÓ AL COBRAMENT',
    flowAriaLabel:
      'Cicle operatiu de quatre etapes: catàleg, inspecció, revisió i enviament, cobrament. Una sola dada i traçabilitat completa a totes les etapes.',
  },
  {
    variant: 'roles',
    num: '04',
    label: 'A MIDA DE CADA ROL',
    lead: 'Una sola plataforma, quatre formes de treballar. Cada rol entra i veu exactament el que necessita —ni més, ni menys— amb el seu propi quadre de comandament.',
    roles: [
      { index: 'ROL 01', title: 'Administració', body: 'Dirigeix l\'operació de principi a fi: configura, revisa, aprova, distribueix i tanca el període, amb una visió del negoci en temps real.' },
      { index: 'ROL 02', title: 'Inspector', body: 'Treballa sobre el terreny des de la tablet: registra la inspecció amb la seva evidència fotogràfica i l\'envia a revisió sense passar pel paper ni pel full de càlcul.' },
      { index: 'ROL 03', title: 'Client', body: 'Accedeix al seu portal per consultar i descarregar els informes dels seus lots i seguir l\'evolució de la qualitat rebuda.' },
      { index: 'ROL 04', title: 'Proveïdor', body: 'Consulta el resultat de les inspeccions dels lots que ha produït, amb la informació acotada al que li correspon.' },
    ],
  },
  {
    variant: 'governance',
    num: '05',
    label: 'GOVERNANÇA',
    heading: 'Créixer sense perdre el control del que passa.',
    lead: 'Obrir l\'operació a més usuaris només és possible si cadascun veu estrictament el que és seu i tota decisió queda registrada. Aquesta és la diferència entre digitalitzar i poder escalar.',
    cards: [
      { label: 'ACCÉS', body: 'Permisos per rol: cada usuari accedeix únicament a la informació que li correspon.' },
      { label: 'TRAÇABILITAT', body: 'Qui va fer què, quan i sobre quin lot. Les decisions queden registrades amb la seva justificació.' },
      { label: 'DADES A LA UE', body: 'Allotjament a Google Cloud, regió europea, sense transferències fora de l\'EEE, amb còpies de seguretat automàtiques.' },
      { label: 'CANVIS SEGURS', body: '1.803 proves automatitzades i tres entorns amb pipelines protegides: la plataforma evoluciona cada mes sense posar en risc l\'operació.' },
    ],
  },
  {
    variant: 'timeline',
    num: '06',
    label: 'IMPACTE',
    paragraphs: [
      'En el seu primer mes en producció, la plataforma va deixar de ser un projecte per convertir-se en la forma de treballar. Tots els perfils operen dins del sistema: la inspecció neix sobre el terreny i arriba al resum de cobrament sense sortir-ne.',
      'El canvi no és només d\'eina. Magupell va passar de reconstruir la seva informació a consultar-la, i ho va fer amb l\'estàndard d\'enginyeria del programari empresarial global aplicat a un negoci de nínxol.',
    ],
    milestones: [
      { date: 'DES 2025', title: 'Requeriments', detail: 'Anàlisi del negoci, procés a procés.' },
      { date: 'GEN 2026', title: 'Prototip', detail: 'Prototip navegable aprovat abans de construir. 167 → 216 requisits.' },
      { date: 'ABR 2026', title: 'Desenvolupament', detail: 'Construcció amb proves automatitzades des del primer dia.' },
      { date: 'MAIG–JUNY 2026', title: 'Preproducció', detail: 'Validació i posada a punt amb els usuaris.' },
      { date: 'JUL 2026', title: 'Producció', detail: 'Domini propi sobre Google Cloud. Operació real des del primer mes.' },
    ],
    timelineCaption: 'FIG. EXP-03 — DELS REQUERIMENTS A PRODUCCIÓ EN 7 MESOS, AMB DATES VERIFICADES',
    timelineAriaLabel:
      'Cronologia de set mesos: desembre 2025 requeriments, gener 2026 prototip, abril 2026 desenvolupament, maig a juny 2026 preproducció, juliol 2026 producció.',
  },
  {
    variant: 'prose',
    num: '07',
    label: 'PASSOS SEGÜENTS',
    paragraphs: [
      'L\'aliança continua en suport i evolució mensual: cada millora s\'especifica, s\'acorda i entra en producció a partir del feedback real de qui utilitza el sistema cada dia. La plataforma no està acabada — està viva, i creix al ritme del negoci.',
    ],
  },
]

const magupellDossierCa: CaseDossierLocale = {
  sector: 'EXPEDIENT 01 · SECTOR PELL · B2B · EN PRODUCCIÓ',
  readouts: [
    { label: 'REQUISITS', value: '167 → 216', caption: 'refinats amb iteració i prototip' },
    { label: 'PROVES', value: '1.803', caption: '1.042 backend + 761 frontend' },
    { label: 'PRODUCCIÓ', value: 'JUL 2026', caption: 'domini propi · Google Cloud' },
    { label: 'OPERATIVA', value: 'REAL', caption: 'resums de cobrament des de la plataforma' },
  ],
  fields: [
    {
      key: 'CONTEXT',
      body: 'Magupell, S.L. inspecciona la qualitat de les pells que les marques de luxe compren a les seves teneries. La seva operativa depenia de processos manuals i de coneixement no sistematitzat.',
    },
    {
      key: 'PUNT DE PARTIDA',
      body: 'El cor del negoci vivia fora de qualsevol sistema: difícil de traçar, difícil de cobrar, impossible d\'escalar.',
    },
    {
      key: 'SOLUCIÓ',
      body: 'Escala va dissenyar i construir la seva plataforma completa: una aplicació web B2B a mida que cobreix tot el cicle operatiu d\'extrem a extrem, del catàleg a la inspecció, la revisió i el resum de cobrament.',
    },
    {
      key: 'IMPACTE',
      body: 'Dels primers requeriments a producció en 7 mesos, amb 1.803 proves automatitzades. En producció des de juliol 2026 en domini propi sobre Google Cloud.',
    },
    {
      key: 'PASSOS SEGÜENTS',
      body: 'L\'aliança continua en suport i evolució mensual, amb noves funcionalitats entrant en producció a partir del feedback real dels usuaris.',
    },
  ],
  // SEO-01 §3.3 — "cobrament" (billing summary), never "factura" (§0.3).
  meta: {
    title: 'Cas Magupell — Inspecció de qualitat digitalitzada',
    description:
      '216 requisits, 1.803 proves automatitzades i set mesos de la primera reunió a producció. Un sol flux, de la inspecció al cobrament.',
  },
  readoutGrid: MAGUPELL_READOUT_GRID_CA,
  narrative: MAGUPELL_NARRATIVE_CA,
}

const MAGUPELL: CaseStudy = {
  slug: 'magupell',
  order: 1,
  name: 'Magupell',
  href: '/casos-de-exito/magupell',
  sector: 'EXPEDIENTE 01 · SECTOR PIEL · B2B · EN PRODUCCIÓN',
  mode: 'data-forward',
  brand: {
    name: 'Magupell',
    logo: magupellLogo,
    url: 'https://www.magupell.com',
  },
  content: {
    es: magupellEs,
    en: magupellEn,
    ca: magupellCa,
  },
  cardSubtitle: 'De la inspección manual a una plataforma que orquesta todo el negocio.',
  cardSubtitleByLocale: {
    es: 'De la inspección manual a una plataforma que orquesta todo el negocio.',
    en: 'From manual inspection to a platform that runs the whole business.',
    ca: 'De la inspecció manual a una plataforma que orquestra tot el negoci.',
  },
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
  // SEO-01 §3.1 — primary term: "IA aplicada en gestión clínica dental".
  // Capability framing only — never medical diagnosis (§0.4 guardrail).
  meta: {
    title: 'Caso BioZero — Gestión clínica dental con IA aplicada',
    description:
      'Primera versión entregada: historiales clínicos colaborativos, gamificación y análisis de imágenes con modelos de visión en un sector regulado.',
  },
  // SPEC-CASE-01: BioZero migrated onto the canonical CaseDossier template.
  // Same copy as above, re-expressed as readoutGrid + narrative (capabilities variant).
  readoutGrid: [
    { key: 'DAT.01', label: 'ESTADO', value: 'V1 ENTREGADA', caption: 'base preparada para evolucionar' },
    { key: 'DAT.02', label: 'RELACIÓN', value: 'PRIMER CLIENTE', caption: 'de Escala' },
  ],
  narrative: [
    {
      variant: 'prose',
      num: '01',
      label: 'CONTEXTO',
      paragraphs: [
        'BioZero fue el primer cliente de Escala: una plataforma de gestión para clínicas dentales con análisis de salud oral asistido por inteligencia artificial.',
      ],
    },
    {
      variant: 'capabilities',
      num: '02',
      label: 'CAPACIDADES ENTREGADAS',
      sectionLabel: 'CAPACIDADES ENTREGADAS',
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
    },
    {
      variant: 'prose',
      num: '03',
      label: 'SOLUCIÓN E IMPACTO',
      paragraphs: [
        'La primera versión, ya entregada, digitalizó procesos clave y estableció una base tecnológica preparada para evolucionar. El proyecto se concibió desde el inicio como un activo estratégico que crecerá junto con el negocio.',
      ],
    },
    {
      variant: 'prose',
      num: '04',
      label: 'LO QUE DEMUESTRA',
      paragraphs: [
        'BioZero acredita la capacidad de Escala para aplicar IA de forma útil y concreta en un sector regulado y sensible, y para llevar un producto desde el concepto hasta una primera versión funcional en manos del cliente.',
      ],
    },
  ],
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
  // SEO-01 §3.2 — capability framing only, never medical diagnosis.
  meta: {
    title: 'BioZero Case Study — Dental Clinic Platform with AI',
    description:
      'First version delivered: collaborative clinical records, patient gamification and image analysis with vision models, in a regulated sector.',
  },
  readoutGrid: [
    { key: 'DAT.01', label: 'STATUS', value: 'V1 DELIVERED', caption: 'foundation ready to evolve' },
    { key: 'DAT.02', label: 'RELATIONSHIP', value: 'FIRST CLIENT', caption: 'of Escala' },
  ],
  narrative: [
    {
      variant: 'prose',
      num: '01',
      label: 'CONTEXT',
      paragraphs: [
        "BioZero was Escala's first client: a management platform for dental clinics with AI-assisted oral health analysis.",
      ],
    },
    {
      variant: 'capabilities',
      num: '02',
      label: 'CAPABILITIES DELIVERED',
      sectionLabel: 'CAPABILITIES DELIVERED',
      capabilities: [
        { index: '01', title: 'Collaborative clinical records', body: 'Shared and traceable patient history record.' },
        { index: '02', title: 'Patient gamification', body: 'Engagement mechanics to improve adherence.' },
        {
          index: '03',
          title: 'AI image analysis',
          // EDITORIAL GUARDRAIL: capability-framed only — not diagnostic.
          body: 'State-of-the-art vision models applied to oral health analysis.',
        },
      ],
    },
    {
      variant: 'prose',
      num: '03',
      label: 'SOLUTION & IMPACT',
      paragraphs: [
        'The first version, already delivered, digitalised key processes and established a technology foundation ready to evolve. The project was conceived from the outset as a strategic asset that will grow alongside the business.',
      ],
    },
    {
      variant: 'prose',
      num: '04',
      label: 'WHAT IT DEMONSTRATES',
      paragraphs: [
        "BioZero demonstrates Escala's ability to apply AI in a useful and concrete way in a regulated and sensitive sector, and to take a product from concept to a first functional version in the client's hands.",
      ],
    },
  ],
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
  // SEO-01 §3.3 — capability framing only, never medical diagnosis.
  meta: {
    title: 'Cas BioZero — Gestió clínica dental amb IA aplicada',
    description:
      'Primera versió lliurada: historials clínics col·laboratius, gamificació i anàlisi d\'imatges amb models de visió en un sector regulat.',
  },
  readoutGrid: [
    { key: 'DAT.01', label: 'ESTAT', value: 'V1 LLIURADA', caption: 'base preparada per evolucionar' },
    { key: 'DAT.02', label: 'RELACIÓ', value: 'PRIMER CLIENT', caption: "d'Escala" },
  ],
  narrative: [
    {
      variant: 'prose',
      num: '01',
      label: 'CONTEXT',
      paragraphs: [
        'BioZero va ser el primer client d\'Escala: una plataforma de gestió per a clíniques dentals amb anàlisi de salut oral assistida per intel·ligència artificial.',
      ],
    },
    {
      variant: 'capabilities',
      num: '02',
      label: 'CAPACITATS LLIURADES',
      sectionLabel: 'CAPACITATS LLIURADES',
      capabilities: [
        { index: '01', title: 'Historials clínics col·laboratius', body: 'Registre compartit i traçable de l\'historial del pacient.' },
        { index: '02', title: 'Gamificació del pacient', body: 'Mecàniques d\'implicació per millorar l\'adherència.' },
        {
          index: '03',
          title: 'Anàlisi d\'imatges amb IA',
          // EDITORIAL GUARDRAIL: capability-framed only — not diagnostic.
          body: 'Models de visió d\'última generació aplicats a l\'anàlisi de salut oral.',
        },
      ],
    },
    {
      variant: 'prose',
      num: '03',
      label: 'SOLUCIÓ I IMPACTE',
      paragraphs: [
        'La primera versió, ja lliurada, va digitalitzar processos clau i va establir una base tecnològica preparada per evolucionar. El projecte es va concebre des de l\'inici com un actiu estratègic que creixerà juntament amb el negoci.',
      ],
    },
    {
      variant: 'prose',
      num: '04',
      label: 'QUÈ DEMOSTRA',
      paragraphs: [
        'BioZero acredita la capacitat d\'Escala per aplicar IA de forma útil i concreta en un sector regulat i sensible, i per portar un producte des del concepte fins a una primera versió funcional en mans del client.',
      ],
    },
  ],
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
/**
 * `locale` is accepted for API symmetry with other locale-aware content
 * helpers but intentionally unused: cases have no per-locale slug/content
 * split yet (ES-only content, Phase 5 fallback — see CHANGELOG). Keeping the
 * parameter (rather than dropping it) preserves the call-site contract
 * exercised by tests/content/cases-data.test.ts ("locale param does not
 * affect result").
 */
export function getCase(slug: string, locale?: string): CaseStudy | null {
  void locale
  return cases.find((c) => c.slug === slug) ?? null
}
