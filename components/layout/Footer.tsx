export default function Footer({ tagline }: { tagline: string }) {
  return (
    <footer className="px-6 py-9 text-center text-[13px] text-white/80">
      <span className="font-display text-lg font-bold text-sky">nozaya</span> · {tagline}
    </footer>
  )
}
