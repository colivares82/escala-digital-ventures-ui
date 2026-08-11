# escaladigitalventures.com — Website Content & Design Specification

**Version:** 1.1.1 · August 2026
**Supersedes:** v1.1 (Aug 2026). Changelog at the end.
**Source of truth:** "El Libro de Escala v2.2" (knowledge base — IP/ownership corrected). This spec derives from it and is the single reference for building the website. All copy shown here is final ES master copy unless marked otherwise. EN and CA are derived translations (§7).
**How to use:** lives in `/docs` of the repo `escala-digital-ventures-ui`. Every development iteration starts from a numbered iteration spec that references this document. Nothing on the website may contradict this spec or the Libro de Escala.

---

## 1. Purpose and constraints

- Corporate website for Escala Digital Ventures, S.L.U. — a product & technology studio in Mataró (Barcelona) partnering with a deliberately small number of companies (~5 alliances).
- Primary goal: qualified conversations with ideal-fit companies ("Hablemos de tu negocio"). Secondary: credibility through verifiable facts.
- Multi-page site with navigable URLs; the home is the first point of contact, not an infinite landing. The home includes the contact form (final section) to minimize friction to the single conversion goal.
- Languages at launch: **ES (default), EN, CA**. **Russian is NOT a working language — it must not appear anywhere on the site or in derived materials.**
- Stack: Next.js (App Router) + TypeScript strict + Tailwind + framer-motion. SSG for all pages. Deployment: containerized on Google Cloud Run (dev + prod), CI/CD GitHub Actions — configured in the FINAL phase of the plan (see docs/escala-web-plan.md).
- No blog in v1; architecture must allow `/insights` later without restructuring.
- Editorial hard rules (Libro, Ch. 19):
  - Never name former employers. Anonymized formulas only: "multinacionales líderes de software empresarial", "plataformas usadas por más de 40.000 empresas en más de cien países".
  - The founder's trajectory lives at colivares.com; mention as plain text, no link, until that site is live.
  - Case studies use real names (MAGUPELL, BioZero — permission confirmed) and ONLY verifiable facts. No invented figures, percentages or metrics anywhere, ever.
  - Voice: first person plural, direct, confident, close. Business before technology. No empty jargon.

## 2. Brand foundation (from the Libro de Escala)

**Positioning.** Not a software house, not an agency, not a consultancy: a technology partner building durable digital capabilities for a small group of companies — their external technology, innovation and product department.

**Key messages (approved claims, verbatim in ES):**
1. «Automatizamos tu negocio. Escalamos contigo.» *(primary)*
2. «Software a medida, criterio de producto y compromiso de socio.»
3. «Convertimos procesos manuales en plataformas que crecen contigo.»
4. «Cinco alianzas. Toda nuestra dedicación.»
5. «La disciplina del software empresarial global, aplicada a tu negocio.»
6. «De la hoja de cálculo a tu propia plataforma en producción.»
7. «IA aplicada con criterio: donde aporta, no donde adorna.»
8. «No construimos aplicaciones. Construimos capacidades.»
9. «Tu departamento de tecnología, innovación y producto.»

**Proof points (verifiable):**
- MAGUPELL: 100+ functional requirements in production · 200+ automated tests · live on own domain on Google Cloud since 1 July 2026 · the client runs its real operation (customers, suppliers, internal management roles) and invoices through the platform.
- BioZero: first version delivered; collaborative clinical records; patient gamification; AI vision analysis in a regulated sector.
- Experience: 20+ years across engineering, architecture and product leadership; platforms used by tens of thousands of companies in 100+ countries; MIT certification in Designing and Building AI Products and Services; professional work in Spanish and English environments.

## 3. Visual identity — AS BUILT: "Sistemas en movimiento"

*(Replaces v1.0 §3 "El instrumento de medida" entirely. This section documents the identity approved through the v0 exploration, August 2026.)*

### 3.1 Design principle

