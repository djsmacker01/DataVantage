import { Loader2 } from 'lucide-react'

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2
        size={32}
        className="animate-spin"
        style={{ color: '#01696f' }}
      />
    </div>
  )
}
