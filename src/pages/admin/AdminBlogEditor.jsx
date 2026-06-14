import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/utils/slugify'
import TipTapEditor from '@/components/editor/TipTapEditor'

const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f]'
const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

const CATEGORIES = ['Data Analysis', 'Business', 'Engineering', 'Career', 'Tools', 'Case Study']

export default function AdminBlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', cover_image_url: '',
    category: '', tags: '', read_time_minutes: 5,
    published: false, published_at: '', body: null,
  })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  useEffect(() => {
    if (!isEdit) return
    supabase.from('blog_posts').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({ ...data, tags: (data.tags || []).join(', '), published_at: data.published_at?.slice(0, 16) || '' })
    })
  }, [id])

  useEffect(() => {
    if (!isEdit && form.title) setForm(f => ({ ...f, slug: slugify(f.title) }))
  }, [form.title])

  const uploadCover = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage.from('blog-covers').upload(path, file)
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('blog-covers').getPublicUrl(path)
      setForm(f => ({ ...f, cover_image_url: publicUrl }))
      toast.success('Cover uploaded.')
    }
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      published_at: form.published ? (form.published_at || new Date().toISOString()) : form.published_at || null,
    }
    const { error } = isEdit
      ? await supabase.from('blog_posts').update(payload).eq('id', id)
      : await supabase.from('blog_posts').insert([payload])
    setLoading(false)
    if (error) toast.error(error.message)
    else { toast.success(isEdit ? 'Post updated.' : 'Post created.'); navigate('/admin/blog') }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {isEdit ? 'Edit Post' : 'New Blog Post'}
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Excerpt</label>
          <textarea rows={2} className={inputClass} style={inputStyle} placeholder="Short description shown in listings…" value={form.excerpt} onChange={set('excerpt')} />
        </div>

        {/* Cover image */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Cover Image</label>
          {form.cover_image_url && <img src={form.cover_image_url} className="w-full h-40 object-cover rounded-xl" />}
          <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl text-sm font-medium w-fit" style={{ border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)' }}>
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? 'Uploading…' : 'Upload cover'}
            <input type="file" accept="image/*" className="hidden" onChange={uploadCover} />
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Category</label>
            <select className={inputClass} style={inputStyle} value={form.category} onChange={set('category')}>
              <option value="">Select…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Read time (min)</label>
            <input type="number" min={1} max={60} className={inputClass} style={inputStyle} value={form.read_time_minutes} onChange={set('read_time_minutes')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Tags</label>
            <input className={inputClass} style={inputStyle} placeholder="sql, career" value={form.tags} onChange={set('tags')} />
          </div>
        </div>

        {/* Body editor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Article body</label>
          <TipTapEditor
            content={form.body}
            onChange={json => setForm(f => ({ ...f, body: json }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" className="w-4 h-4 accent-[#01696f]" checked={form.published} onChange={set('published')} />
            <span style={{ color: 'var(--color-text-base)' }}>Publish immediately</span>
          </label>
          {form.published && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Published at</label>
              <input type="datetime-local" className={inputClass} style={inputStyle} value={form.published_at} onChange={set('published_at')} />
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2" style={{ background: '#01696f' }}>
            {loading && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? 'Save changes' : 'Create post'}
          </button>
          <button type="button" onClick={() => navigate('/admin/blog')} className="px-6 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
