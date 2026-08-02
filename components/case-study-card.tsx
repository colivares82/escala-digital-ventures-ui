export function CaseStudyCard({ item, index }: { item:{readonly name:string;readonly title:string;readonly text:string;readonly href:string}; index:number }) {
 const hasMetrics = item.name === 'MAGUPELL'
 return <article className="case-card">
  <p className="case-card__eyebrow">CASO / {String(index+1).padStart(2,"0")}</p>
  <div className="case-card__body">
   <h3>{item.name}</h3>
   <h4>{item.title}</h4>
   <p className={hasMetrics ? 'case-card__metrics' : 'case-card__subtitle'}>{item.text}</p>
  </div>
  <a href={item.href}>Ver caso <span aria-hidden="true">↗</span></a>
 </article>
}
