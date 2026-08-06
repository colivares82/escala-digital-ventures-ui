# Active Context

_Last updated: August 2026 (Phase 2.5 complete — SPEC-P2.5 /sobre-escala)_

## Current state

**Phase 2.5 complete.** `/sobre-escala` page built and passing. 596 tests, all green. Build clean, TypeScript strict clean. 7 new components + 1 cross-cutting primitive (`GridBackground`). All SPEC-P2.5 acceptance criteria met. Spec filed at `specs/spec-p2.5-sobre-escala.md`.

## What was just done (Phase 2.5 — SPEC-P2.5)

1. **Spec filed:**
   - `specs/spec-p2.5-sobre-escala.md` — implementation spec + approved wireframe at `specs/mockups/wireframe-p2.5-sobre-escala.html`.

2. **Type contracts:**
   - `content/types.ts` — `AboutDictionary` full interface (was stub); + `ExpertiseFigVariant` type (6 variants)

3. **Content layer:**
   - `content/es/about.ts` — full ES copy (Libro Ch. 1/3/4, anonymized per Ch. 19); MIT cert named; no code-ownership wording
   - `content/es/shared.ts` — nav "Sobre Escala" → `/sobre-escala` true route (was `/#inicio`)

4. **New components (7 + 1 primitive):**
   - `components/grid-background.tsx` — reusable abisal engineering-grid overlay; cross-cutting primitive for all dark sections. Props: `cellSize`, `lineOpacity`, `radialGradient`. Documented in `/styleguide` section 10.
   - `components/ceremonial-header.tsx` — oversized H1 (clamp 3rem–6rem), mono kicker, brand-document tone; deliberately NOT `PageHeader`
   - `components/dna-block.tsx` — 2-col mission/vision + ambre-bordered pull-quote
   - `components/values-list.tsx` — 5 numbered editorial rows with top rules
   - `components/expertise-grid.tsx` — 3×2 abisal grid, 6 micro-fig SVG variants (fullstack/hub/bars/nodes/signal/insertion), tone-shift divider; includes `GridBackground`
   - `components/manifesto.tsx` — 10 strata plates; ambre left bar scaleY 0→1 on scroll entry (IntersectionObserver, staggered 60ms/plate); reduced-motion: bars full static; includes `GridBackground`
   - `components/pages/about.tsx` — page compositor

5. **Page routing + wiring:**
   - `generateStaticParams` +3 entries (sobre-escala, en/about-escala, ca/sobre-escala)
   - `BUILT_PAGES` includes 'about'; render branch added
   - `app/sitemap.ts` — about × 3 locales
   - BEM CSS block in `globals.css` (all Phase 2.5 components + responsive ≤767/479px + reduced-motion)

6. **Tests + docs:**
   - 78 new tests across 5 test files (596 total, 42 files)
   - `PLAN.md` — Phase 2.5 marked ☑
   - `DECISIONS.md` — Phase 2.5 section added (grid opacity, TODO-not-migrate, IO test behavior)
   - `docs/CHANGELOG.md` updated

## What was previously done (SPEC-FIX-01 + Phase 2.4 — SPEC-P2.4)

See previous activeContext archived in CHANGELOG.md.

## Known issues / open items

- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **IdealClientNote CTA interim:** Points to `#contacto` anchor until Phase 3 ships `/contacto`.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.
- **GridBackground migration:** 5 existing abisal sections still hand-roll the grid pattern; TODO comments in `globals.css`. Low-risk future refactor.

## What comes next (Phase 3)

**[PAGE-06]** `/contacto` — dedicated contact page reusing `ContactForm`.
**[CONTACT-01]** Contact form API + email provider (backend connection).
- Email address: `hola@escaladigitalventures.com` — confirm final address before connecting.

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` placeholder. Confirm before Phase 3 CONTACT-01.
- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
