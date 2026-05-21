import Badge from './Badge'

interface SectionHeaderProps {
  badge?: string
  badgeVariant?: 'brand' | 'dark' | 'accent'
  title: string
  subtitle?: string
  center?: boolean
  dark?: boolean
}

export default function SectionHeader({ badge, badgeVariant = 'brand', title, subtitle, center = false, dark = false }: SectionHeaderProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      <h2
        className={`font-extrabold leading-[1.15] tracking-[-1px] mb-4 ${dark ? 'text-white' : 'text-ink'}`}
        style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[17px] leading-[1.7] max-w-145 ${center ? 'mx-auto' : ''} ${dark ? 'text-white/65' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
