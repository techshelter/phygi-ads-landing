interface BadgeProps {
  children: React.ReactNode
  variant?: 'brand' | 'dark' | 'accent'
  className?: string
}

export default function Badge({ children, variant = 'brand', className = '' }: BadgeProps) {
  const styles = {
    brand:  'bg-brand-light text-brand-dark',
    dark:   'bg-leaf/15 text-leaf border border-leaf/30',
    accent: 'bg-accent-light text-accent',
  }

  return (
    <span className={`inline-block px-3.5 py-1 rounded-full text-[12px] font-semibold uppercase tracking-widest mb-4 ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
