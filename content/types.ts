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

/** Phase 1 stub — Phase 2 will add full content. */
export interface ServicesDictionary {
  readonly meta: PageMeta
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
  readonly finalCta: {
    readonly title: string
    readonly body: string
    readonly success: string
    readonly email: string
    readonly location: string
    readonly languages: string
  }
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface CasesDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface CaseDetailDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface AllianceDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface AboutDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface ContactDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface LegalDictionary {
  readonly meta: PageMeta
}

/** Phase 1 stub — Phase 2 will add full content. */
export interface PrivacyDictionary {
  readonly meta: PageMeta
}
