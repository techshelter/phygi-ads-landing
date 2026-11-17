import Link from 'next/link'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-brand border-brand text-white hover:bg-brand-dark hover:border-brand-dark',
  outline: 'bg-white border-wire text-ink hover:bg-surface',
  ghost: 'bg-transparent border-white/35 text-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-[22px] text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md') {
  return `inline-flex items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]}`
}

interface ButtonLinkProps {
  href: string
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

export default function ButtonLink({ href, variant, size, children }: ButtonLinkProps) {
  return <Link href={href} className={buttonClass(variant, size)}>{children}</Link>
}
