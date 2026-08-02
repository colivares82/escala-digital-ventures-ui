# escaladigitalventures.com — Website Content & Design Specification

**Version:** 1.0 · August 2026
**Source of truth:** "El Libro de Escala v2.1" (knowledge base). This spec derives from it and is the single data source for building the website. All copy shown here is final ES master copy unless marked otherwise. EN and CA versions are derived translations (see §7).
**How to use:** Attach this file as a Source in the v0 project. Prompts give instructions; this document provides all content, structure, and design direction. Nothing on the website may contradict this spec or the Libro de Escala.

---

## 1. Purpose and constraints

- Corporate website for Escala Digital Ventures, S.L.U. — a product & technology studio in Mataró (Barcelona) that partners with a deliberately small number of companies (~5 alliances).
- Primary goal: generate qualified conversations with ideal-fit companies ("Hablemos de tu negocio"). Secondary: establish credibility through verifiable facts (real production, real invoicing, real tests).
- Multi-page site with navigable URLs. The home page is the first point of contact, not an infinite landing.
- Languages at launch: **ES (default), EN, CA**.
- Stack: Next.js (App Router) + TypeScript strict + Tailwind. Static generation (SSG) for all pages. Deployed containerized on Google Cloud Run (dev + prod), CI/CD with GitHub Actions.
- No blog in v1, but information architecture must allow adding `/insights` later without restructuring.
- Editorial hard rules (from the Libro, Ch. 19):
  - Never name former employers. Use anonymized formulas: "multinacionales líderes de software empresarial", "plataformas usadas por más de 40.000 empresas en más de cien países".
  - The founder's personal trajectory is not detailed on this site; it will live at colivares.com. Until that site is live, mention it without linking (plain text, no `<a>`).
  - Case studies use real names (MAGUPELL, BioZero — client permission confirmed) and only verifiable facts.
  - Voice: first person plural, direct, confident, close. Business before technology. No empty jargon. Promise only what can be demonstrated.

---

## 2. Brand foundation (from the Libro de Escala)

**Positioning.** Escala is not a software house, not a digital agency, not a traditional consultancy. It is a technology partner that builds durable digital capabilities for a small group of companies, acting as their external technology, innovation and product department.

**Mission.** Automate business systems and processes, foster scalability and efficiency, through growth alliances where Escala accompanies each client hand-in-hand — technically, strategically and visionarily.

**Key messages (approved claims, use verbatim in ES):**
1. «Automatizamos tu negocio. Escalamos contigo.» *(primary claim)*
2. «Software a medida, criterio de producto y compromiso de socio.»
3. «Convertimos procesos manuales en plataformas que crecen contigo.»
4. «Cinco alianzas. Toda nuestra dedicación.»
5. «La disciplina del software empresarial global, aplicada a tu negocio.»
6. «De la hoja de cálculo a tu propia plataforma en producción.»
7. «IA aplicada con criterio: donde aporta, no donde adorna.»
8. «No construimos aplicaciones. Construimos capacidades.»
9. «Tu departamento de tecnología, innovación y producto.»

**Proof points (verifiable, usable as displayed figures):**
- MAGUPELL: 100+ functional requirements in production, 200+ automated tests, live on own domain on Google Cloud since 1 July 2026, client invoices its own customers through the platform.
- BioZero: first version delivered; AI vision analysis in a regulated sector; collaborative clinical records; gamification.
- Experience behind the firm: 20+ years across engineering, architecture, product leadership; platforms used by tens of thousands of companies in 100+ countries; MIT certification in Designing and Building AI Products and Services; work in ES/EN/RU environments.

---

## 3. Visual identity brief (created from scratch)

### 3.1 Design principle

**"El instrumento de medida"** — the website is designed like a precision instrument. The name *Escala* means both *growth* and *scale as a measuring device*. The identity takes the second meaning to express the first: Escala measures, specifies, verifies — and that is why its clients grow. Inspiration lineage: technical/engineering drawing and instrument design (calibration marks, graduation, precise readouts), executed with generous Mediterranean whitespace and warmth — **not** a newspaper/broadsheet look, **not** a blueprint cliché, **not** a dark-mode tech template.

### 3.2 Signature element

