import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import ButtonLink from '@/components/ui/Button'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

interface NavbarProps {
  lang: Locale
  nav: Dictionary['nav']
}

export default function Navbar({ lang, nav }: NavbarProps) {
  const links = [
    { href: '#supports', label: nav.supports },
    { href: '#scan', label: nav.scan },
    { href: '#mesure', label: nav.measure },
    { href: '#reseau', label: nav.network },
  ]
  const otherLang: Locale = lang === 'fr' ? 'en' : 'fr'

  return (
    <header className="sticky top-0 z-20 border-b border-white/12 bg-navy/96">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={`/${lang}`} aria-label="Nozaya">
          <Logo />
        </Link>
        <nav className="hidden gap-7 text-sm font-medium min-[821px]:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-white/85 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href={`/${otherLang}`}
            aria-label={nav.switchLabel}
            className="font-mono text-xs uppercase text-white/70 transition-colors hover:text-white"
          >
            {otherLang}
          </Link>
          <ButtonLink href="#cta" size="sm">{nav.cta}</ButtonLink>
        </div>
      </div>
    </header>
  )
}
