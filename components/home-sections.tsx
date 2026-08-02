import { homeContent } from "@/content/es/home"
import { ClaimsMarquee } from "@/components/claims-marquee"
import { FinalCTA } from "@/components/final-cta"
import { PhaseCycle } from "@/components/phase-journey"
import { Readout } from "@/components/readout"
import { SectionIndex } from "@/components/section-index"
import { SystemDiagram } from "@/components/system-diagram"
import { Reveal, WordReveal } from "@/components/motion-runtime"

export function Hero({ content, claims }: { content:typeof homeContent.hero; claims:typeof homeContent.claims }) {
 return <><section className="hero dark-surface" id="inicio"><div className="page-shell hero__grid"><SectionIndex index="00" label="ESCALA DIGITAL VENTURES"/><div className="hero__claim"><WordReveal as="h1" text={content.title}/><p>{content.description}</p><div className="hero__actions"><a className="primary-link" href="#contacto">{content.primaryCta}<span aria-hidden="true">↗</span></a><a className="text-link" href="#metodo">{content.secondaryCta}<span aria-hidden="true">↓</span></a></div></div><div className="hero__diagram"><p className="hero__eyebrow">{content.eyebrow}</p><SystemDiagram kind="hero" label="Sistema manual que se transforma en una plataforma ordenada"/></div></div></section><ClaimsMarquee claims={claims}/></>
}
export function ProblemSection({ content }: { content:typeof homeContent.problem }) {
 return <section className="section section--light" id="problema"><div className="page-shell"><SectionIndex index="01" label="PUNTO DE PARTIDA"/><div className="problem-layout"><div><WordReveal text={content.title}/><ul className="problem-symptoms" aria-label="Síntomas operativos">{content.symptoms.map((symptom,i)=><Reveal key={symptom} className={`problem-symptom problem-symptom--${i+1}`}><li><i aria-hidden="true"/>{symptom}</li></Reveal>)}</ul></div><div className="problem-layout__narrative"><Reveal><p className="lead-copy">{content.body}</p></Reveal><SystemDiagram kind="problem" label="Flujo operativo fragmentado entre hojas, correos y documentos"/></div></div></div></section>
}
export function ServicesPreview({ content }: { content:typeof homeContent.services }) {
 return <section className="section section--light services" id="que-hacemos"><div className="page-shell"><SectionIndex index="02" label="CAPACIDADES"/><div className="split-heading"><WordReveal text={content.title}/><a className="text-link text-link--dark" href="/que-hacemos">{content.action}<span aria-hidden="true">↗</span></a></div><ol className="services__list">{content.items.map((item,i)=><li key={item.title}><p>{String(i+1).padStart(2,"0")}</p><h3>{item.title}</h3><p>{item.text}</p><span aria-hidden="true">↗</span></li>)}</ol></div></section>
}
export function FrameworkSection({ content }: { content:typeof homeContent.framework }) {
 return <section className="section section--dark dark-surface framework-cycle" id="metodo"><div className="page-shell framework-cycle__intro"><SectionIndex index="03" label="EL CICLO DE CRECIMIENTO"/><div className="split-heading"><div><WordReveal text={content.title}/><p className="lead-copy">{content.description}</p></div><a className="text-link" href="/como-trabajamos">{content.action}<span aria-hidden="true">↗</span></a></div></div><PhaseCycle phases={content.phases}/></section>
}
export function ProofSection({ content }: { content:typeof homeContent.proof }) {
 return <section className="section section--light proof" id="casos"><div className="page-shell"><SectionIndex index="04" label="EVIDENCIA"/><div className="split-heading proof__grid"><div><WordReveal text={content.title}/><p className="proof__attribution">EVIDENCIA VERIFICADA EN CLIENTES REALES</p><div className="client-chips"><Reveal className="client-chip"><div><strong>MAGUPELL</strong><span>EN PRODUCCIÓN · SECTOR PIEL</span></div><a href="/casos-de-exito/magupell">VER CASO <span aria-hidden="true">↗</span></a></Reveal><Reveal className="client-chip client-chip--delayed"><div><strong>BioZero</strong><span>V1 ENTREGADA · CLÍNICA DENTAL + IA</span></div><a href="/casos-de-exito/biozero">VER CASO <span aria-hidden="true">↗</span></a></Reveal></div></div><SystemDiagram kind="proof" label="Evolución verificada de la operación"/></div><dl className="readouts">{content.figures.map((f,i)=><Readout key={f.label} {...f} index={i}/>)}</dl></div></section>
}
export function AllianceTeaser({ content }: { content:typeof homeContent.alliance }) {
 return <section className="section section--dark alliance dark-surface" id="alianza"><div className="page-shell"><SectionIndex index="05" label="MODELO DE ALIANZA"/><div className="split-heading"><WordReveal text={content.title}/><div><p className="lead-copy">{content.body}</p><a className="primary-link" href="/modelo-de-alianza">{content.action}<span aria-hidden="true">↗</span></a></div></div><div className="alliance-figure"><SystemDiagram kind="outcome" label="Cinco alianzas, dedicación completa. Dos ocupadas."/><p className="alliance-legend">CADA ALIANZA: PLANO TÉCNICO · ESTRATÉGICO · VISIONARIO</p></div></div></section>
}
export { FinalCTA }
