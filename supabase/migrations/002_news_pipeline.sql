-- ─── MIGRATION 002: News Ingestion + Classification Pipeline ──────────────────

-- Raw fetched articles (temporary store, 48h TTL)
create table if not exists news_articles (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  summary      text,
  link         text not null unique,         -- deduplicate by URL
  source       text not null,
  published_at timestamptz,
  fetched_at   timestamptz default now(),
  title_hash   text                          -- for fuzzy dedup
);

create index if not exists news_articles_fetched_idx   on news_articles (fetched_at desc);
create index if not exists news_articles_hash_idx      on news_articles (title_hash);
create index if not exists news_articles_published_idx on news_articles (published_at desc);

-- Classified insights (extended claims from news)
create table if not exists news_insights (
  id               uuid primary key default gen_random_uuid(),
  candidate_id     uuid not null references candidates(id) on delete cascade,
  article_id       uuid references news_articles(id) on delete set null,
  type             text not null check (type in ('strength','weakness','controversy')),
  title            text not null,      -- reason-style short title
  summary          text not null,      -- reason-style 1-2 sentence description
  source           text not null,
  source_url       text not null,
  confidence_score integer not null check (confidence_score between 1 and 10),
  created_at       timestamptz default now()
);

create index if not exists news_insights_candidate_idx  on news_insights (candidate_id);
create index if not exists news_insights_created_idx    on news_insights (created_at desc);
create index if not exists news_insights_type_idx       on news_insights (type);

-- RLS
alter table news_articles enable row level security;
alter table news_insights  enable row level security;

create policy "public_read_news_articles" on news_articles for select using (true);
create policy "public_read_news_insights" on news_insights  for select using (true);
create policy "service_write_news_articles" on news_articles for all using (auth.role()='service_role');
create policy "service_write_news_insights"  on news_insights  for all using (auth.role()='service_role');

-- Cleanup: delete news older than 48h
create or replace function cleanup_old_news()
returns integer language plpgsql security definer as $$
declare deleted_count integer;
begin
  delete from news_insights  where created_at < now() - interval '48 hours';
  delete from news_articles  where fetched_at < now() - interval '48 hours';
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;
