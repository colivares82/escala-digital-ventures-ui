export function CaseStudyCard({ item, index }: { item:{readonly name:string;readonly title:string;readonly text:string;readonly href:string}; index:number }) {
 return <article className="case-card"><p>CASO / {String(index+1).padStart(2,"0")}</p><h3>{item.name}</h3><h4>{item.title}</h4><p>{item.text}</p><a href={item.href}>Ver caso <span aria-hidden="true">↗</span></a></article>
}
