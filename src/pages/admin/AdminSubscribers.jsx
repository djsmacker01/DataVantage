import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSubscribers(data || [])
        setLoading(false)
      })
  }, [])

  const exportCSV = () => {
    const rows = [['Email', 'Signed Up'], ...subscribers.map(s => [s.email, s.created_at])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `subscribers-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>Newsletter Subscribers</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{subscribers.length} total subscriber{subscribers.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:opacity-80"
          style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--color-surface-alt)' }}>
            <tr>
              {['Email', 'Signed Up'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</td></tr>
            ) : subscribers.length === 0 ? (
              <tr><td colSpan={2} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>No subscribers yet.</td></tr>
            ) : subscribers.map(s => (
              <tr key={s.id} className="hover:bg-[var(--color-surface-alt)] transition-colors" style={{ borderTop: '1px solid var(--color-border)' }}>
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text-base)' }}>{s.email}</td>
                <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
                  {format(new Date(s.created_at), 'MMM d, yyyy • h:mm a')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
