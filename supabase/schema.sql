-- ============================================================
-- The Open Tab — members + content schema
-- Run this in Supabase: Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- 1. MEMBER PROFILES (extends Supabase's built-in auth.users)
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text,
  full_name          text,
  is_subscriber      boolean default false,          -- flipped true by the Stripe webhook
  stripe_customer_id text,
  current_period_end timestamptz,                     -- when their paid period ends
  created_at         timestamptz default now()
);

-- 2. MEMBER CONTENT POSTS (what you publish from the admin)
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  body         text,
  kind         text default 'post',   -- 'post' | 'video' | 'bts' | 'early'
  video_url    text,                  -- YouTube/Vimeo/Supabase URL for video posts
  cover_image  text,
  members_only boolean default true,  -- true = paywalled
  published    boolean default false,
  created_at   timestamptz default now()
);

-- 3. FILES attached to a post / standalone member downloads
create table if not exists public.post_files (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.posts(id) on delete cascade,
  file_path  text not null,           -- path inside the 'member-content' storage bucket
  file_name  text,
  created_at timestamptz default now()
);

-- 3b. WAITLIST (founding-member email capture, pre-launch)
create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  source     text default 'members',
  created_at timestamptz default now()
);
-- RLS on with NO policies = locked: only the server (service-role key) can
-- read/write. The /api/waitlist route inserts with the service role.
alter table public.waitlist enable row level security;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles   enable row level security;
alter table public.posts      enable row level security;
alter table public.post_files enable row level security;

-- A logged-in user can read & update only their own profile
create policy "own profile - read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile - update" on public.profiles for update using (auth.uid() = id);

-- Published posts: free posts visible to anyone; members_only visible to active subscribers
create policy "posts - public free" on public.posts for select
  using (published = true and members_only = false);

create policy "posts - members only" on public.posts for select
  using (
    published = true
    and members_only = true
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_subscriber = true
    )
  );

-- Files follow their post's visibility
create policy "files - via post" on public.post_files for select
  using (
    exists (
      select 1 from public.posts po
      where po.id = post_files.post_id
        and po.published = true
        and (
          po.members_only = false
          or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_subscriber = true)
        )
    )
  );

-- NOTE: admin writes (insert/update/delete posts + files) go through the server
-- using the SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS. No write policies needed here.

-- 4. Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
