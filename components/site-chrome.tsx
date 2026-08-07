'use client'

import { useEffect, useState } from 'react'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { homeContent } from '@/content/es/home'
import type { sharedContent } from '@/content/es/shared'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import {
  HEADER_COMPACT_THRESHOLD_PX,
  HEADER_SCROLL_SHADOW_PX,
} from '@/lib/motion-constants'
import { ANCHORS, ROUTES } from '@/lib/routes'
import { getPath } from '@/lib/i18n/routes'

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer
type Accessibility = typeof sharedContent.accessibility

/**
 * Tracks scroll position and direction to drive the header's two behaviors:
 * 1. Shadow appears once scrolling starts (depth > HEADER_SCROLL_SHADOW_PX).
 * 2. Header compacts 20% on scroll-down; expands on scroll-up or at the top.
 */
function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastScrollY

      setIsScrolled(y > HEADER_SCROLL_SHADOW_PX)
      // Compact only when scrolling DOWN past the threshold; expand when going up.
      if (y <= HEADER_COMPACT_THRESHOLD_PX) {
        setIsCompact(false)
      } else if (delta > 0) {
        setIsCompact(true)
      } else if (delta < 0) {
        setIsCompact(false)
      }

      lastScrollY = y
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // Set initial state without waiting for the first scroll event.
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return { isScrolled, isCompact }
}

export function SiteHeader({
  content,
  accessibility,
  currentPage = 'home',
  locale = 'es',
  pageParams,
}: {
  content: HeaderContent
  /** Locale-aware accessibility labels from shared dictionary. */
  accessibility: Accessibility
  /** Current page ID — used by LocaleSwitcher to build locale-preserving hrefs. */
  currentPage?: PageId
  /** Active locale — highlights the correct locale in LocaleSwitcher. */
  locale?: Locale
  /** Dynamic params (e.g. case detail slug) — passed to LocaleSwitcher. */
  pageParams?: PageParams
}) {
  const { isScrolled, isCompact } = useHeaderScroll()

  const headerClass = [
    'site-header',
    isScrolled ? 'is-scrolled' : '',
    isCompact ? 'is-compact' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Locale-aware contact link
  const contactHref = getPath('contact', locale)

  return (
    <header className={headerClass}>
      <div className="page-shell site-header__inner">
        <a
          className="site-brand"
          href={currentPage === 'home' ? ANCHORS.INICIO : getPath('home', locale)}
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
          {content.nav.map((item) => {
            // Active state: nav items with a pageId mark themselves when
            // the current page matches. (SPEC-P2.1 AC-11 / FR-2.2)
            const isActive =
              'pageId' in item &&
              (item as { pageId: string }).pageId === currentPage
            return (
              <a
                href={item.href}
                key={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="site-header__actions">
          <LocaleSwitcher
            currentPage={currentPage}
            locale={locale}
            pageParams={pageParams}
            languagesLabel={accessibility.languages}
          />
          <a className="header-cta" href={contactHref}>
            {content.contact}
          </a>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({
  content,
  accessibility,
}: {
  content: FooterContent
  /** Locale-aware accessibility labels from shared dictionary. */
  accessibility: Accessibility
}) {
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