Escala shows **systems working**, not decoration. The identity is carried by three layers: (a) animated technical line diagrams with meaning (the FIG system), (b) choreographed but purposeful motion, and (c) a disciplined alternating dark/light rhythm. The methodology is represented as what it truly is — a continuous cycle (the PhaseCycle ring), not a growth line.

### 3.2 Color tokens

- `--paper` #F7F7F4 — light surfaces background
- `--ink` #16181D — text on light surfaces
- `--mar` #0E3A5D — links, buttons, active states on light surfaces; readout figures
- `--abisal` #0A2B45 — dark surfaces (hero, framework, alliance, contact); subtle radial gradient allowed toward `--abisal-deep` #082238 on dark surfaces only
- `--ambre` #FFB703 — the single accent: tick-marks, pulses, active states, data highlights, marquee band. Never large text, never body copy. Soft glow (8–12px blur) allowed on pulses/dots.
- Dark surfaces carry a faint engineering grid (1px paper lines, 4–5% opacity, 48px cells) + subtle noise (2–3%). Light surfaces stay clean.

### 3.3 Typography tokens

- Display: **Archivo** SemiExpanded 500–600. Body: **Instrument Sans** 400/500. Data/labels/eyebrows: **IBM Plex Mono** 400/500. All self-hosted via `next/font`.
- Exactly three display sizes, tokenized — no ad-hoc heading sizes:
  - `--text-display-xl` clamp(3.5rem, 8vw, 7rem) — home hero H1 ONLY.
  - `--text-display-lg` clamp(2.5rem, 5vw, 4rem) — all section H2s, page H1s on interior pages, contact headline, phase names.
  - `--text-figure` clamp(2.25rem, 3.5vw, 3.25rem) — readout figures. A data value is never larger than a headline.
  - Sub-tokens: section-header variant clamp(2rem, 3.4vw, 3rem) (e.g., framework top band); compact display ~1.35rem for chip/card titles.
- Ghost numbers (decorative): mono/display at 7–8% opacity.

### 3.4 The FIG system (signature diagrams)

Line-art engineering illustrations, each numbered and captioned like an engineering plate ("FIG. 0X — …"), with corner ticks framing, drawn-on-scroll stroke animation (once), 1.5px strokes (paper on dark, ink on light), dashed = manual/broken flows, solid = automated, `--ambre` reserved for traveling pulses, alerts and highlights. IBM Plex Mono micro-labels from Escala's world.
- FIG. 01 (hero, dark): manual artifacts (HOJA DE CÁLCULO, CORREO, ALBARÁN, NOTAS) converging through NÚCLEO into the ordered platform (PLATAFORMA, FACTURACIÓN, INFORMES, DATOS). Assembles on load; pulses loop.
- FIG. 02 (problem, light): pentagon of HOJA DE CÁLCULO, PERSONAS, CORREO, NOTAS, ALBARÁN all funneling into center node RETRABAJO (ambre alert); "×" friction marks at crossings.
- FIG. 04 (proof, light): stair-step of real milestones — ESPECIFICACIÓN → CONSTRUCCIÓN → 200+ PRUEBAS → PRODUCCIÓN (JUL 2026) → OPERATIVA REAL: CLIENTES · PROVEEDORES · GESTIÓN INTERNA.
- FIG. 05 (alliance, dark): radial constellation — double-ring ESCALA center; 5 orbit nodes: MAGUPELL and BIOZERO solid with ambre pulses, 3 dashed DISPONIBLE at 50%. Compact: frame ≤480px tall, labels outside rings. Legend: "CADA ALIANZA: PLANO TÉCNICO · ESTRATÉGICO · VISIONARIO".
- Diagram labels never clip at viewport edges; only strokes may bleed.

### 3.5 PhaseCycle — "El Ciclo" (flagship component)

