import { WordReveal } from "@/components/motion-runtime"
import { SectionIndex } from "@/components/section-index"
export function FinalCTA({ content }: { content:{readonly title:string;readonly body:string;readonly action:string} }) {
 return <section className="final-cta dark-surface" id="contacto"><div className="page-shell final-cta__inner"><SectionIndex index="07" label="CONVERSACIÓN"/><WordReveal as="h2" text={content.title} className="final-cta__title"/><div className="final-cta__foot"><p>{content.body}</p><a className="primary-link" href="mailto:hola@escaladigitalventures.com">{content.action}<span aria-hidden="true">↗</span></a></div></div></section>
}
