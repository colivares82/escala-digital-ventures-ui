# SPEC — Polish 02: Home section 01 "Punto de partida" (message + layout + diagram)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-POLISH-02 · Version 1.0 · August 2026
**Author:** Claude (UI/UX) · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Type:** targeted polish — changes ONLY home section 01 ("01 / PUNTO DE PARTIDA"): its headline, body copy, the symptoms treatment, and the FIG.02 diagram. No other section, page, component, or token changes.
**Sources of truth:** `docs/el-libro-de-escala-v2.2.md` (Ch. 10 problem, Ch. 12 ideal client) · `docs/escala-web-content-spec-v1.1.1.md` (§3 identity, §5.1 home section 01) · `PLAN.md`
**Wireframe (authoritative reference):** `specs/mockups/wireframe-p01-punto-partida-FINAL.html` (APPROVED).

---

## 0. Scope guard — read first

Second iteration of the section-by-section landing polish. Touches ONLY home section 01. **Do NOT modify:** the hero (section 00), claims marquee, services, PhaseCycle, evidencia, alliance, contact, or any other page. Only section 01's headline, body, symptoms layout, and its FIG.02 diagram change. Everything else stays byte-identical. Also update §5.1 of the content spec to reflect the new copy (doc change), but no other built section.

## 1. Why

The current headline "Tu negocio funciona. Tus sistemas, no." is a false binary and is subtly off-putting to the ideal visitor — a business owner whose company DOES work. The Libro frames the problem correctly (Ch. 10/12): operations that stopped *scaling*, not systems that "don't work" — a problem of success, not failure. And the current FIG.02 (a pentagon web with everything pointing to "RETRABAJO") communicates nothing: it reads as an ordered system, not as fragmentation. This polish fixes the message and makes the diagram represent what the text actually says.

## 2. What changes

### 2.1 Layout (per wireframe)
- Full-width headline band at the top of the section.
- Symptoms as a horizontal subtitle strip directly under the headline (was a vertical list in the left column), closed by a 1px divider.
- Below: two balanced columns, vertically centered relative to each other — explanatory body (left) · FIG.02 diagram (right). No empty half-column (the previous layout left the left column empty below the title).

### 2.2 Copy
- **Headline:** "Tu operativa llegó a su límite, no tus objetivos."
- **Symptoms strip (mono, unchanged set):** VOLUMEN QUE CRECE · ERRORES QUE SE MULTIPLICAN · FACTURACIÓN QUE SE RETRASA · DEPENDENCIA DE PERSONAS.
- **Body (two short paragraphs):**
  1. "Has construido un negocio que funciona. Pero llega un punto en que la operativa —hojas de cálculo, correos, documentos sueltos, conocimiento en la cabeza de pocas personas— deja de acompañar el crecimiento: el volumen aumenta, los errores se multiplican y el negocio depende de que nadie falte."
  2. "Escala entra ahí: convierte ese corazón operativo en una plataforma propia sobre la que seguir creciendo."

### 2.3 Diagram — FIG.02 redesign
- Concept: a fragile dependency on manual processes. Five real named pieces — HOJAS DE CÁLCULO · CORREOS · NOTAS · CATÁLOGO · HISTORIAL — arranged around a central fragile core **PROCESOS MANUALES** (dashed ambre-dk ring, subtle pulse).
- Each piece connects TOWARD the core with a flow that is DISCONTINUOUS: a solid segment from the piece, then a GAP (the break), then a short dashed stub near the core. These are connections that SHOULD exist and are broken — NOT random lines.
- **Every connector segment must stop cleanly: solid segments end AT the core's border, never overlapping/crossing into the core.** (Fixes the CORREOS line overlapping the core in an earlier draft.)
- Caption: "FIG. 02 — UNA OPERATIVA QUE DEPENDE DE PROCESOS MANUALES: LOS FLUJOS NO SE COMPLETAN". Small note line: "CADA PIEZA INTENTA CONECTARSE · EL FLUJO SE CORTA EN EL PASO MANUAL".

