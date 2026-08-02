import { homeContent } from "@/content/es/home"
import { ClaimsMarquee } from "@/components/claims-marquee"
import { CaseStudyCard } from "@/components/case-study-card"
import { FinalCTA } from "@/components/final-cta"
import { PhaseJourney } from "@/components/phase-journey"
import { Readout } from "@/components/readout"
import { SectionIndex } from "@/components/section-index"
import { SystemDiagram } from "@/components/system-diagram"
import { Reveal, WordReveal } from "@/components/motion-runtime"

export function Hero({ content, claims }: { content:typeof homeContent.hero; claims:typeof homeContent.claims }) {
 return <><section className="hero dark-surface" id="inicio"><div className="page-shell hero__grid"><SectionIndex index="00" label="ESCALA DIGITAL VENTURES"/><div className="hero__claim"><WordReveal as="h1" text={content.title}/><p>{content.description}</p><div className="hero__actions"><a className="primary-link" href="#contacto">{content.primaryCta}<span aria-hidden="true">↗</span></a><a className="text-link" href="#metodo">{content.secondaryCta}<span aria-hidden="true">↓</span></a></div></div><div className="hero__diagram"><p className="hero__eyebrow">{content.eyebrow}</p><SystemDiagram kind="hero" label="Sistema manual que se transforma en una plataforma ordenada"/></div></div></section><ClaimsMarquee claims={claims}/></>
}
export function ProblemSection({ content }: { content:typeof homeContent.problem }) {
 return <section className="section section--light" id="problema"><div className="page-shell"><SectionIndex index="01" label="PUNTO DE PARTIDA"/><div className="split-heading problem-heading"><div><WordReveal text={content.title}/><ul className="problem-symptoms" aria-label="Síntomas operativos">{content.symptoms.map((symptom,i)=><Reveal key={symptom} className={`problem-symptom problem-symptom--${i+1}`}><li><i aria-hidden="true"/>{symptom}</li></Reveal>)}</ul></div><Reveal><p className="lead-copy">{content.body}</p></Reveal></div><SystemDiagram kind="problem" label="Flujo operativo fragmentado entre hojas, correos y documentos"/></div></section>
}
export function ServicesPreview({ content }: { content:typeof homeContent.services }) {
 return <section className="section section--light services" id="que-hacemos"><div className="page-shell"><SectionIndex index="02" label="CAPACIDADES"/><div className="split-heading"><WordReveal text={content.title}/><a className="text-link text-link--dark" href="/que-hacemos">{content.action}<span aria-hidden="true">↗</span></a></div><ol className="services__list">{content.items.map((item,i)=><li key={item.title}><p>{String(i+1).padStart(2,"0")}</p><h3>{item.title}</h3><p>{item.text}</p><span aria-hidden="true">↗</span></li>)}</ol></div></section>
}
export function FrameworkSection({ content }: { content:typeof homeContent.framework }) {
 return <section className="section section--dark dark-surface" id="metodo"><div className="page-shell"><SectionIndex index="03" label="EL VIAJE DE LAS FASES"/><div className="split-heading"><div><WordReveal text={content.title}/><p className="lead-copy">{content.description}</p></div><a className="text-link" href="/como-trabajamos">{content.action}<span aria-hidden="true">↗</span></a></div><PhaseJourney phases={content.phases}/></div></section>
}
export function ProofSection({ content }: { content:typeof homeContent.proof }) {
 return <section className="section section--light proof" id="casos"><div className="page-shell"><SectionIndex index="04" label="EVIDENCIA"/><div className="split-heading"><WordReveal text={content.title}/><SystemDiagram kind="proof" label="Evolución verificada de la operación"/></div><dl className="readouts">{content.figures.map((f,i)=><Readout key={f.label} {...f} index={i}/>)}</dl><div className="case-grid">{content.cases.map((item,i)=><CaseStudyCard key={item.name} item={item} index={i}/>)}</div></div></section>
}
export function AllianceTeaser({ content }: { content:typeof homeContent.alliance }) {
 return <section className="section section--dark alliance dark-surface" id="alianza"><div className="page-shell"><SectionIndex index="05" label="MODELO DE ALIANZA"/><div className="split-heading"><WordReveal text={content.title}/><div><p className="lead-copy">{content.body}</p><a className="primary-link" href="/modelo-de-alianza">{content.action}<span aria-hidden="true">↗</span></a></div></div><SystemDiagram kind="outcome" label="Crecimiento continuo a través de una alianza tecnológica"/></div></section>
}
export { FinalCTA }
