# Active Context

_Last updated: August 2026 (Phase 5 complete — SPEC-P5 full trilingual content EN + CA)_

## Current state

**Phase 5 COMPLETE.** Full EN + CA dictionaries shipped. All 10 page dictionaries + shared + cases data translated. Coverage guard active. 883 tests, all green. Build clean, TypeScript strict clean. PLAN.md Phase 5 marked ☑.

## What was just done (Phase 5 — SPEC-P5)

1. **Glossary:** `docs/i18n-glossary.md` — fixed terminology, nine claims trilingual, do-not-translate list, register notes.

2. **Coverage guard:** `tests/content/i18n-coverage.test.ts` — fails on fallback re-exports, key structure mismatch, placeholders in non-legal EN/CA, meta identical to ES, editorial guardrail violations.

3. **EN + CA dictionaries (20 files):**
   - `content/en/shared.ts` + `content/ca/shared.ts` — nav, footer, claims, form labels, 404, finalCta, accessibility.
   - `content/en/home.ts` + `content/ca/home.ts` — full home page with recrafted claims.
   - `content/en/services.ts` + `content/ca/services.ts` — 5 service lines, IP/ownership wording correct.
   - `content/en/method.ts` + `content/ca/method.ts` — framework, execution practices, pipeline, AI build.
   - `content/en/cases.ts` + `content/ca/cases.ts` — index page labels.
   - `content/en/alliance.ts` + `content/ca/alliance.ts` — 5 seats, 3 planes, 5 commitments.
   - `content/en/about.ts` + `content/ca/about.ts` — DNA, values, expertise, manifesto (10 beliefs).
   - `content/en/contact.ts` + `content/ca/contact.ts` — affinity filter, direct meta, form.
   - `content/en/legal.ts` + `content/ca/legal.ts` — 5 LSSI-CE sections (placeholders preserved).
   - `content/en/privacy.ts` + `content/ca/privacy.ts` — 6 RGPD sections (placeholders preserved).

4. **`content/data/cases.ts`:** EN + CA per-locale copy for MAGUPELL and BioZero index cards. Dossier fields/readouts remain ES (Phase 5 scope: index card copy only).

5. **`lib/i18n/dictionary.ts`:** Forked into ES/EN/CA bundles. `getDictionary('en')` and `getDictionary('ca')` now return real translated content.

6. **`app/not-found.tsx`:** Localized 404 — pathname-based locale detection (`/en` → EN, `/ca` → CA, else ES). Now a `'use client'` component using `usePathname()`.

7. **`tests/lib/i18n/dictionary.test.ts`:** Updated Phase 1 test to Phase 5 reality (EN/CA now differ from ES).

8. **Docs:** `docs/i18n-glossary.md` + `docs/i18n-qa.md` delivered.

## What was previously done

Phase 1–4 — see CHANGELOG and previous activeContext archived there.

## Known issues / open items

- **Carlos register review (AC-9):** EN + CA copy pending Carlos sign-off. Code complete; content review open.
- **Legal placeholders:** `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` — Carlos must fill before go-live. Visible as ambre highlights in dev.
- **Legal advisor review required** before go-live (LEGAL DISCLAIMER in spec honored).
- **Favicon artwork is a draft** — Carlos to review and replace with final approved logomark before launch.
- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.
- **GridBackground migration:** 5 existing abisal sections still hand-roll the grid pattern; TODO comments in `globals.css`. Low-risk future refactor.
- **Email delivery:** DRY_RUN active (no API key). Phase 6: set `EMAIL_API_KEY` + `CONTACT_FROM` once DNS is verified. Zero code change needed.
- **Rate limit store:** in-memory, resets on Cloud Run cold-start. TODO(P6): swap to Redis/Upstash.
- **Dossier fields/readouts:** MAGUPELL and BioZero dossier narrative fields and readout labels remain in ES. Full dossier localization is a future enhancement (post-Phase 7).
- **`<html lang>` on root layout:** stays `lang="es"` until Phase 6 middleware sets it per-request. Interior pages set `lang` on `<main>` for EN/CA.

## What comes next (Phase 6)

**Phase 6:** GCP infrastructure (blocked: GCP account not ready).

Carlos to confirm when GCP account is ready.

## Active decisions open

- **Legal data:** `{{REGISTRO_MERCANTIL}}`, `{{JURISDICCION}}`, `{{FECHA_ACTUALIZACION}}` — Carlos to provide.
- **NIF confirmation:** `{{NIF_B88767520}}` pre-filled from MAGUPELL contract — Carlos to confirm.
- **EU region confirmation:** `{{REGION_EU_GOOGLE_CLOUD}}` — to confirm at Phase 6 when GCP is configured.
- **Favicon artwork:** Carlos to review draft and replace with final approved logomark.
- **EN/CA copy register:** Carlos to review and sign off (AC-9).
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
- **Email provider key:** Resend API key needed for live email (Phase 6 + DNS).
- **Analytics:** dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner.
