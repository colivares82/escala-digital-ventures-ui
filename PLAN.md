# PLAN.md — escaladigitalventures.com · Development Tracking Guide

**Method:** spec-driven. Every phase starts with a spec written by Claude
(English, MAGUPELL format: business context, numbered requirements,
content source, acceptance criteria, wireframe in `specs/mockups/` when
new UI), approved by Carlos, implemented with Cline under `.clinerules`.
A phase is DONE only when its acceptance criteria pass: TS strict clean,
AA contrast, prefers-reduced-motion, responsive to 360px, all copy from
`/content` dictionaries.

**Sources of truth:** El Libro de Escala v2.1 (`docs/el-libro-de-escala-v2.1.md`) ·
Website Content & Design Spec v1.1 (`docs/escala-web-content-spec-v1.1.md`) ·
`.clinerules` (engineering).

**Status legend:** ☐ pending · ◐ in progress · ☑ done

---

## PHASE 0 — Documentation sync (no code)
Status: ☑ done
- ☑ Decision: working languages on the website = Spanish, English,
  Catalan. Russian removed everywhere.
- ☑ Cline: remove "ruso" from `content/es/home.ts` (languages line
  updated; test suite confirmed green).
- ☑ Repo hygiene: spec v1.1 → `docs/escala-web-content-spec-v1.1.md`;
  Libro v2.1 → `docs/el-libro-de-escala-v2.1.md`; stale root copies
  (`escala-web-content-spec.md`, `escala-book-base-de-conocimiento.md`)
  deleted; `PLAN.md` at repo root; memory-bank updated (all 6 files);
  `docs/BACKLOG.md` re-ordered per PLAN phases.
- ☑ Carlos: verify no other Escala material outside this repo mentions
  Russian (action: check `escala-book-base-de-conocimiento.md` which
  still mentions "ruso" — this is the OLD file, now superseded by Libro
  v2.1 in `/docs`).
**Exit criteria:** repo documentation matches the built reality; a new
contributor (or agent) could build page 2 from the docs alone. ✅

## PHASE 1 — i18n architecture + interior page system
Status: ☑ done
- ☑ Locale routing: `app/[[...path]]/page.tsx` catch-all; `lib/i18n/routes.ts`
  route map (10 pages × 3 locales per spec §4.1); `getPath`, `resolvePath`,
  `getAlternates` helpers; `dynamicParams = false`.
- ☑ `/content/{es,en,ca}` structure; ES populated + meta on all stubs;
  EN/CA re-export ES with `TODO(P5)` markers; `content/data/cases.ts`.
- ☑ Per-page metadata (title/description/canonical) + hreflang × 3 + x-default
  OG; `app/sitemap.ts`; `app/robots.ts`.
- ☑ `LocaleSwitcher` — page-preserving links, `aria-current`, keyboard accessible.
- ☑ `PageHeader` (paper/abisal) + `/styleguide` "Plantilla de página" (AC-8).
- ☑ `docs/adding-a-page.md` — AC-9 guide.
- ☑ 252 tests passing; coverage ≥ 93% statements (well above 70% gate).
- ☑ Option A: route map complete; only home × 3 locales emitted/sitemapped.
  Interior routes `notFound()` until Phase 2 builds them.
**Exit criteria:** `/en` and `/ca` render the home with ES fallback and
correct hreflang; adding a page = dictionary + route entry only. ✅

## PHASE 2 — Interior pages (one session each, this order)
Status: ◐ in progress
- ☑ 2.1 `/como-trabajamos` — PhaseCycle reused; ExecutionPractices (5 panels);
  FIG.06 (provisional, isolated); AiBuildBlock (Ch. 7/9). All 3 locales built.
  291 tests passing. SPEC-P2.1 AC all green.
- ☐ 2.2 `/que-hacemos` — 5 service lines problem-first + "¿Encajamos?"
  (Ch. 11–12).
- ☐ 2.3 `/casos-de-exito` + shared case template (data-driven) +
  MAGUPELL + BioZero (Ch. 14–16).
- ☐ 2.4 `/modelo-de-alianza` — reuses constellation; three planes +
  commitments (Ch. 11–13).
- ☐ 2.5 `/sobre-escala` — DNA, values, manifesto (10 beliefs),
  anonymized experience, colivares.com text mention (Ch. 1–4).
Each page ships with its own spec; new compositions (case template,
manifesto) get a wireframe first.
**Exit criteria per page:** matches its spec section, deployed locally,
navigation and footer links live.

## PHASE 3 — Contact, end to end
Status: ☐
- ☐ `/contacto` page reusing ContactForm.
- ☐ API route: server-side validation, transactional email (same
  provider as MAGUPELL), honeypot, rate limit.
- ☐ Success/error states per spec (error shows direct email fallback).
- ☐ Confirm final address: hola@escaladigitalventures.com.
**Exit criteria:** form tested end to end locally with the real mailbox.

## PHASE 4 — Legal & analytics
Status: ☐
- ☐ `/aviso-legal` (LSSI-CE: company data, CIF, registry — Carlos
  provides; Claude drafts).
- ☐ `/privacidad` (RGPD: controller, purpose, legal basis, retention,
  rights).
- ☐ Cookieless analytics (no banner needed).
- ☐ 404 page with the identity, favicon, OG images.
**Exit criteria:** legally publishable in Spain.

## PHASE 5 — EN & CA content
Status: ☐
- ☐ Claude delivers full `en` and `ca` dictionaries: claims recrafted,
  not translated ("We automate your business. We scale with you." /
  «Automatitzem el teu negoci. Escalem amb tu.»).
- ☐ Carlos reviews register of both languages.
- ☐ Localized slugs active; hreflang QA across all pages.
**Exit criteria:** the three languages are complete and reviewed.

## PHASE 6 — Google Cloud infrastructure & domain (kept for the end)
Status: ☐ (blocked: GCP account not ready)
- ☐ Dockerfile (`output: "standalone"`).
- ☐ Cloud Run services `dev` + `prod`, European region.
- ☐ GitHub Actions: lint + test + build → deploy dev → manual approval
  → prod. (Note: branch workflow for dev/main will be configured when
  GCP is ready; branches can be created now without the cloud target.)
- ☐ `dev.escaladigitalventures.com` protected (IAP or basic auth).
- ☐ Domain mapping for prod prepared (DNS not switched yet).
**Exit criteria:** push to main reaches dev automatically; prod deploys
only on approval.

## PHASE 7 — Launch QA & go-live
Status: ☐
- ☐ Lighthouse ≥95 all categories, all pages.
- ☐ AA + keyboard audit; real-device responsive pass.
- ☐ Forms e2e in dev environment; sitemap/robots; structured data
  (Organization + ProfessionalService).
- ☐ DNS switch → production live.
- ☐ Post-launch: extract reusables to escala-dev-standards (diagram
  kit, i18n pattern, web rules template); update El Libro de Escala
  (the knowledge system evolves, as it preaches).
**Exit criteria:** escaladigitalventures.com live in three languages.
