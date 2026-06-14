# /deh-agent-supabase-setup

Agent that walks through the complete Supabase backend setup and verifies everything is wired correctly.

## What this agent does
1. Reads `supabase-schema.sql` and confirms all tables, indexes, RLS policies, and RPC functions are present
2. Reads `.env` and checks if `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are filled in (not placeholder values)
3. If `.env` has real values: tests the connection by calling `supabase.from('videos').select('count')` 
4. Reports which tables exist and which are missing
5. Reminds about Storage bucket creation (manual step in dashboard)
6. Reminds about admin user creation (manual step in dashboard)

## Setup checklist the agent verifies
- [ ] `.env` has real `VITE_SUPABASE_URL` (not placeholder)
- [ ] `.env` has real `VITE_SUPABASE_ANON_KEY` (not placeholder)
- [ ] `supabase-schema.sql` file exists in project root
- [ ] All 8 tables defined in SQL: bookings, videos, video_comments, blog_posts, blog_comments, testimonials, newsletter_subscribers, contact_messages
- [ ] RLS enabled + policies on all tables
- [ ] `increment_view_count` RPC function defined
- [ ] Storage buckets mentioned in SQL comments: video-thumbnails, blog-covers, video-files, resources

## Manual steps reminder
These CANNOT be automated — must be done in Supabase Dashboard:
1. Create project at supabase.com (choose EU or closest region to Nigeria)
2. Copy URL + anon key → paste into `.env`
3. Run `supabase-schema.sql` in SQL Editor
4. Create storage buckets: video-thumbnails (public), blog-covers (public), video-files (public), resources (private)
5. Add storage policies for each public bucket (SELECT + INSERT for authenticated)
6. Authentication → Users → Add User (email + password for admin login)
7. Authentication → Settings → disable public signups

## Output
Checklist status: ✅ or ❌ for each item. Clear next steps for anything missing.
