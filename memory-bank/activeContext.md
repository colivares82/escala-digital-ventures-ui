# Active Context

_Last updated: April 2026 (Phase 2.1 completed)_

## Current state

**Phase 2.1 complete.** `/como-trabajamos` is live at all 3 locale slugs. 291 tests, all passing. Build clean, TypeScript strict.

## What was just done (Phase 2.1 — SPEC-P2.1)

1. **Content layer:**
   - `content/types.ts` — `MethodDictionary` expanded from stub to full Phase 2.1 interface
   - `content/es/method.ts` — full ES dictionary; verbatim Libro Ch. 7 (AiBuild lead), Ch. 9 (5 practices); spec v1.1 §5.3 lead; phases NOT duplicated (shared from `homeContent.framework.phases` per FR-3.2)

2. **PhaseCycle prop-gating (FR-3.3):**
   - `action` made optional — omit to suppress the self-link on the method page
   - `sectionIndex` added as prop (default `"03"`) — interior pages pass the letter index (e.g. `"B"`)
   - Fully backward-compatible: home renders identically, 16 PhaseCycle tests pass

3. **Three new components:**
   - `components/execution-practices.tsx` — 5 sticky panels; CSS-only, no JS; mobile/reduced-motion plain stack
   - `components/execution-pipeline-fig.tsx` — FIG.06, **PROVISIONAL VISUAL** (Carlos will redesign); fully isolated; ambre pulse; reduced-motion static; sr-only accessible text
   - `components/ai-build-block.tsx` — sober abisal block; Libro Ch. 7/9 only; 3–4 mono points; editorial guardrail; small inline diagram

4. **Page assembly + routing:**
   - `components/pages/method.tsx` — page compositor; all copy via props
   - `generateStaticParams` extended: method × 3 locales
   - `app/sitemap.ts` — `method` added to `BUILT_PAGES`

5. **Header nav → true routes (AC-11):**
   - `content/es/shared.ts` — "Cómo trabajamos" nav href now `/como-trabajamos`; `pageId` added to nav items for active detection; unbuilt pages use home anchors as fallback
   - `components/site-chrome.tsx` — active state via `aria-current="page"` on matching `pageId`; brand link uses `ROUTES.HOME` on interior pages

6. **CSS + styleguide:**
   - `app/globals.css` — BEM styles for all 3 new components; `.sr-only` utility; reduced-motion overrides; active nav style
   - `app/styleguide/page.tsx` — section 06: ExecutionPractices (2 panels), ExecutionPipelineFig, AiBuildBlock

7. **Tests + docs:**
   - 39 new tests (23 component + 11 content-integrity + 4 PhaseCycle regression + 1 existing site-chrome)
   - `docs/adding-a-page.md` — interior A/B/C letter index convention documented
   - `docs/CHANGELOG.md` updated
   - `PLAN.md` — Phase 2.1 marked ☑

## Known issues / open items

- **FIG.06 provisional:** `ExecutionPipelineFig` internals are provisional. Carlos will redesign the visual. The component is isolated — only `execution-pipeline-fig.tsx` needs to change.
- **Nav fallback for unbuilt pages:** Qué hacemos, Casos de éxito, Modelo de alianza, Sobre Escala still link to home anchors (`/#que-hacemos`, etc.) until their pages ship. Track in BACKLOG as follow-up action.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **FinalCTA on method page:** embedded ContactForm (Phase 3 will switch to `/contacto` link once that page ships).
- **Lighthouse baseline:** deferred to Phase 7 (GCP not ready).

## What comes next (Phase 2.2)

**[PAGE-01]** `/que-hacemos` — spec from Claude first (English, MAGUPELL format), wireframe if needed, then build.
- 5 service lines problem-first (Libro Ch. 11)
- IdealClientNote section (Ch. 12)
- FinalCTA

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` placeholder. Confirm before Phase 3 CONTACT-01.
- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **Nav upgrade for unbuilt pages:** when /que-hacemos ships, update its `pageId` and href in `shared.ts`.
