-- ============================================================
-- DATA EXPERT HUB — Supabase Schema + RLS + Storage + Functions
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- TABLES -------------------------------------------------------

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('consultation','training','data_analysis','business_analysis','data_engineering')),
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  youtube_url TEXT,
  video_url TEXT,
  duration TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES video_comments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  body JSONB,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  photo_url TEXT,
  quote TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES -------------------------------------------------------
CREATE INDEX idx_videos_slug ON videos(slug);
CREATE INDEX idx_videos_published ON videos(published);
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_video_comments_video_id ON video_comments(video_id);
CREATE INDEX idx_blog_comments_post_id ON blog_comments(post_id);

-- RLS -------------------------------------------------------
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Videos: public read published, admin all
CREATE POLICY "videos_public_read" ON videos FOR SELECT USING (published = TRUE);
CREATE POLICY "videos_admin_all" ON videos FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts: public read published, admin all
CREATE POLICY "blog_posts_public_read" ON blog_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "blog_posts_admin_all" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Video comments: public read+insert, admin delete
CREATE POLICY "video_comments_public_read" ON video_comments FOR SELECT USING (TRUE);
CREATE POLICY "video_comments_public_insert" ON video_comments FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "video_comments_admin_delete" ON video_comments FOR DELETE USING (auth.role() = 'authenticated');

-- Blog comments: public read+insert, admin delete
CREATE POLICY "blog_comments_public_read" ON blog_comments FOR SELECT USING (TRUE);
CREATE POLICY "blog_comments_public_insert" ON blog_comments FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "blog_comments_admin_delete" ON blog_comments FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials: public read, admin all
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (TRUE);
CREATE POLICY "testimonials_admin_all" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Newsletter: public insert, admin read
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "newsletter_admin_read" ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');

-- Contact: public insert, admin read
CREATE POLICY "contact_public_insert" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "contact_admin_read" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');

-- Bookings: public insert, admin all
CREATE POLICY "bookings_public_insert" ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "bookings_admin_all" ON bookings FOR ALL USING (auth.role() = 'authenticated');

-- RPC FUNCTIONS -------------------------------------------------------
CREATE OR REPLACE FUNCTION increment_view_count(video_id UUID)
RETURNS void AS $$
  UPDATE videos SET view_count = view_count + 1 WHERE id = video_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================================
-- MIGRATION: Add author fields to blog_posts
-- Run this in SQL Editor if the table already exists
-- ============================================================
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'Muminah Shehu';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_avatar_url TEXT;

-- ============================================================
-- STORAGE — Create these buckets in Supabase Dashboard → Storage
-- ============================================================
-- 1. video-thumbnails  → Public
-- 2. blog-covers       → Public
-- 3. video-files       → Public
-- 4. resources         → Private (use signed URLs)
--
-- For each public bucket, add a SELECT policy:
-- CREATE POLICY "public_read" ON storage.objects
--   FOR SELECT USING (bucket_id = '<bucket-name>');
-- CREATE POLICY "auth_upload" ON storage.objects
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = '<bucket-name>');
-- ============================================================
