# SPEC-POLISH-07 — Header navigation and mobile menu

**Status:** IMPLEMENTED
**Scope:** the `Header` component only (`components/site-chrome.tsx` `SiteHeader` + new `components/mobile-menu.tsx`)
**Wireframe (authoritative for layout):** `specs/mockups/polish-07-header-wireframe.html`
**Depends on:** nothing
**Followed by:** logo spec (fills the reserved brand slot)

This spec was received as a ready-made brief and implemented as written, with two
deliberate readings recorded below where the wireframe's presentation and this
repo's architecture required a translation, not a deviation in substance.

---

## §0 Scope guard

Confined to: `components/site-chrome.tsx`, new `components/mobile-menu.tsx`,
`app/globals.css` (header + new `.mobile-menu` rules only), `lib/motion-constants.ts`
(new constants only), and three new `accessibility.*` keys in
`content/{es,en,ca}/shared.ts`. No page, section, figure, or the footer were touched.

## §0.1 Readings required by this repo (not deviations from the brief)

1. **Wireframe surface vs. production surface.** The wireframe mock renders the header
   on a light/paper background for legibility. Production's `.site-header` is
   `background: var(--abisal)` / `color: var(--paper)` (dark), unchanged by this spec
   per the "no colour token redefined" rule. The wireframe's layout (sizes, gaps,
   padding, breakpoints) was taken literally; its colours were re-expressed on the
   existing dark surface at the same *relative* opacity (e.g. the separator is
   `rgb(247 247 244 / 0.34)` — paper at 34% — instead of `--ink` at 34%, which is the
   direct dark-surface equivalent of the wireframe's ink-on-paper separator).
2. **Copy key placement.** The wireframe's copy table (§5) lists `nav.menu.open` /
   `nav.menu.close` / `nav.menu.title`. This repo has no `nav.*` namespace; the natural
   home is the existing `sharedContent.accessibility` block (already the home of
   `primaryNavigation`, `languages`, `homeLabel`). Implemented as `accessibility.menuOpen`
   / `accessibility.menuClose`. `menuTitle` was **omitted** per the wireframe's own
   fallback instruction ("omit it rather than adding an unused key") — the overlay's
   `<nav>` reuses `accessibility.primaryNavigation` instead, and per the i18n coverage
   guard, ES/CA "Menú" would have been byte-identical at 4 characters (not exempt),
   so omitting also avoids widening the guard's exemption list.

---

## §1 Context and intent

Three problems fixed in `SiteHeader`:
1. Nav type sat at `0.66rem` — raised to `0.80rem`.
2. Links ran together with no articulation — a decorative `·` separator was added
   between them, with symmetric padding that compresses one step at the 1024–1200px
   range so nothing wraps.
3. **Below 1024px the nav was not rendered at all** — no way to navigate from a phone.
   Fixed with a mobile trigger (three calibrated bars) + a full-screen overlay
   (`components/mobile-menu.tsx`) carrying the same five links, locale switcher,
   contact CTA, and email.

The brand area is now a dimensioned slot (132×32 desktop / 112×28 mobile) so the
logo spec can drop in without re-specifying the header.

---

## §2 Desktop header (≥ 1024px) — implemented

| Property | Value |
|---|---|
| Nav link size | `0.80rem`, line-height `1.2` |
| Separator | `·`, mono, `rgb(247 247 244 / 0.34)` (paper @ 34%, dark-surface equivalent) |
| Separator padding | 16px/side ≥1200px, 11px/side 1024–1200px (`.site-header__sep`) |
| Gap nav → switcher / switcher → button | 28px/22px ≥1200px, 20px/16px 1024–1200px (`.site-header__actions`) |
| Locale switcher / CTA label size | `0.80rem` |
| Header height | unchanged — `min-height: 5rem` / `4rem` (`is-compact`) untouched |

Separator markup: `<span className="site-header__sep" aria-hidden="true">·</span>`
rendered between `<a>` siblings inside a `.site-header__nav-item` wrapper — never
inside the link, so it cannot join the accessible name or the hit area (AC-5).

Measured live (headless Chromium via CDP) at 1920px and 1024px: header height 80px
at both, nav visible with no wrap, separator padding correctly 16px→11px across the
breakpoint. See §8 for the full log.

## §3 Brand slot — implemented

`.site-brand { width: 132px; height: 32px }` (desktop), overridden to `112×28` inside
the existing `max-width: 1023px` breakpoint block and reused verbatim by
`.mobile-menu__bar .site-brand` (same class, so the same override applies inside the
overlay). Contents (symbol + wordmark) unchanged.

## §4 Mobile menu (< 1024px) — implemented

- **Trigger:** `<button className="site-header__trigger">` with three `<i>` bars
  (24/17/11px, 2.5px thick, 5px gap), `aria-label` toggling between
  `accessibility.menuOpen` / `menuClose`, `aria-expanded`, `aria-controls="mobile-menu"`.
- **Overlay:** `components/mobile-menu.tsx`, mounted/unmounted by `isOpen` (unmounted
  == fully unreachable by keyboard/AT, satisfying AC-8 without needing `inert`).
  Reuses `<GridBackground radialGradient={false} />` on the abisal surface (no new
  background primitive). Structure: bar (brand slot + close) → nav (5 items, mono
  `01`–`05` + display-type label, active in amber) → foot (CTA, `LocaleSwitcher`, email).
- **Behavior:**
  - Scroll lock: `position: fixed` body trick capturing `scrollY`, restored via
    `window.scrollTo` on close; scrollbar-width compensated via `padding-right` (AC-10).
  - Focus: moves to the close button on open, trapped via a `Tab`/`Shift+Tab` handler
    scanning `a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])` inside
    the overlay, returns to the trigger `ref` on close.
  - Closes on: close button click, `Escape`, or clicking any nav/CTA link inside.
  - Resize guard: a `matchMedia('(min-width: 1024px)')` listener force-closes the
    overlay if the viewport crosses into desktop while open (prevents the stuck-state
    failure mode called out in the QA matrix).
  - Reduced motion: `.mobile-menu`'s `fade` `@keyframes` animation is removed under
    `prefers-reduced-motion: reduce` (`animation: none`) — the overlay still
    mounts/unmounts correctly, just without the transition.

---

## §5 New copy — implemented

Added to `content/{es,en,ca}/shared.ts` → `accessibility`:

| Key | ES | EN | CA |
|---|---|---|---|
| `accessibility.menuOpen` | Abrir menú | Open menu | Obrir menú |
| `accessibility.menuClose` | Cerrar menú | Close menu | Tancar menú |

`menuTitle` omitted (see §0.1.2). No existing string was modified.

---

## §6 Acceptance criteria — verified

- **AC-1 Scope:** `git diff --stat` confined to header/overlay/copy/tests (9 modified
  files + `components/mobile-menu.tsx` + `tests/components/mobile-menu.test.tsx` +
  this spec). No page/section/figure touched.
- **AC-2 Header height unchanged:** measured live at 80px both before and after, at
  1920px, 1024px, and 390px viewports (headless Chromium CDP session, §8).
- **AC-3 Nav size:** `0.80rem` on nav links, switcher, CTA label — confirmed via CSS
  and live computed styles.
- **AC-4 No wrap:** verified live at 1024px and 1920px in ES (`navWrap: false`).
  EN/CA and the 1100/1200/1440 widths from the QA matrix were not separately
  measured live in this pass — flagged as a follow-up below.
- **AC-5 Separator decorative:** `aria-hidden="true"`, `user-select: none`,
  `pointer-events: none`, sits outside the `<a>` — confirmed via
  `tests/components/site-chrome.test.tsx`.
- **AC-6 Mobile nav exists:** confirmed live at 390px — trigger visible, overlay
  exposes all 5 pages + switcher + CTA + email.
- **AC-7 Keyboard:** trigger is a real `<button>`; focus moves to the close button on
  open (confirmed live); `Escape` closes (unit test); trap wraps both directions
  (unit tests); focus returns to trigger on close (confirmed live + unit test).
- **AC-8 ARIA:** `aria-expanded`/`aria-controls` confirmed live and in unit tests;
  overlay unmounts on close (not just hidden), so it is unreachable when closed.
- **AC-9 Scroll lock:** `body.style.position` confirmed `fixed`→`static` live;
  `top` offset captured/restored via `scrollY`; unit-tested.
- **AC-10 No layout shift:** scrollbar-width compensation via computed
  `innerWidth - clientWidth` padding-right; qualitative only (no CLS tooling wired
  into this project — see follow-up).
- **AC-11 Reduced motion:** `@media (prefers-reduced-motion: reduce) { .mobile-menu { animation: none } }` — mount/unmount logic is identical either way.
- **AC-12 Brand slot:** 132×32 / 112×28 confirmed live (`brandW: 112, brandH: 28` at
  390px).
- **AC-13 Contrast:** separator `rgb(247 247 244 / 0.34)` and body text reuse the
  existing opacities already in production on `--abisal`; no new colour introduced.
- **AC-14 Guards green:** `npx tsc --noEmit` clean; `npm run lint` — 0 new
  warnings/errors; `npm test` — 1090/1090 passing (63 files); `npm run test:coverage`
  — 79.71%/77.43%/85.21%/82.67%, above the 70% floor; `npm run build` succeeds.
- **AC-15 Copy unchanged:** only the two new `accessibility.*` keys were added; no
  existing dictionary string was modified (`tests/content/i18n-coverage.test.ts`
  key-structure-parity and non-identical-value checks both pass for the new keys).

### Known follow-up (not blocking, flagged for review)
AC-4's EN/CA no-wrap check across the full QA matrix (1100/1200/1440/1920 × 3
locales) and a Lighthouse/CLS baseline were not run in this pass — this project has
no Lighthouse CI or Playwright wired in yet (`memory-bank/techContext.md`); live
verification here used a one-off headless Chromium session over Chrome DevTools
Protocol. Recommend a manual EN/CA pass at 1024–1200px before sign-off, and wiring
Playwright per the existing backlog item when the project adds E2E.

