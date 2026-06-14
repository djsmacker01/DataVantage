import { toast } from 'sonner'
import { Link2, Linkedin, Twitter, MessageCircle, BookOpen } from 'lucide-react'

export default function ShareTray({ url, title, body }) {
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    toast.success('Link copied!')
  }

  const copyForMedium = () => {
    const text = body ? `${title}\n\n${body}\n\nRead the full article: ${url}` : `${title}\n\nRead the full article: ${url}`
    navigator.clipboard.writeText(text)
    toast.success('Copied! Paste into the Medium editor.')
  }

  const actions = [
    {
      label: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, '_blank', 'width=600,height=500'),
    },
    {
      label: 'Twitter/X',
      icon: Twitter,
      color: '#000',
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`, '_blank', 'width=600,height=400'),
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      onClick: () => window.open(`https://wa.me/?text=${encodedTitle}%20${encoded}`, '_blank'),
    },
    {
      label: 'Medium',
      icon: BookOpen,
      color: '#000',
      onClick: copyForMedium,
    },
    {
      label: 'Copy link',
      icon: Link2,
      color: '#01696f',
      onClick: copyLink,
    },
  ]

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium mr-1" style={{ color: 'var(--color-text-muted)' }}>Share:</span>
      {actions.map(({ label, icon: Icon, color, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          title={label}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 active:scale-95"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}
        >
          <Icon size={13} style={{ color }} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
