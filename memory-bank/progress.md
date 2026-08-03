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

## What's left ⬜ (ordered by PLAN phases)

### Phase 1 — i18n architecture
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Locale routing (ES root, `/en`, `/ca`) + slug map | P0 | I18N-01 |
| Per-page SEO metadata + OG + sitemap + robots | P0 | SEO-01 |
| Interior-page scaffolding (PageHeader + section templates) | P0 | I18N-01 |

### Phase 2 — Interior pages
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Cómo trabajamos `/como-trabajamos` | P1 | PAGE-02 |
| Qué hacemos `/que-hacemos` | P1 | PAGE-01 |
| Casos de éxito index + MAGUPELL + BioZero pages | P1 | PAGE-03 |
| Modelo de alianza `/modelo-de-alianza` | P1 | PAGE-04 |
| Sobre Escala `/sobre-escala` | P1 | PAGE-05 |

### Phase 3 — Contact end-to-end
| Feature | Priority | Backlog ID |
|---------|----------|-----------|
| Contact form API + email provider | P1 | CONTACT-01 |
| Contacto dedicated page `/contacto` | P1 | PAGE-06 |

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
| Header nav uses anchors, not true routes | Medium | Works for home; will break as interior pages deploy. Fix when first interior page is built. |
| Contact form does not transmit | Medium | Expected v1 behavior. Phase 3 item. |
| EN/CA locale content stubs only | Low | Expected; stubs warn against silent fallback. |
| GCP / GitHub Actions not configured | Low | Blocked by GCP account. Phase 6. |
