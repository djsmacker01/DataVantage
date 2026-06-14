import { useRef } from 'react'
import { motion, useMotionValue, useTransform, animate as fmAnimate } from 'framer-motion'
import { ArrowRight, CheckCircle, Award } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import Button from '@/components/ui/Button'
import { fadeUp, fadeRight, scaleIn, popIn, stagger, vp, vpFast } from '@/lib/motion'

const roles = [
  'Data Analyst',
  'Analytical Engineer',
  'Application Support Specialist',
  'DBA',
  'Power BI Certified',
]

const skills = [
  'SQL (MS SQL)', 'Power BI', 'Python', 'SSRS / SSIS',
  'Advanced Excel', 'Azure Data Factory', 'Tableau', 'ETL Pipelines',
  'Data Modeling', 'Database Administration', 'AWS QuickSight', 'Power Query / DAX',
  'Data Cleansing', 'SSMS', 'SharePoint', 'CRM',
]

const certifications = [
  { title: 'Microsoft Fabric Data Engineer', year: 'Nov 2025', org: 'Microsoft' },
  { title: 'Azure Database Administrator Associate', year: 'Dec 2024', org: 'Microsoft' },
  { title: 'Power BI Data Analyst Associate', year: 'Nov 2022', org: 'Microsoft' },
  { title: 'Google Data Analytics Professional', year: 'Dec 2021', org: 'Google' },
]

const timeline = [
  {
    year: '2023–Now',
    title: 'Data & Reporting Analyst (App Support Specialist)',
    org: 'Hygeia HMO',
    desc: 'Writing and optimising SQL queries, maintaining databases, and designing SSRS reports for one of Nigeria\'s leading health maintenance organisations. Restored 300+ reports after a server crash and recovered the live production database after a critical failure.',
  },
  {
    year: '2022–Now',
    title: 'Power BI & Excel Facilitator',
    org: 'Forthbridge Consulting',
    desc: 'Teaching Power BI, Advanced Excel, and SQL to professionals: DAX expressions, Power Query, ETL on Power BI, and building visualisations from real business data.',
  },
  {
    year: '2022–2023',
    title: 'Data & Business Intelligence Analyst',
    org: 'Hygeia HMO',
    desc: 'Built interactive Power BI dashboards for top management, connected multiple data sources, and delivered utilisation insights that helped clients reduce healthcare costs and improve benefit allocation.',
  },
  {
    year: 'Jan–May 2022',
    title: 'Data and AI Specialist',
    org: 'Lotus Beta Analytics NG',
    desc: 'Migrated on-premises SQL Server databases to Azure Data Factory, built Power BI dashboards pulling from SQL Server and SharePoint, and facilitated Microsoft DIAD training for 100+ participants.',
  },
  {
    year: '2021',
    title: 'Data Analyst Intern',
    org: 'Quantum Analytics NG',
    desc: 'Developed KPIs that helped reduce costs by 18%, and built SQL and Tableau dashboards that cut manual reporting time by 9 hours per week.',
  },
  {
    year: '2020',
    title: 'B.Sc Economics Education',
    org: 'Lagos State University (LASU)',
    desc: 'The starting point of a journey that led, unexpectedly but perfectly, straight into data.',
  },
]

const expo = [0.22, 1, 0.36, 1]

