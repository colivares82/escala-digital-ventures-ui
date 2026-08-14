# SPEC — Brand asset integration

**ID:** BRAND-01
**Status:** Ready for Plan mode
**Authoritative layout source:** `wireframe-brand-integration.html`
**Asset bundle:** `brand-assets/` (see §2)
**Language of record:** ES master · EN · CA derived

---

## §0 Scope guard

This is a surgical change against a production system. Read this section before planning.

### What this spec changes

| # | Surface | Change |
|---|---|---|
| Z1 | Site header, desktop | Replace the brand node with the L02 lockup image |
| Z2 | Site header, mobile | Replace the brand node with the standalone symbol image |
| Z3 | Site footer | Replace the brand node with the L05 compact lockup image |
| Z4 | `/sobre-escala`, section A | Add one decorative image node in the right-hand column |
| Z5 | Site metadata | Replace favicon / app icon / OG image assets |
| Z6 | Locale dictionaries | Add alt-text keys for `es`, `en`, `ca` |

### What must remain byte-identical

Nothing outside the six rows above may appear in the diff. Specifically:

- Design tokens. No new colour value, no edit to an existing one. Every colour in this change is already defined.
- Typography. No font family, weight, size, or loading change. This brand bundle does **not** introduce Space Grotesk.
- All existing copy in all three locales. Only additive alt-text keys.
- Routes, localized slugs, `routes.ts`, `hreflang`, `canonical`, `x-default`, `sitemap.xml`, `robots.txt`.
- Header height, sticky behaviour, nav items and order, locale switcher, «Hablemos» button.
- Mobile menu trigger behaviour and the expanded menu panel.
- Footer structure: claim, nav columns, legal line, dividers.
- Every section component, every `FIG` diagram, every animation.
- Contact page, contact API route, `lib/email.ts`.
- All pages other than `/sobre-escala`, apart from the shared header and footer.

If any required change would fall outside this list, **stop and report before editing**. Do not widen the scope autonomously.

---

## §1 Context and intent

The site currently ships a provisional brand mark in the header: a small geometric placeholder plus the word "ESCALA" set in mono. The real identity now exists as a delivered asset bundle. This spec puts that identity into the four places where the brand is visible, plus metadata.

The intent is deliberately narrow. This is a brand-asset swap, not a redesign. The existing "Sistemas en movimiento" visual system — tokens, typography, grid, figures — stays exactly as it is. The brand marks sit on top of it.

### One known constraint, recorded on purpose

The wordmarks are raster, not vector. No original vector file exists. Native resolution ceilings:

| Asset | Native |
|---|---|
| L01 seal | 288 × 294 (576 × 588 at @2x, upscaled with line-art re-sharpening) |
| L02 lockup | 445 × 119 |
| L05 compact lockup | 386 × 64 |

Never render any wordmark above its `@2x` file width. The symbol and all icon assets are true vector and have no ceiling.

---

## §2 Asset bundle

Copy the delivered `brand-assets/` contents into the repository's public asset directory, preserving filenames. Suggested location `public/brand/`, but follow whatever convention the project already uses for static images.

### Files consumed by this spec

| Purpose | File | Rendered at |
|---|---|---|
| Z1 header | `png/logo-02-lockup-paper.png` + `@2x` | 162 × 43 |
| Z2 mobile header | `icons/symbol-paper-96.png` | 26 × 19 |
| Z3 footer | `png/logo-05-lockup-compact-paper.png` + `@2x` | 180 × 30 |
| Z4 `/sobre-escala` | `png/logo-01-seal-ink.png` + `@2x` | 280 × 286 (200 × 204 below 900px) |
| Z5 favicon | `icons/favicon.ico`, `icons/favicon-{16,32,48,96,192,512}.png` | — |
| Z5 iOS | `icons/apple-touch-icon.png` | 180 × 180 |
| Z5 PWA | `icons/maskable-{192,512}.png` | — |
| Z5 social | `og/og-image.png` | 1200 × 630 |

`webp/` variants exist for every raster lockup. Use them if the project already serves WebP with a PNG fallback; do not introduce a new image pipeline just to consume them.

### Files delivered but not used by this spec

`logo-04-wordmark-*`, `logo-06-stacked-*`, the `mar` colour variants, `svg/escala-symbol-*.svg`, and the remaining `svg/escala-icon-*.svg` variants. Copy them into the repository so they are available, but do not reference them from any component. They have no assigned placement yet.

### Colour variant rule

| Variant | Use on |
|---|---|
| `paper` | `abisal`, `mar`, `ink` — any dark surface |
| `ink` | `paper` — any light surface |
| `mar` | `paper`, accent use only — unused in this spec |

The header and footer are `abisal`, so both take `paper`. The `/sobre-escala` section A background is `paper`, so the seal takes `ink`.

---

## §3 Z1 — Desktop header

Replace the brand node. The image is the accessible name of the existing link to the home page; the link target, position, and any existing hover or focus treatment stay as they are.

- Rendered size: **162 × 43 px**. Fixed; it does not scale with viewport.
- Declare intrinsic width and height so no layout shift is introduced.
- Serve `@2x` on high-density displays through whatever mechanism the project already uses.
- Vertical alignment: optically centred within the 79 px header, same as the node it replaces.

**Note on the size.** At 162 px the "DIGITAL VENTURES" tagline measures 6.5 CSS px. On 2x displays the `@2x` file renders it at 13 device pixels, well inside the 445 px native width, and it is sharp. On 1x displays it sits at the edge of legibility. This is accepted, and recorded here so it is not rediscovered later as a defect.

---

