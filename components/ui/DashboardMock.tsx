const BAR_HEIGHTS = [40, 55, 48, 72, 88, 100, 92]

interface DashboardStat {
  value: string
  label: string
  accent: boolean
}

interface DashboardMockProps {
  title: string
  chartTitle: string
  days: string[]
  stats: DashboardStat[]
}

export default function DashboardMock({ title, chartTitle, days, stats }: DashboardMockProps) {
  return (
    <div className="bg-surface rounded-2xl p-7">
      <div className="text-[13px] font-semibold text-muted mb-5 uppercase tracking-[0.5px]">{title}</div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[10px] p-4 border border-wire">
            <div className={`text-[22px] font-extrabold ${stat.accent ? 'text-accent' : 'text-brand-dark'}`}>
              {stat.value}
            </div>
            <div className="text-[12px] text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[10px] p-4 border border-wire">
        <div className="text-[12px] text-muted mb-3">{chartTitle}</div>
        <div className="flex items-end gap-2 h-20">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-[4px] ${h >= 90 ? 'bg-brand-dark' : h >= 65 ? 'bg-brand' : 'bg-brand-light'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-1.5">
          {days.map((day, i) => (
            <div key={i} className="flex-1 text-center text-[10px] text-muted">{day}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
