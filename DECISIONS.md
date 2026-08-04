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
- `--ambre-dk` (#b85c00): dark amber token introduced in SPEC-P2.2 for the ServiceRow problem-line text on `--paper` surfaces. The pure `--ambre` (#ffb703) does NOT pass AA contrast on paper; `--ambre-dk` was chosen as the darkest amber shade that passes WCAG AA (4.5:1) on light backgrounds. Used exclusively for problem-line text in service rows — no other use.
