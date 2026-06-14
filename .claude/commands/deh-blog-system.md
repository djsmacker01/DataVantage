# /deh-blog-system

Build the Blog index page and single blog post page with full TOC, share tray, and comments.

## `src/pages/Blog.jsx` — Blog Index

**Hero:** "Weekly Data Insights" heading + subtitle + search input (350ms debounce)

**Category filter:**
`<CategoryFilter>` with: All | Data Analysis | Business | Engineering | Career | Tools

**Featured post logic:**
When `page === 0 && !search && category === 'all'`: show first post as `<BlogCard post={featured} featured />` (horizontal hero card, full-width).
Remaining posts in 2/3-col grid.

**Fetch:** `useBlogPosts({ category, search, limit: 8, page })`
- Loading: `<SkeletonLoader type="card" count={8} />`
- Empty: `<EmptyState icon={BookOpen} />`
- Results: Framer Motion stagger grid

**Pagination:** same pattern as Videos page

---

## `src/pages/BlogSingle.jsx` — Single Blog Post

Fetch via `useBlogPost(slug)`.

**Cover image:** full-width, `h-64 md:h-96`, object-cover (if `cover_image_url` exists)

**Back link:** "← Back to Blog"

**Two-column layout on desktop (lg:grid-cols-[1fr_260px]):**

**Left — Article:**
- Category pill + H1 + excerpt (large muted text) + author row (avatar circle "DE" initials + "Data Expert" name + date + read time)
- `<RichTextRenderer content={post.body} />` — renders TipTap JSON
- `<ShareTray url={window.location.href} title={post.title} />`
- End CTA box: teal-tinted bg + "Found this useful?" + "Book a Consultation →" Button
- `<CommentSection table="blog_comments" resourceId={post.id} resourceField="post_id" />`

**Right — TOC sidebar** (sticky top-24, hidden on mobile):
- "On this page" label
- Parse TipTap body JSON: find all nodes with `type === 'heading'`, extract text + level + generate anchor id (slugified text)
- Render as nested list; active heading highlighted with teal via IntersectionObserver

**IntersectionObserver scroll spy:**
```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActiveHeading(e.target.id) })
}, { rootMargin: '-80px 0px -60% 0px' })
```
Observe each heading element by id. Highlight active in TOC.

**Related posts:**
`useBlogPosts({ category: post.category, limit: 4 })` filtered to exclude current. 3-col grid.

**Social sharing (ShareTray):**
- LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={encoded}`
- Twitter: `https://twitter.com/intent/tweet?text={title}&url={encoded}`
- WhatsApp: `https://wa.me/?text={title}%20{encoded}`
- Medium: copy `{title}\n\n{body}\n\nRead full article: {url}` to clipboard + toast
- Copy Link: `navigator.clipboard.writeText(url)` + toast

## SEO
BlogSingle: `type="article"`, image from cover_image_url
Blog index: `type="website"`

## Output
Two page files. TOC must highlight correctly as user scrolls. RichTextRenderer must render TipTap JSON content.
