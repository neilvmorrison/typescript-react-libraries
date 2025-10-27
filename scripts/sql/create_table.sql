create table table_name (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone,
  
  -- Basic columns
  -- name text not null,
  -- email text not null unique,
  -- description text,
  -- is_active boolean default true,
  -- priority integer default 0,
  -- metadata jsonb default '{}',
  
  -- Foreign keys
  -- user_id uuid not null references users(id) on delete cascade,
  -- team_id uuid references teams(id) on delete set null,
  
  -- Enums (requires type creation first)
  -- status status_enum default 'pending',
  -- role user_role_enum default 'member',
  
  -- Constraints
  -- constraint valid_email check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  -- constraint positive_priority check (priority > 0),
  
  constraint table_name_not_deleted check (deleted_at is null or deleted_at >= created_at)
);

-- Create enum types (run before creating table if needed)
-- create type status_enum as enum ('pending', 'active', 'completed', 'archived');
-- create type user_role_enum as enum ('admin', 'member', 'viewer');

-- Indexes
-- create index idx_table_name_created_at on table_name (created_at);
-- create index idx_table_name_user_id on table_name (user_id);
-- create index idx_table_name_status on table_name (status) where deleted_at is null;
-- create index idx_table_name_email on table_name (email) where deleted_at is null;

-- Triggers for updated_at (requires function)
-- create trigger update_table_name_updated_at
--   before update on table_name
--   for each row
--   execute function update_updated_at_column();
