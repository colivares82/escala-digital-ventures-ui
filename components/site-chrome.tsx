import type { homeContent } from '@/content/es/home'

type HeaderContent = typeof homeContent.header
type FooterContent = typeof homeContent.footer
const links = ['#que-hacemos', '#metodo', '#casos', '#metodo', '#inicio']

export function SiteHeader({ content }: { content: HeaderContent }) {
  return <header className='site-header'><div className='header-inner'><a className='brand' href='#inicio' aria-label='Escala, inicio'>{content.brand}</a><nav className='header-nav' aria-label='Navegación principal'>{content.nav.map((label,index)=><a href={links[index]} key={label}>{label}</a>)}</nav><div className='header-actions'><div className='locale-list' aria-label='Idiomas'>{content.locales.map((locale,index)=><span aria-current={index===0?'page':undefined} key={locale}>{locale}</span>)}</div><a className='header-contact' href='#contacto'>{content.contact}</a></div></div></header>
}

export function SiteFooter({ content }: { content: FooterContent }) {
  return <footer className='site-footer'><div className='footer-inner'><p className='footer-claim'>{content.claim}</p><p className='footer-company'>{content.company}</p></div></footer>
}
