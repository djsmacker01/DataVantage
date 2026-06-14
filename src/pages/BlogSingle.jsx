import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { makeArticleSchema, makeBreadcrumbs } from '@/lib/seoSchemas'
import RichTextRenderer from '@/components/blog/RichTextRenderer'
import CommentSection from '@/components/blog/CommentSection'
import ShareTray from '@/components/blog/ShareTray'
import BlogCard from '@/components/cards/BlogCard'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/Button'
import { useBlogPost, useBlogPosts } from '@/hooks/useBlogPosts'

function extractHeadings(content) {
  if (!content?.content) return []
  return content.content
    .filter(n => n.type === 'heading')
    .map(n => ({
      level: n.attrs?.level || 2,
      text: n.content?.map(c => c.text || '').join('') || '',
      id: (n.content?.map(c => c.text || '').join('') || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
    }))
}

export default function BlogSingle() {
  const { slug } = useParams()
  const { post, loading } = useBlogPost(slug)
  const { posts: related } = useBlogPosts({ category: post?.category, limit: 4 })
  const [activeHeading, setActiveHeading] = useState('')
  const articleRef = useRef(null)

  const relatedFiltered = related.filter(p => p.id !== post?.id).slice(0, 3)
  const headings = post?.body ? extractHeadings(post.body) : []

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveHeading(e.target.id) })
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings.length])

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="aspect-video rounded-2xl mb-8" style={{ background: 'var(--color-surface-alt)' }} />
          <SkeletonLoader type="text" count={6} />
        </div>
      </PageTransition>
    )
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-3xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Article not found</h1>
          <Link to="/blog" className="text-sm font-medium" style={{ color: '#01696f' }}>← Back to Blog</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <SEOHead
        title={post.title}
        description={post.excerpt?.slice(0, 160)}
        image={post.cover_image_url}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.published_at}
        modifiedTime={post.updated_at || post.published_at}
        articleSection={post.category || 'Data & Analytics'}
        articleTags={post.tags || []}
        keywords={[...(post.tags || []), post.category, 'data analytics Nigeria', 'Power BI'].filter(Boolean).join(', ')}
      />
      <JsonLd data={[
        makeArticleSchema({
          title: post.title,
          excerpt: post.excerpt,
          coverImage: post.cover_image_url,
          publishedAt: post.published_at,
          modifiedAt: post.updated_at,
          slug: post.slug,
          tags: post.tags,
          category: post.category,
        }),
        makeBreadcrumbs([
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ]} />

      {/* Cover */}
      {post.cover_image_url && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-[#01696f]" style={{ color: 'var(--color-text-muted)' }}>
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <div className="grid lg:grid-cols-[1fr_260px] gap-12 items-start">
          {/* Main */}
          <article ref={articleRef}>
            {/* Header */}
            <header className="mb-8">
              {post.category && (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3" style={{ background: '#01696f15', color: '#01696f' }}>
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl leading-tight mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--color-text-muted)' }}>{post.excerpt}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex items-center gap-2">
                  {post.author_avatar_url ? (
                    <img src={post.author_avatar_url} alt={post.author_name} className="w-8 h-8 rounded-full object-cover" style={{ border: '2px solid #01696f' }} />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: '#01696f' }}>
                      {(post.author_name || 'Muminah Omolara Shehu').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium" style={{ color: 'var(--color-text-base)' }}>{post.author_name || 'Muminah Omolara Shehu'}</span>
                </div>
                {post.published_at && <span className="flex items-center gap-1"><Calendar size={13} /> {format(new Date(post.published_at), 'MMMM d, yyyy')}</span>}
                {post.read_time_minutes && <span className="flex items-center gap-1"><Clock size={13} /> {post.read_time_minutes} min read</span>}
              </div>
            </header>

            {/* Body */}
            <RichTextRenderer content={post.body} />

            {/* Share */}
            <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
              <ShareTray url={window.location.href} title={post.title} />
            </div>

            {/* End CTA */}
            <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: '#01696f10', border: '1px solid #01696f25' }}>
              <p className="font-semibold mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.125rem' }}>
                Found this useful?
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Let's work together on your data challenges.
              </p>
              <Button to="/book/consultation" variant="primary">
                Book a Consultation <ArrowRight size={15} />
              </Button>
            </div>

            {/* Comments */}
            <CommentSection
              table="blog_comments"
              resourceId={post.id}
              resourceField="post_id"
            />
          </article>

          {/* TOC Sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl p-5" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  On this page
                </p>
                <ul className="flex flex-col gap-1">
                  {headings.map(h => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-sm py-1 transition-colors hover:text-[#01696f]"
                        style={{
                          paddingLeft: h.level === 2 ? 0 : h.level === 3 ? '0.75rem' : '1.5rem',
                          color: activeHeading === h.id ? '#01696f' : 'var(--color-text-muted)',
                          fontWeight: activeHeading === h.id ? 600 : 400,
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {/* Related */}
        {relatedFiltered.length > 0 && (
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
            <h2 className="text-2xl mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedFiltered.map(p => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
