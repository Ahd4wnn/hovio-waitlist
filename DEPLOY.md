# Hovio Waitlist - Production Deployment Guide

This document outlines the steps required to deploy the Hovio Waitlist application to production.

---

## 1. Supabase Database Setup

Run the following SQL script in your Supabase Dashboard's **SQL Editor** (`SQL Editor -> New Query`) to set up the `waitlist` table, Row-Level Security (RLS) policies, and the public view for waitlist counts.

```sql
-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  source      TEXT DEFAULT 'website',
  CONSTRAINT waitlist_email_unique UNIQUE (email),
  CONSTRAINT waitlist_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 2. Enable Row-Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Policy to allow anyone to sign up (anonymous/public INSERT)
DROP POLICY IF EXISTS "Allow public insert to waitlist" ON public.waitlist;
CREATE POLICY "Allow public insert to waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Policy to block public reading of waitlist emails (protect user privacy)
DROP POLICY IF EXISTS "Prevent public select from waitlist" ON public.waitlist;
CREATE POLICY "Prevent public select from waitlist"
ON public.waitlist
FOR SELECT
TO public
USING (false);

-- 4. Create a secure count view
-- Exposes ONLY the total count of registrations to the client safely bypassing RLS restrictions
CREATE OR REPLACE VIEW public.waitlist_count AS
SELECT count(*)::int AS total FROM public.waitlist;

-- 5. Create therapist interest registration table
-- Drop the previous therapist_applications table if you already ran it
DROP TABLE IF EXISTS public.therapist_applications;

CREATE TABLE IF NOT EXISTS public.therapist_interest (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  country         TEXT NOT NULL,
  license_type    TEXT NOT NULL,
  CONSTRAINT therapist_interest_email_unique UNIQUE (email),
  CONSTRAINT therapist_interest_email_format CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS therapist_interest_email_idx
  ON public.therapist_interest (email);
CREATE INDEX IF NOT EXISTS therapist_interest_created_at_idx
  ON public.therapist_interest (created_at DESC);

-- Enable RLS
ALTER TABLE public.therapist_interest ENABLE ROW LEVEL SECURITY;

-- Allow public therapist inserts
DROP POLICY IF EXISTS "Allow public therapist inserts" ON public.therapist_interest;
CREATE POLICY "Allow public therapist inserts"
  ON public.therapist_interest
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Deny public therapist reads
DROP POLICY IF EXISTS "Deny public therapist reads" ON public.therapist_interest;
CREATE POLICY "Deny public therapist reads"
  ON public.therapist_interest
  FOR SELECT
  TO anon
  USING (false);
```

---

## 2. Environment Configuration

Create a `.env` file in the project root directory (or define these in your production host dashboard like Netlify, Vercel, or Cloudflare Pages):

```env
VITE_SUPABASE_URL=https://your-supabase-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-public-key
```

---

## 3. Production Build & Verification

Verify the application builds successfully:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```

3. **Verify Production Bundle**:
   ```bash
   npm run build
   ```
   *The Rollup configuration split-chunks libraries like motion, supabase, and markdown to prevent large bundles and optimize load times.*

4. **Preview Build**:
   ```bash
   npm run preview
   ```
