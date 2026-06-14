import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export default function BlogCard({ post, featured = false }) {
  const { title, slug, excerpt, cover_image_url, category, read_time_minutes, published_at, author_name } = post

  if (featured) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ boxShadow: 'var(--shadow-sm)' }}
        whileHover_shadow="var(--shadow-lg)"
        className="rounded-2xl overflow-hidden"
      >
        <Link
          to={`/blog/${slug}`}
          className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-card)' }}
        >
          <div className="aspect-video md:aspect-auto overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
            {cover_image_url && (
              <img
                src={cover_image_url}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              />
            )}
          </div>
          <div className="p-7 flex flex-col justify-center">
            {category && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 w-fit tracking-wide" style={{ background: '#01696f12', color: '#01696f', letterSpacing: '0.04em' }}>
                {category}
              </span>
            )}
            <h2 className="text-xl font-semibold leading-snug mb-3 group-hover:text-[#01696f] transition-colors duration-200" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--color-text-base)' }}>
              {title}
            </h2>
            {excerpt && (
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--color-text-muted)' }}>{excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
              {read_time_minutes && <span className="flex items-center gap-1"><Clock size={12} /> {read_time_minutes} min read</span>}
              {published_at && <span>{format(new Date(published_at), 'MMM d, yyyy')}</span>}
            </div>
            {author_name && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: 'linear-gradient(135deg, #01696f, #014d51)' }}>
                  {author_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{author_name}</span>
              </div>
            )}
            <span className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200" style={{ color: '#01696f' }}>
              Read more <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <Link
        to={`/blog/${slug}`}
        className="group flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-card)', boxShadow: 'var(--shadow-xs)' }}
      >
        <div className="aspect-video overflow-hidden relative" style={{ background: 'var(--color-surface-alt)' }}>
          {cover_image_url && (
            <img
              src={cover_image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
            />
          )}
          {category && (
            <span
              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm"
              style={{ background: 'rgba(1,105,111,0.9)', color: '#fff', letterSpacing: '0.03em' }}
            >
              {category}
            </span>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-[#01696f] transition-colors duration-200" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--color-text-base)', fontSize: '1rem' }}>
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: 'var(--color-text-muted)' }}>{excerpt}</p>
          )}
          <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              {author_name && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: 'linear-gradient(135deg, #01696f, #014d51)' }}>
                  {author_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {read_time_minutes && <span className="flex items-center gap-0.5"><Clock size={10} /> {read_time_minutes}m</span>}
                {published_at && <span>{format(new Date(published_at), 'MMM d')}</span>}
              </div>
            </div>
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#01696f' }} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
