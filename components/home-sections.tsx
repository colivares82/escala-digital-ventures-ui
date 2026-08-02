import type { homeContent } from "@/content/es/home"
import { FrameworkRule, ScaleRule } from "@/components/scale-rule"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.6875rem] font-medium uppercase leading-relaxed tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl grid-cols-1 content-center gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
      <div className="flex flex-col gap-8 md:col-span-10 lg:col-span-9">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h1 className="font-display max-w-5xl text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
          {content.title}
        </h1>
        <ScaleRule variant="hero" />
      </div>
      <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
        <p className="text-lg leading-relaxed text-pretty md:text-xl">{content.description}</p>
        <div className="flex flex-wrap items-center gap-5">
          <a className="bg-primary px-5 py-3 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90" href="#">
            {content.primaryCta}
          </a>
          <a className="link-underline font-mono text-xs font-medium text-primary" href="#">
            {content.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-36">
      <div className="flex flex-col gap-6 md:col-span-7">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
          {content.title}
        </h2>
      </div>
      <p className="text-base leading-relaxed text-pretty md:col-span-6 md:col-start-7 md:text-lg">{content.body}</p>
      <ScaleRule className="md:col-span-12" />
    </section>
  )
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-24 md:px-8 md:py-36">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
            {content.title}
          </h2>
        </div>
        <p className="text-base leading-relaxed md:col-span-5 md:col-start-8 md:self-end md:text-lg">{content.description}</p>
      </div>
      <FrameworkRule phases={content.phases} />
    </section>
  )
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-24 md:px-8 md:py-36">
      <ScaleRule />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
            {content.title}
          </h2>
        </div>
        <p className="font-mono text-xs font-medium text-primary md:col-span-3 md:col-start-10 md:self-end">{content.client}</p>
      </div>
      <dl className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {content.figures.map((figure) => (
          <div className="readout flex min-h-48 flex-col justify-between gap-8 border-b border-border py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0" key={figure.label}>
            <dt className="max-w-44 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-wider text-muted-foreground">{figure.label}</dt>
            <dd className="font-mono text-[clamp(2.5rem,4vw,4rem)] font-medium leading-none tracking-[-0.04em] text-primary">{figure.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
