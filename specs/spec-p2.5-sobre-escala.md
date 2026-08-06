# SPEC — Phase 2.5: /sobre-escala (the trust / identity page)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-P2.5 · Version 1.0 · August 2026
**Author:** Claude · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Sources of truth:** `docs/el-libro-de-escala-v2.2.md` (Ch. 1 DNA/values, Ch. 3 manifesto, Ch. 4 experience — anonymized) · `docs/escala-web-content-spec-v1.1.1.md` (§3, §4, §5.6) · `PLAN.md` (Phase 2.5)
**Wireframe (authoritative layout reference):** `specs/mockups/wireframe-p2.5-sobre-escala.html` (APPROVED). Where this text and the wireframe disagree, the wireframe wins on layout; the Libro wins on copy.
**Design concept:** mixed tone — CEREMONIAL at the top (brand document: oversized type, generous air, paper), descending to TECHNICAL at the bottom (kit-of-diagrams grid + manifesto, abisal). The page moves from identity to engineering.

---

## 0. Cross-cutting deliverable — reusable GridBackground

The abisal engineering-grid background (faint 1px paper lines, ~4–5% opacity, 48px cells, + radial tonal gradient) appears on this page AND is expected on other pages/sections. Extract it as a **single reusable primitive** now (if not already one) so no page reimplements it. See FR-6. This is a required output of this phase, not optional.

## 1. Business context

`/sobre-escala` is the trust page — the only page reached from nav/footer, not from a landing section (by design). It establishes who Escala is (DNA, values), the experience that backs the firm (anonymized, per Ch. 19), and the manifesto — the ceremonial core. Business outcome: an ideal-fit owner, already interested, gains confidence in Escala's seriousness and long-term-partner posture. The corrected ownership model applies (no client code-ownership claims anywhere).

## 2. Scope

**In scope:** full page at localized routes for `about` (§4.1: `/sobre-escala`, `/en/about-escala`, `/ca/sobre-escala`) · reuse of Section, FinalCTA, GridBackground · new components: CeremonialHeader, DnaBlock, ValuesList, ExpertiseGrid (6 areas w/ micro-figs), Manifesto (10 strata plates) · all copy in `content/{es,en,ca}/about.ts` (ES populated; EN/CA fallback).

**Out of scope:** EN/CA real copy (Phase 5) · contact backend (Phase 3) · the colivares.com LINK (text-only until that site is live — FR-5.3).

## 3. Page structure (interior index A/B/C…) — tone descends

- **A · CeremonialHeader** (paper) — oversized brand statement, not the standard PageHeader.
- **B · Nuestro ADN** (paper) — mission/vision + ten-year pull-quote.
- **C · Valores** (paper) — five editorial numbered rows.
- *(tone shift divider)*
- **D · La experiencia detrás de Escala** (abisal) — 6-area kit grid (anonymized).
- **E · El Manifiesto de Escala** (abisal) — 10 strata plates (NEW design) + colivares.com text line.
- **FinalCTA** (abisal) — reused.

## 4. Functional requirements

### FR-1 · Routing & shell
1.1. Page component for `PageId="about"`; all localized slugs; already in `generateStaticParams`. Shared Section wrapper. All copy from `content/{locale}/about.ts` via `getDictionary`. Zero literals.

### FR-2 · A · CeremonialHeader (NEW)
2.1. New component `CeremonialHeader` on paper — deliberately NOT the standard PageHeader (this page presents as a brand document). Kicker (mono, "A · SOBRE ESCALA · ESTUDIO DE PRODUCTO Y TECNOLOGÍA"); oversized H1 (Archivo SemiExpanded 600, clamp(3rem, 7vw, 6rem), leading ~1); sub-paragraph (~22px, ≤60ch). Generous vertical padding (~96px top).
2.2. H1 copy: «Construimos capacidades, no aplicaciones.» (Libro Ch. 17 claim). Sub (Libro Ch. 1): "Escala Digital Ventures, S.L.U. es un estudio de producto y tecnología con sede en Mataró (Barcelona), constituido en 2026. Existimos para que un número reducido de empresas crezca mediante tecnología entendida como estrategia de negocio."
2.3. This is the H1 of the page (SEO/accessibility): exactly one H1.

### FR-3 · B · DnaBlock (NEW)
3.1. Two columns on paper: left = mission + vision paragraphs (Libro Ch. 1, condensed as in wireframe); right = the ten-year question as a pull-quote (Archivo, 1.9rem, 2px ambre left border): «Cada decisión debe responder a una pregunta: ¿seguirá aportando valor dentro de diez años?»
3.2. Eyebrow "B / NUESTRO ADN".

