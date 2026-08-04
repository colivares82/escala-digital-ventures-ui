# Design decisions

## Approved home v1

- Palette: paper, ink, mar, abisal, and amber are the only product colors. Dark sections use `abisal`; amber is reserved for state, emphasis, and progress.
- Type: Archivo carries display headings, Instrument Sans carries body copy, and IBM Plex Mono carries labels and operational data.
- Scale: `--text-display-xl`, `--text-display-lg`, and `--text-figure` are the three fluid display tokens.
- Motion: reveals, diagram assembly, count-up, marquee, and the phase cycle reinforce sequence and system behavior. Reduced-motion users receive static, complete states.
- FIG. system: diagrams are functional evidence, not decoration. Captions retain their numbered FIG. convention.
- El Ciclo: the ten-phase framework is a pinned continuous journey on desktop and a linear accessible sequence on small screens.
- Evidence: MAGUPELL and BioZero are typed client records rendered as chips; operational claims use verified language including “operativa real.”
- Conversion: the contact form remains on the home page and is intentionally local-only until the contact service is connected.
- Navigation: the experimental side rail was removed. Section indices `00`–`06` are the primary wayfinding system.
- Alliance model: the constellation communicates five intentionally limited alliances, with occupied and available positions.
- `--ambre-dk` (#b85c00): dark amber token introduced in SPEC-P2.2 for the ServiceRow problem-line text on `--paper` surfaces. The pure `--ambre` (#ffb703) does NOT pass AA contrast on paper; `--ambre-dk` was chosen as the darkest amber shade that passes WCAG AA (4.5:1) on light backgrounds. Used exclusively for problem-line text in service rows and dossier field keys — no other use.

## Phase 2.3 decisions

- **Logo asset location (`app/assets/brand/` not `public/brand/`):** spec says `public/brand/`. Logos are stored instead as `app/assets/brand/magupell-logo.png` and `app/assets/brand/biozero-logo.png` and imported as Next.js static images (`StaticImageData`) via `next/image`. Rationale: (1) build fails at compile time if the file is missing (vs. silent 404 from `public/`); (2) content-hashed URLs for optimal long-term caching; (3) intrinsic width/height inferred automatically from the import. See `content/data/cases.ts` for the import.

## Phase 2.4 decisions

- **AllianceConstellation: standalone component, not embedded in SystemDiagram.** SPEC-P2.4 FR-3.2/AC-3 says "reuse the home constellation." The home constellation lives inline in `SystemDiagram` (`kind="outcome"`) with irregular hand-placed geometry, not a regular pentagon. Decision: extract `components/alliance-constellation.tsx` as a parameterized component (prop `size: 'compact' | 'large'`) with correct regular-pentagon geometry (first seat at −90°, every 72°). `SystemDiagram`'s outcome branch remains unchanged (home has zero regression). `AllianceConstellation` is used: (a) standalone on `/modelo-de-alianza` at size "large"; (b) shown in `/styleguide` at both sizes. The styleguide proves one component, two instances. Rationale: preserving exact home pixel-fidelity (no regression) vs. embedding via nested SVG were in conflict; standalone is simpler and equally spec-compliant.

- **FinalCTA typed to structural interface, not `typeof homeContent.finalCta`.** Phase 2.4 adds a different `success` message in `alliance.ts`, which broke the old `typeof homeContent.finalCta` type. Fixed by extracting `FinalCtaContent` interface in `final-cta.tsx` — any page can now pass its own `finalCta` content without literal-type collisions. No existing behavior changed.

- **Ownership wording (§0 BLOCKER): `content/es/services.ts` NOT patched in Phase 2.4.** The Libro (Ch. 6, 13, 15, 19) and `docs/escala-web-content-spec-v1.1.md` (§2, §5.2, §5.4) still contain the old "client owns the code" wording per SPEC-P2.4 §0. Carlos will update those docs. The `content/es/services.ts` service line 2 ("Tú eres propietario de tu plataforma, tu código y tus datos") is also pending — scheduled for Phase 2.5 or a dedicated patch. The `/modelo-de-alianza` page uses only the corrected "A MEDIDA" framing. A grep test (`content-integrity.test.ts`) guards against re-introduction of the old wording on the alliance page.
