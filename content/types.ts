/**
 * Content dictionary type contracts.
 * Every page dictionary must satisfy its interface — no Partial, no any.
 * EN/CA completeness is enforced by type: re-exports must match ES shapes.
 * Spec: SPEC-P1 FR-3.2
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export interface PageMeta {
  /** Page title — MUST be ≤60 characters. Enforced in tests/lib/i18n/meta.test.ts */
  readonly title: string
  /** Meta description — MUST be ≤155 characters. Enforced in tests/lib/i18n/meta.test.ts */
  readonly description: string
}

// ---------------------------------------------------------------------------
// Page-level dictionary interfaces
// All dictionaries must have a `meta` property (used by generateMetadata).
// Phase 2 will extend each stub with full content fields.
// ---------------------------------------------------------------------------

export interface HomePageDictionary {
  readonly meta: PageMeta
  /**
   * Additional page-specific fields typed via the ES `as const` implementation.
   * The index signature allows extra keys (e.g. hero, labels, footer) so that
   * `homeContent satisfies HomePageDictionary` compiles while still enforcing meta.
   */
  readonly [key: string]: unknown
}

/**
 * Phase 2.2 — full /que-hacemos content. Spec: SPEC-P2.2 FR-7.1
 *
 * Five service variants must match the ServiceFig variant union.
 * Enforced at compile-time via `figVariant` below.
 */
export type ServiceFigVariant = 'capture' | 'platform' | 'ai' | 'product' | 'evolve'

export interface ServicesDictionary {
  readonly meta: PageMeta
  readonly pageHeader: {
    readonly eyebrow: string
    readonly title: string
    readonly lead: string
    /** Mono prefix for the problem line: "EL PROBLEMA" — separated so Phase 5 can translate */
    readonly problemPrefix: string
  }
  /** Exactly 5 service entries. Length enforced in tests/content/content-integrity.test.ts */
  readonly services: ReadonlyArray<{
    readonly index: string
    readonly title: string
    readonly problem: string
    readonly deliverable: string
    readonly figVariant: ServiceFigVariant
    /** Labels passed to ServiceFig for the variant's SVG nodes. */
    readonly figLabels: ReadonlyArray<string>
    /** Caption displayed below the figure: "FIG. XX — NAME" */
    readonly figCaption: string
  }>
  readonly idealClient: {
    readonly eyebrow: string
    readonly title: string
    readonly body: string
    readonly cta: string
  }
}

/** Phase 2.1 — full Cómo trabajamos content. Spec: SPEC-P2.1 FR-8.1 */
export interface MethodDictionary {
  readonly meta: PageMeta
  readonly pageHeader: {
    /** Interior-page letter index (e.g. "A / CÓMO TRABAJAMOS"). */
    readonly eyebrow: string
    readonly title: string
    readonly lead: string
  }
  readonly phaseCycle: {
    /** Section letter eyebrow (e.g. "B / EL CICLO DE CRECIMIENTO"). */
    readonly sectionEyebrow: string
    readonly sectionIndex: string
    readonly title: string
    readonly lead: string
    readonly ariaLabel: string
    readonly phasePrefix: string
    // Phases NOT stored here — shared from homeContent.framework.phases (FR-3.2, no duplication).
  }
  readonly executionPractices: {
    /** Section letter eyebrow (e.g. "C / LA EJECUCIÓN, EN EL DÍA A DÍA"). */
    readonly sectionEyebrow: string
    readonly sectionIndex: string
    readonly title: string
    readonly lead: string
    readonly practices: ReadonlyArray<{
      /** Zero-padded ordinal string: "01", "02", … */
      readonly index: string
      readonly title: string
      readonly body: string
      /** Ambre label tying the practice to a framework phase. */
      readonly tie: string
    }>
  }
  readonly pipeline: {
    /** Section letter eyebrow (e.g. "D / EL FLUJO DE EJECUCIÓN"). */
    readonly sectionEyebrow: string
    readonly sectionIndex: string
    readonly sectionTitle: string
    /** Six labeled pipeline nodes (left → right). Length must be exactly 6. */
    readonly nodes: ReadonlyArray<{ readonly label: string }>
    readonly caption: string
    readonly legend: string
    readonly ariaLabel: string
    /** Return-arc label (dashed, ambre). */
    readonly returnArcLabel: string
  }
  readonly aiBuild: {
    /** Section letter eyebrow (e.g. "E / CÓMO CONSTRUIMOS"). */
    readonly sectionEyebrow: string
    readonly sectionIndex: string
    readonly title: string
    /** Lead paragraph — verbatim from Libro Ch. 7 "IA también en cómo se construye". */
    readonly lead: string
    /** 3–4 mono points. Only Libro Ch. 7 / Ch. 9 language. */
    readonly points: ReadonlyArray<string>
    /** Small inline diagram labels (left → right). */
    readonly diagram: ReadonlyArray<string>
  }
}

