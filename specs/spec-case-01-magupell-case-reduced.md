# SPEC — CASE-01 · Magupell case study page rewrite (launch-safe version)

**Owner:** Escala Digital Ventures
**Target repo:** `escala-digital-ventures-ui`
**Wireframe (authoritative for layout & final ES copy):** `specs/mockups/wireframe-magupell-case-reduced.html`
**Status:** ready to plan
**Language of deliverable content:** ES master + EN + CA

---

## 0. Scope guard

This is a **surgical content spec on a page that is live in production**. Read this section before planning.

### 0.1 In scope — the only things that may change

1. The Magupell case study page (`/casos-de-exito/magupell` and its EN/CA equivalents): its content dictionary entries, its readout data, and the addition of the new sections listed in §3.
2. One new figure component, `CaseFlowFig`, used **only** on this page (§4).
3. The Magupell card on the case study index page (`/casos-de-exito`) — copy and figures only (§5).
4. Page metadata for the Magupell case page in all three locales: `title`, `description`, OG and Twitter equivalents (§6).
5. The `es`, `en` and `ca` dictionaries for the strings introduced above.

### 0.2 Out of scope — must remain byte-identical

- The BioZero case page and its data.
- The home page, `/que-hacemos`, `/como-trabajamos`, `/modelo-de-alianza`, `/sobre-escala`, `/contacto`, legal pages, 404.
- `GridBackground`, `AllianceConstellation`, `ServiceFig`, `PageHeader`, `Section`, `FinalCTA`, `ContactForm` and every other shared component — **no edits, no new variants, no new props**. If a shared component cannot render a new section as specified, stop and report rather than modifying it.
- Routing, `routes.ts`, slugs, i18n plumbing, sitemap generation logic, hreflang logic.
- Design tokens, fonts, global CSS.
- The Magupell logo asset, the `www.magupell.com` outbound link, the inter-case navigation and the shared final CTA on this page.
- `/docs` sources (Libro de Escala, Website Content Spec). They are known to be stale on this topic; see §8.

### 0.3 Hard content rules

- **Never** state or imply that the platform issues invoices. Magupell prepares and sends **billing summaries** (*resúmenes de cobro*) from the platform. Every existing occurrence of *factura / facturación / facturar* on this page, in its metadata and on its index card must be replaced. This includes the current readout `OPERATIVA · REAL · factura a sus clientes en la plataforma` and the current section 04 body text.
- Spelling is **Magupell**, never `MAGUPELL`, in every user-facing string of this page and its card, in all three locales. The client's own legal-name form `Magupell, S.L.` is fine.
- No client-confidential detail. Specifically forbidden: names of individuals, internal code formats, prices or rates, names of Magupell's clients or tanneries, screenshots of the client system, and internal domain vocabulary rendered literally.
- Only verified figures may appear. The verified set is exactly the one in §2. Do not add, round, extrapolate or invent any number, and do not restore `100+` or `200+` anywhere.

---

## 1. Why this change

The page still carries the original pre-launch copy: generic narrative and the placeholder figures `100+` / `200+`. The home page was already updated with the verified production figures, so the site currently contradicts itself, and the case page — the most important proof asset Escala has — is the weakest page on the site.

This spec brings the case page up to the level of the home page and beyond: real figures, the actual end-to-end operating cycle, the four roles, and the governance argument. It deliberately stops short of describing the client's previous way of working in detail; that material is drafted and waiting on broader client authorisation (§9).

---

## 2. Verified data (single source for all figures on this page)

| Key | Value | Supporting detail |
|---|---|---|
| Requirements | 167 → 216 | Refined through iteration and a navigable prototype before build |
| Automated tests | 1.803 | 1.042 backend + 761 frontend. No further breakdown may be published |
| Time to production | 7 meses | First requirements (Dec 2025) to real operation (Jul 2026) |
| Roles | 4 | Administración, inspector, cliente, proveedor |
| Environments | 3 | Local, development, production, with protected pipelines |
| Production | Jul 2026 | Own domain, Google Cloud, European region |
| Timeline | Dic 2025 requerimientos · Ene 2026 prototipo · Abr 2026 desarrollo · May–Jun 2026 preproducción · Jul 2026 producción |

