'use client'

/**
 * AnchorNav — sticky side navigation for legal document pages.
 *
 * Renders a mono list of section anchors with:
 * - Active-section highlight via IntersectionObserver (debounced to avoid thrash).
 * - Smooth scroll on click (respects prefers-reduced-motion).
 * - Keyboard operable (native <a> elements).
 * - Hidden on mobile (<768px); replaced by a top "índice" list in LegalDoc.
 *
 * Spec: SPEC-P4 FR-1.3
 */

import { useEffect, useRef, useState } from 'react'

export interface AnchorNavItem {
  id: string
  index: string
  name: string
}

export interface AnchorNavProps {
  /** Label above the nav list: "EN ESTA PÁGINA" */
  label: string
  items: ReadonlyArray<AnchorNavItem>
}

export function AnchorNav({ label, items }: AnchorNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  // Track whether the user has manually clicked a link to avoid observer thrash.
  const clickedRef = useRef<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    const sectionEls = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sectionEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // If user just clicked a link, skip observer updates briefly to avoid thrash.
        if (clickedRef.current !== null) return

        // Find the topmost intersecting section.
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id)
        }
      },
      {
        // Trigger when section enters the top 20% of the viewport.
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  // Clean up timer on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
  }, [])

  function handleClick(id: string) {
    setActiveId(id)
    // Suppress observer updates for 800ms after a manual click.
    clickedRef.current = id
    if (timerRef.current !== null) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clickedRef.current = null
    }, 800)
  }

  return (
    <nav className="anchor-nav" aria-label={label}>
      <p className="anchor-nav__label">{label}</p>
      <ul className="anchor-nav__list" role="list">
        {items.map(({ id, index, name }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`anchor-nav__link${activeId === id ? ' anchor-nav__link--active' : ''}`}
              aria-current={activeId === id ? 'location' : undefined}
              onClick={() => handleClick(id)}
            >
              {index} · {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