/** Phase 2.3 — /casos-de-exito index page content. Spec: SPEC-P2.3 FR-6.1 */
export interface CasesDictionary {
  readonly meta: PageMeta
  readonly pageHeader: {
    readonly eyebrow: string
    readonly title: string
    readonly lead: string
  }
  readonly card: {
    /** Prefix for card eyebrow: "EXPEDIENTE" (zero-padded ordinal appended by component). */
    readonly expedienteLabel: string
    /** CTA label on index cards: "ABRIR EXPEDIENTE ↗" */
    readonly openLabel: string
  }
  /** Label for the "visit site ↗" link in BrandHeader. */
  readonly visitLabel: string
  /** Section eyebrow above the capability grid: "CAPACIDADES ENTREGADAS". */
  readonly capabilitiesLabel: string
  /** Next-case nav label: "SIGUIENTE EXPEDIENTE ↓" */
  readonly nextLabel: string
  /** Back-to-index nav label: "VOLVER AL ÍNDICE ↑" */
  readonly backLabel: string
}

/** Phase 2.3 — detail-page meta lives in CaseStudy.meta (content/data/cases.ts). */
export interface CaseDetailDictionary {
  readonly meta: PageMeta
}

/** Phase 2.4 — full /modelo-de-alianza content. Spec: SPEC-P2.4 FR-8.1 */
export interface AllianceSeat {
  readonly name: string
  readonly state: 'occupied' | 'free'
}

export interface AlliancePlane {
  /** Zero-padded ordinal: "01", "02", "03" */
  readonly index: string
  readonly title: string
  readonly body: string
  /** Bottom mono depth line e.g. "ARQUITECTURA · CÓDIGO · OPERACIÓN" */
  readonly depth: string
}

export interface AllianceCommitment {
  /** Zero-padded ordinal: "01" … "05" */
  readonly n: string
  /** All-caps mono tag. Commitment 01 MUST be "A MEDIDA" (no code-ownership wording). */
  readonly tag: string
  readonly body: string
}

export interface AllianceDictionary {
  readonly meta: PageMeta
  readonly pageHeader: {
    readonly eyebrow: string
    readonly title: string
    readonly lead: string
  }
  readonly whyFive: {
    readonly sectionEyebrow: string
    readonly heading: string
    readonly body: string
    /** Aria-label for the SVG constellation figure. */
    readonly constellationAria: string
  }
  /** Exactly 5 seats — enforced in tests/content/content-integrity.test.ts */
  readonly seats: ReadonlyArray<AllianceSeat>
  readonly planes: {
    readonly sectionEyebrow: string
    readonly heading: string
    readonly lead: string
    /** Exactly 3 planes. Length enforced in tests. */
    readonly items: ReadonlyArray<AlliancePlane>
  }
  readonly commitments: {
    readonly sectionEyebrow: string
    readonly heading: string
    /** Exactly 5 commitments. Length enforced in tests. Commitment[0].tag must be "A MEDIDA". */
    readonly items: ReadonlyArray<AllianceCommitment>
  }
}

/**
 * Phase 2.5 — full /sobre-escala content. Spec: SPEC-P2.5 FR-9.1
 *
 * Six areas must match ExpertiseFigVariant; ten beliefs from Libro Ch. 3.
 * All lengths enforced in tests/content/about-content.test.ts.
 */
