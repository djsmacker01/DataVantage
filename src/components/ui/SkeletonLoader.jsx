function Skeleton({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ background: 'var(--color-surface-alt)', ...style }}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-4 mt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

function TextSkeleton({ lines = 3 }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  )
}

function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

function TableRowSkeleton({ cols = 5 }) {
  return (
    <div className="flex gap-4 py-3 px-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  )
}

export default function SkeletonLoader({ type = 'card', count = 3, cols = 5 }) {
  const items = Array.from({ length: count })

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  if (type === 'text') return <TextSkeleton lines={count} />
  if (type === 'avatar') return <AvatarSkeleton />
  if (type === 'table-row') {
    return (
      <div className="flex flex-col divide-y" style={{ borderColor: 'var(--color-border)' }}>
        {items.map((_, i) => <TableRowSkeleton key={i} cols={cols} />)}
      </div>
    )
  }

  return null
}
