-- Row Fast profile-picture storage repair
-- Run this entire file once in Supabase > SQL Editor.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-images',
  'profile-images',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "members upload own profile image" on storage.objects;
create policy "members upload own profile image" on storage.objects for insert to authenticated
  with check (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.is_allowed_league_member()
  );

drop policy if exists "members read own profile image" on storage.objects;
create policy "members read own profile image" on storage.objects for select to authenticated
  using (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.is_allowed_league_member()
  );

drop policy if exists "members update own profile image" on storage.objects;
create policy "members update own profile image" on storage.objects for update to authenticated
  using (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.is_allowed_league_member()
  )
  with check (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.is_allowed_league_member()
  );

drop policy if exists "members delete own profile image" on storage.objects;
create policy "members delete own profile image" on storage.objects for delete to authenticated
  using (
    bucket_id = 'profile-images'
    and (storage.foldername(name))[1] = auth.uid()::text
    and public.is_allowed_league_member()
  );

-- Verification: this should return one public bucket named profile-images.
select id, name, public, file_size_limit
from storage.buckets
where id = 'profile-images';
