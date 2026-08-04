# SPEC — Phase 1: i18n Architecture + Interior Page System

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-P1 · Version 1.0 · August 2026
**Author:** Claude (product spec) · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Sources of truth:** `docs/escala-web-content-spec-v1.1.md` (§4, §7) · `docs/el-libro-de-escala-v2.1.md` · `PLAN.md` (Phase 1)
**Wireframe:** none required — this phase introduces no new visual composition. The interior PageHeader reuses approved identity patterns (§3 of the v1.1 spec) and is validated in `/styleguide`. If its rendered look raises doubts, we stop, wireframe it, iterate, and resume (per our working agreement).

---

## 1. Business context

The approved home exists only in Spanish at `/`. The site must launch in ES/EN/CA with localized URLs (v1.1 spec §4). Retrofitting i18n after building five interior pages would multiply rework; therefore the routing/i18n architecture and the reusable interior-page system are built FIRST, so every page from Phase 2 onward is born localized. Business outcome of this phase: adding a new page in three languages becomes a content task (dictionary + one route-map entry), not an engineering task.

## 2. Scope

**In scope:** locale routing with localized slugs · typed dictionary architecture for 3 locales (ES populated, EN/CA falling back to ES) · per-page metadata, hreflang, canonical, sitemap, robots · LocaleSwitcher · interior-page components (PageHeader, FinalCTA wiring, Section usage) previewed in `/styleguide` · migration of the existing home into the new routing with pixel parity.

**Out of scope (other phases):** real EN/CA copy (Phase 5) · interior pages themselves (Phase 2) · contact backend (Phase 3) · 404 design, legal pages, analytics (Phase 4) · infra (Phase 6).

## 3. Definitions & types

```ts
// lib/i18n/types.ts
export type Locale = "es" | "en" | "ca";
export const LOCALES: Locale[] = ["es", "en", "ca"];
export const DEFAULT_LOCALE: Locale = "es"; // served at root, no prefix

export type PageId =
  | "home" | "services" | "method" | "cases" | "caseDetail"
  | "alliance" | "about" | "contact" | "legal" | "privacy";
```

## 4. Functional requirements

### FR-1 · Route map (single source of truth)

1.1. Create `lib/i18n/routes.ts` exporting a typed route map implementing EXACTLY the table in v1.1 spec §4.1 (ES at root without prefix; `/en/...`, `/ca/...`; localized slugs; `caseDetail` takes a `slug` param: `magupell`, `biozero`).
1.2. Export helpers, fully typed and unit-tested:
  - `getPath(page: PageId, locale: Locale, params?): string`
  - `resolvePath(segments: string[]): { page: PageId; locale: Locale; params? } | null`
  - `getAlternates(page: PageId, params?): Record<Locale, string>` (used for hreflang and the LocaleSwitcher).
1.3. `resolvePath` and `getPath` are inverse functions for every entry; unknown paths resolve to `null`.

### FR-2 · Routing implementation

2.1. Implement a single dynamic route `app/[[...path]]/page.tsx` that: resolves the incoming path via `resolvePath`; returns `notFound()` on `null`; renders the page component for `{page, locale}`.
2.2. Full SSG: `generateStaticParams` emits every path from the route map (all pages × all locales, including both case details). No middleware, no runtime locale negotiation, no cookies.
2.3. `<html lang>` reflects the resolved locale on every page.
2.4. The existing home route migrates into this system. **Pixel parity is a requirement:** the rendered ES home before and after this change must be visually identical (same DOM structure for the page body; only the routing layer changes).
2.5. Existing auxiliary routes (`/styleguide`) remain outside the locale map, noindex, unchanged.

### FR-3 · Dictionary architecture

3.1. Structure: `content/{es,en,ca}/` with one module per page (`home.ts`, `services.ts`, `method.ts`, `cases.ts`, `alliance.ts`, `about.ts`, `contact.ts`, `legal.ts`, `privacy.ts`) plus `shared.ts` (nav labels, footer, marquee claims, form labels/states, meta defaults). Case-study data stays a typed array in `content/data/cases.ts` with per-locale text fields.
3.2. Every dictionary module satisfies an explicit interface (in `content/types.ts`). EN/CA completeness is enforced BY TYPE: `content/en/home.ts` must implement the same interface as `content/es/home.ts` — no `Partial`, no `any`.
3.3. Phase-1 fallback: `content/en/*` and `content/ca/*` re-export the ES modules (`export { default } from "../es/home"`), satisfying the types while real translations arrive in Phase 5. A `// TODO(P5): translate` marker on each.
3.4. Zero user-facing literals in components. Accessor: `getDictionary(locale)` returning the typed bundle; components receive content via props.
3.5. The "ruso" purge is verified here: a repo-wide grep for `ruso|russian` must return zero matches in `content/` and `components/` (contact meta reads "TRABAJAMOS EN ESPAÑOL, INGLÉS Y CATALÁN.").

### FR-4 · Metadata & SEO plumbing

