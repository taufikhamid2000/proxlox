-- Fixes a real bug found while testing Phase 1's escrow flow: the
-- UPDATE policies from 0003 checked "auth.uid() = shopper_id" (or
-- user_id) with no restriction on the row's *current* status, so a
-- shopper could revert an already-released request back to 'claimed'
-- (or a buyer could re-cancel a released one) — RLS let anyone touch a
-- row forever just for owning/claiming it, even after it reached a
-- terminal state. Fix: USING now also requires the current status be
-- one of the states that role is actually allowed to act from, so
-- released/cancelled/disputed rows become read-only to everyone except
-- future admin tooling.

drop policy if exists "Buyers can cancel or confirm their own requests" on public.personal_shopper_requests;
create policy "Buyers can cancel or confirm their own requests"
  on public.personal_shopper_requests for update
  using (auth.uid() = user_id and status in ('requested', 'delivered'))
  with check (auth.uid() = user_id and status in ('cancelled', 'released', 'disputed'));

drop policy if exists "Shoppers can claim or progress requests" on public.personal_shopper_requests;
create policy "Shoppers can claim or progress requests"
  on public.personal_shopper_requests for update
  using (
    (auth.uid() = shopper_id and status in ('claimed', 'purchased', 'delivered'))
    or (status = 'requested' and shopper_id is null)
  )
  with check (auth.uid() = shopper_id and status in ('claimed', 'purchased', 'delivered', 'disputed'));
