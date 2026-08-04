/**
 * Motion and animation constants.
 * All timing, threshold, and media-query values used in client components
 * must come from here — no magic numbers in component logic.
 */

// ── Site header ──────────────────────────────────────────────────────────────

/** Full header height in rem (at-rest / scrolling-up). */
export const HEADER_HEIGHT_REM = 5

/** Compact header height in rem (20% smaller, activates on scroll-down). */
export const HEADER_HEIGHT_COMPACT_REM = 4

/** Scroll distance (px) after which the header shadow appears. */
export const HEADER_SCROLL_SHADOW_PX = 4

/** Minimum scroll depth (px) required before compact mode can activate. */
export const HEADER_COMPACT_THRESHOLD_PX = 80

// ── Animation ─────────────────────────────────────────────────────────────────

/** Duration in milliseconds for the count-up animation in Readout. */
export const COUNT_UP_DURATION_MS = 500

/** IntersectionObserver threshold for generic reveal animations. */
export const REVEAL_THRESHOLD = 0.18

/** IntersectionObserver threshold for diagram reveal animations. */
export const DIAGRAM_REVEAL_THRESHOLD = 0.12

/** IntersectionObserver threshold for word-reveal heading animations. */
export const WORD_REVEAL_THRESHOLD = 0.25

/** IntersectionObserver threshold for count-up trigger. */
export const COUNT_UP_THRESHOLD = 0.4

/** IntersectionObserver threshold for the phase-cycle scroll visibility. */
export const PHASE_CYCLE_VISIBLE_THRESHOLD = 0.01

/**
 * Media query string to disable scroll-driven animations.
 * Matches both small screens (where the pinned layout is hidden) and
 * users who prefer reduced motion.
 */
export const REDUCED_MOTION_QUERY =
  '(max-width: 767px), (prefers-reduced-motion: reduce)'
