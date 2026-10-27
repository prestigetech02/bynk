# BYNK Advisory

Next.js site for BYNK Advisory: strategic advisory for financial institutions and fintech companies navigating technology, innovation, and complex disputes.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (Auth, Postgres, Realtime) for admin inbox + live chat

## Brand

Logo-derived palette and company copy live in `src/lib/brand.ts` and `src/app/globals.css`. Logo asset: `public/bynk-logo.jpg`.

## Develop

```bash
npm run dev
```

```bash
npm run build
npm start
```

## Supabase admin + live chat

1. Create a project in [Supabase](https://supabase.com) (or use your existing one).
2. Copy `.env.local.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In the Supabase SQL editor, run [`supabase/schema.sql`](supabase/schema.sql).
4. Confirm Realtime is enabled for `chat_sessions` and `chat_messages` (the SQL adds them to `supabase_realtime`).
5. In **Authentication → Users**, create at least one user. Any authenticated user can sign in at `/admin/login`.

### What you get

| Route | Purpose |
|-------|---------|
| `/admin/login` | Email/password sign-in |
| `/admin/contacts` | Contact + service form submissions |
| `/admin/chat` | Live chat sessions, takeover, and agent replies |

Visitors can use **Talk to a person** in the site chat widget. Sessions move to `waiting`; an agent **Take over**s in `/admin/chat` and replies appear live for the visitor.
