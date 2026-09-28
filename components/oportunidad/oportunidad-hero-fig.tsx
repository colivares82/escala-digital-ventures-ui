/**
 * OportunidadHeroFig — FIG. 01 on /oportunidad (LANDING-01 §3.1).
 *
 * Three columns: 5 dashed inputs → one core ("TU SISTEMA") → 2 outputs.
 * Geometry mirrors specs/mockups/wireframe-landing01-oportunidad.html.
 * Every connector is drawn BEFORE the boxes (so lines sit behind nodes) and
 * ends exactly on a node edge — never crosses one.
 *
 * Colours: CSS classes only (tokens in globals.css) — no fill/stroke literals.
 * Motion: dashed inputs animate stroke-dashoffset left→right via CSS; the
 * reduced-motion media query in globals.css removes the animation entirely.
 */
import type { OportunidadHeroFigContent } from '@/content/types'

const VIEWBOX = '0 -8 900 280'
const HEADER_Y = 14
const HEADER_X = [20, 450, 890] as const
const HEADER_ANCHOR = ['start', 'middle', 'end'] as const

// Inputs: scattered left column. Width scales with label length (mono font).
const INPUT_X = [40, 85, 20, 110, 35] as const
const INPUT_CY = [55, 103, 150, 197, 244] as const
/** Where each input's connector lands on the core's left edge. */
const INPUT_TARGET_Y = [109, 109, 150, 171, 171] as const
const INPUT_H = 26
const INPUT_CHAR_W = 9.4
const INPUT_PAD = 22
const INPUT_TEXT_DX = 11

// Core
const CORE = { x: 345, y: 95, w: 210, h: 90 } as const

// Outputs
const OUTPUT_X = 670
const OUTPUT_Y = [65, 155] as const
const OUTPUT_W = 220
const OUTPUT_H = 60
const OUTPUT_BAR_W = 5
/** Connector start points on the core's right edge. */
const OUTPUT_FROM_Y = [113, 167] as const

function inputWidth(label: string): number {
  return label.length * INPUT_CHAR_W + INPUT_PAD
}

export function OportunidadHeroFig({ content }: { content: OportunidadHeroFigContent }) {
  const coreRight = CORE.x + CORE.w
  const coreCx = CORE.x + CORE.w / 2

  return (
    <figure className="oport-fig">
      <div className="oport-fig__scroll">
        <svg
          className="oport-hero-fig"
          viewBox={VIEWBOX}
          width="100%"
          role="img"
          aria-label={content.aria}
        >
          {content.headers.map((header, i) => (
            <text
              key={header}
              className="oport-hero-fig__header"
              x={HEADER_X[i]}
              y={HEADER_Y}
              textAnchor={HEADER_ANCHOR[i]}
            >
              {header}
            </text>
          ))}

          {/* Connectors first — rendered behind every box. */}
          {content.inputs.map((label, i) => (
            <line
              key={`in-line-${label}`}
              className="oport-hero-fig__flow-in"
              x1={INPUT_X[i] + inputWidth(label)}
              y1={INPUT_CY[i]}
              x2={CORE.x}
              y2={INPUT_TARGET_Y[i]}
            />
          ))}
          {OUTPUT_Y.map((y, i) => (
            <line
              key={`out-line-${y}`}
              className="oport-hero-fig__flow-out"
              x1={coreRight}
              y1={OUTPUT_FROM_Y[i]}
              x2={OUTPUT_X}
              y2={y + OUTPUT_H / 2}
            />
          ))}

          {content.inputs.map((label, i) => (
            <g key={`in-${label}`}>
              <rect
                className="oport-hero-fig__input"
                x={INPUT_X[i]}
                y={INPUT_CY[i] - INPUT_H / 2}
                width={inputWidth(label)}
                height={INPUT_H}
              />
              <text
                className="oport-hero-fig__input-label"
                x={INPUT_X[i] + INPUT_TEXT_DX}
                y={INPUT_CY[i] + 5}
              >
                {label}
              </text>
            </g>
          ))}

          {content.outputs.map((output, i) => (
            <g key={output.title}>
              <rect
                className="oport-hero-fig__output"
                x={OUTPUT_X}
                y={OUTPUT_Y[i]}
                width={OUTPUT_W}
                height={OUTPUT_H}
              />
              <rect
                className="oport-hero-fig__bar"
                x={OUTPUT_X}
                y={OUTPUT_Y[i]}
                width={OUTPUT_BAR_W}
                height={OUTPUT_H}
              />
              <text className="oport-hero-fig__output-title" x={OUTPUT_X + 18} y={OUTPUT_Y[i] + 26}>
                {output.title}
              </text>
              <text className="oport-hero-fig__output-sub" x={OUTPUT_X + 18} y={OUTPUT_Y[i] + 48}>
                {output.sub}
              </text>
            </g>
          ))}

          <rect className="oport-hero-fig__core" x={CORE.x} y={CORE.y} width={CORE.w} height={CORE.h} />
          <text className="oport-hero-fig__core-title" x={coreCx} y={CORE.y + 40} textAnchor="middle">
            {content.coreTitle}
          </text>
          <text className="oport-hero-fig__core-sub" x={coreCx} y={CORE.y + 64} textAnchor="middle">
            {content.coreSub}
          </text>
        </svg>
      </div>
      <figcaption className="oport-fig__caption">{content.caption}</figcaption>
    </figure>
  )
}
