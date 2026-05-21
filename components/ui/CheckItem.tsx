interface CheckItemProps {
  title: string
  description: string
  accent?: boolean
}

export default function CheckItem({ title, description, accent = false }: CheckItemProps) {
  const circleColor = accent ? 'bg-accent' : 'bg-accent'

  return (
    <div className="flex gap-3.5 items-start">
      <div className={`w-7 h-7 rounded-full ${circleColor} text-white flex items-center justify-center text-[13px] shrink-0 mt-0.5`}>
        ✓
      </div>
      <div>
        <strong className="text-[15px] text-ink">{title}</strong>
        <p className="text-[14px] text-muted mt-0.5">{description}</p>
      </div>
    </div>
  )
}
