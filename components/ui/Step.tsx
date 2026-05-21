interface StepProps {
  num: number
  title: string
  description: string
  isLast?: boolean
}

export default function Step({ num, title, description, isLast = false }: StepProps) {
  return (
    <div className="relative flex-1 min-w-50 text-center px-5">
      {!isLast && (
        <span className="absolute -right-3 top-7 text-[22px] text-wire font-light hidden sm:block">→</span>
      )}
      <div className="w-14 h-14 rounded-full bg-brand text-white text-[20px] font-extrabold flex items-center justify-center mx-auto mb-4">
        {num}
      </div>
      <h4 className="text-[15px] font-bold text-white mb-2">{title}</h4>
      <p className="text-[13px] text-muted">{description}</p>
    </div>
  )
}
