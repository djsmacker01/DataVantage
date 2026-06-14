# /deh-video-system

Build the Video Library index page and single video page.

## `src/pages/Videos.jsx` — Video Library Index

**Hero section:**
- Heading "Video Library" + subtitle
- Full-width search input with Search icon (debounced 350ms via useEffect + setTimeout)

**Category filter:**
`<CategoryFilter>` with categories: All | Data Analysis | Engineering | Business | Excel | Python | SQL | Career

**Video grid:**
`useVideos({ category, search, limit: 9, page })` hook.
- Loading: `<SkeletonLoader type="card" count={9} />`
- Empty: `<EmptyState icon={Video} title="No videos found" />` with "Clear search" action if search active
- Results: `motion.div` with staggerChildren 0.05s wrapping `<VideoCard />` grid (1/2/3 cols)

**Pagination:**
Show prev/next buttons + numbered page buttons when `totalPages > 1`.
Active page: teal bg. Disabled: opacity-40.

Reset page to 0 when category or search changes.

---

## `src/pages/VideoSingle.jsx` — Single Video

Fetch via `useVideo(slug)` — auto-increments view_count on mount.

**Loading state:** aspect-video skeleton + text skeleton

**Not found state:** "Video not found" + back link

**Back link:** "← Back to Videos" (muted, hover teal)

**Video player:**
- If `youtube_url`: extract video ID via regex (`[?&]v=([^&]+)` or `youtu.be/([^?]+)`), render `<iframe src="https://www.youtube.com/embed/{ytId}?rel=0">` in aspect-video div
- If `video_url`: native `<video controls>`
- Fallback: placeholder div

**Meta row:**
Category pill + H1 title + view count (Eye icon) + date (Calendar icon) + duration

**`<ShareTray url={window.location.href} title={video.title} />`**

**Tabs:** Description | Resources
- Description: plain text `video.description`
- Resources: "Downloadable resources will appear here"

**`<CommentSection table="video_comments" resourceId={video.id} resourceField="video_id" />`**

**Related videos:**
`useVideos({ category: video.category, limit: 3 })` filtered to exclude current.
3-col grid of `<VideoCard />`.

## SEO
VideoSingle: `<SEOHead title={video.title} image={video.thumbnail_url} type="video" />`
Videos index: standard SEO

## Output
Two page files. YouTube embed must work with both `?v=` and `youtu.be/` URL formats.
