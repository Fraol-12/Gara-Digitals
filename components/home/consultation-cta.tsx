import Link from 'next/link'
import { ArrowUpRight, Compass, Handshake, Lightbulb } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-heading'

const TRACKS = [
  {
    icon: Lightbulb,
    title: 'Strategic Consultation',
    desc: 'A focused executive session to assess your brand, market, and opportunities.',
  },
  {
    icon: Compass,
    title: 'Project Discovery',
    desc: 'Scope a defined engagement with clear deliverables and success metrics.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    desc: 'Establish a long-term relationship for sustained transformation and growth.',
  },
]

export function ConsultationCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow variant="light">Premium Consultation</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-white md:text-4xl lg:text-5xl">
              Begin a conversation worthy of your ambitions.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">
              Whether you are exploring a single project or a long-term
              partnership, our executive inquiry process ensures the right
              conversation from the very first step.
            </p>
            <Link
              href="/consultation"
              className="group mt-10 inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
            >
              Start Your Inquiry
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>

          <div className="grid gap-4">
            {TRACKS.map((track, i) => (
              <Reveal
                key={track.title}
                delay={i * 90}
                className="flex gap-5 rounded-lg border border-white/10 bg-white/5 p-7 transition-colors hover:border-gold/40"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-sm bg-gold/15 text-gold">
                  <track.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-heading text-xl text-white">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {track.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
