# Supabase

Supabase is part of the Build Me database architecture.

## Architecture

Drizzle
↓
Schema
↓
Migration
↓
PostgreSQL
↓
Supabase

## Responsibilities

### Drizzle

Defines the application database schema and manages database migrations.

### PostgreSQL

Provides the underlying relational database.

### Supabase

Provides database platform capabilities around PostgreSQL, including:

- Authentication
- Storage
- API access
- Row Level Security
- Edge Functions
- Local development tooling

## Directory Structure

```text
supabase/
├── config.toml
├── policies/
└── functions/
```