export type ExpertiseFigVariant =
  | 'fullstack'
  | 'hub'
  | 'bars'
  | 'nodes'
  | 'signal'
  | 'insertion'

export interface AboutDictionary {
  readonly meta: PageMeta
  readonly ceremonial: {
    /** Mono kicker above the H1: "A · SOBRE ESCALA · ESTUDIO DE PRODUCTO Y TECNOLOGÍA" */
    readonly kicker: string
    /** Page H1 — oversized, clamp(3rem,7vw,6rem). Exactly one H1 on this page. */
    readonly h1: string
    /** Sub-paragraph ≤60ch, ~22px */
    readonly sub: string
  }
  readonly dna: {
    /** Section eyebrow: "B / NUESTRO ADN" */
    readonly sectionEyebrow: string
    /** Bold label for the mission paragraph: "Misión." */
    readonly missionLabel: string
    /** Mission paragraph verbatim from Libro Ch. 1 */
    readonly mission: string
    /** Bold label for the vision paragraph: "Visión." */
    readonly visionLabel: string
    /** Vision paragraph verbatim from Libro Ch. 1 */
    readonly vision: string
    /** Pull-quote (Archivo, ambre left border): the ten-year question. */
    readonly quote: string
  }
  readonly values: {
    /** Section eyebrow: "C / VALORES" */
    readonly sectionEyebrow: string
    /** Exactly 5 values from Libro Ch. 1. Length enforced in tests. */
    readonly items: ReadonlyArray<{
      /** Zero-padded ordinal: "01"–"05" */
      readonly n: string
      readonly title: string
      readonly body: string
    }>
  }
  /** Tone-shift divider text: "— — — DE LA IDENTIDAD A LA EXPERIENCIA — — —" */
  readonly divider: string
  readonly expertise: {
    /** Section eyebrow: "D / LA EXPERIENCIA DETRÁS DE ESCALA" */
    readonly sectionEyebrow: string
    readonly heading: string
    readonly lead: string
    /**
     * Exactly 6 areas. Length enforced in tests.
     * Anonymized per Libro Ch. 19 — no former-employer names.
     */
    readonly areas: ReadonlyArray<{
      readonly index: string
      readonly title: string
      readonly body: string
      readonly figVariant: ExpertiseFigVariant
    }>
  }
  readonly manifesto: {
    /** Section eyebrow: "E / EL MANIFIESTO" */
    readonly sectionEyebrow: string
    readonly heading: string
    /** Mono lead: "DIEZ CREENCIAS · UNA FORMA DE ENTENDER LA TECNOLOGÍA" */
    readonly lead: string
    /** Exactly 10 beliefs verbatim from Libro Ch. 3. Length enforced in tests. */
    readonly beliefs: ReadonlyArray<string>
  }
  /**
   * Mono plain-text line about colivares.com — NOT a link until that site is live.
   * // TODO: linkify colivares.com when live (projectbrief.md non-goal)
   */
  readonly colivaresLine: string
}

/**
 * Phase 2.6 — full /contacto content. Spec: SPEC-P2.6 FR-7.1
 *
 * Gmail address lives ONLY in server env — never in this dictionary.
 * Public address (hola@escaladigitalventures.com) appears in directMeta.email only.
 */
export interface ContactDictionary {
  readonly meta: PageMeta
  readonly pageHeader: {
    /** Mono eyebrow: "A / CONVERSACIÓN" */
    readonly eyebrow: string
    /** Page H1 */
    readonly h1: string
    /** Lead paragraph from spec §5.7 / Libro Ch. 18 */
    readonly lead: string
  }
  readonly affinityFilter: {
    /** All-caps mono heading: "TRABAJAMOS MEJOR CON" */
    readonly heading: string
    /** Exactly 3 lines from Libro Ch. 12/18. Length enforced in tests. */
    readonly items: ReadonlyArray<string>
  }
  readonly directMeta: {
    readonly emailLabel: string
    /** Public display address only — NEVER the internal Gmail. */
    readonly email: string
    readonly locationLabel: string
    readonly location: string
    readonly languagesLabel: string
    readonly languages: string
    readonly responseLabel: string
    readonly response: string
  }
  readonly dossierHeader: {
    /** "FICHA DE CONTACTO" */
    readonly title: string
    /** "ESCALA · REF. CONTACTO" */
    readonly ref: string
  }
  /** Mono trust micro-line under the submit button. */
  readonly trustLine: string
}

