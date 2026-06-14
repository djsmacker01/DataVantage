import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, Lock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/layout/Logo'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword(form)
    setLoading(false)
    if (error) {
      toast.error('Invalid credentials. Please try again.')
    } else {
      navigate('/admin')
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f]'
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-surface-alt)' }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Logo />
          <div className="mt-6 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#01696f15' }}>
            <Lock size={20} style={{ color: '#01696f' }} />
          </div>
          <h1 className="mt-3 text-xl font-semibold" style={{ fontFamily: "'Instrument Serif', serif" }}>Admin Access</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Sign in to manage your platform</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Email</label>
            <input required type="email" className={inputClass} style={inputStyle} placeholder="admin@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Password</label>
            <input required type="password" className={inputClass} style={inputStyle} placeholder="••••••••" value={form.password} onChange={set('password')} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 mt-2 transition-opacity hover:opacity-90"
            style={{ background: '#01696f' }}
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
