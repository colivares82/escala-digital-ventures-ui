# SPEC — Polish 05: /que-hacemos figure fixes (FIG.08, FIG.09, FIG.11 only)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-POLISH-05 · Version 1.0 · August 2026
**Author:** Claude (UI/UX) · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Type:** surgical fix — corrects ONLY three figures on the `/que-hacemos` page: FIG.08, FIG.09, FIG.11. Nothing else on the page changes.
**Sources of truth:** `docs/escala-web-content-spec-v1.1.1.md` (§3 identity, §5.2 services) · SPEC-P2.2 (ServiceFig component, five variants) · `PLAN.md`
**Wireframe (authoritative reference):** `specs/mockups/wireframe-quehacemos-figs-FINAL.html` (APPROVED).

---

## 0. Scope guard — read first (IMPORTANT: this is NOT a page rebuild)

This spec changes ONLY three figures on `/que-hacemos`, rendered by the `ServiceFig` component (SPEC-P2.2): the `platform` variant (FIG.08), the `ai` variant (FIG.09), and the `evolve` variant (FIG.11). **Everything else is untouched and must stay byte-identical:**
- The page itself (`/que-hacemos`), its PageHeader, layout, and all five service rows' text.
- The other two figures: FIG.07 (`capture`) and FIG.10 (`product`) — DO NOT modify.
- Every other page and component.
- The `ServiceFig` component's public API/props and its use anywhere else (incl. `/styleguide`) — only the internal drawing of the three named variants changes.

> **Approved amendment (Carlos, August 2026) — canvas normalisation.** FIG.08/09/11
> move to a 340×180 viewBox to match the approved wireframe. To keep all five figures
> at equal height in the shared 320px column, FIG.07 (`capture`) and FIG.10
> (`product`) receive a **canvas-only normalisation**: their `viewBox` changes to the
> same 340×180, and their existing markup is wrapped in a single
> `<g transform="translate(10 15)">` (a shared `LegacyCanvas` helper) that centers the
> untouched 320×150 geometry inside the larger canvas. **No coordinate, stroke, label,
> or animation timing inside FIG.07/FIG.10 changes** — verified by dedicated geometry
> assertions in `tests/components/service-fig-polish-05.test.tsx`. AC-5 below is
> amended accordingly: "unchanged" means geometry-identical, canvas-normalised.

The changes are geometry/layering only (overlaps, edges, z-order) — NOT redesigns. **Flow animations must be preserved** (same motion, corrected paths). Cline includes `git diff --stat` in its final report so the changed-file list is visible before approval; the diff must touch only the `ServiceFig` component (three variants) and, if figure labels are dictionary-driven, the corresponding service dictionary keys — nothing else.

## 1. Why

Three figures have overlap/layering defects: text spilling outside containers, a flow line crossing box text, a label sitting on the diagram, and nodes drawn under a line that should sit on top. These are precision bugs, not design problems. Fix them and lightly improve legibility; keep everything else as approved.

## 2. Fixes

### 2.1 FIG.08 — `platform` (Arquitectura modular)
- Each module label must sit INSIDE its box: size each box to its text (USUARIOS · ROLES, DOMINIO, CORREO, DOCUMENTOS, FACTURACIÓN); no text spilling outside.
- The core PLATAFORMA circle must contain its label INSIDE the circle (reduce label size / enlarge circle as needed so "PLATAFORMA" fits within the ring).
- **Connectors must terminate exactly on the core circle's border** — each line ends at the point where it meets the core ring (computed from the core center + radius), never short of it and never crossing into the circle. Likewise each connector starts at its module box edge, not inside it.

### 2.2 FIG.09 — `ai` (IA en el proceso)
- The horizontal flow line must connect the box EDGES (ENTRADA → PROCESO → DECISIÓN) and must NOT cross over the boxes' text — draw the flow segments between adjacent box edges, and/or give the boxes an opaque (paper) fill so the line reads as passing behind them, not over the labels.
- "DONDE APORTA" must be repositioned OFF the diagram — above the IA node, not overlapping the process line or boxes.
- The IA node's dashed connector drops from the IA node down to the top edge of the PROCESO box (not through it).

### 2.3 FIG.11 — `evolve` (Evolución continua)
- The three nodes (USO, FEEDBACK, MEJORA) must be drawn ON TOP of the circle line, with an opaque (paper) fill, so the circle stroke behind each node is hidden (correct z-order: circle first, nodes last).
- Labels stay outside the nodes, non-overlapping.

