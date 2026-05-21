interface StatItemProps {
  num: string
  label: string
}

export default function StatItem({ num, label }: StatItemProps) {
  return (
    <div className="text-center">
      <span className="block text-[36px] font-extrabold text-leaf">{num}</span>
      <div className="text-[13px] text-white/70 mt-1">{label}</div>
    </div>
  )
}
