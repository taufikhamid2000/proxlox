-- Phase 1 of the escrow-backed personal shopper flow: the request
-- lifecycle and RLS shape needed for buyers to post requests, shoppers
-- to claim and fulfill them, and buyers to confirm delivery — with a
-- payment_status column standing in for real Stripe Connect calls
-- until that's wired up (see src/lib/payments.ts).
--
-- Status lifecycle: requested -> claimed -> purchased -> delivered ->
-- released, with disputed as a branch off delivered. payment_status
-- mirrors the money side of that (pending/authorized/captured/
-- released/refunded) so swapping in real Stripe later only touches
-- payments.ts, not this schema or the RLS shape.

alter table public.personal_shopper_requests
  drop constraint if exists personal_shopper_requests_status_check;

alter table public.personal_shopper_requests
  add column if not exists shopper_id uuid references auth.users (id) on delete set null,
  add column if not exists budget numeric,
  add column if not exists proof_url text,
  add column if not exists payment_status text not null default 'pending'
    check (payment_status in ('pending', 'authorized', 'captured', 'released', 'refunded')),
  add column if not exists claimed_at timestamptz,
  add column if not exists purchased_at timestamptz,
  add column if not exists delivered_at timestamptz,
  add column if not exists released_at timestamptz;

alter table public.personal_shopper_requests
  add constraint personal_shopper_requests_status_check
  check (status in ('requested', 'claimed', 'purchased', 'delivered', 'disputed', 'released', 'cancelled'));

alter table public.personal_shopper_requests
  alter column status set default 'requested';

create index if not exists personal_shopper_requests_shopper_id_idx
  on public.personal_shopper_requests (shopper_id);

create index if not exists personal_shopper_requests_status_idx
  on public.personal_shopper_requests (status);

-- Replace the old owner-only read policy: buyers see their own
-- requests, shoppers see requests they've claimed, and everyone
-- authenticated can browse the open ("requested") pool to pick one up.
drop policy if exists "Users can read their own requests" on public.personal_shopper_requests;
create policy "Requests are visible to buyer, claimant, or as open pool"
  on public.personal_shopper_requests for select
  using (
    auth.uid() = user_id
    or auth.uid() = shopper_id
    or status = 'requested'
  );

-- Buyers can update their own request only to cancel it (any other
-- transition is a shopper or system action) or confirm delivery
-- (delivered -> released).
drop policy if exists "Buyers can cancel or confirm their own requests" on public.personal_shopper_requests;
create policy "Buyers can cancel or confirm their own requests"
  on public.personal_shopper_requests for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and status in ('cancelled', 'released', 'disputed'));

-- Shoppers: one policy covering both claiming an open request
-- (requested -> claimed, attaching themselves) and progressing a
-- request they've already claimed. Kept as a single policy (rather
-- than split claim/progress policies) so USING and WITH CHECK stay
-- paired instead of relying on Postgres's OR-across-policies semantics
-- for something this security-sensitive.
drop policy if exists "Shoppers can claim open requests" on public.personal_shopper_requests;
drop policy if exists "Shoppers can progress their claimed requests" on public.personal_shopper_requests;
create policy "Shoppers can claim or progress requests"
  on public.personal_shopper_requests for update
  using (auth.uid() = shopper_id or (status = 'requested' and shopper_id is null))
  with check (auth.uid() = shopper_id and status in ('claimed', 'purchased', 'delivered', 'disputed'));

-- Known limitation (fine while payment_status can't reach 'captured'
-- without a real Stripe charge, tightened before real money moves):
-- Postgres ORs together WITH CHECK across all permissive policies for
-- the same command rather than pairing each with the USING clause that
-- admitted the row, so a buyer could technically set shopper_id to
-- themselves and self-claim their own request. Harmless today since
-- there's no payment capture to exploit yet; revisit with a single
-- combined policy (or a plpgsql check) before Phase 1's mocked
-- payment_status is replaced with real Stripe Connect calls.
