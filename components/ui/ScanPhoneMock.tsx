export default function ScanPhoneMock() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px] bg-[#0a0f1e] rounded-[36px] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.4)] border-[6px] border-[#1a1f2e]">
        {/* Status bar */}
        <div className="flex justify-between items-center mb-2.5 px-1">
          <span className="text-[11px] font-bold text-white">9:41</span>
          <div className="flex gap-1 text-white text-[10px]"><span>●●●</span><span>⚡</span></div>
        </div>

        {/* White content area */}
        <div className="bg-white rounded-[20px] overflow-hidden">
          {/* Dark nav header */}
          <div className="bg-accent px-3.5 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-[18px] h-[18px] bg-brand rounded-[5px] flex items-center justify-center text-white text-[9px]">+</div>
              <span className="text-white text-[11px] font-bold">Boulangerie du Plateau ✓</span>
            </div>
            <span className="text-[#6b7280] text-sm">✕</span>
          </div>

          {/* Illustration */}
          <div className="bg-[#f0f4ff] p-4 text-center">
            <div className="flex justify-center gap-3 mb-2">
              {['☕', '📱', '📊'].map((e) => (
                <div key={e} className="w-9 h-9 bg-[#e0e7ff] rounded-full flex items-center justify-center text-base">{e}</div>
              ))}
            </div>
            <div className="w-12 h-12 bg-brand rounded-full mx-auto flex items-center justify-center text-[22px]">👩🏾‍💼</div>
          </div>

          {/* Offer content */}
          <div className="p-3.5">
            <div className="text-[9px] text-[#6b7280] uppercase tracking-[1px] mb-1">Offre du jour</div>
            <div className="text-[14px] font-extrabold text-accent leading-snug mb-2">
              Ton pain du matin<br />te fait <span className="text-brand">gagner.</span>
            </div>
            <div className="text-[9px] text-[#6b7280] mb-3">
              Merci d'avoir scanné. Récupère ton coupon et ton boulanger te connaîtra à ta prochaine visite.
            </div>

            {/* Coupon */}
            <div className="border-2 border-dashed border-[#d1d5db] rounded-[10px] p-2.5 text-center mb-2.5">
              <div className="text-[9px] text-[#6b7280] mb-0.5">Sur ta baguette</div>
              <div className="text-[28px] font-black text-accent leading-none">-30%</div>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <div className="bg-[#f3f4f6] rounded-[6px] px-2 py-0.5 text-[10px] font-bold text-[#374151] tracking-[1px]">
                  CODE · FLJ30
                </div>
                <div className="text-[9px] text-[#ef4444]">⏱ Expire dans 24h</div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="w-full bg-[#25d366] text-white rounded-[8px] py-2.5 text-[11px] font-bold flex items-center justify-center gap-1.5 mb-1.5">
              <span>💬</span> Recevoir sur WhatsApp
            </div>
            <div className="text-center text-[9px] text-[#6b7280] mb-1.5">Pas de WhatsApp ? Reçois par SMS →</div>
            <div className="text-center text-[8px] text-[#9ca3af]">
              Propulsé par <strong className="text-brand">nozaya</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