// ── 3D tilt wrapper for the profile image ────────────────────────────────────
function TiltCard({ children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-90, 90], [5, -5])
  const rotateY = useTransform(x, [-90, 90], [-5, 5])

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => {
    fmAnimate(x, 0, { duration: 0.6, ease: expo })
    fmAnimate(y, 0, { duration: 0.6, ease: expo })
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="flex justify-center"
    >
      {children}
    </motion.div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <PageTransition>
      <SEOHead
        title="About Muminah Shehu — Data Analyst & Power BI Expert, Lagos"
        description="Muminah Shehu is a Lagos-based Data Analyst, Analytical Engineer, and Microsoft Certified Power BI Expert with 4+ years of experience in healthcare and IT consulting. Microsoft Fabric, Azure, and Google certified."
        path="/about"
        keywords="Muminah Shehu, data analyst Lagos, Power BI expert Nigeria, analytical engineer, Microsoft certified data analyst"
      />
      <JsonLd data={[
        { '@context': 'https://schema.org', ...PERSON_SCHEMA },
        makeBreadcrumbs([{ name: 'About', path: '/about' }]),
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            <motion.div variants={fadeUp}>
              <span className="label-pill">About me</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Hi, I'm Muminah Shehu.{' '}
              <span style={{ color: '#01696f' }}>Data is the work I actually chose.</span>
            </motion.h1>

            {/* Role badges */}
            <motion.div variants={stagger(0.05)} className="flex flex-wrap gap-2">
              {roles.map(role => (
                <motion.span
                  key={role}
                  variants={scaleIn}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: '#01696f12', color: '#01696f', border: '1px solid #01696f25' }}
                  whileHover={{ scale: 1.06, background: '#01696f20' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Most of my working hours are spent at Hygeia HMO: writing SQL, maintaining databases, and building Power BI dashboards that help management make decisions without needing to chase someone down for a report every time. It's not always glamorous work, but when someone opens a dashboard I built and immediately sees something they didn't know, that part never gets old. Four years in and it still does that.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Since 2022 I've also been running training at Forthbridge Consulting (Power BI, Excel, SQL) because I genuinely think data literacy is one of the most underrated career moves anyone can make right now. Once you can read your own data, you stop waiting for someone else to explain what's happening in your business.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button to="/book/consultation" variant="primary" size="lg">
                Work With Me <ArrowRight size={16} />
              </Button>
              <Button to="/contact" variant="ghost" size="lg">
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — 3D tilt profile image */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.22, ease: expo }}
          >
            <TiltCard>
              <div className="relative">
                {/* Glow backdrop */}
                <div
                  className="absolute -inset-4 rounded-[36px] pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(1,105,111,0.15), rgba(209,153,0,0.1))',
                    filter: 'blur(20px)',
                  }}
                />
                <div
                  className="relative w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden"
                  style={{ border: '2px solid rgba(1,105,111,0.35)', boxShadow: 'var(--shadow-xl)' }}
                >
                  <img
                    src="/images/muminah-shehu.jpg"
                    alt="Muminah Shehu — Data Analyst"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(1,105,111,0.2), transparent)' }}
                  />
                </div>

                {/* Badge — certification */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.85, ease: expo, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl shadow-lg text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #D19900, #a87a00)', boxShadow: '0 8px 24px rgba(209,153,0,0.4)' }}
                >
                  Microsoft Power BI Certified
                </motion.div>

                {/* Badge — years */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.95, ease: expo, duration: 0.5 }}
                  className="absolute -top-3 -left-3 px-3 py-2 rounded-xl shadow-lg text-center"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
                >
                  <div className="text-xl font-bold" style={{ fontFamily: "'Instrument Serif', serif", color: '#01696f' }}>4+</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Years in data</div>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────────────── */}
      <section
        className="py-14"
        style={{ background: 'var(--color-surface-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="text-xl md:text-2xl mb-8 text-center"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Certifications
          </motion.h2>
          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={fadeUp}
                className="flex flex-col gap-2 p-4 rounded-2xl transition-shadow duration-300"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', borderColor: 'rgba(1,105,111,0.3)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                  className="w-fit"
                >
                  <Award size={18} style={{ color: '#D19900' }} />
                </motion.div>
                <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text-base)' }}>{cert.title}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-medium" style={{ color: '#01696f' }}>{cert.org}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="text-2xl md:text-3xl mb-8 text-center"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Tools &amp; Skills
          </motion.h2>
          <motion.div
            variants={stagger(0.04)}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex flex-wrap gap-3 justify-center"
          >
            {skills.map(s => (
              <motion.span
                key={s}
                variants={scaleIn}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-default"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }}
                whileHover={{ scale: 1.07, borderColor: 'rgba(1,105,111,0.4)', color: '#01696f', background: 'rgba(1,105,111,0.04)' }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              >
                <CheckCircle size={13} style={{ color: '#01696f' }} /> {s}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="text-2xl md:text-3xl mb-12 text-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Career &amp; Education
        </motion.h2>

        <div className="relative flex flex-col gap-0">
          {/* Draw-in connecting line */}
          <motion.div
            className="absolute left-[88px] top-0 bottom-0 w-px timeline-line"
            style={{ background: 'var(--color-border)', transformOrigin: 'top center' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: expo }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-6 pb-10 relative"
            >
              <div className="shrink-0 w-20 text-right pt-0.5">
                <span className="text-xs font-semibold" style={{ color: '#01696f' }}>{item.year}</span>
              </div>

              {/* Animated dot */}
              <div className="relative shrink-0 w-4 flex justify-center">
                <motion.div
                  className="w-3.5 h-3.5 rounded-full border-2 mt-0.5 z-10"
                  style={{ background: 'var(--color-surface)', borderColor: '#01696f' }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.07 + 0.35,
                    type: 'spring',
                    stiffness: 480,
                    damping: 20,
                  }}
                />
              </div>

              <div className="flex-1 pb-2">
                <h3 className="font-semibold mb-0.5" style={{ color: 'var(--color-text-base)' }}>{item.title}</h3>
                <div className="text-sm font-medium mb-1" style={{ color: '#01696f' }}>{item.org}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── My Story ──────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
        <div className="grain absolute inset-0 pointer-events-none" />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: '#01696f', letterSpacing: '0.06em' }}
          >
            The backstory
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            How I got here
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-muted)' }}>
            I didn't plan any of this. My degree from Lagos State University was in Economics Education. I honestly thought I'd end up teaching, or maybe doing economic research. Then during NYSC, someone handed me a messy spreadsheet and asked me to make sense of it. I stayed up most of the night working through it. When the analysis changed how a real decision got made, I was done with every other plan.
          </motion.p>
          <motion.p variants={fadeUp} className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Four years later, I'm managing data infrastructure in Nigeria's healthcare sector: writing the SQL, maintaining the databases, building dashboards, and being the person who sorts things out when something critical goes down at the wrong moment. What I've learned is that data in Nigerian organisations can be surprisingly stubborn: scattered across systems that don't talk to each other, living in spreadsheets held together by formulas nobody remembers writing, running on infrastructure that should have been replaced years ago. I find that more interesting than discouraging.
          </motion.p>

          {/* Pull quote */}
          <motion.div
            variants={fadeUp}
            className="relative px-8 py-6 my-8 rounded-2xl text-left"
            style={{ background: 'rgba(1,105,111,0.06)', border: '1px solid rgba(1,105,111,0.18)' }}
          >
            <div
              className="absolute top-0 left-6 -translate-y-1/2 w-1 h-10 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #01696f, #D19900)' }}
            />
            <blockquote
              className="text-xl italic"
              style={{ fontFamily: "'Instrument Serif', serif", color: '#01696f', lineHeight: 1.6 }}
            >
              "The more data-literate Nigerian professionals become, the better decisions our businesses will make."
            </blockquote>
          </motion.div>

          <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            This platform is where I put everything I've picked up: articles, free videos, and the option to work with me directly. Whether that's a one-off consultation to get your bearings, or a longer project where I'm properly in the weeds with you, I'd genuinely love to be involved.
          </motion.p>
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-5"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: '#01696f', letterSpacing: '0.06em' }}
          >
            Let's work together
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Think we'd work well together?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            A 30-minute call, no agenda other than understanding your situation. If I can help, I'll tell you how. If someone else would serve you better, I'll say that too.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button to="/book/consultation" variant="accent" size="lg">
              Book a Free Discovery Call <ArrowRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
