# /deh-polish

Final polish pass — SEO audit, responsive fixes, animations, and deployment prep.

## SEO audit
Verify every page has `<SEOHead>` with:
- Unique `title` (page-specific)
- `description` 150–160 chars
- `image` — use cover/thumbnail URL for content pages, default OG image for static pages
- `path` — page URL for canonical
- `type` — "article" for blog posts, "video" for video pages, "website" for others

Pages to audit: Home, About, Services, BookConsultation, BookTraining, Videos, VideoSingle, Blog, BlogSingle, Contact, NotFound

## Skeleton loader audit
Every component that fetches Supabase data must show `<SkeletonLoader>` while loading and `<EmptyState>` when empty:
- Home: video grid, blog grid
- Videos: video grid
- VideoSingle: full page skeleton on load
- Blog: blog grid
- BlogSingle: full page skeleton on load
- AdminOverview: stat cards

## Toast audit
Every user action that changes data must have a toast:
- Form submits (booking, contact, newsletter): success or error
- Share actions (copy link, copy for Medium): success
- Admin actions (publish, save, delete): success
- Auth: sign in error, sign out success

## Framer Motion audit
All pages: wrapped in `<PageTransition>` (opacity 0→1, y 14→0, 0.28s).
Hero sections: `motion.div` with stagger variants (staggerChildren:0.1, each child fadeUp: y 20→0, 0.5s).
Cards/grids: `whileInView` with `viewport={{ once: true }}`, staggerChildren:0.05.
Cards hover: `whileHover={{ y: -4 }}` via Framer Motion (not CSS transforms).

## Responsive audit
Test breakpoints: 375px (mobile), 640px (sm), 768px (md), 1024px (lg), 1280px (xl).
Common fixes:
- Admin sidebar: hidden on mobile, convert to hamburger or bottom nav
- Blog/Video single: TOC sidebar hidden below lg, shown inline at top on mobile
- Tables: wrap in `overflow-x-auto`
- TipTap toolbar: ensure buttons wrap correctly at small widths
- Footer: 3-col → 1-col stack on mobile
- Hero: 2-col → 1-col stack, image appears below text on mobile

## Deployment prep
1. `public/_redirects` with `/* /index.html 200` (Netlify SPA routing)
2. `public/favicon.svg` — inline SVG of the bar chart logo mark
3. `vite.config.js` build.rollupOptions.output.manualChunks:
   ```js
   { vendor: ['react','react-dom','react-router-dom'], editor: ['@tiptap/react','@tiptap/starter-kit'], motion: ['framer-motion'] }
   ```
4. Run `npm run build` — must pass with 0 errors

## Dark mode audit
All hardcoded colors (bg-white, text-black, bg-gray-100 etc.) must use CSS variables instead:
- Surfaces: `var(--color-surface)` or `var(--color-surface-alt)` or `var(--color-card)`
- Text: `var(--color-text-base)` or `var(--color-text-muted)`
- Borders: `var(--color-border)`
Teal and gold are fixed colors — they stay the same in dark mode.

## Output
Clean `npm run build` output with 0 errors. Confirm each audit item above is addressed.
