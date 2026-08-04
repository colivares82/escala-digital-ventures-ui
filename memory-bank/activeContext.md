# Active Context

_Last updated: August 2026 (SPEC-FIX-01 completed; Phase 2.4 complete)_

## Current state

**SPEC-FIX-01 complete.** IP / ownership wording corrected across all built work. 523 tests, all passing. Build clean, TypeScript strict. Sources of truth promoted to Libro v2.2 + spec v1.1.1. Sitewide ownership-wording grep = 0 violations. Guard active in CI.

## What was just done (SPEC-FIX-01 — IP / ownership correction)

1. **Docs swapped:**
   - `docs/el-libro-de-escala-v2.2.md` added (replaces v2.1, deleted)
   - `docs/escala-web-content-spec-v1.1.1.md` added (replaces v1.1, deleted)
   - `specs/spec-fix-ownership-ip.md` filed in repo
   - `PLAN.md` + `memory-bank/projectbrief.md` source-of-truth refs → v2.2/v1.1.1

2. **Copy fixed (1 hotspot):**
   - `content/es/services.ts` service[1] deliverable: "propietario de … código" replaced with §3.1 canonical wording — "licencia de uso indefinida sobre tu plataforma … La propiedad intelectual y el código son de Escala."

3. **Guard installed:**
   - `tests/content/ownership-guard.test.ts` — 5 tests; scans `content/`, `components/`, `app/` for 4 FR-4 patterns; runs in `npm test`; AC-5 verified.

4. **Standing rule:**
   - `.clinerules/project-ownership-rule.md` — project-local rule (survives standards-package build); forbidden phrases + canonical wording for all future pages.

5. **Docs updated:** CHANGELOG, DECISIONS.md (pending item marked resolved), PLAN.md refs.

## What was previously done (Phase 2.4 — SPEC-P2.4)

1. **Spec filed:**
   - `specs/spec-p2.4-modelo-de-alianza.md` — implementation spec + wireframe at `specs/mockups/wireframe-p2.4-modelo-de-alianza-final.html` (approved before build)

2. **Type contracts:**
   - `content/types.ts` — `AllianceDictionary` full interface (was stub); +`AllianceSeat`, `AlliancePlane`, `AllianceCommitment` types

3. **Content layer:**
   - `content/es/alliance.ts` — full ES copy (Libro Ch. 11–13); commitment 01 = "A MEDIDA" corrected §0 framing; no code-ownership wording
   - `content/es/shared.ts` — nav + footer "Modelo de alianza" → `/modelo-de-alianza` (was `/#alianza`)

4. **New components (3):**
   - `components/alliance-constellation.tsx` — parameterized `size: 'compact' | 'large'`; regular pentagon geometry (−90°, every 72°); occupied = solid + ambre pulse; free = dashed + reduced opacity; draw-on-scroll via `[data-visible="true"]` ancestor + `--ac-delay` CSS stagger; reduced-motion static
   - `components/alliance-planes.tsx` — three columns (abisal); middle ambre highlight; PLANO labels + Archivo H3 + body + depth mono; mobile stack
   - `components/commitments-band.tsx` — 5-cell horizontal band (paper); mono number (mar) + mono tag (ambre-dk AA) + body + ambre tick; mobile stack

5. **Page assembly + routing:**
   - `components/pages/alliance.tsx` — PageHeader → WhyFive+Constellation → AlliancePlanes → CommitmentsBand → FinalCTA
   - `generateStaticParams` +3 entries; `alliance` added to `BUILT_PAGES`; render branch
   - `app/sitemap.ts` — alliance × 3 locales
   - `components/final-cta.tsx` — prop widened from `typeof homeContent.finalCta` to `FinalCtaContent` interface (enables any page finalCta)

6. **CSS + styleguide:**
   - `app/globals.css` — full Phase 2.4 BEM block; constellation animation (`ac-*` classes, `[data-visible]` trigger, `prefers-reduced-motion`); responsive ≤767px
   - `app/styleguide/page.tsx` — section 09: constellation compact + large, AlliancePlanes, CommitmentsBand

7. **Tests + docs:**
   - 68 new tests across 4 test files/extensions (518 total, 35 files)
   - `PLAN.md` — Phase 2.4 marked ☑
   - `docs/CHANGELOG.md` updated
   - `DECISIONS.md` — constellation extraction, FinalCTA typing, ownership wording status

## Known issues / open items

- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **IdealClientNote CTA interim:** Points to `#contacto` anchor until Phase 3 ships `/contacto`.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.

## What comes next (Phase 2.5)

**[PAGE-05]** `/sobre-escala` — DNA, values, manifesto (10 beliefs), anonymized experience trajectory, colivares.com text mention (Libro Ch. 1–4).
- Spec from Claude first (English), wireframe if needed, then build.

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` placeholder. Confirm before Phase 3 CONTACT-01.
- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
