export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => {
        const isActive = active === cat.value
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? { background: '#01696f', color: '#fff' }
                : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
            }
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
