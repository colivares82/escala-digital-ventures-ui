type Kind = "hero" | "problem" | "proof" | "outcome"
const paths: Record<Kind, string[]> = {
  hero: ["M18 34H72L100 78H154L188 40H242", "M18 112H64V70H116V112H170V70H242", "M72 34V70M154 78V112M188 40V70"],
  problem: ["M18 34C74 34 54 120 118 120S174 28 242 28", "M18 76C70 76 76 42 128 42S184 124 242 124", "M18 122C76 122 86 76 148 76S196 86 242 86"],
  proof: ["M18 126H62V104H106V78H150V52H194V26H242", "M18 136H242"],
  outcome: ["M18 112L64 76L108 94L154 44L198 62L242 22", "M18 132H242"]
}
export function SystemDiagram({ kind, label }: { kind: Kind; label: string }) {
  return <figure className={`system-diagram system-diagram--${kind}`}><svg viewBox="0 0 260 152" role="img" aria-label={label}>{paths[kind].map((d,i)=><path key={d} d={d} style={{"--path-index":i} as React.CSSProperties}/>)}{[18,64,108,154,198,242].map((x,i)=><circle key={x} cx={x} cy={i%2?76:112} r="3"/>)}<circle className="system-diagram__pulse" cx="18" cy="112" r="5"/></svg><figcaption>{label}</figcaption></figure>
}
