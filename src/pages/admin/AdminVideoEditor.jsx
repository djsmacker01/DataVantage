import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/utils/slugify'

const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f]'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

const CATEGORIES = ['Data Analysis', 'Data Engineering', 'Business Analysis', 'Excel', 'Python', 'SQL', 'Career', 'Tools']

export default function AdminVideoEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '', slug: '', description: '', youtube_url: '', video_url: '',
    thumbnail_url: '', duration: '', category: '', tags: '', published: false,
  })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  useEffect(() => {
    if (!isEdit) return
    supabase.from('videos').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({ ...data, tags: (data.tags || []).join(', ') })
    })
  }, [id])

  useEffect(() => {
    if (!isEdit && form.title) setForm(f => ({ ...f, slug: slugify(f.title) }))
  }, [form.title])

  const uploadThumbnail = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('video-thumbnails').upload(path, file)
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('video-thumbnails').getPublicUrl(path)
      setForm(f => ({ ...f, thumbnail_url: publicUrl }))
      toast.success('Thumbnail uploaded.')
    } else {
      toast.error('Upload failed.')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    const { error } = isEdit
      ? await supabase.from('videos').update(payload).eq('id', id)
      : await supabase.from('videos').insert([payload])
    setLoading(false)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success(isEdit ? 'Video updated.' : 'Video created.')
      navigate('/admin/videos')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {isEdit ? 'Edit Video' : 'New Video'}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Title *</label>
          <input required className={inputClass} style={inputStyle} value={form.title} onChange={set('title')} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Slug *</label>
          <input required className={inputClass} style={inputStyle} value={form.slug} onChange={set('slug')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>YouTube URL</label>
            <input className={inputClass} style={inputStyle} placeholder="https://youtube.com/watch?v=..." value={form.youtube_url} onChange={set('youtube_url')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Or direct video URL</label>
            <input className={inputClass} style={inputStyle} placeholder="https://..." value={form.video_url} onChange={set('video_url')} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Description</label>
          <textarea rows={4} className={inputClass} style={inputStyle} value={form.description} onChange={set('description')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Category</label>
            <select className={inputClass} style={inputStyle} value={form.category} onChange={set('category')}>
              <option value="">Select…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration</label>
            <input className={inputClass} style={inputStyle} placeholder="12:34" value={form.duration} onChange={set('duration')} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Tags (comma-separated)</label>
          <input className={inputClass} style={inputStyle} placeholder="sql, beginner, tutorial" value={form.tags} onChange={set('tags')} />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Thumbnail</label>
          {form.thumbnail_url && <img src={form.thumbnail_url} className="w-48 h-28 object-cover rounded-xl" />}
          <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium w-fit" style={{ border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)' }}>
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? 'Uploading…' : 'Upload thumbnail'}
            <input type="file" accept="image/*" className="hidden" onChange={uploadThumbnail} />
          </label>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" className="w-4 h-4 accent-[#01696f]" checked={form.published} onChange={set('published')} />
          <span style={{ color: 'var(--color-text-base)' }}>Publish immediately</span>
        </label>

        <div className="flex gap-3 mt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2" style={{ background: '#01696f' }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {isEdit ? 'Save changes' : 'Create video'}
          </button>
          <button type="button" onClick={() => navigate('/admin/videos')} className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
