# Requirements Traceability

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [CHANGELOG](./CHANGELOG.md)

Source: `docs/escala-web-content-spec-v1.1.1.md` (version 1.1.1, August 2026). Every requirement from the spec is listed here with its implementation status.

Legend: ✅ Done · 🚧 In progress · ⬜ Not started · 🚫 Out of scope v1

---

## §1 — Purpose and constraints

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-1.1 | Corporate website, not infinite landing; navigable URLs | ✅ | Next.js App Router with named routes |
| R-1.2 | Languages: ES (default), EN, CA | ✅ | Routing + locale-switcher done (Phase 1). EN/CA serve ES fallback until Phase 5 translations. |
| R-1.3 | Next.js App Router + TypeScript strict + Tailwind | ✅ | Exact stack in use |
| R-1.4 | SSG for all pages | ✅ | `dynamicParams = false` + `generateStaticParams` enforces full SSG; verified with `npm run build` (all routes ○) |
| R-1.5 | Google Cloud Run (dev + prod), CI/CD GitHub Actions | ✅ | SPEC-P6 — Dockerfile, GitHub Actions CI/CD, Cloud Run services (dev+prod), WIF keyless auth, Secret Manager. Runbook: `docs/infra-runbook.md`. GCP bootstrap requires Carlos to run the interactive steps. |
| R-1.6 | Architecture allows `/insights` without restructuring | ✅ | App Router supports adding routes without touching existing ones |
| R-1.7 | Editorial: never name former employers | ✅ | Copy uses anonymized formulas throughout |
| R-1.8 | Founder trajectory not on this site | ✅ | Footer mentions `colivares.com` as plain text, no `<a>` |
| R-1.9 | Case studies use real names (Magupell, BioZero) | ✅ | Both in `content/data/cases.ts`. Spelling fixed to "Magupell" (SPEC-CASE-01). |
| R-1.10 | Voice: direct, confident, business before technology | ✅ | All ES copy reviewed |

## §2 — Brand foundation

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-2.1 | 9 approved key claims — use verbatim in ES | ✅ | Claims 1–4 in `sharedContent.claims` marquee; remainder in page copy |
| R-2.2 | Magupell proof points: verified figures, live Jul 2026, billing summaries | ✅ | Superseded by verified data (SPEC-POLISH-03 home; SPEC-CASE-01 case page): 167→216 reqs, 1.803/1,803 tests, 4 roles, 3 environments. `100+`/`200+`/invoicing retired — never state the platform issues invoices. |
| R-2.3 | BioZero: v1 delivered, AI vision, clinical records, gamification | ✅ | In `content/es/clients.ts` |
| R-2.4 | 20+ years experience, MIT certification (anonymized) | ✅ | Referenced in `/sobre-escala` (Phase 2.5) — anonymized per Libro Ch. 19 |

## §3 — Visual identity

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-3.1 | Design principle: "El instrumento de medida" | ✅ | Identity implemented throughout |
| R-3.2 | Calibrated rule as signature element | ✅ | `PhaseCycle` ring, `Readout` sparklines, CSS tick marks |
| R-3.3 | 4 color tokens: `--paper`, `--ink`, `--mar`, `--calibre` | ✅ | Tokens in `:root`; note: `--calibre` = `--ambre` + `--abisal` per DECISIONS.md |
| R-3.4 | Typography: Archivo (display), Instrument Sans (body), IBM Plex Mono (labels) | ✅ | All 3 via `next/font` in `layout.tsx` |
| R-3.5 | Fluid type scale with clamp() | ✅ | `--text-display-xl`, `--text-display-lg`, `--text-figure` in `:root` |
| R-3.6 | 12-column grid, max-width 1200px | ✅ | `--content-max: 88rem`, 12-col hero grid |
| R-3.7 | Asymmetric hero (columns 1–7 / 6–12) | ✅ | `hero__claim: grid-column 1/8`, `hero__diagram: 8/13` |
| R-3.8 | Border radius ≤ 2px | ✅ | Only `border-radius: 2px` used (form inputs, buttons) |
| R-3.9 | No photography (v1), no gradients, no glassmorphism | ✅ | No images; radial gradient only in dark framework section (approved) |
| R-3.10 | Motion: one orchestrated hero rule draw-in + hover states | ✅ | `WordReveal` + diagram assembly animations |
| R-3.11 | `prefers-reduced-motion` fully respected | ✅ | CSS media query + JS check in all animated components |
| R-3.12 | WCAG AA contrast, visible keyboard focus | ✅ | 2px `--ambre` focus outline; skip link |

