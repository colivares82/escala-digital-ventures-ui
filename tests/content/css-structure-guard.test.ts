/**
 * CSS structure guard — regression test for SPEC-CASE-01's nesting bug.
 *
 * Context: a CSS insert landed *before* the closing `}` of a pre-existing
 * `.not-found__cta` `@media (prefers-reduced-motion: reduce)` block instead of
 * after it, silently wrapping ~415 lines of unrelated, always-on CaseDossier
 * styles inside that reduced-motion query. Every existing test still passed
 * (they only assert markup/text), so the bug shipped as "complete" and was
 * only caught by visual inspection of the live page.
 *
 * jsdom does not apply real stylesheets, so `getComputedStyle` in a component
 * test gives false confidence here — it can't detect an unreachable rule.
 * Instead this test statically parses `app/globals.css` as text and checks
 * structural reachability: brace balance, at-rule nesting per selector, and
 * className↔CSS-rule parity for every canonical CaseDossier component
 * (SPEC-CASE-01 §3–4). This is what should have caught the original bug.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const CSS_PATH = resolve(__dirname, '../../app/globals.css')
const css = readFileSync(CSS_PATH, 'utf8')

/**
 * Walks the stylesheet character-by-character, tracking brace depth only.
 * A stray or missing `}` shows up as a non-zero final depth or a dip below
 * zero at some point during the walk — exactly the shape of the original bug.
 */
function checkBraceBalance(source: string) {
  let depth = 0
  let maxNegativeDip = 0
  for (const ch of source) {
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth < maxNegativeDip) maxNegativeDip = depth
    }
  }
  return { finalDepth: depth, maxNegativeDip }
}

/**
 * Builds a map from every character offset in the source to the stack of
 * enclosing block preludes at that point (outermost first). A "prelude" is
 * the trimmed text immediately before a `{` — either an at-rule (`@media
 * (...)`) or a plain selector list. Walking forward once and pushing/popping
 * a real stack (rather than re-scanning backwards per match, which is easy
 * to get wrong around nested braces) is the correct way to do this.
 */
