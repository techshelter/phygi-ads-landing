interface CardProps {
  icon: string
  title: string
  description: string
  dark?: boolean
  topColor?: 'brand' | 'accent'
  className?: string
}

export default function Card({ icon, title, description, dark = false, topColor, className = '' }: CardProps) {
  const borderTop = topColor === 'brand' ? 'border-t-3 border-t-brand' : topColor === 'accent' ? 'border-t-3 border-t-accent' : ''
  const cardBg    = dark ? 'bg-[#232323] border-[#333]' : 'bg-white border-wire'
  const iconBg    = dark ? 'bg-[#1D9E7522]' : 'bg-brand-light'

  return (
    <div className={`border rounded-xl p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] ${cardBg} ${borderTop} ${className}`}>
      <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 text-[20px] ${iconBg}`}>
        {icon}
      </div>
      <h3 className={`text-[17px] font-bold mb-2 ${dark ? 'text-white' : 'text-ink'}`}>{title}</h3>
      <p className={`text-[14px] leading-[1.65] ${dark ? 'text-white/55' : 'text-muted'}`}>{description}</p>
    </div>
  )
}
