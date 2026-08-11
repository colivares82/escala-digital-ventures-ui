# SPEC — Polish 03: Home section 04 "Evidencia" (real Magupell data)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-POLISH-03 · Version 1.0 · August 2026
**Author:** Claude (UI/UX) · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Type:** targeted polish — changes ONLY home section 04 ("04 / EVIDENCIA"): its readouts grid and the FIG.04 timeline. Title and client chips stay. No other section, page, component, or token changes.
**Sources of truth:** `docs/el-libro-de-escala-v2.2.md` (Ch. 7 "valor real y medible", Ch. 15 Magupell) · `docs/escala-web-content-spec-v1.1.1.md` (§3 identity, §5.1 home section 04) · Carlos-provided real Magupell metrics (this spec) · `PLAN.md`
**Wireframe (authoritative reference):** `specs/mockups/wireframe-p04-evidencia-FINAL.html` (APPROVED).

---

## 0. Scope guard — read first

Third iteration of the section-by-section landing polish. Touches ONLY home section 04. **Do NOT modify:** hero (00), problem (01), claims marquee, services, PhaseCycle, alliance, contact, or any other page. Only section 04's readouts and FIG.04 change; the "Hechos, no promesas." title and the two client chips stay. Everything else byte-identical. Cline must include `git diff --stat` in its final report so the changed-file list is visible before approval.

## 1. Why

The current readouts use rounded, generic figures ("100+", "200+") and a dateless generic stair. The real Magupell numbers tell a far stronger, more credible engineering story — which is exactly what "Hechos, no promesas" promises. This polish replaces the figures with the real ones and reframes each readout to communicate VALUE, not raw data. Scope note: for now this section is Magupell's evidence; it will be generalized to multiple cases (incl. BioZero) in a later iteration — keep the readout data structured so that future generalization is a data change, not a redesign.

## 2. Real data (verbatim; do NOT inflate or add detail)

- Requisitos: **167 → 216** (started at 167; refined to 216 through iteration + prototype).
- Pruebas: **1.803** automated tests across **165 files** = **1.042 backend** (Jest, 80 `.spec.ts`) + **761 frontend** (Vitest, 85 `.test.tsx`). (Do NOT expose file-count breakdown beyond "1.042 backend + 761 frontend" in the UI.)
- Entornos: **3** — local · desarrollo · producción, with protected pipelines.
- Timeline: **Dic 2025** requerimientos → **Ene 2026** prototipo → **Abr 2026** desarrollo → **May–Jun 2026** preproducción → **Jul 2026** producción. (≈ **7 meses** requirements→production.)
- Impact: in its first month, the system replaced years of manual processes; it now orchestrates the operation and provides data insights; a reality for all users.
- Roles: admin, cliente, inspector, proveedor — the system is tailored per role, each with what they need, full control and auditability.
- Brand spelling: **Magupell** (not MAGUPELL).

## 3. What changes

### 3.1 Layout
- Keep the top row: left = title "Hechos, no promesas." + subtitle "EVIDENCIA VERIFICADA EN CLIENTES REALES" + two client chips (Magupell, BioZero) unchanged; right = FIG.04 timeline (redesigned, §3.3).
- Readouts grid: **2 columns × 3 rows** (was 4 in a row / 3×2). Six cells.

### 3.2 Readouts (value-first; mixed format — number where there is one, value-phrase where the message matters more)
- **DAT.01 / REQUISITOS** — figure "167 → 216" · caption "Requisitos funcionales refinados con iteración y prototipo."
- **DAT.02 / PRUEBAS** — figure "1.803" · caption "Pruebas automatizadas: 1.042 backend + 761 frontend. Estabilidad garantizada en cada cambio."
- **DAT.03 / ENTORNOS** — figure "3 entornos" · caption "Local, desarrollo y producción, con pipelines protegidas."
- **DAT.04 / TIEMPO A PRODUCCIÓN** — figure "7 meses" · caption "De los primeros requerimientos a producción." (This replaces the bare "JUL 2026" — the value is the elapsed time, not the date.)
- **DAT.05 / IMPACTO** — value-phrase (large) "Sustituyó lo manual." · caption "El sistema orquesta la operación y da insights de datos. En su primer mes, ya es una realidad para todos los usuarios."
- **DAT.06 / A MEDIDA** — value-phrase (large) "A medida de cada rol." · caption "Admin, cliente, inspector y proveedor: cada función con lo que necesita, con control y auditoría completa."
- Figures render in Archivo (display); numbers larger, value-phrases slightly smaller (per wireframe). Each cell has a small kit micro-plot (decorative, kit grammar).

