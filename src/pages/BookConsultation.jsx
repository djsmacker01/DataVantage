import { CalendarDays, Clock, MessageSquare } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import BookingForm from '@/components/forms/BookingForm'

export default function BookConsultation() {
  return (
    <PageTransition>
      <SEOHead
        title="Book a Data Consultation — Muminah Shehu, Lagos"
        description="Book a 1-on-1 data consultation with Muminah Shehu. Discuss your data challenges, Power BI needs, or analytics project — and get a clear action plan."
        path="/book/consultation"
        keywords="book data consultant Nigeria, Power BI consultant Lagos, hire data analyst, data consulting session Nigeria"
      />
      <JsonLd data={[
        makeBreadcrumbs([{ name: 'Book Consultation', path: '/book/consultation' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Data Consultation Session',
          description: '1-on-1 data consultation covering data challenges, Power BI dashboards, analytics strategy, and actionable next steps.',
          provider: PERSON_SCHEMA,
          url: `${SITE_URL}/book/consultation`,
          areaServed: { '@type': 'Country', name: 'Nigeria' },
          audience: { '@type': 'Audience', name: 'Nigerian businesses and data professionals' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'NGN',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/book/consultation`,
          },
          potentialAction: {
            '@type': 'ReserveAction',
            target: `${SITE_URL}/book/consultation`,
            name: 'Book Consultation',
          },
        },
      ]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: '#01696f' }}>Let's talk</p>
            <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Book a 1-on-1 consultation
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Bring your data headaches, your half-baked ideas, or just a vague sense that something isn't working. We'll spend 60 minutes getting to the bottom of it. You'll leave knowing exactly what to do next.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: CalendarDays, title: '60 minutes, just for you', desc: "No rushing, no shared slots. We'll dig into your specific situation." },
                { icon: Clock, title: 'Pick a time that works', desc: 'Morning and evening slots available across WAT timezone.' },
                { icon: MessageSquare, title: "You'll get it in writing", desc: "I'll send you a summary of everything we discussed within 24 hours." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#01696f15' }}>
                    <Icon size={18} style={{ color: '#01696f' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text-base)' }}>{title}</div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
            <BookingForm defaultService="consultation" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
