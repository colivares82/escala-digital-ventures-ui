import type { homeContent } from "@/content/es/home"

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer

export function SiteHeader({ content }: { content: HeaderContent }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-20 max-w-screen-2xl items-center justify-between gap-8 px-5 md:px-10 lg:px-14">
        <span className="font-display text-lg font-semibold tracking-[-0.04em]">{content.brand}</span>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Navegación principal">
          {content.nav.map((label) => (
            <span className="font-mono text-[0.6875rem] text-muted-foreground" key={label}>
              {label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-3 font-mono text-[0.6875rem] sm:flex" aria-label="Idiomas">
            {content.locales.map((locale, index) => (
              <span className={index === 0 ? "text-primary" : "text-muted-foreground"} key={locale}>
                {locale}
              </span>
            ))}
          </div>
          <span className="bg-primary px-4 py-2 font-mono text-xs font-medium text-primary-foreground">
            {content.contact}
          </span>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-12 px-5 md:flex-row md:items-end md:px-10 lg:px-14">
        <p className="font-display max-w-2xl text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-balance">
          {content.claim}
        </p>
        <div className="flex flex-col gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground md:text-right">
          <span>41° 32′ N · 02° 26′ E</span>
          <span>{content.company}</span>
        </div>
      </div>
    </footer>
  )
}
