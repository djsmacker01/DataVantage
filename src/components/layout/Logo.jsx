import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 shrink-0 ${className}`} aria-label="DataVantage home">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="22" width="6" height="12" rx="2" fill="#01696f" />
        <rect x="10" y="15" width="6" height="19" rx="2" fill="#01696f" />
        <rect x="18" y="6" width="6" height="28" rx="2" fill="#D19900" />
        <rect x="26" y="18" width="6" height="16" rx="2" fill="#01696f" />
        <circle cx="5" cy="20" r="2.5" fill="#01696f" />
        <circle cx="13" cy="13" r="2.5" fill="#01696f" />
        <circle cx="21" cy="4" r="2.5" fill="#D19900" />
        <circle cx="29" cy="16" r="2.5" fill="#01696f" />
        <line x1="5" y1="20" x2="13" y2="13" stroke="#01696f" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="13" x2="21" y2="4" stroke="#D19900" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="21" y1="4" x2="29" y2="16" stroke="#01696f" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.25rem', lineHeight: 1, color: 'var(--color-text-base)' }}>
        Data<span style={{ color: '#01696f' }}>Vantage</span>
      </span>
    </Link>
  )
}
