-- Clean up custom schema if an earlier migration created it
DROP TABLE IF EXISTS "forge-qa".early_access_requests CASCADE;
DROP TABLE IF EXISTS "forge-qa".feedback CASCADE;
DROP SCHEMA IF EXISTS "forge-qa" CASCADE;

-- Ensure public tables exist (safe if init migration already created them)
CREATE TABLE IF NOT EXISTS public.early_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  workflow text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 10),
  likes text,
  dislikes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.early_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_early_access_requests" ON public.early_access_requests;
DROP POLICY IF EXISTS "anon_insert_feedback" ON public.feedback;
DROP POLICY IF EXISTS "anon_select_early_access_requests_recent" ON public.early_access_requests;
DROP POLICY IF EXISTS "anon_select_feedback_recent" ON public.feedback;
DROP POLICY IF EXISTS "service_role_all_early_access_requests" ON public.early_access_requests;
DROP POLICY IF EXISTS "service_role_all_feedback" ON public.feedback;

CREATE POLICY "anon_insert_early_access_requests"
  ON public.early_access_requests FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_insert_feedback"
  ON public.feedback FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_select_early_access_requests_recent"
  ON public.early_access_requests FOR SELECT TO anon
  USING (created_at >= (now() - interval '5 minutes'));

CREATE POLICY "anon_select_feedback_recent"
  ON public.feedback FOR SELECT TO anon
  USING (created_at >= (now() - interval '5 minutes'));

CREATE POLICY "service_role_all_early_access_requests"
  ON public.early_access_requests FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "service_role_all_feedback"
  ON public.feedback FOR ALL TO service_role
  USING (true) WITH CHECK (true);

GRANT INSERT, SELECT ON public.early_access_requests TO anon;
GRANT INSERT, SELECT ON public.feedback TO anon;
GRANT ALL ON public.early_access_requests TO service_role;
GRANT ALL ON public.feedback TO service_role;
