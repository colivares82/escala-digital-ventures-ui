# Active Context

_Last updated: April 2026 (Phase 2.2 completed)_

## Current state

**Phase 2.2 complete.** `/que-hacemos` is live at all 3 locale slugs. 366 tests, all passing. Build clean, TypeScript strict.

## What was just done (Phase 2.2 — SPEC-P2.2)

1. **Spec filed:**
   - `specs/spec-p2.2-que-hacemos.md` — implementation spec in repo (authored by Claude, approved by Carlos, spec-driven loop followed)

2. **Design token:**
   - `--ambre-dk: #b85c00` added to `:root` in `globals.css` — AA-safe dark amber on `--paper`; used exclusively for the problem-line text in ServiceRow
   - `DECISIONS.md` — rationale recorded (pure `--ambre` does NOT pass AA on paper)

3. **Content layer:**
   - `content/types.ts` — `ServicesDictionary` interface + `ServiceFigVariant` type union; `problemPrefix` for i18n-safe problem label
   - `content/es/services.ts` — full ES dictionary verbatim from Libro v2.1 Ch. 11 (5 services) + Ch. 12 (ideal client); all five `figVariant`, `figLabels`, `figCaption` per wireframe FIG.07–11
   - EN/CA re-exports already present and compile correctly

4. **New components:**
   - `components/service-fig.tsx` — ONE parameterized component with five ISOLATED variant renderers (`capture`, `platform`, `ai`, `product`, `evolve`); FIG.07–11 DRAFT VISUAL; IntersectionObserver pulse-on-entry; reduced-motion → static (no animateMotion rendered); sr-only caption; changing one variant touches only its own function (AC-5)
   - `components/service-row.tsx` — three-column grid (64px / 1fr / 320px), `--ambre-dk` problem line, 1px ink-18% borders, mobile stacks below
   - `components/ideal-client-note.tsx` — abisal band, eyebrow B / ¿ENCAJAMOS?, Libro Ch. 12 body, CTA → `#contacto` interim (BACKLOG follow-up for Phase 3)

5. **Page assembly + routing:**
   - `components/pages/services.tsx` — A·PageHeader → 5×ServiceRow (staggered Reveal) → B·IdealClientNote → FinalCTA
   - `generateStaticParams` extended: services × 3 locales
   - `app/sitemap.ts` — `services` added to `BUILT_PAGES`

6. **Nav upgrade:**
   - `content/es/shared.ts` — "Qué hacemos" in both header and footer nav → true route `/que-hacemos`; active state via existing `pageId` mechanism

7. **CSS + styleguide:**
   - `app/globals.css` — BEM for `.service-row`, `.service-fig`, `.ideal-client`, `.service-rows`; stagger via `--row-index` CSS custom prop; responsive ≤767px/≤639px; reduced-motion overrides
   - `app/styleguide/page.tsx` — section 07: all five ServiceFig variants grid + ServiceRow sample + IdealClientNote

8. **Tests + docs:**
   - 75 new tests (32 ServiceFig + 14 ServiceRow + 10 IdealClientNote + 15 content-integrity + 4 existing passing)
   - Actually total: 366 tests (was 291 after Phase 2.1, +75 new)
   - `PLAN.md` — Phase 2.2 marked ☑
   - `docs/CHANGELOG.md` updated
   - `docs/BACKLOG.md` — BACKLOG item added for CTA follow-up + NAV-01 progress updated

## Known issues / open items

- **ServiceFig figures DRAFT:** All five are coherent drafts reproducing the wireframe geometry. Carlos will refine each variant individually — changing one variant touches only its isolated render function.
- **IdealClientNote CTA interim:** Points to `#contacto` anchor (FinalCTA on same page) until Phase 3 ships `/contacto`. BACKLOG item `PAGE-06-CTA` tracks this.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional (Phase 2.1 open item).
- **Nav fallback for unbuilt pages:** Casos de éxito, Modelo de alianza, Sobre Escala still link to home anchors until Phase 2.3/2.4/2.5 ship.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).

## What comes next (Phase 2.3)

**[PAGE-03]** `/casos-de-exito` — case study index + MAGUPELL + BioZero detail pages (data-driven template).
- Spec from Claude first (English), wireframe if needed, then build.
- Sources: Libro Ch. 14–16, spec v1.1 §5.4, `content/data/cases.ts`

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` placeholder. Confirm before Phase 3 CONTACT-01.
- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
