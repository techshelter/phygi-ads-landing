interface MetricProps {
  num: string
  label: string
}

export default function Metric({ num, label }: MetricProps) {
  return (
    <div className="bg-[#141526] border border-[#1e1f3a] rounded-xl p-6 text-center">
      <span className="block text-[36px] font-extrabold text-leaf">{num}</span>
      <div className="text-[13px] text-white/50 mt-1.5">{label}</div>
    </div>
  )
}
