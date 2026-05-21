interface QuoteBlockProps {
  text: string
  author: string
}

export default function QuoteBlock({ text, author }: QuoteBlockProps) {
  return (
    <blockquote className="bg-brand-light border-l-4 border-brand rounded-r-xl px-8 py-7 max-w-[700px]">
      <p className="text-[18px] italic text-brand-dark leading-[1.7] font-medium">{text}</p>
      <span className="block mt-3 text-[13px] font-semibold text-brand-dark not-italic">{author}</span>
    </blockquote>
  )
}
