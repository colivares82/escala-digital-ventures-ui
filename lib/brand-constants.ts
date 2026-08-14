/**
 * Brand asset render dimensions — BRAND-01 §2.
 *
 * Every brand image declares intrinsic width/height so no layout shift is
 * introduced (BRAND-01 AC-8). These are the RENDERED CSS sizes, not the
 * assets' native pixel sizes; `next/image` derives the `srcset` (and the @2x
 * step) from the static import itself.
 *
 * Sizing is fixed, NOT viewport-scaled (§3): the header lockup does not grow
 * or shrink with the viewport.
 *
 * ── Recorded constraint (§1) ──────────────────────────────────────────────
 * The wordmarks are raster, with no vector source. Never render one above its
 * `@2x` file width. The delivered files are pre-scaled to their display size,
 * so the real ceilings are BELOW the ones quoted in §1's table:
 *
 *   | Asset          | §1 quoted native | actual @1x | actual @2x |
 *   |----------------|------------------|------------|------------|
 *   | L02 lockup     | 445 × 119        | 200 × 53   | 400 × 106  |
 *   | L05 compact    | 386 × 64         | 180 × 30   | 360 × 60   |
 *   | L01 seal       | 288 × 294        | 288 × 294  | 576 × 588  |
 *
 * All three render sizes below stay within the ACTUAL @2x widths, so the
 * marks remain sharp on high-density displays.
 */

/**
 * Z1 · desktop header lockup (L02, `paper` on the dark `abisal` header).
 * 162 px is mandated by §3. Note the bundle's own README recommends 200 px for
 * the header; 162 px is the spec's deliberate choice and §3 pre-accepts that
 * the "DIGITAL VENTURES" tagline sits at the edge of legibility at 1x.
 */
export const BRAND_HEADER_LOCKUP_WIDTH_PX = 162
export const BRAND_HEADER_LOCKUP_HEIGHT_PX = 43

/**
 * Z2 · mobile header symbol — standalone three-bar mark, no disc or plate
 * (the disc form is reserved for favicon and app icon, §4).
 *
 * §2 specifies "26 px wide (19 px tall)", which is the size of the visible
 * INK. The delivered `symbol-paper-96.png` is a 96×96 SQUARE canvas: the art
 * sits in an 84×62 box (aspect 1.3548, matching the manifest's 1.3514) with
 * transparent padding around it. Rendering that square file into a 26×19 box
 * would squash the mark by ~26% vertically.
 *
 * So the element is a 30×30 square, which puts the visible ink at
 * 26.25 × 19.38 CSS px — §2's target to within a quarter-pixel, with the
 * symbol's true proportions preserved.
 *
 *   ink_w = 30 × 84/96 = 26.25    ink_h = 30 × 62/96 = 19.38
 */
export const BRAND_MOBILE_SYMBOL_BOX_PX = 30

/** Z3 · footer compact lockup (L05, `paper`). Renders 1:1 with its @1x file. */
export const BRAND_FOOTER_LOCKUP_WIDTH_PX = 180
export const BRAND_FOOTER_LOCKUP_HEIGHT_PX = 30

/**
 * Z4 · `/sobre-escala` section A seal (L01, `ink` on the light `paper`
 * surface). Decorative — carries no information the surrounding copy does not
 * already carry, so it takes an empty alt and is hidden from assistive tech.
 */
export const BRAND_SEAL_WIDTH_PX = 280
export const BRAND_SEAL_HEIGHT_PX = 286

/**
 * Below the existing 767px breakpoint the section-A grid collapses to one
 * column and the seal moves under the text at this smaller size (§6).
 * 767px is the project's established Phase-2.5 breakpoint — NOT the 900px the
 * wireframe suggests, which does not exist anywhere in `globals.css`.
 */
export const BRAND_SEAL_NARROW_WIDTH_PX = 200
export const BRAND_SEAL_NARROW_HEIGHT_PX = 204
