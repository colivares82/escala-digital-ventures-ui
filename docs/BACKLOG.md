# Backlog

> Cross-linked docs: [ARCHITECTURE](./ARCHITECTURE.md) · [CHANGELOG](./CHANGELOG.md) · [REQUIREMENTS_TRACEABILITY](./REQUIREMENTS_TRACEABILITY.md) · [PLAN](../PLAN.md)

Items ordered by PLAN.md phase. The first open item in the first open phase is always "what to work on next."

---

## ~~Phase 1 — i18n architecture + interior page system~~ ✅ Done (March 2026)

### ~~[I18N-01] Locale routing~~ ✅ Done
- `lib/i18n/routes.ts` — full route map (10 pages × 3 locales per spec §4.1)
- `app/[[...path]]/page.tsx` — catch-all SSG; `dynamicParams = false`; home×3 rendered in Phase 1
- `LocaleSwitcher` — page-preserving, accessible, IBM Plex Mono
- `PageHeader` component (both surfaces) + styleguide "Plantilla de página" (section 05)
- `content/en/*` + `content/ca/*` — per-page re-exports; `TODO(P5)` markers; professional review deferred to Phase 5
- `docs/adding-a-page.md` — adding a page = interface + ES dict + route entry + component

### [SEO-01] Remaining metadata tasks (Phase 1 delivered: meta, sitemap, robots)
- ~~`title ≤ 60 chars`, `description ≤ 155 chars` — done; enforced by test (42 tests)~~ ✅
- ~~`sitemap.xml` with locale alternates — done (`app/sitemap.ts`)~~ ✅
- ~~`robots.txt` — done (`app/robots.ts`)~~ ✅
- ~~`hreflang` + `x-default` — done in `generateMetadata`~~ ✅
- ⬜ OG image with identity (abisal bg, Archivo claim, ambre accent) — Phase 4
- ⬜ Structured data: `Organization` + `ProfessionalService` on home; `BreadcrumbList` on inner pages — Phase 7
- **Dependencies (remaining):** interior pages must exist before per-page OG images make sense

---

## Phase 2 — Interior pages (one session each, spec §5)

### [PAGE-02] Cómo trabajamos `/como-trabajamos`
- **First interior page** (reuses existing `PhaseCycle` component)
- ExecutionPractice: 5 practices as editorial list (Libro Ch. 9)
- HowWeBuild section (Libro Ch. 7)
- FinalCTA

### ~~[NAV-01] Upgrade nav hrefs for unbuilt pages as they ship~~ (in progress)
- ~~"Qué hacemos" → `/que-hacemos`~~ ✅ (Phase 2.2)
- ~~"Cómo trabajamos" → `/como-trabajamos`~~ ✅ (Phase 2.1)
- ⬜ "Casos de éxito" → `/casos-de-exito` — when Phase 2.3 ships
- ⬜ "Modelo de alianza" → `/modelo-de-alianza` — when Phase 2.4 ships
- ⬜ "Sobre Escala" → `/sobre-escala` — when Phase 2.5 ships

### [PAGE-06-CTA] Switch IdealClientNote CTA to `/contacto` when Phase 3 ships
- `components/ideal-client-note.tsx` currently passes `ctaHref="#contacto"` (interim anchor to FinalCTA on same page).
- When Phase 3 (`/contacto`) is built, update `components/pages/services.tsx` to pass `ctaHref={getPath('contact', locale)}`.
- **Dependency:** PAGE-06 (`/contacto` page) must ship before this follow-up.
- No code changes needed to `SiteHeader` — the `pageId`-based active state already works once the href is a true route.
- Follow-up from SPEC-P2.1 decision (agreed with Carlos, April 2026).

### [PAGE-01] Qué hacemos `/que-hacemos`
- 5 service sections (problem-first, per spec §5.2 + Libro Ch. 11)
- IdealClientNote section + CTA (Libro Ch. 12)

