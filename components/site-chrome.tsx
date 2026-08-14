'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CalibratedRule } from '@/components/calibrated-rule'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { MobileMenu } from '@/components/mobile-menu'
import type { homeContent } from '@/content/es/home'
import type { sharedContent } from '@/content/es/shared'
import type { Locale, PageId, PageParams } from '@/lib/i18n/types'
import {
  HEADER_COMPACT_THRESHOLD_PX,
  HEADER_SCROLL_SHADOW_PX,
} from '@/lib/motion-constants'
import { ANCHORS, ROUTES } from '@/lib/routes'
import { getPath } from '@/lib/i18n/routes'
import headerLockup from '@/app/assets/escala-brand/logo-02-lockup-paper.png'
/*
 * BRAND-01 Z3 — `ink` variant, NOT `paper`.
 *
 * Spec §2 states "The header and footer are `abisal`, so both take `paper`."
 * That is true of the header but WRONG about the footer: `.site-footer` is
 * `background: var(--paper)` — a LIGHT surface. Shipping the light `paper`
 * lockup there rendered it invisible (light-on-light).
 *
 * The spec's own colour-variant rule is what settles it: `ink` on `paper`,
 * `paper` on any dark surface. Same 180×30 asset dimensions, so sizing, the
 * intrinsic width/height and the @2x srcset are unaffected.
 */
import footerLockup from '@/app/assets/escala-brand/logo-05-lockup-compact-ink.png'
import {
  BRAND_FOOTER_LOCKUP_HEIGHT_PX,
  BRAND_FOOTER_LOCKUP_WIDTH_PX,
  BRAND_HEADER_LOCKUP_HEIGHT_PX,
  BRAND_HEADER_LOCKUP_WIDTH_PX,
} from '@/lib/brand-constants'

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer
type Accessibility = typeof sharedContent.accessibility

/** Footer nav items carry only a label + pageId; hrefs are resolved via
 *  `getPath` per the active locale (AC-6) — the dictionary's own `href`
 *  fields are ES-only literals, kept for backward-compat/type-shape but
 *  not read by the footer anymore. */
