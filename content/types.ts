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

/** Phase 1 stub — Phase 2 will add full content. */
export interface MethodDictionary {
  readonly meta: PageMeta
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