### [PAGE-03] Casos de éxito index + detail pages
- Index: `/casos-de-exito` — CaseStudyCard components
- MAGUPELL: `/casos-de-exito/magupell` — narrative from spec §5.4 + Libro Ch. 15
- BioZero: `/casos-de-exito/biozero` — narrative from spec §5.4 + Libro Ch. 16
- CaseStudy template: sector eyebrow, H1, ImpactReadouts, narrative sections
- Data-driven: adding a case = data entry, not a new component

### [PAGE-04] Modelo de alianza `/modelo-de-alianza`
- WhyFive, FIG.05 constellation reused, ThreePlanes, Commitments (5, Libro Ch. 13), FinalCTA

### [PAGE-05] Sobre Escala `/sobre-escala`
- DNA (mission/vision), Values (5), Experience (anonymized, 6 areas), Manifesto (10 beliefs, mono-index style)
- FinalCTA
- Language references: Spanish and English only (per spec §5.6 + Libro Ch. 4). **No Russian.**

---

## Phase 3 — Contact, end to end

### [CONTACT-01] Connect contact form to API + email provider
- Add Next.js API route (`app/api/contact/route.ts`)
- Server-side validation (zod schema mirroring client validation)
- Honeypot field (anti-spam)
- Rate limiting per IP
- Transactional email via the same provider used in MAGUPELL
- Success/error response handled by `ContactForm` via fetch
- Error state shows `hola@escaladigitalventures.com` as direct fallback
- **Confirm final email address with Carlos before wiring**
- **Dependencies:** none (can be done before interior pages if needed)

### [PAGE-06] Contacto `/contacto`
- Dedicated contact page reusing `ContactForm` + live API from CONTACT-01
- H1 «Hablemos de tu negocio.»; lead per spec §5.7
- **Dependencies:** CONTACT-01

---

## Phase 4 — Legal & analytics

### [PAGE-07] Legal pages
- `/aviso-legal` — LSSI-CE: razón social, CIF, domicilio, datos registrales, email (Carlos provides final data; agent drafts)
- `/privacidad` — RGPD: responsable, finalidad, base legal, conservación, derechos, sin cesiones

### [ANALYTICS-01] Cookieless analytics
- Integrate Plausible (self-hosted) or equivalent per spec §8
- No cookie banner required (cookieless)
- Conversion events: contact form submit, CTA clicks

### 404 + favicon + OG images
- 404 page with the identity
- Favicon set
- OG images (abisal background, Archivo claim, ambre accent)

---

## Phase 5 — EN & CA content

### EN + CA dictionaries
- Claude delivers full `en` and `ca` dictionaries: claims recrafted (not translated)
  - EN primary: "We automate your business. We scale with you."
  - CA: «Automatitzem el teu negoci. Escalem amb tu.»
- Carlos reviews register of both languages
- Localized slugs active per spec §4.1; hreflang QA across all pages
- **Dependencies:** I18N-01 routing must be live

---

## Phase 6 — Google Cloud infrastructure & domain _(blocked: GCP not ready)_

### GCP Cloud Run + GitHub Actions
- Dockerfile (`output: "standalone"`)
- Cloud Run services: `dev` + `prod`, European region
- GitHub Actions: lint + test + build → deploy dev → manual approval → prod
- `dev.escaladigitalventures.com` protected (IAP or basic auth)
- Domain mapping for prod prepared (DNS not switched until Phase 7)
- **Note:** The dev/main branch workflow will be configured here. Branches can be created earlier without the cloud target.

---

## Phase 7 — Launch QA & go-live

### [PERF-01] Lighthouse ≥ 95 in all categories
- Fonts already self-hosted via `next/font`
- Verify zero third-party scripts post-analytics
- Image optimization: real case-study imagery if clients provide

### Launch checklist
- AA + keyboard audit; real-device responsive pass (360px minimum)
- Forms e2e in dev environment
- Sitemap/robots verified
- Structured data validated
- DNS switch → production live
- Post-launch: extract reusables to escala-dev-standards (diagram kit, i18n pattern, web rules template)

---

## Out of scope v1 (architecture-ready per spec §9)

- Blog/insights section
- Newsletter
- `colivares.com` link (text mention only until site is live — no `<a>` tag)
- Dark mode toggle
- CRM integration
