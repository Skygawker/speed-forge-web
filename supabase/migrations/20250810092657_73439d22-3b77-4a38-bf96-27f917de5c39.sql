-- Create table for editable site texts
create table if not exists public.cms_texts (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  page text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.cms_texts enable row level security;

-- Function to auto-update updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at on cms_texts
create trigger update_cms_texts_updated_at
before update on public.cms_texts
for each row execute function public.update_updated_at_column();

-- Policies
-- Public (anon + authenticated) can read
create policy if not exists "Public can read cms_texts"
  on public.cms_texts
  for select
  to public
  using (true);

-- Only the admin email can write
create policy if not exists "Admin can insert cms_texts"
  on public.cms_texts
  for insert
  to authenticated
  with check ((auth.jwt() ->> 'email') = '2b2tboy@gmail.com');

create policy if not exists "Admin can update cms_texts"
  on public.cms_texts
  for update
  to authenticated
  using ((auth.jwt() ->> 'email') = '2b2tboy@gmail.com')
  with check ((auth.jwt() ->> 'email') = '2b2tboy@gmail.com');

create policy if not exists "Admin can delete cms_texts"
  on public.cms_texts
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = '2b2tboy@gmail.com');