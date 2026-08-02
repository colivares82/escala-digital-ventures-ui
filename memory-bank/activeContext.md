# Active Context

_Last updated: August 2026_

## Current state

The project has completed **two refactor passes**. The codebase is now fully compliant with all Escala engineering standards. The Spanish home page is tested, built, and ready.

## What was just done (second session)

1. **Coverage gate activated:**
   - Installed `@vitest/coverage-v8`; `npm run test:coverage` now enforces the 70% threshold for real
   - Coverage achieved: statements 94%, branches 84%, functions 98%, lines 98%

2. **Remaining inline route/anchor strings eliminated:**
   - `contact-form.tsx`: `href="/privacidad"` → `ROUTES.PRIVACY`
   - `home-sections.tsx`: `href="#contacto"` → `ANCHORS.CONTACTO`, `href="#metodo"` → `ANCHORS.METODO`
   - `site-chrome.tsx`: `href="#inicio"` → `ANCHORS.INICIO`, `href="#contacto"` → `ANCHORS.CONTACTO`

3. **Full test suite:**
   - 138 tests, all passing (14 test files)
   - Added tests for: `PhaseCycle`, `SystemDiagram`, `SiteHeader`, `SiteFooter`, `FinalCTA`, `Hero`, `ProblemSection`, `ServicesPreview`, `FrameworkSection`, `ProofSection`, `AllianceTeaser`

4. **Build verified:** `next build` produces 3 static pages (/, /styleguide, /_not-found) — clean

5. **Housekeeping:** `TODO.md` replaced with pointer to `docs/BACKLOG.md`; CHANGELOG updated

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
- `/styleguide` route is dev-only and should remain noindex in all environments.
- No remaining route/anchor literal strings — all use `ROUTES.*` / `ANCHORS.*` constants.