// ---------------------------------------------------------------------------
// Phase 4 — Legal pages (SPEC-P4 FR-7.1)
// ---------------------------------------------------------------------------

/**
 * A key-value row for registry/identification data in legal sections.
 * Rendered in mono font with a mar-colored key column.
 */
export interface LegalKvRow {
  readonly key: string
  readonly value: string
}

/**
 * A single section in a legal document.
 * `id` is the stable anchor id (e.g. "titular", "objeto").
 * `index` is the display ordinal (e.g. "01").
 * `name` is the short mono nav label (e.g. "TITULAR").
 * `title` is the H2 heading.
 * `body` is the prose paragraph(s) — may contain {{PLACEHOLDER}} tokens.
 * `kv` is an optional array of key-value rows (for registry data in section 01).
 */
export interface LegalSection {
  readonly id: string
  readonly index: string
  readonly name: string
  readonly title: string
  readonly body: string
  readonly kv?: ReadonlyArray<LegalKvRow>
}

/**
 * Phase 4 — full /aviso-legal content. Spec: SPEC-P4 FR-2, FR-7.1
 * 5 sections per LSSI-CE requirements.
 * Unconfirmed data uses {{PLACEHOLDER}} tokens — see FR-4.
 */
export interface LegalDictionary {
  readonly meta: PageMeta
  readonly header: {
    /** Mono eyebrow: "· AVISO LEGAL" */
    readonly eyebrow: string
    /** Page H1 */
    readonly h1: string
    /** Label prefix: "ÚLTIMA ACTUALIZACIÓN ·" */
    readonly updatedLabel: string
    /** Date value — use {{FECHA_ACTUALIZACION}} until confirmed */
    readonly updatedDate: string
  }
  /** Label for the sticky anchor nav: "EN ESTA PÁGINA" */
  readonly anchorLabel: string
  /** Exactly 5 sections. Length enforced in tests. */
  readonly sections: ReadonlyArray<LegalSection>
}

/**
 * Phase 4 — full /privacidad content. Spec: SPEC-P4 FR-3, FR-7.1
 * 6 sections per RGPD requirements.
 * Unconfirmed data uses {{PLACEHOLDER}} tokens — see FR-4.
 */
export interface PrivacyDictionary {
  readonly meta: PageMeta
  readonly header: {
    /** Mono eyebrow: "· PRIVACIDAD" */
    readonly eyebrow: string
    /** Page H1 */
    readonly h1: string
    /** Label prefix: "ÚLTIMA ACTUALIZACIÓN ·" */
    readonly updatedLabel: string
    /** Date value — use {{FECHA_ACTUALIZACION}} until confirmed */
    readonly updatedDate: string
  }
  /** Label for the sticky anchor nav: "EN ESTA PÁGINA" */
  readonly anchorLabel: string
  /** Exactly 6 sections. Length enforced in tests. */
  readonly sections: ReadonlyArray<LegalSection>
}

/**
 * Phase 4 — 404 not-found copy block. Spec: SPEC-P4 FR-5.
 * Lives in shared content so it can be accessed without locale resolution.
 */
export interface NotFoundContent {
  /** Mono code line: "ERROR 404 · RUTA NO ENCONTRADA" */
  readonly code: string
  /** Page H1: "Fuera del sistema." */
  readonly h1: string
  /** Body paragraph */
  readonly body: string
  /** CTA button label: "VOLVER AL INICIO ↗" */
  readonly ctaLabel: string
  /** Aria-label for the kit micro-diagram SVG */
  readonly diagramAria: string
}
