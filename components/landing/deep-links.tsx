/**
 * § 08 A fondo — home only (HOME-V2 §B.3). Five link tiles so content removed
 * from the home stays one click away. Static: hover/focus state only, no
 * figures, no motion. Hrefs resolve per locale via getPath (routes.ts).
 */
import { SectionIndex } from '@/components/section-index'
import type { DeepLinksContent } from '@/content/types'
import { getPath } from '@/lib/i18n/routes'
import type { Locale } from '@/lib/i18n/types'

export function DeepLinks({ content, locale }: { content: DeepLinksContent; locale: Locale }) {
  return (
    <section className="section section--light deep-links">
      <div className="page-shell">
        <SectionIndex index={content.sectionIndex.index} label={content.sectionIndex.label} />
        <ul className="deep-links__list">
          {content.items.map((item) => (
            <li key={item.page}>
              <a className="deep-links__tile" href={getPath(item.page, locale)}>
                <span className="deep-links__label">
                  {item.label} <span aria-hidden="true">↗</span>
                </span>
                <strong className="deep-links__title">{item.title}</strong>
                <span className="deep-links__line">{item.line}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
