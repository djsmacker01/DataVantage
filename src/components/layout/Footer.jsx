import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo'
import NewsletterSignup from '@/components/newsletter/NewsletterSignup'

const quickLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/videos', label: 'Free Videos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/book/consultation', label: 'Book Consultation' },
  { to: '/book/training', label: 'Book Training' },
]

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

const socials = [
  { href: 'https://linkedin.com/in/muminah-shehu', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://twitter.com', label: 'Twitter/X', Icon: TwitterIcon },
  { href: 'https://youtube.com', label: 'YouTube', Icon: YouTubeIcon },
]

const linkVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}
const linkItem = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface-alt)' }}>
      {/* Gradient top line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #01696f55, #D1990044, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Column 1 — Brand (wider) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              I help Nigerian businesses make sense of their data, from cleaning it up to building the systems that keep it clean. Lagos-based, remote-friendly.
            </p>
            <a
              href="https://wa.me/2348106741718"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#25D366]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              +234 810 674 1718 (WhatsApp)
            </a>
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--color-text-muted)', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                  whileHover={{ y: -2, color: '#01696f', borderColor: '#01696f44' }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            {/* Cert badge */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl w-fit" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#D1990015' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D19900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: '#D19900' }}>Microsoft Certified</div>
                <div className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Power BI Data Analyst</div>
              </div>
            </div>
          </div>

          {/* Column 2 — Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold mb-5 uppercase tracking-widest" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
              Navigation
            </h3>
            <motion.ul
              variants={linkVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-2.5"
            >
              {quickLinks.map(({ to, label }) => (
                <motion.li key={to} variants={linkItem}>
                  <Link
                    to={to}
                    className="group flex items-center gap-1.5 text-sm transition-colors duration-150 hover:text-[#01696f]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <span className="w-0 group-hover:w-3 h-px transition-all duration-200 rounded-full inline-block" style={{ background: '#01696f' }} />
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Column 3 — Newsletter */}
          <div className="md:col-span-5">
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-base)' }}>
              One email a week, worth reading
            </h3>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Practical data tips, SQL patterns, Power BI tricks. Things I've learned the hard way so you don't have to.
            </p>
            <NewsletterSignup variant="footer" />
            <p className="text-xs mt-3 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              No spam, ever. Unsubscribe with one click.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span>© {new Date().getFullYear()} DataVantage. Made with care in Lagos, Nigeria.</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#01696f] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#01696f] transition-colors">Terms</Link>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <a
              href="https://saan-hubsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#01696f] transition-colors"
            >
              Powered by <span className="font-semibold" style={{ color: 'var(--color-text-base)' }}>Saan-Hub Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
