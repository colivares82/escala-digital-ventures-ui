import type { homeContent } from "@/content/es/home"
import { FrameworkRule, ScaleRule } from "@/components/scale-rule"

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border pb-3 font-mono text-[0.6875rem] font-medium uppercase leading-relaxed tracking-widest text-muted-foreground">
      <span>{children}</span>
      <span aria-hidden="true">§ {index}</span>
    </div>
  )
}

export function Hero({ content }: { content: typeof homeContent.hero }) {
  return (
    <section className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-screen-2xl flex-col justify-between gap-20 px-5 py-10 md:px-10 md:py-14 lg:px-14">
      <p className="max-w-2xl font-mono text-[0.6875rem] font-medium uppercase leading-relaxed tracking-widest text-muted-foreground">
        {content.eyebrow}
      </p>
      <h1 className="font-display max-w-[15ch] text-[clamp(3.5rem,10.8vw,11.5rem)] font-semibold leading-[0.82] tracking-[-0.065em] text-balance">
        {content.title}
      </h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <p className="max-w-2xl text-lg leading-relaxed text-pretty md:col-span-6 md:text-xl lg:col-span-5">
          {content.description}
        </p>
        <div className="flex flex-wrap items-center gap-6 md:col-span-5 md:col-start-8 md:justify-end">
          <a className="bg-primary px-5 py-3 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-foreground" href="#">
            {content.primaryCta}
          </a>
          <a className="editorial-link font-mono text-xs font-medium text-primary" href="#framework">
            {content.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}

export function ProblemSection({ content }: { content: typeof homeContent.problem }) {
  return (
    <section className="mx-auto flex max-w-screen-2xl flex-col gap-20 px-5 py-32 md:px-10 md:py-52 lg:px-14">
      <SectionLabel index="01">{content.eyebrow.replace("01 · ", "")}</SectionLabel>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <h2 className="font-display text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-balance md:col-span-9">
          {content.title}
        </h2>
        <p className="text-base leading-relaxed text-pretty md:col-span-6 md:col-start-7 md:text-lg lg:col-span-5 lg:col-start-8">
          {content.body}
        </p>
      </div>
      <ScaleRule />
    </section>
  )
}

export function FrameworkSection({ content }: { content: typeof homeContent.framework }) {
  return (
    <section id="framework" className="mx-auto flex max-w-screen-2xl scroll-mt-24 flex-col gap-20 px-5 py-32 md:px-10 md:py-52 lg:px-14">
      <SectionLabel index="02">{content.eyebrow.replace("02 · ", "")}</SectionLabel>
      <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-[clamp(3rem,6.5vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-balance md:col-span-9">
          {content.title}
        </h2>
        <p className="text-base leading-relaxed md:col-span-5 md:col-start-8 md:text-lg">
          {content.description}
        </p>
      </div>
      <FrameworkRule phases={content.phases} />
    </section>
  )
}

export function ProofSection({ content }: { content: typeof homeContent.proof }) {
  return (
    <section className="mx-auto flex max-w-screen-2xl flex-col gap-20 px-5 py-32 md:px-10 md:py-52 lg:px-14">
      <SectionLabel index="03">{content.eyebrow.replace("03 · ", "")}</SectionLabel>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-balance md:col-span-9">
          {content.title}
        </h2>
        <p className="font-mono text-xs font-medium text-primary md:col-span-3 md:text-right">
          {content.client}
        </p>
      </div>
      <dl className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {content.figures.map((figure, index) => (
          <div className="flex min-h-64 flex-col justify-between gap-12 border-b border-border py-7 sm:pr-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0" key={figure.label}>
            <dt className="flex items-start justify-between gap-4 font-mono text-[0.6875rem] uppercase leading-relaxed tracking-wider text-muted-foreground">
              <span className="max-w-44">{figure.label}</span>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </dt>
            <dd className="font-display text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-none tracking-[-0.06em] text-primary">
              {figure.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
