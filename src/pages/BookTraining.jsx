import { Users, BookOpen, Award } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import BookingForm from '@/components/forms/BookingForm'

export default function BookTraining() {
  return (
    <PageTransition>
      <SEOHead
        title="Book Data Training — Power BI, SQL & Python in Lagos, Nigeria"
        description="Book individual coaching or corporate data training with Muminah Shehu. SQL, Python, Power BI, Tableau, and Advanced Excel — taught for the Nigerian business context."
        path="/book/training"
        keywords="Power BI training Nigeria, SQL course Lagos, Python data training, corporate data training Nigeria, Excel training Lagos"
      />
      <JsonLd data={[
        makeBreadcrumbs([{ name: 'Book Training', path: '/book/training' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Data Skills Training — Power BI, SQL & Python',
          description: 'Hands-on corporate and individual data training covering Power BI, Advanced Excel, SQL, Python, and Tableau for Nigerian professionals.',
          provider: PERSON_SCHEMA,
          url: `${SITE_URL}/book/training`,
          inLanguage: 'en-NG',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: ['online', 'onsite'],
            courseWorkload: 'PT8H',
            instructor: PERSON_SCHEMA,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'NGN',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/book/training`,
            },
          },
        },
      ]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: '#D19900' }}>Book a session</p>
            <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Let's build your data skills
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Whether it's just you wanting to level up or your whole team needing a serious data skills boost, let's figure out exactly what you need and make it happen.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Users, title: 'Just you or your whole team', desc: '1-on-1 coaching sessions or group workshops, up to 30 people.' },
                { icon: BookOpen, title: 'Built around your reality', desc: "I'll use your tools, your data, and examples from your industry." },
                { icon: Award, title: 'Something to show for it', desc: 'Certificate of completion for multi-session programmes.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#D1990015' }}>
                    <Icon size={18} style={{ color: '#D19900' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text-base)' }}>{title}</div>
                    <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#D1990010', border: '1px solid #D1990025' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: '#D19900' }}>Popular topics</p>
              <div className="flex flex-wrap gap-2">
                {['SQL Fundamentals', 'Python for Data Analysis', 'Power BI Mastery', 'Excel Advanced', 'Data Storytelling', 'Introduction to BI'].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
            <BookingForm defaultService="training" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
