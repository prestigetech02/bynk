-- BYNK Advisory: contact submissions + live chat
-- Run in the Supabase SQL editor, then enable Realtime for chat tables
-- (Database → Replication → supabase_realtime, or the ALTER below).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Contact / service form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null default '',
  message text not null,
  source text not null default 'contact'
    check (source in ('contact', 'service')),
  service_slug text,
  status text not null default 'new'
    check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- ---------------------------------------------------------------------------
-- Live chat
-- ---------------------------------------------------------------------------
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_key text not null,
  status text not null default 'bot'
    check (status in ('bot', 'waiting', 'human', 'closed')),
  assigned_agent_id uuid references auth.users (id) on delete set null,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists chat_sessions_visitor_key_open_idx
  on public.chat_sessions (visitor_key)
  where status in ('bot', 'waiting', 'human');

create index if not exists chat_sessions_status_idx
  on public.chat_sessions (status);

create index if not exists chat_sessions_last_message_at_idx
  on public.chat_sessions (last_message_at desc);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'agent', 'system')),
  body text not null,
  agent_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_id_created_at_idx
  on public.chat_messages (session_id, created_at);

create or replace function public.set_chat_session_updated_at()
returns trigger
language plpgsql
as $$
begin
  update public.chat_sessions
  set
    updated_at = now(),
    last_message_at = now()
  where id = new.session_id;
  return new;
end;
$$;

drop trigger if exists chat_messages_touch_session on public.chat_messages;
create trigger chat_messages_touch_session
  after insert on public.chat_messages
  for each row
  execute function public.set_chat_session_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.contact_submissions enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Contact submissions: anyone can submit; authenticated users manage inbox
drop policy if exists "Anyone can insert contact submissions"
  on public.contact_submissions;
create policy "Anyone can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can read contact submissions"
  on public.contact_submissions;
create policy "Authenticated users can read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update contact submissions"
  on public.contact_submissions;
create policy "Authenticated users can update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

-- Chat sessions: visitors create/update their own open session by visitor_key;
-- authenticated agents can manage all sessions.
drop policy if exists "Anyone can create chat sessions"
  on public.chat_sessions;
create policy "Anyone can create chat sessions"
  on public.chat_sessions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Visitors can read own chat sessions"
  on public.chat_sessions;
create policy "Visitors can read own chat sessions"
  on public.chat_sessions
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Visitors can update own open sessions"
  on public.chat_sessions;
create policy "Visitors can update own open sessions"
  on public.chat_sessions
  for update
  to anon
  using (status in ('bot', 'waiting', 'human'))
  with check (status in ('bot', 'waiting', 'human', 'closed'));

drop policy if exists "Authenticated users can update chat sessions"
  on public.chat_sessions;
create policy "Authenticated users can update chat sessions"
  on public.chat_sessions
  for update
  to authenticated
  using (true)
  with check (true);

-- Chat messages
drop policy if exists "Anyone can insert chat messages"
  on public.chat_messages;
create policy "Anyone can insert chat messages"
  on public.chat_messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can read chat messages"
  on public.chat_messages;
create policy "Anyone can read chat messages"
  on public.chat_messages
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Realtime
-- ---------------------------------------------------------------------------
alter table public.contact_submissions replica identity full;
alter table public.chat_sessions replica identity full;
alter table public.chat_messages replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.contact_submissions;
  exception
    when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.chat_sessions;
  exception
    when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.chat_messages;
  exception
    when duplicate_object then null;
  end;
end $$;
