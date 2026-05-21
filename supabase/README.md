# Supabase schema for Forge QA

Tables live in the default **`public`** schema (standard Supabase / PostgREST setup).

## Tables

| Table | Used by | Columns written by the app |
|-------|---------|----------------------------|
| `early_access_requests` | `EmailCapture.tsx`, `PitchDeck.tsx` (contact slide) | `email`, `workflow` |
| `feedback` | `FeedbackModal.tsx` | `rating`, `likes`, `dislikes` |

Both tables also have `id` (uuid) and `created_at` (timestamptz), set by the database.

## Local setup

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli).
2. From the repo root:

   ```bash
   supabase start
   supabase db reset
   ```

3. Point `.env` at the local API (printed by `supabase status`):

   ```
   VITE_SUPABASE_URL=http://127.0.0.1:54321
   VITE_SUPABASE_ANON_KEY=<anon key from supabase status>
   ```

## Hosted project

1. Link the project: `supabase link --project-ref <your-ref>`
2. Push migrations: `supabase db push`
3. Set production `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel (or your host).

## RLS

- **anon**: `INSERT` on both tables; `SELECT` only on rows created in the last 5 minutes (so `.insert().select()` works without opening full table reads).
- **service_role**: full access for admin/scripts.

To tighten anon `SELECT` later, remove `.select()` from the client inserts and drop the “recent” select policies.
