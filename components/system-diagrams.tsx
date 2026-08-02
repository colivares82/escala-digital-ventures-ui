const paths = [
  "M14 54H58L78 24H122L144 54H202", "M14 24H56V82H106V24H202", "M14 78L52 36L92 78L132 36L202 78",
  "M14 52C48 10 76 94 108 52S166 10 202 52", "M14 24H72V82H146V24H202", "M14 52H68L94 18L126 88L158 52H202",
  "M14 82V24H64V82H116V24H168V82H202", "M14 24L60 82L108 24L154 82L202 24", "M14 52H44C72 52 72 20 100 20S126 88 154 88S180 52 202 52",
  "M14 80L50 30L86 66L122 22L158 58L202 26",
]

function Plate({ children, caption }: { children: React.ReactNode; caption: string }) {
  return <figure className="technical-figure"><div className="technical-figure__frame" aria-hidden="true">{children}</div><figcaption>{caption}</figcaption></figure>
}

export function HeroIllustration() {
  return <Plate caption="Fig. 00 — Sistema propio"><svg viewBox="0 0 216 108"><path d="M14 76H62V30H108V76H154V30H202"/><circle cx="62" cy="30" r="4"/><circle cx="108" cy="76" r="4"/><circle cx="154" cy="30" r="4"/><path className="diagram-accent" d="M14 92H94"/></svg></Plate>
}

export function PhaseIllustration({ index, label }: { index: number; label: string }) {
  return <Plate caption={`Fig. ${String(index + 2).padStart(2, "0")} — ${label}`}><svg viewBox="0 0 216 108"><path d={paths[index % paths.length]}/>{[14,61,108,155,202].map((x,i)=><circle key={x} cx={x} cy={i%2?28:76} r="2.5"/>)}<path className="diagram-accent" d={`M${22 + index * 5} 96H${68 + index * 5}`}/></svg></Plate>
}

export function ProblemIllustration() {
  return <Plate caption="Fig. 01 — Proceso manual"><svg viewBox="0 0 216 108"><path d="M14 24C58 24 46 86 100 86S144 18 202 18"/><path d="M14 54C54 54 60 28 104 28S150 90 202 90"/><path d="M14 86C64 86 68 54 120 54S164 62 202 62"/><path className="diagram-accent" d="M98 86L120 54L144 76"/>{[[14,24],[14,54],[14,86],[202,18],[202,62],[202,90]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3"/>)}</svg></Plate>
}

export function ProofIllustration() {
  return <Plate caption="Fig. 12 — Evidencia operativa"><svg viewBox="0 0 216 108"><path d="M14 84H48V66H82V52H116V38H150V24H202"/><path className="diagram-accent" d="M14 94H202"/><circle cx="202" cy="24" r="4"/></svg></Plate>
}
