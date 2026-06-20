import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, Eye, ShieldCheck, Gem, Users, Zap } from 'lucide-react'
import { leadership, departments, stats } from '@/lib/content'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { ConsultationCTA } from '@/components/home/consultation-cta'

export const metadata: Metadata = {
  title: 'About | Gara Media',
  description:
    'Gara Media is a premium brand, marketing, and technology partner for ambitious organizations — structured across six specialized departments.',
}

const values = [
  {
    icon: Gem,
    title: 'Excellence',
    desc: 'We hold every deliverable to a standard worthy of the organizations we serve.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    desc: 'Trust is earned through transparency, accountability, and disciplined delivery.',
  },
  {
    icon: Zap,
    title: 'Impact',
    desc: 'We measure success by the outcomes we create, not the activity we generate.',
  },
  {
    icon: Users,
    title: 'Partnership',
    desc: 'We work as an extension of your team, invested in your long-term ambitions.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="A premium partner built for organizations that refuse the ordinary."
        intro="Gara Media unites brand, marketing, and engineering under one accountable roof — structured to deliver enterprise-grade outcomes with the focus of a specialist."
      />

      {/* Story */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <Image
                  src="/images/about-team.png"
                  alt="The Gara Media team collaborating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <SectionHeading
                eyebrow="Our Story"
                title="Craft, discipline, and a relentless standard."
                intro="We founded Gara Media on a simple conviction: ambitious organizations deserve a partner that combines creative excellence with engineering rigor. Every engagement is built on strategy, executed with precision, and measured against outcomes that matter."
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                From national institutions to fast-moving enterprises, we bring
                the same disciplined approach — earning trust before the first
                conversation and compounding advantage long after launch.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-navy py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-lg border border-white/10 bg-white/5 p-10">
              <span className="grid size-12 place-items-center rounded-sm bg-gold/15 text-gold">
                <Target className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-2xl text-white">
                Our Mission
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                To elevate ambitious organizations through integrated brand,
                marketing, and technology — delivered to a standard that signals
                credibility to the most discerning stakeholders.
              </p>
            </Reveal>
            <Reveal delay={90} className="rounded-lg border border-white/10 bg-white/5 p-10">
              <span className="grid size-12 place-items-center rounded-sm bg-gold/15 text-gold">
                <Eye className="size-6" />
              </span>
              <h3 className="mt-6 font-heading text-2xl text-white">
                Our Vision
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                To be the most trusted premium partner for organizations that
                refuse to settle — known for craft, accountability, and
                measurable impact across every discipline we practice.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Value"
            title="The principles behind every engagement."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={(i % 4) * 80}
                className="rounded-lg border border-border bg-card p-8"
              >
                <span className="grid size-12 place-items-center rounded-sm bg-gold/12 text-gold">
                  <value.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-heading text-xl text-navy">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for your outcomes."
            intro="An experienced team leading six specialized departments, aligned around a single standard of excellence."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, i) => (
              <Reveal
                key={person.name}
                delay={(i % 3) * 80}
                className="flex flex-col rounded-lg border border-border bg-card p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-navy font-heading text-lg text-gold">
                    {person.initials}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg text-navy">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-gold">
                      {person.role}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {person.focus}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Are Built"
            title="Six departments, one coordinated standard."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, i) => (
              <Reveal
                key={dept.name}
                delay={(i % 3) * 70}
                className="bg-card p-8 lg:p-10"
              >
                <h3 className="font-heading text-xl text-navy">{dept.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {dept.desc}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gold">
                  {dept.lead}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={(i % 4) * 70}
                className="bg-navy p-8 text-center lg:p-10"
              >
                <span className="font-heading text-4xl text-gold lg:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-3 text-sm uppercase tracking-wide text-white/60">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
