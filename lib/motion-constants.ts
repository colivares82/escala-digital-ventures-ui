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

// ── Hero narrative diagram particles (SPEC-POLISH-01) ─────────────────────────

/** Duration (ms) for a particle to travel an input path (base). */
export const HERO_PARTICLE_IN_DURATION_MS = 1500

/** Random extra duration (ms) added to input travel to vary speed. */
export const HERO_PARTICLE_IN_JITTER_MS = 900

/** Duration (ms) the particle pauses at the system boundary. */
export const HERO_PARTICLE_HOLD_MS = 340

/** Duration (ms) for a particle to travel an output path. */
export const HERO_PARTICLE_OUT_DURATION_MS = 1100

/** Interval (ms) between particle spawns. */
export const HERO_PARTICLE_SPAWN_INTERVAL_MS = 440

/** Probability (0–1) of spawning a second particle in the same interval. */
export const HERO_PARTICLE_DOUBLE_CHANCE = 0.65

// ── Problem flows diagram pulses (SPEC-POLISH-02) ─────────────────────────────

/** Duration (ms) for a pulse to travel a solid connector segment. */
export const PROBLEM_PULSE_DURATION_MS = 1100

/** Duration (ms) for the flash-and-fade at the break point. */
export const PROBLEM_PULSE_FADE_MS = 400

/** Interval (ms) between pulse spawns (one random segment per tick). */
export const PROBLEM_PULSE_INTERVAL_MS = 700

/** Angular speed (radians per frame at 60fps) for the core scale pulse. */
export const PROBLEM_CORE_PULSE_SPEED = 0.06

/** Amplitude of the core scale pulse (fraction of base scale). */
export const PROBLEM_CORE_PULSE_AMPLITUDE = 0.03

// ── ServiceFig — FIG.08/09/11 geometry fixes (SPEC-POLISH-05) ─────────────────

/** Shared canvas for all five ServiceFig variants (was 320×150; normalised so
 *  FIG.08/09/11 match the approved wireframe while FIG.07/10 keep identical
 *  geometry, just centered on the larger canvas via a translate wrapper). */
export const SERVICE_FIG_VIEWBOX_W = 340
export const SERVICE_FIG_VIEWBOX_H = 180

/** Translate offset that centers the legacy 320×150 geometry (FIG.07/10)
 *  inside the shared 340×180 canvas without touching any coordinate. */
export const SERVICE_FIG_LEGACY_OFFSET_X = 10
export const SERVICE_FIG_LEGACY_OFFSET_Y = 15

/** FIG.08 — duration of a single module→core connector pulse. */
export const SERVICE_FIG_PLATFORM_PULSE_DUR_S = 1.8
/** FIG.08 — stagger delay between successive module pulses (seconds), looping. */
export const SERVICE_FIG_PLATFORM_PULSE_STAGGER_S = 0.35

/** FIG.09 — duration of a pulse traveling one flow segment. */
export const SERVICE_FIG_AI_FLOW_PULSE_DUR_S = 1.3
/** FIG.09 — duration of the pulse traveling the dashed IA connector. */
export const SERVICE_FIG_AI_CONNECTOR_PULSE_DUR_S = 1.1

/** FIG.11 — duration for the ambre arc to complete one full loop. */
export const SERVICE_FIG_EVOLVE_ARC_DUR_S = 4
