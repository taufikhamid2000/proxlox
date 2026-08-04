-- profiles and resources buckets were never created either — confirmed
-- via the Storage API returning only a pre-existing, unrelated
-- "backdrops" bucket. This has made settings.tsx's avatar upload and
-- resources.tsx's file list/upload silently fail (alert() only fires
-- on the error path, so it degrades to "nothing happens" rather than a
-- crash) this whole time.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profiles', 'profiles', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit)
values ('resources', 'resources', true, 20971520)
on conflict (id) do nothing;

-- Kept simple (any authenticated user can upload/update within either
-- bucket, no per-owner path enforcement) matching the rest of this
-- app's current security posture — avatar filenames are
-- `avatars/{uid}.{ext}` and resource filenames embed a uid + timestamp,
-- so guessing another user's exact path to overwrite it isn't
-- practical, but this isn't hardened against a determined actor.
drop policy if exists "Authenticated users can upload to profiles" on storage.objects;
create policy "Authenticated users can upload to profiles"
  on storage.objects for insert
  with check (bucket_id = 'profiles' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update profiles objects" on storage.objects;
create policy "Authenticated users can update profiles objects"
  on storage.objects for update
  using (bucket_id = 'profiles' and auth.role() = 'authenticated')
  with check (bucket_id = 'profiles' and auth.role() = 'authenticated');

drop policy if exists "Public can view profiles objects" on storage.objects;
create policy "Public can view profiles objects"
  on storage.objects for select
  using (bucket_id = 'profiles');

drop policy if exists "Authenticated users can upload to resources" on storage.objects;
create policy "Authenticated users can upload to resources"
  on storage.objects for insert
  with check (bucket_id = 'resources' and auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update resources objects" on storage.objects;
create policy "Authenticated users can update resources objects"
  on storage.objects for update
  using (bucket_id = 'resources' and auth.role() = 'authenticated')
  with check (bucket_id = 'resources' and auth.role() = 'authenticated');

drop policy if exists "Public can view resources objects" on storage.objects;
create policy "Public can view resources objects"
  on storage.objects for select
  using (bucket_id = 'resources');
