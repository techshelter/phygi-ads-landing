interface NumberedStepProps {
  num: number
  title: string
  description: string
  accent?: boolean
  size?: 'sm' | 'md'
}

export default function NumberedStep({ num, title, description, accent = false, size = 'md' }: NumberedStepProps) {
  const circleSize = size === 'sm' ? 'w-8 h-8 text-[14px]' : 'w-9 h-9 text-[15px]'
  const circleColor = accent ? 'bg-accent' : 'bg-brand'

  return (
    <div className="flex gap-4 items-start">
      <div className={`${circleSize} ${circleColor} rounded-full text-white font-bold flex items-center justify-center shrink-0`}>
        {num}
      </div>
      <div>
        <strong className="text-[15px] text-ink block">{title}</strong>
        <p className="text-[14px] text-muted mt-1">{description}</p>
      </div>
    </div>
  )
}
