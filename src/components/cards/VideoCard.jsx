import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Eye, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function VideoCard({ video }) {
  const { title, slug, thumbnail_url, duration, category, view_count, created_at } = video

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <Link
        to={`/videos/${slug}`}
        className="group flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-card)', boxShadow: 'var(--shadow-xs)' }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
          {thumbnail_url ? (
            <img
              src={thumbnail_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #01696f12, #01696f08)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: '#01696f18' }}>
                <Play size={24} fill="#01696f" stroke="none" style={{ marginLeft: 3 }} />
              </div>
            </div>
          )}

          {/* Duration badge */}
          {duration && (
            <span
              className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold text-white"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            >
              <Clock size={10} />
              {duration}
            </span>
          )}

          {/* Category badge */}
          {category && (
            <span
              className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(1,105,111,0.9)', color: '#fff', backdropFilter: 'blur(4px)' }}
            >
              {category}
            </span>
          )}

          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
            style={{ background: 'rgba(1,105,111,0.15)', backdropFilter: 'blur(2px)' }}
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: 'var(--color-surface)' }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Play size={22} fill="#01696f" stroke="none" style={{ marginLeft: 3 }} />
            </motion.div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#01696f] transition-colors duration-200" style={{ color: 'var(--color-text-base)' }}>
            {title}
          </h3>
          <div className="flex items-center gap-3 text-xs pt-1" style={{ color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)' }}>
            {view_count !== undefined && (
              <span className="flex items-center gap-1">
                <Eye size={11} /> {view_count.toLocaleString()} views
              </span>
            )}
            {created_at && (
              <span>{formatDistanceToNow(new Date(created_at), { addSuffix: true })}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
