/**
 * LegalDoc — shared layout for /aviso-legal and /privacidad.
 *
 * Two-column layout per the approved wireframe (specs/mockups/wireframe-p4-legal-final.html):
 *   - Left: sticky AnchorNav (230px, hidden on mobile)
 *   - Right: readable content column (≤70ch)
 *
 * On mobile (<768px): AnchorNav is hidden; a simple top "índice" list is shown instead.
 *
 * Unresolved {{PLACEHOLDER}} tokens are rendered with an ambre highlight (dev warning).
 * This is a visual indicator only — it does NOT fail the build (FR-4.2).
 *
 * Spec: SPEC-P4 FR-1, FR-4
 */

import { AnchorNav } from '@/components/anchor-nav'
import type { LegalDictionary, PrivacyDictionary, LegalSection } from '@/content/types'

type LegalDocContent = LegalDictionary | PrivacyDictionary

export interface LegalDocProps {
  content: LegalDocContent
}

/**
 * Renders body text, highlighting any unresolved {{PLACEHOLDER}} tokens
 * with an ambre background as a visible dev warning (FR-4.2).
 * Does not fail the build — only makes placeholders visible.
 */
function BodyWithPlaceholders({ text }: { text: string }) {
  // Split on {{...}} tokens and render each part.
  const parts = text.split(/({{[^}]+}})/)
  return (
    <>
      {parts.map((part, i) => {
        if (/^{{[^}]+}}$/.test(part)) {
          return (
            <mark key={i} className="legal-doc__placeholder" title="Dato pendiente de confirmar">
              {part}
            </mark>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function LegalSection({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="legal-doc__section">
      <span className="legal-doc__section-num">
        {section.index} · {section.name}
      </span>
      <h2 className="legal-doc__section-title">{section.title}</h2>
      {section.body && (
        <p className="legal-doc__body">
          <BodyWithPlaceholders text={section.body} />
        </p>
      )}
      {section.kv && section.kv.length > 0 && (
        <dl className="legal-doc__kv">
          {section.kv.map((row) => (
            <div key={row.key} className="legal-doc__kv-row">
              <dt className="legal-doc__kv-key">{row.key}</dt>
              <dd className="legal-doc__kv-value">
                <BodyWithPlaceholders text={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}

export function LegalDoc({ content }: LegalDocProps) {
  const navItems = content.sections.map((s) => ({
    id: s.id,
    index: s.index,
    name: s.name,
  }))

  return (
    <div className="legal-doc">
      {/* Mobile-only top índice (hidden on desktop via CSS) */}
      <nav className="legal-doc__mobile-index" aria-label={content.anchorLabel}>
        <p className="legal-doc__mobile-index-label">{content.anchorLabel}</p>
        <ul role="list">
          {navItems.map(({ id, index, name }) => (
            <li key={id}>
              <a href={`#${id}`} className="legal-doc__mobile-index-link">
                {index} · {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="legal-doc__grid">
        {/* Sticky side anchor — hidden on mobile */}
        <aside className="legal-doc__aside">
          <AnchorNav label={content.anchorLabel} items={navItems} />
        </aside>

        {/* Main content column */}
        <div className="legal-doc__main">
          <header className="legal-doc__header">
            <p className="legal-doc__eyebrow">{content.header.eyebrow}</p>
            <h1 className="legal-doc__h1">{content.header.h1}</h1>
            <p className="legal-doc__updated">
              {content.header.updatedLabel}{' '}
              <BodyWithPlaceholders text={content.header.updatedDate} />
            </p>
          </header>

          <div className="legal-doc__body-wrap">
            {content.sections.map((section) => (
              <LegalSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
