---
name: tazzi-drizzle-patterns
description: Enforces Drizzle ORM patterns for the Tazzi app, including table definitions, query building, relations, and integrations with Supabase. Use this skill when writing or reviewing Drizzle code to ensure type-safe, efficient ORM usage aligned with app linting (e.g., ESLint ts/consistent-type-definitions and stylistic rules).
---

# Tazzi Drizzle Patterns

This skill guides Drizzle ORM usage in Tazzi, focusing on type-safe patterns for schemas and queries. Build on `tazzi-schema-standards` for naming/migrations and `tazzi-supabase-patterns` for auth/RLS. Code follows ESLint (double quotes, semi-colons, 2-space indent) and avoids issues like ts/no-redeclare.

Use this workflow for Drizzle tasks:

1. Identify type: Definitions, queries, relations, or integrations.
2. Apply section below.
3. Validate: Check against [reference.md](reference.md).
4. Output: Provide compliant TS code, with examples from [examples.md](examples.md).
5. Flag: Highlight inefficiencies (e.g., missing indexes in queries).

## Table Definitions

- Use pgTable for Postgres; include IDs, timestamps.
- Types: Prefer 'type' aliases (from ts/consistent-type-definitions).
- Patterns: NotNull/defaults for required fields; enums for fixed values.
- Avoid: Raw SQL unless necessary; redundant fields.
  Load [reference.md#table-definitions](reference.md#table-definitions) for details.

## Query Building

- Use drizzle methods (e.g., db.select(), db.insert()).
- Patterns: Chain where/eq for filters; join for relations.
- Efficiency: Limit/offset for pagination; prepare for reusables.
- Avoid: N+1 queries; console logs (from no-console warn).
  Load [reference.md#query-building](reference.md#query-building) for details.

## Relations

- Define with relations() and foreign keys.
- Patterns: One-to-many/many-to-many with cascades.
- Integrate: Respect Supabase RLS in queries.
- Avoid: Circular deps; unindexed joins.
  Load [reference.md#relations](reference.md#relations) for details.

## Integrations

- With Supabase: Use createClient for auth-aware queries.
- Patterns: Transactions for atomic ops; error handling.
- Avoid: Direct env access (from node/no-process-env error).
  Load [reference.md#integrations](reference.md#integrations) for details.
