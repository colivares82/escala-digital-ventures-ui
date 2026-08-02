export function ClaimsMarquee({ claims }: { claims: readonly string[] }) {
  const items=[...claims,...claims]
  return <div className="claims-marquee" aria-label="Mensajes clave"><div className="claims-marquee__track">{items.map((claim,i)=><span aria-hidden={i>=claims.length} key={`${claim}-${i}`}>{claim}<i aria-hidden="true"/></span>)}</div></div>
}
