# /deh-admin

Build the complete Admin Dashboard — login, layout, and all management views.

## Auth
Admin uses Supabase email/password auth. Must create the admin user manually in:
Supabase Dashboard → Authentication → Users → Add User

## File structure
```
src/pages/admin/
├── Admin.jsx           ← sub-router
├── AdminLogin.jsx
├── AdminLayout.jsx     ← sidebar + outlet
├── AdminOverview.jsx
├── AdminVideos.jsx
├── AdminVideoEditor.jsx
├── AdminBlog.jsx
├── AdminBlogEditor.jsx
├── AdminBookings.jsx
├── AdminComments.jsx
└── AdminSubscribers.jsx
```

## `Admin.jsx` — Sub-router
Mounts at `/admin/*`. Contains all sub-routes:
- `login` → `<AdminLogin />` (no layout wrapper)
- All others → inside `<AdminLayout />`
All views lazy-loaded.

## `AdminLogin.jsx`
Centered card with Logo + Lock icon + email/password form.
`supabase.auth.signInWithPassword(form)` → navigate('/admin') on success, toast.error on failure.

## `AdminLayout.jsx`
Fixed left sidebar (w-56) + scrollable main area:
Sidebar nav items with lucide icons:
- Overview (LayoutDashboard)
- Videos (Video)
- Blog Posts (FileText)
- Bookings (Calendar)
- Comments (MessageSquare)
- Subscribers (Users)
Active: teal bg white text. Sign Out button at bottom → `supabase.auth.signOut()` + navigate to login.

## `AdminOverview.jsx`
4 stat cards fetched in parallel via `Promise.all`:
- Pending bookings count
- Total video view_count (SUM)
- Newsletter subscribers count
- Published blog posts count
Cards: icon in colored box + big number (Instrument Serif) + label.

## `AdminVideos.jsx` — Video list table
Columns: Thumbnail+Title | Category | Views | Status badge | Actions (publish toggle, edit link, delete)
Toggle published: `supabase.update({ published: !v.published })` + optimistic UI
Delete: confirm() → delete → filter from state

## `AdminVideoEditor.jsx` — Create/Edit video
Detects edit mode from `useParams().id`.
Fields: title, slug (auto-generated from title via slugify, editable), description (textarea), YouTube URL, direct video URL, category (select), duration, tags (comma-separated), published toggle.
Thumbnail upload: file input → `supabase.storage.from('video-thumbnails').upload()` → get publicUrl → set in form.
Save: insert or update depending on mode.

## `AdminBlog.jsx` — Blog post list table
Same pattern as AdminVideos.
Columns: Title | Category | Published date | Status badge | Actions
Toggle publishes with `published_at: new Date().toISOString()` if not already set.

## `AdminBlogEditor.jsx` — Create/Edit blog post (most complex admin view)
Fields:
- title, slug (auto from title), excerpt (textarea), category, read_time_minutes (number), tags
- cover_image_url: file upload to `blog-covers` bucket
- published toggle + published_at datetime-local (shown only when published=true)
- **body**: `<TipTapEditor content={form.body} onChange={json => setForm(f => ({...f, body: json}))} />`
Tags saved as array: `form.tags.split(',').map(t => t.trim()).filter(Boolean)`

## `AdminBookings.jsx` — Bookings management
Status filter tabs: All | Pending | Confirmed | Cancelled | Completed
Table columns: Name+Email | Service type | Preferred date | Time | Status badge | Status dropdown
Status update: inline `<select>` → `supabase.update({ status })` → optimistic UI
Status colors: pending=gold, confirmed=teal, cancelled=red, completed=purple

## `AdminComments.jsx` — Moderation
Tabs: Blog Comments | Video Comments
Each comment: avatar + name + email + timestamp + parent post/video title + body text + delete button
Delete: `supabase.from(table).delete().eq('id', id)` + filter from state + toast

## `AdminSubscribers.jsx` — Newsletter list
Table: Email | Signed Up date
"Export CSV" button: builds CSV string from subscribers array, creates Blob, triggers download via `<a>` click.
Show total count in heading.

## Output
All 11 admin files created. Admin sub-router correctly mounted at `/admin/*` via `<PrivateRoute>`.
