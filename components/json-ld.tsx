/**
 * JsonLd — emits one server-rendered <script type="application/ld+json">.
 *
 * SEO-01 §6: structured data is server-rendered, exactly one script per page.
 * This is a server component (no 'use client') so the JSON is present in the
 * initial HTML with JavaScript disabled (AC-7's sibling requirement for §7.6).
 *
 * `<` is escaped to `\u003c` to close the classic XSS vector when embedding
 * JSON inside a <script> element — a closing "</script>" sequence inside any
 * string value would otherwise terminate the block early.
 */

import type { SchemaGraph } from '@/lib/seo/types'

export function JsonLd({ graph }: { graph: SchemaGraph }) {
  const json = JSON.stringify(graph).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      // Serialised, escaped JSON-LD — not user input, and never interpolated
      // from a request. The escape above neutralises script-breaking payloads.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
