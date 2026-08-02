import { AllianceTeaser, FinalCTA, FrameworkSection, Hero, ProblemSection, ProofSection, ServicesPreview } from "@/components/home-sections"
import { MotionRuntime } from "@/components/motion-runtime"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { homeContent } from "@/content/es/home"

export default function HomePage() {
 return <MotionRuntime><a className="skip-link" href="#contenido">Saltar al contenido</a><SiteHeader content={homeContent.header}/><main id="contenido"><Hero content={homeContent.hero} claims={homeContent.claims}/><ProblemSection content={homeContent.problem}/><ServicesPreview content={homeContent.services}/><FrameworkSection content={homeContent.framework}/><ProofSection content={homeContent.proof}/><AllianceTeaser content={homeContent.alliance}/><FinalCTA content={homeContent.finalCta}/></main><SiteFooter content={homeContent.footer}/></MotionRuntime>
}
