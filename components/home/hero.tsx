import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-navy">
      <Image
        src="/images/home-mountain-background.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/50" />
      <div className="absolute inset-0 bg-navy/10" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <div className="max-w-4xl">
          <p className="reveal inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Enterprise Branding · Marketing · Software
          </p>

          <h1 className="reveal reveal-delay-1 mt-8 font-heading text-4xl leading-[1.06] text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Transformation for ambitious organizations.
          </h1>

          <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-white/70 md:text-xl">
            Gara Media partners with ambitious organizations to deliver
            enterprise-grade marketing, branding, and software solutions —
            combining the discipline of an established partner with the
            responsiveness of a dedicated team.
          </p>

          <div className="reveal reveal-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/consultation"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:bg-gold-soft"
            >
              Book Strategic Consultation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/case-studies"
              className="group inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-gold hover:text-gold"
            >
              Explore Our Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 bg-navy/30 backdrop-blur-sm lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 text-sm text-white/55">
          <span className="tracking-wide">Trusted by enterprises, governments & NGOs</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Addis Ababa · Est. Gara Media
          </span>
        </div>
      </div>
    </section>
  )
}