The Escala Growth Framework rendered as a RING (it is "un ciclo continuo de mejora"):
- Pinned full-viewport section, two stacked bands (wireframe-iter03): TOP BAND — eyebrow "03 / EL CICLO DE CRECIMIENTO" left + "Cómo trabajamos ↗" right; headline "Un método propio: el Escala Growth Framework" at the section-header token; mono lead "DIEZ FASES · UN CICLO CONTINUO DE MEJORA". BODY — left: FASE XX/10 + phase name (display-lg) + description (19px, 55ch); right: the ring.
- Ring (wireframe-iter02 geometry, ~520 viewBox, R≈185): base ring paper 18%; ambre 3px progress arc from 12 o'clock; 10 numbered nodes clockwise (active r18 ambre, completed ambre, upcoming paper 35%); labels outside at R+44; dashed ambre outer arc Evolve→Discover; ghost phase number centered inside.
- Scroll progress advances phases (native scroll, never hijacked); nodes clickable; ring draws in once. No bottom rail (the ring is the indicator). Mobile/reduced-motion: vertical 10-phase list with descriptions and drawn connectors; top band becomes a normal header.
- Reference mockups in repo: `specs/mockups/wireframe-iter02-phasejourney-hechos.html`, `specs/mockups/wireframe-iter03-phasecycle-header.html`.

### 3.6 Motion language

framer-motion; smooth scroll; claims reveal line-by-line with mask (stagger 80ms); readout counters with springs; ClaimsMarquee (ambre band, mono, 30s loop, pause on hover); durations 300–900ms, ease-out, play once. Full `prefers-reduced-motion` fallback (static, never hidden). Every animation communicates progress, sequence or measurement — no decorative motion. Forbidden: stock photos, glassmorphism, particle/blob backgrounds, scroll-jacking, autoplaying carousels, emoji in UI, gradients on light surfaces.

### 3.7 Layout & rhythm

Sections alternate dark/light: 00 hero (abisal) → 01 problem (paper) → 02 services (paper) → 03 framework (abisal) → 04 evidence (paper) → 05 alliance (abisal) → 06 conversation (abisal) → footer (paper). Mono section indexes ("0X / NAME") top-left of every section, consecutive, no gaps. Max radius 2px. Asymmetric compositions; no viewport state >40% empty. Editorial index lists instead of equal-card grids. Accessibility floor: AA contrast on every surface, visible focus (ambre outline), keyboard operability (ring nodes, chips, form), responsive to 360px.

## 4. Site architecture, routes and i18n

### 4.1 Pages and localized routes

| Page | ES (root) | EN (`/en`) | CA (`/ca`) |
|---|---|---|---|
| Home | `/` | `/en` | `/ca` |
| Services | `/que-hacemos` | `/en/what-we-do` | `/ca/que-fem` |
| Method | `/como-trabajamos` | `/en/how-we-work` | `/ca/com-treballem` |
| Cases (index) | `/casos-de-exito` | `/en/case-studies` | `/ca/casos-dexit` |
| Case: MAGUPELL | `/casos-de-exito/magupell` | `/en/case-studies/magupell` | `/ca/casos-dexit/magupell` |
| Case: BioZero | `/casos-de-exito/biozero` | `/en/case-studies/biozero` | `/ca/casos-dexit/biozero` |
| Alliance model | `/modelo-de-alianza` | `/en/alliance-model` | `/ca/model-dalianca` |
| About | `/sobre-escala` | `/en/about-escala` | `/ca/sobre-escala` |
| Contact | `/contacto` | `/en/contact` | `/ca/contacte` |
| Legal notice | `/aviso-legal` | `/en/legal-notice` | `/ca/avis-legal` |
| Privacy | `/privacidad` | `/en/privacy` | `/ca/privacitat` |

Slug map single-sourced in `/lib/i18n/routes.ts`. `hreflang` alternates + `x-default` → ES. LocaleSwitcher preserves the current page. Header nav: Qué hacemos · Cómo trabajamos · Casos de éxito · Modelo de alianza · Sobre Escala + «Hablemos» button + ES/EN/CA switcher. Footer: claim #1, nav, legal links, "Escala Digital Ventures, S.L.U. · Mataró, Barcelona", plain-text colivares.com mention.

