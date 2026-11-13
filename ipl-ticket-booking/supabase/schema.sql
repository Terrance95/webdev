-- ====================================================================
-- IPL TICKET BOOKING — GUEST & PUBLIC READY SUPABASE SCHEMA
-- (Run this script in your Supabase SQL Editor)
-- ====================================================================

-- 1. Create table if it doesn't exist
create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  user_id uuid default gen_random_uuid(),
  customer_name text not null,
  email text,
  phone text,
  match_name text not null,
  match_date text not null,
  venue text not null,
  ticket_count integer not null check (ticket_count > 0),
  stand text not null,
  amount integer not null check (amount >= 0),
  created_at timestamptz not null default now()
);

-- 2. If table already exists from previous setup, ensure missing columns are added
alter table public.bookings add column if not exists user_id uuid default gen_random_uuid();
alter table public.bookings add column if not exists email text;
alter table public.bookings add column if not exists phone text;

-- 3. Make user_id nullable so guest checkout without sign-in works flawlessly
do $$
begin
  alter table public.bookings alter column user_id drop not null;
exception
  when others then null;
end $$;

-- 4. Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- 5. Drop any old restrictive policies
drop policy if exists "Users can create their own bookings" on public.bookings;
drop policy if exists "Users can view their own bookings" on public.bookings;
drop policy if exists "Allow guest insert" on public.bookings;
drop policy if exists "Allow guest select" on public.bookings;

-- 6. Create policies allowing public/guest bookings and viewing
create policy "Allow guest insert"
  on public.bookings
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow guest select"
  on public.bookings
  for select
  to anon, authenticated
  using (true);

-- 7. Grant permissions to anon and authenticated roles
grant usage on schema public to anon, authenticated;
grant select, insert on public.bookings to anon, authenticated;
grant usage, select on sequence public.bookings_id_seq to anon, authenticated;
