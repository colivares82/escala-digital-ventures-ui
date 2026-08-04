# Active Context

_Last updated: April 2026 (Phase 2.3 completed)_

## Current state

**Phase 2.3 complete.** `/casos-de-exito` (index) + `/casos-de-exito/magupell` + `/casos-de-exito/biozero` are live at all 3 locale slugs. 450 tests, all passing. Build clean, TypeScript strict.

## What was just done (Phase 2.3 — SPEC-P2.3)

1. **Spec filed:**
   - `specs/spec-p2.3-casos-de-exito.md` — implementation spec (authored by Carlos/Claude, approved before build)

2. **Data model:**
   - `content/data/cases.ts` — full `CaseStudy` type (mode, brand with `StaticImageData` logos, readouts, capabilities?, dossier fields, per-case meta, plate); `getCase(slug)` helper
   - Logos at `app/assets/brand/*.png` — static import via `next/image` (build-time missing-file check; see DECISIONS.md)
   - `content/types.ts` — `CasesDictionary` expanded with all index-page and dossier UI labels

3. **Content layer:**
   - `content/es/cases.ts` — full ES dictionary (pageHeader "A / CASOS DE ÉXITO", card labels, dossier navigation labels)
   - EN/CA re-export ES with `TODO(P5)` markers (unchanged pattern)

4. **New components (6):**
   - `components/readout-strip.tsx` — adaptive-column bordered grid (--readout-cols CSS var)
   - `components/dossier-field.tsx` — two-column field row (ordinal num + key / body text)
   - `components/capability-grid.tsx` — 3-up grid; null guard for MAGUPELL (no capabilities)
   - `components/brand-header.tsx` — client logo (next/image) + sector + H1 + plate + visit link; placeholder when logo null
   - `components/case-card.tsx` — index card with logo, eyebrow, name, subtitle, "ABRIR EXPEDIENTE ↗"
   - `components/case-dossier.tsx` — single mode-aware template (data-forward: 4 readouts + 5 fields; capability-forward: 2 readouts + CapabilityGrid + 3 fields); next/back nav

5. **Page assembly + routing:**
   - `components/pages/cases.tsx` — PageHeader → CaseCard grid (data-driven, sorted by order) → FinalCTA
   - `generateStaticParams` extended: +9 entries (index × 3 + 2 details × 3)
   - `generateMetadata` updated: caseDetail uses per-case `CaseStudy.meta`
   - `app/sitemap.ts` — 3 new pages added
   - Nav: "Casos de éxito" → true route `/casos-de-exito` (header + footer)

6. **CSS + styleguide:**
   - `app/globals.css` — full Phase 2.3 BEM block; responsive ≤767px + ≤479px
   - `app/styleguide/page.tsx` — section 08: all 6 new components incl. BrandHeader placeholder state

7. **Tests + docs:**
   - 84 new tests across 7 test files (450 total, 31 files)
   - `PLAN.md` — Phase 2.3 marked ☑
   - `docs/CHANGELOG.md` updated
   - `DECISIONS.md` — logo asset location rationale

## Known issues / open items

- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **IdealClientNote CTA interim:** Points to `#contacto` anchor until Phase 3 ships `/contacto`.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.

## What comes next (Phase 2.4)

**[PAGE-04]** `/modelo-de-alianza` — reuses constellation diagram; three planes + commitments (Libro Ch. 11–13).
- Spec from Claude first (English), wireframe if needed, then build.

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` placeholder. Confirm before Phase 3 CONTACT-01.
- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
