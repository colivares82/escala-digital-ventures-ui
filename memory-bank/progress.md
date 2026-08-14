# Progress

## What works ✅ — BRAND-01 (brand asset integration)

| Feature | Status |
|---------|--------|
| Z1 desktop header — L02 `paper` lockup, 162×43, fixed size, `@2x` srcset via static import | Complete |
| Z2 mobile menu bar — standalone symbol, no disc/plate; 30×30 box → 26.25×19.38 visible ink | Complete |
| Z3 footer — L05 **`ink`** compact lockup, 180×30, decorative `alt=""`. `ink` not `paper`: the footer is a LIGHT surface, contrary to spec §2 (fixed after live review — luminance 25 vs 247, was 246 vs 247) | Complete |
| Z4 `/sobre-escala` section A — L01 `ink` seal 280×286, `aria-hidden`, vertically centred against the text block (was a fixed padding-top that drifted), → 200×204 below 767px | Complete |
| Z5 — `favicon.ico` (real multi-size ICO) + 6 favicon PNGs + apple-touch 180×180 + OG 1200×630 | Complete |
| Provisional mark gone: `<i>` squares, `.site-brand i` CSS, `{content.brand}` render, `app/icon.svg`, generated `opengraph-image.tsx` | Complete |
| `accessibility.logoAlt` in es/en/ca — the only new copy; i18n coverage guard green | Complete |
| `lib/brand-constants.ts` + `--brand-*` tokens — every size named, zero new colour values | Complete |
| **Fixed: `og:image` + `apple-touch-icon` never emitted** (pre-existing; file convention can't reach the optional catch-all) — now explicit from `lib/constants/seo.ts`, verified live on es/en/ca | Complete |
| `brand-assets-guard` — asset existence + exact pixel sizes, ICO validity, no hardcoded alt/colour, no PWA manifest, unused variants unreferenced, **variant↔surface pairing derived from `globals.css`** (mutation-tested: fails when the invisible-logo bug is reintroduced) | Complete |
| 71 test files · 1366 tests · 100% pass · coverage 83.24/79.23/87.83/85.71 (gate 70) · tsc clean · lint 0 errors · build clean | Complete |
| Scope guard held: no token file, font config, `routes.ts`, sitemap, robots, FIG component, animation or contact form touched | Verified |

## What works ✅ — SEO-01 (search & AI discoverability)

| Feature | Status |
|---------|--------|
| All 27 page metas (9 × 3 locales) + 6 case-detail metas replaced with the §3 strings; every RENDERED title ≤60, every description ≤155 | Complete |
| Double-brand title bug fixed — `layout.tsx` template `'%s \| Escala Digital Ventures'` → `'%s'`; new guard asserts the rendered title, closing the blind spot that let it ship | Complete |
| `og:image` now actually emitted — the asset existed but `generateMetadata` was suppressing Next's file convention by returning `openGraph` without `images` | Complete |
| Full OG/Twitter set: `og:type` (`article` on cases), `og:site_name`, `og:locale:alternate`, `summary_large_image`; EN corrected `en_US` → `en_GB` | Complete |
| JSON-LD: exactly ONE `<script type="application/ld+json">` per page with an `@graph` — verified live (the apparent "2nd" match is React's RSC payload, not a tag) | Complete |
| Graph nodes: Organization+ProfessionalService · Person · WebSite · WebPage/ContactPage · BreadcrumbList · Service×5 · Article · FAQPage — 11 nodes on `/que-hacemos`, zero duplicate `@id` | Complete |
| AC-9 locality-only address · AC-10 no `sameAs` on Organization · no telephone · no `vatID` while `/aviso-legal` holds `{{...}}` placeholders — verified in live output | Complete |
| `FaqBlock` — always expanded, no `<details>`, `<h3>`+`<p>`, tokens only, 360px-safe; 16 Q&A pairs × 3 locales on `/que-hacemos`, `/como-trabajamos`, `/modelo-de-alianza` | Complete |
| FAQPage JSON-LD on exactly those 3 pages and nowhere else; text mirrors the visible dictionary object (same source, cannot drift) | Complete |
| `/llms.txt` — new static route, `text/plain`, canonical definition ES+EN, verified facts only, billing summaries (never "invoice") | Complete |
| `robots.txt` — 12 AI/search crawlers named explicitly; `/api/` + `/styleguide` disallowed; no crawl-delay | Complete |
| `sitemap.xml` — 33 URLs, `x-default` on every entry, real content-derived `lastmod` (content mtime, never build time) | Complete |
| Canonical + reciprocal hreflang + `x-default`→ES on every page (already correct pre-change; preserved) | Complete |
| 404 returns HTTP 404 + `noindex`; `/styleguide` `noindex, nofollow` + disallowed (already correct; verified) | Complete |
| AC-19: canonical definition byte-identical across `Organization.description`, `/llms.txt` and the `/sobre-escala` lead — enforced structurally by importing from `lib/seo/entity.ts` | Complete |
| AC-3: every `H1` unchanged · AC-4: zero diff on all protected shared components | Complete |
| Permanent `seo-prohibitions-guard` — sweeps all 3 locales + JSON-LD for `100+`/`200+`, invoicing, code-ownership, employers, Russian, `MAGUPELL`, colivares.com links, street address | Complete |
| 70 test files · 1313 tests · 100% pass · tsc clean · eslint 0 errors · build clean · coverage 83.04/79.23/87.79/85.54 (gate 70) | Complete |
| Vitest `.next` exclusion — `build && test:coverage` used to collect the suite twice (140 files/2048 tests) and skew coverage; pre-existing CI hazard, now closed | Complete |
| §4.8 anchors + §4.9 image `alt` audited: **already compliant**, no change needed | Verified |
| ⚠ DNS switch, canonical-host redirect, Search Console/Bing — **blocked, Carlos-side**; domain still serves GoDaddy parking | Blocked |

## What works ✅ — SPEC-POLISH-09 additions (`/modelo-de-alianza` constellation fix)

| Feature | Status |
|---------|--------|
| Clipping fixed — "Por qué solo cinco" now renders `AllianceConstellation` at `size="protagonist"` (960×620, responsive, 280px margin per side) instead of `size="large"` (fixed 420×420, only 60px margin, clipped `BIOZERO`/`DISPONIBLE` at the SVG edge) | Complete |
| `AllianceConstellation` and `GridBackground` byte-identical — zero changes; fix lives entirely in `components/pages/alliance.tsx` | Complete |
| Layout restructured: text block above (normal measure) → constellation below at full section width (`.alliance-why__stage`, max 900px, matches home's `.alliance-stage`) | Complete |
| Casing corrected: `content/{es,en,ca}/alliance.ts` seats `BIOZERO` → `BioZero` to match `content/{es,en,ca}/home.ts` exactly (home is canonical); permanent regression test added | Complete |
| Scroll-reveal preserved via existing `DiagramReveal`/`data-visible` mechanism — a page-scoped CSS counter-rule restores fade-in for the protagonist variant on this page only, without touching home's own always-visible rule | Complete |
| Reduced motion: fully static/visible via the existing global rule — no page-specific handling needed | Complete |
| New test file `tests/components/alliance-page.test.tsx` (8 tests) — 100% coverage of `components/pages/alliance.tsx` (was 0%) | Complete |
| Live-verified via headless Chrome over CDP: label `getBBox()` geometry (not DOM presence) at 360/390/768/1024/1440/1920 × ES/EN/CA — zero clipped labels post-fix (was 4/5 clipped per locale); home page measured unaffected; connector geometry unchanged; reveal + reduced-motion confirmed | Complete |
| 65 test files · 1115 tests · 100% pass · `npx tsc --noEmit` clean · `eslint` 0 new warnings · `npm run build` clean · coverage 80.46%/77.81%/86.48%/83.33% | Complete |
| Known follow-up: pre-existing 8px horizontal overflow at 360px from `.site-header`/`.page-header__*`, present on every `PageHeader` page — not introduced by this fix, out of scope (`PageHeader` protected), not yet triaged | Flagged |

## What works ✅ — SPEC-POLISH-07 additions (header nav + mobile menu)

| Feature | Status |
|---------|--------|
| Header nav / locale switcher / CTA label raised 0.66rem → 0.80rem; decorative `·` separator between nav links (`aria-hidden`, outside the link, not in the hit area) | Complete |
| Separator + nav↔switcher↔button gaps compress one step at 1024–1200px so nothing wraps at any measured width | Complete |
| Brand slot dimensioned (132×32 desktop / 112×28 mobile), reused verbatim inside the mobile overlay bar — ready for the logo spec to drop in | Complete |
| **Mobile menu built** — below 1024px the header previously rendered no navigation at all (`display: none`, no replacement); now a calibrated 3-bar trigger opens a full-screen overlay (`components/mobile-menu.tsx`) on the abisal surface with all 5 pages (mono `01`–`05` index), the locale switcher, «Hablemos», and the contact email | Complete |
| Overlay behavior: hand-rolled focus trap (Tab wraps both directions), Lenis-aware scroll lock restoring the exact scroll position on close, `Escape`-to-close, close-on-navigate, and a `matchMedia` resize guard that force-closes the overlay if the viewport crosses into desktop while still open | Complete |
| Reduced motion: overlay open/close animation removed under `prefers-reduced-motion: reduce`; mount/unmount logic unchanged either way | Complete |
| `SiteHeader` now requires an `email` prop (`shared.finalCta.email`) for the overlay foot | Complete |
| Two dead CSS rules removed (`.locale-switcher { display: none }` and a `.header-cta` padding tweak at 639px — both already covered by the new 1024px breakpoint hiding `.site-header__actions`) | Complete |
| Live-verified via headless Chromium over CDP (no Playwright wired into this project yet): header height unchanged at 80px across 1920/1024/390px; brand slot exact at 112×28 mobile; scroll lock + focus-return confirmed | Complete |
| 63 test files · 1090 tests · 100% pass · `npx tsc --noEmit` clean · `eslint` 0 new warnings · `npm run build` clean · coverage 79.71%/77.43%/85.21%/82.67% | Complete |

## What works ✅ — SPEC-CASE-01 additions (Magupell case page rewrite)

| Feature | Status |
|---------|--------|
| `/casos-de-exito/magupell` rewritten ES/EN/CA — verified figures (167→216 reqs, 1.803/1,803 tests, 7 meses, 4 roles, 3 entornos, live Jul 2026), no `100+`/`200+`, no invoicing language, "Magupell" spelling fixed everywhere | Complete |
| `CaseDossier` promoted to the canonical case template (approved deviation from the original per-mode split) — renders `readoutGrid` + `narrative[]` when present, falls back to legacy `ReadoutStrip`/`DossierField`/`CapabilityGrid` otherwise | Complete |
| BioZero migrated onto the canonical template — copy byte-unchanged, rendering shape updated (capabilities now a `narrative` block) | Complete |
| 6 new page-local components: `CaseReadoutGrid`, `CaseNarrative` (variant dispatcher), `CaseFlowFig` (FIG. EXP-02), `CaseRolesGrid` (section 04), `CaseGovernance` (section 05, abisal), `CaseTimelineLadder` (FIG. EXP-03) | Complete |
| `CaseFlowFig` — connectors terminate at node borders (never overlap), one-shot L→R traversal on entry, full static fallback under `prefers-reduced-motion`, vertical stack <720px, no text overflow at 360px | Complete |
| Case index card (`/casos-de-exito`) — localized subtitle (`cardSubtitleByLocale`), no invoicing, "Magupell" spelling, updated figures | Complete |
| Metadata (title/description/OG/Twitter) rewritten ×3 locales — ≤60/≤155 chars, one verified figure, no invoicing | Complete |
| Environments count confirmed as 3 (matches home page) — DAT.05 + "CAMBIOS SEGUROS" governance card unblocked | Complete |
| Content guardrail tests: zero `factura\|facturación\|facturar\|invoic`, zero `MAGUPELL`, zero `100+\|200+` in Magupell content/card/metadata across all locales | Complete |
| **Hotfix:** `app/globals.css` SPEC-CASE-01 insert was accidentally nested inside `@media (prefers-reduced-motion: reduce)` (stray/missing brace), making all new CSS inert under normal conditions — fixed; verified via brace-balance check + compiled production CSS chunk | Complete |
| **Regression guard:** `tests/content/css-structure-guard.test.ts` — static structural analysis of `globals.css` (brace balance, at-rule reachability, className↔rule parity); proven to fail against the original broken structure and pass against the fix | Complete |
| 62 test files · 1066 tests · 100% pass · `npx tsc --noEmit` clean · `eslint` 0 errors · `npm run build` clean · coverage 78.72%/77.31%/85.71%/81.56% | Complete |

## What works ✅ — SPEC-POLISH-05 additions

| Feature | Status |
|---------|--------|
| ServiceFig FIG.08 (`platform`) — module boxes sized to text, connectors computed to land exactly on the core ring border, staggered looping pulses (previously missing animation) | Complete |
| ServiceFig FIG.09 (`ai`) — flow line split into edge-to-edge segments (never crosses box text), opaque box fill, "DONDE APORTA" repositioned above the IA node off-diagram, IA connector meets PROCESO top edge | Complete |
| ServiceFig FIG.11 (`evolve`) — nodes drawn on top of the circle with opaque fill (hides stroke behind), ambre arc now completes the FULL circle in a continuous loop (previously a static quarter) | Complete |
| Shared 340×180 canvas across all 5 ServiceFig variants; FIG.07/FIG.10 canvas-normalised only (geometry byte-identical, verified by dedicated tests) | Complete |
| `lib/motion-constants.ts` — new `SERVICE_FIG_*` timing/geometry constants (additive) | Complete |
| 53 test files · 970 tests · 100% pass · build clean · TypeScript strict clean · 0 hardcoded hex | Complete |

## What works ✅ — SPEC-POLISH-04 additions

| Feature | Status |
|---------|--------|
| AllianceConstellation `'protagonist'` size — 960×620 viewBox, R=200, nodeR=30, coreR1=46, coreR2=60 | Complete |
| Connectors start at core OUTER ring edge, end at node edge (never crosses core or node) | Complete |
| Labels anchored by cosA/sinA: right=start, left=end, top/bottom=middle — no overlap | Complete |
| Traveling ambre pulse via SVG `<animate>` for occupied seats, staggered, looping | Complete |
| Corner ticks + coreSubLabel inside protagonist SVG | Complete |
| `AllianceFigureContent` type + `allianceFigure` key in ES/EN/CA home dictionaries (translatable) | Complete |
| `AllianceTeaser` — protagonist path + legacy fallback (backward-compatible) | Complete |
| `GridBackground` reused in section 05 (no duplicate grid code) | Complete |
| `/modelo-de-alianza` page unchanged (no regression) | Complete |
| 52 test files · 953 tests · 100% pass · build clean | Complete |

## What works ✅ — SPEC-POLISH-03 additions

| Feature | Status |
|---------|--------|
| ProofSection — 6 real Magupell readouts (167→216, 1.803, 3 entornos, 7 meses, "Sustituyó lo manual.", "A medida de cada rol.") | Complete |
| ProofTimelineFig — FIG.04 ascending stair, 5 real-dated milestones (DIC 2025→JUL 2026), labels anchored to treads, ambre production node | Complete |
| Readout redesign — kind (number/phrase), 6 plotVariant micro-plots (aria-hidden), body-font captions (~15px, max 42ch) | Complete |
| Brand spelling "Magupell" (was "MAGUPELL") — fixed everywhere in user-facing copy | Complete |
| ProofSection 2×3 grid layout — responsive to 360px | Complete |
| 52 test files · 938 tests · 100% pass · build clean | Complete |

## What works ✅

| Feature | Status |
|---------|--------|
| Spanish home page (`/`) | Complete, approved |
| Hero section with WordReveal H1 + FIG.01 system diagram | Complete |
| ProblemSection — SPEC-POLISH-02: new headline, 2-para body, symptoms strip, 2-col layout, FIG.02 redesign | Complete |
| ServicesPreview (5 service lines, editorial index) | Complete |
| FrameworkSection — `PhaseCycle` scroll-driven ring (desktop) + static list (mobile/reduced-motion) | Complete |
| ProofSection — 6 real Magupell readouts + 2 ClientChips (Magupell, BioZero) + FIG.04 timeline | Complete |
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
| `ExecutionCycleFig` — FIG.06 closed cycle, replaces `ExecutionPipelineFig` (SPEC-POLISH-06) | Complete |
| `HowWeBuildFig` — FIG.12 layered system diagram (SPEC-POLISH-06) | Complete |
| `AiBuildBlock` — full replacement: heading/body/figure/legend (SPEC-POLISH-06) | Complete |
| Section order: Escala Growth Framework moved to last section (E), before FinalCTA | Complete |
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

### Phase 4 — Legal & analytics ☑ COMPLETE
| Feature | Priority | Status |
|---------|----------|--------|
| Aviso legal + Privacidad legal pages | P1 | ✅ Done (SPEC-P4) |
| Cookieless analytics | — | 🚫 Dropped (Carlos decision) |
| 404 page + favicon + OG images | P2 | ✅ Done (SPEC-P4) |

### Phase 5 — EN & CA content ☑ COMPLETE
| Feature | Priority | Status |
|---------|----------|--------|
| Full EN + CA dictionaries (recrafted, not translated) | P2 | ✅ Done (SPEC-P5) |
| Coverage guard (no silent fallback) | P2 | ✅ Done (SPEC-P5) |
| Localized 404 | P2 | ✅ Done (SPEC-P5) |
| hreflang QA across all pages | P2 | ✅ Done (SPEC-P5) |
| `docs/i18n-glossary.md` + `docs/i18n-qa.md` | P2 | ✅ Done (SPEC-P5) |
| Carlos register review (AC-9) | P0 | ⬜ Pending Carlos |

### Phase 6 — Infra ☑ COMPLETE
| Feature | Priority | Status |
|---------|----------|--------|
| Dockerfile + standalone output (linux/amd64) | P2 | ✅ Done (SPEC-P6) |
| `.dockerignore` + `next.config.mjs` standalone + noindex | P2 | ✅ Done (SPEC-P6) |
| GitHub Actions CI/CD (dev→dev, main→prod, WIF keyless) | P2 | ✅ Done (SPEC-P6) |
| `docs/infra-runbook.md` + `docs/infra-decisions.md` | P2 | ✅ Done (SPEC-P6) |
| GCP project `escala-dv-web`, billing, APIs, AR EU | P2 | ✅ Done (SPEC-P6) |
| Deployer SA + WIF keyless auth | P2 | ✅ Done (SPEC-P6) |
| Secret Manager: CONTACT_TO, CONTACT_FROM, EMAIL_API_KEY | P2 | ✅ Done (SPEC-P6) |
| dev service live (public, noindex, DRY_RUN) | P2 | ✅ Done (SPEC-P6) |
| prod service live (public, DRY_RUN until Resend ready) | P2 | ✅ Done (SPEC-P6) |
| Domain mapping prepared (DNS not switched) | P2 | ✅ Done (SPEC-P6) |
| Budget alert €10/month | P2 | ✅ Done (SPEC-P6) |
| `next-env.d.ts` committed (CI tsc fix) | P2 | ✅ Done (SPEC-P6) |
| Resend account + email verification | P2 | ⬜ Deferred (Phase 7) |
| Google Workspace MX + DNS records | P2 | ⬜ Deferred (Phase 7) |
| DNS switch to Cloud Run (go-live) | P2 | ⬜ Phase 7 |

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
| Legal placeholders unresolved | Medium | `{{FECHA_ACTUALIZACION}}`, `{{REGISTRO_MERCANTIL}}`, `{{NIF_B88767520}}`, `{{JURISDICCION}}`, `{{REGION_EU_GOOGLE_CLOUD}}` — Carlos must fill before go-live. Visible as ambre highlights in dev. |
| Legal advisor review required | Medium | Legal copy drafted from MAGUPELL contract + LSSI-CE/RGPD. Not legal advice. Advisor must review before go-live. |
| ~~Favicon artwork is a draft~~ | — | **Resolved by BRAND-01.** `app/icon.svg` deleted; real `favicon.ico` + 6 PNG sizes + apple-touch icon shipped from the delivered bundle. |
| 8px horizontal overflow at 360px on `PageHeader` pages | Low | `.site-header`/`.page-header__*` overflow slightly at the narrowest tested width, on every page using `PageHeader` (`/como-trabajamos`, `/casos-de-exito`, `/modelo-de-alianza`). Found during SPEC-POLISH-09 live QA; pre-existing, not introduced by that change. Not yet triaged into the backlog. |
