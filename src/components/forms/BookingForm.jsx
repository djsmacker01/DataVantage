import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Loader2, CalendarCheck } from 'lucide-react'
import { useCreateBooking } from '@/hooks/useBookings'
import { toast } from 'sonner'

const SERVICE_OPTIONS = [
  { value: 'consultation', label: '1-on-1 Data Consultation' },
  { value: 'training', label: 'Training / Coaching Session' },
  { value: 'data_analysis', label: 'Data Analysis Project' },
  { value: 'business_analysis', label: 'Business Analysis' },
  { value: 'data_engineering', label: 'Data Engineering' },
]

const TIME_SLOTS = [
  '9:00 AM WAT', '10:00 AM WAT', '11:00 AM WAT',
  '12:00 PM WAT', '1:00 PM WAT', '2:00 PM WAT',
  '3:00 PM WAT', '4:00 PM WAT', '5:00 PM WAT',
]

const today = new Date().toISOString().split('T')[0]

const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f] transition-shadow'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

export default function BookingForm({ defaultService }) {
  const { createBooking, loading, success } = useCreateBooking()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '+234 ',
    service_type: defaultService || '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  })

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await createBooking(form)
    if (ok) toast.success('Booking submitted! Check your email for confirmation.')
    else toast.error('Something went wrong. Please try again.')
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-12 px-6 rounded-2xl"
        style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#01696f20' }}>
          <CheckCircle size={32} style={{ color: '#01696f' }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Your session is booked!
        </h3>
        <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
          Check your email for confirmation. I'll follow up within 24 hours to confirm the details.
        </p>
        <div className="flex flex-col gap-2 text-sm w-full max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-start gap-2">
            <CalendarCheck size={16} className="mt-0.5 shrink-0" style={{ color: '#01696f' }} />
            <span>You'll receive a calendar invite after confirmation</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Full name *</label>
          <input required className={inputClass} style={inputStyle} placeholder="Adaeze Okafor" value={form.name} onChange={set('name')} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Email address *</label>
          <input required type="email" className={inputClass} style={inputStyle} placeholder="adaeze@company.com" value={form.email} onChange={set('email')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Phone number</label>
          <input type="tel" className={inputClass} style={inputStyle} placeholder="+234 801 234 5678" value={form.phone} onChange={set('phone')} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Service type *</label>
          <select required className={inputClass} style={inputStyle} value={form.service_type} onChange={set('service_type')}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Preferred date *</label>
          <input required type="date" min={today} className={inputClass} style={inputStyle} value={form.preferred_date} onChange={set('preferred_date')} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Preferred time (WAT) *</label>
          <select required className={inputClass} style={inputStyle} value={form.preferred_time} onChange={set('preferred_time')}>
            <option value="">Select a time</option>
            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Your goals / message</label>
        <textarea
          rows={4}
          className={inputClass}
          style={inputStyle}
          placeholder="Tell me about your project, what you want to achieve, and any specific challenges…"
          value={form.message}
          onChange={set('message')}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 mt-2"
        style={{ background: '#D19900' }}
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Booking…</> : 'Confirm Booking'}
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
        No payment required now. I'll confirm within 24 hours.
      </p>
    </form>
  )
}
