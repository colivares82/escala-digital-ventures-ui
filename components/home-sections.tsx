import { homeContent } from "@/content/es/home"
import { ClaimsMarquee } from "@/components/claims-marquee"
import { ClientChip } from '@/components/client-chip'
import { FinalCTA } from "@/components/final-cta"
import { PhaseCycle } from "@/components/phase-journey"
import { Readout } from "@/components/readout"
import { SectionIndex } from "@/components/section-index"
import { SystemDiagram } from "@/components/system-diagram"
import { Reveal, WordReveal } from "@/components/motion-runtime"

export function Hero({ content, claims }: { content:typeof homeContent.hero; claims:typeof homeContent.claims }) {
 return <><section className="hero dark-surface" id="inicio"><div className="page-shell hero__grid"><SectionIndex index="00" label={homeContent.labels.hero}/><div className="hero__claim"><WordReveal as="h1" text={content.title}/><p>{content.description}</p><div className="hero__actions"><a className="primary-link" href="#contacto">{content.primaryCta}<span aria-hidden="true">↗</span></a><a className="text-link" href="#metodo">{content.secondaryCta}<span aria-hidden="true">↓</span></a></div></div><div className="hero__diagram"><p className="hero__eyebrow">{content.eyebrow}</p><SystemDiagram kind="hero" label={homeContent.diagrams.hero}/></div></div></section><ClaimsMarquee claims={claims}/></>
}
export function ProblemSection({ content }: { content:typeof homeContent.problem }) {
 return <section className="section section--light" id="problema"><div className="page-shell"><SectionIndex index="01" label={homeContent.labels.problem}/><div className="problem-layout"><div><WordReveal text={content.title}/><ul className="problem-symptoms" aria-label={homeContent.labels.symptoms}>{content.symptoms.map((symptom,i)=><Reveal key={symptom} className={`problem-symptom problem-symptom--${i+1}`}><li><i aria-hidden="true"/>{symptom}</li></Reveal>)}</ul></div><div className="problem-layout__narrative"><Reveal><p className="lead-copy">{content.body}</p></Reveal><SystemDiagram kind="problem" label={homeContent.diagrams.problem}/></div></div></div></section>
}
export function ServicesPreview({ content }: { content:typeof homeContent.services }) {
 return <section className="section section--light services" id="que-hacemos"><div className="page-shell"><SectionIndex index="02" label={homeContent.labels.services}/><div className="split-heading"><WordReveal text={content.title}/><a className="text-link text-link--dark" href="/que-hacemos">{content.action}<span aria-hidden="true">↗</span></a></div><ol className="services__list">{content.items.map((item,i)=><li key={item.title}><p>{String(i+1).padStart(2,"0")}</p><h3>{item.title}</h3><p>{item.text}</p><span aria-hidden="true">↗</span></li>)}</ol></div></section>
}
export function FrameworkSection({ content }: { content:typeof homeContent.framework }) {
 return <section className="section section--dark dark-surface framework-cycle" id="metodo"><PhaseCycle phases={content.phases} title={content.title} action={content.action}/></section>
}
export function ProofSection({ content }: { content:typeof homeContent.proof }) {
 return <section className="section section--light proof" id="casos"><div className="page-shell"><SectionIndex index="04" label={homeContent.labels.proof}/><div className="split-heading proof__grid"><div><WordReveal text={content.title}/><p className="proof__attribution">{homeContent.labels.proofAttribution}</p><div className="client-chips">{content.cases.map((client,index)=><ClientChip client={client} delayed={index === 1} key={client.name}/>)}</div></div><SystemDiagram kind="proof" label={homeContent.diagrams.proof}/></div><dl className="readouts">{content.figures.map((f,i)=><Readout key={f.label} {...f} index={i}/>)}</dl></div></section>
}
export function AllianceTeaser({ content }: { content:typeof homeContent.alliance }) {
 return <section className="section section--dark alliance dark-surface" id="alianza"><div className="page-shell"><SectionIndex index="05" label={homeContent.labels.alliance}/><div className="split-heading"><WordReveal text={content.title}/><div><p className="lead-copy">{content.body}</p><a className="primary-link" href="/modelo-de-alianza">{content.action}<span aria-hidden="true">↗</span></a></div></div><div className="alliance-figure"><SystemDiagram kind="outcome" label={homeContent.diagrams.alliance}/><p className="alliance-legend">{homeContent.labels.allianceLegend}</p></div></div></section>
}
export { FinalCTA }
