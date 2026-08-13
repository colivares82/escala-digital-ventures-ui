# Changelog

## [SPEC-POLISH-07 hotfix] — August 2026 — locale-switcher spacing, invisible mobile nav, missing wordmark

### Bugs (found in live QA screenshots, after SPEC-POLISH-07 was reported complete)
1. Desktop locale switcher rendered "ESENCA" with no visible gap between ES/EN/CA.
2. Mobile overlay's 5 nav items and locale switcher were invisible (present in the
   DOM per the original live check, but not actually rendered/visible).
3. Mobile overlay brand slot showed only the 3-square symbol, missing "ESCALA".

### Root cause (one mistake, three symptoms)
`.site-header nav` (bare element+descendant selector) matched **every** `<nav>`
inside `<header>` — the primary nav, `.locale-switcher`, and (while `MobileMenu`
still rendered as a child of `<header>`) the overlay's own `<nav>` too. A gap-zeroing
rule and the `max-width:1023px` hide rule, both scoped to that bare selector,
therefore reached the locale switcher and the overlay nav respectively. Separately,
`components/mobile-menu.tsx` simply never rendered `{content.brand}` in its brand
link.

### Fix
- `components/site-chrome.tsx` — primary `<nav>` now carries an explicit
  `site-header__nav` class; `MobileMenu` now renders as a **sibling of `<header>`**
  (fragment return), not a descendant, so it is structurally unreachable by any
  `.site-header ...` rule.
- `app/globals.css` — every `.site-header nav` selector (base gap rule, gap-zeroing
  rule, `max-width:1023px` hide rule, `[aria-current="page"]` active state) renamed
  to `.site-header__nav`.
- `components/mobile-menu.tsx` — overlay brand link now renders `{content.brand}`.

### Added — regression tests
`tests/components/site-chrome.test.tsx`: primary nav carries `.site-header__nav`
and the locale switcher does not; the **open** overlay is confirmed not nested
inside `<header>`; the open overlay's brand slot text contains "ESCALA".

### Verified
Live re-check via headless Chromium over CDP, this time asserting **visibility**
(`getBoundingClientRect()`/computed `display`), not just DOM existence — the same
gap that let these bugs through the first live check. Locale switcher gaps now
`[12, 12]`px (was `[0, 0]`); mobile overlay nav items and switcher now
`itemsVisible: [true×5]` / `navDisplay: "flex"` (was hidden); overlay
`brandText: "ESCALA"` (was missing). Desktop header re-confirmed unaffected (80px
height, no wrap, 4 separators). `npm test` 1093/1093 passing · coverage
79.91%/77.6%/85.99%/82.78% · `npm run build` clean. Full writeup:
`specs/spec-polish-07-header-navigation.md` §9.

## [SPEC-POLISH-07] — August 2026 — Header nav type + mobile menu

### Problem
Header nav sat at 0.66rem with no visual separation between links, and below the
1024px breakpoint the inline nav was simply `display: none` with no replacement —
the site had no way to navigate between pages from a phone.

### Changed
- `components/site-chrome.tsx` — nav raised to 0.80rem with a decorative `·`
  separator (`aria-hidden`, outside the link, `user-select`/`pointer-events` guarded);
  brand wrapped in a dimensioned slot (132×32 desktop / 112×28 mobile, ready for the
  logo spec); new `<button className="site-header__trigger">` mobile menu trigger;
  `SiteHeader` now takes a required `email` prop for the overlay's contact line.
- `app/globals.css` — header type scale (`.site-header nav a`, `.locale-switcher`,
  `.header-cta`) raised to 0.80rem (`.header-cta`'s size scoped separately from the
  shared `.primary-link` rule it used to share, so nothing outside the header moved);
  `.site-header__sep` separator with 16px/11px responsive padding; `.site-brand`
  given fixed dimensions; `.site-header__trigger` bars; new `.mobile-menu` block;
  the `max-width: 1023px` breakpoint now hides `.site-header__actions` too (not just
  `nav`) and shows the trigger; removed two dead mobile rules (`.locale-switcher`
  `display:none` and `.header-cta` padding tweak at 639px — both elements are already
  hidden below 1024px).
- `app/[[...path]]/page.tsx` — passes `email={shared.finalCta.email}` to `SiteHeader`.
- `lib/motion-constants.ts` — `HEADER_MOBILE_BREAKPOINT_PX`, `HEADER_DESKTOP_MEDIA_QUERY`,
  `MOBILE_MENU_TRANSITION_MS`.
- `content/{es,en,ca}/shared.ts` — `accessibility.menuOpen` / `menuClose`.

### Added
- `components/mobile-menu.tsx` — full-screen overlay (< 1024px) on the abisal surface
  (`GridBackground`), reusing existing header content: bar (brand slot + close),
  nav (5 items, mono `01`–`05` index + display label, active in amber), foot (CTA,
  `LocaleSwitcher`, contact email). Hand-rolled focus trap, Lenis-aware scroll lock
  (position:fixed + scrollbar-width compensation, restores exact scroll position on
  close), Escape-to-close, close-on-navigate, and a `matchMedia` resize guard that
  force-closes the overlay if the viewport crosses into desktop while open.
- `tests/components/mobile-menu.test.tsx` — 13 tests: render states, nav completeness,
  active-page marking, close paths (button/Escape/nav-click), scroll lock, focus
  management (initial + trap both directions), resize guard.
- `specs/spec-polish-07-header-navigation.md` — full spec + live verification log
  (headless Chromium over CDP: header height 80px unchanged at 1920/1024/390px;
  brand slot 112×28 at mobile; scroll lock + focus-return confirmed live).

### Verified
`npx tsc --noEmit` clean · `npm run lint` no new warnings · `npm test` 1090/1090
passing (63 files, +1 new file) · `npm run test:coverage` 79.71%/77.43%/85.21%/82.67%
(new `mobile-menu.tsx` at 95.38%/80%/100%/100%) · `npm run build` succeeds · header
height measured live before/after: 80px / 80px, identical.

## [SPEC-CASE-01 hotfix] — August 2026 — CSS nesting bug that made the page render broken

### Bug
SPEC-CASE-01's CSS insert (~415 lines) landed *before* the closing `}` of a pre-existing
`.not-found__cta` `@media (prefers-reduced-motion: reduce)` block instead of after it, silently
wrapping the entire new `.case-readout-grid` / `.case-narrative` / `.case-flow-fig` /
`.case-roles` / `.case-governance` / `.case-timeline-ladder` section inside that media query.
Under normal (non-reduced-motion) conditions every one of those rules was unreachable, so
`/casos-de-exito/magupell` (and BioZero, migrated onto the same components) rendered as
unstyled/broken content — while every one of the 1051 existing tests still passed, because they
only assert on markup and text, never on whether a CSS rule is actually reachable. The bug was
found only by visually loading the live page after SPEC-CASE-01 had already been reported
complete.

### Fix
Inserted the missing `}` immediately after the `.not-found__cta { transition: none; }` rule
(closing the reduced-motion query at its original, correct boundary) and removed the resulting
orphaned stray `}` left at the end of the file. No CSS rule content changed — only brace
placement. Verified via: (1) brace-balance script across the whole file (depth returns to 0, no
negative dips), (2) the production build's compiled CSS chunk showing `.case-readout-grid` etc.
as top-level rules, not nested in any `@media`, and (3) the new regression test below, confirmed
to fail against the original broken structure and pass against the fix.

### Added — regression safeguard
- `tests/content/css-structure-guard.test.ts` — parses `app/globals.css` as text (jsdom doesn't
  apply real stylesheets, so `getComputedStyle` gives false confidence here) and asserts: total
  brace balance; every canonical CaseDossier selector is reachable and not trapped inside
  `prefers-reduced-motion: reduce`; every `case-*` className emitted by the 6 SPEC-CASE-01
  components has a matching CSS rule; and the governance dark surface is owned by
  `.case-narrative__section--governance` (the full-bleed section wrapper), not the inner
  `.case-governance` card container — documenting a "transparent background" false alarm found
  while investigating this bug so it isn't misdiagnosed as a regression later.
- `content/data/cases.ts` — `getCase`'s unused `_locale` param renamed to `locale` with an
  explicit `void locale` and a doc comment explaining it's intentionally unused (was a lint
  warning; the parameter itself is kept because a test exercises the "locale doesn't affect
  result" contract).

### Verified
1066/1066 tests passing (62 files, +15 from the new guard); `npx tsc --noEmit` clean; `eslint`
0 errors; `npm run build` clean; coverage 78.72%/77.31%/85.71%/81.56%
(lines/branches/functions/statements), above the 70% floor.

## [SPEC-CASE-01] — August 2026 — Magupell case page rewrite (launch-safe version)

### Summary
Rewrote `/casos-de-exito/magupell` (ES/EN/CA) with verified production figures (167 → 216
requirements, 1.803/1,803 automated tests, 7 months to production, 4 roles, 3 environments,
live since July 2026), replacing the pre-launch placeholders (`100+`/`200+`) and every
invoicing/billing-as-invoice reference with "resúmenes de cobro" / "billing summaries" /
"resums de cobrament". Fixed the brand spelling "Magupell" (was "MAGUPELL") in every
user-facing string on this page and its index card. Added two new numbered sections
(04 "A medida de cada rol", 05 "Gobernanza" on the abisal surface) and two new figures
(FIG. EXP-02 "El ciclo operativo", FIG. EXP-03 chronology ladder with per-milestone detail).

