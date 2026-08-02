import type { homeContent } from "@/content/es/home"

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer

export function SiteHeader({ content }: { content: HeaderContent }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-8 px-5 md:px-8">
        <span className="font-display text-lg font-semibold tracking-tight">{content.brand}</span>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {content.nav.map((label) => (
            <span className="font-mono text-xs text-muted-foreground" key={label}>
              {label}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 font-mono text-[0.6875rem] sm:flex" aria-label="Idiomas">
            {content.locales.map((locale, index) => (
              <span className={index === 0 ? "text-primary" : "text-muted-foreground"} key={locale}>
                {locale}
              </span>
            ))}
          </div>
          <span className="border border-foreground px-4 py-2 font-mono text-xs font-medium">
            {content.contact}
          </span>
        </div>
      </div>
    </header>
  )
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 md:flex-row md:items-end md:px-8">
        <p className="font-display max-w-md text-xl font-medium text-balance">{content.claim}</p>
        <p className="font-mono text-xs text-muted-foreground">{content.company}</p>
      </div>
    </footer>
  )
}
