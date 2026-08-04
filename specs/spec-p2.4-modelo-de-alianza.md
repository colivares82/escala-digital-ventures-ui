# SPEC — Phase 2.4: /modelo-de-alianza (the alliance model)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-P2.4 · Version 1.0 · August 2026
**Author:** Claude · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Sources of truth:** `docs/el-libro-de-escala-v2.1.md` (Ch. 11 model + three planes, Ch. 12 ideal client, Ch. 13 commitments) · `docs/escala-web-content-spec-v1.1.md` (§3, §4, §5.5) · `PLAN.md` (Phase 2.4)
**Wireframe (authoritative layout reference):** `specs/mockups/wireframe-p2.4-modelo-de-alianza-final.html` (APPROVED). Where this text and the wireframe disagree, the wireframe wins on layout; the Libro wins on copy — EXCEPT commitment 01, see FR-6/BLOCKER.

---

## 0. BLOCKER — Libro contradiction on "ownership" (resolve before/with build)

The approved page reframes commitment 01 away from "you own your code". The Libro v2.1 currently states the OPPOSITE in several places (Ch. 6, Ch. 13, Ch. 15 MAGUPELL, Ch. 19): "el cliente es propietario de su plataforma, su código y sus datos". Carlos's correction: **the source code and IP belong to Escala; the client owns their platform and data; each solution is built to the real needs and opportunities of the business — not templates.**

Action (owner: Claude + Carlos): update `docs/el-libro-de-escala-v2.1.md` (Ch. 6, 13, 15, 19) and `docs/escala-web-content-spec-v1.1.md` (§2 proof points, §5.2 service line 2, §5.4 MAGUPELL) to the corrected wording, THEN this page's copy is consistent. Until the Libro is patched, this is a known divergence; Cline builds the corrected wording here and must NOT reintroduce "propiedad del código" on any page. Final agreed wording to propagate (pending Carlos's exact phrasing):
> "El cliente es propietario de su plataforma y sus datos; el código fuente y la propiedad intelectual son de Escala. Cada solución se construye a medida de las necesidades y oportunidades reales del negocio — no plantillas."

## 1. Business context

`/modelo-de-alianza` expands home section 05. It is the positioning/filter page: it explains WHY Escala works with ~5 clients (the deliberate scarcity is the business model, not a limitation), WHAT an alliance includes (three simultaneous planes of accompaniment), and the commitments every alliance runs on. Business outcome: an ideal-fit owner understands the model is partnership-not-vendor and self-qualifies; the scarcity framing raises perceived value.

## 2. Scope

**In scope:** full page at localized routes for `alliance` (§4.1: `/modelo-de-alianza`, `/en/alliance-model`, `/ca/model-dalianca`) · reuse of PageHeader, Section, FinalCTA, and the constellation engine (shared with home) · new components: AlliancePlanes (three columns), CommitmentsBand (horizontal band) · all copy in `content/{es,en,ca}/alliance.ts` (ES populated; EN/CA fallback).

**Out of scope:** EN/CA real copy (Phase 5) · contact backend (Phase 3).

## 3. Page structure (interior index A/B/C…)

- **A · PageHeader** (paper) — H1 «Cinco alianzas. Toda nuestra dedicación.»; lead (§5.5).
- **B · Por qué solo cinco** (abisal) — text left + large symmetric constellation right.
- **C · Tres planos de acompañamiento** (abisal) — three columns (strategic highlighted).
- **D · Compromisos de cada alianza** (paper) — horizontal band of 5.
- **FinalCTA** (abisal) — reused.

## 4. Functional requirements

### FR-1 · Routing & shell
1.1. Page component for `PageId="alliance"`; all localized slugs; already in `generateStaticParams`. Shared Section wrapper. All copy from `content/{locale}/alliance.ts` via `getDictionary`. Zero literals.

### FR-2 · A · PageHeader
2.1. Reuse `PageHeader`: `eyebrow="A / MODELO DE ALIANZA"`, `title="Cinco alianzas. Toda nuestra dedicación."`, `lead` (§5.5: "No buscamos proyectos; buscamos socios. Y elegimos a nuestros socios tanto como ellos nos eligen a nosotros."), `surface="paper"`.

