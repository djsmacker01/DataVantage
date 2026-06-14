import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { useTheme } from '@/contexts/ThemeContext'
import Logo from './Logo'
import MobileDrawer from './MobileDrawer'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/videos', label: 'Videos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const scrolled = useScrolled(80)
  const { theme, toggleTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <motion.header
        className="sticky top-0 z-30 transition-all duration-300"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          background: scrolled
            ? 'rgba(var(--color-surface-rgb, 250,249,246),0.9)'
            : 'rgba(var(--color-surface-rgb, 250,249,246),0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className="relative px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-lg"
                style={({ isActive }) => ({
                  color: isActive ? '#01696f' : 'var(--color-text-muted)',
                })}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(1,105,111,0.08)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hidden sm:flex items-center justify-center hover:bg-[var(--color-surface-alt)]"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
              </motion.div>
            </button>

            <Link
              to="/book/consultation"
              className="hidden md:inline-flex shine items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #D19900 0%, #a87a00 100%)',
                boxShadow: '0 2px 8px rgba(209,153,0,0.3)',
              }}
            >
              Book a Call
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-[var(--color-surface-alt)]"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
