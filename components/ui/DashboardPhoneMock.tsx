const BARS = [40, 55, 48, 72, 88, 100, 92]
const ZONES = [
  { color: '#2584FE', name: 'Cocody Riviera',      scans: '5 240 scans' },
  { color: '#60a5fa', name: 'Angré 8ème Tranche',  scans: '3 860 scans' },
  { color: '#93c5fd', name: 'Cocody II Plateaux',  scans: '2 410 scans' },
]

export default function DashboardPhoneMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px] bg-[#0a0f1e] rounded-[36px] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.25)] border-[6px] border-[#1a1f2e]">
        {/* Status bar */}
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-[11px] font-bold text-white">9:41</span>
          <div className="flex gap-1 text-white text-[10px] items-center">
            <span>●●●</span><span>WiFi</span><span>⚡</span>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-[#111827] rounded-[20px] p-3.5">
          {/* Header */}
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-brand rounded-[6px] flex items-center justify-center text-white text-[10px]">+</div>
              <span className="text-white text-[11px] font-bold">Dashboard</span>
            </div>
            <div className="flex gap-1">
              <span className="bg-brand text-white text-[9px] px-1.5 py-0.5 rounded-[4px]">Aujourd'hui</span>
              <span className="bg-[#1e2535] text-[#aaa] text-[9px] px-1.5 py-0.5 rounded-[4px]">30j</span>
            </div>
          </div>

          {/* Campagne active */}
          <div className="bg-[#1e2535] rounded-[10px] p-2.5 mb-2.5">
            <div className="text-[9px] text-[#6b7280] uppercase tracking-[1px] mb-1">Campagne active</div>
            <div className="text-[13px] font-bold text-white">Les Foires de Babi</div>
            <div className="text-[9px] text-[#6b7280]">en direct · 18 points de vente ●</div>
          </div>

          {/* Scans total */}
          <div className="bg-[#1e2535] rounded-[10px] p-2.5 mb-2 relative overflow-hidden">
            <div className="text-[9px] text-[#6b7280] uppercase tracking-[1px] mb-1">Scans total</div>
            <div className="text-[24px] font-black text-white leading-none">12 847</div>
            <div className="text-[9px] text-[#6b7280] mt-0.5">scans · 7 derniers jours</div>
            <div className="absolute top-2 right-2 bg-[#16a34a22] border border-[#16a34a] rounded-[6px] px-1.5 py-0.5 text-[9px] text-[#4ade80]">
              +23% vs S-1
            </div>
            {/* Sparkline */}
            <div className="flex items-end gap-0.5 mt-2" style={{ height: 24 }}>
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i < 2 ? '#2584FE44' : i === 2 ? '#2584FE66' : '#2584FE',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Conversions + Taux coupon */}
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <div className="bg-[#1e2535] rounded-[10px] p-2.5">
              <div className="text-[9px] text-[#6b7280] mb-0.5">Conversions</div>
              <div className="text-[16px] font-extrabold text-white">3 421</div>
              <div className="text-[10px] text-[#4ade80]">73%</div>
            </div>
            <div className="bg-[#1e2535] rounded-[10px] p-2.5">
              <div className="text-[9px] text-[#6b7280] mb-0.5">Taux coupon</div>
              <div className="text-[16px] font-extrabold text-white">28%</div>
              <div
                className="w-7 h-7 rounded-full border-[3px] border-brand mt-0.5"
                style={{ borderTopColor: '#1e2535' }}
              />
            </div>
          </div>

          {/* Zones actives */}
          <div className="bg-[#1e2535] rounded-[10px] p-2.5 mb-2">
            <div className="flex justify-between mb-1.5">
              <span className="text-[9px] text-[#6b7280]">Zones actives</span>
              <span className="text-[9px] text-brand font-semibold">TOP 3</span>
            </div>
            <div className="bg-[#111827] rounded-[6px] h-12 flex items-center justify-center mb-1.5 text-[10px] text-[#4b5563]">
              📍 Abidjan · Cocody
            </div>
            <div className="flex flex-col gap-1">
              {ZONES.map((z) => (
                <div key={z.name} className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                  <span className="text-[9px] text-[#d1d5db] flex-1">{z.name}</span>
                  <span className="text-[9px] text-white font-semibold">{z.scans}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-[#1e2535] rounded-[10px] p-2.5">
              <div className="text-[9px] text-[#6b7280] mb-0.5">Heure de pic</div>
              <div className="text-[15px] font-extrabold text-white">19:00</div>
              <div className="text-[9px] text-[#6b7280]">after-work rush</div>
            </div>
            <div className="bg-[#1e2535] rounded-[10px] p-2.5">
              <div className="text-[9px] text-[#6b7280] mb-0.5">Opt-in WhatsApp</div>
              <div className="text-[15px] font-extrabold text-white">1 284</div>
              <div className="text-[9px] text-[#6b7280]">audience activable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