## 3. Motion
3.1. Ambre pulses travel the SOLID segment of each flow and STOP at the break — flash in ambre-dk and fade (the flow cannot complete). This narrates "each piece tries to connect; it's cut at the manual step."
3.2. The core (PROCESOS MANUALES) pulses subtly (slow scale).
3.3. Motion follows the actual SVG segments (getPointAtLength or equivalent), not random floats. Lightweight (SVG + rAF), no heavy libs.
3.4. **prefers-reduced-motion: full static fallback** — no pulses/scale; the breaks and the dependency read the same statically. All labels visible, none clipped.

## 4. Implementation
4.1. Update the existing section-01 component and its FIG.02 figure component (the problem diagram in the identity's kit). Do NOT create parallel components; replace internals.
4.2. Kit grammar (§3.3): 1.5px strokes; solid = the connection that should exist, dashed + gap = the break; single ambre-dk accent for breaks/core; IBM Plex Mono micro-labels; corner ticks framing; caption in mono. Colors from tokens only (paper/ink/mar/ambre/ambre-dk); no hardcoded hex. Note: ambre-dk (#B85C00) is used for the core/break marks so it passes AA on the white figure surface.
4.3. All copy (headline, body, symptoms, figure labels, caption) from `content/es/home.ts` (section-01 keys), not hardcoded. EN/CA fallback inherits (Phase 5 translates). Update the content spec §5.1 to the new headline/body.
4.4. Responsive: at desktop, title band full width, then two columns. On mobile (<768px) the columns stack (body then diagram); symptoms strip wraps; diagram scales, labels unclipped, connectors still stop at the core border.
4.5. Accessibility: the SVG has `role="img"` + `aria-label` ("Una operativa que depende de procesos manuales; los flujos entre las piezas se cortan en el paso manual"). Decorative pulses aria-hidden.

## 5. Acceptance criteria
- [ ] AC-1 `npm run build` passes; TS strict clean; only section-01 component + its figure + home dictionary section-01 keys changed (diff scoped).
- [ ] AC-2 Layout matches the wireframe: full-width headline, symptoms subtitle strip + divider, two vertically-centered balanced columns (body | diagram), no empty half-column.
- [ ] AC-3 Headline reads "Tu operativa llegó a su límite, no tus objetivos."; body is the two new paragraphs; symptoms strip present.
- [ ] AC-4 FIG.02 shows five named pieces around a fragile PROCESOS MANUALES core with discontinuous (solid + gap + dashed) flows; NOT a connected web/pentagon.
- [ ] AC-5 Every connector stops at the core border — no line overlaps or crosses into the core (explicitly verify the CORREOS/top connector).
- [ ] AC-6 Motion: pulses travel the solid segment and stop at the break; core pulses; prefers-reduced-motion → full static, breaks still legible.
- [ ] AC-7 All copy from the dictionary; content spec §5.1 updated; colors from tokens; grep hardcoded hex in the component = 0.
- [ ] AC-8 Other home sections and all pages byte-unchanged (verify diff).
- [ ] AC-9 Responsive to 360px (columns stack, labels unclipped, connectors still stop at border); AA on the figure and text; SVG role/aria-label; pulses aria-hidden; Lighthouse ≥ baseline.

## 6. Test plan
Visual vs wireframe (desktop + mobile); confirm no connector overlaps the core (esp. CORREOS); reduced-motion static check; diff review confirming only section 01 changed; a11y (aria-label, hidden pulses); Lighthouse. Confirm the rest of the home is untouched.

## 7. Notes for Cline
- Read `.clinerules`, this spec, the wireframe, v1.1.1 §3/§5.1, Libro Ch. 10/12 before coding. Name/token mismatch → `DECISIONS.md` wins.
- Replace section-01 internals only; keep component APIs and home usage stable.
- Move all figure/section copy into the dictionary; update content spec §5.1.
- Surgical polish: if a change would ripple beyond section 01, stop and flag it.
- Commit: `feat(home): section 01 message + layout + FIG.02 redesign`.

## 8. Definition of Done
All AC checked · only section 01 changed · connectors stop at the core border · rest of the landing untouched · content spec §5.1 updated · Carlos approves the live section → ready for the next section's polish.
