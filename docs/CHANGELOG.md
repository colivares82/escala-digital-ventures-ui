# Changelog

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md) · [PLAN](../PLAN.md)

All notable changes, newest first.

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