### Approved deviation — CaseDossier is now the canonical case template
Per explicit direction from Carlos during implementation, `CaseDossier` was upgraded to a
richer canonical structure (`readoutGrid` + `narrative[]`, dispatched by `CaseNarrative`) and
BioZero was migrated onto it, rather than building a Magupell-only template as the original
spec's §0.2 shared-component freeze implied. BioZero's copy is byte-unchanged; only its
rendering shape changed (readouts → `CaseReadoutGrid`, fields/capabilities → `CaseNarrative`
prose + capabilities blocks). This supersedes SPEC-CASE-01 AC-9 ("BioZero byte-identical") by
design — see DECISIONS.md. The template still falls back to the legacy `ReadoutStrip` /
`DossierField` / `CapabilityGrid` rendering when a case supplies neither `readoutGrid` nor
`narrative`, preserving AC-4 (a 3rd case needs data only, no component changes).

### Resolved blockers
- **Environments count (§2):** confirmed **3 entornos** (local, desarrollo, producción, con
  pipelines protegidas) — matches the home page `proof.readouts` verbatim. DAT.05 and the
  "CAMBIOS SEGUROS" governance card use this figure.
- **FIG. EXP-02 caption collision:** BioZero's header `plate` string is also
  `'FIG. EXP-02\nESCALA · PRIMER CLIENTE'`. Kept as-is — different surfaces (header plate vs.
  in-page figure caption) — flagged rather than silently changed.

### New files
- `components/case-readout-grid.tsx` — canonical n-cell readout grid (`DAT.0N / LABEL` + amber
  tick), page-local, not shared with the home `ProofSection` by design (SPEC-CASE-01 §3).
- `components/case-narrative.tsx` — variant dispatcher for the canonical numbered narrative
  (`prose` / `flow-fig` / `roles` / `governance` / `capabilities` / `timeline`).
- `components/case-flow-fig.tsx` — FIG. EXP-02 "El ciclo operativo": 4 nodes, connectors
  terminating at node borders (behind nodes, never overlapping), one-shot L→R traversal accent
  on entry, full static fallback under `prefers-reduced-motion`, vertical stack <720px.
- `components/case-roles-grid.tsx` — section 04, 2×2 role cards.
- `components/case-governance.tsx` — section 05, abisal surface, 2×2 cards, AA-safe
  `rgba(234,240,245,.82)` body text on `--abisal`.
- `components/case-timeline-ladder.tsx` — FIG. EXP-03, 5-milestone strip with a detail line
  per milestone (extends the home `ProofTimelineFig` concept; does not import/reuse it).

### Changed files
- `content/data/cases.ts` — new canonical types (`CaseReadoutCell`, `CaseNarrativeBlock` union,
  `CaseFlowNode`, `CaseRole`, `CaseGovernanceCard`, `CaseTimelineMilestone`); Magupell rewritten
  in all 3 locales (`readoutGrid` + `narrative[]`, new meta, new card copy,
  `cardSubtitleByLocale`); BioZero migrated onto the canonical shape with unchanged copy.
- `components/case-dossier.tsx` — prefers `readoutGrid`/`narrative` when present, falls back to
  legacy `ReadoutStrip`/`DossierField`/`CapabilityGrid` otherwise.
- `components/case-card.tsx` — uses `cardSubtitleByLocale` when present (ES fallback preserved).
- `app/globals.css` — new `SPEC-CASE-01` section: `.case-readout-grid`, `.case-narrative`,
  `.case-flow-fig` (+ traversal keyframe + reduced-motion override), `.case-roles`,
  `.case-governance`, `.case-timeline-ladder`. Tokens only, no hardcoded hex.
- `lib/motion-constants.ts` — `CASE_FLOW_MOBILE_BREAKPOINT_PX`, `CASE_FLOW_TRAVERSAL_DUR_S`.
- `tests/content/cases-data.test.ts` — rewritten Magupell invariants for the canonical shape;
  added content guardrails (no `factura|facturación|facturar|invoic`, no `MAGUPELL`, no
  `100+|200+`) and a BioZero migration-parity test.

### Tests
6 new component test files (`case-readout-grid`, `case-flow-fig`, `case-roles-grid`,
`case-governance`, `case-timeline-ladder`, `case-narrative`) plus a canonical-rendering
integration file (`case-dossier-canonical.test.tsx`) against the real Magupell/BioZero data.
1051/1051 tests passing (61 files); `npx tsc --noEmit` clean; `npm run build` clean; coverage
78.69%/77.31%/85.71%/81.53% (lines/branches/functions/statements), above the 70% floor.

### Out of scope (per spec §0.2, untouched)
BioZero's own copy, the home page, all other interior pages, routing/i18n plumbing, design
tokens, shared primitives (`PageHeader`, `Section`, `FinalCTA`, `GridBackground`,
`AllianceConstellation`, `ServiceFig`, `ContactForm`), the Magupell logo asset and outbound
link, and `/docs` sources (still carry the pre-launch `100+`/`200+`/invoicing/`MAGUPELL`
narrative — reported per spec §8, not edited here).

## [SPEC-POLISH-06] — August 2026 — /como-trabajamos: execution cycle, build system, section order

### Changed
- **Section order** — the Escala Growth Framework (`PhaseCycle`) moved from section B to the
  **last content section (E)**, immediately before `FinalCTA`. Final order (after a post-
  implementation addendum, see below): A·PageHeader → B·ExecutionCycleFig (FIG.06) →
  C·ExecutionPractices → D·AiBuildBlock (FIG.12) → E·PhaseCycle → FinalCTA. Re-lettered in
  all 3 locales; the Framework's own copy, component and figure are unchanged — only its
  position and section letter moved.
