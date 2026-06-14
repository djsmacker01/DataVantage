import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, useMotionValue, animate as fmAnimate } from 'framer-motion'
import {
  BarChart3, Briefcase, Database, GraduationCap,
  ArrowRight, ChevronRight, Sparkles,
} from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, WEBSITE_SCHEMA, SITE_URL } from '@/lib/seoSchemas'
import VideoCard from '@/components/cards/VideoCard'
import BlogCard from '@/components/cards/BlogCard'
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/Button'
import { useVideos } from '@/hooks/useVideos'
import { useBlogPosts } from '@/hooks/useBlogPosts'

// ── Animation variants ──────────────────────────────────────────────────────

const expo = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: expo } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: expo } },
}

// ── Animated counter (Framer Motion powered) ─────────────────────────────────

function CountUp({ end, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = fmAnimate(motionVal, parseInt(end), {
      duration: 1.8,
      ease: expo,
    })
    const unsub = motionVal.on('change', (v) => setDisplay(Math.floor(v)))
    return () => { controls.stop(); unsub() }
  }, [isInView, end, motionVal])

  return <span ref={ref}>{display}{suffix}</span>
}

// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: BarChart3,
    title: 'Data Analysis',
    desc: "Stop guessing. I'll turn your raw numbers into dashboards and reports that actually tell you something.",
    href: '/services#data-analysis',
    color: '#01696f',
  },
  {
    icon: Briefcase,
    title: 'Business Analysis',
    desc: "Get everyone on the same page. I help translate what the business needs into something tech can actually build.",
    href: '/services#business-analysis',
    color: '#D19900',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    desc: "If your data lives in ten different places and nothing talks to anything else, I can fix that.",
    href: '/services#data-engineering',
    color: '#01696f',
  },
  {
    icon: GraduationCap,
    title: 'Training & Workshops',
    desc: "Practical data skills for your team, built around Nigerian business examples you'll actually recognise.",
    href: '/services#training',
    color: '#D19900',
  },
]

const stats = [
  { n: '4', suffix: '+', label: 'Years in data' },
  { n: '100', suffix: '+', label: 'Professionals trained' },
  { n: '300', suffix: '+', label: 'Reports delivered' },
]

const badges = ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'ETL Pipelines', 'React', 'PostgreSQL', 'dbt', 'Azure ADF', 'AWS QuickSight', 'SSRS/SSIS', 'Data Vault', 'DAX / Power Query']

