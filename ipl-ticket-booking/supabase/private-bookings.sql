begin;

alter table public.bookings
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

create index if not exists bookings_user_id_created_at_idx
  on public.bookings (user_id, created_at desc);

alter table public.bookings enable row level security;

do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'public' and tablename = 'bookings'
  loop
    execute format('drop policy %I on public.bookings', existing_policy.policyname);
  end loop;
end;
$$;

revoke all on public.bookings from public, anon, authenticated;
grant select, insert on public.bookings to authenticated;
revoke all on sequence public.bookings_id_seq from public, anon, authenticated;
grant usage, select on sequence public.bookings_id_seq to authenticated;

create policy "Users can create their own bookings"
  on public.bookings
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can view their own bookings"
  on public.bookings
  for select
  to authenticated
  using (auth.uid() = user_id);

commit;
