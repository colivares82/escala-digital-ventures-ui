# PLAN.md — escaladigitalventures.com · Development Tracking Guide

**Method:** spec-driven. Every phase starts with a spec written by Claude
(English, MAGUPELL format: business context, numbered requirements,
content source, acceptance criteria, wireframe in `specs/mockups/` when
new UI), approved by Carlos, implemented with Cline under `.clinerules`.
A phase is DONE only when its acceptance criteria pass: TS strict clean,
AA contrast, prefers-reduced-motion, responsive to 360px, all copy from
`/content` dictionaries.

**Sources of truth:** El Libro de Escala v2.2 (`docs/el-libro-de-escala-v2.2.md`) ·
Website Content & Design Spec v1.1.1 (`docs/escala-web-content-spec-v1.1.1.md`) ·
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
- ☑ 2.2 `/que-hacemos` — 5 service lines problem-first + "¿Encajamos?"
  (Ch. 11–12). ServiceFig × 5 variants, ServiceRow, IdealClientNote. 366 tests.
- ☑ 2.3 `/casos-de-exito` + shared case template (data-driven) +
  MAGUPELL (data-forward) + BioZero (capability-forward). Real logos from
  `app/assets/brand/*.png`. 6 new components (CaseCard, BrandHeader,
  ReadoutStrip, DossierField, CapabilityGrid, CaseDossier). 450 tests. SPEC-P2.3.
- ☑ 2.4 `/modelo-de-alianza` — AllianceConstellation (parameterized compact/large),
  AlliancePlanes (3 cols, highlighted middle), CommitmentsBand (5 cells, A MEDIDA framing),
  AlliancePage. 518 tests. SPEC-P2.4.
- ☑ 2.5 `/sobre-escala` — DNA, values, manifesto (10 beliefs), anonymized experience,
  colivares.com text mention (Ch. 1–4). GridBackground reusable primitive. CeremonialHeader
  + DnaBlock + ValuesList + ExpertiseGrid (6 micro-figs) + Manifesto (10 strata plates).
  596 tests. SPEC-P2.5.
- ☑ 2.6 `/contacto` page + contact backend (Phase 3 folded in) — Full-viewport two-column
  immersive page (invitation/affinity-filter left · dossier form right). `ContactForm` upgraded:
  variants (section/dossier), fetch→/api/contact, honeypot, loading/success/error states.
  `ContactSuccess` extracted as reusable component. API route with server validation,
  honeypot (silent 200), in-memory rate limit (5/min, TODO(P6) durable). `lib/email.ts`
  provider abstraction (Resend, DRY_RUN mode). Gmail server-only (env). `.env.example`.
  630 tests. SPEC-P2.6.