- **Addendum — B/C swap (post-implementation, Carlos's request):** the initial
  implementation ordered B·ExecutionPractices → C·ExecutionCycleFig, matching SPEC-POLISH-06
  §1.1. Carlos requested "El flujo de ejecución" precede "La ejecución, en el día a día" once
  live — swapped to B·ExecutionCycleFig → C·ExecutionPractices, re-lettered accordingly
  (`pipeline.sectionIndex` C→B, `executionPractices.sectionIndex` B→C) in all 3 locales. This
  is a deliberate, approved deviation from §1.1's exact order — recorded here rather than left
  as a silent mismatch between spec and code. Surfaces were intentionally left unchanged
  (pure reorder); Carlos will review the resulting paper→dark→paper→dark→dark rhythm live and
  decide separately whether `ExecutionPractices` should move to the dark surface.
- **Figure numbering** — kept FIG.06 for the execution-cycle figure; the new "how we build"
  figure takes **FIG.12** (next free global number), not FIG.07 — FIG.07 is already used by
  `/que-hacemos` and the site numbers figures globally, not per page. `/que-hacemos` FIG.07–11
  are untouched.
- **`ExecutionPipelineFig` (open-ended pipeline, FIG.06) replaced by `ExecutionCycleFig`** — a
  single closed ring with 5 stations clockwise from 12 o'clock (Especificación → Aprobación →
  Construcción → Producción → Uso real), an amber return edge (station 5 → 1) whose chevron
  arrowhead stops at station 1's marker, 5 always-visible direction chevrons, and a phase-locked
  12s ambre pulse. Client-owned stations (Aprobación, Uso real) get the amber marker treatment;
  quality is not a station (support line under Construcción only, per Libro Ch. 6). <720px
  fallback: vertical station list (same pattern as `PhaseCycle`'s static list).
- **`AiBuildBlock` full replacement** — heading/body now "Ingeniería con criterio, acelerada
  por agentes" (was "La IA también en cómo construimos"); the copy-left/figure-right split is
  replaced by heading + body full width → new `HowWeBuildFig` (FIG.12) full content width →
  4-column legend (gobierno/ejecución/control/capitalización, collapses to 2 cols <900px, 1 col
  <560px).
- **`HowWeBuildFig` (new)** — a layered system diagram: a dashed governing frame containing the
  approved-specification entry, 3 named parallel agent lanes (Implementación · Pruebas ·
  Documentación) and 2 amber gates (Criterio senior, Calidad verificable); Producción sits
  **outside** the frame; an amber return path re-enters it. Three staggered 7s pulses per lane,
  gate flashes offset 0.5s to read as sequential checks, dimmer return pulse.

### Added
- `components/execution-cycle-fig.tsx`, `components/how-we-build-fig.tsx` — new page-scoped
  figure components for `/como-trabajamos` only.
- `EXEC_CYCLE_*`, `HOW_WE_BUILD_*` constants in `lib/motion-constants.ts` — additive only.
- `tests/components/execution-cycle-fig.test.tsx`, `tests/components/how-we-build-fig.test.tsx`.
- Content-integrity guards: exactly 5 stations, exactly 2 client-owned, no station labelled
  "Calidad", sections lettered A–E with no gap/duplicate.

### Removed
- `components/execution-pipeline-fig.tsx` and its test — fully replaced by `ExecutionCycleFig`.

### Not changed
- `PageHeader`, `Section`, `FinalCTA`, `GridBackground`, `AllianceConstellation`, `ServiceFig`,
  `ContactForm`, `PhaseCycle` (component internals) — byte-identical.
- Every other page (`/`, `/que-hacemos`, `/casos-de-exito*`, `/modelo-de-alianza`,
  `/sobre-escala`, `/contacto`, legal, 404) — byte-identical.

### Deviations from §0 scope guard (reported, not silent)
- `app/globals.css` — no per-component stylesheets exist in this project; new BEM blocks added,
  dead `.pipeline-*`/`.ai-diagram*` rules removed.
- `app/styleguide/page.tsx` — renders both changed components; updated to the new prop shapes.
- `lib/motion-constants.ts` — additive timing constants only (no-magic-numbers rule).

### Test results
- 54 test files · 991 tests · 100% pass · build clean · TypeScript strict clean · lint clean
  (0 new errors) · coverage 77.96%/76.14%/84.71%/80.85% (well above the 70% floor) · 0
  hardcoded hex in the two new components.

## [SPEC-POLISH-05] — August 2026 — /que-hacemos: FIG.08/09/11 overlap & layering fixes

### Fixed
- **FIG.08 (`platform`, ARQUITECTURA MODULAR)** — module boxes (USUARIOS · ROLES, DOMINIO, CORREO, DOCUMENTOS, FACTURACIÓN) resized to fit their labels (no text spilling outside); `PLATAFORMA` fits inside the core ring; connector endpoints computed geometrically from the core center/radius so every line lands exactly on the core border (verified: distance from core center == radius for all 5 connectors) — never short, never crossing in.
- **FIG.09 (`ai`, IA EN EL PROCESO)** — flow line split into two edge-to-edge segments (`ENTRADA→PROCESO`, `PROCESO→DECISIÓN`) so it never crosses box text; process boxes given an opaque `--paper` fill as a second safeguard; "DONDE APORTA" repositioned above the IA node, off the diagram (previously overlapped the diagram); IA dashed connector now meets the PROCESO box's top edge exactly (was already close, confirmed correct in the rewrite).
- **FIG.11 (`evolve`, EVOLUCIÓN CONTINUA)** — z-order corrected: circle stroke drawn first (underneath), the three nodes (USO, FEEDBACK, MEJORA) drawn last with an opaque `--paper` fill so the circle stroke is hidden behind each node (was previously drawn under the line with `fill="none"`, exposing the stroke through the nodes).

### Added
- **FIG.08 animation** — five staggered, looping module→core ambre pulses (`SERVICE_FIG_PLATFORM_PULSE_DUR_S`, `SERVICE_FIG_PLATFORM_PULSE_STAGGER_S`). This figure previously had no animation at all.
- **FIG.09 animation** — pulses on both flow segments plus the dashed IA connector (`SERVICE_FIG_AI_FLOW_PULSE_DUR_S`, `SERVICE_FIG_AI_CONNECTOR_PULSE_DUR_S`).
- **FIG.11 animation** — the ambre progress arc now traces the FULL circle continuously via a `stroke-dasharray`/`stroke-dashoffset` SVG `<animate>` (`SERVICE_FIG_EVOLVE_ARC_DUR_S`), replacing the previous static quarter-arc + traveling-dot pulse. `prefers-reduced-motion` renders the arc complete and static (no extra CSS needed).
- `LegacyCanvas` helper in `components/service-fig.tsx` — wraps FIG.07/FIG.10's untouched markup in a single `translate(10 15)` to center it on the new shared 340×180 canvas.
- `SERVICE_FIG_*` constant block in `lib/motion-constants.ts` (viewbox/offset/pulse-duration/arc-duration) — additive only.
- `tests/components/service-fig-polish-05.test.tsx` — 12 new tests: FIG.08 connector-to-border geometry (computed proof), FIG.09 flow-segment count + opaque box fill + label placement, FIG.11 node z-order + full-circle arc command count, FIG.07/FIG.10 untouched-geometry guards.
- 5 new tests in `tests/components/service-fig.test.tsx` (shared 340×180 viewBox across all 5 variants).

### Changed
- All five `ServiceFig` variants now render on a shared `0 0 340 180` viewBox (was `0 0 320 150`), so all five figures render at equal height in the 320px column. **Approved amendment** to SPEC-POLISH-05 §0/AC-5: FIG.07 (`capture`) and FIG.10 (`product`) receive a canvas-only change (viewBox + wrapping translate) — their drawing coordinates, strokes, labels, and animation timings are byte-identical.

### Not changed
- `/que-hacemos` page (PageHeader, layout, all five service rows' copy) — byte-identical.
- `ServiceFig` component's public API/props — unchanged; only internal variant-drawing code changed.
- All other pages/components, all content dictionaries — byte-identical.
- `app/globals.css` — untouched (all new animation logic lives in SVG attributes).

### Test results
- 53 test files · 970 tests · 100% pass · build clean · TypeScript strict clean · lint clean · 0 hardcoded hex in `service-fig.tsx`

## [SPEC-POLISH-04] — August 2026 — Home section 05: constellation as protagonist

### Added
- `AllianceFigureContent` interface in `content/types.ts` — typed contract for the home section 05 figure data (seats, caption, subCaption, coreSubLabel, figAria).
- `allianceFigure` key in `content/es/home.ts`, `content/en/home.ts`, `content/ca/home.ts` — fully translatable (ES: DISPONIBLE, EN: AVAILABLE, CA: DISPONIBLE). Seats as a data array so a future active alliance is a data-only change.
- `'protagonist'` size to `AllianceConstellation` — 960×620 viewBox, R=200, nodeR=30, coreR1=46, coreR2=60. Matches `wireframe-p05-alianza-FINAL.html` exactly.
- Corner ticks (`<g aria-hidden="true">` with 4 `<path>`) inside the protagonist SVG.
- `coreSubLabel` optional prop to `AllianceConstellation` — renders "2 ALIANZAS ACTIVAS · 3 DISPONIBLES" inside the SVG (protagonist only).
- Traveling ambre pulse via SVG `<animate>` elements for occupied seats — staggered (0.6s between seats), looping, edge-to-edge (core ring → node edge). `prefers-reduced-motion` → `display:none` via CSS.
- `labelPosition()` helper — anchors labels by `cosA`/`sinA` thresholds (right=start, left=end, top/bottom=middle), offset outside node radius. No label overlaps its node.
- `.alliance-stage`, `.alliance-caption`, `.alliance-subcaption`, `.ac-core-sublabel` CSS classes.
- Protagonist overrides in CSS: `opacity: 1`, `transition: none`, `stroke-dasharray: none` (no draw-on-scroll for protagonist).
- `allianceFigure` prop to `AllianceTeaser` in `home-sections.tsx` — when provided renders protagonist constellation + caption + sub-caption; when absent falls back to legacy `SystemDiagram kind="outcome"` + legend (backward-compatible).
- `GridBackground` reused in `AllianceTeaser` (section has `position: relative`). No duplicate grid code.
- 15 new tests in `alliance-constellation.test.tsx` (protagonist size, viewBox, corner ticks, coreSubLabel, traveling pulses, aria-hidden).
- 5 new tests in `home-sections.test.tsx` (protagonist constellation, caption, seat names, no legacy legend when figure provided).

### Changed
- `AllianceConstellation` — `size` prop extended from `'compact' | 'large'` to `'compact' | 'large' | 'protagonist'`. `'compact'` and `'large'` behavior unchanged.
- `AllianceTeaser` — accepts optional `allianceFigure` prop; `GridBackground` added; section has `position: relative`.
- `app/[[...path]]/page.tsx` — passes `allianceFigure` to `AllianceTeaser` (same pattern as `heroFigure`, `proofFigure`).

### Not changed
- `/modelo-de-alianza` page — uses `size="large"`, unaffected. No regression.
- All other home sections (hero, problem, services, framework, proof, finalCTA) — byte-identical.
- All other pages — byte-identical.
- Design tokens — no new hex values; all styling via CSS custom properties.

### git diff --stat
```
app/[[...path]]/page.tsx                         |   1 +
app/globals.css                                  |  54 +++++
components/alliance-constellation.tsx            | 243 ++++++++++++++++++-----
components/home-sections.tsx                     |  37 +++-
content/ca/home.ts                               |  21 ++
content/en/home.ts                               |  21 ++
content/es/home.ts                               |  20 ++
content/types.ts                                 |  18 ++
tests/components/alliance-constellation.test.tsx | 112 ++++++++++-
tests/components/home-sections.test.tsx          |  65 +++++-
11 files changed, 538 insertions(+), 56 deletions(-)
```

### Test results
52 test files · 953 tests · 100% pass · build clean · TypeScript strict clean


## SPEC-POLISH-03 — Home section 04 "Evidencia" (real Magupell data) · August 2026

### Summary
Replaced generic rounded figures in the home ProofSection with real, Carlos-verified Magupell data. Redesigned FIG.04 as a real-dated ascending stair timeline. Fixed brand spelling "Magupell" (was "MAGUPELL") everywhere in user-facing copy.

### Changed files (git diff --stat)
- `app/[[...path]]/page.tsx` — passes `proofFigure` to `ProofSection`
- `app/globals.css` — redesigned `.readout` cells (flex, body captions, 2×3 grid), new FIG.04 styles, responsive to 360px
- `app/styleguide/page.tsx` — updated to new `proof.readouts` API
- `components/home-sections.tsx` — `ProofSection` now accepts `proofFigure`, renders 6 readouts in 2×3 grid, delegates FIG.04 to `ProofTimelineFig`
- `components/readout.tsx` — redesigned: `kind` (number/phrase), 6 `plotVariant` micro-plots (aria-hidden), body-font captions (~15px), no source suffix, no CountUp
- `components/proof-timeline-fig.tsx` — NEW: FIG.04 ascending stair, 5 real-dated milestones, labels anchored to treads, ambre production node, tokens only
- `components/system-diagram.tsx` — `label="Magupell"` in outcome diagram (brand spelling fix)
- `content/{es,en,ca}/alliance.ts` — `{ name: 'Magupell' }` seat (brand spelling fix)
- `content/{es,en,ca}/cases.ts` — "Magupell y BioZero" in meta description (brand spelling fix)
- `content/{es,en,ca}/home.ts` — `proof.readouts[6]` + `proofFigure` (timeline[5] + timelineCaption + timelineAria); removed `proof.source` and `proof.figures`
- `content/data/cases.ts` — `name: 'Magupell'`, `brand.name: 'Magupell'` (brand spelling fix)
- `specs/spec-polish-03-evidencia.md` — NEW: spec file
- `tests/components/alliance-constellation.test.tsx` — `'Magupell'` seat name
- `tests/components/client-chip.test.tsx` — `'Magupell'` name
- `tests/components/home-sections.test.tsx` — 6 readouts, real values, `'Magupell'` chip
- `tests/components/proof-timeline-fig.test.tsx` — NEW: 13 tests for ProofTimelineFig
- `tests/components/readout.test.tsx` — updated for new API (11 tests)
- `tests/content/cases-data.test.ts` — `'Magupell'` name
- `tests/content/content-integrity.test.ts` — 6 readouts guard, real values, `'Magupell'`
- `tests/content/i18n-coverage.test.ts` — exemption list: `number`, `phrase`, `growth`, `steps`, `stair`, `impact`, `roles`, `Magupell`

### Test results
- 52 test files · 938 tests · 100% pass · build clean · TypeScript strict clean
- No hardcoded hex in new components (grep = 0)


> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md) · [PLAN](../PLAN.md)

All notable changes, newest first.

---

## [Unreleased] — SPEC-POLISH-02: Home section 01 message + layout + FIG.02

Spec: `specs/spec-polish-02-punto-de-partida.md` · Wireframe: `specs/mockups/wireframe-p01-punto-partida-FINAL.html`

### Changed
- **Headline:** "Tu negocio funciona. Tus sistemas, no." → "Tu operativa llegó a su límite, no tus objetivos." (Libro Ch. 10/12 framing — problem of success, not failure).
- **Body:** single paragraph → two-paragraph tuple (ES/EN/CA); `problem.body` is now `readonly [string, string]`.
- **Layout:** left-column title + vertical symptom list → full-width headline band + horizontal symptoms strip (1px divider) + two balanced columns (body | diagram).
- **FIG.02:** pentagon web pointing to RETRABAJO → five named pieces (HOJAS DE CÁLCULO · CORREOS · NOTAS · CATÁLOGO · HISTORIAL) around fragile PROCESOS MANUALES core; discontinuous flows (solid + gap + dashed stub); ambre pulses stop at the break; core slow-scale pulse.

### Added
- `components/problem-flows-fig.tsx` — new `ProblemFlowsFig` component (mirrors `HeroNarrativeFig` pattern); `ProblemFlowsFigContent` interface exported.
- `content/{es,en,ca}/home.ts` — `problemFigure` block (pieces, core, caption, note); EN/CA recrafted (pending Carlos AC-9 review).
- `lib/motion-constants.ts` — `PROBLEM_PULSE_*` and `PROBLEM_CORE_*` constants.
- `tests/components/problem-flows-fig.test.tsx` — 14 tests covering aria, pieces, core, segments, stubs, pulse layer.
- `specs/spec-polish-02-punto-de-partida.md` — implementation spec in repo.

### Updated
- `components/system-diagram.tsx` — `kind="problem"` delegates to `ProblemFlowsFig` when `problemFigure` prop provided; legacy pentagon kept as fallback.
- `components/home-sections.tsx` — `ProblemSection` new layout; `problemFigure` prop added.
- `app/[[...path]]/page.tsx` — passes `problemFigure` to `ProblemSection`.
- `app/globals.css` — problem-* CSS blocks replaced with new layout (`.problem-cols`, `.problem-fig__*`, `.problem-pulse*`).
- `tests/components/home-sections.test.tsx` — body tests updated (two paragraphs); diagram test added.
- `tests/components/system-diagram.test.tsx` — problem branch tests updated (with/without `problemFigure`).
- `docs/escala-web-content-spec-v1.1.1.md` — §5.1 line 01 updated to new headline/layout.

### Tests
- 921 tests, 51 files — all passing. Coverage ≥70% maintained.

---

## [Unreleased] — Phase 6: GCP infrastructure & domain (SPEC-P6)

Spec: `specs/spec-p6-gcloud-infra.md` · Runbook: `docs/infra-runbook.md` · Decisions: `docs/infra-decisions.md`

### Added
- `Dockerfile` — Next.js standalone, multi-stage (deps → builder → runner), non-root user, PORT 8080 for Cloud Run (AC-1).
- `.dockerignore` — excludes node_modules, .next, .env*, tests, docs, .git from build context.
- `next.config.mjs` — `output: 'standalone'` added; `X-Robots-Tag: noindex, nofollow` header for dev env via `NEXT_PUBLIC_NOINDEX=true` (AC-2, D-09).
- `.github/workflows/deploy.yml` — CI/CD pipeline: lint + typecheck + test:coverage (≥70% gate, i18n guard, placeholder guard) → build image → push to Artifact Registry → auto-deploy dev → manual-approval prod deploy via GitHub Environment "production" (AC-2, AC-3, AC-4, AC-11).
- `docs/infra-runbook.md` — step-by-step interactive setup: gcloud account switch, project creation, billing, APIs, Artifact Registry + cleanup policy, deployer SA, WIF keyless auth, Secret Manager secrets, dev service deploy, CI/CD wiring, prod service, domain mapping, GoDaddy DNS record set (web + Workspace MX + merged SPF + DKIM×2 + DMARC), budget alert. Every Carlos-input point marked (AC-10).
- `docs/infra-decisions.md` — 12 architecture decisions with rationale: Cloud Run, europe-west1, GitHub Actions only, WIF keyless, Secret Manager, Artifact Registry, no VPC/LB, in-memory rate limit, IAM-gated dev, standalone output, Resend, CONTACT_TO Workspace (FR-7.4).
- `.env.example` — `NEXT_PUBLIC_NOINDEX` var documented.

### Architecture
- Region: europe-west1 (Belgium) — resolves `{{REGION_EU_GOOGLE_CLOUD}}` legal placeholder.
- Two Cloud Run services: `escala-web-dev` (min 0, max 2, IAM-gated, DRY_RUN) + `escala-web-prod` (min 0, max 4, domain-mapped).
- Keyless auth: Workload Identity Federation — no SA JSON keys in repo or GitHub secrets (AC-4).
- Secrets in Secret Manager: `EMAIL_API_KEY` (placeholder), `CONTACT_TO`, `CONTACT_FROM` (AC-5).
- No VPC, no load balancer, no managed DB, no Kubernetes (AC-6).
- Artifact Registry EU with cleanup policy (keep last 5 images) (AC-7).
- Domain mapping prepared for prod + managed TLS; DNS switch deferred to Phase 7 (AC-8).
- Budget alert €10/month (AC-10).

### Deferred (requires Carlos action)
- GCP project creation + billing link (runbook Step 0–1).
- Deployer SA + WIF pool/provider creation (runbook Step 4–5).
- Secret Manager secrets with real values (runbook Step 6).
- First manual deploy of dev + prod services (runbook Step 7–9).
- GitHub Actions variables + "production" environment protection rule (runbook Step 5, 8).
- Resend account + API key + domain verification (runbook Step 13).
- Google Workspace signup + MX records at GoDaddy (runbook Step 11).
- DNS switch to Cloud Run (Phase 7).

### Tests
- 883 tests, 49 files — all passing (no new tests added; infra is config/docs, not testable code).
- Coverage gate ≥70% enforced; build clean.

---

## [Unreleased] — Phase 4: Legal pages, 404, favicon & OG (SPEC-P4)

Spec: `specs/spec-p4-legal-analytics.md` · Wireframe: `specs/mockups/wireframe-p4-legal-final.html` (approved)

**LEGAL DISCLAIMER:** Legal copy drafted from MAGUPELL contract + LSSI-CE/RGPD. Not legal advice. A qualified advisor must review before go-live.

### Added
- `content/es/legal.ts` — full LSSI-CE aviso legal (5 sections: Titular, Objeto, Propiedad intelectual, Responsabilidad, Legislación). Unconfirmed data uses `{{PLACEHOLDER}}` tokens. No physical address. IP section states code/contents are Escala's (consistent with SPEC-FIX-01).
- `content/es/privacy.ts` — full RGPD privacy policy (6 sections: Responsable, Datos y finalidad, Base legal, Conservación, Destinatarios, Tus derechos). Explicit no-tracking-cookies statement. AEPD reference.
- `content/es/shared.ts` — `notFound` block added (code, h1, body, ctaLabel, diagramAria).
- `content/types.ts` — `LegalDictionary` + `PrivacyDictionary` full interfaces (replaced Phase 1 stubs). New: `LegalSection`, `LegalKvRow`, `NotFoundContent` types.
- `components/anchor-nav.tsx` — sticky side navigation for legal pages. IntersectionObserver active-section highlight (debounced to avoid thrash). Keyboard operable. `'use client'`.
- `components/legal-doc.tsx` — shared two-column layout (sticky 230px anchor + ≤70ch reading column). Renders `{{PLACEHOLDER}}` tokens with ambre highlight (dev warning, FR-4.2). Mobile: top índice list replaces sticky aside.
- `components/pages/legal.tsx` — /aviso-legal page compositor.
- `components/pages/privacy.tsx` — /privacidad page compositor.
- `app/not-found.tsx` — identity-branded 404: abisal + GridBackground + kit micro-diagram (dashed path INICIO → ambre "?" node) + «Fuera del sistema.» + home CTA. Reduced-motion static. noindex (Next.js auto).
- `app/icon.svg` — squares logomark favicon (draft — Carlos to approve before launch). Brand tokens: abisal bg, paper/ambre squares.
- `app/opengraph-image.tsx` — generic site-wide OG image (1200×630). Abisal background, grid motif, claim in Archivo, ambre accent. Edge runtime.
- `app/layout.tsx` — `metadataBase` added (resolves OG image URLs; falls back to localhost in dev).
- `lib/placeholders.ts` — `collectPlaceholders()` + `hasPlaceholder()` utilities for detecting unresolved `{{...}}` tokens.
- `tests/content/legal-content.test.ts` — 23 tests: 5/6 sections, required IDs, meta limits, no-cookies statement, AEPD reference, placeholder detection, address guard.
- `tests/components/legal-doc.test.tsx` — 9 tests: H1, eyebrow, sections, KV rows, placeholder highlight, mobile nav.
- `tests/components/anchor-nav.test.tsx` — 8 tests: aria-label, links, active state, click behavior.
- `tests/components/not-found.test.tsx` — 5 tests: error code, H1, body, CTA href, SVG aria-label.

### Changed
- `app/[[...path]]/page.tsx` — `LegalPage` + `PrivacyPage` imports; `BUILT_PAGES` + `generateStaticParams` + render branches for 'legal' + 'privacy' × 3 locales each.
- `app/sitemap.ts` — `{ page: 'legal' }` + `{ page: 'privacy' }` added (indexable per FR-6.3).
- `app/globals.css` — Phase 4 CSS blocks added: `.legal-doc` two-column layout, `.anchor-nav` sticky nav, `.legal-doc__placeholder` ambre highlight, `.not-found` identity-branded 404.
- `app/styleguide/page.tsx` — section 11 "LEGAL DOC — FASE 4" added: AnchorNav demo + LegalDoc (/aviso-legal) + LegalDoc (/privacidad).
- `docs/REQUIREMENTS_TRACEABILITY.md` — R-4.1, R-4.6, R-5.4–R-5.9, R-8.2, R-8.4, R-8.7 updated to ✅/🚫.

### Decisions
- **No analytics** (Carlos's choice) → no third-party cookies → no cookie banner. ANALYTICS-01 dropped.
- **No physical address** (Carlos's choice). LSSI-CE satisfied with company name + NIF + email.
- **Favicon artwork is a draft** — Carlos to review and replace with final approved logomark before launch.
- **Placeholders not publishable** — `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` must be resolved before go-live.

---

## [Unreleased] — Phase 2.6 + 2.7: /contacto + contact backend + link audit (SPEC-P2.6)

Spec: `specs/spec-p2.6-contacto-y-link-audit.md` · Wireframe: `specs/mockups/wireframe-p2.6-contacto-final.html` (approved)

**Phase 2 COMPLETE — all interior pages shipped. Phase 3 backend folded into 2.6.**

### Added
- `components/contact-success.tsx` — **new reusable confirmation card**. Props: `variant` (section/dossier), `dossierRef`, `onResend`. Renders ambre SVG check-circle, "Mensaje enviado." H2, body copy, "ENVIAR OTRO MENSAJE ↺" resend action. Used by both FinalCTA (section) and /contacto (dossier).
- `components/pages/contact.tsx` — /contacto page compositor. Full-viewport two-column immersive layout: LEFT (editorial invitation + affinity filter × 3 + mono directMeta block) · RIGHT (ContactForm dossier variant). No GridBackground (plain abisal + radial gradient). No FinalCTA (page IS the CTA).
- `app/api/contact/route.ts` — POST handler. Node.js runtime. Per-IP in-memory rate limit (5/min, configurable). Honeypot silent-200. Server-side validation (fields, email, ≥20-char message, consent, honeypot). Dispatches via `lib/email.ts`.
- `lib/email.ts` — provider abstraction. `sendContactNotification(payload)` via Resend (native fetch, no npm dep). DRY_RUN mode when no API key. reply-to = visitor email (Carlos replies directly). Phase 6: domain flip = env change only.
- `.env.example` — documents all 7 contact env vars (EMAIL_PROVIDER, EMAIL_API_KEY, CONTACT_TO, CONTACT_FROM, CONTACT_SUBJECT_PREFIX, RATE_LIMIT_PER_MIN, EMAIL_DRY_RUN).
- `content/es/contact.ts` — full contact dictionary (pageHeader, affinityFilter × 3, directMeta, dossierHeader, trustLine).
- `content/types.ts` — `ContactDictionary` full interface (replaced Phase 1 stub).
- `docs/link-audit.md` — full link audit report: every nav/footer/section/CTA link × 3 locales × status.
- `tests/components/contact-form.test.tsx` — 18 tests (updated for API fetch, loading, success, error, resend, honeypot, dossier variant).
- `tests/components/contact-success.test.tsx` — 9 new tests (section/dossier variants, resend callback, SVG aria-hidden).
- `tests/content/contact-content.test.ts` — 16 new tests (meta lengths, affinity 3 items, Gmail leak guard, public email location).

### Changed
- `components/contact-form.tsx` — **upgraded** (not replaced). New: `variant` prop (section/dossier), `dossierTitle`/`dossierRef` props, hidden honeypot field, `fetch` → `/api/contact`, loading/success/apiError state machine, `ContactSuccess` on success, API error message on failure (form populated). Removed: `success` prop (copy now in `sharedContent`). `initialState` still works for testing/styleguide.
- `content/es/shared.ts` — `contactForm` extended with new keys: `sendLabel`, `sending`, `successHeader`, `successRef`, `successH2`, `successBody`, `successResend`, `errorApiPrefix`, `errorApiSuffix`.
- `components/final-cta.tsx` — removed `success` prop from `<ContactForm>` call (copy now in sharedContent). No behavior change.
- `components/site-chrome.tsx` — «Hablemos» CTA changed from `ANCHORS.CONTACTO` (#contacto) to `ROUTES.CONTACT` (/contacto). **Link audit fix.**
- `components/pages/services.tsx` — `IdealClientNote` `ctaHref` changed from `"#contacto"` to `ROUTES.CONTACT`. **Link audit fix.**
- `app/[[...path]]/page.tsx` — `ContactPage` import, `BUILT_PAGES` + `generateStaticParams` + render branch added for 'contact' × 3 locales.
- `app/sitemap.ts` — `{ page: 'contact' }` added.
- `app/globals.css` — Phase 2.6 CSS block added: `.contact-page` two-column immersive layout, `.contact-form--dossier` header, `.contact-form__dossier-head/title/ref`, `.contact-success` variants (section/dossier), `.contact-api-error`, `.contact-hp`, `button[disabled]`.
- `app/styleguide/page.tsx` — section 04 updated: removed `success` prop, added dossier confirmation demo.
- `tests/content/ownership-guard.test.ts` — Gmail leak guard added (SPEC-P2.6 AC-5).

---

## [Unreleased] — Phase 2.5: /sobre-escala (SPEC-P2.5)

Spec: `specs/spec-p2.5-sobre-escala.md` · Wireframe: `specs/mockups/wireframe-p2.5-sobre-escala.html` (approved)

### Added
- `components/grid-background.tsx` — **new cross-cutting primitive**. Reusable abisal engineering-grid overlay (absolutely positioned, `pointer-events:none`). Props: `cellSize` (default `3rem`), `lineOpacity` (default `0.05`), `radialGradient` (default `true`). Documented in `/styleguide` section 10. Existing abisal sections left as-is with `// TODO: migrate` (FR-6.3 option; see DECISIONS.md).
- `components/ceremonial-header.tsx` — oversized H1 (`clamp(3rem,7vw,6rem)`, Archivo 600), mono kicker, generous padding. Deliberately NOT `PageHeader` — this page is a brand/identity document.
- `components/dna-block.tsx` — 2-col mission/vision (Libro Ch. 1) + ambre-bordered pull-quote ("¿dentro de diez años?").
- `components/values-list.tsx` — five numbered editorial rows (3-col grid, 1px top rules).
- `components/expertise-grid.tsx` — 3×2 abisal grid + 6 inline micro-fig SVG variants (`fullstack/hub/bars/nodes/signal/insertion`) + tone-shift divider. Uses `GridBackground`. Anonymized per Libro Ch. 19.
- `components/manifesto.tsx` — 10 strata plates (ghost number / belief / meta); ambre left bar reveals `scaleY 0→1` on scroll entry via `IntersectionObserver`, staggered 60ms/plate. Reduced-motion: bars full static. Uses `GridBackground`.
- `components/pages/about.tsx` — page compositor (A→E + FinalCTA).
- `content/types.ts` — `AboutDictionary` full interface (replaces stub) + `ExpertiseFigVariant` type.
- `content/es/about.ts` — full ES content (Libro Ch. 1/3/4); anonymized (Ch. 19: no employer names); MIT cert allowed; no code-ownership wording; 10 beliefs verbatim from Ch. 3.
- `tests/components/grid-background.test.tsx` — 7 tests
- `tests/components/ceremonial-header.test.tsx` — 6 tests
- `tests/components/values-list.test.tsx` — 6 tests
- `tests/components/expertise-grid.test.tsx` — 10 tests (includes anonymization guard)
- `tests/components/manifesto.test.tsx` — 12 tests (colivares plain-text guard, stagger delay, IO reveal)
- `tests/content/about-content.test.ts` — 32 tests (values=5, areas=6, beliefs=10, figVariants, meta limits, ownership guard, Russian guard, nav routing)
- `/styleguide` section 10: GridBackground options demo + CeremonialHeader + ValuesList + ExpertiseGrid + Manifesto

### Changed
- `content/es/shared.ts` — nav "Sobre Escala" href: `/#inicio` → `/sobre-escala` (AC-10)
- `app/[[...path]]/page.tsx` — `generateStaticParams` +3 entries; `BUILT_PAGES` adds `'about'`; `page === 'about'` render branch
- `app/sitemap.ts` — `{ page: 'about' }` added
- `app/globals.css` — Phase 2.5 BEM block (`.grid-bg`, `.grid-bg--radial`, `.ceremonial-header`, `.dna-block`, `.values-list`, `.expertise-section`, `.expertise-grid`, `.manifesto` + responsive + reduced-motion)
- `app/styleguide/page.tsx` — section 10 added; new component imports
- `DECISIONS.md` — Phase 2.5 section (grid opacity 0.05, TODO-not-migrate, IO test behavior)
- `PLAN.md` — Phase 2.5 marked ☑
- Memory Bank (`activeContext.md`, `progress.md`) updated

**Result:** 596 tests (42 files) · TS strict clean · build clean · all SPEC-P2.5 ACs met.

---

## [Unreleased] — SPEC-FIX-01: IP / ownership correction

Spec: `specs/spec-fix-ownership-ip.md` · Sources of truth promoted to Libro v2.2 + Spec v1.1.1.

### Changed
- `docs/el-libro-de-escala-v2.2.md` — added (replaces v2.1; corrects IP ownership model per MAGUPELL contract)
- `docs/escala-web-content-spec-v1.1.1.md` — added (replaces v1.1; corrects ownership wording in §2, §5.2, §5.4)
- `docs/el-libro-de-escala-v2.1.md` — **deleted** (superseded by v2.2)
- `docs/escala-web-content-spec-v1.1.md` — **deleted** (superseded by v1.1.1)
- `content/es/services.ts` service[1] deliverable — old: "Tú eres propietario de tu plataforma, tu código y tus datos." → new §3.1 canonical wording: "…obtienes una licencia de uso indefinida sobre tu plataforma y la propiedad de tus datos. La propiedad intelectual y el código son de Escala." (SPEC-FIX-01 §3.1 / Libro v2.2 Ch. 13)
- `PLAN.md` — source-of-truth references → v2.2 / v1.1.1
- `memory-bank/projectbrief.md` — source-of-truth references → v2.2 / v1.1.1

### Added
- `tests/content/ownership-guard.test.ts` — 5 tests; scans `content/`, `components/`, `app/` for 4 forbidden ownership patterns; fails on any match; AC-5 verified (deliberately inserted bad phrase → 2 failures → removed → clean)
- `.clinerules/project-ownership-rule.md` — standing rule: client gets use licence + data ownership; code and IP are Escala's; forbidden phrases; canonical wording reference; survives standards build because it's project-local
- `specs/spec-fix-ownership-ip.md` — spec filed in repo

**Result:** 523 tests (36 files) · TS strict clean · grep FR-4 patterns = 0 matches across codebase.

---

## [Unreleased] — Phase 2.4: /modelo-de-alianza

Spec: `specs/spec-p2.4-modelo-de-alianza.md` (SPEC-P2.4 v1.0) · Wireframe: `specs/mockups/wireframe-p2.4-modelo-de-alianza-final.html` · Ownership §0: alliance page uses corrected framing; Libro/services.ts patch pending (DECISIONS.md).

### Added
- `content/types.ts` — `AllianceDictionary` interface (pageHeader, whyFive, seats[5], planes{3}, commitments{5}, finalCta) + `AllianceSeat`, `AlliancePlane`, `AllianceCommitment` types
- `content/es/alliance.ts` — full ES dictionary (all sections verbatim from Libro Ch. 11–13); commitment 01 = "A MEDIDA" corrected framing (§0 FR-6); no code-ownership wording
- `components/alliance-constellation.tsx` — parameterized SVG constellation; `size: 'compact' | 'large'`; regular pentagon geometry (−90°, every 72°); draw-on-scroll animations via `[data-visible="true"]` + `--ac-delay` CSS custom property stagger; occupied = solid + ambre pulse; free = dashed + reduced opacity; `prefers-reduced-motion` static fallback
- `components/alliance-planes.tsx` — three-column grid (abisal); middle column ambre highlight; "PLANO · 0X" labels, Archivo H3, body, depth mono line; mobile stack
- `components/commitments-band.tsx` — 5-cell horizontal band (paper); mono number (mar), mono tag (ambre-dk, AA), body, ambre tick; mobile stack
- `components/pages/alliance.tsx` — page compositor: PageHeader → WhyFive+Constellation → AlliancePlanes → CommitmentsBand → FinalCTA
- `app/[[...path]]/page.tsx` — +3 `generateStaticParams` entries; `alliance` added to `BUILT_PAGES`; render branch for `AlliancePage`
- `app/sitemap.ts` — alliance × 3 locales added
- `content/es/shared.ts` — header nav + footer nav "Modelo de alianza" updated to `/modelo-de-alianza` (was `/#alianza`)
- `app/globals.css` — Phase 2.4 BEM: `.alliance-constellation` (all ac-* classes), `.alliance-why`, `.alliance-planes`, `.commitments-band`; draw-on-scroll with `[data-visible="true"]`; `prefers-reduced-motion` overrides; responsive ≤767px
- `app/styleguide/page.tsx` — section 09: AllianceConstellation (compact + large instances), AlliancePlanes, CommitmentsBand
- `DECISIONS.md` — constellation extraction rationale, FinalCTA typing fix, ownership wording pending status
- Tests: `tests/components/alliance-constellation.test.tsx` (15); `tests/components/alliance-planes.test.tsx` (10); `tests/components/commitments-band.test.tsx` (11); `tests/content/content-integrity.test.ts` extended with 26 alliance integrity tests. **Total: 518 tests, 35 files, all passing.**

### Changed
- `components/final-cta.tsx` — prop type widened from `typeof homeContent.finalCta` to structural `FinalCtaContent` interface (no behavior change; enables any page to pass its own finalCta copy without literal-type collision)
- `content/types.ts` — `AllianceDictionary` stub replaced with full Phase 2.4 interface

---

## [Unreleased] — Phase 2.3: /casos-de-exito + /magupell + /biozero

Spec: `specs/spec-p2.3-casos-de-exito.md` (SPEC-P2.3 v1.0) · Wireframe: `specs/mockups/wireframe-p2.3-casos-de-exito.html` · Logo permission: pending (Phase 7 checklist)

### Added
- `content/data/cases.ts` — full `CaseStudy` model (mode, brand with `StaticImageData` logos, readouts, capabilities, dossier fields, per-case meta); `getCase(slug)` helper; real logo imports from `app/assets/brand/*.png` via `next/image` static import (DECISIONS.md rationale)
- `content/types.ts` — `CasesDictionary` interface extended with pageHeader, card labels, visitLabel, capabilitiesLabel, nextLabel, backLabel
- `content/es/cases.ts` — full ES dictionary (pageHeader "A / CASOS DE ÉXITO", card UI labels, nav labels)
- `components/readout-strip.tsx` — adaptive-column grid (--readout-cols CSS var); 2-col for BioZero, 4-col for MAGUPELL
- `components/dossier-field.tsx` — two-column field row (big ordinal number + ambre-dk key / body text); 1px top rules
- `components/capability-grid.tsx` — 3-up capability grid; renders null for empty array (MAGUPELL guard); editorial guardrail: capability-framed language only
- `components/brand-header.tsx` — client logo (next/image) + sector eyebrow + H1 title + engineering plate + visit link (new tab, noopener noreferrer); dashed placeholder box when logo is null
- `components/case-card.tsx` — index-page card (EXPEDIENTE eyebrow, logo, name, subtitle, "ABRIR EXPEDIENTE ↗" → getPath)
- `components/case-dossier.tsx` — single mode-aware template (data-forward: ReadoutStrip×4 + 5 fields; capability-forward: ReadoutStrip×2 + CapabilityGrid + 3 fields); next/back nav; FinalCTA reused
- `components/pages/cases.tsx` — index compositor: PageHeader → CaseCard grid + FinalCTA; sorted by `order`; data-driven (AC-4)
- `app/globals.css` — Phase 2.3 BEM: `.cases-index-grid`, `.case-index-card`, `.dossier-page`, `.brand-header`, `.readout-strip`, `.capability-grid`, `.capability-card`, `.dossier-field`, `.dossier-nextcase`; responsive ≤767px + ≤479px
- `app/styleguide/page.tsx` — section 08: CaseCard grid, BrandHeader (real + placeholder), ReadoutStrip (4-col + 2-col), CapabilityGrid, DossierField samples
- `DECISIONS.md` — logo asset location rationale (app/assets/brand/ vs public/brand/)
- Tests: `tests/content/cases-data.test.ts` (data integrity, mode invariants, meta limits, getCase, AC-10 guardrail, AC-4 extensibility — 30 tests); `tests/components/brand-header.test.tsx` (11); `tests/components/case-card.test.tsx` (11); `tests/components/readout-strip.test.tsx` (7); `tests/components/dossier-field.test.tsx` (7); `tests/components/capability-grid.test.tsx` (7); `tests/components/case-dossier.test.tsx` (21). Total: **450 tests, all passing**.

### Changed
- `content/data/cases.ts` — extended from Phase 1 stub to full dossier model (backward-compat: `clients.ts` adapter unchanged)
- `app/[[...path]]/page.tsx` — `generateStaticParams` +9 entries (cases × 3 + 2 details × 3); renderer for `cases` + `caseDetail`; per-case `generateMetadata` uses `CaseStudy.meta`
- `app/sitemap.ts` — `cases`, `caseDetail/magupell`, `caseDetail/biozero` added to `BUILT_PAGES`
- `content/es/shared.ts` — header nav "Casos de éxito" → true route `/casos-de-exito`; footer nav updated
- `PLAN.md` — Phase 2.3 marked ☑

---

## [Unreleased] — Phase 2.2: /que-hacemos

Spec: `specs/spec-p2.2-que-hacemos.md` (SPEC-P2.2 v1.1) · Wireframe: `specs/mockups/wireframe-p2.2-que-hacemos-final.html`

### Added
- `content/types.ts` — `ServicesDictionary` interface + `ServiceFigVariant` type (Phase 2.2: pageHeader, services×5, idealClient, finalCta)
- `content/es/services.ts` — full ES dictionary; verbatim from Libro v2.1 Ch. 11 (services) and Ch. 12 (ideal client); spec v1.1 §5.2 lead
- `components/service-fig.tsx` — ONE parameterized SVG component with five isolated variant renderers (`capture`, `platform`, `ai`, `product`, `evolve`); FIG.07–11 DRAFT VISUAL; IntersectionObserver pulse-on-entry; reduced-motion static; sr-only caption; per-variant isolation enforced (AC-5)
- `components/service-row.tsx` — three-column grid (64px index · 1fr text · 320px fig); `--ambre-dk` problem line; 1px ink-18% borders; mobile fig stacks below text
- `components/ideal-client-note.tsx` — B / ¿Encajamos? section (abisal); Libro Ch. 12 verbatim; CTA → `#contacto` interim (BACKLOG: switch to `/contacto` when Phase 3 ships)
- `components/pages/services.tsx` — page compositor: A·PageHeader → 5×ServiceRow → B·IdealClientNote → FinalCTA; staggered Reveal per row
- `app/globals.css` — `--ambre-dk: #b85c00` token (AA on paper, registered in DECISIONS.md); BEM for `.service-row`, `.service-fig`, `.ideal-client`, `.service-rows`; reduced-motion overrides; mobile responsive ≤767px/≤639px
- `DECISIONS.md` — `--ambre-dk` rationale (AA-safe dark amber on paper; pure `--ambre` does not pass AA on paper)
- Tests: `tests/components/service-fig.test.tsx` (32 tests), `tests/components/service-row.test.tsx` (14 tests), `tests/components/ideal-client-note.test.tsx` (10 tests); `servicesContent` describe in `content-integrity.test.ts` (15 tests). Total: 366 tests, all passing.

### Changed
- `app/[[...path]]/page.tsx` — `generateStaticParams` + renderer updated for `services` × 3 locales (`/que-hacemos`, `/en/what-we-do`, `/ca/que-fem`)
- `app/sitemap.ts` — `{ page: 'services' }` added to `BUILT_PAGES`
- `content/es/shared.ts` — header nav "Qué hacemos" → true route `/que-hacemos`; footer nav "Qué hacemos" → true route
- `app/styleguide/page.tsx` — section 07 added: all five ServiceFig variants grid + ServiceRow sample + IdealClientNote
- `specs/spec-p2.2-que-hacemos.md` — implementation spec filed in repo

---

## [Unreleased] — Phase 2.1: /como-trabajamos

Spec: `specs/spec-p2.1-como-trabajamos.md` (SPEC-P2.1 v1.0) · Wireframe: `specs/mockups/wireframe-p2.1-como-trabajamos.html`

### Added
- `content/types.ts` — `MethodDictionary` interface (full Phase 2.1: pageHeader, phaseCycle, executionPractices, pipeline, aiBuild, finalCta)
- `content/es/method.ts` — full ES dictionary; verbatim from Libro v2.1 Ch. 7 (AiBuild), Ch. 8 (phases shared from home), Ch. 9 (5 practices); spec v1.1 §5.3 lead
- `components/execution-practices.tsx` — 5 sticky panels, CSS-only stacking (no JS scroll-jacking), mobile/reduced-motion plain stack
- `components/execution-pipeline-fig.tsx` — FIG.06 isolated/swappable component (PROVISIONAL VISUAL); ambre pulse; IntersectionObserver fade-in; reduced-motion static; full sr-only accessible text
- `components/ai-build-block.tsx` — sober abisal block; Libro Ch. 7/9 claims only; 3–4 mono points; small inline diagram; editorial guardrail enforced
- `components/pages/method.tsx` — page compositor: A·PageHeader → B·PhaseCycle → C·ExecutionPractices → D·FIG.06 → E·AiBuildBlock → FinalCTA
- `app/globals.css` — BEM styles for Phase 2.1 components + reduced-motion overrides; `.sr-only` utility; active nav state
- Tests: `tests/components/execution-practices.test.tsx` (8 tests), `tests/components/execution-pipeline-fig.test.tsx` (7 tests), `tests/components/ai-build-block.test.tsx` (8 tests); `methodContent` describe in `content-integrity.test.ts` (11 tests)

### Changed
- `components/phase-cycle.tsx` — `action` now optional (omit to suppress self-link on method page); `sectionIndex` now a prop (default `"03"`); both header and static fallback use prop (FR-3.3)
- `app/[[...path]]/page.tsx` — `generateStaticParams` + renderer updated for `method` × 3 locales; `SiteHeader` receives correct `currentPage`
- `app/sitemap.ts` — `{ page: 'method' }` added to `BUILT_PAGES`
- `content/es/shared.ts` — header nav "Cómo trabajamos" → true route `/como-trabajamos`; all nav items get `pageId` for active-state detection; footer nav updated to match
- `components/site-chrome.tsx` — active nav state via `aria-current="page"` on items matching `currentPage`; brand link route-aware (home anchor on home, `/` on interior pages)
- `app/styleguide/page.tsx` — section 06 added: ExecutionPractices, ExecutionPipelineFig, AiBuildBlock
- `docs/adding-a-page.md` — interior A/B/C letter index convention documented

### Tests
- 291 tests, 21 files — all passing. Coverage well above 70% gate.

---

## [Unreleased] — Phase 1: i18n architecture + interior page system

Spec: `specs/spec-phase1-i18n-architecture.md` (SPEC-P1 v1.0)

### Added
- `lib/i18n/types.ts` — `Locale`, `LOCALES`, `DEFAULT_LOCALE`, `PageId`, `CaseSlug`, `CASE_SLUGS`, `PageParams`, `RouteResolution` types
- `lib/i18n/routes.ts` — route map (all 10 pages × 3 locales per spec §4.1); `getPath`, `resolvePath`, `getAlternates` helpers; reverse lookup built at module load for O(1) resolution
- `lib/i18n/dictionary.ts` — `getDictionary(locale)` typed bundle accessor; Phase 1 returns ES for all locales
- `lib/config.ts` — `SITE_URL` env-aware constant
- `content/types.ts` — `PageMeta`, `HomePageDictionary`, `ServicesDictionary`, ... interfaces for all pages
- `content/data/cases.ts` — locale-aware case-study data (moved from `content/es/clients.ts`); per-locale copy fields ready for Phase 5
- `content/es/{services,method,cases,alliance,about,contact,legal,privacy}.ts` — Phase 1 stubs; meta populated; `satisfies` interface check
- `content/en/*` and `content/ca/*` — full per-page re-exports of ES content; `TODO(P5): translate` markers; barrel `index.ts`
- `app/[[...path]]/page.tsx` — single catch-all route; `resolvePath` for resolution; `notFound()` on unknown paths; `dynamicParams = false`; `generateStaticParams` (home × 3 locales in Phase 1); `generateMetadata` with canonical, hreflang × 3 + x-default, OG
- `app/sitemap.ts` — built pages × locales with `alternates.languages`; commented-out Phase 2 entries
- `app/robots.ts` — allow `/`; disallow `/styleguide`; references sitemap
- `components/locale-switcher.tsx` — page-preserving locale links; `aria-current`; IBM Plex Mono; `--ambre` active; 50% opacity inactive; keyboard operable; hides on small screens
- `components/page-header.tsx` — interior page header; `eyebrow`, `title`, `lead?`, `surface: 'paper' | 'abisal'`; BEM CSS; asymmetric 12-col grid
- `specs/spec-phase1-i18n-architecture.md` — spec in repo
- `docs/adding-a-page.md` — AC-9 guide: adding a page = interface + ES dict + route entry + component
- Tests: `tests/lib/i18n/routes.test.ts` (61 tests: inverse property, null cases, alternates), `tests/lib/i18n/meta.test.ts` (42 tests: length limits, AC-6 ruso guard), `tests/lib/i18n/dictionary.test.ts`, `tests/components/page-header.test.tsx`

### Changed
- `app/page.tsx` → **deleted**; home migrated into `app/[[...path]]/page.tsx` (pixel parity preserved)
- `app/layout.tsx` — per-page metadata removed (now in catch-all); fallback `title.template` added; `lang="es"` with Phase 6 note
- `components/site-chrome.tsx` — `SiteHeader` accepts `currentPage`, `locale`, `pageParams` props; locale display replaced by `<LocaleSwitcher>`
- `content/es/home.ts` — `meta` field added; `satisfies HomePageDictionary`
- `content/es/clients.ts` — **backward-compat adapter** re-exporting from `content/data/cases.ts`; data source moved
- `app/globals.css` — `PageHeader` BEM styles added; `LocaleSwitcher` styles (`.locale-switcher`, `.locale-switcher__link`); responsive hide rule updated from `.site-header__actions p` to `.locale-switcher`
- `app/styleguide/page.tsx` — section 05 "Plantilla de página" added: `PageHeader` both surfaces + interior section + `FinalCTA` (AC-8)
- `vitest.config.ts` — `content/types.ts` excluded from coverage (type-only file)

### Coverage (post Phase 1)
| Metric | After | Threshold |
|--------|-------|-----------|
| Statements | ~93% | 70% ✅ |
| Branches | ~83% | 70% ✅ |
| Functions | ~96% | 70% ✅ |
| Lines | ~97% | 70% ✅ |
Total tests: 252 (all passing).

---

## [Unreleased] — Phase 0: Documentation sync

### Added
- `docs/el-libro-de-escala-v2.1.md` — El Libro de Escala v2.1 (supersedes `escala-book-base-de-conocimiento.md`)
- `docs/escala-web-content-spec-v1.1.md` — Website Content & Design Spec v1.1 (supersedes `escala-web-content-spec.md`)
- `PLAN.md` at repo root — full 7-phase development tracking guide; Phase 0 marked done
- `memory-bank/` — all six core files updated to reflect as-built identity ("Sistemas en movimiento"), spec v1.1, and PLAN phases

### Changed
- `content/es/home.ts` `finalCta.languages`: removed "y ruso" — working languages are Spanish, English and Catalan only (spec v1.1 decision)
- `docs/BACKLOG.md` — reordered per PLAN phases (Phase 1 i18n → Phase 2 pages → Phase 3 contact → Phase 4 legal → Phase 5 EN/CA → Phase 6 GCP); cross-link to PLAN added
- `docs/ARCHITECTURE.md` — identity name corrected to "Sistemas en movimiento" (was "instrumento de medida", retired in spec v1.1)
- `memory-bank/productContext.md` — design principle updated to as-built "Sistemas en movimiento"; 7-section home structure documented

### Removed
- `escala-book-base-de-conocimiento.md` (root) — superseded by `docs/el-libro-de-escala-v2.1.md`
- `escala-web-content-spec.md` (root) — superseded by `docs/escala-web-content-spec-v1.1.md`

---

## [Unreleased] — Compliance pass (second session)

### Added
- `@vitest/coverage-v8` — coverage provider; `npm run test:coverage` now enforces the 70% gate for real
- Tests for all previously untested components: `PhaseCycle`, `SystemDiagram`, `SiteHeader`/`SiteFooter`, `FinalCTA`, and all home sections (Hero, ProblemSection, ServicesPreview, FrameworkSection, ProofSection, AllianceTeaser)
- `window.scrollTo` mock in `phase-cycle.test.tsx`
- 138 total tests (was 71), all passing

### Changed
- `package.json` scripts: `test*` commands now prefix `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` to suppress the harmless Vite ESM warning
- `vitest.config.ts`: coverage `exclude` extended to omit locale stubs (`content/ca/**`, `content/en/**`) and unused `lib/utils.ts`
- `components/contact-form.tsx`: `href="/privacidad"` → `ROUTES.PRIVACY` (last inline route string)
- `components/home-sections.tsx`: `href="#contacto"` → `ANCHORS.CONTACTO`, `href="#metodo"` → `ANCHORS.METODO`; imports `ANCHORS` from `lib/routes.ts`
- `components/site-chrome.tsx`: `href="#inicio"` → `ANCHORS.INICIO`, `href="#contacto"` → `ANCHORS.CONTACTO`
- `TODO.md`: replaced with pointer to `docs/BACKLOG.md`

### Coverage (post this session)
| Metric | Before | After | Threshold |
|--------|--------|-------|-----------|
| Statements | 49% | 94% | 70% ✅ |
| Branches | 45% | 84% | 70% ✅ |
| Functions | 41% | 98% | 70% ✅ |
| Lines | 50% | 98% | 70% ✅ |

---

## [Unreleased] — Refactor + test baseline

### Added
- `lib/routes.ts` — canonical route and anchor constants (`ROUTES`, `ANCHORS`); all internal links now use these
- `lib/motion-constants.ts` — named constants for all animation timings, thresholds, and media queries
- `components/phase-cycle.tsx` — renamed and refactored from `phase-journey.tsx`; all hardcoded strings removed; imports `ROUTES.METHOD` and motion constants
- `tests/` — Vitest + React Testing Library setup with 70% coverage threshold enforced via `coverageThreshold`
  - `tests/setup.ts` — global mocks: `IntersectionObserver` (constructor class), `matchMedia`, `requestAnimationFrame`, `lenis`
  - 71 tests across 9 test files; 100% pass rate
- `docs/ARCHITECTURE.md`, `docs/BACKLOG.md`, `docs/CHANGELOG.md`, `docs/REQUIREMENTS_TRACEABILITY.md`
- `memory-bank/` — six core Memory Bank files

### Changed
- `app/globals.css` — fully expanded from minified to ~600 lines; organized by section with comments; dead `.phase-journey__*` CSS removed; `#fff` → `white` with comment; `#082238` → `--abisal-gradient-end` design token; `.phase-cycle__static` layout defined once in base (no duplication across breakpoints)
- `app/page.tsx` — formatted; uses `sharedContent.accessibility.skipToContent` (was hardcoded "Saltar al contenido")
- `app/layout.tsx` — themeColor comment added; single quotes
- `content/es/home.ts` — added `labels.phasePrefix`, `proof.source`; expanded to readable multi-line format
- `components/home-sections.tsx` — reformatted; imports `PhaseCycle` (was `phase-journey`); passes all new props to `PhaseCycle`; `Readout` now receives `source` prop; links use `ROUTES.*`
- `components/contact-form.tsx` — reformatted; logic unchanged
- `components/motion-runtime.tsx` — reformatted; all magic numbers replaced with named constants from `lib/motion-constants.ts`
- `components/readout.tsx` — `source` prop added (replaces hardcoded "MAGUPELL"); SVG paths extracted to named constants
- `components/site-chrome.tsx` — reformatted; destructures `accessibility` from `sharedContent`
- `components/claims-marquee.tsx`, `client-chip.tsx`, `section-index.tsx`, `final-cta.tsx` — reformatted
- `components/system-diagram.tsx` — reformatted; added comment explaining why SVG node labels remain inline
- `app/styleguide/page.tsx` — reformatted; passes `source` to `Readout`
- `package.json` — added `test`, `test:watch`, `test:coverage` scripts; dev deps: Vitest, RTL, jsdom, @vitejs/plugin-react
- `tsconfig.json` — added `"types": ["vitest/globals"]`

### Removed
- `components/stair-figure.tsx` — dead code (unused thin wrapper over `SystemDiagram`)
- `components/section.tsx` — dead code (unused generic section component)
- `components/phase-journey.tsx` — replaced by `phase-cycle.tsx`
- All `.phase-journey__*` CSS from `globals.css` — was dead code after component rename

---

## [0.1.0] — Home v1 (approved)

Initial approved Spanish home page with:
- Hero, Problem, Services, Framework (PhaseCycle), Proof, Alliance, FinalCTA sections
- Design system: paper/ink/mar/abisal/ambre tokens, Archivo/Instrument Sans/IBM Plex Mono
- SystemDiagram SVGs (hero, problem, proof, alliance)
- Scroll-driven animations (Lenis + IntersectionObserver); `prefers-reduced-motion` respected
- ContactForm (client-side validation only; no API in v1)
- Styleguide at `/styleguide` (noindex)
- Content in `content/es/` (ES master, EN/CA stubs)
- Security headers in `next.config.mjs`
