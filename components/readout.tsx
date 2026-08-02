import { CountUp } from "@/components/motion-runtime"
export function Readout({ value, label, index }: { value:string; label:string; index:number }) {
  return <div className="readout"><p>DAT.{String(index+1).padStart(2,"0")}</p><dt>{label}</dt><dd>{/^[-+]?\d/.test(value)?<CountUp value={value}/>:value}</dd></div>
}
