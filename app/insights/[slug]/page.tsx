import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { insights } from '@/lib/content'
import { ConsultationCTA } from '@/components/home/consultation-cta'
import { Reveal } from '@/components/reveal'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return insights.map((insight) => ({
    slug: insight.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) return {}

  return {
    title: `${insight.title} | Gara Media Insights`,
    description: insight.excerpt,
  }
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const insight = insights.find((i) => i.slug === slug)

  if (!insight) {
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
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to insights
            </Link>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/60">
              <span className="font-semibold text-gold">
                {insight.category}
              </span>
              <span className="size-1 rounded-full bg-white/30" />
              <span>{insight.readTime}</span>
              <span className="size-1 rounded-full bg-white/30" />
              <span>{insight.date}</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] text-balance text-white md:text-5xl lg:text-6xl max-w-4xl">
              {insight.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border mb-12">
              <Image
                src={insight.image || '/placeholder.svg'}
                alt={insight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {insight.excerpt}
            </p>
            <div className="mt-12 rounded-lg border border-border bg-card p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This is a placeholder for the full article content. In a production
                environment, this would render the complete insight with rich text,
                images, and structured sections.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                <ArrowLeft className="size-4" />
                All insights
              </Link>
              <Link
                href="/consultation"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                Discuss this topic
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}

