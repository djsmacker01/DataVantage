import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Eye, Calendar, ArrowLeft, Download } from 'lucide-react'
import { format } from 'date-fns'
import PageTransition from '@/components/utils/PageTransition'
import SEOHead from '@/components/seo/SEOHead'
import JsonLd from '@/components/seo/JsonLd'
import { makeVideoSchema, makeBreadcrumbs } from '@/lib/seoSchemas'
import CommentSection from '@/components/blog/CommentSection'
import ShareTray from '@/components/blog/ShareTray'
import VideoCard from '@/components/cards/VideoCard'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { useVideo, useVideos } from '@/hooks/useVideos'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/)
  return m?.[1] ?? null
}

export default function VideoSingle() {
  const { slug } = useParams()
  const { video, loading } = useVideo(slug)
  const [activeTab, setActiveTab] = useState('description')
  const { videos: related } = useVideos({ category: video?.category, limit: 3, enabled: !!video })

  const relatedFiltered = related.filter(v => v.id !== video?.id).slice(0, 3)
  const ytId = getYouTubeId(video?.youtube_url)

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="aspect-video rounded-2xl mb-8" style={{ background: 'var(--color-surface-alt)', animation: 'pulse 2s infinite' }} />
          <SkeletonLoader type="text" count={4} />
        </div>
      </PageTransition>
    )
  }

  if (!video) {
    return (
      <PageTransition>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-3xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Video not found</h1>
          <Link to="/videos" className="text-sm font-medium" style={{ color: '#01696f' }}>← Back to Videos</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <SEOHead
        title={video.title}
        description={video.description?.slice(0, 160)}
        image={video.thumbnail_url}
        path={`/videos/${video.slug}`}
        type="video.other"
        keywords={[video.category, 'data tutorial Nigeria', 'Power BI', 'SQL training'].filter(Boolean).join(', ')}
      />
      <JsonLd data={[
        makeVideoSchema({
          title: video.title,
          description: video.description,
          thumbnailUrl: video.thumbnail_url,
          createdAt: video.created_at,
          slug: video.slug,
          ytId,
        }),
        makeBreadcrumbs([
          { name: 'Videos', path: '/videos' },
          { name: video.title, path: `/videos/${video.slug}` },
        ]),
      ]} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/videos" className="flex items-center gap-1.5 text-sm mb-6 transition-colors hover:text-[#01696f]" style={{ color: 'var(--color-text-muted)' }}>
          <ArrowLeft size={15} /> Back to Videos
        </Link>

        {/* Video Player */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: '#000' }}>
          {ytId ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : video.video_url ? (
            <video controls className="w-full aspect-video">
              <source src={video.video_url} />
            </video>
          ) : (
            <div className="aspect-video flex items-center justify-center" style={{ background: 'var(--color-surface-alt)' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>No video available</span>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            {video.category && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2" style={{ background: '#01696f15', color: '#01696f' }}>
                {video.category}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>{video.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {video.view_count !== undefined && (
                <span className="flex items-center gap-1.5"><Eye size={14} /> {video.view_count.toLocaleString()} views</span>
              )}
              {video.created_at && (
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {format(new Date(video.created_at), 'MMM d, yyyy')}</span>
              )}
              {video.duration && <span>{video.duration}</span>}
            </div>
          </div>
        </div>

        <ShareTray url={window.location.href} title={video.title} />

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'var(--color-surface-alt)' }}>
            {['description', 'resources'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={
                  activeTab === tab
                    ? { background: 'var(--color-surface)', color: '#01696f', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                    : { color: 'var(--color-text-muted)' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-base)' }}>
              {video.description || 'No description available.'}
            </p>
          )}

          {activeTab === 'resources' && (
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <p>Downloadable resources will appear here when available.</p>
            </div>
          )}
        </div>

        {/* Comments */}
        <CommentSection
          table="video_comments"
          resourceId={video.id}
          resourceField="video_id"
        />

        {/* Related */}
        {relatedFiltered.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>More videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedFiltered.map(v => <VideoCard key={v.id} video={v} />)}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
