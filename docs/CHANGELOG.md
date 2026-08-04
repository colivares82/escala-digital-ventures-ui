# Changelog

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md) · [PLAN](../PLAN.md)

All notable changes, newest first.

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
