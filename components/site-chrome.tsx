import { LocaleSwitcher } from '@/components/locale-switcher'
import type { homeContent } from '@/content/es/home'
import { sharedContent } from '@/content/es/shared'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import { ANCHORS } from '@/lib/routes'

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer

export function SiteHeader({
  content,
  currentPage = 'home',
  locale = 'es',
  pageParams,
}: {
  content: HeaderContent
  /** Current page ID — used by LocaleSwitcher to build locale-preserving hrefs. */
  currentPage?: PageId
  /** Active locale — highlights the correct locale in LocaleSwitcher. */
  locale?: Locale
  /** Dynamic params (e.g. case detail slug) — passed to LocaleSwitcher. */
  pageParams?: PageParams
}) {
  const { accessibility } = sharedContent

  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <a
          className="site-brand"
          href={ANCHORS.INICIO}
          aria-label={accessibility.homeLabel}
        >
          <span aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {content.brand}
        </a>

        <nav aria-label={accessibility.primaryNavigation}>
          {content.nav.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <LocaleSwitcher
            currentPage={currentPage}
            locale={locale}
            pageParams={pageParams}
          />
          <a className="header-cta" href={ANCHORS.CONTACTO}>
            {content.contact}
          </a>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ content }: { content: FooterContent }) {
  const { accessibility } = sharedContent

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__grid">
        <p>{content.claim}</p>

        <nav aria-label={accessibility.footerNavigation}>
          {content.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div>
          <p>{content.company}</p>
          <p>{content.direction}</p>
        </div>

        <div>
          {content.legal.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
