import { useState, useEffect } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { PERSON_SCHEMA, ORGANIZATION_SCHEMA, makeBreadcrumbs, SITE_URL } from '@/lib/seoSchemas'
import BlogCard from '@/components/cards/BlogCard'
import CategoryFilter from '@/components/video/CategoryFilter'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import EmptyState from '@/components/ui/EmptyState'
import { useBlogPosts } from '@/hooks/useBlogPosts'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'Data Analysis', label: 'Data Analysis' },
  { value: 'Business', label: 'Business' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Career', label: 'Career' },
  { value: 'Tools', label: 'Tools' },
]

const PAGE_SIZE = 8

export default function Blog() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => { setPage(0) }, [category, debouncedSearch])

  const { posts, loading, count } = useBlogPosts({ category: category === 'all' ? null : category, search: debouncedSearch, limit: PAGE_SIZE, page })
  const totalPages = Math.ceil(count / PAGE_SIZE)

  const featured = page === 0 && !debouncedSearch && category === 'all' ? posts[0] : null
  const rest = featured ? posts.slice(1) : posts

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  return (
    <PageTransition>
      <SEOHead
        title="Blog — Data Insights & Analytics Articles"
        description="Practical data analysis, Power BI, SQL, and business intelligence articles for Nigerian and African professionals. Weekly insights from Muminah Shehu."
        path="/blog"
        keywords="data analytics blog Nigeria, Power BI tutorial, SQL tips Nigeria, business intelligence Africa, data career tips"
      />
      <JsonLd data={[
        makeBreadcrumbs([{ name: 'Blog', path: '/blog' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'DataVantage Blog',
          description: 'Practical data analysis, Power BI, SQL, and business intelligence articles for Nigerian and African professionals.',
          url: `${SITE_URL}/blog`,
          author: PERSON_SCHEMA,
          publisher: ORGANIZATION_SCHEMA,
          inLanguage: 'en-NG',
        },
      ]} />

      {/* Hero */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-medium mb-2" style={{ color: '#01696f' }}>Insights</p>
            <h1 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Things I've been writing about</h1>
            <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
              Articles from the work I actually do: data problems, SQL patterns, business cases, and career thoughts from inside the Nigerian tech space.
            </p>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[#01696f]"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-base)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <CategoryFilter categories={CATEGORIES} active={category} onChange={setCategory} />
        </div>

        {loading ? (
          <SkeletonLoader type="card" count={PAGE_SIZE} />
        ) : posts.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No articles found"
            description={search ? `No results for "${search}".` : 'Articles will appear here once published.'}
            actionLabel={search ? 'Clear search' : undefined}
            onAction={search ? () => setSearch('') : undefined}
          />
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {featured && (
              <motion.div variants={item}>
                <BlogCard post={featured} featured />
              </motion.div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map(p => (
                <motion.div key={p.id} variants={item}>
                  <BlogCard post={p} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-[var(--color-surface-alt)] transition-colors"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className="w-9 h-9 rounded-lg text-sm font-medium transition-colors"
                style={i === page ? { background: '#01696f', color: '#fff' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-[var(--color-surface-alt)] transition-colors"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-base)' }}>
              Next
            </button>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
