import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowRight, Loader2, CheckCircle, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const expo = [0.22, 1, 0.36, 1]

export default function NewsletterSignup({ variant = 'footer' }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const { error } = await supabase.from('newsletter_subscribers').insert([{ email }])
    setLoading(false)
    if (error) {
      if (error.code === '23505') {
        toast.info("You're already subscribed!")
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } else {
      setDone(true)
      toast.success('Subscribed! Welcome to the list.')
      setEmail('')
    }
  }

  // ── Section variant ──────────────────────────────────────────────────────────
  if (variant === 'section') {
    return (
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: expo }}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: 'rgba(1,105,111,0.08)', border: '1px solid rgba(1,105,111,0.2)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.1 }}
            >
              <CheckCircle size={22} style={{ color: '#01696f' }} />
            </motion.div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#01696f' }}>You're in!</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Check your inbox weekly for practical data insights.</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: expo }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
              style={{ background: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }}
            />
            <motion.button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white flex items-center gap-2 justify-center shrink-0"
              style={{ background: '#01696f' }}
              whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 4px 16px rgba(1,105,111,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={15} /></>}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    )
  }

  // ── Footer variant (default) ──────────────────────────────────────────────────
  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: expo }}
          className="flex items-center gap-2.5"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 480, damping: 20 }}
          >
            <CheckCircle size={18} style={{ color: '#01696f' }} />
          </motion.div>
          <p className="text-sm font-medium" style={{ color: '#01696f' }}>
            You're subscribed. Check your inbox weekly.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSubmit}
          className="flex gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }}
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 flex items-center justify-center"
            style={{ background: '#01696f', minWidth: '88px' }}
            whileHover={{ filter: 'brightness(1.1)', boxShadow: '0 3px 12px rgba(1,105,111,0.3)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : 'Subscribe'}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
