/**
 * Placeholder detection utility — SPEC-P4 FR-4.2.
 *
 * Scans content dictionaries for unresolved {{PLACEHOLDER}} tokens.
 * Used in tests to warn about unpublishable content.
 *
 * This does NOT fail the build — it only makes placeholders visible
 * (via the LegalDoc component's ambre highlight) and detectable in tests.
 *
 * Before go-live: all {{...}} tokens must be replaced with real data.
 */

/** Regex that matches any {{PLACEHOLDER}} token. */
export const PLACEHOLDER_REGEX = /\{\{[^}]+\}\}/g

/**
 * Returns true if the given string contains at least one unresolved placeholder.
 */
export function hasPlaceholder(value: string): boolean {
  return PLACEHOLDER_REGEX.test(value)
}

/**
 * Recursively collects all unresolved placeholder tokens from an object.
 * Returns an array of { path, token } pairs for diagnostics.
 */
export function collectPlaceholders(
  obj: unknown,
  path = '',
): Array<{ path: string; token: string }> {
  const results: Array<{ path: string; token: string }> = []

  if (typeof obj === 'string') {
    const matches = obj.match(PLACEHOLDER_REGEX)
    if (matches) {
      for (const token of matches) {
        results.push({ path, token })
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...collectPlaceholders(item, `${path}[${i}]`))
    })
  } else if (obj !== null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      results.push(...collectPlaceholders(value, path ? `${path}.${key}` : key))
    }
  }

  return results
}