## 3. Legibility (light touch, allowed)
Minor legibility tuning is in scope where it helps these three figures read cleanly (label size/position, box padding, stroke weights) — but no conceptual redesign, no change to the other figures, no change to copy meaning.

## 4. Animation (preserve)
4.1. The three figures must be animated (per the approved wireframe), with motion consistent with the identity's kit:
  - FIG.08 (`platform`): ambre pulses travel from each module connector toward the core, staggered, looping, ending on the core border. (This figure was previously missing its animation — it must have it.)
  - FIG.09 (`ai`): pulse travels the flow line between the box edges (and the IA connector).
  - FIG.11 (`evolve`): the ambre progress arc advances around the FULL circle continuously (the complete cycle USO→FEEDBACK→MEJORA and back), NOT just one quarter. (Previously it only animated a quarter — it must complete the loop.)
  Same visual language; connector/arc paths follow the corrected geometry.
4.2. prefers-reduced-motion → static, all three figures fully legible (arcs complete, no pulses).

## 5. Implementation
5.1. Edit ONLY the `platform`, `ai`, and `evolve` variant drawing code inside `ServiceFig`. Do not touch `capture`/`product`, the component API, or the page.
5.2. Kit grammar + tokens only (paper/ink/ambre/ambre-dk); no hardcoded hex; corner-tick framing unchanged. Compute connector endpoints geometrically (core center + radius for FIG.08).
5.3. If any figure label text lives in the services dictionary, keep it there (no hardcoding); the three fixes are geometry/layering, so ideally no copy changes at all.
5.4. Responsive: figures remain legible and contained at small widths; no overflow at 360px.
5.5. Accessibility: the figures' existing role/aria-label stay; decorative pulses aria-hidden.

## 6. Acceptance criteria
- [ ] AC-1 `npm run build` passes; TS strict clean; diff touches ONLY the ServiceFig component (three variants) [+ dictionary figure keys if applicable]; `git diff --stat` in the report.
- [ ] AC-2 FIG.08: all module labels inside their boxes; "PLATAFORMA" inside the core circle; every connector ends exactly on the core circle border (verify all five) and starts at its module edge.
- [ ] AC-3 FIG.09: flow line connects box edges without crossing box text; "DONDE APORTA" is above the IA node, off the diagram; IA dashed connector meets the PROCESO top edge.
- [ ] AC-4 FIG.11: nodes drawn on top of the circle with opaque fill (circle stroke hidden behind each node); labels outside, non-overlapping.
- [ ] AC-5 (amended, see §0) FIG.07 and FIG.10 keep byte-identical drawing coordinates/strokes/labels/animations — only their `viewBox` and a wrapping translate change (canvas normalisation); the `/que-hacemos` page (header, layout, all row copy) is unchanged; all other pages/components unchanged (verify diff).
- [ ] AC-6 All three figures animated: FIG.08 has module→core pulses (staggered, looping); FIG.09 pulses along the flow line; FIG.11 arc completes the FULL circle in a continuous loop (not a quarter). Pulses follow the corrected paths; reduced-motion static and legible (arc shown complete).
- [ ] AC-7 Tokens only (grep hardcoded hex in the touched variants = 0); no copy meaning changed.
- [ ] AC-8 Responsive to 360px (figures contained/legible); AA; existing aria intact.

## 7. Test plan
Visual vs wireframe for the three figures (desktop + mobile); zoom to verify FIG.08 connectors land on the core border, FIG.09 line passes behind boxes and DONDE APORTA is clear, FIG.11 nodes hide the circle stroke; confirm FIG.07/FIG.10 and the rest of the page are pixel-unchanged; reduced-motion check; diff review + `git diff --stat` confirming only ServiceFig changed; Lighthouse ≥ baseline.

## 8. Notes for Cline
- Read `.clinerules`, this spec, the wireframe, SPEC-P2.2 (ServiceFig), v1.1.1 §3/§5.2 before coding. Name/token mismatch → `DECISIONS.md` wins.
- This is a surgical geometry/layering fix on three ServiceFig variants. Do NOT rebuild the page, do NOT touch the other two figures, do NOT change the component API. Preserve animations.
- Compute FIG.08 connector endpoints from the core center/radius so they meet the border exactly.
- If a change would ripple beyond these three variants, stop and flag it. Include `git diff --stat`.
- Commit: `fix(que-hacemos): FIG.08/09/11 overlap & layering fixes`.

## 9. Definition of Done
All AC checked · only the three ServiceFig variants changed (diff-stat shown) · FIG.07/FIG.10 and the rest of the page untouched · animations preserved · Carlos approves the three live figures → ready for the next iteration.