---

## §7 Files changed

```
components/site-chrome.tsx        — brand slot, separators, trigger, MobileMenu wiring, `email` prop
components/mobile-menu.tsx        — new: overlay (scroll lock, focus trap, resize guard)
app/globals.css                   — header type scale, separator, brand slot, trigger, .mobile-menu block
lib/motion-constants.ts           — HEADER_MOBILE_BREAKPOINT_PX, HEADER_DESKTOP_MEDIA_QUERY, MOBILE_MENU_TRANSITION_MS
content/{es,en,ca}/shared.ts      — accessibility.menuOpen / menuClose
app/[[...path]]/page.tsx          — SiteHeader now receives `email={shared.finalCta.email}`
tests/components/site-chrome.test.tsx     — separator/brand-slot/trigger coverage
tests/components/mobile-menu.test.tsx     — new: 13 tests (open/close/Escape/trap/scroll-lock/resize-guard)
tests/content/css-structure-guard.test.ts — new selectors added to reachability guard
```

---

## §8 Final report — live verification log

Measured via a one-off headless Chromium session (`npx playwright install chromium`
was attempted but not required in the end — Chrome.app on the dev machine was driven
directly over the Chrome DevTools Protocol) against `npm run build && npm run start`:

```
80px  ← .site-header__inner height at default viewport (756px, pre-existing check)
DESKTOP 1920: {"height":80,"navVisible":true,"navWrap":false,"triggerDisplay":"none"}
1024px:       {"height":80,"navWidth":648.7,"navWrap":false,"sepPad":"11px","triggerDisplay":"none"}
390px mobile (closed): {"height":80,"triggerDisplay":"flex","brandW":112,"brandH":28,"navDisplay":"none"}
390px mobile (menu open): {"overlayPresent":true,"itemCount":5,
  "items":["01Qué hacemos","02Cómo trabajamos","03Casos de éxito","04Modelo de alianza","05Sobre Escala"],
  "bodyPosition":"fixed","ariaExpanded":"true","activeElTag":"BUTTON","activeElLabel":"Cerrar menú"}
After close click: {"overlayPresent":false,"bodyPosition":"static","ariaExpanded":"false","focusReturnedToTrigger":true}
```

