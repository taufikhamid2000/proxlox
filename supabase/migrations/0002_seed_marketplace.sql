-- Populates the marketplace browse page (src/pages/marketplace.tsx),
-- which reads product.id/name/price/image_url. No prior migration
-- created this table, so define it here too (safe if it already exists
-- via IF NOT EXISTS) and seed a handful of sample drops so the page has
-- something to show instead of "No products available yet."

create table if not exists public.marketplace (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  image_url text,
  description text,
  created_at timestamptz not null default now()
);

alter table public.marketplace enable row level security;

drop policy if exists "Anyone can view marketplace items" on public.marketplace;
create policy "Anyone can view marketplace items"
  on public.marketplace for select
  using (true);

-- Seed only if the table is empty, so re-running this migration (or a
-- prior manual seed) never duplicates rows.
insert into public.marketplace (name, price, image_url, description)
select * from (values
  ('Nebula Runner Sneakers', 189.00, 'https://placehold.co/400x300/1a1a2e/ff3ea5?text=Nebula+Runner', 'Limited-run drop, size US 6-12 available.'),
  ('Vice City Windbreaker', 129.50, 'https://placehold.co/400x300/1a1a2e/ff8a3d?text=Vice+Windbreaker', 'Reversible, holographic vice-city print.'),
  ('Neon Drop Cap', 45.00, 'https://placehold.co/400x300/1a1a2e/2dd4bf?text=Neon+Cap', 'Embroidered logo, one size fits most.'),
  ('Retro Sunset Hoodie', 98.00, 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Sunset+Hoodie', 'Heavyweight fleece, gradient print.'),
  ('Chrome Edition Backpack', 154.00, 'https://placehold.co/400x300/1a1a2e/ff3ea5?text=Chrome+Backpack', 'Water-resistant, laptop compartment.'),
  ('Arcade Glow Tee', 39.99, 'https://placehold.co/400x300/1a1a2e/ff8a3d?text=Arcade+Tee', 'Glow-in-the-dark screen print, limited stock.'),
  ('Skyline Track Pants', 84.00, 'https://placehold.co/400x300/1a1a2e/2dd4bf?text=Skyline+Pants', 'Tapered fit, side stripe detailing.'),
  ('Prism Visor Sunglasses', 62.50, 'https://placehold.co/400x300/1a1a2e/7c3aed?text=Prism+Visor', 'UV400, holographic lens.')
) as seed(name, price, image_url, description)
where not exists (select 1 from public.marketplace);