**The calibrated rule ("la regla").** A system of fine graduation tick-marks used consistently and sparingly:
- Section dividers are calibrated rules (major/minor ticks), not plain horizontal lines.
- The Escala Growth Framework is rendered as a horizontal 10-graduation scale (the flagship component of the site).
- Key figures (100+, 200+, 5, 10) are displayed as "instrument readouts": mono type, small unit labels, one accent tick.
- On page load of the home hero, the rule "draws in" once (ticks appear sequentially, ≤600ms, respects `prefers-reduced-motion`).
This is the ONE bold element. Everything else stays quiet and disciplined. Do not add gradients, glassmorphism, floating blobs, particle backgrounds, or stock illustrations.

### 3.3 Design tokens

**Color (4 named values + neutrals):**
- `--paper` #F7F7F4 — background ("papel técnico": near-white with a faint cool-grey cast; NOT warm cream)
- `--ink` #16181D — text, near-black with a cold undertone
- `--mar` #0E3A5D — deep Mediterranean sea blue; primary accent: links, buttons, active states
- `--calibre` #E8590C — instrument orange; ONLY for tick-marks, data highlights and the active graduation. Never for large surfaces, never for body text.
- Neutrals: derive 3 greys from `--ink` at low opacities for borders, captions, disabled states.
- Dark mode: not in v1.

**Typography (all Google Fonts, self-hosted via `next/font`):**
- Display: **Archivo** (SemiExpanded or Expanded width, weights 500–600). Wide, confident, technical. Used for H1–H2 and claims.
- Body: **Instrument Sans** (400/500). The name is a happy coincidence with the design principle.
- Data/labels: **IBM Plex Mono** (400/500) for figures, phase numbers, eyebrows, form labels, footer meta.
- Scale: fluid type. H1 clamp(2.6rem → 4.5rem), tight leading (1.05) and slight negative tracking on display sizes; body 1rem–1.125rem, leading 1.6.

**Layout:**
- 12-column grid, max-width 1200px, generous vertical rhythm (sections ≥ 128px apart on desktop).
- Asymmetry as a rule: hero and section headers sit on columns 1–7; supporting content offsets to columns 6–12. Avoid centered symmetrical hero.
- Border radius: 2px max (instrument, not app). Buttons: rectangular, 1px `--ink` border or solid `--mar`.
- Photography: none in v1 except case-study context if the client provides real imagery. No stock photos. Abstract visual weight comes from the rule system and typography.

**Motion:** one orchestrated moment (hero rule draw-in) + subtle hover states (tick highlight, underline slide). Nothing scroll-jacking. `prefers-reduced-motion` fully respected.

**Accessibility floor:** WCAG AA contrast, visible keyboard focus (2px `--calibre` outline offset 2px), semantic landmarks, skip-link.

---

## 4. Site architecture, routes and i18n

### 4.1 Pages and localized routes

| Page | ES (default, no prefix) | EN (`/en`) | CA (`/ca`) |
|---|---|---|---|
| Home | `/` | `/en` | `/ca` |
| Services | `/que-hacemos` | `/en/what-we-do` | `/ca/que-fem` |
| Method | `/como-trabajamos` | `/en/how-we-work` | `/ca/com-treballem` |
| Case studies (index) | `/casos-de-exito` | `/en/case-studies` | `/ca/casos-dexit` |
| Case: MAGUPELL | `/casos-de-exito/magupell` | `/en/case-studies/magupell` | `/ca/casos-dexit/magupell` |
| Case: BioZero | `/casos-de-exito/biozero` | `/en/case-studies/biozero` | `/ca/casos-dexit/biozero` |
| Alliance model | `/modelo-de-alianza` | `/en/alliance-model` | `/ca/model-dalianca` |
| About | `/sobre-escala` | `/en/about-escala` | `/ca/sobre-escala` |
| Contact | `/contacto` | `/en/contact` | `/ca/contacte` |
| Legal notice | `/aviso-legal` | `/en/legal-notice` | `/ca/avis-legal` |
| Privacy | `/privacidad` | `/en/privacy` | `/ca/privacitat` |

- Implementation: locale segment routing with a slug map (single source in `/lib/i18n/routes.ts`). ES lives at the root (no `/es` prefix). `hreflang` alternates + `x-default` → ES on every page. Locale switcher preserves the current page.
- Header nav (in order): Qué hacemos · Cómo trabajamos · Casos de éxito · Modelo de alianza · Sobre Escala — plus a distinct button «Hablemos» → contact, and the locale switcher (ES / EN / CA, mono type).
- Footer: claim #1, nav repeat, legal links, company line "Escala Digital Ventures, S.L.U. · Mataró, Barcelona", mention (no link yet) "Dirección general: referencia en colivares.com".

