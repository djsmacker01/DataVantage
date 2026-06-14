import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function AdminVideos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    const { data } = await supabase.from('videos').select('id, title, category, view_count, published, created_at, thumbnail_url').order('created_at', { ascending: false })
    setVideos(data || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const togglePublished = async (v) => {
    const { error } = await supabase.from('videos').update({ published: !v.published }).eq('id', v.id)
    if (!error) {
      toast.success(v.published ? 'Video unpublished.' : 'Video published!')
      setVideos(vs => vs.map(x => x.id === v.id ? { ...x, published: !x.published } : x))
    }
  }

  const deleteVideo = async (id) => {
    if (!confirm('Delete this video? This cannot be undone.')) return
    await supabase.from('videos').delete().eq('id', id)
    toast.success('Video deleted.')
    setVideos(vs => vs.filter(v => v.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>Videos</h1>
        <Link to="/admin/videos/new" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#01696f' }}>
          <Plus size={15} /> New Video
        </Link>
      </div>

      {loading ? (
        <SkeletonLoader type="table-row" count={6} cols={5} />
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--color-surface-alt)' }}>
              <tr>
                {['Title', 'Category', 'Views', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
              {videos.map(v => (
                <tr key={v.id} className="hover:bg-[var(--color-surface-alt)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {v.thumbnail_url && <img src={v.thumbnail_url} className="w-12 h-8 rounded object-cover" />}
                      <span className="font-medium line-clamp-1" style={{ color: 'var(--color-text-base)' }}>{v.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{v.category || '—'}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{v.view_count?.toLocaleString() || 0}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={v.published ? { background: '#01696f15', color: '#01696f' } : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}>
                      {v.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => togglePublished(v)} className="p-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors" title={v.published ? 'Unpublish' : 'Publish'} style={{ color: 'var(--color-text-muted)' }}>
                        {v.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <Link to={`/admin/videos/${v.id}/edit`} className="p-1.5 rounded-lg hover:bg-[var(--color-border)] transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        <Pencil size={14} />
                      </Link>
                      <button onClick={() => deleteVideo(v.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {videos.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: 'var(--color-text-muted)' }}>No videos yet. Create your first one.</p>
          )}
        </div>
      )}
    </div>
  )
}