### FR-3 · B · WhyFive + constellation (REUSE the home constellation engine)
3.1. Two-column band on abisal: left = H2 "Por qué solo cinco" + body (Libro Ch. 11: "Limitamos deliberadamente… No es una limitación: es el modelo de negocio. Cada cliente recibe una implicación profunda y acceso directo al conocimiento estratégico acumulado."); right = the constellation, LARGER than on home (protagonist, ~420px).
3.2. **Reuse the existing `AllianceConstellation` component from the home — do NOT build a second one.** If the home component is not yet parameterized for size/labels, refactor it to accept props: `seats` (array of `{name, state: "occupied"|"free"}`), `size`, `showPulse`. The home renders its compact instance; this page renders a larger instance with the same 5 seats (MAGUPELL, BIOZERO occupied; 3 DISPONIBLE). Geometry: 5 seats on a REGULAR PENTAGON around ESCALA (first seat at top, −90°, every 72°) — perfectly symmetric, square centered viewBox (fixes the off-center look).
3.3. **Animation: identical to the home constellation** — draw-on-scroll (center → connectors → nodes → ambre pulses → labels), staggered, plays once, full `prefers-reduced-motion` static fallback. This comes for free by reusing the component.
3.4. Occupied seats: solid connector + ambre pulse dot + solid ring. Free seats: dashed connector + dashed ring at reduced opacity. Labels radially outside each node, never clipped.

### FR-4 · C · AlliancePlanes (NEW — three columns, Option 2 chosen)
4.1. New component `AlliancePlanes` on abisal: H2 "Tres planos de acompañamiento" + short lead ("Cada alianza recibe acompañamiento simultáneo en tres planos.") + three columns from typed data `planes: Plane[]` where `Plane = { index, title, body, depth }`.
4.2. The MIDDLE column (Estratégico) is highlighted: ambre border + very subtle ambre-tinted background. Each column: mono "PLANO · 0X", H3 (Archivo ~1.6rem), body, and a bottom mono `depth` line (e.g. "ARQUITECTURA · CÓDIGO · OPERACIÓN").
4.3. Content (ES, verbatim/condensed from Libro Ch. 11):
  - 01 Técnico — "Diseñamos, construimos, desplegamos y operamos tu plataforma de principio a fin: arquitectura, desarrollo full-stack, cloud, seguridad, pruebas, monitorización y soporte continuo. La capacidad de un departamento técnico completo sin tener que crearlo." — depth "ARQUITECTURA · CÓDIGO · OPERACIÓN".
  - 02 Estratégico — "Dirección externa de producto y tecnología: priorizamos el roadmap, traducimos necesidades de negocio en especificaciones ejecutables, decidimos qué construir, qué no y en qué orden, y medimos el impacto de cada iteración." — depth "ROADMAP · PRIORIDAD · IMPACTO".
  - 03 Visionario — "Aportamos perspectiva de hacia dónde van el software, la automatización y la IA, y te ayudamos a anticiparte: qué procesos automatizar después, qué datos capturar hoy para explotar mañana, qué capacidades de IA tienen sentido para tu sector y cuáles son ruido." — depth "ANTICIPACIÓN · DATOS · IA".
4.4. Mobile (<768px): three columns stack vertically; highlighted middle keeps its accent.

### FR-5 · D · CommitmentsBand (NEW — horizontal band of 5)
5.1. New component `CommitmentsBand` on paper: H2 "Compromisos de cada alianza" + a bordered horizontal grid of 5 equal cells from `commitments: Commitment[]` where `Commitment = { n, tag, body }`. Each cell: mono number (~1.6rem, mar), mono tag (ambre-dk, AA on paper), body (≤ short), and an ambre tick at the bottom. Reads as a "carta de garantías".
5.2. Content (ES, from Libro Ch. 13 — WITH the corrected commitment 01 per §0):
  - 01 A MEDIDA — "Soluciones ajustadas a las necesidades y oportunidades reales de tu negocio — no plantillas."
  - 02 ESPECIFICACIÓN — "Cada funcionalidad se especifica y aprueba antes de construirse."
  - 03 CALIDAD — "Se demuestra con pruebas automatizadas y estabilidad en producción, no con promesas."
  - 04 SOPORTE — "Continuo, trazable y transparente en su facturación."
  - 05 MEDIDA — "Un único indicador final: el crecimiento y la eficiencia de tu negocio."
5.3. Mobile (<768px): the 5-cell band collapses to a vertical stack.

