# Active Context

_Last updated: March 2026 (Phase 0 completed)_

## Current state

**Phase 0 complete.** The repository documentation now matches the built reality. Sources of truth are synchronized, Russian is removed everywhere in the codebase, and the Memory Bank is fully up to date.

The Spanish home page is complete, tested (138 tests, all passing), and builds clean. All engineering standards pass (coverage: statements 94%, branches 84%, functions 98%, lines 98%).

## What was just done (Phase 0)

1. **Documentation sync:**
   - `docs/el-libro-de-escala-v2.1.md` — Libro v2.1 added (supersedes stale root copy deleted)
   - `docs/escala-web-content-spec-v1.1.md` — Spec v1.1 added (supersedes stale root copy deleted)
   - `PLAN.md` at repo root — phase tracking guide with Phase 0 marked done
   - Stale root files removed: `escala-book-base-de-conocimiento.md`, `escala-web-content-spec.md`

2. **Russian removed from codebase:**
   - `content/es/home.ts` `languages` field: "Trabajamos en español, inglés, catalán y ruso." → "Trabajamos en español, inglés y catalán."
   - (Old stale root files also contained Russian references — those files are now deleted)

3. **Memory Bank updated:** All six core files reviewed and updated to reflect the as-built identity ("Sistemas en movimiento"), spec v1.1 content, and current PLAN phases.

4. **BACKLOG reordered** per PLAN.md phases: Phase 1 (i18n) → Phase 2 (interior pages) → Phase 3 (contact) → Phase 4 (legal/analytics) → Phase 5 (EN/CA) → Phase 6 (GCP infra).

## What comes next (priority order)

**Phase 1 — i18n architecture + interior page system**
1. **[I18N-01]** Locale routing: `app/[locale]/` segment, `lib/i18n/routes.ts` slug map (spec §4.1), `hreflang` alternates, LocaleSwitcher preserving current page.
2. **[SEO-01]** Per-page metadata, OG images, `sitemap.xml`, `robots.txt`, structured data.
3. Interior-page scaffolding: PageHeader + section templates proven on a throwaway route.

**Phase 2 — Interior pages** (after Phase 1 scaffolding is in place)
4. **[PAGE-02]** `/como-trabajamos` — first, reuses existing PhaseCycle
5. **[PAGE-01]** `/que-hacemos`
6. **[PAGE-03]** `/casos-de-exito` + MAGUPELL + BioZero
7. **[PAGE-04]** `/modelo-de-alianza`
8. **[PAGE-05]** `/sobre-escala`

**Phase 3 — Contact end-to-end**
9. **[CONTACT-01]** API route + transactional email + honeypot + rate limit + `/contacto` page

**Phase 6 — GCP + GitHub Actions** (blocked: GCP account not ready)
- Branch workflow (dev/main) will be configured once GCP is available
- Branches can be created now if useful for isolation

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` is a placeholder. Must be confirmed by Carlos before CONTACT-01.
- **Legal data:** CIF, registered address, registry data for Aviso Legal — Carlos to provide.
- **EN/CA copy:** pending professional translation + Carlos review. Do not index until reviewed.
- **Real imagery:** case-study context images pending from clients (MAGUPELL, BioZero). No stock photos per spec.
- **GCP account:** not ready. Phase 6 (infra + GitHub Actions CI/CD) is blocked until available.

## Known issues / technical debt

- Header nav uses section anchors (`#que-hacemos`, `#metodo`) — these will switch to true routes as interior pages are built.
- `/styleguide` route is dev-only and should remain noindex in all environments.
- No remaining route/anchor literal strings — all use `ROUTES.*` / `ANCHORS.*` constants.