## §4 — Site architecture and i18n

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-4.1 | All pages with localized routes per table | ✅ | Route map complete (10 pages × 3 locales); all pages rendered Phase 1–4. |
| R-4.2 | Locale segment routing, single slug map in `lib/i18n/routes.ts` | ✅ | `lib/i18n/routes.ts` — full `ROUTE_MAP` per spec §4.1; `getPath`/`resolvePath`/`getAlternates`; tested (61 tests) |
| R-4.3 | `hreflang` alternates + `x-default` on every page | ✅ | `generateMetadata` emits canonical + hreflang es/en/ca + x-default→ES on every rendered page; sitemap includes `alternates.languages` |
| R-4.4 | Locale switcher preserves current page | ✅ | `LocaleSwitcher` built via `getAlternates(currentPage, params)`; `aria-current`; keyboard operable (SPEC-P1 FR-5) |
| R-4.5 | Header nav: 5 items + Hablemos button + locale switcher | ✅ | `sharedContent.header.nav` (5 items) + contact CTA + ES/EN/CA |
| R-4.6 | Footer: claim, nav, legal links, company line, colivares.com (no link) | ✅ | `sharedContent.footer` — legal links now resolve to real pages (Phase 4) |
| R-4.7 | All page copy in typed dictionaries; no hardcoded strings | ✅ | All copy in `content/es/`; no inline strings in components |

## §5 — Page-by-page

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-5.1 | Home `/` — 7 sections (Hero → FinalCTA) | ✅ | All 7 sections implemented |
| R-5.1a | Hero: approved eyebrow, H1, subheading, 2 CTAs, rule animation | ✅ | `WordReveal` H1, `SystemDiagram` hero plate |
| R-5.1b | ProblemSection: H2, body, symptom list, diagram | ✅ | |
| R-5.1c | ServicesPreview: 5 service cards + link | ✅ | |
| R-5.1d | FrameworkStrip: PhaseCycle 10 phases + section title | ✅ | Interactive ring on desktop, static list on mobile |
| R-5.1e | ProofSection: Magupell readouts + 2 CaseStudyCards | ✅ | `Readout` ×6 (SPEC-POLISH-03 verified figures), `ClientChip` ×2 |
| R-5.1f | AllianceTeaser: H2, body, constellation diagram | ✅ | |
| R-5.1g | FinalCTA: H2, body, ContactForm | ✅ | |
| R-5.2 | Qué hacemos `/que-hacemos` | ✅ | SPEC-P2.2 — ServiceFig (5 variants), ServiceRow, IdealClientNote. All 3 locale slugs. 366 tests. |
| R-5.3 | Cómo trabajamos `/como-trabajamos` | ✅ | SPEC-P2.1 — PhaseCycle reuse, ExecutionPractices (5), AiBuildBlock. SPEC-POLISH-06 — Framework moved to last section (E), closed execution-cycle FIG.06 (`ExecutionCycleFig`), layered "how we build" FIG.12 (`HowWeBuildFig`), re-lettered A–E. All 3 locale slugs. |
| R-5.4 | Casos de éxito index + Magupell + BioZero | ✅ | SPEC-P2.3 — CaseCard, BrandHeader, CaseDossier. All 3 locale slugs. **SPEC-CASE-01** rewrote the Magupell dossier onto a canonical `CaseReadoutGrid` + `CaseNarrative` template (verified figures, 2 new sections, 2 new figures, no invoicing language, "Magupell" spelling fixed) and migrated BioZero's rendering onto the same template (copy unchanged). |
| R-5.5 | Modelo de alianza `/modelo-de-alianza` | ✅ | SPEC-P2.4 — AllianceConstellation, AlliancePlanes, CommitmentsBand. All 3 locale slugs. |
| R-5.6 | Sobre Escala `/sobre-escala` | ✅ | SPEC-P2.5 — CeremonialHeader, DnaBlock, ValuesList, ExpertiseGrid, Manifesto. All 3 locale slugs. |
| R-5.7 | Contacto `/contacto` — form + API | ✅ | SPEC-P2.6 — ContactForm (dossier variant), ContactSuccess, API route, rate limit, honeypot. All 3 locale slugs. |
| R-5.8 | Aviso legal `/aviso-legal`, Privacidad `/privacidad` | ✅ | SPEC-P4 — LegalDoc + AnchorNav, 5/6 LSSI-CE/RGPD sections, placeholders for unconfirmed data. All 3 locale slugs. |
| R-5.8a | Cookieless analytics (no cookie banner needed) | 🚫 | SPEC-P4 §0: Carlos decided no analytics. No banner needed. ANALYTICS-01 dropped. |
| R-5.9 | 404 page — identity-branded | ✅ | SPEC-P4 FR-5 — `app/not-found.tsx`: abisal + GridBackground + kit micro-diagram + «Fuera del sistema.» |

## §6 — Design system

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-6.1 | Tokens exposed as CSS variables + Tailwind theme | ✅ | `:root` tokens + `@theme inline` bridge |
| R-6.2 | Button primitives (solid `--mar`, ink outline, link) | ✅ | `.primary-link`, `.text-link`, `.header-cta` |
| R-6.3 | `ScaleRule` / `PhaseCycle` — ring + interactive phases | ✅ | `phase-cycle.tsx` |
| R-6.4 | `Readout` — instrument-style figure with sparkline | ✅ | `readout.tsx` |
| R-6.5 | `CaseStudyCard` — eyebrow, title, impact, readout row | ✅ | `client-chip.tsx` (simplified v1 version) |
| R-6.6 | `SiteHeader` + `SiteFooter` | ✅ | `site-chrome.tsx`. SPEC-POLISH-07: nav raised to 0.80rem with `·` separators, dimensioned brand slot, and a full-screen mobile menu (`components/mobile-menu.tsx`) below 1024px replacing the previous no-nav dead end on mobile. |
| R-6.7 | `/styleguide` route (noindex) | ✅ | `app/styleguide/page.tsx`; Phase 4 added section 11 "Legal Doc" — LegalDoc + AnchorNav |

