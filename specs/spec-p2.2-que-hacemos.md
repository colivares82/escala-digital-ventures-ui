# SPEC — Phase 2.2: /que-hacemos (services in depth)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-P2.2 · Version 1.1 · August 2026
**Author:** Claude · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Sources of truth:** `docs/el-libro-de-escala-v2.1.md` (Ch. 11 services, Ch. 12 ideal client) · `docs/escala-web-content-spec-v1.1.md` (§3, §4, §5.2) · `PLAN.md` (Phase 2.2)
**Wireframe (authoritative layout + figure reference):** `specs/mockups/wireframe-p2.2-que-hacemos-final.html` (APPROVED, Option A only, with the five figures drawn). Supersedes the earlier two-option wireframe. Where this text and the wireframe disagree, the wireframe wins on layout and figure geometry; the Libro wins on copy.

---

## 1. Business context

`/que-hacemos` expands home section 02. It presents the five service lines the way the Libro demands (Ch. 11, Ch. 19): from the client's PROBLEM, never from the technology. Each service carries a small technical figure that visualizes what it does, in the site's diagram language. The page closes with the ideal-client filter (Ch. 12) — Escala chooses its partners as much as they choose Escala. Business outcome: an ideal-fit owner recognizes their own operational pain in the five problems and self-qualifies toward contact; a poor-fit visitor self-selects out.

## 2. Scope

**In scope:** full page at the localized routes for `services` (§4.1: `/que-hacemos`, `/en/what-we-do`, `/ca/que-fem`) · reuse of PageHeader, Section, FinalCTA · new components: ServiceRow (diagram-led), ServiceFig (ONE parameterized component with five variants), IdealClientNote · all copy in `content/{es,en,ca}/services.ts` (ES populated; EN/CA re-export ES per Phase-1 fallback).

**Out of scope:** EN/CA real copy (Phase 5) · contact backend (Phase 3). The five figures are a coherent draft to be iterated one-by-one later; the component design must make single-figure iteration cheap (FR-4.5).

## 3. Page structure (interior index letters A/B/C…)

- **A · PageHeader** (paper) — eyebrow "A / QUÉ HACEMOS"; H1 "Qué hacemos" (--text-display-lg); lead (§5.2).
- **A (cont.) · Five ServiceRows** (paper) — strict three-column grid repeated identically: index (64px) · text (title + problem + deliverable) · ServiceFig (320px). Constant rhythm by repetition.
- **B · ¿Encajamos?** (abisal) — IdealClientNote (Ch. 12).
- **FinalCTA** (abisal) — reused.

## 4. Functional requirements

### FR-1 · Routing & shell
1.1. Page component for `PageId="services"` in the Phase-1 route map; all three localized slugs; already in `generateStaticParams`. No new routing code.
1.2. Shared Section wrapper per band. All copy from `content/{locale}/services.ts` via `getDictionary`. Zero literals in components.

### FR-2 · A · PageHeader
2.1. Reuse `PageHeader`: `eyebrow="A / QUÉ HACEMOS"`, `title="Qué hacemos"`, `lead` (§5.2 text), `surface="paper"`. Use the interior-index convention from 2.1.