### FR-4 · C · ValuesList (NEW)
4.1. Five numbered editorial rows (three-column: number / title / body), 1px top rules. Eyebrow "C / VALORES".
4.2. Content (Libro Ch. 1, the 5 values): 01 Compromiso de socio · 02 Excelencia de ingeniería · 03 Producto antes que tecnología · 04 Transparencia radical · 05 Velocidad con criterio — one-line bodies per wireframe.

### FR-5 · D · ExpertiseGrid (NEW) + tone divider
5.1. A tone-shift divider (mono, centered, "— — — DE LA IDENTIDAD A LA EXPERIENCIA — — —") marks the paper→abisal transition.
5.2. Section on abisal (uses GridBackground): eyebrow "D / LA EXPERIENCIA DETRÁS DE ESCALA", H2 "Más de dos décadas, seis disciplinas", lead (Libro Ch. 4, anonymized).
5.3. `ExpertiseGrid`: 3×2 grid of 6 areas from typed data `{ index, title, body, figVariant }`. Each cell: mono "ÁREA · 0X", title (Archivo ~1.15rem), body (~0.85rem), and a bottom micro-FIG in kit grammar (small, ~80×30). The 6 areas (Libro Ch. 4): 01 Ingeniería full-stack · 02 Arquitectura de plataformas · 03 Dirección de producto · 04 Liderazgo y transformación · 05 Developer experience · 06 IA aplicada y cloud-native.
5.4. Micro-figs: one small parameterized figure per area (reuse the ServiceFig approach if practical, or a lightweight `MicroFig` variant set) — each a distinct kit motif (blocks/pipeline for full-stack, hub for architecture, prioritized bars for product, connected nodes for leadership, signal line for DevEx, insertion node for AI). Draw-on-entry once; reduced-motion static.
5.5. **Editorial guardrail (Ch. 19):** anonymized only — NEVER name former employers; use "plataformas de software empresarial de alcance global", "decenas de miles de empresas en más de cien países". MIT certification may be named (it's the firm's, not an employer). No client code-ownership claims (N/A here but keep the guard).

### FR-6 · GridBackground (NEW — reusable primitive; cross-cutting)
6.1. Extract the abisal engineering grid into a single reusable component/utility `GridBackground` (or a `surface="abisal"` option on the shared Section that renders it). Props: cell size (default 48px), line opacity (default ~0.045), optional radial gradient on/off, optional subtle noise on/off.
6.2. Implementation: CSS (linear-gradient grid + radial-gradient overlay) behind content, `pointer-events:none`, non-interactive, no layout impact. Must not degrade contrast (AA on abisal preserved).
6.3. Refactor: where the home and prior pages (2.1, 2.4) hand-rolled this grid, migrate them to `GridBackground` in this change IF low-risk; otherwise leave a `// TODO: migrate to GridBackground` and at minimum use it for THIS page. No visual change to existing pages (verify).
6.4. Add `GridBackground` to `/styleguide` with its options.

### FR-7 · E · Manifesto (NEW design — 10 strata plates)
7.1. `Manifesto` component on abisal (GridBackground): eyebrow "E / EL MANIFIESTO", H2 "El Manifiesto de Escala", mono lead "DIEZ CREENCIAS · UNA FORMA DE ENTENDER LA TECNOLOGÍA".
7.2. NEW visual — 10 stacked "strata" plates (distinct from the editorial lists elsewhere). Each plate: 3-column grid — big ghost number (Archivo, ~2.6rem, paper 25%) / belief text (~1.05rem) / mono meta ("0X/10") right; 1px borders between plates (shared borders, no doubling); an ambre left bar (3px) that GROWS on scroll-reveal (transform scaleY 0→1, staggered per plate as it enters). Reduced-motion: bars static at full, all beliefs visible.
7.3. Content: the 10 beliefs verbatim from Libro Ch. 3 (see wireframe for the condensed display strings; use the Libro as source).
7.4. Scroll behavior: native scroll; each plate's bar reveals once on entry (IntersectionObserver or scroll-linked). No pinning, no scroll-jacking.

### FR-8 · colivares.com line + FinalCTA
8.1. After the manifesto: a mono line "DIRECCIÓN GENERAL · La trayectoria completa de nuestro Director General está disponible como referencia pública en colivares.com" — **plain text, NOT a link** (Ch. 19), until that site is live. Add `// TODO: linkify colivares.com when live`.
8.2. Reuse `FinalCTA` → contact.

