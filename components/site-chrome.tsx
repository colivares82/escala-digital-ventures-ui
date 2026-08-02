import type { homeContent } from "@/content/es/home"

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer

export function SiteHeader({ content }: { content: HeaderContent }) {
  return (
    <header className="deep-sea border-b border-paper-line">
      <div className="section-shell flex min-h-20 items-center justify-between gap-8">
        <span className="font-display text-xl font-semibold tracking-[-0.04em]">{content.brand}</span>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Navegación principal">
          {content.nav.map((label) => <span className="font-mono text-[0.6875rem] text-paper-muted" key={label}>{label}</span>)}
        </nav>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-3 font-mono text-[0.6875rem] sm:flex" aria-label="Idiomas">
            {content.locales.map((locale, index) => <span className={index === 0 ? "text-calibre" : "text-paper-muted"} key={locale}>{locale}</span>)}
          </div>
          <span className="cta-calibre">{content.contact}</span>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="paper-surface border-t border-border py-14">
      <div className="section-shell flex flex-col justify-between gap-12 md:flex-row md:items-end">
        <p className="font-display max-w-2xl text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-balance">{content.claim}</p>
        <p className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground md:max-w-xs md:text-right">{content.company}</p>
      </div>
    </footer>
  )
}
