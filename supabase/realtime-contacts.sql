-- Run if you already applied schema.sql earlier and need contact notifications.
alter table public.contact_submissions replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.contact_submissions;
  exception
    when duplicate_object then null;
  end;
end $$;