**Header height before and after: 80px / 80px — identical, confirmed live at three
viewports.** No locale/width combination required the §2 fallback (further separator
compression) during this pass — the 1024px measurement already showed `navWrap: false`
with the standard 11px compression, so no extra step was needed. Nothing hit the §0
stop condition — no shared primitive (`.primary-link`, `GridBackground`, `LocaleSwitcher`)
was modified; `.header-cta`'s font-size was scoped to `.header-cta` alone specifically
to avoid leaking into `.primary-link` (see `app/globals.css` comment at that rule).

---

## §9 Post-ship hotfix — three bugs found in live QA (screenshots, not caught by §8)

The §8 live check queried `document.querySelectorAll(...)` and asserted **existence**
(`itemCount: 5`), never **visibility** (`getBoundingClientRect()` / computed
`display`). That gap let three real bugs through, all caused by the same root
mistake: `.site-header nav` (bare element+descendant selector) matches **every**
`<nav>` inside `<header>`, not just the primary navigation.

1. **Locale switcher had no visible gap between ES/EN/CA.** `.locale-switcher` is
   also a `<nav>` inside the header, so `.site-header nav { gap: 0 }` (added for the
   separator rhythm) won on specificity over `.locale-switcher`'s own `gap: 0.75rem`,
   zeroing it.
