-- ─── MIGRATION 001: Sentiment System Upgrade ─────────────────────────────────

-- 1. Add fetched_at to sentiments for 6-hour cache window tracking
alter table sentiments
  add column if not exists fetched_at timestamptz default now();

create index if not exists sentiments_fetched_idx on sentiments (fetched_at desc);

-- 2. Add normalized sentiment influence column to daily summary
alter table sentiment_daily_summary
  add column if not exists sentiment_influence numeric(5,2) default 50.0;

-- 3. candidate_scores: blended score (claims 70% + sentiment 30%)
create table if not exists candidate_scores (
  id                    uuid primary key default gen_random_uuid(),
  candidate_id          uuid not null references candidates(id) on delete cascade,
  claim_score           numeric(5,2) not null,
  sentiment_score_raw   numeric(5,3) default 0,
  sentiment_score_norm  numeric(5,2) default 50,
  final_score           numeric(5,2) not null,
  sentiment_weight      numeric(3,2) default 0.30,
  claim_weight          numeric(3,2) default 0.70,
  data_source           text default 'claims_only',
  last_sentiment_update timestamptz,
  computed_at           timestamptz default now(),
  unique (candidate_id)
);

create index if not exists candidate_scores_candidate_idx on candidate_scores (candidate_id);

alter table candidate_scores enable row level security;
create policy "public_read_scores"   on candidate_scores for select using (true);
create policy "service_write_scores" on candidate_scores for all    using (auth.role() = 'service_role');

-- 4. Cleanup function (delete sentiments older than 48h)
create or replace function cleanup_old_sentiments()
returns integer language plpgsql security definer as $$
declare deleted_count integer;
begin
  delete from sentiments where fetched_at < now() - interval '48 hours';
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

-- 5. Cache check helper
create or replace function has_fresh_sentiment(p_candidate_id uuid, p_hours integer default 6)
returns boolean language plpgsql security definer as $$
begin
  return exists (
    select 1 from sentiments
    where candidate_id = p_candidate_id
      and fetched_at > now() - (p_hours || ' hours')::interval
    limit 1
  );
end;
$$;
