import type { homeContent } from "@/content/es/home"
import { FrameworkRule, ScaleRule } from "@/components/scale-rule"

function SectionLabel({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <div className={`section-label ${inverse ? "section-label--inverse" : ""}`}>
      <span>{children}</span>
      <span aria-hidden="true">{index} / 04</span>
    </div>
  )
}

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return (
    <section className="deep-sea hero-surface">
      <div className="section-shell flex min-h-[calc(100svh-5rem)] flex-col justify-between gap-16 py-12 md:py-16">
        <div className="flex flex-col gap-8">
          <SectionLabel index="00" inverse>ESCALA DIGITAL VENTURES</SectionLabel>
          <p className="max-w-3xl font-mono text-xs font-medium uppercase leading-relaxed tracking-widest text-paper-muted">
            {content.eyebrow}
          </p>
        </div>
        <h1 className="font-display max-w-[12ch] text-[clamp(3.25rem,8.5vw,9rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-balance">
          {content.title}
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-pretty md:col-span-6 md:text-xl lg:col-span-5">
            {content.description}
          </p>
          <div className="flex flex-wrap items-center gap-6 md:col-span-5 md:col-start-8 md:justify-end">
            <a className="cta-calibre" href="#">{content.primaryCta}</a>
            <a className="deep-link" href="#framework">{content.secondaryCta}</a>
          </div>
        </div>
        <ScaleRule variant="inverse" />
      </div>
    </section>
  )
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return (
    <section className="paper-surface">
      <div className="section-shell flex flex-col gap-16 py-28 md:gap-24 md:py-44">
        <SectionLabel index="01">{content.eyebrow.replace("01 · ", "")}</SectionLabel>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <h2 className="font-display text-[clamp(3rem,6.7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-balance md:col-span-9">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed text-pretty md:col-span-6 md:col-start-7 md:text-lg lg:col-span-5 lg:col-start-8">
            {content.body}
          </p>
        </div>
        <ScaleRule />
      </div>
    </section>
  )
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return (
    <section id="framework" className="paper-surface scroll-mt-24">
      <div className="section-shell flex flex-col gap-16 py-28 md:gap-24 md:py-44">
        <SectionLabel index="02">{content.eyebrow.replace("02 · ", "")}</SectionLabel>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(3rem,6.3vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-balance md:col-span-9">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed md:col-span-5 md:col-start-8 md:text-lg">
            {content.description}
          </p>
        </div>
        <FrameworkRule phases={content.phases} />
      </div>
    </section>
  )
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return (
    <section className="deep-sea proof-surface">
      <div className="section-shell flex flex-col gap-16 py-28 md:gap-24 md:py-44">
        <SectionLabel index="03" inverse>{content.eyebrow.replace("03 · ", "")}</SectionLabel>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <h2 className="font-display text-[clamp(3rem,6.7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-balance md:col-span-9">
            {content.title}
          </h2>
          <p className="font-mono text-xs font-semibold text-calibre md:col-span-3 md:text-right">{content.client}</p>
        </div>
        <ScaleRule variant="inverse" />
        <dl className="readout-grid">
          {content.figures.map((figure, index) => (
            <div className="readout" key={figure.label}>
              <dt className="flex items-start justify-between gap-4 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-wider text-paper-muted">
                <span className="max-w-44">{figure.label}</span>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </dt>
              <dd className="font-display text-[clamp(3.25rem,5.5vw,6.5rem)] font-semibold leading-none tracking-[-0.05em] text-calibre">{figure.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
