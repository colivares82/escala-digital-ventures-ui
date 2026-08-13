/**
 * Structured-data types (SEO-01 §6).
 *
 * Minimal, precise shapes for the Schema.org nodes we emit. Deliberately not
 * `any` and not a third-party schema package: the graph is small, fixed, and
 * fully under our control, so hand-typed nodes keep the output auditable
 * against the Schema.org Validator (AC-8).
 */

/** A JSON-LD value: primitives, nested nodes, or arrays of them. */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue | undefined }

/** A single node in the @graph. `@type` may be a string or an array of types. */
export interface SchemaNode {
  readonly '@type': string | readonly string[]
  readonly '@id'?: string
  readonly [key: string]: JsonLdValue | undefined
}

/** The document we serialise into <script type="application/ld+json">. */
export interface SchemaGraph {
  readonly '@context': 'https://schema.org'
  readonly '@graph': readonly SchemaNode[]
}

/**
 * A reference to another node by @id (keeps the graph DRY, per SEO-01 §6).
 *
 * Declared as a type alias with an index signature rather than an interface:
 * an interface without one is not assignable to JsonLdValue's indexed object
 * member, so nodes could not embed refs as property values.
 */
export type SchemaRef = {
  readonly '@id': string
  readonly [key: string]: JsonLdValue | undefined
}

/** One visible question/answer pair, mirrored into FAQPage JSON-LD (§6.8). */
export interface FaqItem {
  readonly question: string
  readonly answer: string
}

/** Breadcrumb trail entry (§6.5). */
export interface BreadcrumbEntry {
  readonly name: string
  readonly url: string
}