### 4.2 Content model note

All page copy lives in typed dictionaries per locale (`/content/{es,en,ca}/…​.ts`), not hardcoded in components. Case studies are structured data (one object per case) rendered by a shared template — adding future cases must require zero component changes.

---

## 5. Page-by-page specification (ES master copy)

> Copy in quotes is final ES text. Section names are component references (§6).

### 5.1 Home `/`

**Goal:** in one scroll, communicate what Escala is, prove it, and drive to contact.

1. **Hero** — eyebrow (mono): "Escala Digital Ventures · Estudio de producto y tecnología · Mataró, Barcelona". H1: «Automatizamos tu negocio. Escalamos contigo.» Sub: "Convertimos procesos manuales en plataformas propias que crecen contigo, con la disciplina del software empresarial global." CTA primario: «Hablemos de tu negocio» → contact. CTA secundario (link): «Cómo trabajamos». Signature rule draws in under the H1.
2. **ProblemSection** — H2: "Tu negocio funciona. Tus sistemas, no." Body: "Hojas de cálculo, correos, documentos sueltos y el conocimiento en la cabeza de dos o tres personas. Funciona… hasta que deja de funcionar: el volumen crece, los errores se multiplican, la facturación se retrasa y el negocio depende de que nadie se ponga enfermo. Escala entra exactamente ahí: digitaliza y automatiza el corazón operativo de tu empresa y lo convierte en una plataforma propia sobre la que puedes crecer."
3. **ServicesPreview** — H2: "Qué hacemos". The 5 service lines as compact cards (title + one problem-first sentence each; full copy in §5.2). Link: «Ver todos los servicios».
4. **FrameworkStrip** — the 10-phase ScaleRule component with phase names on graduations. H2: "Un método propio: el Escala Growth Framework". One line: "Diez fases que conectan negocio, personas, procesos y tecnología en un ciclo continuo de mejora." Link → method page.
5. **ProofSection** — H2: "Hechos, no promesas." MAGUPELL readouts: "100+ requisitos en producción · 200+ pruebas automatizadas · En producción desde julio 2026 · El cliente factura a través de su plataforma". Two CaseStudyCards (MAGUPELL, BioZero) → case pages.
6. **AllianceTeaser** — H2: «Cinco alianzas. Toda nuestra dedicación.» Body: "Limitamos deliberadamente el número de clientes activos para garantizar dedicación, cercanía y acompañamiento continuo. No es una limitación: es el modelo." Link → alliance model.
7. **FinalCTA** — H2: «Hablemos de tu negocio.» Body: "Cuéntanos qué frena tu crecimiento. Escuchamos antes de proponer." Button → contact.

### 5.2 Qué hacemos `/que-hacemos`

**Goal:** explain the 5 service lines from the client's problem, never from technology.

- **PageHeader** — H1: "Qué hacemos". Lead: "No ofrecemos un catálogo de servicios: diseñamos cada colaboración alrededor de los objetivos de tu negocio. Estas son las cinco líneas que casi siempre se combinan dentro de una misma alianza."
- **ServiceSection ×5** (each: mono index on the rule, H2, problem paragraph, what-we-do paragraph):
  1. "Transformación digital y automatización de procesos" — problem: "Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas." What: "Analizamos procesos, herramientas y flujos para simplificar, automatizar y modernizar: desde la captura del dato en origen hasta la facturación y el informe final."
  2. "Desarrollo de plataformas" — problem: "El software genérico no encaja con tu realidad." What: "Diseñamos y construimos aplicaciones web y plataformas a medida —no plantillas—, con usuarios y roles, dominio propio, correo transaccional, generación de documentos y facturación integrada. Arquitectura preparada para evolucionar durante años. Tú eres propietario de tu plataforma, tu código y tus datos."
  3. "Automatización e IA aplicada" — problem: "Todo el mundo habla de IA; pocos la aplican con retorno." What: "Integramos modelos de lenguaje y de visión donde generan valor real y medible: menos tareas repetitivas, análisis de imágenes, mejores decisiones. IA aplicada con criterio: donde aporta, no donde adorna."
  4. "CTO y Product Leadership fraccional" — problem: "Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo." What: "Visión tecnológica, roadmap, especificación funcional, priorización, gestión de proveedores e iniciativas de innovación, con experiencia ejecutiva real."
  5. "Operación, soporte y evolución continua" — problem: "El software que no evoluciona, muere." What: "Mantenemos tu plataforma en producción, resolvemos incidencias y la mejoramos cada mes a partir del feedback real de tus usuarios. Con trazabilidad completa del trabajo realizado."