### FR-6 · Copy integrity (ownership)
6.1. On this page and anywhere Cline touches, do NOT state that the client owns the code or IP. Use the §0 corrected framing. If Cline sees "propiedad del código" in the Libro/spec, flag it as the pending patch — do not copy it.

### FR-7 · FinalCTA (reused)
7.1. Reuse `FinalCTA` with `alliance.ts` content → contact.

### FR-8 · Content dictionary
8.1. Create `content/es/alliance.ts` implementing `AllianceContent` (add to `content/types.ts`): pageHeader, whyFive (heading, body), constellation (seats), planes[3], commitments[5], finalCta, meta (title ≤60, description ≤155).
8.2. EN/CA re-export ES with `// TODO(P5): translate`.

### FR-9 · Styleguide
9.1. Add to `/styleguide`: AlliancePlanes, CommitmentsBand, and the parameterized AllianceConstellation (both the compact/home and the large/alliance instances, to prove one component serves both).

## 5. Edge cases
- Constellation must stay centered and symmetric at all widths (square viewBox scales; labels never clip). Reduced-motion → static complete figure.
- Strategic column highlight must keep AA text contrast on its tinted background.
- Commitment tag color (`--ambre-dk`) must pass AA on paper.
- If `AllianceConstellation` refactor risks a home regression, verify the home instance is pixel-unchanged (AC).
- No "code ownership" wording anywhere (§0/FR-6).

## 6. Acceptance criteria
- [ ] AC-1 `npm run build` passes; TS strict clean; page static at all 3 localized slugs.
- [ ] AC-2 Layout matches the final wireframe (A–D + CTA; three-column planes; horizontal commitments band).
- [ ] AC-3 Constellation is the SAME component as home, parameterized; large symmetric pentagon here, compact on home; home instance unchanged (no regression).
- [ ] AC-4 Constellation animation identical to home (draw-on-scroll, staggered, ambre pulses) with reduced-motion static fallback.
- [ ] AC-5 AlliancePlanes: 3 columns, middle highlighted, depth lines present; stacks on mobile.
- [ ] AC-6 CommitmentsBand: 5 cells, commitment 01 uses the corrected "A MEDIDA" wording; NO code/IP-ownership claim; collapses on mobile.
- [ ] AC-7 All copy from `content/{locale}/alliance.ts`; grep hardcoded page strings = 0; grep `ruso|russian` = 0; grep `propiedad de (tu|su) código` = 0 sitewide.
- [ ] AC-8 Standing floor: AA every surface (incl. ambre-dk tags, tinted middle column), keyboard focus, responsive 360px, Lighthouse ≥ baseline.
- [ ] AC-9 New components in /styleguide (+ both constellation instances).
- [ ] AC-10 Home section 05 "Conoce el modelo de alianza ↗" links here; header nav "Modelo de alianza" resolves and marks active.

## 7. Test plan
Unit: `alliance.ts` — planes length = 3, commitments length = 5, commitment[0].tag === "A MEDIDA"; constellation seats length = 5 with exactly 2 occupied; meta length limits. Manual: AC-2 vs wireframe; AC-3 home-constellation no-regression; AC-4 animation parity + reduced-motion; AA checks; mobile stacks; sitewide grep for ownership wording. Record Lighthouse.

## 8. Implementation notes for Cline
- Read `.clinerules`, this spec (esp. §0 BLOCKER), the final wireframe, v1.1 §3/§5.5, Libro Ch. 11–13 before coding. Name/token mismatch → `DECISIONS.md` wins; flag it.
- REUSE PageHeader, Section, FinalCTA untouched. REUSE + parameterize AllianceConstellation (one component, two instances). New only: AlliancePlanes, CommitmentsBand.
- Do the constellation refactor first and confirm the home is unchanged before building this page's large instance.
- Order: (1) alliance.ts + interface + fallbacks; (2) parameterize AllianceConstellation + styleguide (both instances) + home no-regression check; (3) AlliancePlanes + styleguide; (4) CommitmentsBand + styleguide; (5) assemble page + FinalCTA; (6) AC pass.
- Do NOT write any "client owns the code/IP" text. Commits small and scoped.

## 9. Definition of Done
All AC checked · Libro + spec ownership wording patched (§0) OR the patch is explicitly scheduled and this page is consistent · PLAN.md 2.4 row marked · Carlos approves → unblock SPEC-P2.5 (/sobre-escala).
