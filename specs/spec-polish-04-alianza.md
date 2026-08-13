# SPEC — Polish 04: Home section 05 "Modelo de alianza" (constellation as protagonist)

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-POLISH-04 · Version 1.0 · August 2026
**Author:** Claude (UI/UX) · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Type:** targeted polish — changes ONLY home section 05 ("05 / MODELO DE ALIANZA"): the constellation figure (size, connectors, labels, animation) and its caption. Title and side text stay. No other section, page, or token changes.
**Sources of truth:** `docs/el-libro-de-escala-v2.2.md` (Ch. 11 alliance model, ~5 clients, exclusivity) · `docs/escala-web-content-spec-v1.1.1.md` (§3 identity, §5.1 home section 05) · SPEC-P2.4 (AllianceConstellation component) · SPEC-P2.5 (GridBackground primitive) · `PLAN.md`
**Wireframe (authoritative reference):** `specs/mockups/wireframe-p05-alianza-FINAL.html` (APPROVED).

---

## 0. Scope guard — read first

Fourth iteration of the section-by-section landing polish. Touches ONLY home section 05. **Do NOT modify:** hero (00), problem (01), claims marquee, services, PhaseCycle, evidencia (04), contact, or any other page. Only section 05's constellation figure + caption change; the "Cinco alianzas. Toda nuestra dedicación." title, the side paragraph, and the "Conoce el modelo de alianza ↗" button stay. Everything else byte-identical. Cline includes `git diff --stat` in its final report.

## 1. Why

The constellation is the strongest expression of Escala's business model — deliberate scarcity, exclusivity, partner commitment (five seats, two active, three open). Currently it's small and understated. This polish makes it the protagonist, fixes the connectors so they meet the core's ring edge (not its center), ensures labels are readable (no overlap), and keeps the core→active-seats animation with open seats waiting — so the figure communicates exclusivity, commitment and partnership as strongly as the copy does.

## 2. Reuse — no duplication (explicit)

2.1. **GridBackground:** the abisal grid background is already a reusable primitive (SPEC-P2.5, FR-6). This section MUST reuse it — do NOT reimplement or inline the grid CSS. If section 05 currently hand-rolls a grid, migrate it to `GridBackground`. No duplicate grid code anywhere.
2.2. **AllianceConstellation:** the constellation is already a parameterized component shared with `/modelo-de-alianza` (SPEC-P2.4, FR-3). This polish MUST update that ONE component (props/config), not create a second constellation. The `/modelo-de-alianza` page instance must remain correct after the change (verify no regression) — if the home wants a larger instance, drive it by props (size), not a fork.

## 3. What changes (constellation figure)

3.1. **Protagonist scale:** larger core and nodes so the figure has presence (per wireframe: core double ring ~r46/r60, nodes ~r30, seat radius ~200 in a ~960×620 viewBox). The figure occupies its space with authority; keep it centered with breathing room but not tiny.
3.2. **Connectors meet the core ring edge, not the center:** each connector starts at the OUTER ring edge of the ESCALA core (not its center) and ends at the seat node's edge — it must never cross into the core or the node. Compute endpoints trigonometrically from the ring/node radii.
3.3. **Seats:** regular pentagon, first seat at top (−90°), every 72°. Two ACTIVE named seats — **Magupell** (top), **BioZero** — with solid connector + solid node. Three **DISPONIBLE** seats — dashed connector + dashed node at reduced opacity.
3.4. **Labels readable, never overlapping their node:** anchor each label by its position — right-side seats anchor start (text to the right of the node), left-side anchor end (text to the left), top/bottom centered above/below — offset outside the node radius so no label overlaps its node (fixes the BioZero overlap). No label crosses the frame border.
3.5. **Message of exclusivity:** caption "FIG. 05 — CINCO PLAZAS. DOS ALIANZAS ACTIVAS. DEDICACIÓN COMPLETA."; sub-caption "CADA ALIANZA: ACOMPAÑAMIENTO TÉCNICO · ESTRATÉGICO · VISIONARIO"; a core sub-label "2 ALIANZAS ACTIVAS · 3 DISPONIBLES". Copy communicates scarcity/commitment, not a cold count.

## 4. Animation (keep, per wireframe)
4.1. Ambre pulse travels from the core ring edge to each ACTIVE seat's node edge, staggered, looping (core → active alliances). Uses the same edge-to-edge path as the connector (not center-to-center).
4.2. DISPONIBLE seats stay in a quiet waiting state — no pulse (or, if ever desired later, a very faint one; for now none). They read as reserved/pending activation.
4.3. Motion lightweight (SVG + rAF or the existing constellation animation). prefers-reduced-motion → fully static: all seats, connectors (meeting the ring edge), and labels visible and legible; no pulses.

