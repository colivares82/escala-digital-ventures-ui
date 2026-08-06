# Active Context

_Last updated: August 2026 (Phase 4 complete — SPEC-P4 legal pages, 404, favicon & OG)_

## Current state

**Phase 4 COMPLETE.** `/aviso-legal` + `/privacidad` legal pages shipped. Identity-branded 404. Favicon (draft). Generic OG image. 675 tests, all green. Build clean, TypeScript strict clean. PLAN.md Phase 4 marked ☑.

## What was just done (Phase 4 — SPEC-P4)

1. **Content layer:**
   - `content/types.ts` — `LegalDictionary` + `PrivacyDictionary` full interfaces (replaced Phase 1 stubs). New: `LegalSection`, `LegalKvRow`, `NotFoundContent` types.
   - `content/es/legal.ts` — full LSSI-CE aviso legal (5 sections). Unconfirmed data uses `{{PLACEHOLDER}}` tokens. No physical address. IP section states code/contents are Escala's.
   - `content/es/privacy.ts` — full RGPD privacy policy (6 sections). Explicit no-tracking-cookies statement. AEPD reference.
   - `content/es/shared.ts` — `notFound` block added (code, h1, body, ctaLabel, diagramAria).

2. **New components (2 + 2 page compositors):**
   - `components/anchor-nav.tsx` — sticky side navigation for legal pages. IntersectionObserver active-section highlight (debounced). Keyboard operable. `'use client'`.
   - `components/legal-doc.tsx` — shared two-column layout (sticky 230px anchor + ≤70ch reading column). `{{PLACEHOLDER}}` tokens rendered with ambre highlight (dev warning). Mobile: top índice list.
   - `components/pages/legal.tsx` — /aviso-legal page compositor.
   - `components/pages/privacy.tsx` — /privacidad page compositor.

3. **404 page:**
   - `app/not-found.tsx` — identity-branded: abisal + GridBackground + kit micro-diagram (dashed path INICIO → ambre "?" node) + «Fuera del sistema.» + home CTA. Reduced-motion static. noindex (Next.js auto).

4. **Favicon + OG:**
   - `app/icon.svg` — squares logomark favicon (draft — Carlos to approve before launch).
   - `app/opengraph-image.tsx` — generic site-wide OG image (1200×630). Abisal background, grid motif, claim in Archivo, ambre accent. Edge runtime.
   - `app/layout.tsx` — `metadataBase` added (resolves OG image URLs).

5. **Placeholder guard:**
   - `lib/placeholders.ts` — `collectPlaceholders()` + `hasPlaceholder()` utilities.

6. **Routing + sitemap:**
   - `generateStaticParams` +6 (aviso-legal/en/ca + privacidad/en/ca)
   - `BUILT_PAGES` + render branches for 'legal' + 'privacy'
   - `app/sitemap.ts` — legal + privacy added (indexable)

7. **CSS (Phase 4):**
   - `.legal-doc` two-column layout, `.anchor-nav` sticky nav, `.legal-doc__placeholder` ambre highlight, `.not-found` identity-branded 404.

8. **Tests (45 new):**
   - `tests/content/legal-content.test.ts` (23 tests — sections, meta, no-cookies, AEPD, placeholders, address guard)
   - `tests/components/legal-doc.test.tsx` (9 tests)
   - `tests/components/anchor-nav.test.tsx` (8 tests)
   - `tests/components/not-found.test.tsx` (5 tests)

9. **Styleguide:**
   - Section 11 "LEGAL DOC — FASE 4" added: AnchorNav demo + LegalDoc (/aviso-legal) + LegalDoc (/privacidad).

## What was previously done

Phase 2.1–2.6 + 2.7 + SPEC-FIX-01 — see CHANGELOG and previous activeContext archived there.

## Known issues / open items

- **Legal placeholders:** `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` — Carlos must fill before go-live. Visible as ambre highlights in dev.
- **Legal advisor review required** before go-live (LEGAL DISCLAIMER in spec honored).
- **Favicon artwork is a draft** — Carlos to review and replace with final approved logomark before launch.
- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.
- **GridBackground migration:** 5 existing abisal sections still hand-roll the grid pattern; TODO comments in `globals.css`. Low-risk future refactor.
- **Email delivery:** DRY_RUN active (no API key). Phase 6: set `EMAIL_API_KEY` + `CONTACT_FROM` once DNS is verified. Zero code change needed.
- **Rate limit store:** in-memory, resets on Cloud Run cold-start. TODO(P6): swap to Redis/Upstash.

## What comes next (Phase 5 or Phase 6)

**Phase 5:** Full EN + CA dictionaries (recrafted, not translated). Carlos to review register.
**Phase 6:** GCP infrastructure (blocked: GCP account not ready).

Carlos to decide order.

## Active decisions open

- **Legal data:** `{{REGISTRO_MERCANTIL}}`, `{{JURISDICCION}}`, `{{FECHA_ACTUALIZACION}}` — Carlos to provide.
- **NIF confirmation:** `{{NIF_B88767520}}` pre-filled from MAGUPELL contract — Carlos to confirm.
- **EU region confirmation:** `{{REGION_EU_GOOGLE_CLOUD}}` — to confirm at Phase 6 when GCP is configured.
- **Favicon artwork:** Carlos to review draft and replace with final approved logomark.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
- **Email provider key:** Resend API key needed for live email (Phase 6 + DNS).
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
