'use client'

import { DiagramReveal } from '@/components/motion-runtime'

type DiagramKind = 'hero' | 'problem' | 'proof' | 'outcome'

type NodeProps = {
  x: number
  y: number
  label: string
  alert?: boolean
  active?: boolean
  available?: boolean
  circle?: boolean
  radius?: number
  labelX?: number
  labelY?: number
  textAnchor?: 'start' | 'middle' | 'end'
}

/**
 * Renders a single node (rect or circle) with its label.
 * Node labels are intentionally defined inline here because they are
 * part of the diagram's visual structure, not user-facing copy.
 * The accessible label for the full diagram is passed via the `label` prop
 * on the `SystemDiagram` component and flows from `homeContent.diagrams`.
 */
function Node({
  x,
  y,
  label,
  alert,
  active,
  available,
  circle,
  radius = 11,
  labelX,
  labelY,
  textAnchor = 'middle',
}: NodeProps) {
  return (
    <g
      className={[
        'diagram-node',
        active ? 'is-active' : '',
        alert ? 'is-alert' : '',
        available ? 'is-available' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <title>{label}</title>
      {circle ? (
        <circle cx={x} cy={y} r={radius} />
      ) : (
        <rect x={x - 30} y={y - 12} width="60" height="24" rx="1" />
      )}
      <text
        x={labelX ?? x}
        y={labelY ?? y + 3}
        textAnchor={textAnchor}
      >
        {label}
      </text>
      {alert && (
        <path
          className="diagram-alert"
          d={`M${x + 24} ${y - 18}v-9m0 14v1`}
        />
      )}
    </g>
  )
}

function Connector({
  d,
  manual = false,
  pulse = false,
}: {
  d: string
  manual?: boolean
  pulse?: boolean
}) {
  return (
    <>
      <path
        className={`diagram-connector ${manual ? 'is-manual' : 'is-solid'}`}
        d={d}
      />
      {pulse && (
        <circle className="diagram-traveler" r="3">
          <animateMotion dur="3.6s" repeatCount="indefinite" path={d} />
        </circle>
      )}
    </>
  )
}

function Plate({
  children,
  label,
  number,
  className = '',
}: {
  children: React.ReactNode
  label: string
  number: string
  className?: string
}) {
  return (
    <DiagramReveal className={className}>
      <figure className="system-diagram">
        <svg viewBox="0 0 640 400" role="img" aria-label={label}>
          <defs>
            <pattern
              id={`grid-${number}`}
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                className="diagram-grid"
                d="M32 0H0V32"
              />
            </pattern>
          </defs>
          <rect
            className="diagram-grid-fill"
            width="640"
            height="400"
            fill={`url(#grid-${number})`}
          />
          <path
            className="diagram-frame"
            d="M16 40V16h24M600 16h24v24M16 360v24h24M600 384h24v-24"
          />
          {children}
        </svg>
        <figcaption>
          FIG. {number} — {label}
        </figcaption>
      </figure>
    </DiagramReveal>
  )
}

export function SystemDiagram({
  kind,
  label,
}: {
  kind: DiagramKind
  label: string
}) {
  if (kind === 'hero') {
    return (
      <Plate number="01" label={label} className="hero-plate">
        <g className="diagram-assembly">
          <Node x={96} y={82} label="HOJA DE CÁLCULO" />
          <Node x={96} y={160} label="CORREO" />
          <Node x={96} y={238} label="ALBARÁN" />
          <Node x={96} y={316} label="NOTAS" />
          <Connector manual d="M126 82C184 82 182 156 238 168" />
          <Connector manual d="M126 160H238" />
          <Connector manual d="M126 238C186 238 184 184 238 172" />
          <Connector manual d="M126 316C198 316 190 206 238 178" />
          <Node x={270} y={170} label="NÚCLEO" circle active labelY={192} />
          <Connector pulse d="M281 159L356 94" />
          <Connector pulse d="M281 181L356 280" />
          <Connector pulse d="M292 170H484" />
          <Node x={404} y={82} label="PLATAFORMA" />
          <Node x={496} y={158} label="FACTURACIÓN" />
          <Node x={404} y={292} label="INFORMES" />
          <Node x={526} y={280} label="DATOS" />
          <Connector d="M434 82H496V146" />
          <Connector d="M434 292H526V292" />
          <Connector d="M496 170V248H526V268" />
        </g>
      </Plate>
    )
  }

  if (kind === 'problem') {
    return (
      <Plate number="02" label={label} className="problem-plate">
        <g className="problem-web">
          <Connector manual d="M320 72L494 154L430 316L210 316L146 154Z" />
          <Connector manual d="M320 72L320 210M494 154L320 210M430 316L320 210M210 316L320 210M146 154L320 210" />
          <Node x={320} y={72} label="HOJA DE CÁLCULO" />
          <Node x={494} y={154} label="CORREO" />
          <Node x={430} y={316} label="ALBARÁN" />
          <Node x={210} y={316} label="NOTAS" />
          <Node x={146} y={154} label="PERSONAS" />
          <Node x={320} y={210} label="RETRABAJO" alert active />
          <text className="diagram-friction" x="270" y="172">×</text>
          <text className="diagram-friction" x="370" y="172">×</text>
          <text className="diagram-friction" x="276" y="260">×</text>
          <text className="diagram-friction" x="364" y="260">×</text>
        </g>
      </Plate>
    )
  }

  if (kind === 'proof') {
    return (
      <Plate number="04" label={label}>
        <path
          className="proof-fill"
          d="M48 330H146V270H252V210H358V144H464V82H600V350H48Z"
        />
        <path
          className="diagram-connector is-solid proof-stair"
          d="M48 330H146V270H252V210H358V144H464V82H600"
        />
        {(
          [
            ['ESPECIFICACIÓN', 92, 316],
            ['CONSTRUCCIÓN', 198, 256],
            ['200+ PRUEBAS', 304, 196],
            ['PRODUCCIÓN (JUL 2026)', 410, 130],
            ['OPERATIVA REAL: CLIENTES', 528, 58],
            ['PROVEEDORES · GESTIÓN INTERNA', 528, 72],
          ] as const
        ).map(([t, x, y]) => (
          <text className="proof-value" key={t} x={x} y={y}>
            {t}
          </text>
        ))}
        <circle className="diagram-traveler">
          <animateMotion
            dur="4.5s"
            repeatCount="indefinite"
            path="M48 330H146V270H252V210H358V144H464V82H600"
          />
        </circle>
      </Plate>
    )
  }

  // kind === 'outcome' (alliance constellation)
  return (
    <Plate number="05" label={label} className="alliance-plate">
      <g className="alliance-center">
        <circle cx="320" cy="200" r="36" />
        <circle cx="320" cy="200" r="27" />
        <text x="320" y="204">ESCALA</text>
      </g>
      <g className="alliance-links">
        <Connector pulse d="M320 200L320 84" />
        <Connector pulse d="M320 200L430 164" />
        <Connector manual d="M320 200L388 294" />
        <Connector manual d="M320 200L252 294" />
        <Connector manual d="M320 200L210 164" />
      </g>
      <g className="alliance-nodes">
        <Node
          x={320} y={84} label="MAGUPELL"
          circle radius={20} labelY={56} active
        />
        <Node
          x={430} y={164} label="BIOZERO"
          circle radius={20} labelX={458} labelY={168} textAnchor="start" active
        />
        <Node
          x={388} y={294} label="DISPONIBLE"
          circle radius={20} labelX={405} labelY={323} textAnchor="start" available
        />
        <Node
          x={252} y={294} label="DISPONIBLE"
          circle radius={20} labelX={235} labelY={323} textAnchor="end" available
        />
        <Node
          x={210} y={164} label="DISPONIBLE"
          circle radius={20} labelX={182} labelY={168} textAnchor="end" available
        />
      </g>
    </Plate>
  )
}
