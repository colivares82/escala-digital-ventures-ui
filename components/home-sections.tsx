import { homeContent } from "@/content/es/home"
import { CountUp, Reveal, WordReveal } from "@/components/motion-runtime"
import { HeroIllustration, PhaseIllustration, ProblemIllustration, ProofIllustration } from "@/components/system-diagrams"

function ArrowLink({ href, children, tone = "dark" }: { href: string; children: React.ReactNode; tone?: "dark" | "light" }) {
  return <a className={`arrow-link arrow-link--${tone}`} href={href}><span>{children}</span><span aria-hidden="true">↗</span></a>
}

function ChapterBand({ index, claim, dark = false }: { index: string; claim: string; dark?: boolean }) {
  return <div className={`chapter-band ${dark ? "chapter-band--dark" : ""}`}><p>{index} / 03</p><WordReveal text={claim} as="p" /></div>
}

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return <section className="craft-hero dark-surface" id="inicio"><div className="craft-shell craft-hero__grid"><p className="eyebrow craft-hero__eyebrow">{content.eyebrow}</p><WordReveal text={content.title} as="h1" className="craft-hero__title"/><div className="craft-hero__copy"><p>{content.description}</p><div className="craft-actions"><ArrowLink href="#contacto" tone="light">{content.primaryCta}</ArrowLink><ArrowLink href="#metodo" tone="light">{content.secondaryCta}</ArrowLink></div></div><HeroIllustration/></div></section>
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return <section className="craft-chapter craft-chapter--light" id="que-hacemos"><ChapterBand index="01" claim="Tu negocio funciona. Tus sistemas, no."/><div className="craft-shell chapter-body"><div className="chapter-heading"><p className="eyebrow">{content.eyebrow}</p><WordReveal text={content.title}/></div><Reveal className="problem-plate framed"><p className="plate-coordinate">X 41.5375 / Y 2.4449</p><p className="chapter-copy">{content.body}</p><ProblemIllustration/></Reveal></div></section>
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return <section className="craft-chapter craft-chapter--dark dark-surface" id="metodo"><ChapterBand index="02" claim="No construimos aplicaciones. Construimos capacidades." dark/><div className="craft-shell chapter-body"><div className="chapter-heading"><p className="eyebrow">{content.eyebrow}</p><WordReveal text={content.title}/><p className="chapter-intro">{content.description}</p></div><ol className="phase-grid">{content.phases.map((phase,index)=><li className="phase-plate framed" key={phase}><p className="phase-coordinate">P.{String(index+1).padStart(2,"0")} / 10</p><h3>{phase}</h3><PhaseIllustration index={index} label={phase}/><span className="corner corner--tl" aria-hidden="true"/><span className="corner corner--br" aria-hidden="true"/></li>)}</ol></div></section>
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return <section className="craft-chapter craft-chapter--light" id="casos"><ChapterBand index="03" claim="Hechos, no promesas."/><div className="craft-shell chapter-body"><div className="chapter-heading proof-heading"><div><p className="eyebrow">{content.eyebrow}</p><WordReveal text={content.title}/></div><ProofIllustration/></div><dl className="proof-grid">{content.figures.map((figure,index)=><div className="proof-plate framed" key={figure.label}><p className="proof-client">{content.client} / DATO {String(index+1).padStart(2,"0")}</p><dt>{figure.label}</dt><dd>{index < 2 ? <CountUp value={figure.value}/> : figure.value}</dd><span className="corner corner--tl" aria-hidden="true"/><span className="corner corner--br" aria-hidden="true"/></div>)}</dl></div></section>
}

export function FinalCta({ content }: { content: typeof homeContent.finalCta }) {
  return <section className="craft-closing dark-surface" id="contacto"><div className="craft-shell craft-closing__inner"><p className="eyebrow">CONTACTO / MATARÓ, BARCELONA</p><WordReveal text={content.title} as="h2" className="craft-closing__title"/><div className="craft-closing__foot"><p>{content.body}</p><ArrowLink href="mailto:hola@escaladigitalventures.com" tone="light">{content.action}</ArrowLink></div></div></section>
}
