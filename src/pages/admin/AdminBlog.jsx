import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await supabase.from('blog_posts').select('id, title, category, published, published_at, created_at').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const togglePublished = async (p) => {
    const update = { published: !p.published, ...((!p.published) ? { published_at: new Date().toISOString() } : {}) }
    const { error } = await supabase.from('blog_posts').update(update).eq('id', p.id)
    if (!error) {
      toast.success(p.published ? 'Post unpublished.' : 'Post published!')
      setPosts(ps => ps.map(x => x.id === p.id ? { ...x, ...update } : x))
    }
  }

  const deletePost = async (id) => {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    toast.success('Post deleted.')
    setPosts(ps => ps.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>Blog Posts</h1>
        <Link to="/admin/blog/new" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#01696f' }}>
          <Plus size={15} /> New Post
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader type="table-row" count={6} cols={4} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--color-surface-alt)' }}>
              <tr>
                {['Title', 'Category', 'Published', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="hover:bg-[var(--color-surface-alt)] transition-colors" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-3 font-medium line-clamp-1" style={{ color: 'var(--color-text-base)' }}>{p.title}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{p.category || '—'}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
                    {p.published_at ? format(new Date(p.published_at), 'MMM d, yyyy') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={p.published ? { background: '#01696f15', color: '#01696f' } : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => togglePublished(p)} className="p-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        {p.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <Link to={`/admin/blog/${p.id}/edit`} className="p-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => deletePost(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: 'var(--color-text-muted)' }}>No posts yet. Write your first article.</p>
          )}
        </div>
      )}
    </div>
  )
}
