# SPEC — FIX-01: IP / ownership correction across built work

**Project:** escaladigitalventures.com (`escala-digital-ventures-ui`)
**Spec ID:** SPEC-FIX-01 · Version 1.0 · August 2026
**Author:** Claude · **Approver:** Carlos · **Builder:** Cline under `.clinerules`
**Type:** cross-cutting correction (not a new page). Apply wherever built work states or implies that the client owns the source code.
**Sources of truth:** `docs/el-libro-de-escala-v2.2.md` (Ch. 6, 11, 13 — new section "Propiedad intelectual y modelo de colaboración") · `docs/escala-web-content-spec-v1.1.1.md` · this spec.

---

## 1. Background

Original docs (Libro v2.1, spec v1.1) stated "el cliente es propietario de su plataforma, su código y sus datos". This is INCORRECT. Corrected model (Libro v2.2, from the MAGUPELL contract, generalized): **Escala retains the intellectual property and the source code**; the client receives an **exclusive, indefinite use licence** over their platform, **owns their data** (full export, returned on termination), and gets **sector exclusivity** (Escala won't reuse the system for the client's competitors). The licence **survives** the end of the support service.

This spec makes all already-built work consistent with the corrected model, and installs a guard so the wrong wording cannot reappear.

## 2. Scope

**In scope:** any component, dictionary, or copy already built (Phases 0–1 and pages 2.1–2.4 to the extent built) that asserts or implies client code ownership; the shared reference docs; a repo-wide guard. Confirmed hotspots:
- `/que-hacemos` service line 2 ("Desarrollo de plataformas") — currently may read "Tú eres propietario de tu plataforma, tu código y tus datos."
- `/modelo-de-alianza` commitment 01 — must be "A MEDIDA" wording (SPEC-P2.4 already specifies this; verify built state).
- Home section 02 preview line for "Desarrollo de plataformas", if it echoes ownership.
- Any case copy (2.3) that claims code ownership (MAGUPELL Ch. 15 does NOT, but verify the built dictionary).

**Out of scope:** visual/layout changes (none). New pages.

## 3. Corrected canonical wording (use verbatim; ES master)

3.1. **Service line 2 deliverable (/que-hacemos + home preview)** — replace any "propietario de … código" clause with: "Diseñamos y construimos aplicaciones web y plataformas a medida —no plantillas—, con usuarios y roles, dominio propio, correo transaccional, generación de documentos y facturación integrada. Una solución construida a medida de tu negocio: obtienes una licencia de uso indefinida sobre tu plataforma y la propiedad de tus datos. La propiedad intelectual y el código son de Escala."
3.2. **Commitment 01 (/modelo-de-alianza)** — "A MEDIDA — Soluciones ajustadas a las necesidades y oportunidades reales de tu negocio — no plantillas." (already in SPEC-P2.4; this spec confirms it is the built state.)
3.3. **Optional alliance detail** (if an ownership/licence micro-line is shown on /modelo-de-alianza): "El cliente conserva la propiedad de sus datos y una licencia de uso indefinida; la propiedad intelectual y el código son de Escala, con exclusividad de sector para el cliente."
3.4. **Case copy** — cases state only verifiable facts; none may claim the client owns the code. MAGUPELL/BioZero narratives keep "opera y factura … a través de la plataforma" (usage, not code ownership).

## 4. Functional requirements

### FR-1 · Update reference docs in repo
1.1. Replace `docs/el-libro-de-escala-v2.1.md` with `el-libro-de-escala-v2.2.md`; update any in-repo references/paths from v2.1 → v2.2.
1.2. Replace `docs/escala-web-content-spec-v1.1.md` (or v1.1 variant) with `escala-web-content-spec-v1.1.1.md`; update references.
1.3. Update `PLAN.md` / `.clinerules` if they cite Libro v2.1 or spec v1.1 as the source of truth → v2.2 / v1.1.1.

### FR-2 · Fix built copy in dictionaries
2.1. Grep the codebase for the incorrect claim and its variants (see FR-4 patterns). For each hit in a `content/**` dictionary, replace with the §3 canonical wording. Copy lives in dictionaries only — do NOT hardcode in components.
2.2. `content/es/services.ts` service[1] (Desarrollo de plataformas): apply §3.1.
2.3. `content/es/alliance.ts` commitments[0]: confirm/apply §3.2.
2.4. Home preview dictionary (services preview, section 02): if it embeds ownership, apply the short form of §3.1 (drop the licence sentence if space-constrained, but never assert code ownership).
2.5. `content/data/cases.ts`: verify no code-ownership claim; if present, remove (§3.4).
2.6. EN/CA fallbacks that re-export ES need no separate change (they inherit); if any EN/CA file was hand-edited with the old claim, fix it too.

### FR-3 · No new component work
3.1. This is a copy/data + docs change. No component APIs change. If any component hardcodes the phrase (it shouldn't), move it to the dictionary and fix it there.

### FR-4 · Install a guard (prevent regression)
4.1. Add a repo check (lint script or a unit test) that FAILS if any of these patterns appear anywhere under `content/`, `components/`, `app/`:
  - `propietario de (tu|su) código`
  - `propietario de tu plataforma, tu código`
  - `tu código y tus datos`
  - `dueño del código`
4.2. Wire it into `npm run build` or the test suite so CI catches reintroductions. Document it in `.clinerules` as a standing rule: "Never state the client owns the source code or IP; the client gets a use licence + data ownership; code and IP are Escala's."

## 5. Acceptance criteria
- [ ] AC-1 `docs/` contains Libro v2.2 and spec v1.1.1; no v2.1/v1.1 source-of-truth references remain.
- [ ] AC-2 Grep across `content/`, `components/`, `app/` for the FR-4 patterns = 0 matches.
- [ ] AC-3 `/que-hacemos` service line 2 shows the §3.1 wording; `/modelo-de-alianza` commitment 01 shows §3.2; home section 02 preview asserts no code ownership.
- [ ] AC-4 Case pages assert no code ownership; only verifiable facts.
- [ ] AC-5 The guard (FR-4) is active and fails on a deliberately inserted bad phrase (verify, then remove the test insertion).
- [ ] AC-6 `npm run build` passes; TS strict clean; no visual/layout change (diff is copy/docs/test only).
- [ ] AC-7 `.clinerules` carries the standing ownership rule.

## 6. Test plan
Run the FR-4 grep before and after. Insert a bad phrase in a temp fixture → guard fails → remove it → guard passes. Visual smoke check that /que-hacemos and /modelo-de-alianza are unchanged except the corrected sentences. Confirm EN/CA still build (fallback intact).

## 7. Implementation notes for Cline
- Read `.clinerules`, this spec, Libro v2.2 Ch. 13, spec v1.1.1 before editing.
- This is surgical: docs swap + dictionary copy edits + one guard. Do NOT refactor components or restyle anything.
- Order: (1) swap docs + update references; (2) grep + fix dictionary copy per §3; (3) add the guard test/lint + `.clinerules` rule; (4) run AC; (5) remove any temp test insertion.
- Commit messages: `docs: adopt Libro v2.2 + spec v1.1.1 (IP correction)`, `fix(content): client gets use licence, not code ownership`, `test: guard against code-ownership wording`.

## 8. Definition of Done
All AC checked · guard green in CI · PLAN.md notes the correction applied · docs pinned to v2.2 / v1.1.1 → future pages (2.5+) inherit the corrected model automatically.
