'use client'

import { DiagramReveal } from '@/components/motion-runtime'

type Kind = 'hero' | 'problem' | 'proof' | 'outcome'
type NodeProps = { x: number; y: number; label: string; alert?: boolean; active?: boolean; circle?: boolean; labelY?: number }

function Node({ x, y, label, alert, active, circle, labelY }: NodeProps) {
  return <g className={`diagram-node${active ? ' is-active' : ''}${alert ? ' is-alert' : ''}`}><title>{label}</title>{circle ? <circle cx={x} cy={y} r="11" /> : <rect x={x-30} y={y-12} width="60" height="24" rx="1" />}<text x={x} y={labelY ?? y+3}>{label}</text>{alert&&<path className="diagram-alert" d={`M${x+24} ${y-18}v-9m0 14v1`} />}</g>
}
function Connector({ d, manual=false, pulse=false }: { d:string; manual?:boolean; pulse?:boolean }) {
 return <><path className={`diagram-connector ${manual?'is-manual':'is-solid'}`} d={d}/>{pulse&&<circle className="diagram-traveler" r="3"><animateMotion dur="3.6s" repeatCount="indefinite" path={d}/></circle>}</>
}
function Plate({ children, label, number, className='' }: {children:React.ReactNode;label:string;number:string;className?:string}) {
 return <DiagramReveal className={className}><figure className="system-diagram"><svg viewBox="0 0 640 400" role="img" aria-label={label}><defs><pattern id={`grid-${number}`} width="32" height="32" patternUnits="userSpaceOnUse"><path className="diagram-grid" d="M32 0H0V32"/></pattern></defs><rect className="diagram-grid-fill" width="640" height="400" fill={`url(#grid-${number})`}/><path className="diagram-frame" d="M16 40V16h24M600 16h24v24M16 360v24h24M600 384h24v-24"/>{children}</svg><figcaption>FIG. {number} — {label}</figcaption></figure></DiagramReveal>
}
export function SystemDiagram({ kind, label }: { kind:Kind; label:string }) {
 if(kind==='hero')return <Plate number="01" label={label} className="hero-plate"><g className="diagram-assembly"><Node x={74} y={82} label="HOJA DE CÁLCULO"/><Node x={74} y={160} label="CORREO"/><Node x={74} y={238} label="ALBARÁN"/><Node x={74} y={316} label="NOTAS"/><Connector manual d="M104 82C174 82 172 156 238 168"/><Connector manual d="M104 160H238"/><Connector manual d="M104 238C176 238 174 184 238 172"/><Connector manual d="M104 316C190 316 182 206 238 178"/><Node x={270} y={170} label="NÚCLEO" circle active labelY={192}/><Connector pulse d="M281 159L356 94"/><Connector pulse d="M281 181L356 280"/><Connector pulse d="M292 170H484"/><Node x={404} y={82} label="PLATAFORMA"/><Node x={496} y={158} label="FACTURACIÓN"/><Node x={404} y={292} label="INFORMES"/><Node x={526} y={280} label="DATOS"/><Connector d="M434 82H496V146"/><Connector d="M434 292H526V292"/><Connector d="M496 170V248H526V268"/></g></Plate>
 if(kind==='problem')return <Plate number="02" label={label}><Node x={108} y={88} label="HOJA DE CÁLCULO"/><Node x={316} y={76} label="CORREO" alert/><Node x={514} y={118} label="ALBARÁN"/><Node x={172} y={292} label="NOTAS"/><Node x={430} y={294} label="RETRABAJO"/><Connector manual d="M138 88C230 28 250 190 346 76"/><Connector manual d="M346 76C430 52 408 180 484 118"/><Connector manual d="M108 100C90 198 250 200 172 280"/><Connector manual d="M202 292C286 208 340 360 400 294"/><Connector manual d="M514 130C560 232 464 232 430 282"/><Connector manual d="M138 94C254 140 346 228 400 286"/></Plate>
 if(kind==='proof')return <Plate number="04" label={label}><path className="proof-fill" d="M48 330H146V270H252V210H358V144H464V82H600V350H48Z"/><path className="diagram-connector is-solid proof-stair" d="M48 330H146V270H252V210H358V144H464V82H600"/>{[['ESPECIFICACIÓN',92,316],['CONSTRUCCIÓN',198,256],['200+ PRUEBAS',304,196],['PRODUCCIÓN (JUL 2026)',410,130],['FACTURACIÓN REAL',528,68]].map(([t,x,y])=><text className="proof-value" key={t} x={x} y={y}>{t}</text>)}<circle className="diagram-traveler"><animateMotion dur="4.5s" repeatCount="indefinite" path="M48 330H146V270H252V210H358V144H464V82H600"/></circle></Plate>
 return <Plate number="05" label={label}><Connector pulse d="M76 310L180 252L284 206L388 126L526 70"/><Node x={76} y={310} label="DIAGNÓSTICO" circle/><Node x={180} y={252} label="DISEÑO" circle/><Node x={284} y={206} label="ENTREGA" circle/><Node x={388} y={126} label="MEJORA" circle active/><Node x={526} y={70} label="ESCALA" circle/><text className="diagram-annotation" x="376" y="94">SOCIO CONTINUO</text></Plate>
}
