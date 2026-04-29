-- =====================================================
-- Solo Buenas Noticias - Supabase Schema
-- Run this in: https://app.supabase.com/project/_/sql
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- News table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.news (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  description  TEXT,
  content      TEXT,
  image_url    TEXT,
  original_url TEXT NOT NULL,
  source       TEXT NOT NULL,
  category     TEXT NOT NULL,
  is_featured  BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 day')
);

-- Prevent duplicate articles
CREATE UNIQUE INDEX IF NOT EXISTS idx_news_original_url
  ON public.news (original_url);

-- Fast queries by category
CREATE INDEX IF NOT EXISTS idx_news_category
  ON public.news (category);

-- Fast queries for featured news
CREATE INDEX IF NOT EXISTS idx_news_featured
  ON public.news (is_featured)
  WHERE is_featured = TRUE;

-- Fast queries ordered by date
CREATE INDEX IF NOT EXISTS idx_news_created_at
  ON public.news (created_at DESC);

-- Fast cleanup queries
CREATE INDEX IF NOT EXISTS idx_news_expires_at
  ON public.news (expires_at);

-- =====================================================
-- Row Level Security
-- =====================================================
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Public can read all news (no auth required)
CREATE POLICY "Public can read news"
  ON public.news
  FOR SELECT
  USING (true);

-- Only service role can insert/update/delete
-- (the app uses SUPABASE_SERVICE_ROLE_KEY for writes)

-- =====================================================
-- Optional: Auto-cleanup via pg_cron (Supabase Pro only)
-- If you're on the free plan, the Vercel cron handles this.
-- =====================================================
-- SELECT cron.schedule(
--   'delete-expired-news',
--   '5 0 * * *',
--   $$ DELETE FROM public.news WHERE expires_at < NOW() $$
-- );
