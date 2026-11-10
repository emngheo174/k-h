-- Chung Đôi — wedding invitation backend schema (Supabase / Postgres).
-- Run this once in the Supabase SQL Editor (Dashboard → SQL → New query).
--
-- `side` records who invited the guest, derived from the page URL:
--   'groom' = nhà trai (routes "/" and "/chu-re")
--   'bride' = nhà gái  (route "/co-dau")

create table if not exists public.rsvps (
  id         uuid        primary key default gen_random_uuid(),
  side       text        not null check (side in ('groom', 'bride')),
  name       text        not null,
  attending  boolean     not null,
  guests     integer     not null default 1 check (guests between 1 and 20),
  message    text        not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id         uuid        primary key default gen_random_uuid(),
  side       text        not null check (side in ('groom', 'bride')),
  name       text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx  on public.rsvps  (created_at desc);
create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

-- The app talks to Supabase only from the server using the service-role key,
-- which bypasses Row Level Security. Enable RLS and add NO public policies so
-- the anon/public key cannot read or write these tables directly.
alter table public.rsvps  enable row level security;
alter table public.wishes enable row level security;
