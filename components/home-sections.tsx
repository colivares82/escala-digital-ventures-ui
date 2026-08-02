import { homeContent } from "@/content/es/home"
import { CountUp, Reveal } from "@/components/motion-runtime"
import { PhaseIllustration, ProblemIllustration } from "@/components/system-diagrams"

const claims = ["Automatizamos tu negocio. Escalamos contigo.", "Software a medida, criterio de producto y compromiso de socio.", "Convertimos procesos manuales en plataformas que crecen contigo.", "Cinco alianzas. Toda nuestra dedicación.", "No construimos aplicaciones. Construimos capacidades."]
function Index({ children }: { children: string }) { return <p className="section-index" aria-hidden="true">{children}</p> }

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return <section className="hero-v2 dark-surface" id="inicio"><div className="hero-v2__inner"><p className="eyebrow hero-v2__eyebrow">{content.eyebrow}</p><h1 className="hero-title" aria-label={content.title}><span className="hero-line"><span>Automatizamos</span></span><span className="hero-line"><span>tu negocio.</span></span><span className="hero-line hero-line--offset"><span>Escalamos contigo.</span></span></h1><div className="hero-v2__bottom"><p>{content.description}</p><div className="action-row"><a className="button button--amber" href="#contacto">{content.primaryCta}</a><a className="text-link" href="#metodo">{content.secondaryCta}</a></div></div></div><div className="marquee" aria-hidden="true"><div className="marquee__track">{[...claims,...claims].map((claim,i)=><span key={`${claim}-${i}`}>{claim}<b>+</b></span>)}</div></div></section>
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return <section className="indexed-section problem-v2" id="que-hacemos"><div className="section-wrap"><Index>01 / 03</Index><Reveal className="problem-v2__grid"><div><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2></div><div className="problem-v2__copy"><p>{content.body}</p><ProblemIllustration /></div></Reveal></div></section>
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return <section className="framework-v2 dark-surface" id="metodo"><div className="section-wrap framework-v2__intro"><Index>02 / 03</Index><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p>{content.description}</p></div><ol className="phase-stack">{content.phases.map((phase,index)=><li className="phase-panel" key={phase}><div className="phase-panel__inner"><p className="phase-panel__number">{String(index+1).padStart(2,"0")} / 10</p><h3>{phase}</h3><PhaseIllustration index={index}/></div></li>)}</ol></section>
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return <section className="indexed-section proof-v2" id="casos"><div className="section-wrap"><Index>03 / 03</Index><Reveal><div className="proof-v2__header"><div><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2></div><p className="proof-v2__client">{content.client}</p></div></Reveal><dl className="readout-list">{content.figures.map((figure,index)=><div className="readout-v2" key={figure.label}><dt>{figure.label}</dt><dd className={index > 1 ? "readout-v2__text" : ""}>{index < 2 ? <CountUp value={figure.value}/> : figure.value}</dd></div>)}</dl></div></section>
}

export function FinalCta({ content }: { content: typeof homeContent.finalCta }) {
  return <section className="closing-v2 dark-surface" id="contacto"><div className="closing-v2__inner"><p className="eyebrow">CONTACTO / BARCELONA</p><a className="closing-v2__title" href="mailto:hola@escaladigitalventures.com">{content.title}</a><div className="closing-v2__bottom"><p>{content.body}</p><a className="button button--amber" href="mailto:hola@escaladigitalventures.com">{content.action}</a></div></div></section>
}
