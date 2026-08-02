# Changelog

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md)

All notable changes, newest first.

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