### 3.3 FIG.04 timeline (redesign — real dates, aligned labels)
- An ascending stair of **5 milestones** with REAL dates, each label pair (date + deliverable) **anchored to and aligned with its own step tread**, not floating. Dates ~14px, deliverables ~12px — legible. Production node accented ambre; "Producción" label in ambre-dk.
- Caption: "FIG. 04 — DE LOS REQUERIMIENTOS A PRODUCCIÓN EN 7 MESES, CON FECHAS VERIFICADAS".
- Everything stays inside the figure frame; no label crosses a step or the frame border.

## 4. Legibility & containment (explicit)
4.1. All readout captions use the body font at a legible size (~15px), NOT tiny mono; caption width capped (~42ch) so text never overflows the cell.
4.2. No text or micro-plot may touch or cross a cell border, at any breakpoint.
4.3. FIG.04 labels must be legible and each must sit on its step; verify the longest ("MAY–JUN 2026 · Preproducción") does not collide with the adjacent step or frame.

## 5. Implementation
5.1. Update the existing section-04 component + its readout component + FIG.04 figure component. Do NOT create parallel components; replace internals.
5.2. All copy/figures/dates from `content/es/home.ts` (section-04 keys): title, subtitle, chips[2], readouts[6] (label, value, kind, caption, plotVariant), timeline[5] (date, deliverable), timelineCaption, timelineAria. Structure readouts + timeline as arrays so future multi-case generalization is a data change. EN/CA fully translated. Brand spelling "Magupell".
5.3. Kit grammar (§3.3 identity): mono labels, Archivo figures, corner-tick figure frame, ambre accents, mar for data. Colors from tokens only; no hardcoded hex.
5.4. Responsive: 2×3 grid collapses to 1 column on mobile (<768px); FIG.04 scales and labels stay legible/anchored; top row stacks (title/chips above figure). No overflow at 360px.
5.5. Accessibility: FIG.04 has role="img" + aria-label (from dictionary). Micro-plots aria-hidden. Readout figures readable by SR (the figure + caption convey the value).

## 6. Acceptance criteria
- [ ] AC-1 `npm run build` passes; TS strict clean; only section-04 component(s) + home dictionary section-04 keys changed (diff scoped); `git diff --stat` in the report.
- [ ] AC-2 Layout matches the wireframe: top row (title + subtitle + 2 chips | FIG.04), readouts 2 columns × 3 rows.
- [ ] AC-3 Readouts show the real values per §3.2 (167→216, 1.803 with 1.042+761, 3 entornos, 7 meses, "Sustituyó lo manual.", "A medida de cada rol.") with the exact captions; DAT.04 is "7 meses" not a bare date.
- [ ] AC-4 FIG.04 shows 5 real-dated milestones with labels aligned to their steps (not floating), production accented; caption mentions 7 months.
- [ ] AC-5 Legibility: captions in body font ~15px, none overflowing; no text/plot touches a cell border; FIG.04 labels legible and non-colliding (verify MAY–JUN label).
- [ ] AC-6 Title "Hechos, no promesas.", subtitle, and the two client chips are unchanged; brand spelling "Magupell".
- [ ] AC-7 All copy/data from the dictionary (arrays for readouts + timeline); numbers exact, not inflated; no file-count detail beyond backend/frontend split; colors from tokens; grep hardcoded hex = 0.
- [ ] AC-8 Other home sections and all pages byte-unchanged (verify diff).
- [ ] AC-9 Responsive to 360px (grid → 1 col, FIG.04 legible/anchored, no overflow); AA on figures/text; FIG.04 role/aria-label; micro-plots aria-hidden; Lighthouse ≥ baseline.

## 7. Test plan
Visual vs wireframe (desktop + mobile); verify each FIG.04 label sits on its step and nothing overflows cells/frame; confirm figures are the exact real numbers; reduced-motion N/A (static) but confirm micro-plots are decorative; diff review + `git diff --stat` confirming only section 04 changed; a11y; Lighthouse.

## 8. Notes for Cline
- Read `.clinerules`, this spec, the wireframe, v1.1.1 §3/§5.1, Libro Ch. 7/15 before coding. Name/token mismatch → `DECISIONS.md` wins.
- Replace section-04 internals only; keep component APIs and home usage stable. Keep the readouts/timeline as data arrays (future BioZero generalization = data change).
- Numbers are exact and Carlos-verified; do not round or embellish; "Magupell" spelling.
- Surgical polish: if a change would ripple beyond section 04, stop and flag it. Include `git diff --stat` in the final report.
- Commit: `feat(home): section 04 real Magupell evidence (readouts + FIG.04)`.

## 9. Definition of Done
All AC checked · only section 04 changed (diff-stat shown) · real numbers exact · FIG.04 labels aligned & legible · title/chips intact · rest of landing untouched · Carlos approves the live section → ready for the next section's polish.