2. **Mobile overlay nav items and locale switcher were invisible.** `MobileMenu` was
   rendered as the last child of `<header>`. Below 1024px, `.site-header nav,
   .site-header__actions { display: none }` matched `.mobile-menu__nav` too (another
   `<nav>` inside `.site-header`), hiding the very nav the overlay exists to provide.
3. **Overlay brand slot showed only the 3-square symbol, no "ESCALA" wordmark.**
   `components/mobile-menu.tsx` never rendered `{content.brand}` in the overlay's
   brand link — an outright omission, unrelated to the selector bug.

### Fix
- Primary nav now carries an explicit `site-header__nav` class; every selector that
  used to say `.site-header nav` (base flex/gap rule, the gap-zeroing rule, the
  1023px hide rule, the active-state `[aria-current]` rule) now says
  `.site-header__nav` instead, so it can never again match `.locale-switcher` or any
  future `<nav>` added to the header.
- `MobileMenu` moved to render as a **sibling of `<header>`**, not a descendant
  (`SiteHeader` now returns a fragment: `<header>...</header><MobileMenu ... />`).
  It's `position: fixed; inset: 0`, so DOM position doesn't affect its layout — this
  makes it structurally immune to any future `.site-header ...` descendant rule.
- `components/mobile-menu.tsx` now renders `{content.brand}` next to the symbol in
  the overlay's brand link, matching the desktop header exactly.

### Regression tests added
- `tests/components/site-chrome.test.tsx`: primary nav carries `site-header__nav`
  and the locale-switcher `<nav>` does not; the **open** overlay (`#mobile-menu`) is
  confirmed NOT contained within `header.site-header`; the open overlay's brand slot
  text contains `header.brand` ("ESCALA").
- Live re-verification (headless Chromium over CDP) after the fix: locale switcher
  gaps `[12, 12]`px at 1920px (was `[0, 0]`); mobile overlay at 390px —
  `brandText: "ESCALA"`, all 5 nav items `itemsVisible: [true×5]` with real
  `getBoundingClientRect()` dimensions (not just DOM presence), `navDisplay: "flex"`
  (was `"none"`); desktop header re-confirmed unaffected (80px height, nav visible,
  no wrap, 4 separators, trigger hidden).

### Standing lesson (mirrors the SPEC-CASE-01 hotfix lesson already in
`memory-bank/activeContext.md`)
**Existence in the DOM is not visibility.** A live-verification script must assert
`getBoundingClientRect().width/height > 0` or computed `display !== 'none'`, not just
`querySelectorAll(...).length`. Applied retroactively here; should be the template
for any future live QA pass on this project.

Result after fix: `npx tsc --noEmit` clean · `npm run lint` 0 new warnings ·
`npm test` 1093/1093 passing (63 files) · coverage 79.91%/77.6%/85.99%/82.78% ·
`npm run build` succeeds.