## 5. Implementation
5.1. Update the existing `AllianceConstellation` component internals + section-05 wrapper. Reuse `GridBackground` for the section surface. Do NOT create parallel components or duplicate grid code.
5.2. All copy (title, side paragraph, button, seat names, caption, sub-caption, core sub-label) from `content/es/home.ts` (section-05 keys) — seats as a data array `{name, state: "occupied"|"free"}` so future changes (a new active alliance) are a data edit. Brand spelling "Magupell". EN/CA fallback inherits.
5.3. Kit grammar + tokens only (paper/abisal/ambre); no hardcoded hex. Corner-tick framing consistent with the kit.
5.4. Responsive: the figure scales down on mobile (<768px) keeping the pentagon symmetric, connectors meeting the ring edge, and labels non-overlapping/legible (reflow anchors as needed); title/side text stack above. No overflow at 360px.
5.5. Accessibility: SVG role="img" + aria-label ("Constelación de alianzas: Escala en el centro, dos alianzas activas (Magupell, BioZero) y tres plazas disponibles"). Decorative pulses aria-hidden.

## 6. Acceptance criteria
- [x] AC-1 `npm run build` passes; TS strict clean; only the constellation component + section-05 wrapper + home dictionary section-05 keys changed; `git diff --stat` in the report.
- [x] AC-2 Constellation is the protagonist (larger core/nodes per wireframe); layout matches the wireframe.
- [x] AC-3 Connectors start at the core's OUTER ring edge and end at the node edge — none crosses into the core or node (verify all five).
- [x] AC-4 Two active named seats (Magupell, BioZero) + three DISPONIBLE (dashed, dimmed); pentagon symmetric, first seat at top.
- [x] AC-5 Labels are readable and none overlaps its node or the frame (explicitly verify BioZero, right-side).
- [x] AC-6 Animation: ambre pulse core→active seats (edge-to-edge), staggered, looping; DISPONIBLE seats have no pulse; reduced-motion → full static, legible.
- [x] AC-7 **GridBackground is reused (no duplicated grid code); AllianceConstellation is the same shared component (no fork); `/modelo-de-alianza` instance unchanged (no regression).**
- [x] AC-8 Title, side paragraph, and button unchanged; caption/sub-caption communicate exclusivity; "Magupell" spelling; copy from dictionary; grep hardcoded hex = 0.
- [x] AC-9 Other home sections and all pages byte-unchanged (verify diff).
- [x] AC-10 Responsive to 360px (figure scales, connectors meet ring edge, labels legible/non-overlapping); AA on abisal; SVG role/aria-label; pulses aria-hidden; Lighthouse ≥ baseline.

## 7. Test plan
Visual vs wireframe (desktop + mobile); verify all five connectors meet the ring edge and no label overlaps a node (esp. BioZero); confirm GridBackground reuse (grep for any duplicated grid CSS = 0) and that `/modelo-de-alianza` is visually unchanged; reduced-motion static check; diff review + `git diff --stat` confirming only section 05 changed; a11y; Lighthouse.

## 8. Implementation notes (Cline)

### Files changed (git diff --stat)
```
app/[[...path]]/page.tsx                         |   1 +
app/globals.css                                  |  54 +++++
components/alliance-constellation.tsx            | 243 ++++++++++++++++++-----
components/home-sections.tsx                     |  37 +++-
content/ca/home.ts                               |  21 ++
content/en/home.ts                               |  21 ++
content/es/home.ts                               |  20 ++
content/types.ts                                 |  18 ++
tests/components/alliance-constellation.test.tsx | 112 ++++++++++-
tests/components/home-sections.test.tsx          |  65 +++++-
11 files changed, 538 insertions(+), 56 deletions(-)
```

### Key decisions
- Added `'protagonist'` size to `AllianceConstellation` (960×620 viewBox, R=200, nodeR=30, coreR1=46, coreR2=60). The `'compact'` and `'large'` sizes are unchanged — `/modelo-de-alianza` uses `'large'` and is unaffected.
- Traveling pulse implemented via SVG `<animate>` elements (declarative, no JS, respects reduced-motion via CSS `display:none`).
- Label anchoring by `cosA`/`sinA` thresholds (matches wireframe logic exactly).
- `AllianceFigureContent` type added to `content/types.ts`; `allianceFigure` key added to all three home dictionaries (ES/EN/CA) — fully translatable.
- `GridBackground` reused in `AllianceTeaser` via `position: relative` on the section element.
- Backward-compatible: when `allianceFigure` prop is absent, `AllianceTeaser` falls back to the legacy `SystemDiagram kind="outcome"` + legend.

### Test results
- 52 test files · 953 tests · 100% pass · build clean · TypeScript strict clean

## 9. Definition of Done
All AC checked · GridBackground + AllianceConstellation reused (no duplication) · /modelo-de-alianza unchanged · connectors meet the ring edge · labels legible · animation to active seats · title/side text intact · rest of landing untouched · Carlos approves the live section → ready for the next section's polish.