## §7 — i18n content workflow

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-7.1 | ES is master; EN/CA are professional-register translations | ✅ | ES master + all stubs complete; `content/en/*` and `content/ca/*` re-export ES with `TODO(P5)` markers |
| R-7.2 | Carlos reviews all EN/CA copy before launch | ⬜ | Pre-condition for Phase 5 translations |
| R-7.3 | Localized metadata per page (title ≤60, desc ≤155) | ✅ | SEO-01 §3: all 27 metas + 6 case metas rewritten. Limits now enforced on the **rendered** title (`tests/lib/seo/page-meta.test.ts`) after the double-brand template bug; `tests/lib/i18n/meta.test.ts` retained |
| R-7.4 | `sitemap.xml` with all alternates | ✅ | `app/sitemap.ts` — 33 URLs; SEO-01 §7.2 added `x-default` + content-derived `lastmod` |
| R-7.5 | `robots.txt` | ✅ | `app/robots.ts` — SEO-01 §7.1: 12 AI/search crawlers named explicitly; `/api/` + `/styleguide` disallowed |
| R-7.6 | Structured data (JSON-LD) | ✅ | SEO-01 §6: one server-rendered `@graph` per page — `lib/seo/`, `components/json-ld.tsx`; validated by `tests/lib/seo/{schema,page-graph}.test.ts` |
| R-7.7 | Q&A blocks for AI/answer-engine discoverability | ✅ | SEO-01 §5: `FaqBlock` on `/que-hacemos`, `/como-trabajamos`, `/modelo-de-alianza` × 3 locales; always expanded, in server-rendered HTML |
| R-7.8 | `/llms.txt` machine summary | ✅ | SEO-01 §7.5: `app/llms.txt/route.ts` + `lib/seo/llms-txt.ts`, served `text/plain` |
| R-7.9 | Single canonical host (`www`↔apex, `http`→`https`) | 🟢 | **LIVE on `www` (15 Aug 2026).** `https://www.escaladigitalventures.com` serves the site over HTTP/2 with the full security-header set; Cloud Run mapping `✔`. Canonical host is `www` (CNAME→`ghs.googlehosted.com`, survives Google IP rotation); `SITE_URL`/Dockerfile ARG/`deploy.yml` build-arg all emit `www`; apex→www 308 in `next.config.mjs`. **Apex TLS still provisioning** — its mapping had exceeded the readiness deadline while DNS was parked and fell back to a 24 h retry, so it was deleted and recreated (15 Aug 08:47) to reset the state machine; retry interval now 01:00. Apex already reaches Google (`x-cloud-trace-context` on `:80`), so only the managed cert is outstanding. SEO-01 §7.4 / AC-17 |
| R-7.10 | Search Console + Bing Webmaster verification | ⬜ | **Blocked on DNS switch.** SEO-01 §9; DNS-TXT verified, cookieless, no analytics |

## §8 — SEO, analytics, performance

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-8.1 | SSG for every page | ✅ | `dynamicParams = false`; all rendered routes are `○ (Static)` in build output |
| R-8.2 | OG image with identity | ✅ | **BRAND-01 Z5** — real brand OG artwork at `app/opengraph-image.png` (1200×630), replacing the generated `app/opengraph-image.tsx`. One text-free image serves all three locales (§7). Emitted via `OG_IMAGE` in `lib/constants/seo.ts`, **not** the file convention: `app/opengraph-image.*` cannot reach the optional catch-all `app/[[...path]]/`, which is why `og:image` had never actually rendered. Verified live on es/en/ca. |
| R-8.3 | Structured data: `Organization` + `BreadcrumbList` | ⬜ | BACKLOG: SEO-01 (Phase 7) |
| R-8.4 | Cookieless analytics | 🚫 | Dropped by Carlos decision (SPEC-P4 §0). No analytics, no banner. |
| R-8.5 | Lighthouse ≥ 95 all categories | ⬜ | BACKLOG: PERF-01 (Phase 7) |
| R-8.6 | Fonts self-hosted, zero third-party scripts | ✅ | `next/font` for all 3 typefaces |
| R-8.7 | Favicon set | ✅ | **BRAND-01 Z5** — real `app/favicon.ico` (multi-size ICO) + `public/brand/favicon-{16,32,48,96,192,512}.png` + `apple-touch-icon.png` (180×180, full bleed, not pre-rounded). Draft `app/icon.svg` deleted. No PWA manifest created — none existed (§7/§10), so `maskable-*` stay unreferenced. |