4.1. `generateMetadata` per page from the dictionary's `meta` object (`title` ≤60 chars, `description` ≤155 chars — enforce with a unit test on the ES content).
4.2. Every page emits: canonical (its own localized URL, absolute), `hreflang` alternates for es/en/ca from `getAlternates`, plus `x-default` → the ES URL.
4.3. `app/sitemap.ts`: every page × locale (including case details) with `alternates.languages`; absolute URLs on `https://escaladigitalventures.com`.
4.4. `app/robots.ts`: allow all, disallow `/styleguide`, reference the sitemap.
4.5. Open Graph: per-page `og:title`/`og:description`/`og:locale` from the dictionary; og:image uses the existing site-wide image for now (per-page OG images are Phase 4).

### FR-5 · LocaleSwitcher

5.1. In SiteHeader (current position): "ES EN CA" in IBM Plex Mono; active locale in `--ambre`, inactive at 50% opacity.
5.2. Each option links to `getAlternates(currentPage)` — switching locale PRESERVES the current page (on `/en/how-we-work`, CA links to `/ca/com-treballem`).
5.3. Accessible: `<nav aria-label>`, links (not buttons), visible focus, `aria-current` on the active locale. Keyboard operable.
5.4. No JS state, no cookies: the URL is the only source of locale truth.

### FR-6 · Interior page system

6.1. `PageHeader` component (typed props: `index` e.g. "01", `label` e.g. "CAPACIDADES" — wait, interior pages use their own numbering; props: `eyebrow: string` rendered as mono section-index style, `title: string` at `--text-display-lg`, `lead?: string`, `surface: "paper" | "abisal"`). Composition follows the approved identity: eyebrow top-left, asymmetric title (cols 1–7), lead ≤60ch. No new visual language.
6.2. `FinalCTA` (existing component) accepts locale-aware content from `shared.ts` and links to the contact page via `getPath("contact", locale)`.
6.3. SiteHeader nav and SiteFooter links are generated from the route map + `shared.ts` labels for the current locale (no hardcoded hrefs anywhere).
6.4. `/styleguide` gains a "Page template" entry rendering `PageHeader` (both surfaces) + a Section + `FinalCTA` composed as an interior page skeleton — this is the visual validation point for this phase. If Carlos flags it, we wireframe and iterate before closing the phase.

## 5. Edge cases

- Unknown path (`/foo`, `/en/foo`, `/es/...` — note `/es` prefix is NOT valid): `notFound()`.
- Trailing slashes normalize to the canonical form (single behavior, tested).
- `caseDetail` with unknown slug → `notFound()`.
- Switcher on a case detail preserves the slug across locales.
- `/en` and `/ca` roots render the home (locale roots are valid pages).

## 6. Acceptance criteria

- [ ] AC-1 `npm run build` passes; TypeScript strict, zero errors; full SSG (no dynamic rendering warnings).
- [ ] AC-2 `/` renders the ES home with pixel parity vs. pre-phase (manual visual check by Carlos).
- [ ] AC-3 `/en` and `/ca` render the home (ES fallback content), with correct `<html lang>`, canonical and 3×hreflang + x-default.
- [ ] AC-4 LocaleSwitcher preserves the page on every route, including case details; keyboard + focus pass.
- [ ] AC-5 `sitemap.xml` lists every page × locale with language alternates; `robots.txt` excludes `/styleguide`.
- [ ] AC-6 Repo-wide grep `ruso|russian` in `content/` + `components/` = zero matches.
- [ ] AC-7 Unit tests green: route map inverse property (every entry), resolver null cases, meta length limits, dictionary type completeness (a deliberately missing key in a test fixture fails compilation).
- [ ] AC-8 "Page template" visible in `/styleguide` and approved by Carlos.
- [ ] AC-9 Adding a page requires ONLY: interface + ES dictionary + route-map entry + page component — demonstrated in a short `docs/adding-a-page.md` written during this phase.
- [ ] AC-10 Lighthouse (home, ES): scores not lower than pre-phase baseline (record baseline first).

## 7. Test plan

Unit (vitest or repo's runner): `routes.test.ts` (getPath/resolvePath inverse across the full map; null on unknown; alternates correctness incl. caseDetail params) · `meta.test.ts` (ES title/description limits) · type-level test for dictionary completeness. Manual: AC-2 visual parity, AC-4 keyboard pass, AC-8 styleguide review. Record the Lighthouse baseline before starting (AC-10).

## 8. Implementation notes for Cline

- Read `.clinerules`, this spec, and v1.1 spec §3–§4 before coding. Where this spec and the repo's `DECISIONS.md` disagree on names/tokens, DECISIONS.md wins — flag the discrepancy, don't silently adapt.
- Suggested order: (1) baseline Lighthouse + screenshot of `/`; (2) types + route map + tests; (3) dictionaries restructure with ES content moved (not rewritten); (4) catch-all route + home migration; (5) metadata/sitemap/robots; (6) switcher; (7) PageHeader + styleguide entry; (8) docs/adding-a-page.md; (9) full AC pass.
- Commits: small and scoped per step above; conventional messages (`feat(i18n): route map + resolver`).
- Do not restyle anything. Do not touch animation code. Content moves, it does not change (except the already-specified "ruso" removal if any trace remains).

## 9. Definition of Done

All AC checked · PLAN.md Phase 1 boxes marked · `docs/adding-a-page.md` merged · Carlos approves styleguide page template and home parity → Phase 2.1 (`/como-trabajamos`) spec unblocked.
