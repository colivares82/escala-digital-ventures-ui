# Requirements Traceability

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [BACKLOG](./BACKLOG.md) · [CHANGELOG](./CHANGELOG.md)

Source: `docs/escala-web-content-spec-v1.1.md` (version 1.1, August 2026). Every requirement from the spec is listed here with its implementation status. Phase 1 completed March 2026 (see CHANGELOG.md).

Legend: ✅ Done · 🚧 In progress · ⬜ Not started · 🚫 Out of scope v1

---

## §1 — Purpose and constraints

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-1.1 | Corporate website, not infinite landing; navigable URLs | ✅ | Next.js App Router with named routes |
| R-1.2 | Languages: ES (default), EN, CA | ✅ | Routing + locale-switcher done (Phase 1). EN/CA serve ES fallback until Phase 5 translations. |
| R-1.3 | Next.js App Router + TypeScript strict + Tailwind | ✅ | Exact stack in use |
| R-1.4 | SSG for all pages | ✅ | `dynamicParams = false` + `generateStaticParams` enforces full SSG; verified with `npm run build` (all routes ○) |
| R-1.5 | Google Cloud Run (dev + prod), CI/CD GitHub Actions | ⬜ | Not yet configured |
| R-1.6 | Architecture allows `/insights` without restructuring | ✅ | App Router supports adding routes without touching existing ones |
| R-1.7 | Editorial: never name former employers | ✅ | Copy uses anonymized formulas throughout |
| R-1.8 | Founder trajectory not on this site | ✅ | Footer mentions `colivares.com` as plain text, no `<a>` |
| R-1.9 | Case studies use real names (MAGUPELL, BioZero) | ✅ | Both in `content/es/clients.ts` |
| R-1.10 | Voice: direct, confident, business before technology | ✅ | All ES copy reviewed |

## §2 — Brand foundation

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-2.1 | 9 approved key claims — use verbatim in ES | ✅ | Claims 1–4 in `sharedContent.claims` marquee; remainder in page copy |
| R-2.2 | MAGUPELL proof points: 100+ reqs, 200+ tests, live Jul 2026, invoicing | ✅ | Readouts in `homeContent.proof.figures` |
| R-2.3 | BioZero: v1 delivered, AI vision, clinical records, gamification | ✅ | In `content/es/clients.ts` |
| R-2.4 | 20+ years experience, MIT certification (anonymized) | ⬜ | Referenced in spec §5.6; Sobre Escala page not yet built |

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
| R-4.1 | All pages with localized routes per table | 🚧 | Route map complete (10 pages × 3 locales); only home×3 rendered in Phase 1. Interior pages (Phase 2) use the same architecture. |
| R-4.2 | Locale segment routing, single slug map in `lib/i18n/routes.ts` | ✅ | `lib/i18n/routes.ts` — full `ROUTE_MAP` per spec §4.1; `getPath`/`resolvePath`/`getAlternates`; tested (61 tests) |
| R-4.3 | `hreflang` alternates + `x-default` on every page | ✅ | `generateMetadata` emits canonical + hreflang es/en/ca + x-default→ES on every rendered page; sitemap includes `alternates.languages` |
| R-4.4 | Locale switcher preserves current page | ✅ | `LocaleSwitcher` built via `getAlternates(currentPage, params)`; `aria-current`; keyboard operable (SPEC-P1 FR-5) |
| R-4.5 | Header nav: 5 items + Hablemos button + locale switcher | ✅ | `sharedContent.header.nav` (5 items) + contact CTA + ES/EN/CA |
| R-4.6 | Footer: claim, nav, legal links, company line, colivares.com (no link) | ✅ | `sharedContent.footer` |
| R-4.7 | All page copy in typed dictionaries; no hardcoded strings | ✅ | All copy in `content/es/`; no inline strings in components |

