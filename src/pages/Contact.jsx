import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Loader2, MapPin, Mail, Linkedin, Clock, CheckCircle } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import { supabase } from '@/lib/supabase'
import { buildWhatsAppUrl } from '@/components/ui/WhatsAppButton'
import { fadeUp, fadeLeft, fadeRight, scaleIn, stagger, vp } from '@/lib/motion'

const expo = [0.22, 1, 0.36, 1]

const SERVICES_WA = [
  { id: 'analysis',    label: 'Data Analysis & Power BI Dashboards' },
  { id: 'business',   label: 'Business Analysis & Requirements' },
  { id: 'engineering',label: 'Data Engineering & ETL Pipelines' },
  { id: 'training',   label: 'Training & Workshops (Power BI, SQL, Python)' },
  { id: 'excel',      label: 'Advanced Excel (Formulas, Pivot Tables, Dashboards)' },
  { id: 'general',    label: 'General enquiry' },
]

const SUBJECTS = ['General enquiry', 'Project proposal', 'Training request', 'Speaking engagement', 'Partnership', 'Other']

const contactInfo = [
  { icon: MapPin,   label: 'Location',     value: 'Lagos, Nigeria (available globally via remote)' },
  { icon: Mail,     label: 'Email',        value: 'muminahshehu@gmail.com',           href: 'mailto:muminahshehu@gmail.com' },
  { icon: Linkedin, label: 'LinkedIn',     value: 'linkedin.com/in/muminah-shehu',    href: 'https://linkedin.com/in/muminah-shehu' },
  { icon: Clock,    label: 'Availability', value: 'Mon–Fri, 9 AM–6 PM WAT · Usually responds within 24hrs' },
]

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

const inputBase = 'w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [waService, setWaService] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contact_messages').insert([form])
    setLoading(false)
    if (error) {
      toast.error('Failed to send. Please try again.')
    } else {
      setDone(true)
      toast.success("Message sent! I'll be in touch within 24 hours.")
    }
  }

  return (
    <PageTransition>
      <SEOHead
        title="Contact Muminah Shehu — Data Consulting & Training Enquiries"
        description="Get in touch to discuss your data project, book a consultation, or enquire about Power BI and SQL training in Lagos, Nigeria."
        path="/contact"
        keywords="hire data analyst Nigeria, Power BI consultant Lagos, data consulting enquiry, contact data expert Nigeria"
      />
      <JsonLd data={[
        makeBreadcrumbs([{ name: 'Contact', path: '/contact' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Muminah Shehu',
          url: `${SITE_URL}/contact`,
          mainEntity: PERSON_SCHEMA,
        },
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="py-12 md:py-16 text-center relative overflow-hidden"
        style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto px-4 relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="label-pill mb-4 inline-flex">Say hello</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
            I'd love to hear from you
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Got a project brewing? A training idea? Or just want to pick my brain about your data situation? Drop me a message. I read every one.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Main ──────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* ── Contact form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="rounded-2xl p-6 md:p-8"
            style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
          >
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: expo }}
                className="text-center py-10 flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 480, damping: 22, delay: 0.15 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(1,105,111,0.12)' }}
                >
                  <CheckCircle size={32} style={{ color: '#01696f' }} />
                </motion.div>
                <h3 className="text-xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>Got it, thanks!</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  I'll get back to you within 24 hours (Mon–Fri, WAT).
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={stagger(0.07)}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Your name *</label>
                    <input
                      required
                      className={inputBase}
                      style={inputStyle}
                      placeholder="Full name"
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Email *</label>
                    <input
                      required
                      type="email"
                      className={inputBase}
                      style={inputStyle}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={set('email')}
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Subject</label>
                  <select className={inputBase} style={inputStyle} value={form.subject} onChange={set('subject')}>
                    <option value="">Select a subject</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    className={inputBase}
                    style={inputStyle}
                    placeholder="What's on your mind? Don't worry about being too detailed. I'll ask follow-up questions if I need to."
                    value={form.message}
                    onChange={set('message')}
                  />
                </motion.div>

                <motion.div variants={fadeUp}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 mt-2"
                    style={{ background: '#01696f' }}
                    whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 6px 24px rgba(1,105,111,0.38)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          {/* ── Info panel ── */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Where to find me</h2>
              <motion.div variants={stagger(0.07)} className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="flex gap-4 group"
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{ background: '#01696f15' }}
                      whileHover={{ scale: 1.1, background: '#01696f22' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Icon size={18} style={{ color: '#01696f' }} />
                    </motion.div>
                    <div>
                      <div className="text-xs font-semibold mb-0.5 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-medium transition-colors hover:text-[#01696f]"
                          style={{ color: 'var(--color-text-base)' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm" style={{ color: 'var(--color-text-base)' }}>{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #25D36630' }}
              whileHover={{ boxShadow: '0 8px 30px rgba(37,211,102,0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 py-4 flex items-center gap-3" style={{ background: '#25D366' }}>
                <motion.div
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <WhatsAppIcon size={18} />
                </motion.div>
                <div>
                  <p className="font-bold text-white text-sm leading-none">Chat on WhatsApp</p>
                  <p className="text-white/75 text-xs mt-0.5">+234 810 674 1718 · Usually replies fast</p>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-3" style={{ background: '#25D36608' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Pick the service you're interested in to pre-fill your message:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SERVICES_WA.map((s, idx) => (
                    <motion.button
                      key={s.id}
                      onClick={() => setWaService(s.id)}
                      className="text-left text-xs px-3 py-2 rounded-xl font-medium"
                      style={{
                        background: waService === s.id ? '#25D36618' : 'var(--color-surface)',
                        border: `1px solid ${waService === s.id ? '#25D36655' : 'var(--color-border)'}`,
                        color: waService === s.id ? '#128C7E' : 'var(--color-text-base)',
                      }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {waService === s.id ? '✓ ' : ''}{s.label}
                    </motion.button>
                  ))}
                </div>
                <motion.a
                  href={buildWhatsAppUrl(waService || 'general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.35)' }}
                  whileHover={{ boxShadow: '0 8px 24px rgba(37,211,102,0.5)', scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <WhatsAppIcon size={16} />
                  Open WhatsApp
                </motion.a>
              </div>
            </motion.div>

            {/* Book CTA */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-2xl"
              style={{ background: '#D1990010', border: '1px solid #D1990030' }}
              whileHover={{ background: '#D1990018', borderColor: '#D1990050' }}
              transition={{ duration: 0.25 }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: '#D19900' }}>Prefer a scheduled call?</p>
              <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>Book a time directly. No back-and-forth needed.</p>
              <motion.a
                href="/book/consultation"
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: '#D19900' }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Book a consultation →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