**Open item — resolve before implementing DAT.05.** The environment count must be confirmed with Carlos: project context and the home page state 3 environments; the June client documentation states 2 (development and production). If the answer is 2, DAT.05 changes to `2 entornos` with the caption `Desarrollo y producción, con pipelines protegidas`, and the governance card `CAMBIOS SEGUROS` changes accordingly. **Do not implement DAT.05 or that governance card until this is confirmed. Ask.**

No usage volumes (users, reports, lots, m², active clients) are published in this version — none are verified or authorised.

---

## 3. Page structure

The existing case template stays. The page keeps its numbered narrative blocks; the sequence is extended from five to seven, and the readout strip is replaced by a grid.

Order, top to bottom:

| # | Block | Change |
|---|---|---|
| — | Header: eyebrow, logo, outbound link, H1, lead, FIG frame | H1 and lead rewritten; eyebrow gains `· EN PRODUCCIÓN` |
| — | Readouts | 4-cell strip → 2×3 grid, new data |
| 01 | Contexto | Rewritten |
| 02 | Punto de partida | Rewritten (was "Problema") |
| 03 | Solución | Rewritten + new figure FIG. EXP-02 |
| 04 | A medida de cada rol | **New** — 2×2 role cards |
| 05 | Gobernanza | **New** — dark surface, 2×2 cards |
| 06 | Impacto | Rewritten + chronology ladder |
| 07 | Siguientes pasos | Lightly rewritten |
| — | Inter-case nav + FinalCTA | Unchanged |

All final ES copy is in the wireframe and is authoritative; do not paraphrase it. Implementation notes per block:

- **Header.** The H1 changes from a project description to an outcome statement. Keep the existing header component, logo treatment and `FIG. EXP-01` caption exactly as they are.
- **Readouts.** Six cells, `2×3` on desktop, `1×6` stacked below the tablet breakpoint. Each cell: mono key (`DAT.0N / LABEL`), amber tick, mono value, mono supporting line. This mirrors the home page's evidence grid visually but is a page-local rendering — **do not extract, share or refactor the home component to serve both**. Duplicating markup here is the correct, low-risk choice.
- **Section 05 Gobernanza** is the only block on the page rendered on the abisal dark surface. It must meet AA contrast on that surface using existing tokens only.
- **Chronology ladder (FIG. EXP-03)** repeats the five milestones from the home page and adds one detail line each. Same rule as the readouts: render locally, do not touch the home component.

---

## 4. New figure — FIG. EXP-02 "El ciclo operativo"

A new, page-local figure component (suggested name `CaseFlowFig`). It exists to make one point visually: **a single flow, from inspection to billing summary, with nothing falling outside the system.**

Structure:

- Four nodes on a horizontal axis, left to right: `01 Catálogo` → `02 Inspección` → `03 Revisión y envío` → `04 Cobro`. Each node carries a mono index, a display-weight title and one supporting line (copy in the wireframe).
- A cross-cutting band beneath the four nodes, framed in amber, reading `UN SOLO DATO · TRAZABILIDAD COMPLETA · NOTIFICACIONES EN TIEMPO REAL`. It spans the full width to communicate that these properties apply across every stage, not at one point.
- Caption in mono: `FIG. EXP-02 — UN ÚNICO FLUJO, DE LA INSPECCIÓN AL COBRO`.

Geometry and behaviour requirements (Escala figure standard):