- **IdealClientNote** — H2: "¿Encajamos?" Body: "Trabajamos con negocios sólidos cuya operativa ha crecido más rápido que sus sistemas: empresas familiares y pymes consolidadas, negocios de nicho B2B y compañías que quieren incorporar IA con retorno real. El requisito más importante no es el sector ni el tamaño: es la voluntad de construir una relación de largo plazo." CTA → contact.

### 5.3 Cómo trabajamos `/como-trabajamos`

**Goal:** show the method (framework) and the execution practice (the two competitive advantages).

- **PageHeader** — H1: "Cómo trabajamos". Lead: "Un marco estratégico propio y una práctica de ejecución disciplinada. El objetivo nunca es entregar software: es aumentar la capacidad de crecimiento de tu negocio."
- **FrameworkFull** — H2: "The Escala Growth Framework". Interactive ScaleRule: the 10 phases as graduations; selecting a phase reveals its description. Phase copy (verbatim from the Libro, Ch. 8): Discover, Understand, Simplify, Design, Validate, Build, Automate, Scale, Measure, Evolve — each with its one-paragraph description.
- **ExecutionPractice** — H2: "La ejecución, en el día a día". Five practices (H3 + paragraph, from Ch. 9): "Dirigido por especificaciones" (includes: "Cuando hay interfaz, la especificación incluye un prototipo visual navegable que apruebas antes de construir."), "Desarrollo asistido por IA, dirigido por criterio humano senior", "Calidad verificable", "Iteración basada en uso real", "Acompañamiento trazable".
- **HowWeBuild** — H2: "La IA también en cómo construimos". Body: "Usamos un flujo propio de ingeniería asistida por agentes de IA, gobernado por una biblioteca interna de estándares, reglas y patrones probados en producción. Entregamos con la velocidad de un equipo completo y la coherencia de una sola mente — y es la demostración práctica de lo que predicamos."
- **FinalCTA** (shared component).

### 5.4 Casos de éxito `/casos-de-exito` (+ detail pages)

- **Index** — H1: "Casos de éxito". Lead: "Más que proyectos: transformación empresarial. Contamos cada caso con datos verificables y con el permiso del cliente." Two CaseStudyCards.
- **Case template** (shared): eyebrow (sector), H1, ImpactReadouts, then narrative sections: Contexto → Problema → Solución → Impacto → Siguientes pasos.
- **MAGUPELL** `/casos-de-exito/magupell` — H1: "MAGUPELL — Digitalización integral de la inspección de calidad en el sector de la piel". Readouts: "100+ requisitos funcionales · 200+ pruebas automatizadas · Producción: 1 julio 2026 · Facturación real a través de la plataforma". Narrative copy verbatim-adapted from Ch. 15 (contexto, problema, solución, impacto, siguientes pasos).
- **BioZero** `/casos-de-exito/biozero` — H1: "BioZero — Plataforma de gestión clínica dental con IA". Narrative from Ch. 16: first client; collaborative clinical records, patient gamification, image analysis with state-of-the-art vision models; what it demonstrates: applying AI usefully in a regulated, sensitive sector.

### 5.5 Modelo de alianza `/modelo-de-alianza`

- **PageHeader** — H1: «Cinco alianzas. Toda nuestra dedicación.» Lead: "No buscamos proyectos; buscamos socios. Y elegimos a nuestros socios tanto como ellos nos eligen a nosotros."
- **WhyFive** — H2: "Por qué solo cinco". Body from Ch. 11 ("no es una limitación: es el modelo de negocio…").
- **ThreePlanes** — H2: "Tres planos de acompañamiento". H3 ×3: "Plano técnico" / "Plano estratégico" / "Plano visionario", each with its paragraph from Ch. 11.
- **Commitments** — H2: "Compromisos de cada alianza". The 5 commitments from Ch. 13 rendered as graduations on a vertical rule: ownership of platform/code/data; spec approved before building; quality proven with tests and production stability; continuous, traceable, transparently invoiced support; success measured by the client's growth and efficiency.
- **FinalCTA**.

### 5.6 Sobre Escala `/sobre-escala`

