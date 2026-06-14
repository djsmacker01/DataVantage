import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Video, FileText, Calendar,
  MessageSquare, Users, LogOut, ChevronRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import Logo from '@/components/layout/Logo'

const nav = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/videos', label: 'Videos', icon: Video },
  { to: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { to: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { to: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Users },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  const signOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out.')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-surface)' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col sticky top-0 h-screen" style={{ background: 'var(--color-surface-alt)', borderRight: '1px solid var(--color-border)' }}>
        <div className="px-4 py-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Logo />
          <span className="ml-1 mt-1 inline-block text-xs px-2 py-0.5 rounded-full" style={{ background: '#01696f15', color: '#01696f' }}>Admin</span>
        </div>
        <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'text-white' : 'hover:bg-[var(--color-border)]'}`
              }
              style={({ isActive }) => isActive ? { background: '#01696f', color: '#fff' } : { color: 'var(--color-text-muted)' }}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-2 pb-4">
          <button
            onClick={signOut}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-600"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
