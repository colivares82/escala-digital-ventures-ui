# Progress

## What works ✅

| Feature | Status |
|---------|--------|
| Spanish home page (`/`) | Complete, approved |
| Hero section with WordReveal H1 + FIG.01 system diagram | Complete |
| ProblemSection with symptom list + FIG.02 diagram | Complete |
| ServicesPreview (5 service lines, editorial index) | Complete |
| FrameworkSection — `PhaseCycle` scroll-driven ring (desktop) + static list (mobile/reduced-motion) | Complete |
| ProofSection — 4 DAT readouts + 2 ClientChips (MAGUPELL, BioZero) | Complete |
| AllianceTeaser — FIG.05 constellation diagram | Complete |
| FinalCTA — ContactForm (browser-only validation, no API) | Complete |
| ClaimsMarquee (ambre band, between hero and problem) | Complete |
| SiteHeader (nav, locale switcher, Hablemos CTA) | Complete |
| SiteFooter (claim, nav, legal, company, colivares.com mention) | Complete |
| Design system: tokens, BEM classes, 3 typefaces, 5 palette colors | Complete |
| Scroll animations: Lenis, WordReveal, Reveal, DiagramReveal, CountUp | Complete |
| `prefers-reduced-motion` handling | Complete |
| Skip link (WCAG A) | Complete |
| Styleguide route (`/styleguide`, noindex) | Complete |
| Content in typed ES dictionaries — no hardcoded strings | Complete |
| Route + motion constants (`lib/routes.ts`, `lib/motion-constants.ts`) | Complete |
| All internal links use `ROUTES.*` / `ANCHORS.*` — zero inline URL strings | Complete |
| Security headers in `next.config.mjs` | Complete |
| Vitest + RTL test suite — 138 tests, 100% pass | Complete |
| Coverage: statements 94%, branches 84%, functions 98%, lines 98% | Complete |
| 70% coverage threshold enforced by `@vitest/coverage-v8` | Complete |
| `next build` clean — 3 static pages generated | Complete |
| `docs/` taxonomy (ARCHITECTURE, BACKLOG, CHANGELOG, TRACEABILITY) | Complete |
| `docs/el-libro-de-escala-v2.1.md` — Libro v2.1 in repo | Complete |
| `docs/escala-web-content-spec-v1.1.md` — Spec v1.1 in repo | Complete |
| `PLAN.md` at repo root — phase tracking (Phase 0 done) | Complete |
| `memory-bank/` — all six core files updated | Complete |
| Russian removed from all codebase files | Complete |

## What works ✅ — Phase 1 additions

| Feature | Status |
|---------|--------|
| `lib/i18n/types.ts` — Locale, PageId, CaseSlug types | Complete |
| `lib/i18n/routes.ts` — route map (10 pages × 3 locales); getPath/resolvePath/getAlternates | Complete |
| `lib/i18n/dictionary.ts` — getDictionary(locale) typed bundle | Complete |
| `lib/config.ts` — SITE_URL env-aware | Complete |
| `content/types.ts` — page dictionary interfaces | Complete |
| `content/data/cases.ts` — locale-aware case study data | Complete |
| `content/es/` — all 10 page dictionaries (home full; stubs with meta for others) | Complete |
| `content/en/*` + `content/ca/*` — re-exports with TODO(P5) markers | Complete |
| `app/[[...path]]/page.tsx` — catch-all; home × 3 locales rendered; others 404 | Complete |
| `app/sitemap.ts` — home × 3 locales with hreflang alternates | Complete |
| `app/robots.ts` — allow `/`; disallow `/styleguide` | Complete |
| `components/locale-switcher.tsx` — page-preserving, accessible, IBM Plex Mono | Complete |
| `components/page-header.tsx` — `eyebrow`, `title`, `lead?`, `surface` | Complete |
| `/styleguide` section 05 "Plantilla de página" (AC-8) | Complete (awaiting Carlos approval) |
| `docs/adding-a-page.md` (AC-9) | Complete |
| `specs/spec-phase1-i18n-architecture.md` in repo | Complete |
| 252 tests; coverage ~93% statements; build clean | Complete |

