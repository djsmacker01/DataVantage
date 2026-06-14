import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useTestimonials } from '@/hooks/useTestimonials'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { fadeUp, stagger, vp } from '@/lib/motion'

const FALLBACK = [
  {
    id: '1',
    name: 'Chioma Nwosu',
    role: 'Head of Strategy',
    company: 'TechBridge Africa',
    quote: "Our Friday leadership meetings were always the same argument: whose numbers were right. Every department had their own spreadsheet and none of them matched. Three months after we started working together, we had one dashboard that everyone just opened on their own. We stopped fighting about the data, and we got back the 15 hours a week we used to burn on reconciliation.",
  },
  {
    id: '2',
    name: 'Emeka Obi',
    role: 'Founder & CEO',
    company: 'PayStack Ventures',
    quote: "I'll be honest, I thought half my team would switch off after the first session. SQL sounds intimidating and most of them had already decided it wasn't for them. But the examples were all from situations they recognised, and something shifted. They're pulling their own reports now. One of the junior analysts built something last month that used to take our BI team three days. Three days.",
  },
  {
    id: '3',
    name: 'Aisha Bello',
    role: 'Data Manager',
    company: 'Nigerian National Petroleum',
    quote: "What surprised me most was how thoroughly she understood our constraints before touching a single thing. Our infrastructure isn't ideal, our systems don't connect the way they should, and none of that was glossed over. The solution was built around all of it. The pipeline has been processing over 2 million records a day for more than a year now, and I've had to call about a problem with it exactly once.",
  },
]

export default function TestimonialCarousel() {
  const { testimonials: db, loading } = useTestimonials()
  const testimonials = db.length > 0 ? db : FALLBACK

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(i => <SkeletonLoader key={i} type="text" count={4} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            variants={fadeUp}
            className="group flex flex-col gap-5 p-6 rounded-2xl relative overflow-hidden cursor-default"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
            whileHover={{
              y: -6,
              boxShadow: 'var(--shadow-xl)',
              borderColor: 'rgba(1,105,111,0.25)',
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          >
            {/* Accent bar — animates width on hover via scaleX */}
            <motion.div
              className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
              style={{
                background: i % 2 === 0
                  ? 'linear-gradient(90deg, #01696f, #02888f)'
                  : 'linear-gradient(90deg, #D19900, #01696f)',
                originX: 0,
              }}
              initial={{ scaleX: 0.35 }}
              whileInView={{ scaleX: 0.35 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Quote icon */}
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: '#01696f10' }}
              whileHover={{ scale: 1.1, background: '#01696f1a', rotate: -8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            >
              <Quote size={18} style={{ color: '#01696f' }} />
            </motion.div>

            {/* Quote text */}
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: 'var(--color-text-base)', fontFamily: "'Instrument Serif', serif", fontSize: '0.975rem', lineHeight: 1.7 }}
            >
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              {t.photo_url ? (
                <motion.img
                  src={t.photo_url}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                  style={{ border: '2px solid rgba(1,105,111,0.2)' }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(1,105,111,0.5)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />
              ) : (
                <motion.div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{
                    background: i % 2 === 0
                      ? 'linear-gradient(135deg, #01696f, #014d51)'
                      : 'linear-gradient(135deg, #D19900, #a87a00)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </motion.div>
              )}
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--color-text-base)' }}>{t.name}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {t.role}{t.company ? `, ${t.company}` : ''}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
