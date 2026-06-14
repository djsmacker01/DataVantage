import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/videos', label: 'Videos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 left-0 bottom-0 w-72 z-50 flex flex-col"
            style={{
              background: 'var(--color-surface)',
              borderRight: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-xl)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <Logo />
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--color-surface-alt)]"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Close menu"
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 px-4 py-6 flex-1"
            >
              {navLinks.map(({ to, label, end }) => (
                <motion.div key={to} variants={itemVariants}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive ? 'text-white' : 'hover:bg-[var(--color-surface-alt)]'
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { background: 'linear-gradient(135deg, #01696f, #014d51)', color: '#fff' }
                        : { color: 'var(--color-text-base)' }
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="px-4 pb-8 flex flex-col gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                to="/book/consultation"
                onClick={onClose}
                className="shine block w-full text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #D19900, #a87a00)',
                  boxShadow: '0 4px 12px rgba(209,153,0,0.3)',
                }}
              >
                Book a Consultation
              </Link>
              <Link
                to="/book/training"
                onClick={onClose}
                className="block w-full text-center py-3 rounded-xl text-sm font-medium transition-all hover:bg-[var(--color-surface-alt)]"
                style={{ color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              >
                Book Training
              </Link>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
