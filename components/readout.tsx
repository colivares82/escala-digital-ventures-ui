import { CountUp } from '@/components/motion-runtime'

const plots = [
  'M4 38L20 28L34 31L50 18L66 22L82 8L96 12',
  'M4 34H22V26H40V30H58V16H76V20H96V8',
  'M4 36C18 36 18 24 32 24S46 12 60 12S74 22 96 6',
  'M4 34L22 30L40 30L58 19L76 19L96 8',
]

export function Readout({ value, label, caption, index }: { value:string; label:string; caption:string; index:number }) {
  return <div className="readout">
    <p>DAT.{String(index+1).padStart(2,'0')} / {label}</p>
    <svg className="readout__plot" viewBox="0 0 100 44" role="img" aria-label={`Trazado de ${label.toLowerCase()}`}>
      <path className="readout__baseline" d="M4 40H96" />
      <path className="readout__trace" d={plots[index]} />
      <circle className="readout__point" cx="96" cy={index === 0 ? 12 : index === 1 ? 8 : 6} r="2" />
    </svg>
    <dd>{/^[-+]?\d/.test(value)?<CountUp value={value}/>:value}</dd>
    <dt>{caption}</dt>
  </div>
}
