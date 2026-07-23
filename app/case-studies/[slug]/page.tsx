import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { caseStudies } from '@/lib/content'
import { ConsultationCTA } from '@/components/home/consultation-cta'
import { Reveal } from '@/components/reveal'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) return {}

  return {
    title: `${study.client} — ${study.title} | Gara Media`,
    description: study.excerpt,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)

  if (!study) {
    notFound()
  }

  return (
    <>
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
          <Reveal>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to case studies
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {study.client} · {study.industry}
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] text-balance text-white md:text-5xl lg:text-6xl max-w-4xl">
              {study.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <Image
                  src={study.image || '/placeholder.svg'}
                  alt={`${study.client} — ${study.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {study.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-6">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="font-heading text-3xl text-gold">
                      {m.value}
                    </span>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mt-1">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/consultation"
                className="group mt-10 inline-flex items-center gap-2 rounded-sm bg-navy px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-slate-navy"
              >
                Discuss a similar engagement
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}

