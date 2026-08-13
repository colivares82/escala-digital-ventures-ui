'use client'

/**
 * MobileMenu — full-screen navigation overlay for the header, < 1024px.
 * Spec: SPEC-POLISH-07 §4
 *
 * Owned by SiteHeader (components/site-chrome.tsx). Not a standalone route or
 * page-level concern — purely the collapsed-header navigation surface.
 *
 * Behavior implemented here (SPEC-POLISH-07 §4.3):
 * - Body scroll lock (position:fixed trick, Lenis-aware) restored to the same
 *   scroll position on close.
 * - Focus moves into the overlay on open, is trapped while open, and returns
 *   to the trigger on close.
 * - Closes on: close control, Escape, any in-menu navigation.
 * - Force-closes if the viewport crosses the desktop breakpoint while open
 *   (prevents a stuck overlay-open+desktop-nav-visible state).
 * - Reduced motion: no transition, but must still open/close correctly (AC-11).
 */

import { useEffect, useRef } from 'react'
import { GridBackground } from '@/components/grid-background'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { sharedContent } from '@/content/es/shared'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import {
  HEADER_DESKTOP_MEDIA_QUERY,
  MOBILE_MENU_TRANSITION_MS,
} from '@/lib/motion-constants'

type HeaderContent = typeof sharedContent.header
type Accessibility = typeof sharedContent.accessibility

/** Selector for elements the focus trap considers "focusable". */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Locks body scroll at the current position (Lenis + iOS Safari safe) and
 * compensates for scrollbar-width removal so the page doesn't shift (AC-10).
 * Returns a restore function that scrolls back to the exact same position.
 */
function lockBodyScroll(): () => void {
  const { body, documentElement } = document
  const scrollY = window.scrollY
  const scrollbarGap = window.innerWidth - documentElement.clientWidth

  const prevPosition = body.style.position
  const prevTop = body.style.top
  const prevWidth = body.style.width
  const prevPaddingRight = body.style.paddingRight

  body.style.position = 'fixed'
  body.style.top = `-${scrollY}px`
  body.style.width = '100%'
  if (scrollbarGap > 0) {
    body.style.paddingRight = `${scrollbarGap}px`
  }

  return () => {
    body.style.position = prevPosition
    body.style.top = prevTop
    body.style.width = prevWidth
    body.style.paddingRight = prevPaddingRight
    window.scrollTo(0, scrollY)
  }
}

export function MobileMenu({
  isOpen,
  onClose,
  content,
  accessibility,
  currentPage,
  locale,
  pageParams,
  contactHref,
  email,
  brandHref,
  triggerRef,
}: {
  isOpen: boolean
  onClose: () => void
  content: HeaderContent
  accessibility: Accessibility
  currentPage: PageId
  locale: Locale
  pageParams?: PageParams
  contactHref: string
  email: string
  /** Locale-aware href for the brand slot — same destination as the desktop brand link. */
  brandHref: string
  /** Ref to the trigger button — focus returns here on close. */
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Scroll lock + Escape + focus trap + resize guard — all scoped to isOpen.
  useEffect(() => {
    if (!isOpen) return

    const unlock = lockBodyScroll()
    closeButtonRef.current?.focus()

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const node = overlayRef.current
      if (!node) return
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    // Resize guard (SPEC-POLISH-07 §4.3 / QA #3): force-close if the viewport
    // crosses into desktop width while the overlay is open, so it can never
    // be left open behind a now-visible desktop nav with scroll still locked.
    const desktopQuery = window.matchMedia(HEADER_DESKTOP_MEDIA_QUERY)
    const handleDesktopCross = (e: MediaQueryListEvent) => {
      if (e.matches) onClose()
    }

    document.addEventListener('keydown', handleKeydown)
    desktopQuery.addEventListener('change', handleDesktopCross)

    return () => {
      unlock()
      document.removeEventListener('keydown', handleKeydown)
      desktopQuery.removeEventListener('change', handleDesktopCross)
    }
  }, [isOpen, onClose])

  // Return focus to the trigger on close (after the effect above has run).
  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus()
  }, [isOpen, triggerRef])

  if (!isOpen) return null

  return (
    <div
      className="mobile-menu"
      id="mobile-menu"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={accessibility.primaryNavigation}
      style={{ '--mobile-menu-duration': `${MOBILE_MENU_TRANSITION_MS}ms` } as React.CSSProperties}
    >
      <GridBackground radialGradient={false} />

      <div className="mobile-menu__bar">
        <a
          className="site-brand mobile-menu__brand-slot"
          href={brandHref}
          aria-label={accessibility.homeLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {content.brand}
        </a>
        <button
          ref={closeButtonRef}
          type="button"
          className="mobile-menu__close"
          aria-label={accessibility.menuClose}
          onClick={onClose}
        >
          <i />
          <i />
        </button>
      </div>

      <nav className="mobile-menu__nav" aria-label={accessibility.primaryNavigation}>
        {content.nav.map((item, i) => {
          const isActive =
            'pageId' in item && (item as { pageId: string }).pageId === currentPage
          return (
            <a
              className="mobile-menu__item"
              href={item.href}
              key={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={onClose}
            >
              <span className="mobile-menu__idx" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mobile-menu__txt">{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="mobile-menu__foot">
        <a className="mobile-menu__cta" href={contactHref} onClick={onClose}>
          {content.contact}
        </a>
        <LocaleSwitcher
          currentPage={currentPage}
          locale={locale}
          pageParams={pageParams}
          languagesLabel={accessibility.languages}
        />
        <a className="mobile-menu__mail" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  )
}
