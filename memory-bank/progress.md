# Progress

## What works ✅

| Feature | Status |
|---------|--------|
| Spanish home page (`/`) | Complete, approved |
| Hero section with WordReveal H1 + system diagram | Complete |
| ProblemSection with symptom list + diagram | Complete |
| ServicesPreview (5 service lines) | Complete |
| FrameworkSection — `PhaseCycle` scroll-driven ring (desktop) + static list (mobile/reduced-motion) | Complete |
| ProofSection — 4 Readout figures + 2 ClientChips (MAGUPELL, BioZero) | Complete |
| AllianceTeaser — constellation diagram | Complete |
| FinalCTA — ContactForm (browser-only validation, no API) | Complete |
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
| `memory-bank/` — all six core files | Complete |
| `TODO.md` superseded by `docs/BACKLOG.md` | Complete |

## What's left ⬜

| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Contact form API + email provider | P0 | CONTACT-01 |
| EN/CA locale routing + translation | P0 | I18N-01 |
| Per-page SEO metadata + OG + sitemap | P0 | SEO-01 |
| Qué hacemos interior page | P1 | PAGE-01 |
| Cómo trabajamos interior page | P1 | PAGE-02 |
| Casos de éxito index + MAGUPELL + BioZero pages | P1 | PAGE-03 |
| Modelo de alianza interior page | P1 | PAGE-04 |
| Sobre Escala interior page | P1 | PAGE-05 |
| Contacto dedicated page | P1 | PAGE-06 |
| Aviso legal + Privacidad legal pages | P1 | PAGE-07 |
| Cookieless analytics (Plausible) | P2 | ANALYTICS-01 |
| Lighthouse ≥95 validation | P2 | PERF-01 |
| GCP Cloud Run deployment (dev + prod) | P2 | — |
| GitHub Actions CI/CD | P2 | — |

## Known issues

| Issue | Severity | Notes |
|-------|----------|-------|
| Header nav uses anchors, not true routes | Medium | Works for home; will break as interior pages deploy. Fix when first interior page is built. |
| Contact form does not transmit | Medium | Expected v1 behavior. Top P0 item. |
| EN/CA locale content stubs only | Low | Expected; stubs warn against silent fallback. |
