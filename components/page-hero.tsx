import { Eyebrow } from '@/components/section-heading'

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-40 pb-20 lg:pt-48 lg:pb-28">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #c9a227 1px, transparent 0)',
          backgroundSize: '38px 38px',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="reveal max-w-4xl">
          <Eyebrow variant="light">{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-heading text-4xl leading-[1.08] text-balance text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/65">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