### FR-3 · ServiceRow (NEW — diagram-led, repeated ×5)
3.1. New component `ServiceRow`, typed props `{ index, title, problem, deliverable, fig }`.
3.2. Layout per wireframe: three columns — mono index (left, ~64px) · text block (title Archivo ~1.9rem + problem line + deliverable ≤52ch) · ServiceFig (right, ~320px wide, ~150px tall). Identical grid for all five rows.
3.3. Problem line: mono, prefixed "EL PROBLEMA ·", color `--ambre-dk` #B85C00 (passes AA on paper; the pure ambre does NOT — do not use it for text on light). Register the token in `DECISIONS.md` if named differently.
3.4. Rows separated by 1px ink-18% top borders; last row adds a bottom border. Reveal each row staggered on scroll entry (once; reduced-motion → static).
3.5. Content (ES, verbatim from Libro Ch. 11 / spec §5.2):
  - 01 "Transformación digital y automatización de procesos" — problem: "Procesos críticos que viven en hojas de cálculo y en la cabeza de las personas." — deliverable: "Analizamos procesos, herramientas y flujos para simplificar, automatizar y modernizar: desde la captura del dato en origen hasta la facturación y el informe final."
  - 02 "Desarrollo de plataformas" — problem: "El software genérico no encaja con tu realidad." — deliverable: "Diseñamos y construimos aplicaciones web y plataformas a medida —no plantillas—, con usuarios y roles, dominio propio, correo transaccional, generación de documentos y facturación integrada. Arquitectura preparada para evolucionar durante años. Tú eres propietario de tu plataforma, tu código y tus datos."
  - 03 "Automatización e IA aplicada" — problem: "Todo el mundo habla de IA; pocos la aplican con retorno." — deliverable: "Integramos modelos de lenguaje y de visión donde generan valor real y medible: menos tareas repetitivas, análisis de imágenes, mejores decisiones. IA aplicada con criterio: donde aporta, no donde adorna."
  - 04 "CTO y Product Leadership fraccional" — problem: "Necesitas criterio directivo de producto y tecnología, sin contratar un perfil a tiempo completo." — deliverable: "Visión tecnológica, roadmap, especificación funcional, priorización, gestión de proveedores e iniciativas de innovación, con experiencia ejecutiva real."
  - 05 "Operación, soporte y evolución continua" — problem: "El software que no evoluciona, muere." — deliverable: "Mantenemos tu plataforma en producción, resolvemos incidencias y la mejoramos cada mes a partir del feedback real de tus usuarios. Con trazabilidad completa del trabajo realizado."

### FR-4 · ServiceFig (NEW — ONE parameterized component, five variants)
4.1. New component `ServiceFig` — a SINGLE component that renders one of five variants via a `variant` prop. NOT five separate figure components. This is what makes per-figure iteration cheap: changing one variant must not touch the others.
4.2. Shared kit grammar (§3.3): 1.5px strokes, dashed = manual/dispersed, solid = ordered, ONE ambre accent per figure, mono micro-labels (8.5px), caption "FIG. 0X — <NAME>". Each figure must remain legible at ~320×150.
4.3. The five variants — each coherent with its service (geometry per the approved wireframe; treat the wireframe SVGs as the reference to reproduce):
  - `"capture"` — FIG. 07 · CAPTURA A INFORME: three dashed inputs (HOJA, CORREO, DATO) converge into an ambre-ringed PROCESO node, then solid output to ordered INFORME / FACTURA. Ambre pulse on the output path.
  - `"platform"` — FIG. 08 · ARQUITECTURA MODULAR: ambre-ringed PLATAFORMA core with five modules around it (USUARIOS · ROLES, DOMINIO, CORREO, DOCUMENTOS, FACTURACIÓN) connected by solid strokes.
  - `"ai"` — FIG. 09 · IA EN EL PROCESO: a horizontal process line (ENTRADA → PROCESO → DECISIÓN) with an ambre-ringed IA node inserted at one point above the line via a dashed connector, labeled "DONDE APORTA".
  - `"product"` — FIG. 10 · DIRECCIÓN DE PRODUCTO: a baseline with prioritized ascending bars (AHORA · SIGUIENTE · DESPUÉS); one bar highlighted in ambre with a "PRIORIDAD" marker.
  - `"evolve"` — FIG. 11 · EVOLUCIÓN CONTINUA: a small closed loop (USO → FEEDBACK → MEJORA) with an ambre progress arc — a deliberate echo of the PhaseCycle ring language.
4.4. Draw-on-entry once; the single ambre accent/pulse animates subtly; reduced-motion → fully static, all nodes and labels visible. No label clipped.
4.5. **Iteration-ready structure:** each variant's geometry lives in its own isolated function/segment inside `ServiceFig`, keyed by variant, with labels passed from the dictionary (`figLabels`). A `// DRAFT VISUAL — iterated per service (PLAN 2.2)` marker. Carlos will refine variants individually; the change surface for one figure must be that one variant only.
4.6. Editorial: labels use only Libro vocabulary; no invented capabilities, no vendor/model names, no invented metrics.