## §4 Z2 — Mobile header

Replace the brand node with the standalone symbol. No disc, no plate — the disc form is reserved for favicon and app icon.

- Rendered size: **26 px wide** (19 px tall).
- Same link target and behaviour as desktop.
- The menu trigger and the expanded menu panel are untouched. Their markup must not appear in the diff except where the brand node is genuinely adjacent.
- The existing breakpoint that switches between desktop and mobile header stays as it is. Do not introduce a new one.

---

## §5 Z3 — Footer

Replace the brand node in the left-hand column with the compact lockup.

- Rendered size: **180 × 30 px**.
- Everything below and beside it — claim, nav columns, legal line, dividers — stays exactly as it is.
- If the footer brand node is currently a link, keep it a link with the same target.

---

## §6 Z4 — `/sobre-escala`, section A

Add one image node to the right-hand column of the first section, which is currently empty.

- Asset: seal, `ink` variant.
- Rendered size: **280 × 286 px** at desktop widths.
- Placement: right column, horizontally centred within it, top-aligned to the start of the body paragraph — not to the H1. See the wireframe.
- Below the existing breakpoint where that grid already collapses to one column (900 px in the wireframe — use the project's actual value), the seal moves below the text, horizontally centred, at **200 × 204 px**. It must not overflow at 360 px.
- **Decorative.** It carries no information the surrounding copy does not already carry. Empty alt attribute and hidden from assistive technology. Do not write descriptive alt text for it.
- Do not change the section's copy, eyebrow, heading, grid definition, or column ratio. The image occupies space that is already allocated and currently empty.

---

## §7 Z5 — Metadata

Replace the existing icon and social-image assets. Use the project's established Next.js metadata convention; do not introduce a new one.

- Browser icon: `.ico` plus the PNG sizes listed in §2.
- iOS: `apple-touch-icon.png`, 180 × 180, full bleed. iOS applies its own corner rounding — the asset must not be pre-rounded.
- PWA manifest, if one exists: the maskable icons at `purpose: maskable`. If no manifest exists, do not create one. That is out of scope.
- Open Graph and Twitter card: `og-image.png`, 1200 × 630.

**One OG image serves all three locales.** It carries no text, so it needs no translation and produces no new dictionary keys. Do not generate per-locale OG variants.

Remove any placeholder icon or OG asset this replaces. Leaving orphaned files behind is a defect.

---

## §8 i18n and accessibility

### Dictionary keys

Copy never lives in components. Add alt-text keys to `content/es`, `content/en`, `content/ca`. The i18n coverage guard fails the build on a missing key or a silent fallback, so all three locales must land in the same change.

| Key | ES | EN | CA |
|---|---|---|---|
| header logo | `Escala Digital Ventures — Inicio` | `Escala Digital Ventures — Home` | `Escala Digital Ventures — Inici` |
| footer logo | `Escala Digital Ventures` | `Escala Digital Ventures` | `Escala Digital Ventures` |

Key names follow the project's existing dictionary conventions. The seal in §6 is decorative and takes no key.

### Accessibility floor

- Contrast: `paper` on `abisal` and `ink` on `paper` both already pass AA. No new colour pairing is introduced.
- The header logo link keeps a visible keyboard focus indicator, unchanged from its current treatment.
- If the footer logo sits adjacent to the company name in text, it is decorative and takes an empty alt instead of the key above. Judge from the actual markup and say which you chose.
- No animation is added anywhere in this change, so `prefers-reduced-motion` needs no new handling.
- Layout holds down to 360 px.

---

## §9 Acceptance criteria

Each is verifiable by inspection or by diff.

1. `git diff --stat` touches only: the header component, the footer component, the `/sobre-escala` page or its section component, the metadata configuration, the three locale dictionaries, and added asset files.
2. No diff hunk touches a token file, a font configuration, `routes.ts`, `sitemap`, `robots`, a `FIG` component, an animation, or the contact form.
3. No hardcoded colour value is introduced anywhere in the change.
4. No alt text is hardcoded in a component. All of it resolves through the dictionaries.
5. The i18n coverage guard passes: every new key exists in `es`, `en`, and `ca`, with no silent fallback.
6. TypeScript strict passes with no new errors and no new suppressions.
7. Rendered sizes match §2 exactly at desktop widths.
8. No image lacks intrinsic dimensions. Cumulative Layout Shift does not regress.
9. `/sobre-escala` holds at 360 px with no horizontal overflow and no seal clipping.
10. Header and footer render correctly in all three locales, on desktop and mobile, with the correct `paper` variant on the dark surface.
11. Lighthouse scores stay at or above the current baseline in all categories.
12. The provisional header mark no longer appears anywhere in the codebase — component, style, or asset.

---

## §10 Out of scope

Do not do any of the following as part of this change, even if it looks like an improvement:

- Introducing Space Grotesk or the monochrome palette from the brand sheets.
- Assigning placements for L04, L06, or the `mar` colour variants.
- Refactoring the header or footer beyond the brand node.
- Adding a PWA manifest where none exists.
- Adding text to the OG image, or generating per-locale OG variants.
- Converting any wordmark to SVG. No vector source exists; a trace at this resolution would degrade the mark.
- Touching any page other than `/sobre-escala`, apart from the shared header and footer.

---

## §11 Reporting

On completion, report:

1. `git diff --stat` in full.
2. Which file each of the six zones in §0 landed in.
3. The alt-text decision for the footer logo per §8, with the reason.
4. The actual breakpoint value used in §6, and confirmation it is the project's existing one rather than a new one.
5. Any point where the change wanted to exceed the scope guard, and what you did instead.