const gallery = [
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', label: 'Executive Dashboard', tag: 'Power BI' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', label: 'Sales Analytics', tag: 'Tableau' },
  { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', label: 'KPI Reporting', tag: 'Python' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const { videos, loading: vLoading } = useVideos({ limit: 3 })
  const { posts, loading: bLoading } = useBlogPosts({ limit: 3 })
  const { scrollY } = useScroll()
  const orbY1 = useTransform(scrollY, [0, 600], [0, -70])
  const orbY2 = useTransform(scrollY, [0, 600], [0, 55])

  return (
    <PageTransition>
      <SEOHead
        title="Helping Nigerian Businesses Win With Data"
        description="I help Nigerian businesses and professionals turn messy data into clear decisions. Data analysis, engineering, business analysis, and training that actually makes sense."
        path="/"
        keywords="data analyst Nigeria, Power BI Lagos, data consulting Nigeria, business intelligence Africa, Muminah Shehu"
      />
      <JsonLd data={[
        WEBSITE_SCHEMA,
        { '@context': 'https://schema.org', ...PERSON_SCHEMA },
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'DataVantage',
          description: 'Data analysis, consulting, training, and engineering by Muminah Shehu in Lagos, Nigeria.',
          url: SITE_URL,
          telephone: '+2348106741718',
          email: 'muminahshehu@gmail.com',
          founder: PERSON_SCHEMA,
          address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
          areaServed: { '@type': 'Country', name: 'Nigeria' },
          priceRange: '₦₦',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Data Services',
            itemListElement: [
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data Analysis Consulting' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Analysis' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data Engineering' } },
              { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Power BI Training & Workshops' } },
            ],
          },
        },
      ]} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-28" style={{ background: 'var(--color-surface)' }}>
        {/* Grain */}
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* Decorative orbs — scroll parallax */}
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ y: orbY1, background: 'radial-gradient(circle, rgba(1,105,111,0.14) 0%, transparent 70%)', filter: 'blur(1px)' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ y: orbY2, background: 'radial-gradient(circle, rgba(209,153,0,0.1) 0%, transparent 70%)', filter: 'blur(1px)' }}
        />
        {/* Floating dots */}
        <motion.div
          className="absolute top-24 right-[15%] w-3 h-3 rounded-full hidden lg:block"
          style={{ background: '#01696f', opacity: 0.3 }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-[8%] w-2 h-2 rounded-full hidden lg:block"
          style={{ background: '#D19900', opacity: 0.4 }}
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-[10%] w-2.5 h-2.5 rounded-full hidden lg:block"
          style={{ background: '#01696f', opacity: 0.25 }}
          animate={{ y: [-10, 4, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center relative z-10">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#01696f12', color: '#01696f', border: '1px solid #01696f22' }}>
                <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: '#01696f' }}>
                  <span className="absolute inset-0 rounded-full" style={{ background: '#01696f', animation: 'pulse-ring 2s ease-out infinite' }} />
                </span>
                Available for new projects
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-balance" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Your data has the answers.{' '}
              <span className="relative inline-block">
                <span style={{ color: '#01696f' }}>Let me help</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #01696f, #D19900)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              {' '}you find them
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              I'm Muminah Shehu. I work with data for a living, based in Lagos. For the past four years I've been helping Nigerian businesses make sense of their numbers and actually do something with them.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button to="/book/consultation" variant="accent" size="lg">
                Book a Consultation
              </Button>
              <Button to="/services" variant="ghost" size="lg">
                Explore Services <ArrowRight size={16} />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 pt-2">
              {stats.map(({ n, suffix, label }) => (
                <div key={label} className="flex flex-col">
                  <div className="text-2xl font-bold" style={{ fontFamily: "'Instrument Serif', serif", color: '#01696f' }}>
                    <CountUp end={n} suffix={suffix} />
                  </div>
                  <div className="text-xs leading-tight mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute -inset-3 rounded-[32px]"
                style={{ background: 'linear-gradient(135deg, rgba(1,105,111,0.15), rgba(209,153,0,0.1))', filter: 'blur(16px)' }}
              />
              <div
                className="relative w-64 h-72 md:w-80 md:h-[26rem] rounded-[28px] overflow-hidden"
                style={{ border: '2px solid rgba(1,105,111,0.35)', boxShadow: 'var(--shadow-xl)' }}
              >
                <img
                  src="/images/muminah-shehu.jpg"
                  alt="Muminah Shehu — Data Analyst & Power BI Expert"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20" style={{ background: 'linear-gradient(to top, rgba(1,105,111,0.2), transparent)' }} />
              </div>

              {/* Badge — availability */}
              <motion.div
                className="absolute -bottom-5 -left-6 px-4 py-2.5 rounded-2xl shadow-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #D19900, #a87a00)', boxShadow: '0 8px 24px rgba(209,153,0,0.4)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Sparkles size={14} className="inline mr-1.5 mb-0.5" />
                Available for projects
              </motion.div>

              {/* Badge — certification */}
              <motion.div
                className="absolute -top-4 -right-5 px-3.5 py-2.5 rounded-2xl shadow-xl text-center"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: '#D19900' }}>Microsoft</div>
                <div className="text-xs font-semibold" style={{ color: 'var(--color-text-base)' }}>Power BI Certified</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────────── */}
      <section className="py-5 overflow-hidden" style={{ background: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex" style={{ animation: 'marquee 32s linear infinite' }}>
          {[...badges, ...badges].map((b, i) => (
            <span key={i} className="shrink-0 mx-4 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', letterSpacing: '0.02em' }}>
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="flex flex-col gap-12">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 tracking-wide uppercase" style={{ color: '#01696f', letterSpacing: '0.06em' }}>What I do</p>
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Four things I spend my days doing</h2>
            </div>
            <Link to="/services" className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#01696f] group" style={{ color: 'var(--color-text-muted)' }}>
              All services <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc, href, color }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, scale: 1.02, boxShadow: 'var(--shadow-xl)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <Link
                  to={href}
                  className="group flex flex-col gap-4 p-6 rounded-2xl h-full transition-all duration-300"
                  style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}12` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-[#01696f] transition-colors" style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.05rem' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold mt-auto group-hover:gap-2.5 transition-all duration-200" style={{ color: '#01696f' }}>
                    Learn more <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Visualization Gallery ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: '#01696f', letterSpacing: '0.06em' }}>Sample work</p>
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>A few things I've built</h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(({ src, label, tag }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className="group overflow-hidden rounded-2xl cursor-pointer"
                  style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', background: 'var(--color-card)' }}
                >
                  <div className="overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={src}
                      alt={label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--color-card)' }}>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-base)' }}>{label}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold" style={{ background: '#01696f12', color: '#01696f' }}>{tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Videos ───────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: '#01696f', letterSpacing: '0.06em' }}>Free resources</p>
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Grab some free knowledge</h2>
              </div>
              <Link to="/videos" className="flex items-center gap-1.5 text-sm font-medium hover:text-[#01696f] transition-colors group" style={{ color: 'var(--color-text-muted)' }}>
                All videos <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
          {vLoading ? (
            <SkeletonLoader type="card" count={3} />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {videos.map((v, i) => (
                <motion.div key={v.id} variants={fadeUp} custom={i}>
                  <VideoCard video={v} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Blog Posts ────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--color-surface-alt)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: '#01696f', letterSpacing: '0.06em' }}>From the blog</p>
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Things I've been thinking about</h2>
              </div>
              <Link to="/blog" className="flex items-center gap-1.5 text-sm font-medium hover:text-[#01696f] transition-colors group" style={{ color: 'var(--color-text-muted)' }}>
                All articles <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
          {bLoading ? (
            <SkeletonLoader type="card" count={3} />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {posts.map((p, i) => (
                <motion.div key={p.id} variants={fadeUp} custom={i}>
                  <BlogCard post={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: '#01696f', letterSpacing: '0.06em' }}>
              Don't take my word for it
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              What people who've worked with me say
            </motion.h2>
          </motion.div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #01696f 0%, #014d51 50%, #013a3e 100%)' }}>
        {/* Grain */}
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }} />
        <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(209,153,0,0.5), transparent)' }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-7"
          >
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Ready to start?
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight text-balance" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Your data already has the answers. Let's go find them
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Whether you've got a clear project in mind or you're just starting to wonder why the numbers don't add up, let's have a proper conversation about it. No pitch, just honest talk about your data.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Button to="/book/consultation" variant="accent" size="lg">
                Book a Free Discovery Call
              </Button>
              <Link
                to="/book/training"
                className="shine inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white transition-all duration-200 hover:bg-white/20"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)' }}
              >
                Explore Training
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
