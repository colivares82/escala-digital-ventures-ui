/**
 * OportunidadHeroFig — FIG. 01 on /oportunidad, vertical (LANDING-01B §2).
 *
 * Top → bottom: 5 dashed chips (one staggered row) → curved dashed links into
 * the core's TOP edge → core "TU SISTEMA" → 2 solid curved arrows from the
 * core's BOTTOM edge → 2 outcome cards with an amber top bar.
 * Geometry mirrors specs/mockups/wireframe-landing01d-hero.html.
 *
 * Rules: chips keep their order and land on evenly spaced entry points in the
 * same order, so inbound links never cross. Every link starts/ends exactly on
 * a node edge and is drawn BEFORE the boxes (lines sit behind nodes).
 * Colours: CSS classes only (tokens in globals.css) — no fill/stroke literals.
 * Motion: inbound links animate stroke-dashoffset downward via CSS; the
 * reduced-motion media query removes it.
 */
import type { OportunidadHeroFigContent } from '@/content/types'

const VIEWBOX = '-4 0 568 512'
const WIDTH = 560

// Labels
const LABEL_IN_Y = 16
const LABEL_OUT_Y = 374

// Chips: one row, centred in WIDTH, y alternates by index (even/odd).
const CHIP_Y = [40, 76] as const
const CHIP_H = 34
const CHIP_GAP = 22
const CHIP_CHAR_W = 9.6
const CHIP_PAD = 30
const CHIP_TEXT_DY = 22

// Core
const CORE = { x: 110, y: 210, w: 340, h: 92 } as const
/** Inbound entry points sit between these insets on the core's top edge. */
const CORE_ENTRY_INSET = 50
const CORE_TITLE_DY = 42
const CORE_SUB_DY = 68

// Curves: vertical tangents with this control-point offset.
const CURVE_TENSION = 50

// Outcome cards
const CARD_Y = 396
const CARD_X = [0, 296] as const
const CARD_W = 264
const CARD_H = 112
const CARD_BAR_H = 5
const CARD_TEXT_DX = 24
const CARD_TITLE_DY = 48
const CARD_BODY_DY = 80
/** Outbound links leave the core's bottom edge at these width fractions. */
const OUT_FROM = [0.3, 0.7] as const
const OUT_CURVE_START = 40
const OUT_CURVE_END = 44
const ARROW_W = 6
const ARROW_H = 8
const ARROW_GAP = 1

const chipWidth = (label: string) => label.length * CHIP_CHAR_W + CHIP_PAD

/** Lays out the chips left→right, centred, and their core entry points. */
function layoutChips(labels: ReadonlyArray<string>) {
  const widths = labels.map(chipWidth)
  const rowW = widths.reduce((sum, w) => sum + w, 0) + CHIP_GAP * (labels.length - 1)
  const entryFrom = CORE.x + CORE_ENTRY_INSET
  const entryStep = (CORE.w - CORE_ENTRY_INSET * 2) / Math.max(labels.length - 1, 1)
  let x = (WIDTH - rowW) / 2
  return labels.map((label, i) => {
    const chip = { label, x, y: CHIP_Y[i % 2], w: widths[i], cx: x + widths[i] / 2 }
    x += widths[i] + CHIP_GAP
    return { ...chip, entryX: entryFrom + i * entryStep }
  })
}

/** Cubic curve with vertical tangents at both ends. */
const vCurve = (x1: number, y1: number, x2: number, y2: number, c1: number, c2: number) =>
  `M${x1} ${y1} C${x1} ${y1 + c1} ${x2} ${y2 - c2} ${x2} ${y2}`

export function OportunidadHeroFig({ content }: { content: OportunidadHeroFigContent }) {
  const chips = layoutChips(content.inputs)
  const coreCx = CORE.x + CORE.w / 2
  const coreBottom = CORE.y + CORE.h
  const outs = CARD_X.map((cardX, i) => ({
    fromX: CORE.x + CORE.w * OUT_FROM[i],
    toX: cardX + CARD_W / 2,
  }))

  return (
    <figure className="oport-fig">
      <svg className="oport-hero-fig" viewBox={VIEWBOX} width="100%" role="img" aria-label={content.aria}>
        {/* Links first — rendered behind every box. */}
        {chips.map((chip) => (
          <path
            key={`in-${chip.label}`}
            className="oport-hero-fig__flow-in"
            d={vCurve(chip.cx, chip.y + CHIP_H, chip.entryX, CORE.y, CURVE_TENSION, CURVE_TENSION)}
          />
        ))}
        {outs.map(({ fromX, toX }) => (
          <g key={`out-${toX}`} className="oport-hero-fig__out">
            <path
              className="oport-hero-fig__flow-out"
              d={vCurve(fromX, coreBottom, toX, CARD_Y, OUT_CURVE_START, OUT_CURVE_END)}
            />
            <path
              className="oport-hero-fig__arrow"
              d={`M${toX - ARROW_W} ${CARD_Y - ARROW_H - ARROW_GAP} L${toX} ${CARD_Y - ARROW_GAP} L${toX + ARROW_W} ${CARD_Y - ARROW_H - ARROW_GAP}`}
            />
          </g>
        ))}

        <text className="oport-hero-fig__header" x={0} y={LABEL_IN_Y}>
          {content.headers[0]}
        </text>
        {chips.map((chip) => (
          <g key={chip.label}>
            <rect className="oport-hero-fig__input" x={chip.x} y={chip.y} width={chip.w} height={CHIP_H} />
            <text className="oport-hero-fig__input-label" x={chip.cx} y={chip.y + CHIP_TEXT_DY} textAnchor="middle">
              {chip.label}
            </text>
          </g>
        ))}

        <rect className="oport-hero-fig__core" x={CORE.x} y={CORE.y} width={CORE.w} height={CORE.h} />
        <text className="oport-hero-fig__core-title" x={coreCx} y={CORE.y + CORE_TITLE_DY} textAnchor="middle">
          {content.coreTitle}
        </text>
        <text className="oport-hero-fig__core-sub" x={coreCx} y={CORE.y + CORE_SUB_DY} textAnchor="middle">
          {content.coreSub}
        </text>

        <text className="oport-hero-fig__header" x={0} y={LABEL_OUT_Y}>
          {content.headers[1]}
        </text>
        {content.outputs.map((output, i) => (
          <g key={output.title}>
            <rect className="oport-hero-fig__output" x={CARD_X[i]} y={CARD_Y} width={CARD_W} height={CARD_H} />
            <rect className="oport-hero-fig__bar" x={CARD_X[i]} y={CARD_Y} width={CARD_W} height={CARD_BAR_H} />
            <text className="oport-hero-fig__output-title" x={CARD_X[i] + CARD_TEXT_DX} y={CARD_Y + CARD_TITLE_DY}>
              {output.title}
            </text>
            <text className="oport-hero-fig__output-sub" x={CARD_X[i] + CARD_TEXT_DX} y={CARD_Y + CARD_BODY_DY}>
              {output.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="oport-fig__caption">{content.caption}</figcaption>
    </figure>
  )
}