- Connectors terminate at the border of each node. They never cross or overlap a node.
- All text stays inside its container at every breakpoint down to 360px.
- Layer order: connectors behind nodes.
- Motion: one directional traversal left→right, narrative rather than decorative, running once on entry. Full static fallback under `prefers-reduced-motion`.
- Below the tablet breakpoint the four nodes stack vertically and the flow reads top to bottom; the cross-cutting band sits below the stack.
- Colours from tokens only; amber used for the index marks, the traversal accent and the band frame. Use the AA-safe dark amber for any amber text on the light surface.

This figure must not reuse, extend or import `ServiceFig`, `AllianceConstellation` or `GridBackground`.

---

## 5. Case index card

On `/casos-de-exito`, the Magupell card must be brought into line: spelling, no invoicing language, and its impact line and figures replaced with material drawn from §2. Keep the card component, its layout and the BioZero card untouched.

---

## 6. Metadata

Current metadata for this page (all locales) advertises `100+ requisitos, 200+ pruebas automatizadas` and invoicing. Rewrite `title` (≤60 chars) and `description` (≤155 chars) per locale, plus the OG and Twitter equivalents that derive from them. The description should carry the outcome and one verified figure, and must not mention invoicing. Canonical, hreflang and `x-default` behaviour is unchanged.

---

## 7. Localisation

ES is master and is fixed by the wireframe. EN and CA are professional-register translations, reviewed by Carlos before merge.

- Claims and headings are **recrafted, not translated word for word**. The H1 in particular should land as an outcome statement in each language, not as a literal rendering.
- Mono labels (`DAT.0N`, `EXPEDIENTE 01`, section labels, figure captions) are localised too; keep them short enough not to wrap in the mono type at small sizes.
- Numbers keep locale-appropriate formatting: `1.803` in ES/CA, `1,803` in EN.
- Every new key must exist in all three dictionaries. No silent fallback is acceptable for this page — the coverage guard must pass.
- The `resúmenes de cobro` concept translates as **billing summaries** (EN) and **resums de cobrament** (CA). Never *invoices* / *factures*.

---

## 8. Known documentation debt (do not fix in this change)

`/docs` still contains the pre-launch narrative: `100+` / `200+` figures, the invoicing claim, and the `MAGUPELL` spelling. Those sources will be updated in a separate pass. Report the affected locations in the final report but do not edit them here, so the diff for this change stays reviewable.

---

## 9. Deferred content

The following is written and approved internally but is **not** part of this change. It publishes more of the client's operating model than current authorisation covers, and will be added in a follow-up spec once the client signs off. Nothing in this implementation should make that addition harder: the new sections must be additive and the numbered narrative must tolerate insertions.

- The "antes → ahora" comparison table (8 rows).
- Per-role capability lists.
- The supplier-facing quality performance detail.
- Expanded solution detail: master catalogue, configurable inspection criteria, unified results scale, conditional acceptance, issue tracking.
- The "empresa familiar" framing.

---

## 10. Acceptance criteria

Verifiable by diff and by inspection:

1. `rg -i "factura|facturación|facturar|invoic|factur" ` returns no match within the Magupell case page content, its card, or its metadata, in any locale.
2. `rg "MAGUPELL"` returns no match in user-facing strings for this page or its card, in any locale.
3. `rg "100\+|200\+"` returns no match in the Magupell case page, card or metadata.
4. The six readouts render the exact §2 values, and no other numeric claim appears anywhere on the page.
5. Sections 04 and 05 exist and render the wireframe copy; section 05 renders on the abisal surface and passes AA contrast.
6. FIG. EXP-02 renders with connectors terminating at node borders, no text overflow at 360px, and a static fallback under `prefers-reduced-motion`.
7. The page is complete in ES, EN and CA; the i18n coverage guard passes with no fallback.
8. No file outside the paths implied by §0.1 is modified. TypeScript strict passes; Lighthouse is at or above the current baseline for this route.
9. The BioZero page and card, and the home page, are byte-identical.

## 11. Final report

Include `git diff --stat` in the completion report, together with: the list of files touched, confirmation of each acceptance criterion, the answer received on the environments question (§2), and any point where the spec could not be followed without touching a shared component.
