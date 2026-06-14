import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Briefcase, Mail, BarChart3 } from 'lucide-react'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import { fadeUp, scaleIn, stagger } from '@/lib/motion'

const expo = [0.22, 1, 0.36, 1]

// Decorative SVG: disconnected graph nodes — data brand Easter egg
function DataGraph() {
  return (
    <svg
      width="320"
      height="200"
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto opacity-[0.12] select-none pointer-events-none"
    >
      {/* Dashed connecting lines */}
      <line x1="80" y1="60"  x2="160" y2="100" stroke="#01696f" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="240" y1="60" x2="160" y2="100" stroke="#01696f" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="160" y1="100" x2="120" y2="160" stroke="#D19900" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="160" y1="100" x2="200" y2="160" stroke="#D19900" strokeWidth="1.5" strokeDasharray="5 4" />
      {/* Broken / missing link  */}
      <line x1="40" y1="140" x2="90" y2="140" stroke="#01696f" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
      {/* Nodes */}
      <circle cx="80"  cy="60"  r="10" fill="#01696f" />
      <circle cx="240" cy="60"  r="10" fill="#01696f" />
      <circle cx="160" cy="100" r="14" fill="#01696f" />
      <circle cx="120" cy="160" r="8"  fill="#D19900" />
      <circle cx="200" cy="160" r="8"  fill="#D19900" />
      {/* Orphaned / broken node */}
      <circle cx="40" cy="140" r="7" fill="#01696f" opacity="0.4" />
      {/* X mark on broken connection */}
      <line x1="115" y1="135" x2="125" y2="145" stroke="#D19900" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="135" x2="115" y2="145" stroke="#D19900" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const quickLinks = [
  { to: '/',        icon: Home,      label: 'Home',         desc: 'Back to the start' },
  { to: '/services',icon: Briefcase, label: 'Services',     desc: 'What I can do for you' },
  { to: '/blog',    icon: BookOpen,  label: 'Blog',         desc: 'Articles & insights' },
  { to: '/contact', icon: Mail,      label: 'Contact',      desc: 'Get in touch' },
]

export default function NotFound() {
  return (
    <PageTransition>
      <SEOHead title="404 — Page Not Found" description="This page doesn't exist." noindex={true} />

      <div className="min-h-[82vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Background grain */}
        <div className="grain absolute inset-0 pointer-events-none" />

        {/* Decorative orbs */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(1,105,111,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(209,153,0,0.07) 0%, transparent 70%)' }}
        />

        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center gap-5 max-w-lg"
        >
          {/* Graph decoration */}
          <motion.div
            variants={scaleIn}
            className="mb-2"
          >
            <DataGraph />
          </motion.div>

          {/* 404 number */}
          <motion.div
            variants={fadeUp}
            animate={{ y: [0, -8, 0] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }}
            className="text-[7rem] md:text-[9rem] font-bold leading-none select-none"
            style={{
              fontFamily: "'Instrument Serif', serif",
              background: 'linear-gradient(135deg, rgba(1,105,111,0.18) 0%, rgba(1,105,111,0.06) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 12px rgba(1,105,111,0.12))',
            }}
          >
            404
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-2xl md:text-3xl -mt-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            This data point doesn't exist
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-sm max-w-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            The page you're looking for may have moved, been deleted, or the URL might be off. Either way, let's get you back to something useful.
          </motion.p>

          {/* Primary actions */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mt-1">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <Link
                to="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
                style={{ background: 'linear-gradient(135deg, #01696f, #014d51)', boxShadow: '0 4px 14px rgba(1,105,111,0.3)' }}
              >
                <Home size={15} /> Back to Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
              <Link
                to="/book/consultation"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #D19900, #a87a00)',
                  color: '#fff',
                  boxShadow: '0 4px 14px rgba(209,153,0,0.3)',
                }}
              >
                <BarChart3 size={15} /> Book a Call
              </Link>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="w-full mt-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span className="text-xs font-medium shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                Or go directly to
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>
          </motion.div>

          {/* Quick nav cards */}
          <motion.div
            variants={stagger(0.07)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
          >
            {quickLinks.map(({ to, icon: Icon, label, desc }) => (
              <motion.div
                key={to}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', borderColor: 'rgba(1,105,111,0.3)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              >
                <Link
                  to={to}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-colors"
                  style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: '#01696f12' }}
                  >
                    <Icon size={17} style={{ color: '#01696f' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--color-text-base)' }}>{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
