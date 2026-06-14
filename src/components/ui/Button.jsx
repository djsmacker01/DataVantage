import { Link } from 'react-router-dom'

const variants = {
  primary: {
    background: 'linear-gradient(135deg, #01696f 0%, #014d51 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 1px 3px rgba(1,105,111,0.3), 0 4px 12px rgba(1,105,111,0.2)',
  },
  accent: {
    background: 'linear-gradient(135deg, #D19900 0%, #a87a00 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 1px 3px rgba(209,153,0,0.3), 0 4px 12px rgba(209,153,0,0.2)',
  },
  secondary: {
    background: 'transparent',
    color: '#01696f',
    border: '1.5px solid #01696f',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-base)',
    border: '1.5px solid var(--color-border)',
    boxShadow: 'none',
  },
  muted: {
    background: 'var(--color-surface-alt)',
    color: 'var(--color-text-base)',
    border: 'none',
    boxShadow: 'none',
  },
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const hoverStyles = {
  primary: 'hover:brightness-110 hover:shadow-[0_4px_20px_rgba(1,105,111,0.4)]',
  accent: 'hover:brightness-110 hover:shadow-[0_4px_20px_rgba(209,153,0,0.4)]',
  secondary: 'hover:bg-[rgba(1,105,111,0.06)]',
  ghost: 'hover:bg-[var(--color-surface-alt)]',
  muted: 'hover:brightness-95',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  ...props
}) {
  const variantStyle = variants[variant] || variants.primary
  const hoverClass = hoverStyles[variant] || hoverStyles.primary

  const base = [
    'shine',
    'inline-flex items-center justify-center',
    'font-semibold rounded-xl',
    'transition-all duration-200',
    'cursor-pointer select-none',
    'active:scale-[0.97]',
    fullWidth ? 'w-full' : '',
    sizes[size],
    disabled ? 'opacity-50 cursor-not-allowed' : hoverClass,
    className,
  ].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={base} style={variantStyle} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={base} style={variantStyle} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base} style={variantStyle} {...props}>
      {children}
    </button>
  )
}