const FOOTER_NAV_PAGE_IDS: readonly PageId[] = [
  'services',
  'method',
  'cases',
  'alliance',
  'about',
]

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
  email,
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
  /** Contact email shown in the mobile overlay foot (sharedContent.finalCta.email). */
  email: string
}) {
  const { isScrolled, isCompact } = useHeaderScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const headerClass = [
    'site-header',
    isScrolled ? 'is-scrolled' : '',
    isCompact ? 'is-compact' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Locale-aware contact link + home link, shared by desktop nav and overlay.
  const contactHref = getPath('contact', locale)
  const brandHref = currentPage === 'home' ? ANCHORS.INICIO : getPath('home', locale)

  return (
    <>
    <header className={headerClass}>
      <div className="page-shell site-header__inner">
        {/* BRAND-01 Z1 — L02 lockup, `paper` variant on the dark abisal header.
            Replaces the provisional geometric placeholder + "ESCALA" wordmark.
            Intrinsic width/height come from the static import (AC-8); next/image
            emits the @2x srcset, so no new pipeline is needed (§3). */}
        <a className="site-brand" href={brandHref} aria-label={accessibility.homeLabel}>
          <Image
            src={headerLockup}
            alt={accessibility.logoAlt}
            width={BRAND_HEADER_LOCKUP_WIDTH_PX}
            height={BRAND_HEADER_LOCKUP_HEIGHT_PX}
            className="site-brand__lockup"
            priority
          />
        </a>

        <nav className="site-header__nav" aria-label={accessibility.primaryNavigation}>
          {content.nav.map((item, i) => {
            // Active state: nav items with a pageId mark themselves when
            // the current page matches. (SPEC-P2.1 AC-11 / FR-2.2)
            const isActive =
              'pageId' in item &&
              (item as { pageId: string }).pageId === currentPage
            return (
              <span className="site-header__nav-item" key={item.label}>
                {i > 0 && (
                  <span className="site-header__sep" aria-hidden="true">
                    ·
                  </span>
                )}
                <a href={item.href} aria-current={isActive ? 'page' : undefined}>
                  {item.label}
                </a>
              </span>
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

        <button
          ref={triggerRef}
          type="button"
          className="site-header__trigger"
          aria-label={isMenuOpen ? accessibility.menuClose : accessibility.menuOpen}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <i />
          <i />
          <i />
        </button>
      </div>
    </header>

    {/* Rendered as a header sibling, not a descendant — `.site-header`-scoped
        rules (e.g. hiding the inline nav below 1024px) must never reach the
        overlay's own <nav>. Fixed-position overlay, so DOM position doesn't
        affect layout. */}
    <MobileMenu
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      content={content}
      accessibility={accessibility}
      currentPage={currentPage}
      locale={locale}
      pageParams={pageParams}
      contactHref={contactHref}
      email={email}
      brandHref={brandHref}
      triggerRef={triggerRef}
    />
    </>
  )
}

export function SiteFooter({
  content,
  accessibility,
  // `brand` is accepted but deliberately NOT destructured — see the prop's
  // docblock below (BRAND-01 Z3): the footer slot now renders the L05 lockup.
  contactLabel,
  email,
  location,
  languages,
  currentPage = 'home',
  locale = 'es',
  pageParams,
}: {
  content: FooterContent
  /** Locale-aware accessibility labels from shared dictionary. */
  accessibility: Accessibility
  /**
   * Header brand wordmark ("ESCALA").
   *
   * BRAND-01 Z3: no longer rendered — the footer brand slot now holds the L05
   * lockup image instead of this text. The prop is intentionally KEPT so the
   * call site in `app/[[...path]]/page.tsx` (and the `shared.header.brand`
   * dictionary key, still consumed by `lib/seo/page-graph.ts` breadcrumbs)
   * stay byte-identical; removing it would widen the diff beyond §0's scope
   * guard for no functional gain.
   */
  brand: string
  /** "Hablemos" / "Let's talk" — reused from `header.contact` (no new copy). */
  contactLabel: string
  /** Reused from `finalCta.email` — no new copy (SPEC-POLISH-08 §0). */
  email: string
  /** Reused from `finalCta.location` — no new copy. */
  location: string
  /** Reused from `finalCta.languages` — no new copy. */
  languages: string
  /** Current page ID — used to mark the active nav item + build the locale switcher. */
  currentPage?: PageId
  /** Active locale — every footer link is resolved through `getPath` for this locale (AC-6). */
  locale?: Locale
  /** Dynamic params (e.g. case detail slug) — passed to LocaleSwitcher. */
  pageParams?: PageParams
}) {
  const contactHref = getPath('contact', locale)
  const brandHref = currentPage === 'home' ? ANCHORS.INICIO : getPath('home', locale)

  return (
    <footer className="site-footer">
      <div className="page-shell">
        <CalibratedRule className="site-footer__rule" />

        <div className="site-footer__top">
          {/* BRAND-01 Z3 — L05 compact lockup, `paper` variant on the dark footer.
              Decorative alt (§8): the anchor already carries `homeLabel` as its
              accessible name, so a non-empty alt here would be overridden by the
              aria-label anyway and risks duplicating the name. Renders 1:1 with
              its 180×30 @1x file. */}
          <a className="site-footer__brand" href={brandHref} aria-label={accessibility.homeLabel}>
            <Image
              src={footerLockup}
              alt=""
              width={BRAND_FOOTER_LOCKUP_WIDTH_PX}
              height={BRAND_FOOTER_LOCKUP_HEIGHT_PX}
              className="site-footer__lockup"
            />
          </a>
          <p className="site-footer__claim">{content.claim}</p>
        </div>

        <div className="site-footer__cols">
          <div className="site-footer__col site-footer__col--nav" aria-labelledby="footer-col-nav">
            <h2 className="site-footer__col-head" id="footer-col-nav">
              {content.col.navigation}
            </h2>
            <nav aria-label={accessibility.footerNavigation}>
              <ul className="site-footer__col-list">
                {content.navigation.map((item, i) => (
                  <li key={item.label}>
                    <a href={getPath(FOOTER_NAV_PAGE_IDS[i], locale)}>{item.label}</a>
                  </li>
                ))}
                <li>
                  <a href={contactHref}>{contactLabel}</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__col-head" id="footer-col-contact">
              {content.col.contact}
            </h2>
            <div aria-labelledby="footer-col-contact">
              <p className="site-footer__line">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="site-footer__line">{location}</p>
              <p className="site-footer__mono">{languages}</p>
            </div>
          </div>

          <div className="site-footer__col site-footer__col--legal">
            <h2 className="site-footer__col-head" id="footer-col-legal">
              {content.col.legal}
            </h2>
            <div aria-labelledby="footer-col-legal">
              <ul className="site-footer__col-list">
                {content.legal.map((item, i) => (
                  <li key={item.href}>
                    <a href={getPath(i === 0 ? 'legal' : 'privacy', locale)}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <p className="site-footer__mono">{content.noTracking}</p>
            </div>
          </div>
        </div>

        <div className="site-footer__meta">
          <span>{content.company}</span>
          <span className="site-footer__dot" aria-hidden="true">
            ·
          </span>
          {/* colivares.com reference stays plain text, never a link (standing editorial rule). */}
          <span>{content.direction}</span>
          <span className="site-footer__push">
            <LocaleSwitcher
              currentPage={currentPage}
              locale={locale}
              pageParams={pageParams}
              languagesLabel={accessibility.languages}
            />
          </span>
        </div>
      </div>
    </footer>
  )
}
