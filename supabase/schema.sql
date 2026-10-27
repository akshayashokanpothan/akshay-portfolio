-- Connection Jobs Schema Migration for Supabase
-- Run this in the Supabase SQL Editor to set up tables, RLS policies, and triggers.

-- 1. Enable pgcrypto for UUID generation if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Jobs Table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  specialization TEXT,
  domain TEXT,
  team TEXT,
  seniority TEXT,
  experience_min NUMERIC,
  experience_max NUMERIC,
  experience_label TEXT,
  location TEXT NOT NULL,
  work_mode TEXT NOT NULL CHECK (work_mode IN ('On-site', 'Hybrid', 'Remote')),
  employment_type TEXT CHECK (employment_type IN ('Full-time', 'Internship', 'Contract')),
  closes_at DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Closed')),
  application_url TEXT,
  clarification_url TEXT,
  contact_email TEXT,
  summary TEXT,
  description TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  requirements JSONB DEFAULT '[]'::jsonb,
  preferred_qualifications JSONB DEFAULT '[]'::jsonb,
  portfolio_requirements JSONB DEFAULT '[]'::jsonb,
  why_join JSONB DEFAULT '[]'::jsonb,
  hiring_process JSONB DEFAULT '[]'::jsonb,
  application_instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status_closes ON public.jobs(status, closes_at);

-- 4. Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_jobs_updated_at ON public.jobs;
CREATE TRIGGER set_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 5. Admin Users Authorization Table
-- Only users listed in this table with matching auth.users id are granted admin privileges
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Helper function to check if the requesting user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE id = auth.uid()
  );
$$;

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for jobs table
-- Public Policy: Anyone (including unauthenticated visitors) can read Published jobs
DROP POLICY IF EXISTS "Public read published jobs" ON public.jobs;
CREATE POLICY "Public read published jobs"
  ON public.jobs
  FOR SELECT
  USING (status = 'Published');

-- Admin Policy: Authenticated administrators can perform all actions (SELECT, INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admin full access on jobs" ON public.jobs;
CREATE POLICY "Admin full access on jobs"
  ON public.jobs
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 9. RLS Policies for admin_users table
DROP POLICY IF EXISTS "Admin view admin_users" ON public.admin_users;
CREATE POLICY "Admin view admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR public.is_admin());
