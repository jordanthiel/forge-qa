-- Landing page early access + pitch deck contact (contact fields stored in workflow)
CREATE TABLE public.early_access_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  workflow text,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.early_access_requests IS
  'Early access signups from EmailCapture and pitch deck contact form.';
COMMENT ON COLUMN public.early_access_requests.workflow IS
  'Optional AI workflow description, or pitch-deck contact details as a single string.';

-- Product feedback modal
CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 10),
  likes text,
  dislikes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.feedback IS
  'Visitor feedback from FeedbackModal (rating 1–10).';

-- Row level security
ALTER TABLE public.early_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Anonymous site visitors may submit forms only
CREATE POLICY "anon_insert_early_access_requests"
  ON public.early_access_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_insert_feedback"
  ON public.feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- PostgREST .insert().select() requires SELECT on returned rows
CREATE POLICY "anon_select_early_access_requests_recent"
  ON public.early_access_requests
  FOR SELECT
  TO anon
  USING (created_at >= (now() - interval '5 minutes'));

CREATE POLICY "anon_select_feedback_recent"
  ON public.feedback
  FOR SELECT
  TO anon
  USING (created_at >= (now() - interval '5 minutes'));

-- Dashboard / server access
CREATE POLICY "service_role_all_early_access_requests"
  ON public.early_access_requests
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_all_feedback"
  ON public.feedback
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Table grants
GRANT INSERT, SELECT ON public.early_access_requests TO anon;
GRANT INSERT, SELECT ON public.feedback TO anon;

GRANT ALL ON public.early_access_requests TO service_role;
GRANT ALL ON public.feedback TO service_role;