### FR-5 · B · IdealClientNote (NEW)
5.1. New component `IdealClientNote` on abisal. Eyebrow "B / ¿ENCAJAMOS?". H2 "¿Encajamos?" + body (Libro Ch. 12 verbatim): "Trabajamos con negocios sólidos cuya operativa ha crecido más rápido que sus sistemas: empresas familiares y pymes consolidadas, negocios de nicho B2B y compañías que quieren incorporar IA con retorno real. El requisito más importante no es el sector ni el tamaño: es la voluntad de construir una relación de largo plazo." + CTA → `getPath("contact", locale)`.

### FR-6 · FinalCTA (reused)
6.1. Reuse `FinalCTA` with `services.ts` content → contact.

### FR-7 · Content dictionary
7.1. Create `content/es/services.ts` implementing `ServicesContent` (add to `content/types.ts`): pageHeader; services[5] (index, title, problem, deliverable, figVariant, figLabels, figCaption); idealClient (heading, body, cta); finalCta; meta (title ≤60, description ≤155).
7.2. `content/en/services.ts` and `content/ca/services.ts` re-export ES with `// TODO(P5): translate`.

### FR-8 · Styleguide
8.1. Add to `/styleguide`: ServiceRow (one sample) and **all five ServiceFig variants shown together** (this is the visual QA of the figure family coherence) and IdealClientNote.

## 5. Edge cases
- Long titles (01, 04, 05 wrap): three-column grid keeps ServiceFig vertically centered and rows visually even regardless of title length.
- ServiceFig on mobile (<768px): stacks BELOW its text block, full-width, motif legible; grid collapses to single column.
- Problem-line color must pass AA on paper (FR-3.3).
- Reduced-motion: all five figs static and complete.

## 6. Acceptance criteria
- [ ] AC-1 `npm run build` passes; TS strict clean; page static at all 3 localized slugs.
- [ ] AC-2 Layout matches the final wireframe (three-column repeated grid, five rows, shared tail).
- [ ] AC-3 Five ServiceRows render correct index/title/problem/deliverable from the dictionary; identical grid rhythm.
- [ ] AC-4 ServiceFig is ONE parameterized component with five variants (not five components); all five visible together in /styleguide and read as a coherent family; each matches its service's meaning per FR-4.3.
- [ ] AC-5 A single variant can be edited without changing the others (verify by inspection of the component structure).
- [ ] AC-6 IdealClientNote on abisal with CTA to contact in the current locale.
- [ ] AC-7 All copy from `content/{locale}/services.ts`; grep hardcoded page strings = 0; grep `ruso|russian` = 0.
- [ ] AC-8 Problem line passes AA on paper; standing floor met (AA everywhere, keyboard focus, responsive 360px, Lighthouse ≥ baseline).
- [ ] AC-9 New components in /styleguide.
- [ ] AC-10 Header nav "Qué hacemos" resolves here and marks active; home section 02 "Ver todos los servicios ↗" links here; reduced-motion figs/reveals static.

## 7. Test plan
Unit: `services.ts` meta length limits; services array length = 5; each service has a valid figVariant enum. Manual: AC-2 vs wireframe; AC-4/AC-5 figure-family coherence and per-variant isolation in styleguide; long-title rhythm; mobile stack; AA on problem line; keyboard pass. Record Lighthouse.

## 8. Implementation notes for Cline
- Read `.clinerules`, this spec, the final wireframe, v1.1 §3/§5.2 before coding. Name/token mismatch → `DECISIONS.md` wins; flag it.
- Reuse PageHeader, Section, FinalCTA untouched. New: ServiceRow, ServiceFig (single parameterized SVG — reproduce the five wireframe figures; do NOT create five separate components), IdealClientNote.
- Build ServiceFig FIRST and validate the five variants together in /styleguide before wiring rows (the figure family is the visual risk and the thing Carlos will iterate).
- Order: (1) services.ts + interface + fallbacks; (2) ServiceFig + styleguide (five variants); (3) ServiceRow + styleguide; (4) IdealClientNote + styleguide; (5) assemble page + FinalCTA; (6) AC pass.
- Commits small and scoped. Do not restyle existing components.

## 9. Definition of Done
All AC checked · PLAN.md 2.2 row marked · Carlos approves the page (especially the five-variant figure family) → unblock SPEC-P2.3 (/casos-de-exito).
