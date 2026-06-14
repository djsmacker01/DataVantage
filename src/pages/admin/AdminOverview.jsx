import { useEffect, useState } from 'react'
import { Calendar, Eye, Users, BookOpen } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminOverview() {
  const [stats, setStats] = useState({ bookings: 0, views: 0, subscribers: 0, published: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('videos').select('view_count').eq('published', true),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
    ]).then(([bookings, videos, subs, posts]) => {
      const totalViews = (videos.data || []).reduce((sum, v) => sum + (v.view_count || 0), 0)
      setStats({
        bookings: bookings.count || 0,
        views: totalViews,
        subscribers: subs.count || 0,
        published: posts.count || 0,
      })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: 'Pending bookings', value: stats.bookings, icon: Calendar, color: '#D19900', href: '/admin/bookings' },
    { label: 'Total video views', value: stats.views.toLocaleString(), icon: Eye, color: '#01696f', href: '/admin/videos' },
    { label: 'Newsletter subscribers', value: stats.subscribers, icon: Users, color: '#01696f', href: '/admin/subscribers' },
    { label: 'Published posts', value: stats.published, icon: BookOpen, color: '#D19900', href: '/admin/blog' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {loading ? '—' : value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
