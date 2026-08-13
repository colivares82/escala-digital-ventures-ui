# POLISH-09 — Alliance constellation on `/modelo-de-alianza`

**Status:** COMPLETE
**Scope:** the "Por qué solo cinco" section of `/modelo-de-alianza`
**Reference implementation:** the constellation as it renders on the home page (POLISH-04)
**Depends on:** nothing

---

## §0 Scope guard — honoured

- `AllianceConstellation` and `GridBackground`: **byte-identical** (`git diff` empty on both files).
- Home page: pixel-identical after this change (verified live — see §5).
- All copy (eyebrow/heading/body/`constellationAria`): unchanged. No dictionary key added or
  removed.
- `AlliancePlanes`, `CommitmentsBand`, `PageHeader`, `FinalCTA`: untouched.
- No new prop, variant, or default was added to `AllianceConstellation` — the fix is entirely
  in the consumer (`components/pages/alliance.tsx`) switching which existing `size` value it
  passes.

## §1 Root cause

`/modelo-de-alianza` rendered `<AllianceConstellation size="large" .../>` inside a
`1fr 1fr` grid column. `size="large"` is a **fixed 420×420** SVG (`viewBox="0 0 420 420"`).
Its pentagon geometry places node centres at `210 ± 150` (orbit radius `150`) with node
radius `~22px`, leaving only **60px** of horizontal margin at the widest points — not
enough for a 10px mono label like `BIOZERO` (~55px) or `DISPONIBLE` (~60px) anchored
*outside* the node. SVG `overflow` defaults to `hidden`, so the labels were clipped at the
viewBox edge — exactly the reported `ONIBLE` / `BIOZE`.

The home page uses `size="protagonist"` — a **960×620** viewBox rendered at `width="100%"`
— whose pentagon geometry (orbit radius `200`, node radius `30`, centre `480,310`) leaves
**280px** of margin per side. No clipping there. The fix switches the consumer to
`size="protagonist"`; the shared component's geometry was never touched.

## §2 Change

### 2.1 Diagram
`components/pages/alliance.tsx`: `size="large"` → `size="protagonist"`. Same 5 seats from
`dict.alliance.seats`, same `ariaLabel`. `coreSubLabel` intentionally **not** passed — no
such copy exists in `alliance.ts` and §0 forbids adding a dictionary key for this.

