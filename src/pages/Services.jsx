import { motion } from 'framer-motion'
import { BarChart3, Briefcase, Database, GraduationCap, Check, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, ORGANIZATION_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import Button from '@/components/ui/Button'
import { fadeUp, fadeLeft, fadeRight, scaleIn, stagger, vp } from '@/lib/motion'

const services = [
  {
    id: 'data-analysis',
    icon: BarChart3,
    title: 'Data Analysis Consulting',
    color: '#01696f',
    description: [
      "Most of the time, the answer to your business question is already hiding somewhere in your data. You just don't have a way to see it yet. That's what this is for.",
      "I've worked with businesses in finance, retail, healthcare, logistics, and tech, building dashboards and reports that people actually open and use. I work with Power BI, Tableau, and Python, but the tool is never the point. Clear answers are.",
      "Before I look at a single spreadsheet, I want to understand what decisions you're trying to make. Everything else follows from that conversation.",
    ],
    includes: [
      'Requirements discovery and KPI definition',
      'Data quality assessment and cleaning',
      'Custom dashboard design and build (Power BI / Tableau)',
      'Automated reporting pipelines',
      'Insight presentation to stakeholders',
      '30-day post-delivery support',
    ],
    whoFor: ['Growing SMEs with data scattered everywhere', 'Teams who live and die in spreadsheets', 'Executives who need reporting they can trust'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    price: 'Starting from ₦350,000',
    bookService: 'data_analysis',
  },
  {
    id: 'business-analysis',
    icon: Briefcase,
    title: 'Business Analysis',
    color: '#D19900',
    description: [
      "Ever been in a project where the developers built exactly what was asked for, but it wasn't what anyone actually needed? That's a business analysis problem. It's also incredibly common.",
      "I help organisations figure out what they really need before the building starts. Whether you're going through a digital transformation, launching something new, or trying to fix a broken process, I'll sit with your stakeholders, map what's happening now, identify the gaps, and write specifications that everyone, technical and non-technical, can actually agree on.",
      "I know BABOK. I know Agile. I've also worked in enough Nigerian organisations to know they don't always run the way a methodology textbook assumes. So I use the frameworks as a guide, not a script. I adapt to how your teams actually work.",
    ],
    includes: [
      'Stakeholder interviews and workshops',
      'As-is and to-be process mapping (BPMN)',
      'Business requirements documentation (BRD)',
      'Gap analysis and opportunity identification',
      'User story writing for development teams',
      'Change impact assessment',
    ],
    whoFor: ['Companies going through digital transformation', 'Startups building their first product', 'Teams where dev and business keep missing each other'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    price: 'Starting from ₦250,000',
    bookService: 'business_analysis',
  },
  {
    id: 'data-engineering',
    icon: Database,
    title: 'Data Engineering',
    color: '#01696f',
    description: [
      "You can't build great analytics on a shaky foundation. If your data is sitting in five different places, takes hours to update, or nobody's quite sure if the numbers can be trusted, that's what needs fixing first.",
      "I design and build the plumbing: ETL/ELT pipelines, data warehouses, and cloud infrastructure that pulls everything into one reliable place. I use dbt, Apache Airflow, BigQuery, and PostgreSQL, and I build with your future scale in mind, not just where you are today.",
      "I've worked with companies processing millions of transactions daily and small teams moving off Excel for the very first time. The scale is different, but the goal is always the same: your data should be clean, connected, and something you can actually trust.",
    ],
    includes: [
      'Data architecture design and documentation',
      'ETL/ELT pipeline development',
      'Data warehouse setup (BigQuery, PostgreSQL, Snowflake)',
      'dbt model development and testing',
      'Data quality monitoring and alerting',
      'Cloud infrastructure setup (GCP / AWS)',
    ],
    whoFor: ['Companies with data scattered across disconnected systems', 'Teams finally moving from spreadsheets to a real database', 'Startups who need infrastructure that can grow with them'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    price: 'Starting from ₦500,000',
    bookService: 'data_engineering',
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Training & Workshops',
    color: '#D19900',
    description: [
      "The best thing I can do for your organisation isn't to always be the one with the answers. It's to help your people become the ones who can find the answers themselves.",
      "I've trained hundreds of professionals: corporate teams, government employees, and individuals switching into data careers. Topics cover Excel, SQL, Power BI, Python for data analysis, and how to build a data culture from the inside out. Everything is built around real Nigerian business examples, not generic Western case studies that feel irrelevant.",
      "We can do a one-day workshop or a 12-week structured programme. Either way, participants leave with skills they can use on Monday morning.",
    ],
    includes: [
      'Needs assessment and curriculum design',
      'In-person or virtual delivery',
      'Practical exercises with real datasets',
      'Training materials and resources',
      'Post-training assessments',
      '3-month Q&A support via group chat',
    ],
    whoFor: ['Corporate teams who want to get better with data', 'Individuals making a career switch into data', 'Organisations trying to build real data capability in-house'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    price: 'From ₦150,000 per person / ₦800,000 for team workshops',
    bookService: 'training',
  },
]

export default function Services() {
  return (
    <PageTransition>
      <SEOHead
        title="Services — Data Analysis, Business Analysis, Engineering & Training"
        description="Professional data consulting and training services in Lagos, Nigeria. Power BI dashboards, data engineering, business analysis, and corporate Power BI & SQL training workshops."
        path="/services"
        keywords="data analysis services Nigeria, Power BI consulting Lagos, data engineering Nigeria, SQL training Lagos, business intelligence services Africa"
      />
      <JsonLd data={[
        makeBreadcrumbs([{ name: 'Services', path: '/services' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'DataVantage Services',
          description: 'Data consulting, analysis, engineering, and training services offered in Lagos, Nigeria.',
          url: `${SITE_URL}/services`,
          provider: PERSON_SCHEMA,
          itemListElement: [
            {
              '@type': 'ListItem', position: 1,
              item: {
                '@type': 'Service',
                name: 'Data Analysis Consulting',
                description: 'Custom Power BI and Tableau dashboards, automated reporting pipelines, and data quality assessments for Nigerian businesses.',
                provider: PERSON_SCHEMA,
                areaServed: { '@type': 'Country', name: 'Nigeria' },
                url: `${SITE_URL}/services#data-analysis`,
              },
            },
            {
              '@type': 'ListItem', position: 2,
              item: {
                '@type': 'Service',
                name: 'Business Analysis',
                description: 'Process mapping, requirements gathering, stakeholder documentation, and technology alignment for growing businesses.',
                provider: PERSON_SCHEMA,
                areaServed: { '@type': 'Country', name: 'Nigeria' },
                url: `${SITE_URL}/services#business-analysis`,
              },
            },
            {
              '@type': 'ListItem', position: 3,
              item: {
                '@type': 'Service',
                name: 'Data Engineering',
                description: 'ETL pipelines, Azure Data Factory migrations, SQL Server optimisation, and data architecture for scalable analytics.',
                provider: PERSON_SCHEMA,
                areaServed: { '@type': 'Country', name: 'Nigeria' },
                url: `${SITE_URL}/services#data-engineering`,
              },
            },
            {
              '@type': 'ListItem', position: 4,
              item: {
                '@type': 'Service',
                name: 'Training & Workshops',
                description: 'Hands-on Power BI, Advanced Excel, and SQL training for professionals and corporate teams in Nigeria.',
                provider: PERSON_SCHEMA,
                areaServed: { '@type': 'Country', name: 'Nigeria' },
                url: `${SITE_URL}/services#training`,
              },
            },
          ],
        },
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="py-16 text-center relative overflow-hidden"
        style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="label-pill mb-4 inline-flex">What I do</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Here's how I can{' '}
            <span style={{ color: '#01696f' }}>help your business</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
            A quick fix or a long-term partnership, I work either way. From cleaning up the raw data to building the systems that keep it clean, and training the people who use it.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Service sections ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-28">
        {services.map((svc, i) => {
          const Icon = svc.icon
          const flip = i % 2 !== 0
          const textVariant = flip ? fadeLeft : fadeRight
          const cardVariant = flip ? fadeRight : fadeLeft

          return (
            <motion.section
              key={svc.id}
              id={svc.id}
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className={`grid md:grid-cols-2 gap-12 items-start`}
            >
              {/* ── Text column ── */}
              <motion.div variants={textVariant} className={flip ? 'md:order-2' : ''}>
                {/* Image */}
                {svc.image && (
                  <motion.div
                    className="group overflow-hidden rounded-2xl mb-6"
                    style={{ aspectRatio: '16/9', border: '1px solid var(--color-border)' }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        loading="lazy"
                      />
                      {/* Colour overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: `linear-gradient(135deg, ${svc.color}22, transparent 60%)` }}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${svc.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  >
                    <Icon size={20} style={{ color: svc.color }} />
                  </motion.div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${svc.color}10`, color: svc.color }}
                  >
                    Service
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>{svc.title}</h2>

                {svc.description.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>{p}</p>
                ))}

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Who it's for</p>
                  <motion.div
                    variants={stagger(0.06)}
                    className="flex flex-wrap gap-2"
                  >
                    {svc.whoFor.map(w => (
                      <motion.span
                        key={w}
                        variants={scaleIn}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        {w}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* ── Includes + CTA card ── */}
              <motion.div
                variants={cardVariant}
                className={`rounded-2xl p-6 flex flex-col gap-6 ${flip ? 'md:order-1' : ''}`}
                style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    What's included
                  </p>
                  <motion.ul
                    variants={stagger(0.06)}
                    className="flex flex-col gap-2.5"
                  >
                    {svc.includes.map((item, idx) => (
                      <motion.li
                        key={item}
                        variants={fadeUp}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: 'var(--color-text-base)' }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: idx * 0.06 + 0.2,
                            type: 'spring',
                            stiffness: 460,
                            damping: 20,
                          }}
                        >
                          <Check size={14} className="mt-0.5 shrink-0" style={{ color: svc.color }} />
                        </motion.div>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Investment</p>
                  <p className="font-semibold mb-4" style={{ color: 'var(--color-text-base)' }}>{svc.price}</p>
                  <Button
                    to={`/book/consultation?service=${svc.bookService}`}
                    variant={i % 2 === 0 ? 'primary' : 'accent'}
                    fullWidth
                  >
                    Book This Service <ArrowRight size={15} />
                  </Button>
                </div>
              </motion.div>
            </motion.section>
          )
        })}
      </div>

      {/* ── Bottom CTA strip ──────────────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #01696f 0%, #014d51 50%, #013a3e 100%)' }}
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }} />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-5"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Not sure which service fits?
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Let's figure it out together
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Book a free 30-minute discovery call and we'll talk through what you need. No commitment, no pitch.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button to="/book/consultation" variant="accent" size="lg">
              Book a Free Discovery Call
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
