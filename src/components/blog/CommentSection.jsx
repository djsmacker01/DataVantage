import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { MessageSquare, Reply, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

function CommentForm({ onSubmit, loading, placeholder = 'Share your thoughts...', buttonLabel = 'Post comment' }) {
  const [form, setForm] = useState({ name: '', email: '', body: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm({ name: '', email: '', body: '' })
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f] transition-shadow'
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input required className={inputClass} style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input required type="email" className={inputClass} style={inputStyle} placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
      </div>
      <textarea required rows={4} className={inputClass} style={inputStyle} placeholder={placeholder} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
      <button
        type="submit"
        disabled={loading}
        className="self-start px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: '#01696f' }}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : buttonLabel}
      </button>
    </form>
  )
}

function CommentItem({ comment, onReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyLoading, setReplyLoading] = useState(false)

  const handleReply = async (form) => {
    setReplyLoading(true)
    await onReply({ ...form, parent_id: comment.id })
    setReplyLoading(false)
    setShowReplyForm(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ background: '#01696f' }}>
          {comment.name?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-base)' }}>{comment.name}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--color-text-base)' }}>{comment.body}</p>
          <button
            onClick={() => setShowReplyForm(v => !v)}
            className="flex items-center gap-1 text-xs font-medium mt-2 transition-colors hover:text-[#01696f]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Reply size={13} /> Reply
          </button>
          {showReplyForm && (
            <div className="mt-3">
              <CommentForm onSubmit={handleReply} loading={replyLoading} placeholder="Write a reply..." buttonLabel="Post reply" />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-12 flex flex-col gap-4 mt-1 pl-4" style={{ borderLeft: '2px solid var(--color-border)' }}>
          {comment.replies.map(reply => (
            <div key={reply.id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{ background: '#D19900' }}>
                {reply.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text-base)' }}>{reply.name}</span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--color-text-base)' }}>{reply.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentSection({ table, resourceId, resourceField }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = async () => {
    const { data } = await supabase
      .from(table)
      .select('*')
      .eq(resourceField, resourceId)
      .is('parent_id', null)
      .order('created_at', { ascending: true })

    const { data: replies } = await supabase
      .from(table)
      .select('*')
      .eq(resourceField, resourceId)
      .not('parent_id', 'is', null)
      .order('created_at', { ascending: true })

    const withReplies = (data || []).map(c => ({
      ...c,
      replies: (replies || []).filter(r => r.parent_id === c.id),
    }))

    setComments(withReplies)
    setLoading(false)
  }

  useEffect(() => {
    if (resourceId) fetchComments()
  }, [resourceId])

  const handleSubmit = async ({ name, email, body, parent_id = null }) => {
    setSubmitting(true)
    const { error } = await supabase.from(table).insert([{
      [resourceField]: resourceId,
      name,
      email,
      body,
      parent_id,
    }])
    setSubmitting(false)
    if (error) {
      toast.error('Failed to post comment. Please try again.')
    } else {
      toast.success('Comment posted!')
      fetchComments()
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
        <MessageSquare size={20} style={{ color: '#01696f' }} />
        {loading ? 'Comments' : `${comments.length} Comment${comments.length !== 1 ? 's' : ''}`}
      </h3>

      <div className="flex flex-col gap-6 mb-10">
        {loading ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No comments yet. Be the first!</p>
        ) : (
          comments.map(c => <CommentItem key={c.id} comment={c} onReply={handleSubmit} />)
        )}
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
        <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-base)' }}>Leave a comment</h4>
        <CommentForm onSubmit={handleSubmit} loading={submitting} />
      </div>
    </div>
  )
}
