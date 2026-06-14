# /deh-homepage

Build the full Homepage (`src/pages/Home.jsx`) with all 7 sections.

## Design context
Brand: teal #01696f, gold #D19900, Instrument Serif (display), General Sans (body)
All sections use `<PageTransition>` wrapper. Include `<SEOHead>` at top.

## Section 1 — Hero
Layout: 2-column on desktop (text left, headshot right). Stacked on mobile.
- "Available for new projects" badge — teal pill with pulse dot
- H1: "Nigeria's Premier Data & Business Intelligence Expert" (Instrument Serif, 4xl–6xl)
- Subheadline: 2 sentences on what she does and who she serves (General Sans, muted)
- 2 CTAs: "Book a Consultation" (accent/gold Button) + "Explore Services" (ghost Button with ArrowRight icon)
- 3 stat pills: "50+ Companies served | 200+ Professionals trained | 5+ Years expertise"
- Hero image placeholder: rounded-3xl box with teal ring border + "Available for hire" gold badge overlay at bottom-left
- Background: `grain` CSS utility class (animated noise texture overlay at 0.03 opacity)
- Entrance animation: Framer Motion stagger (staggerChildren: 0.1) on text block, slide-in from right on image

## Section 2 — Marquee
Auto-scrolling horizontal strip of skill/tool badges:
Python | SQL | Power BI | Tableau | Excel | ETL | React | PostgreSQL | dbt | BigQuery | Looker | Data Vault
CSS keyframe `@keyframes marquee { from {transform:translateX(0)} to {transform:translateX(-50%)} }`
Duplicate badge array for seamless loop. Background: surface-alt with top+bottom borders.

## Section 3 — Services Preview
4-card bento grid (2×2 on desktop):
- Data Analysis (BarChart3 icon)
- Business Analysis (Briefcase icon)
- Data Engineering (Database icon)
- Training & Workshops (GraduationCap icon)
Each card: teal icon box + title (Instrument Serif) + 2-line desc + "Learn more →" link to `/services#{id}`
Section heading with "Learn more" link to `/services`. Fade-up on scroll via `whileInView`.

## Section 4 — Featured Videos
Fetch 3 latest from Supabase `useVideos({ limit: 3 })`.
Show `<SkeletonLoader type="card" count={3} />` while loading.
3-column responsive grid of `<VideoCard />`.
"View all videos →" link to `/videos`.

## Section 5 — Latest Blog Posts
Fetch 3 latest from `useBlogPosts({ limit: 3 })`.
Skeleton loader while fetching.
3-column grid of `<BlogCard />`.
"Read all articles →" link to `/blog`.

## Section 6 — Testimonials
`<TestimonialCarousel />` component.
Section heading: "What clients say" — centered.

## Section 7 — Final CTA Banner
Full-width section with `background: #01696f`.
- Heading (H2, white, Instrument Serif): "Ready to unlock the power of your data?"
- Subtext (white, 75% opacity)
- 2 buttons: "Book 1-on-1 Consultation" (gold/accent) + "View Training Programs" (semi-white border)
`whileInView` stagger animation entrance.

## Output
Single file `src/pages/Home.jsx`. All 7 sections, fully responsive, with Supabase data fetching, skeleton loaders, and Framer Motion animations.
