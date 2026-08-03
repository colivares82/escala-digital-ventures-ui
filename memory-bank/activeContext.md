# Active Context

_Last updated: March 2026 (Phase 1 completed)_

## Current state

**Phase 1 complete.** The i18n architecture and interior-page system are in place. All 10 pages × 3 locales are defined in the route map; only home × 3 locales are rendered (Option A). Every subsequent phase adds a page by: interface + ES dict + route entry + component — no routing engineering required.

Test suite: 252 tests, all passing. Coverage: ~93% statements (>> 70% gate). Build: clean, TypeScript strict.

## What was just done (Phase 1)

1. **i18n core (`lib/i18n/`):**
   - `types.ts` — `Locale`, `PageId`, `CaseSlug`, `RouteResolution` types
   - `routes.ts` — route map (spec §4.1 exactly); `getPath`, `resolvePath`, `getAlternates`; pre-built reverse lookup; trailing slash normalization
   - `dictionary.ts` — `getDictionary(locale)` → typed `Dictionary` bundle

2. **Content restructure:**
   - `content/types.ts` — page dictionary interfaces (`PageMeta`, `HomePageDictionary`, `ServicesDictionary`, …)
   - `content/data/cases.ts` — locale-aware case studies (source of truth; `clients.ts` is now a backward-compat adapter)
   - `content/es/home.ts` — `meta` field added; `satisfies HomePageDictionary`
   - ES stub dictionaries for all 9 non-home pages (meta only; Phase 2 adds full content)
   - `content/en/*` and `content/ca/*` — full per-page re-exports with `TODO(P5)` markers

3. **Routing:**
   - `app/[[...path]]/page.tsx` — single catch-all; `dynamicParams = false`; `generateStaticParams` (home × 3); `generateMetadata` (canonical, hreflang, OG)
   - `app/page.tsx` deleted; home migrated with pixel parity
   - `app/sitemap.ts` — built pages × locales; Phase 2 entries commented out
   - `app/robots.ts` — allow `/`; disallow `/styleguide`

4. **LocaleSwitcher:**
   - `components/locale-switcher.tsx` — page-preserving links via `getAlternates`; `aria-current`; IBM Plex Mono; accessible; hides on small screens
   - `SiteHeader` updated to accept `currentPage`, `locale`, `pageParams` and render `<LocaleSwitcher>`

5. **Interior page system:**
   - `components/page-header.tsx` — `eyebrow`, `title`, `lead?`, `surface` props; BEM CSS; approved identity
   - `/styleguide` section 05 "Plantilla de página" — PageHeader both surfaces + Section + FinalCTA (AC-8)

6. **Docs + testing:**
   - `docs/adding-a-page.md` (AC-9)
   - `specs/spec-phase1-i18n-architecture.md` in repo
   - 4 new test files; 2 refactored; all green
   - `PLAN.md` Phase 1 marked done

## Known limitation (documented)

`<html lang>` is hardcoded `"es"` in root layout. Next.js static catch-all routes cannot dynamically set this without middleware. Phase 6 (middleware deployment on GCP) will address it. For Phase 1 this is acceptable because EN/CA content is ES fallback anyway. Interior pages set `lang` on `<main>` for EN/CA as an intermediate accessibility measure.

## What comes next (Phase 2)

Each page in priority order:
1. **[PAGE-02]** `/como-trabajamos` — first; reuses PhaseCycle; needs spec from Claude first
2. **[PAGE-01]** `/que-hacemos` — 5 service lines; needs spec
3. **[PAGE-03]** `/casos-de-exito` + MAGUPELL + BioZero
4. **[PAGE-04]** `/modelo-de-alianza`
5. **[PAGE-05]** `/sobre-escala`

For each Phase 2 page:
- Spec written first (English, in `specs/`)
- `docs/adding-a-page.md` is the implementation guide
- Update `generateStaticParams` + sitemap + renderer switch in catch-all

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` is a placeholder. Confirm before CONTACT-01.
- **Legal data:** CIF, registered address, registry data for Aviso Legal — Carlos to provide.
- **EN/CA copy:** pending professional translation + Carlos review. Do not index until reviewed.
- **Real imagery:** case-study context images pending from clients (MAGUPELL, BioZero).
- **GCP account:** not ready. Phase 6 (infra + GitHub Actions CI/CD) blocked.
- **AC-8 approval:** Carlos must review `/styleguide` "Plantilla de página" section (section 05) and approve `PageHeader` both surfaces before Phase 2.1 spec is unblocked.
