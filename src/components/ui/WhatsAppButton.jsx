import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

const PHONE = '2348106741718'

const SERVICES = [
  { id: 'analysis', label: 'Data Analysis & Power BI Dashboards' },
  { id: 'business', label: 'Business Analysis & Requirements' },
  { id: 'engineering', label: 'Data Engineering & ETL Pipelines' },
  { id: 'training', label: 'Training & Workshops (Power BI, SQL, Python)' },
  { id: 'excel', label: 'Advanced Excel (Formulas, Pivot Tables, Dashboards)' },
  { id: 'general', label: 'General enquiry' },
]

function buildMessage(service) {
  const intro = "Hi Muminah! 👋 I came across your website and I'm interested in your services."
  if (!service || service === 'general') {
    return `${intro}\n\nCould you tell me more about how you can help me?`
  }
  const found = SERVICES.find(s => s.id === service)
  return `${intro}\n\nI'd like to know more about: *${found?.label}*\n\nCould you share more details?`
}

export function buildWhatsAppUrl(service) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage(service))}`
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  return (
    <>
      {/* Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-72 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3" style={{ background: '#25D366' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <WhatsAppIcon size={16} color="#fff" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-none">Muminah Shehu</div>
                    <div className="text-[10px] text-white/80 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                      Typically replies fast
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col gap-3">
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  What can I help you with? Pick a service to pre-fill your message:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s.id)}
                      className="text-left text-xs px-3 py-2 rounded-xl transition-all duration-150"
                      style={{
                        background: selected === s.id ? '#25D36618' : 'var(--color-surface-alt)',
                        border: `1px solid ${selected === s.id ? '#25D36644' : 'var(--color-border)'}`,
                        color: selected === s.id ? '#128C7E' : 'var(--color-text-base)',
                        fontWeight: selected === s.id ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <a
                  href={buildWhatsAppUrl(selected || 'general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                  style={{ background: '#25D366', boxShadow: '0 4px 12px rgba(37,211,102,0.35)' }}
                >
                  <WhatsAppIcon size={16} color="#fff" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all"
          style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.5)' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute w-14 h-14 rounded-full" style={{ background: '#25D366', animation: 'pulse-ring 2.5s ease-out infinite', opacity: 0.4 }} />
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} color="#fff" />
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <WhatsAppIcon size={26} color="#fff" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}

function WhatsAppIcon({ size = 24, color = '#25D366' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}
