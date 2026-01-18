---
name: tazzi-supabase-patterns
description: Enforces Supabase-specific patterns for the Tazzi app, including Row Level Security (RLS) policies, authentication integrations, and foreign key constraints. Use this skill when implementing or reviewing Supabase features to ensure security, integrity, and alignment with app linting (e.g., ESLint ts/consistent-type-definitions and unicorn/filename-case).
---

# Tazzi Supabase Patterns

This skill focuses on Supabase best practices for Tazzi's backend, building on Drizzle ORM schemas. Emphasize security (RLS/auth) and data integrity (foreign keys). Align code with ESLint stylistic (double quotes, semi-colons, 2-space indent) and Stylelint (no unknown at-rules).

Use this low-freedom workflow for any Supabase task:

1. Identify focus: RLS, auth, or foreign keys.
2. Apply relevant section.
3. Validate: Cross-check with [reference.md](reference.md) for details.
4. Output: Provide compliant SQL/code, with examples from [examples.md](examples.md).
5. Flag issues: Highlight risks (e.g., missing RLS exposing data).

## Row Level Security (RLS)

- Enable RLS on all tables post-creation.
- Policies: Use fine-grained rules (e.g., user-owned data via auth.uid()).
- Common Patterns: SELECT/INSERT/UPDATE/DELETE based on roles or ownership.
- Avoid: Broad 'true' policies; always test with different users.
  For details, load [reference.md#row-level-security](reference.md#row-level-security).

## Authentication

- Use Supabase Auth: Prefer email/password or OAuth providers.
- Integration: Handle JWT in API routes; validate with supabase.auth.getUser().
- Roles: Define custom roles (e.g., admin, user) via Postgres functions.
- Patterns: Session management in Nuxt middleware; edge cases like password resets.
  Align with ESLint node/no-process-env (error on direct env access).
  For details, load [reference.md#authentication](reference.md#authentication).

## Foreign Keys

- Enforce: Always add FK constraints for relations.
- Cascades: Use ON DELETE CASCADE/SET NULL based on data lifecycle.
- Patterns: Composite keys where needed; indexes on FK columns.
- Avoid: Implicit relations without constraints (risks data orphans).
  Inspire from ESLint perfectionist/sort-imports for organized schema defs.
  For details, load [reference.md#foreign-keys](reference.md#foreign-keys).