- **PageHeader** — H1: "Sobre Escala". Lead: "Escala Digital Ventures, S.L.U. es un estudio de producto y tecnología con sede en Mataró (Barcelona), constituido en 2026."
- **DNA** — mission and vision (Ch. 1, condensed), plus: "Cada decisión debe responder a una pregunta: ¿seguirá aportando valor dentro de diez años?"
- **Values** — the 5 values (Ch. 1) as H3 + one line each.
- **Experience** — H2: "La experiencia detrás de Escala". Anonymized copy from Ch. 4: "Más de dos décadas construyendo y dirigiendo plataformas de software empresarial de alcance global — soluciones utilizadas por decenas de miles de empresas en más de cien países…" Include areas of expertise (6 items, Ch. 4) as a compact list. Closing line (plain text, no link): "La trayectoria completa de nuestro Director General está disponible como referencia pública en colivares.com."
- **Manifesto** — H2: "El Manifiesto de Escala". The 10 beliefs (Ch. 3) rendered as numbered graduations (this is a true sequence of 10 → numbering is semantically justified).
- **FinalCTA**.

### 5.7 Contacto `/contacto`

- **PageHeader** — H1: «Hablemos de tu negocio.» Lead: "Escuchamos antes de proponer. Cuéntanos qué frena tu crecimiento y te diremos, con honestidad, si podemos ayudarte — y si encajamos como socios."
- **ContactForm** — fields: Nombre · Empresa · Email · "¿Qué frena tu crecimiento?" (textarea) · RGPD consent checkbox linking to privacy. Submit: «Enviar». Success state: "Recibido. Te responderemos personalmente en un plazo de dos días laborables." Error state: plain explanation + direct email fallback.
- Direct alternative: "Si lo prefieres: hola@escaladigitalventures.com" *(placeholder — confirm final address)*.
- Meta line (mono): "Mataró · Barcelona · Trabajamos en español, inglés, catalán y ruso."
- Form backend: API route → transactional email provider (same one used in MAGUPELL), with server-side validation and honeypot anti-spam. No CRM in v1.

### 5.8 Legal pages

- `/aviso-legal`: LSSI-CE data — company name, CIF, registered address, registry data, contact email. *(Carlos provides final data.)*
- `/privacidad`: RGPD — controller, purpose (responding to contact requests), legal basis, retention, rights, no transfers.
- Cookies: v1 uses **cookieless analytics** (e.g., Plausible self-hosted or equivalent) → no cookie banner needed. If a cookie-setting tool is ever added, add `/cookies` + consent banner then.

---

## 6. Design system inventory (build in this order)

**Tokens first** (§3.3), exposed as CSS variables + Tailwind theme.

**Primitives:** Button (primary `--mar` solid / secondary ink outline / link with slide underline) · Eyebrow (mono) · SectionHeading (display) · Prose · FormField (input, textarea, checkbox with mono labels) · Container/Section (vertical rhythm owner — sections must not fight each other's margins).

**Signature components:**
- `ScaleRule` — horizontal calibrated rule; variants: divider, 10-phase interactive (framework), vertical (commitments), hero draw-in.
- `Readout` — instrument-style figure: mono number, small unit label, one `--calibre` tick.
- `CaseStudyCard` — sector eyebrow, title, one-line impact, readout row.
- `PhasePanel` — description panel for the interactive framework.

**Layout components:** Header (nav + Hablemos button + LocaleSwitcher) · Footer · PageHeader · FinalCTA.

**Styleguide route:** `/styleguide` (noindex, dev-only) rendering all tokens and components — the living reference for iterating the design system with agent Skills/Rules.

---

## 7. i18n content workflow

- ES is the master language (this spec). EN and CA are professional-register translations that preserve the claims' meaning; claims may be recrafted, not word-for-word translated (e.g., EN primary claim: "We automate your business. We scale with you."; CA: «Automatitzem el teu negoci. Escalem amb tu.»). Carlos reviews all EN/CA copy before launch (he works professionally in both target registers).
- Dictionaries per locale; slugs per §4.1; localized metadata (title ≤60 chars, description ≤155 chars per page); `sitemap.xml` with all alternates; `robots.txt`.

## 8. SEO, analytics, performance

- SSG for every page; OG image generated with the identity (paper background, claim in Archivo, rule motif).
- Structured data: `Organization` (+ `ProfessionalService`) on home; `BreadcrumbList` on inner pages.
- Cookieless analytics (§5.8). Target: Lighthouse ≥95 in all categories; fonts self-hosted, zero third-party scripts except analytics.

## 9. Out of scope v1 (architecture-ready)

- Blog/insights section · newsletter · colivares.com link (text mention only until live) · dark mode · CRM integration.
