# Active Context

_Last updated: August 2026_

## Current state

The project has just completed its **first refactor + standards pass**. The approved Spanish home page is working and tested. The codebase now follows all Escala engineering standards.

## What was just done

1. **Phase 1 — Code refactor:**
   - All minified JSX and CSS expanded to readable, properly formatted code
   - All hardcoded strings extracted to `content/es/` dictionaries
   - Dead code removed (`stair-figure.tsx`, `section.tsx`, `phase-journey.tsx`, `.phase-journey__*` CSS)
   - `phase-journey.tsx` renamed to `phase-cycle.tsx`; all hardcoded copy removed; uses `ROUTES.METHOD`
   - `globals.css` expanded from 33 minified lines to ~600 documented lines; organized by section; `--abisal-gradient-end` token added
   - New `lib/routes.ts` and `lib/motion-constants.ts` with all URL/timing/threshold constants
   - `Readout` now receives a `source` prop (was hardcoded "MAGUPELL")
   - `PhaseCycle` now receives `sectionLabel`, `lead`, `ariaLabel`, `phasePrefix` props

2. **Phase 2 — Test baseline:**
   - Vitest + RTL + jsdom installed; 70% coverage threshold configured
   - 71 tests across 9 test files: all pass
   - Test mocks: `IntersectionObserver` (class constructor), `matchMedia`, `requestAnimationFrame`, `lenis`

3. **Phase 3 — Docs + Memory Bank:**
   - `docs/ARCHITECTURE.md`, `docs/BACKLOG.md`, `docs/CHANGELOG.md`, `docs/REQUIREMENTS_TRACEABILITY.md`
   - All six Memory Bank files

## What comes next (priority order)

1. **[CONTACT-01]** Connect contact form to a Next.js API route + transactional email provider. Confirm final email address before connecting. Add honeypot, rate limiting, server-side zod validation.
2. **[I18N-01]** Locale routing for EN and CA. Implement `app/[locale]/` segment routing + `lib/i18n/routes.ts` slug map. Carlos reviews all translations before indexing.
3. **[SEO-01]** Per-page metadata, OG images, `sitemap.xml`, `robots.txt`, structured data.
4. **[PAGE-01→07]** Interior pages: Qué hacemos, Cómo trabajamos, Casos de éxito, Modelo de alianza, Sobre Escala, Contacto, Legal/Privacidad.

## Active decisions open

- **Email address:** `hola@escaladigitalventures.com` is a placeholder. Must be confirmed by Carlos before CONTACT-01.
- **Legal data:** CIF, registered address, registry data for Aviso Legal — Carlos to provide.
- **EN/CA copy:** pending professional translation + Carlos review. Do not index until reviewed.
- **Real imagery:** case-study context images pending from clients (MAGUPELL, BioZero). No stock photos per spec.

## Known issues / technical debt

- Header nav uses section anchors (`#que-hacemos`, `#metodo`) — these will need to switch to true routes as interior pages are built.
- `/styleguide` styleguide route is dev-only and should remain noindex in all environments.
- `vitest.config.ts` generates a Vite ESM warning (not an error); suppress with `VITE_CONFIG_NATIVE_IGNORE_WARNING=true` or rename to `.mjs` when convenient.
- Test coverage is at the floor (70%) — aim for 80%+ before go-live.