### 2.2 Labels — casing resolution
Home (`content/{es,en,ca}/home.ts` → `allianceFigure.seats`) uses `BioZero`. The alliance
dictionaries (`content/{es,en,ca}/alliance.ts` → `seats`) used `BIOZERO`. Per §2.2 ("home
wins"), all three alliance dictionaries were corrected to `BioZero` — a single-token data
change, not prose; the surrounding eyebrow/heading/body copy is untouched. Two existing
assertions in `tests/content/content-integrity.test.ts` were updated to match, and a new
permanent regression test asserts the alliance dictionary's occupied-seat names equal the
home dictionary's, so the two can never drift again.

Free-seat labels (`DISPONIBLE` / `AVAILABLE`) were already correctly cased and unchanged.

### 2.3 Layout
`.alliance-why__grid` (`1fr 1fr` side-by-side) removed. New structure: text block
(`Reveal`) at its normal measure, followed by `.alliance-why__stage` (constellation,
`DiagramReveal`) at full section width, `max-width: 900px` (mirrors the home page's
`.alliance-stage`), centred, with `padding-inline` (1.5rem desktop / 0.75rem ≤767px) so the
outermost labels clear the section edge.

### 2.4 Motion
Reused the existing `data-visible` / `IntersectionObserver` mechanism (`DiagramReveal`) —
no second reveal system. One CSS wrinkle: the home page has a rule making
`.alliance-constellation--protagonist .ac-draw` permanently `opacity: 1` (correct there,
since home never wraps it in a reveal). A page-scoped counter-rule
(`.alliance-why__stage .diagram-reveal:not([data-visible='true']) ...`) restores the
fade-in for this page only; the selector requires `.alliance-why__stage`, which exists
nowhere else, so home cannot be affected. Verified live (see §5): the section starts at
`opacity: 0` while below the fold and reaches `opacity: 1` / `data-visible="true"` once
scrolled into view.

Reduced motion: covered by the existing global rule
(`@media (prefers-reduced-motion: reduce) { .ac-draw, ... { opacity: 1 !important } }`) —
no page-specific handling needed. Verified live: all `.ac-draw` elements render at
`opacity: 1` immediately under `prefers-reduced-motion: reduce`.

### 2.5 Cleanup
No separate legacy asset existed — the "old constellation" was the shared component's
`size="large"` branch. `'large'` still has one remaining consumer after this change:
`app/styleguide/page.tsx` (the styleguide showcase). Removing the `'large'` variant would
require modifying `AllianceConstellation`, which is the explicit §0 stop condition — left
in place and reported per AC-11's escape clause.

## §3 Acceptance criteria — results

| AC | Result |
|----|--------|
| AC-1 Component untouched | ✅ `git diff` empty on `alliance-constellation.tsx` and `grid-background.tsx` |
| AC-2 Home unchanged | ✅ Live-measured at 1440px: `900×581.25` rect, `960×620` viewBox, all labels/caption/coreSubLabel intact, class `alliance-constellation--protagonist` unchanged |
| AC-3 No clipping | ✅ Live-measured `getBBox()` for every `.ac-label` at 360/390/768/1024/1440/1920 × ES/EN/CA — zero out-of-viewBox labels (was 4/5 labels clipped per locale before the fix) |
| AC-4 No horizontal overflow (section-caused) | ⚠️ See deviation below |
| AC-5 Geometry | ✅ Live-measured: all 5 connectors start exactly at the core outer-ring edge (`d1FromCoreCenter === coreRadius`), unchanged component logic |
| AC-6 Casing | ✅ `Magupell`/`BioZero` match home exactly (enforced by new permanent test); `DISPONIBLE`/`AVAILABLE` unchanged |
| AC-7 Reveal | ✅ Live-verified: section forced below the fold → `data-visible: null`, `opacity: 0`; after scrolling into view → `data-visible: "true"`, `opacity: 1` |
| AC-8 Reduced motion | ✅ Live-verified: all `.ac-draw` at `opacity: 1` immediately under `prefers-reduced-motion: reduce` |
| AC-9 Copy unchanged | ✅ prose copy (eyebrow/heading/body/aria) byte-identical; only `seats[].name` casing token changed (approved deviation, §2.2) |
| AC-10 Sections untouched | ✅ `AlliancePlanes`/`CommitmentsBand`/`PageHeader`/`FinalCTA` markup unchanged |
| AC-11 Legacy removed | ⚠️ See deviation below |
| AC-12 Guards green | ✅ `tsc --noEmit` clean · `npm run build` clean · `npm test` 1115/1115 passing, coverage 80.46%/77.81%/86.48%/83.33% (above the 70% floor); `components/pages/alliance.tsx` coverage 0% → 100% |

## §4 QA matrix — executed

Headless Chrome via CDP (no Playwright wired into this project — same approach as prior
POLISH specs), widths 360/390/768/1024/1440/1920, locales ES/EN/CA:
1. Home vs. `/modelo-de-alianza` constellation comparison at 1440px — geometry/labels/
   classes match (home retains its caption/coreSubLabel, which alliance intentionally omits
   — see the deviation below).
2. 360px label-clearance check across all 3 locales — zero out-of-bounds labels.
3. Reveal fires once, on scroll, confirmed via forced below-the-fold viewport.
4. `prefers-reduced-motion: reduce` — diagram fully visible, static.
5. Sections above/below (`AlliancePlanes`, `CommitmentsBand`) unaffected — confirmed present
   and rendering after the change; markup byte-identical to before.

## §5 Final report

### `git diff --stat`
```
 app/globals.css                         | 53 ++++++++++++++++++++++-----------
 components/pages/alliance.tsx           | 37 +++++++++++++----------
 content/ca/alliance.ts                  |  2 +-
 content/en/alliance.ts                  |  2 +-
 content/es/alliance.ts                  |  2 +-
 tests/content/content-integrity.test.ts | 17 +++++++++--
 6 files changed, 73 insertions(+), 40 deletions(-)
```
Plus one new file: `tests/components/alliance-page.test.tsx` (8 tests, 100% coverage of
`components/pages/alliance.tsx`).

### Casing resolution (§2.2)
Home wins, as instructed. `content/{es,en,ca}/alliance.ts` `seats[].name` for the BioZero
seat changed from `BIOZERO` → `BioZero`, matching `content/{es,en,ca}/home.ts`
`allianceFigure.seats` exactly. Approved explicitly before implementation given the direct
wording conflict with the literal AC-9 as originally drafted (seat names are data, not the
section's prose copy).

### Legacy diagram
Not removed — there was no separate "legacy constellation" asset. The defect was the shared
component's `size="large"` branch, still referenced by `app/styleguide/page.tsx` after this
change. Deleting that branch would require editing `AllianceConstellation`, which trips the
§0 stop condition; left in place.

### Deviations flagged (neither hit the stop condition; both reported per plan)
1. **AC-4** — a pre-existing, site-wide 8px horizontal overflow at 360px from
   `.site-header`/`.page-header__*` (present on every `PageHeader`-using page — also on
   `/como-trabajamos` and `/casos-de-exito`, not introduced by this change) remains. The
   `.alliance-why` section itself now contributes zero overflow (previously the worst
   offender, with a clipped label extending to `right: 448` against a 360px viewport).
   Fixing the header/page-header overflow is out of this spec's scope (§0 protects
   `PageHeader`) and is recommended as a separate follow-up.
2. **`coreSubLabel` omitted** on `/modelo-de-alianza` — no such dictionary key exists in
   `alliance.ts`, and adding one would be a copy change beyond what was approved. The
   alliance-page constellation therefore lacks the inner "2 ALIANZAS ACTIVAS · 3
   DISPONIBLES" line the home page shows below the pentagon — one deliberate, rule-driven
   difference against the "indistinguishable" framing in §4.1 of the original request.
