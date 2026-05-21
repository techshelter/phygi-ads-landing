import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'accent' | 'outline'

interface ButtonProps {
  variant?: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const styles: Record<Variant, string> = {
  primary:  'bg-brand text-white hover:bg-brand-dark',
  accent:   'bg-accent text-white hover:bg-[#070828]',
  secondary:'bg-white/10 text-white border border-white/30 hover:bg-white/[0.18]',
  outline:  'bg-transparent text-ink border border-wire hover:bg-surface',
}

export default function Button({ variant = 'primary', href, onClick, children, className = '' }: ButtonProps) {
  const base = `inline-flex items-center justify-center px-7 py-[14px] rounded-lg text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${styles[variant]} ${className}`

  if (href) {
    return <Link href={href} className={base}>{children}</Link>
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  )
}
