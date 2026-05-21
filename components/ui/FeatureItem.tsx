interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-brand-light rounded-[10px]">
      <span className="text-[20px]">{icon}</span>
      <div>
        <strong className="text-[14px] text-ink block">{title}</strong>
        <p className="text-[13px] text-muted">{description}</p>
      </div>
    </div>
  )
}
