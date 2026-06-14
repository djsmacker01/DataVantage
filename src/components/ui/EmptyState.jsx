import { Search } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Search,
  title = 'Nothing here yet',
  description = 'Check back soon.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'var(--color-surface-alt)', color: '#01696f' }}
      >
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-5 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#01696f' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