function buildEnclosingStackIndex(source: string): string[][] {
  const stackAtOffset: string[][] = new Array(source.length)
  const openStack: string[] = []
  let buf = ''

  for (let i = 0; i < source.length; i++) {
    const ch = source[i]
    stackAtOffset[i] = [...openStack]

    if (ch === '{') {
      // Strip block comments before recording the prelude — a preceding
      // `/* ... */` comment must not stop us from recognizing `@media ...`.
      const prelude = buf.replace(/\/\*[\s\S]*?\*\//g, '').trim()
      openStack.push(prelude)
      buf = ''
    } else if (ch === '}') {
      openStack.pop()
      buf = ''
    } else {
      buf += ch
    }
  }

  return stackAtOffset
}

/**
 * For a given selector, finds every occurrence of it used *exactly* (not as
 * a prefix of a pseudo-class/pseudo-element/descendant variant, e.g.
 * `.case-flow-fig__row` must not match `.case-flow-fig__row::after` — that
 * variant may legitimately have a reduced-motion-only override) and returns
 * the at-rule preludes it is nested inside. One result array per exact
 * occurrence found (empty = top-level, not nested in any at-rule).
 */
function findEnclosingAtRules(source: string, selector: string): string[][] {
  const stackIndex = buildEnclosingStackIndex(source)
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Boundary lookahead requires the selector to end here: whitespace, a
  // comma (next selector in a list), or the opening brace — NOT `:` or `.`,
  // which would mean it's actually a longer compound/pseudo selector.
  const matchRe = new RegExp(`(^|[\\s,}])${escaped}(?=[\\s,{])`, 'g')
  const results: string[][] = []
  let match: RegExpExecArray | null

  while ((match = matchRe.exec(source)) !== null) {
    const enclosing = stackIndex[match.index] ?? []
    results.push(enclosing.filter((prelude) => prelude.startsWith('@')))
  }

  return results
}

describe('app/globals.css structural integrity (SPEC-CASE-01 regression guard)', () => {
  it('has perfectly balanced braces (no unclosed or stray blocks)', () => {
    const { finalDepth, maxNegativeDip } = checkBraceBalance(css)
    expect(finalDepth).toBe(0)
    expect(maxNegativeDip).toBe(0)
  })

  it('parser sanity check: detects a selector genuinely nested in prefers-reduced-motion: reduce', () => {
    // .not-found__cta *is* intentionally inside a reduced-motion block.
    // Proving the parser catches this real positive is what makes a clean
    // result for the case-* selectors below meaningful, not a false negative.
    const contexts = findEnclosingAtRules(css, '.not-found__cta')
    const hasReducedMotionParent = contexts.some((stack) =>
      stack.some((rule) => rule.includes('prefers-reduced-motion: reduce')),
    )
    expect(hasReducedMotionParent).toBe(true)
  })

  it.each([
    '.case-readout-grid',
    '.case-narrative',
    '.case-narrative__section--governance',
    '.case-governance__heading',
    '.case-governance__grid',
    '.case-governance__card',
    '.case-flow-fig__row',
    '.case-flow-fig__band',
    '.case-roles__grid',
    '.case-roles__card',
    '.case-timeline-ladder__steps',
  ])('%s is reachable under normal conditions (not trapped in prefers-reduced-motion: reduce)', (selector) => {
    const contexts = findEnclosingAtRules(css, selector)
    expect(contexts.length).toBeGreaterThan(0)

    for (const stack of contexts) {
      const trappedInReducedMotion = stack.some((rule) =>
        rule.includes('prefers-reduced-motion: reduce'),
      )
      expect(trappedInReducedMotion).toBe(false)
    }
  })

  it('every case-* className rendered by the canonical CaseDossier components has a matching CSS rule', () => {
    // Mirrors the exact classNames emitted by components/case-*.tsx (SPEC-CASE-01 §3-4).
    // NOTE: `case-roles` and `case-governance` (the outermost wrapper divs of
    // CaseRolesGrid / CaseGovernance) are deliberately bare — they carry no
    // styling of their own, only their children do — so they're excluded here.
    const renderedClassNames = [
      'case-readout-grid', 'case-readout-grid__cell', 'case-readout-grid__key',
      'case-readout-grid__tick', 'case-readout-grid__value', 'case-readout-grid__caption',
      'case-narrative', 'case-narrative__section', 'case-narrative__index',
      'case-narrative__num', 'case-narrative__label', 'case-narrative__prose',
      'case-flow-fig', 'case-flow-fig__figure', 'case-flow-fig__row',
      'case-flow-fig__node-wrap', 'case-flow-fig__node', 'case-flow-fig__index',
      'case-flow-fig__title', 'case-flow-fig__detail', 'case-flow-fig__connector',
      'case-flow-fig__traversal', 'case-flow-fig__band', 'case-flow-fig__band-text',
      'case-flow-fig__caption',
      'case-roles__lead', 'case-roles__grid', 'case-roles__card',
      'case-roles__index', 'case-roles__title', 'case-roles__body',
      'case-governance__heading', 'case-governance__lead',
      'case-governance__grid', 'case-governance__card', 'case-governance__label',
      'case-governance__body',
      'case-timeline-ladder', 'case-timeline-ladder__figure', 'case-timeline-ladder__steps',
      'case-timeline-ladder__step', 'case-timeline-ladder__date', 'case-timeline-ladder__title',
      'case-timeline-ladder__detail', 'case-timeline-ladder__caption',
    ]

    const missing = renderedClassNames.filter((className) => {
      const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // Standalone token match — `.case-roles` must not match inside `.case-roles__grid`.
      const re = new RegExp(`\\.${escaped}(?=[\\s,{:.]|$)`, 'm')
      return !re.test(css)
    })

    expect(missing).toEqual([])
  })

  it('the governance dark surface is owned by the section wrapper, not just the inner card', () => {
    // Regression guard for a "transparent background" false alarm found while
    // verifying this fix: CaseGovernance's own <div class="case-governance">
    // has no background — the abisal surface comes from the full-bleed parent
    // `.case-narrative__section--governance`. If this ownership ever moves,
    // update this assertion deliberately (see SPEC-CASE-01 §3).
    const wrapperRule = css.match(/\.case-narrative__section--governance\s*\{([^}]*)\}/)
    expect(wrapperRule).not.toBeNull()
    expect(wrapperRule![1]).toMatch(/background:\s*var\(--abisal\)/)
  })
})