- ☑ 2.7 Link audit — all internal links via ROUTES.*/getPath(), no hardcoded strings.
  «Hablemos» CTA → /contacto (was #contacto). IdealClientNote → /contacto.
  Legal links tracked for Phase 4. `docs/link-audit.md` produced. SPEC-P2.6 FR-8.
Each page ships with its own spec; new compositions (case template,
manifesto) get a wireframe first.
**Exit criteria per page:** matches its spec section, deployed locally,
navigation and footer links live.

## PHASE 2 complete ☑ — All interior pages shipped. Phase 3 contact backend folded into 2.6.

## PHASE 3 — Contact, end to end
Status: ☑ (folded into Phase 2.6)
- ☑ `/contacto` page reusing ContactForm (with new dossier variant). SPEC-P2.6.
- ☑ API route: server-side validation, Resend provider, honeypot, in-memory rate limit.
- ☑ Success/error/loading states per spec. ContactSuccess reusable component.
- ☑ hola@escaladigitalventures.com confirmed as public address. Gmail server-only.
- ☐ Real email delivery — requires provider API key + domain DNS (Phase 6).
  DRY_RUN mode active locally (EMAIL_API_KEY empty → logs instead of sends).
**Exit criteria:** ✅ Code complete. One env-flip from live delivery (Phase 6).

## PHASE 4 — Legal & analytics
Status: ☑ done (SPEC-P4)
- ☑ `/aviso-legal` (LSSI-CE: 5 sections, placeholders for unconfirmed data — Carlos to fill before go-live).
- ☑ `/privacidad` (RGPD: 6 sections, no-tracking-cookies statement, AEPD reference).
- ☑ Cookieless analytics — **DROPPED** (Carlos's decision: no analytics, no banner needed).
- ☑ 404 page with the identity (abisal + GridBackground + kit micro-diagram + «Fuera del sistema.»).
- ☑ Favicon set (`app/icon.svg` — draft, Carlos to approve before launch).
- ☑ OG image (`app/opengraph-image.tsx` — 1200×630, abisal + claim + ambre).
- ☑ Placeholder guard (`lib/placeholders.ts` + tests).
- ☑ Footer legal links + RGPD consent link now resolve to real pages.
**Exit criteria:** ✅ Code complete. Legal pages require advisor review + placeholder resolution before go-live.

## PHASE 5 — EN & CA content
Status: ☑ done (SPEC-P5)
- ☑ Full EN + CA dictionaries delivered: all 10 page dictionaries + shared + cases data.
  Claims recrafted per Appendix A ("We automate your business. We scale with you." /
  «Automatitzem el teu negoci. Escalem amb tu.»). Glossary: `docs/i18n-glossary.md`.
- ☑ `getDictionary()` forked into ES/EN/CA bundles — no more fallback re-exports.
- ☑ Coverage guard active: `tests/content/i18n-coverage.test.ts` fails on any
  fallback re-export, key mismatch, placeholder in non-legal EN/CA, or meta identical to ES.
- ☑ Localized 404: pathname-based locale detection (EN/CA/ES).
- ☑ `docs/i18n-glossary.md` + `docs/i18n-qa.md` delivered.
- ☑ 883 tests passing; build clean; TypeScript strict clean.
- ☐ Carlos reviews register of EN + CA (AC-9 — open until sign-off).
- ☐ Legal placeholders resolved before go-live (inherited from Phase 4).
**Exit criteria:** ✅ Code complete. Carlos register review + legal placeholder resolution pending.

## PHASE 6 — Google Cloud infrastructure & domain (kept for the end)
Status: ☑ done (SPEC-P6)
- ☑ Dockerfile (`output: "standalone"`, multi-stage, non-root, PORT 8080, linux/amd64).
- ☑ `.dockerignore` — lean build context, no secrets.
- ☑ `next.config.mjs` — `output: "standalone"` + `X-Robots-Tag: noindex` for dev env.
- ☑ `.github/workflows/deploy.yml` — CI (lint + typecheck + test:coverage ≥70%) → build image → push to Artifact Registry → auto-deploy dev → manual-approval prod (GitHub Environment "production").
- ☑ `docs/infra-runbook.md` — step-by-step interactive setup (13 steps, every Carlos-input point marked).
- ☑ `docs/infra-decisions.md` — 12 architecture decisions with rationale.
- ☑ GCP project `escala-dv-web` created, billing linked, 5 APIs enabled, Artifact Registry EU created.
- ☑ Deployer SA `escala-deployer` + WIF keyless auth (GitHub→GCP, no JSON keys).
- ☑ Secret Manager: CONTACT_TO, CONTACT_FROM, EMAIL_API_KEY (placeholder).
- ☑ Dev service `escala-web-dev` deployed (IAM-gated, noindex, DRY_RUN). Verified: / → 200, /en → 200, /que-hacemos → 200, /unknown → 404.
- ☑ Prod service `escala-web-prod` deployed (scale-to-zero, max 4).
- ☑ GitHub Actions variables (7) + "production" environment with manual approval gate.
- ☑ Budget alert €10/month created.
- ☑ `app/[[...path]]/page.tsx` — `dynamicParams=true` (Next.js 16 SSR on-demand; notFound() guards unknown paths).
- ☐ Domain mapping for prod (deferred: requires Google Search Console TXT verification to propagate — retry after 15-30 min, then run `gcloud beta run domain-mappings create`). DNS switch = Phase 7.
- ☐ Resend account + domain verification + email test (deferred). (Runbook Step 13)
- ☐ Google Workspace MX + DNS records at GoDaddy (deferred). (Runbook Step 11)
**Exit criteria:** ✅ Push to main reaches dev automatically; prod deploys only on approval. Dev verified live. Only domain mapping + email deferred to Phase 7.

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
