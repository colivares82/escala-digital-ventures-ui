/**
 * FaqBlock — always-expanded question/answer section (SEO-01 §5.4).
 *
 * Placed after the last content section and before FinalCTA on exactly three
 * pages: /que-hacemos, /como-trabajamos, /modelo-de-alianza (§5.2).
 *
 * Hard constraints from the spec:
 *   - ALWAYS EXPANDED. No accordion, no <details>, no JS-gated content — every
 *     answer must be in the server-rendered HTML (AC-7). This is a server
 *     component: no 'use client', no state, no interactivity.
 *   - Each question is an <h3>, each answer the <p> immediately following,
 *     wrapped so the relationship is unambiguous (a <dl> would also be valid,
 *     but the spec names h3/p explicitly).
 *   - Existing tokens and typography only: no new colours, fonts or spacing.
 *   - No figure, no diagram, no animation.
 *
 * NOTE ON §5.4's "reuse Section": this repo has no shared `Section` component —
 * sections are <section> + .page-shell + SectionIndex, styled with BEM in
 * app/globals.css. This component follows that established pattern instead
 * (same structure as CommitmentsBand). Reported as a documented deviation.
 *
 * `Reveal` is intentionally NOT used: it is the sitewide scroll-reveal wrapper,
 * and gating answers behind an IntersectionObserver would violate AC-7.
 *
 * All copy received via props — zero literals.
 */

import { SectionIndex } from '@/components/section-index'
import type { FaqBlockContent } from '@/content/types'

export type FaqBlockProps = FaqBlockContent

export function FaqBlock({
  sectionEyebrow,
  sectionIndex,
  heading,
  items,
}: FaqBlockProps) {
  return (
    <section className="faq-block">
      <div className="page-shell faq-block__inner">
        <SectionIndex index={sectionIndex} label={sectionEyebrow} />
        <h2 className="faq-block__heading">{heading}</h2>

        <div className="faq-block__list">
          {items.map((item) => (
            <div className="faq-block__item" key={item.question}>
              <h3 className="faq-block__question">{item.question}</h3>
              <p className="faq-block__answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
