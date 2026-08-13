# POLISH-10 — "Por qué solo cinco" section composition

**Status:** COMPLETE
**Scope:** the "Por qué solo cinco" section of `/modelo-de-alianza` — layout only
**Change type:** CSS-only, one file (`app/globals.css`), +54 lines / 0 deletions

---

## §0 Scope guard — honoured

`AllianceConstellation`, `GridBackground`, `components/pages/alliance.tsx`, all `content/**`
files, `AlliancePlanes`, `CommitmentsBand`, `PageHeader`, `FinalCTA`, and the POLISH-09
reveal mechanism are all **byte-identical** (`git diff` empty on every one). No prop,
variant or default was added to `AllianceConstellation` — the §0 stop condition was never
triggered.

## §1 Change

At ≥1024px, `.alliance-why__inner` becomes a two-column grid
(`minmax(0, 40fr) minmax(0, 60fr)`, 56px gap, `align-items: center`) instead of the
POLISH-09 flex-column stack. The eyebrow spans both columns via `grid-column: 1 / -1`
(no markup change). The text column keeps its own measure (`body` capped at 46ch); the
diagram (`.alliance-why__stage`) fills 100% of its column (`max-width: none`,
`padding-inline: 0`). Below 1024px nothing changes — the section still stacks exactly as
POLISH-09 left it, with a new 620px cap on the diagram between 640–1023px per §3. Section
padding at ≥1024px reduced from `8rem` to `6rem` (AC-8).

One implementation correction made during verification: the ≥1024px override block was
initially placed *before* the base `.alliance-why__*` rules in the stylesheet, so the
later-declared base rules (equal specificity) won the cascade and the override never
applied. Moved the block to *after* the base rules — media queries don't raise
specificity, only source order broke the tie.

## §2 Acceptance criteria — results

| AC | Result |
|----|--------|
| AC-1 Component untouched | ✅ empty diff |
| AC-2 Home unchanged | ✅ live-measured: `900×581.25` rect, `960×620` viewBox, unchanged class |
| AC-3 Copy untouched | ✅ zero changes under `content/` |
| AC-4 40/60 split, 56px gap, centred | ✅ live-measured at 1024/1440/1920px: `368/552`, `534.4/801.6`, `540.8/811.2` — all exact 40/60, `columnGap: 56px`, `align-items: center` |
| AC-5 Diagram gains width | ⚠️ see deviation below |
| AC-6 No clipping | ✅ zero out-of-bounds labels at 360–1920px × ES/EN/CA |
| AC-7 No overflow | ✅ `scrollWidth === clientWidth` at 768/1024/1440/1920 (both tracks `minmax(0,…)`); pre-existing 8px overflow at 360/390px from `.site-header`/`.page-header__*` persists unchanged (documented in POLISH-09, not touched here) |
| AC-8 Section shorter | ✅ 1440px: 767.7px after vs 1154.4px before (**−386.7px**, −33%) |
| AC-9 Heading breaks | ✅ zero overflow in ES/EN/CA at 1024px (`headingWidth === columnWidth`) |
| AC-10 Reveal intact | ✅ `opacity: 0` below fold → `opacity: 1`/`data-visible: true` on scroll; reduced-motion fully static |
| AC-11 Other sections untouched | ✅ empty diff on `AlliancePlanes`/`CommitmentsBand`/`PageHeader`/`FinalCTA` |
| AC-12 Guards green | ✅ `tsc --noEmit` clean · `npm run build` clean · 1115/1115 tests passing, coverage unchanged |

## §3 Deviation — AC-5

At 1440px the diagram measures **801.6px**, narrower than the POLISH-09 pre-change state
(**852px**, a flat `900px` cap minus padding). Same at 1920px: **811.2px** vs 852px. This
is the direct arithmetic result of the mandated `minmax(0, 40fr) minmax(0, 60fr)` split
applied to `.page-shell`'s content width (capped at `88rem`/1408px sitewide): 60% of the
~1336–1352px available track space tops out around 800–811px, below the old flat cap.

This was implemented exactly per §2's literal instructions (grid ratio, gap, "100% of its
column width" for the diagram) rather than adding unrequested logic (e.g. a custom
minimum width on the stage) to force the number past 852px — that would be a deviation
from the given ratio, not a fix. The diagram is still comfortably the section's dominant
element (60% vs 40%, and visibly larger than the text column at every desktop width
tested), and the section is meaningfully shorter (AC-8, −33%), which was the stated
intent. Flagged for a decision: keep the literal 40/60 ratio (current state), or add a
minimum width to `.alliance-why__stage` to guarantee it always exceeds the old 852px cap.

## §4 Final report

### `git diff --stat`
```
 app/globals.css | 54 ++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 54 insertions(+)
```

### Section height at 1440px
Before: **1154.4px** → After: **767.7px** (−386.7px, −33%)

### Diagram rendered width at 1440px
Before: **852px** → After: **801.6px** (−50.4px — see §3 deviation)

### §0 stop condition
Not triggered. No change to `AllianceConstellation`'s props, variants or defaults.
