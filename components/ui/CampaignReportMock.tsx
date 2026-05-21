interface ReportRow {
  label: string
  value: string
  accent: boolean
  large: boolean
}

interface CampaignReportMockProps {
  title: string
  rows: ReportRow[]
}

export default function CampaignReportMock({ title, rows }: CampaignReportMockProps) {
  return (
    <div className="bg-accent-light rounded-2xl p-8 text-left">
      <div className="text-[13px] font-semibold text-accent mb-5">{title}</div>
      <div className="flex flex-col gap-2.5">
        {rows.map((row, i) => (
          <div key={i} className="bg-white rounded-lg px-3.5 py-3.5 flex justify-between items-center">
            <span className="text-[13px] text-muted">{row.label}</span>
            <strong
              className={`font-extrabold ${row.accent ? 'text-accent' : 'text-brand-dark'} ${row.large ? 'text-[18px]' : 'text-[15px]'}`}
            >
              {row.value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}
