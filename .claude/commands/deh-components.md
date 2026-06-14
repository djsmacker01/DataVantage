# /deh-components

Build the complete shared component library used across all pages.

## Files to create

### `src/components/ui/Button.jsx`
Props: `variant` (primary|accent|secondary|ghost|muted), `size` (sm|md|lg), `to` (react-router Link), `href` (external <a>), `fullWidth`, `disabled`, `onClick`.
- primary: teal bg, white text
- accent: gold bg, white text
- secondary: transparent bg, teal border+text
- ghost: transparent bg, border-color border, base text
- muted: surface-alt bg, base text
All variants: rounded-xl, font-semibold, hover:opacity-90, active:scale-[0.98]

### `src/components/ui/SkeletonLoader.jsx`
`type` prop: 'card' | 'text' | 'avatar' | 'table-row'
`count` prop: number of skeletons to render
- card: grid 1/2/3 cols with animate-pulse, aspect-video top + text lines below
- text: stacked lines, last line 60% width
- avatar: circle + 2 lines
- table-row: horizontal flex of equal-width lines

### `src/components/ui/EmptyState.jsx`
Props: `icon` (Lucide), `title`, `description`, `actionLabel`, `onAction`
Centered block: teal icon box + heading (Instrument Serif) + muted desc + optional CTA button

### `src/components/cards/VideoCard.jsx`
Props: `video` object
Layout: 16:9 thumbnail with duration badge overlay (bottom-right, dark bg) + play icon overlay on hover (scale + teal tint) + category pill + title (line-clamp-2) + meta row (eye icon + views, relative date).
Framer Motion `whileHover={{ y: -4 }}`
Links to `/videos/:slug`

### `src/components/cards/BlogCard.jsx`
Props: `post` object, `featured` boolean
Normal: vertical card — 16:9 cover + category pill + title (Instrument Serif) + excerpt (line-clamp-2) + read time + date
Featured: horizontal 2-col layout — cover left, full content right with larger title and "Read more →" arrow link
Framer Motion `whileHover={{ y: -3 }}`

### `src/components/forms/BookingForm.jsx`
Props: `defaultService` (pre-selects service type dropdown)
Fields: Full Name, Email, Phone (default value "+234 "), Service Type (dropdown: consultation|training|data_analysis|business_analysis|data_engineering), Preferred Date (min=today), Preferred Time (dropdown: 9AM–5PM WAT slots), Message textarea.
On submit: `useCreateBooking()` hook → inserts to Supabase → shows animated success state (CheckCircle + "Your session is booked!" + next steps)
Gold submit button.

### `src/components/blog/CommentSection.jsx`
Props: `table`, `resourceId`, `resourceField`
Shared by both blog posts and videos.
- Fetches top-level comments (parent_id IS NULL) + replies grouped under parents
- 1-level threading: replies indented with left border line
- Comment form: name, email, body (no auth required)
- Reply button on each comment toggles inline reply form
- Avatar: colored circle with first letter of name
- Timestamps: relative (date-fns formatDistanceToNow)

### `src/components/blog/ShareTray.jsx`
Props: `url`, `title`, `body`
Buttons: LinkedIn (window.open share URL), Twitter/X (intent/tweet), WhatsApp (wa.me), Medium (copies text to clipboard + toast), Copy Link (clipboard + toast)
Compact horizontal row, icon + label on sm+ screens.

### `src/components/blog/RichTextRenderer.jsx`
Props: `content` (TipTap JSON)
Uses `generateHTML(content, editorExtensions)` from `@tiptap/react`
Renders inside `<div className="prose-content">` with `dangerouslySetInnerHTML`
Must import `editorExtensions` from `@/lib/editorExtensions`

### `src/components/testimonials/TestimonialCarousel.jsx`
Fetches from Supabase `testimonials` table. Falls back to 3 hardcoded Nigerian business testimonials.
Auto-advances every 6s. AnimatePresence slide transition. Manual prev/next arrows + dot indicators.
Quote displayed in Instrument Serif italic. Name + role + company below.

### `src/components/newsletter/NewsletterSignup.jsx`
Props: `variant` ('footer' | 'section')
Inserts email to `newsletter_subscribers`. Handles 23505 duplicate gracefully (toast.info "Already subscribed!").
Section variant: larger, horizontal layout with ArrowRight icon on button.
Footer variant: compact inline.

### `src/components/video/CategoryFilter.jsx`
Props: `categories` [{value, label}], `active`, `onChange`
Horizontal scrollable pill row. Active: teal bg white text. Inactive: surface-alt bg muted text.

### `src/components/editor/TipTapToolbar.jsx`
Toolbar for TipTap editor with buttons: Undo, Redo, H1, H2, H3, Bold, Italic, Underline, Strikethrough, Highlight, AlignLeft, AlignCenter, AlignRight, BulletList, OrderedList, Blockquote, CodeBlock, Link, Image (prompt URL), Table, HorizontalRule.
Active state: teal background on button.

### `src/components/editor/TipTapEditor.jsx`
Props: `content` (JSON), `onChange` (called with JSON on each update)
Uses `editorExtensions` from `@/lib/editorExtensions` + Placeholder extension.
Renders `<TipTapToolbar editor={editor} />` above `<EditorContent />`.
Min-height 400px, prose-content class on EditorContent.

## Output
Confirm all 14 component files created. No import errors.
