-- Nigeria 2027 Political Compass — Supabase Schema
-- Run this in the Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── CANDIDATES ────────────────────────────────────────────────────────────────
create table if not exists candidates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  party           text not null,
  age             integer,
  state_of_origin text,
  description     text,
  image_url       text,
  created_at      timestamptz default now()
);

create index if not exists candidates_slug_idx on candidates (slug);

-- ─── CLAIMS ─────────────────────────────────────────────────────────────────────
create table if not exists claims (
  id                uuid primary key default gen_random_uuid(),
  candidate_id      uuid not null references candidates(id) on delete cascade,
  type              text not null check (type in ('strength', 'weakness', 'controversy')),
  title             text not null,
  description       text,
  category          text not null check (category in (
                      'economy', 'governance', 'corruption', 'education',
                      'security', 'infrastructure', 'foreign-policy',
                      'health', 'democracy', 'social'
                    )),
  credibility_score integer not null check (credibility_score between 1 and 10),
  weight            integer not null check (weight between 1 and 5),
  read_more_url     text,
  created_at        timestamptz default now()
);

create index if not exists claims_candidate_idx on claims (candidate_id);
create index if not exists claims_type_idx on claims (type);

-- ─── PROOF LINKS ────────────────────────────────────────────────────────────────
create table if not exists proof_links (
  id         uuid primary key default gen_random_uuid(),
  claim_id   uuid not null references claims(id) on delete cascade,
  title      text not null,
  url        text not null,
  created_at timestamptz default now()
);

create index if not exists proof_links_claim_idx on proof_links (claim_id);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────────────────────────
-- Public read access for all tables
alter table candidates  enable row level security;
alter table claims      enable row level security;
alter table proof_links enable row level security;

create policy "public_read_candidates"  on candidates  for select using (true);
create policy "public_read_claims"      on claims      for select using (true);
create policy "public_read_proof_links" on proof_links for select using (true);

-- Service role can write (used by admin API routes)
create policy "service_write_candidates"  on candidates  for all using (auth.role() = 'service_role');
create policy "service_write_claims"      on claims      for all using (auth.role() = 'service_role');
create policy "service_write_proof_links" on proof_links for all using (auth.role() = 'service_role');


-- ─── SENTIMENT FEATURE ────────────────────────────────────────────────────────

create table if not exists sentiments (
  id           uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  text         text not null,
  sentiment    text not null check (sentiment in ('positive', 'negative', 'neutral')),
  source       text not null default 'simulated',
  score        numeric(4,3),   -- -1.0 to 1.0
  created_at   timestamptz default now()
);
create index if not exists sentiments_candidate_idx on sentiments (candidate_id);
create index if not exists sentiments_created_idx   on sentiments (created_at desc);

create table if not exists sentiment_daily_summary (
  id               uuid primary key default gen_random_uuid(),
  candidate_id     uuid not null references candidates(id) on delete cascade,
  date             date not null,
  positive_count   integer not null default 0,
  negative_count   integer not null default 0,
  neutral_count    integer not null default 0,
  total_count      integer not null default 0,
  sentiment_score  numeric(5,3),   -- (pos - neg) / total
  created_at       timestamptz default now(),
  unique (candidate_id, date)
);
create index if not exists sds_candidate_date_idx on sentiment_daily_summary (candidate_id, date desc);

-- RLS
alter table sentiments              enable row level security;
alter table sentiment_daily_summary enable row level security;

create policy "public_read_sentiments"    on sentiments              for select using (true);
create policy "public_read_sds"           on sentiment_daily_summary for select using (true);
create policy "service_write_sentiments"  on sentiments              for all    using (auth.role()='service_role');
create policy "service_write_sds"         on sentiment_daily_summary for all    using (auth.role()='service_role');
