import type { Metadata } from 'next'
import { CalendarClock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Eyebrow } from '@/components/section-heading'
import { InquiryForm } from '@/components/consultation/inquiry-form'

export const metadata: Metadata = {
  title: 'Book a Consultation | Gara Media',
  description:
    'Begin an executive consultation with Gara Media. Share your ambitions and our team will arrange the right conversation within one business day.',
}

const expectations = [
  {
    icon: Sparkles,
    title: 'A tailored conversation',
    desc: 'We review your inquiry in advance so the first session is focused on your specific goals.',
  },
  {
    icon: CalendarClock,
    title: 'Response within a day',
    desc: 'A member of our executive team responds within one business day to arrange a time.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict confidentiality',
    desc: 'Everything you share is treated with discretion and never disclosed to third parties.',
  },
]

const steps = [
  { number: '01', title: 'Submit your inquiry', desc: 'Share your goals and the type of engagement you are exploring.' },
  { number: '02', title: 'Executive review', desc: 'We assess fit and prepare a focused agenda for your session.' },
  { number: '03', title: 'Your consultation', desc: 'A senior strategist meets with you to map the opportunity.' },
  { number: '04', title: 'A clear path forward', desc: 'You receive defined next steps, scope, and recommendations.' },
]

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'garamediadigitalmarkating@gmail.com',
  },
  { icon: Phone, label: 'Phone', value: '+251989559507 and +251941318298' },
  { icon: MapPin, label: 'Studio', value: 'Addis Ababa · Remote worldwide' },
]

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Begin a conversation worthy of your ambitions."
        intro="Tell us where you want to go. Our executive inquiry process ensures the right conversation from the very first step — whether you are scoping a single project or a long-term partnership."
      />

      {/* Form + sidebar */}
      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_minmax(0,1.4fr)] lg:gap-16">
            {/* Left: what to expect */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <Eyebrow>What to expect</Eyebrow>
                <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-navy md:text-4xl">
                  A considered process, from first contact to clear direction.
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-5">
                {expectations.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={i * 80}
                    className="flex gap-5 rounded-lg border border-border bg-card p-6"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-gold/12 text-gold">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg text-navy">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 grid gap-4 rounded-lg border border-border bg-secondary p-6">
                {contacts.map((contact) => (
                  <div key={contact.label} className="flex items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-navy text-gold">
                      <contact.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {contact.label}
                      </p>
                      <p className="text-sm font-medium text-navy">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <Reveal delay={120}>
              <InquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <Eyebrow variant="light">How It Works</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-balance text-white md:text-4xl lg:text-5xl">
              Four steps to a focused engagement.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={(i % 4) * 80}
                className="bg-navy p-8 lg:p-10"
              >
                <span className="font-heading text-3xl text-gold">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
