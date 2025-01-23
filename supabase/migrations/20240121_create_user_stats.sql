-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create user_stats table
create table if not exists public.user_stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  score integer default 0,
  usage integer default 0,
  assignments_completed integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
alter table public.user_stats enable row level security;

-- Create policies
create policy "Users can view their own stats"
  on public.user_stats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own stats"
  on public.user_stats for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own stats"
  on public.user_stats for update
  using (auth.uid() = user_id);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
drop trigger if exists handle_updated_at on public.user_stats;
create trigger handle_updated_at
  before update on public.user_stats
  for each row
  execute procedure public.handle_updated_at();
