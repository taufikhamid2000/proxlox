-- Backs the dashboard's "Active Orders" / "Saved This Month" / "Pending
-- Requests" stat cards (src/pages/dashboard.tsx). community_posts already
-- exists and needs no migration; this repo had no supabase/ directory or
-- prior migrations, so these are created from scratch.
--
-- Run this in the Supabase SQL editor (or `supabase db push` if you use
-- the CLI) against your project. Safe to re-run: guarded with IF NOT
-- EXISTS / DROP POLICY IF EXISTS.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_name text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  amount_saved numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

create table if not exists public.personal_shopper_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_name text not null,
  status text not null default 'pending' check (status in ('pending', 'fulfilled', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists personal_shopper_requests_user_id_idx on public.personal_shopper_requests (user_id);

alter table public.orders enable row level security;
alter table public.personal_shopper_requests enable row level security;

drop policy if exists "Users can read their own orders" on public.orders;
create policy "Users can read their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own orders" on public.orders;
create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can read their own requests" on public.personal_shopper_requests;
create policy "Users can read their own requests"
  on public.personal_shopper_requests for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own requests" on public.personal_shopper_requests;
create policy "Users can insert their own requests"
  on public.personal_shopper_requests for insert
  with check (auth.uid() = user_id);
