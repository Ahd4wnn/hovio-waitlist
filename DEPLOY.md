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
CREATE POLICY "Allow public insert to waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Policy to block public reading of waitlist emails (protect user privacy)
CREATE POLICY "Prevent public select from waitlist"
ON public.waitlist
FOR SELECT
TO public
USING (false);

-- 4. Create a secure count view
-- Exposes ONLY the total count of registrations to the client safely bypassing RLS restrictions
CREATE OR REPLACE VIEW public.waitlist_count AS
SELECT count(*)::int AS total FROM public.waitlist;
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