### 4.2 Content model

All copy in typed per-locale dictionaries (`/content/{es,en,ca}/`), zero literals in JSX. Case studies and client chips render from a typed data array — adding a case adds data, not components.

## 5. Page-by-page specification (ES master copy)

### 5.1 Home `/` — AS BUILT (7 sections + footer)

00 **Hero** (abisal) — eyebrow marquee position; H1 «Automatizamos tu negocio. Escalamos contigo.» (display-xl, cols 1–7); sub "Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global."; CTAs «Hablemos de tu negocio» → §06 / «Cómo trabajamos ↓»; right: FIG. 01 with ambre meta line above, caption below, top-aligned with the H1 cap height. ClaimsMarquee (ambre band) between hero and 01.
01 **Punto de partida** (paper) — H2 "Tu operativa llegó a su límite, no tus objetivos." (SPEC-POLISH-02); mono symptom strip horizontal (VOLUMEN QUE CRECE · ERRORES QUE SE MULTIPLICAN · FACTURACIÓN QUE SE RETRASA · DEPENDENCIA DE PERSONAS) with dashed ticks, closed by 1px divider; below: two balanced columns — body left (two paragraphs: "Has construido un negocio que funciona…" / "Escala entra ahí…") · FIG. 02 right (five named pieces around fragile PROCESOS MANUALES core, discontinuous flows, ambre pulses stop at break).
02 **Capacidades** (paper) — H2 "Qué hacemos" + "Ver todos los servicios ↗"; editorial index list of the 5 service lines (mono number · large title · one problem line · arrow), NOT a card grid.
03 **El Ciclo de Crecimiento** (abisal) — the PhaseCycle per §3.5.
04 **Evidencia** (paper) — H2 "Hechos, no promesas."; mono line "EVIDENCIA VERIFICADA EN CLIENTES REALES"; two ClientChips (MAGUPELL — EN PRODUCCIÓN · SECTOR PIEL / BioZero — V1 ENTREGADA · CLÍNICA DENTAL + IA, each with "VER CASO ↗" → case pages); FIG. 04 right; DAT grid 2×2: DAT.01/REQUISITOS/MAGUPELL "100+" · DAT.02/PRUEBAS/MAGUPELL "200+" · DAT.03/PRODUCCIÓN/MAGUPELL "JUL 2026" · DAT.04/OPERATIVA/MAGUPELL "REAL — clientes, proveedores y gestión interna operando en la plataforma". No large case cards on home (they live on /casos-de-exito).
05 **Modelo de alianza** (abisal) — H2 «Cinco alianzas. Toda nuestra dedicación.»; paragraph + «Conoce el modelo de alianza ↗»; FIG. 05 constellation.
06 **Conversación** (abisal) — H2 «Hablemos de tu negocio.» (display-lg) + "Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer."; ContactForm right (Nombre · Empresa · Email · "¿Qué frena tu crecimiento?" · RGPD checkbox → /privacidad · ENVIAR); meta mono: hola@escaladigitalventures.com · MATARÓ · BARCELONA · "TRABAJAMOS EN ESPAÑOL, INGLÉS Y CATALÁN." Text block and form vertically centered as a unit.
Footer (paper) — per §4.1.

### 5.2 Qué hacemos `/que-hacemos`

PageHeader H1 "Qué hacemos"; lead "No ofrecemos un catálogo de servicios: diseñamos cada colaboración alrededor de los objetivos de tu negocio. Estas son las cinco líneas que casi siempre se combinan dentro de una misma alianza." Then 5 ServiceSections (mono index; H2; problem paragraph; what-we-do paragraph — copy per v1.0/Libro Ch. 11, unchanged):
1. Transformación digital y automatización de procesos · 2. Desarrollo de plataformas (ownership framing: "Una solución a medida de tu negocio; obtienes una licencia de uso indefinida y la propiedad de tus datos. La propiedad intelectual y el código son de Escala.") · 3. Automatización e IA aplicada · 4. CTO y Product Leadership fraccional · 5. Operación, soporte y evolución continua.
Closing **IdealClientNote** — H2 "¿Encajamos?" (Libro Ch. 12) + CTA → contact. Small line-art inline diagrams per service allowed (FIG-kit style, "Fig." plates).

