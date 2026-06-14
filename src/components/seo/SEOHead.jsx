import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seoSchemas'

export default function SEOHead({
  title,
  description = "Nigeria's premier data and business intelligence expert. Data consulting, training, and engineering services by Muminah Shehu in Lagos.",
  image = DEFAULT_OG_IMAGE,
  path = '',
  type = 'website',
  // article-specific
  publishedTime,
  modifiedTime,
  articleSection,
  articleTags = [],
  // extra
  keywords,
  noindex = false,
  locale = 'en_NG',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Muminah Shehu | Data Analyst & Power BI Expert, Lagos`
  const url = `${SITE_URL}${path}`
  const resolvedImage = image || DEFAULT_OG_IMAGE

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Muminah Omolara Shehu" />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || SITE_NAME} />

      {/* ── Article-specific OG ── */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content="Muminah Omolara Shehu" />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && articleTags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* ── Twitter / X ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@datavantage_ng" />
      <meta name="twitter:creator" content="@datavantage_ng" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={title || SITE_NAME} />
    </Helmet>
  )
}
