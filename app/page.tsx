import {
  FrameworkSection,
  Hero,
  ProblemSection,
  ProofSection,
} from "@/components/home-sections"
import { SiteFooter, SiteHeader } from "@/components/site-chrome"
import { homeContent } from "@/content/es/home"

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <SiteHeader content={homeContent.header} />
      <main id="main-content">
        <Hero content={homeContent.hero} />
        <ProblemSection content={homeContent.problem} />
        <FrameworkSection content={homeContent.framework} />
        <ProofSection content={homeContent.proof} />
      </main>
      <SiteFooter content={homeContent.footer} />
    </>
  )
}