### 5.3 Cómo trabajamos `/como-trabajamos`

PageHeader H1 "Cómo trabajamos"; lead "Un marco estratégico propio y una práctica de ejecución disciplinada. El objetivo nunca es entregar software: es aumentar la capacidad de crecimiento de tu negocio."
- **PhaseCycle reused as-is** (the §3.5 component, full interactive version).
- **ExecutionPractice** — H2 "La ejecución, en el día a día": the 5 practices (Libro Ch. 9) as editorial list: Dirigido por especificaciones (incl. "Cuando hay interfaz, la especificación incluye un prototipo visual navegable que apruebas antes de construir.") · Desarrollo asistido por IA, dirigido por criterio humano senior · Calidad verificable · Iteración basada en uso real · Acompañamiento trazable.
- **HowWeBuild** — H2 "La IA también en cómo construimos" (Libro Ch. 7 closing).
- FinalCTA.

### 5.4 Casos de éxito `/casos-de-exito` (+ detail template)

Index: H1 "Casos de éxito"; lead "Más que proyectos: transformación empresarial. Contamos cada caso con datos verificables y con el permiso del cliente."; case cards (the large-card component retired from home lives here).
Case template (data-driven): sector eyebrow · H1 · readout row · narrative Contexto → Problema → Solución → Impacto → Siguientes pasos (copy verbatim-adapted from Libro Chs. 15–16). MAGUPELL readouts: 100+ requisitos · 200+ pruebas · Producción 1 julio 2026 · Operativa y facturación reales a través de la plataforma.

### 5.5 Modelo de alianza `/modelo-de-alianza`

H1 «Cinco alianzas. Toda nuestra dedicación.»; lead "No buscamos proyectos; buscamos socios. Y elegimos a nuestros socios tanto como ellos nos eligen a nosotros." Sections: WhyFive (Ch. 11) · FIG. 05 constellation reused · ThreePlanes (Plano técnico / estratégico / visionario, Ch. 11) · Commitments (the 5 commitments, Ch. 13, editorial numbered list with the FIG-kit tick treatment) · FinalCTA.

### 5.6 Sobre Escala `/sobre-escala`