## §5 — Page-by-page

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-5.1 | Home `/` — 7 sections (Hero → FinalCTA) | ✅ | All 7 sections implemented |
| R-5.1a | Hero: approved eyebrow, H1, subheading, 2 CTAs, rule animation | ✅ | `WordReveal` H1, `SystemDiagram` hero plate |
| R-5.1b | ProblemSection: H2, body, symptom list, diagram | ✅ | |
| R-5.1c | ServicesPreview: 5 service cards + link | ✅ | |
| R-5.1d | FrameworkStrip: PhaseCycle 10 phases + section title | ✅ | Interactive ring on desktop, static list on mobile |
| R-5.1e | ProofSection: MAGUPELL readouts + 2 CaseStudyCards | ✅ | `Readout` ×4, `ClientChip` ×2 |
| R-5.1f | AllianceTeaser: H2, body, constellation diagram | ✅ | |
| R-5.1g | FinalCTA: H2, body, ContactForm | ✅ | |
| R-5.2 | Qué hacemos `/que-hacemos` | ⬜ | BACKLOG: PAGE-01 |
| R-5.3 | Cómo trabajamos `/como-trabajamos` | ⬜ | BACKLOG: PAGE-02 |
| R-5.4 | Casos de éxito index + MAGUPELL + BioZero | ⬜ | BACKLOG: PAGE-03 |
| R-5.5 | Modelo de alianza `/modelo-de-alianza` | ⬜ | BACKLOG: PAGE-04 |
| R-5.6 | Sobre Escala `/sobre-escala` | ⬜ | BACKLOG: PAGE-05 |
| R-5.7 | Contacto `/contacto` — form + API | ⬜ | BACKLOG: CONTACT-01 + PAGE-06 |
| R-5.8 | Aviso legal, Privacidad | ⬜ | BACKLOG: PAGE-07 |
| R-5.8a | Cookieless analytics (no cookie banner needed) | ⬜ | BACKLOG: ANALYTICS-01 |

## §6 — Design system

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-6.1 | Tokens exposed as CSS variables + Tailwind theme | ✅ | `:root` tokens + `@theme inline` bridge |
| R-6.2 | Button primitives (solid `--mar`, ink outline, link) | ✅ | `.primary-link`, `.text-link`, `.header-cta` |
| R-6.3 | `ScaleRule` / `PhaseCycle` — ring + interactive phases | ✅ | `phase-cycle.tsx` |
| R-6.4 | `Readout` — instrument-style figure with sparkline | ✅ | `readout.tsx` |
| R-6.5 | `CaseStudyCard` — eyebrow, title, impact, readout row | ✅ | `client-chip.tsx` (simplified v1 version) |
| R-6.6 | `SiteHeader` + `SiteFooter` | ✅ | `site-chrome.tsx` |
| R-6.7 | `/styleguide` route (noindex) | ✅ | `app/styleguide/page.tsx`; Phase 1 added section 05 "Plantilla de página" — `PageHeader` both surfaces + FinalCTA (AC-8) |

## §7 — i18n content workflow

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-7.1 | ES is master; EN/CA are professional-register translations | ✅ | ES master + all stubs complete; `content/en/*` and `content/ca/*` re-export ES with `TODO(P5)` markers |
| R-7.2 | Carlos reviews all EN/CA copy before launch | ⬜ | Pre-condition for Phase 5 translations |
| R-7.3 | Localized metadata per page (title ≤60, desc ≤155) | ✅ | `generateMetadata` per page in catch-all; limits enforced by `tests/lib/i18n/meta.test.ts` (42 tests) |
| R-7.4 | `sitemap.xml` with all alternates | ✅ | `app/sitemap.ts` — built pages × locales with `alternates.languages`; extends as Phase 2 adds pages |
| R-7.5 | `robots.txt` | ✅ | `app/robots.ts` — allow `/`; disallow `/styleguide`; references sitemap |

## §8 — SEO, analytics, performance

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| R-8.1 | SSG for every page | ✅ | `dynamicParams = false`; all rendered routes are `○ (Static)` in build output |
| R-8.2 | OG image with identity | ⬜ | BACKLOG: SEO-01 |
| R-8.3 | Structured data: `Organization` + `BreadcrumbList` | ⬜ | BACKLOG: SEO-01 |
| R-8.4 | Cookieless analytics | ⬜ | BACKLOG: ANALYTICS-01 |
| R-8.5 | Lighthouse ≥ 95 all categories | ⬜ | BACKLOG: PERF-01 |
| R-8.6 | Fonts self-hosted, zero third-party scripts | ✅ | `next/font` for all 3 typefaces |
