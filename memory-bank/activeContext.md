# Active Context

_Last updated: August 2026 (Phase 2.6 + 2.7 complete — SPEC-P2.6 /contacto + contact backend + link audit)_

## Current state

**Phase 2 COMPLETE.** `/contacto` page + full contact backend shipped. 630 tests, all green. Build clean, TypeScript strict clean. `ContactForm` reusable across the whole app (section + dossier variants). Phase 2.6 closes the last Phase 2 page AND folds in the Phase 3 backend work. PLAN.md Phase 2 marked ☑, Phase 3 marked ☑ (folded).

## What was just done (Phase 2.6 — SPEC-P2.6)

1. **Content layer:**
   - `content/types.ts` — `ContactDictionary` full interface (replaced Phase 1 stub)
   - `content/es/contact.ts` — full ES copy (pageHeader, affinityFilter × 3, directMeta, dossierHeader, trustLine)
   - `content/es/shared.ts` — `contactForm` extended: `sendLabel`, `sending`, `successHeader/Ref/H2/Body/Resend`, `errorApiPrefix/Suffix`

2. **New reusable components (2 + 1 page):**
   - `components/contact-success.tsx` — confirmation card; variants `section` (FinalCTA) / `dossier` (/contacto); ambre SVG check, H2, body, resend action. **Reusable across the app.**
   - `components/contact-form.tsx` (upgraded, not new) — variant prop, honeypot, fetch→/api/contact, loading/success/apiError state machine. **Substitute everywhere: same component, same endpoint, same states.**
   - `components/pages/contact.tsx` — two-column immersive page compositor

3. **Backend:**
   - `app/api/contact/route.ts` — POST, Node.js runtime, in-memory rate limit (5/min), honeypot silent-200, server-side validation
   - `lib/email.ts` — Resend provider abstraction, DRY_RUN mode, reply-to = visitor, no new npm dep

4. **Config:**
   - `.env.example` — all 7 env vars documented

5. **Routing + sitemap:**
   - `generateStaticParams` +3 (contacto/en contact/ca contacte)
   - `BUILT_PAGES` + render branch for 'contact'
   - `app/sitemap.ts` + contact

6. **Link audit (Phase 2.7):**
   - «Hablemos» CTA → `ROUTES.CONTACT` (/contacto) — was `#contacto`
   - `IdealClientNote` on /que-hacemos → `ROUTES.CONTACT`
   - Legal links tracked for Phase 4 (present, 404 until Phase 4)
   - `docs/link-audit.md` produced

7. **CSS (Phase 2.6):**
   - `.contact-page` two-column layout, `.contact-form--dossier`, `.contact-success` variants, `.contact-api-error`, `.contact-hp`, `button[disabled]`

8. **Tests (34 new):**
   - `tests/components/contact-form.test.tsx` (18 tests — all new behavior)
   - `tests/components/contact-success.test.tsx` (9 new tests)
   - `tests/content/contact-content.test.ts` (16 new tests)
   - `tests/content/ownership-guard.test.ts` — Gmail leak guard added

## What was previously done

Phase 2.1–2.5 + SPEC-FIX-01 — see CHANGELOG and previous activeContext archived there.

## Known issues / open items

- **ServiceFig figures DRAFT:** All five are coherent drafts. Carlos will refine each variant individually.
- **FIG.06 provisional:** `ExecutionPipelineFig` internals are still provisional.
- **EN/CA translations:** all locales serve ES fallback (Phase 5).
- **Logo-display permission (BioZero):** pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6.
- **GridBackground migration:** 5 existing abisal sections still hand-roll the grid pattern; TODO comments in `globals.css`. Low-risk future refactor.
- **Email delivery:** DRY_RUN active (no API key). Phase 6: set `EMAIL_API_KEY` + `CONTACT_FROM` once DNS is verified. Zero code change needed.
- **Rate limit store:** in-memory, resets on Cloud Run cold-start. TODO(P6): swap to Redis/Upstash.

## What comes next (Phase 4)

**[PAGE-07]** `/aviso-legal` + `/privacidad` — legal pages (Carlos to provide CIF, registered address, RGPD text).
**[ANALYTICS-01]** Cookieless analytics (Plausible).
**[SEO-01]** 404 page + favicon + OG images.

## Active decisions open

- **Legal data:** CIF, registered address for Aviso Legal — Carlos to provide.
- **EN/CA copy:** professional translation + review pending. Phase 5.
- **Real imagery:** case-study context images pending from clients.
- **GCP account:** not ready. Phase 6 blocked.
- **ServiceFig variants:** DRAFT VISUAL — Carlos will iterate one-by-one after review.
- **Logo-display permission:** Carlos to confirm for MAGUPELL + BioZero before Phase 7 launch.
- **Email provider key:** Resend API key needed for live email (Phase 6 + DNS).