## What works ✅ — Phase 2.1 additions

| Feature | Status |
|---------|--------|
| `/como-trabajamos` at all 3 locale slugs (ES/EN/CA) | Complete |
| `MethodDictionary` full interface (types.ts) | Complete |
| `content/es/method.ts` — verbatim Libro Ch. 7/9 copy | Complete |
| `ExecutionPractices` — 5 sticky panels, mobile fallback | Complete |
| `ExecutionPipelineFig` — FIG.06 provisional, isolated, swappable | Complete |
| `AiBuildBlock` — sober, editorial guardrail enforced | Complete |
| PhaseCycle: `sectionIndex` + optional `action` (no home regression) | Complete |
| Header nav: "Cómo trabajamos" → true route; `aria-current="page"` | Complete |
| Brand link: route-aware (home anchor on home, `/` on interior pages) | Complete |
| Footer nav: "Cómo trabajamos" → true route | Complete |
| BEM styles for all 3 new components + reduced-motion overrides | Complete |
| `/styleguide` section 06: 3 new components | Complete |
| 291 tests, 21 files — all passing (39 new tests added) | Complete |
| `docs/adding-a-page.md` — A/B/C interior index convention | Complete |
| `PLAN.md` Phase 2.1 marked ☑ | Complete |

## What works ✅ — Phase 2.2 additions