### FR-9 · Content dictionary
9.1. Create `content/es/about.ts` implementing `AboutContent` (add to `content/types.ts`): ceremonial (kicker, h1, sub), dna (mission, vision, quote), values[5], expertise (heading, lead, areas[6] with figVariant), manifesto (heading, lead, beliefs[10]), colivaresLine, finalCta, meta (title ≤60, description ≤155).
9.2. EN/CA re-export ES with `// TODO(P5): translate`.

### FR-10 · Styleguide
10.1. Add to `/styleguide`: CeremonialHeader, ValuesList, ExpertiseGrid (with the 6 micro-figs), Manifesto (a few plates), and GridBackground (options). DnaBlock optional.

## 5. Edge cases
- Exactly one H1 on the page (the ceremonial H1); D/E use H2.
- Oversized H1 must not overflow at 360px (clamp handles it; verify).
- ExpertiseGrid collapses 3→2→1 columns responsively; micro-figs stay legible.
- Manifesto strata: bars reveal once; on fast scroll all still end visible; reduced-motion → all bars full.
- GridBackground must not appear on light/paper sections (only abisal) and must never capture pointer events or hurt contrast.
- colivares.com stays plain text (no anchor) — guard against auto-linking.
- Anonymization: no former-employer names anywhere (Ch. 19).

## 6. Acceptance criteria
- [x] AC-1 `npm run build` passes; TS strict clean; page static at all 3 localized slugs.
- [x] AC-2 Layout matches the wireframe (ceremonial A–C on paper → technical D–E on abisal, with divider).
- [x] AC-3 Exactly one H1 (ceremonial); heading hierarchy correct.
- [x] AC-4 ExpertiseGrid shows 6 areas with distinct kit micro-figs; anonymized copy (no employer names); MIT cert allowed.
- [x] AC-5 Manifesto renders 10 strata plates with the NEW design; ambre bars reveal on scroll; reduced-motion static complete.
- [x] AC-6 GridBackground is a single reusable primitive used here; documented in /styleguide with options; existing pages unchanged (no regression) whether migrated or left with TODO.
- [x] AC-7 colivares.com is plain text, not a link.
- [x] AC-8 All copy from `content/{locale}/about.ts`; grep hardcoded page strings = 0; grep `ruso|russian` = 0; grep `propietario de (tu|su) código` = 0.
- [x] AC-9 Standing floor: AA on every surface (incl. paper 25% ghost numbers used decoratively — ensure real text passes AA), keyboard focus, responsive to 360px, Lighthouse ≥ baseline.
- [x] AC-10 New components in /styleguide; header nav "Sobre Escala" resolves here and marks active; footer link resolves.

## 7. Test plan
Unit: `about.ts` — values length 5, areas length 6, beliefs length 10, meta length limits; each area has a figVariant. Manual: AC-2 tone progression vs wireframe; AC-4 anonymization scan; AC-5 strata reveal + reduced-motion; AC-6 GridBackground reuse + no-regression on home/2.1/2.4; one-H1 check; mobile collapse. Record Lighthouse.

## 8. Implementation notes for Cline
- Read `.clinerules`, this spec, the wireframe, Libro v2.2 Ch. 1/3/4, spec v1.1.1 §5.6 before coding. Name/token mismatch → `DECISIONS.md` wins; flag it.
- Reuse Section, FinalCTA untouched. Build GridBackground FIRST (FR-6) — it's the cross-cutting deliverable; verify home/2.1/2.4 are visually unchanged. Then the page components.
- Anonymization is a hard editorial rule — no employer names in copy or data.
- Order: (1) GridBackground + styleguide + no-regression check; (2) about.ts + interface + fallbacks; (3) CeremonialHeader + DnaBlock + ValuesList (paper); (4) ExpertiseGrid + micro-figs + styleguide; (5) Manifesto (strata) + reveal + styleguide; (6) colivares line + FinalCTA; (7) AC pass.
- Commits small and scoped. Do not restyle existing components.

## 9. Definition of Done
All AC checked · GridBackground reusable and documented · anonymization verified · PLAN.md 2.5 row marked · Carlos approves the page (ceremonial→technical progression + manifesto strata) → unblock SPEC-P2.6 (/contacto).

---

_Implementation completed August 2026. All ACs checked. 596 tests green. Build clean._
