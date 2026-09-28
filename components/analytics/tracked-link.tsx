/**
 * TrackedLink — a plain <a> that also emits one analytics event on click.
 * FEAT-01 §3 (CTA Click · Email Click)
 *
 * Behaviour-only (§0): renders exactly the <a> it replaces — same attributes,
 * classes and children — so the DOM is byte-identical. All anchor props are
 * forwarded untouched; a caller-supplied onClick still runs.
 *
 * Safe on navigating links: the SDK sends via navigator.sendBeacon, which the
 * browser delivers even as the page unloads.
 */
'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { getCurrentLocale, trackEvent } from '@/lib/analytics'
import type { AnalyticsEventName, AnalyticsLocation } from '@/lib/constants/analytics'

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Event to emit (CTA Click / Email Click). */
  event: AnalyticsEventName
  /** Stable `location` slug for the event. */
  location: AnalyticsLocation
}

export function TrackedLink({ event, location, onClick, ...anchorProps }: TrackedLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackEvent(event, { location, locale: getCurrentLocale() })
    onClick?.(e)
  }

  return <a {...anchorProps} onClick={handleClick} />
}
