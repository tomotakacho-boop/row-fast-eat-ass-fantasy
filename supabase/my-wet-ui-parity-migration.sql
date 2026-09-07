-- Social tables used by the My Wet UI parity build.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(), channel text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text not null, content text not null default '', media_url text,
  parent_id uuid references public.messages(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.message_reactions (
  id uuid primary key default gen_random_uuid(), message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade, emoji text not null,
  display_name text, created_at timestamptz not null default now(),
  unique(message_id,user_id,emoji)
);
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;
drop policy if exists messages_read on public.messages;
drop policy if exists messages_write on public.messages;
drop policy if exists message_reactions_read on public.message_reactions;
drop policy if exists message_reactions_write on public.message_reactions;
create policy messages_read on public.messages for select using (public.is_allowed_league_member());
create policy messages_write on public.messages for all using (auth.uid() = user_id and public.is_allowed_league_member()) with check (auth.uid() = user_id and public.is_allowed_league_member());
create policy message_reactions_read on public.message_reactions for select using (public.is_allowed_league_member());
create policy message_reactions_write on public.message_reactions for all using (auth.uid() = user_id and public.is_allowed_league_member()) with check (auth.uid() = user_id and public.is_allowed_league_member());
grant select,insert,update,delete on public.messages, public.message_reactions to authenticated;
notify pgrst, 'reload schema';
