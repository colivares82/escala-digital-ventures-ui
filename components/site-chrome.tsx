import type { homeContent } from '@/content/es/home'
import { sharedContent } from '@/content/es/shared'

export function SiteHeader({ content }: { content: typeof homeContent.header }) {
  return <header className="site-header"><div className="page-shell site-header__inner"><a className="site-brand" href="#inicio" aria-label={sharedContent.accessibility.homeLabel}><span aria-hidden="true"><i/><i/><i/></span>{content.brand}</a><nav aria-label={sharedContent.accessibility.primaryNavigation}>{content.nav.map((item)=><a href={item.href} key={item.label}>{item.label}</a>)}</nav><div className="site-header__actions"><p aria-label={sharedContent.accessibility.languages}>{content.locales.map((locale,index)=><span aria-current={index===0?'page':undefined} key={locale}>{locale}</span>)}</p><a className="header-cta" href="#contacto">{content.contact}</a></div></div></header>
}

export function SiteFooter({ content }: { content: typeof homeContent.footer }) {
  return <footer className="site-footer"><div className="page-shell site-footer__grid"><p>{content.claim}</p><nav aria-label={sharedContent.accessibility.footerNavigation}>{content.navigation.map((item)=><a href={item.href} key={item.href}>{item.label}</a>)}</nav><div><p>{content.company}</p><p>{content.direction}</p></div><div>{content.legal.map((item)=><a href={item.href} key={item.href}>{item.label}</a>)}</div></div></footer>
}