H1 "Sobre Escala"; lead "Escala Digital Ventures, S.L.U. es un estudio de producto y tecnología con sede en Mataró (Barcelona), constituido en 2026." Sections: DNA (mission/vision, Ch. 1, + "¿seguirá aportando valor dentro de diez años?") · Values (5, Ch. 1) · Experience (Ch. 4 anonymized; 6 expertise areas compact; closing plain-text line "La trayectoria completa de nuestro Director General está disponible como referencia pública en colivares.com.") · Manifesto (the 10 beliefs, Ch. 3, numbered 01–10 in the identity's mono-index style) · FinalCTA. **Language references: Spanish and English (per Libro Ch. 4). No Russian.**

### 5.7 Contacto `/contacto`

Reuses the home §06 ContactForm and layout as a standalone page. H1 «Hablemos de tu negocio.»; lead "Escuchamos antes de proponer. Cuéntanos qué frena tu crecimiento y te diremos, con honestidad, si podemos ayudarte — y si encajamos como socios." Meta line: "Mataró · Barcelona · Trabajamos en español, inglés y catalán."
Form backend (Phase F3): API route → transactional email provider (same as MAGUPELL), server-side validation, honeypot, rate limit. Success: "Recibido. Te responderemos personalmente en un plazo de dos días laborables." Error: plain explanation + direct email fallback. No CRM in v1.

### 5.8 Legal pages

`/aviso-legal` (LSSI-CE: razón social, CIF, domicilio, datos registrales, email — Carlos provides) · `/privacidad` (RGPD: responsable, finalidad, base legal, conservación, derechos, sin cesiones). Cookieless analytics → no cookie banner in v1.

## 6. Design system inventory — AS BUILT

**Tokens:** §3.2 colors + §3.3 type tokens as CSS variables + Tailwind theme, single file, zero hardcoded hex/sizes in components.
**Primitives:** Button (mar solid / ink outline / mono link underline-slide) · Eyebrow · SectionIndex (mono "0X / NAME") · Prose · FormField set · Section/Container (owns rhythm + dark/light surface + grid/noise on dark).
**Signature components:** SystemDiagram (variants: hero FIG.01, problem FIG.02) · StairFigure (FIG.04) · AllianceConstellation (FIG.05) · PhaseCycle (§3.5) · Readout (DAT cell: label / mini-plot / figure / caption) · ClientChip · ClaimsMarquee · CaseStudyCard (case pages) · GhostNumber.
**Layout:** SiteHeader (nav + Hablemos + LocaleSwitcher) · SiteFooter · PageHeader (interior pages) · FinalCTA · ContactForm.
**Styleguide:** `/styleguide` (noindex) renders all tokens + components + variants — kept current on every component change.
*(Component names to be verified against the repo in Phase F0; if the repo differs, this list is updated to match the code.)*

## 7. i18n content workflow

ES master (this spec). EN/CA are recrafted professional-register translations of claims (EN primary: "We automate your business. We scale with you."; CA: «Automatitzem el teu negoci. Escalem amb tu.»), reviewed by Carlos before launch. Dictionaries per locale; slugs per §4.1; localized metadata (title ≤60, description ≤155); sitemap with alternates; robots.txt.

## 8. SEO, analytics, performance

SSG everywhere; OG images with the identity (abisal background, claim in Archivo, ambre accent); `Organization` + `ProfessionalService` structured data on home, `BreadcrumbList` on interior pages; cookieless analytics; Lighthouse ≥95 all categories; fonts self-hosted; zero third-party scripts except analytics.

## 9. Out of scope v1 (architecture-ready)

Blog/insights · newsletter · colivares.com link (text only until live) · dark mode toggle · CRM.

---

## Changelog v1.0 → v1.1

1. §3 fully replaced: identity is the as-built "Sistemas en movimiento" (abisal/ambre #FFB703, FIG diagram kit, PhaseCycle ring, motion language, three type tokens) — supersedes "El instrumento de medida" (ScaleRule + calibre #E8590C).
0. (v1.1.1) IP/ownership corrected sitewide: the client does NOT own the code. Escala retains intellectual property and source code; the client receives an indefinite, exclusive use licence over their platform, owns their data, and gets sector exclusivity. Source of truth pinned to Libro v2.2 (new Ch. 13 section "Propiedad intelectual y modelo de colaboración"). Service line 2 reworded; any "propietario de … código" phrasing removed.
2. §5.1 home rewritten to the as-built 7-section structure: contact form in the home; client chips replace large case cards; DAT.04 = OPERATIVA; stair milestone "OPERATIVA REAL: CLIENTES · PROVEEDORES · GESTIÓN INTERNA"; ClaimsMarquee; section index map 00–06.
3. **Russian removed everywhere** (Carlos does not speak Russian): languages are Spanish, English and Catalan on the site; "ES/EN/RU environments" corrected to ES/EN (§2); contact meta lines updated (§5.1/§5.7); §5.6 experience references ES/EN per Libro Ch. 4.
4. §6 inventory updated to the as-built components; ScaleRule/PhasePanel retired.
5. Deployment note: GCP infra + domain configured in the final phase per plan.
6. Wireframes referenced as repo assets in `specs/mockups/`.
