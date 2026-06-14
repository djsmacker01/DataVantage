import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const STATUSES = ['all', 'pending', 'confirmed', 'cancelled', 'completed']
const STATUS_COLORS = {
  pending: { background: '#D1990015', color: '#D19900' },
  confirmed: { background: '#01696f15', color: '#01696f' },
  cancelled: { background: '#ef444415', color: '#ef4444' },
  completed: { background: '#8b5cf615', color: '#8b5cf6' },
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetch = async () => {
    let q = supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setBookings(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [filter])

  const updateStatus = async (id, status) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    toast.success(`Status updated to ${status}.`)
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors"
            style={filter === s ? { background: '#01696f', color: '#fff' } : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonLoader type="table-row" count={6} cols={6} />
      ) : (
        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm min-w-[700px]">
            <thead style={{ background: 'var(--color-surface-alt)' }}>
              <tr>
                {['Name', 'Service', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-[var(--color-surface-alt)] transition-colors" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: 'var(--color-text-base)' }}>{b.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{b.email}</div>
                  </td>
                  <td className="px-4 py-3 capitalize" style={{ color: 'var(--color-text-muted)' }}>{b.service_type?.replace('_', ' ')}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{b.preferred_date ? format(new Date(b.preferred_date), 'MMM d, yyyy') : '—'}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{b.preferred_time}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium capitalize" style={STATUS_COLORS[b.status] || {}}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, e.target.value)}
                      className="text-xs px-2 py-1.5 rounded-lg outline-none"
                      style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-base)' }}
                    >
                      {['pending', 'confirmed', 'cancelled', 'completed'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: 'var(--color-text-muted)' }}>No bookings found.</p>
          )}
        </div>
      )}
    </div>
  )
}