| Feature | Status |
|---------|--------|
| `/que-hacemos` at all 3 locale slugs (ES/EN/CA) | Complete |
| `ServicesDictionary` full interface + `ServiceFigVariant` type (types.ts) | Complete |
| `content/es/services.ts` — verbatim Libro Ch. 11/12 copy | Complete |
| `ServiceFig` — ONE component, 5 isolated variants (FIG.07–11 DRAFT) | Complete |
| `ServiceRow` — three-column grid, `--ambre-dk` problem line, mobile stack | Complete |
| `IdealClientNote` — abisal band, Ch. 12 body, CTA interim `#contacto` | Complete |
| `--ambre-dk` token (#b85c00) in `:root`; DECISIONS.md entry | Complete |
| Header nav: "Qué hacemos" → true route `/que-hacemos` | Complete |
| Footer nav: "Qué hacemos" → true route | Complete |
| BEM styles + responsive + reduced-motion overrides | Complete |
| `/styleguide` section 07: all 5 ServiceFig variants + ServiceRow + IdealClientNote | Complete |
| 366 tests, 24 files — all passing (75 new tests added) | Complete |
| `PLAN.md` Phase 2.2 marked ☑ | Complete |

## What works ✅ — Phase 2.3 additions

| Feature | Status |
|---------|--------|
| `/casos-de-exito` index at all 3 locale slugs (ES/EN/CA) | Complete |
| `/casos-de-exito/magupell` at all 3 locale slugs | Complete |
| `/casos-de-exito/biozero` at all 3 locale slugs | Complete |
| `CaseStudy` full model (mode, brand + StaticImageData logo, readouts, capabilities?, fields, meta) | Complete |
| `content/data/cases.ts` — `getCase(slug)` helper | Complete |
| `CasesDictionary` interface extended (types.ts) | Complete |
| `content/es/cases.ts` — full ES dictionary | Complete |
| `ReadoutStrip` — adaptive columns (2 or 4) via CSS var | Complete |
| `DossierField` — two-column case-file field | Complete |
| `CapabilityGrid` — 3-up grid; null guard for data-forward | Complete |
| `BrandHeader` — real logo (next/image) + placeholder state + visit link | Complete |
| `CaseCard` — index-page card; `getPath` for locale-correct URL | Complete |
| `CaseDossier` — single mode-aware template (data-forward / capability-forward) | Complete |
| `CasesPage` — index compositor | Complete |
| Real logos from `app/assets/brand/*.png` (static import, build-time check) | Complete |
| Header nav: "Casos de éxito" → true route `/casos-de-exito` | Complete |
| Footer nav: "Casos de éxito" → true route | Complete |
| `generateStaticParams` +9 entries | Complete |
| `generateMetadata` — per-case detail meta from `CaseStudy.meta` | Complete |
| sitemap: 3 new page entries | Complete |
| BEM CSS + responsive (≤767px / ≤479px) + styleguide section 08 | Complete |
| 450 tests, 31 files — all passing (84 new tests added) | Complete |
| `PLAN.md` Phase 2.3 marked ☑ | Complete |

## What works ✅ — Phase 2.4 additions

| Feature | Status |
|---------|--------|
| `/modelo-de-alianza` at all 3 locale slugs (ES/EN/CA) | Complete |
| `AllianceDictionary` full interface + types (AllianceSeat, AlliancePlane, AllianceCommitment) | Complete |
| `content/es/alliance.ts` — full ES copy; commitment 01 = "A MEDIDA" (§0 corrected) | Complete |
| `AllianceConstellation` — parameterized (compact/large), pentagon geometry, draw-on-scroll animation | Complete |
| `AlliancePlanes` — 3 columns, middle ambre highlight, PLANO labels, depth lines | Complete |
| `CommitmentsBand` — 5 cells, ambre-dk tags (AA), ambre ticks | Complete |
| `AlliancePage` compositor | Complete |
| `generateStaticParams` +3; `BUILT_PAGES` + render branch | Complete |
| Sitemap +1 page × 3 locales | Complete |
| Nav + footer links → `/modelo-de-alianza` (was `/#alianza`) | Complete |
| `FinalCTA` prop widened to `FinalCtaContent` structural interface | Complete |
| Phase 2.4 BEM CSS + responsive ≤767px + reduced-motion | Complete |
| `/styleguide` section 09 (both constellation sizes + planes + band) | Complete |
| 518 tests, 35 files — all passing (68 new tests added) | Complete |
| `PLAN.md` Phase 2.4 marked ☑ | Complete |

## What works ✅ — Phase 2.6 additions (+ Phase 2.7 link audit)

| Feature | Status |
|---------|--------|
| `/contacto` at all 3 locale slugs (ES/EN/CA) | Complete |
| `ContactDictionary` full interface + `contactContent` ES dict | Complete |
| `ContactForm` upgraded: variant prop, honeypot, fetch, loading/success/apiError | Complete |
| `ContactSuccess` reusable confirmation card (section/dossier variants) | Complete |
| `FinalCTA` home parity — same backend, same success card | Complete |
| `app/api/contact/route.ts` — POST, rate limit, honeypot, validation | Complete |
| `lib/email.ts` — Resend abstraction, DRY_RUN, reply-to = visitor | Complete |
| `.env.example` — all 7 env vars documented | Complete |
| `generateStaticParams` +3; `BUILT_PAGES` + render branch | Complete |
| Sitemap +1 page × 3 locales | Complete |
| Link audit: «Hablemos» → /contacto; IdealClientNote → /contacto | Complete |
| `docs/link-audit.md` produced | Complete |
| Phase 2.6 CSS (contact-page, dossier form, success variants) | Complete |
| 630 tests, 44 files — all passing (+34 new tests) | Complete |
| `PLAN.md` Phase 2 + 2.6 + 2.7 marked ☑ | Complete |

## What works ✅ — Phase 2.5 additions

| Feature | Status |
|---------|--------|
| `/sobre-escala` at all 3 locale slugs (ES/EN/CA) | Complete |
| `ExpertiseFigVariant` type + `AboutDictionary` full interface (types.ts) | Complete |
| `content/es/about.ts` — full ES copy; Libro Ch. 1/3/4; anonymized per Ch. 19 | Complete |
| `GridBackground` — reusable abisal grid overlay primitive (cross-cutting) | Complete |
| `CeremonialHeader` — oversized H1, mono kicker, brand-document tone | Complete |
| `DnaBlock` — 2-col mission/vision + ambre pull-quote | Complete |
| `ValuesList` — 5 numbered editorial rows with top rules | Complete |
| `ExpertiseGrid` — 3×2 abisal grid + 6 micro-fig SVG variants + tone divider | Complete |
| `Manifesto` — 10 strata plates, ambre bar scaleY reveal, staggered 60ms/plate | Complete |
| `AboutPage` compositor | Complete |
| `generateStaticParams` +3; `BUILT_PAGES` + render branch | Complete |
| Sitemap +1 page × 3 locales | Complete |
| Nav + footer link "Sobre Escala" → `/sobre-escala` (was `/#inicio`) | Complete |
| Phase 2.5 BEM CSS + responsive ≤767/479px + reduced-motion | Complete |
| `/styleguide` section 10 (GridBackground options + CeremonialHeader + ValuesList + ExpertiseGrid + Manifesto) | Complete |
| 596 tests, 42 files — all passing (78 new tests added) | Complete |
| `PLAN.md` Phase 2.5 marked ☑ | Complete |

## What's left ⬜ (ordered by PLAN phases)

### Phase 1 — i18n architecture
| Feature | Priority | Status |
|---------|----------|--------|
| AC-2: Carlos visual parity check on `/` | P0 | Awaiting review |
| AC-8: Carlos approves `/styleguide` sections 05+06 | P0 | Awaiting review |
| AC-10: Lighthouse baseline (deferred — GCP not ready) | P2 | Deferred to Phase 7 |

### Phase 2 — Interior pages
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| ~~Cómo trabajamos `/como-trabajamos`~~ | ✅ Done | PAGE-02 |
| ~~Qué hacemos `/que-hacemos`~~ | ✅ Done | PAGE-01 |
| ~~Casos de éxito index + MAGUPELL + BioZero pages~~ | ✅ Done | PAGE-03 |
| ~~Modelo de alianza `/modelo-de-alianza`~~ | ✅ Done | PAGE-04 |
| ~~Sobre Escala `/sobre-escala`~~ | ✅ Done | PAGE-05 |

### Phase 3 — Contact end-to-end (folded into Phase 2.6)
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| ~~Contact form API + email provider~~ | ✅ Done | CONTACT-01 |
| ~~Contacto dedicated page `/contacto`~~ | ✅ Done | PAGE-06 |

### Phase 4 — Legal & analytics
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Aviso legal + Privacidad legal pages | P1 | PAGE-07 |
| Cookieless analytics (Plausible) | P2 | ANALYTICS-01 |
| 404 page + favicon + OG images | P2 | SEO-01 |

### Phase 5 — EN & CA content
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Full EN + CA dictionaries (recrafted, not translated) | P2 | — |
| hreflang QA across all pages | P2 | I18N-01 |

### Phase 6 — Infra (blocked: GCP not ready)
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Dockerfile + Cloud Run dev + prod | P2 | — |
| GitHub Actions CI/CD (lint + test + build + deploy) | P2 | — |

### Phase 7 — Launch QA
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Lighthouse ≥95 validation | P2 | PERF-01 |
| AA + keyboard audit; real-device responsive pass | P2 | — |
| DNS switch → production live | P2 | — |

## Known issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Contact form — real email delivery inactive | Low | DRY_RUN active (no API key). Phase 6: set EMAIL_API_KEY + verified CONTACT_FROM — zero code change needed. |
| Contact rate limit ephemeral | Low | In-memory rate limit resets on Cloud Run cold-start. TODO(P6): swap to Redis/Upstash. |
| EN/CA locale content stubs only | Low | Expected; stubs warn against silent fallback. Phase 5. |
| GCP / GitHub Actions not configured | Low | Blocked by GCP account. Phase 6. |
| FIG.06 provisional visual | Low | `ExecutionPipelineFig` is fully isolated; Carlos will redesign. Only that file needs to change. |
| ServiceFig figures DRAFT | Low | All five are coherent drafts. Carlos will refine each variant individually. |
| Logo-display permission (BioZero) | Low | Pending Carlos confirmation before go-live (Phase 7 checklist). FR-3.6. |
| Legal links 404 | Low | /aviso-legal + /privacidad links present and correct; pages not built until Phase 4. |
