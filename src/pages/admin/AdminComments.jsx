import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { supabase } from '@/lib/supabase'

export default function AdminComments() {
  const [tab, setTab] = useState('blog')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    if (tab === 'blog') {
      const { data } = await supabase
        .from('blog_comments')
        .select('*, blog_posts(title)')
        .order('created_at', { ascending: false })
      setComments(data || [])
    } else {
      const { data } = await supabase
        .from('video_comments')
        .select('*, videos(title)')
        .order('created_at', { ascending: false })
      setComments(data || [])
    }
    setLoading(false)
  }

  useEffect(() => { fetch() }, [tab])

  const deleteComment = async (id) => {
    const table = tab === 'blog' ? 'blog_comments' : 'video_comments'
    await supabase.from(table).delete().eq('id', id)
    toast.success('Comment deleted.')
    setComments(cs => cs.filter(c => c.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Comments</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['blog', 'video'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-medium capitalize"
            style={tab === t ? { background: '#01696f', color: '#fff' } : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            {t} comments
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      ) : comments.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map(c => {
            const parentTitle = tab === 'blog' ? c.blog_posts?.title : c.videos?.title
            return (
              <div key={c.id} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-text-base)' }}>{c.name}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{c.email}</span>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  {parentTitle && (
                    <div className="text-xs mb-1.5 font-medium" style={{ color: '#01696f' }}>
                      On: {parentTitle}
                    </div>
                  )}
                  <p className="text-sm" style={{ color: 'var(--color-text-base)' }}>{c.body}</p>
                </div>
                <button onClick={() => deleteComment(c.id)} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors shrink-0 self-start" style={{ color: 'var(--color-text-muted)' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
