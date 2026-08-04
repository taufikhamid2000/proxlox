-- community_posts existed in the OLD (wrong) Supabase project the app
-- used to point at, but was never migrated to this one
-- (hmkjszolqnpcsoatrgcu) — confirmed missing via a direct REST query
-- returning "relation \"public.community_posts\" does not exist"
-- while auditing every page end-to-end. This has made the Community
-- page, and the community-post counts on the dashboard/profile pages,
-- silently broken (console.error only, swallowed by the UI) this
-- whole time.

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_posts_user_id_idx on public.community_posts (user_id);
create index if not exists community_posts_created_at_idx on public.community_posts (created_at desc);

alter table public.community_posts enable row level security;

drop policy if exists "Anyone can read community posts" on public.community_posts;
create policy "Anyone can read community posts"
  on public.community_posts for select
  using (true);

drop policy if exists "Users can post as themselves" on public.community_posts;
create policy "Users can post as themselves"
  on public.community_posts for insert
  with check (auth.uid() = user_id);
