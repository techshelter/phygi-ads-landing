interface FooterDict {
  logo: string
  tagline: string
  copyright: string
}

interface FooterProps {
  footer: FooterDict
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-pit text-white/50 py-10 px-[5%] text-center text-[13px]">
      <div className="text-[20px] font-bold text-brand mb-3">{footer.logo}</div>
      <p>{footer.tagline}</p>
      <p className="mt-2">{footer.copyright}</p>
    </footer>
  )
}
