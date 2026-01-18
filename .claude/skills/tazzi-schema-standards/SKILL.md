---
name: tazzi-schema-standards
description: Enforces schema standards for the Tazzi app, covering naming conventions for tables and columns, design patterns for relations and indexes, and safe migration workflows. Use this skill when reviewing, generating, or updating Drizzle ORM schemas to maintain consistency with app-wide linting (e.g., ESLint stylistic rules and unicorn/filename-case).
---

# Tazzi Schema Standards

This skill ensures database schemas in the Tazzi app are consistent, reliable, and aligned with code linting practices from ESLint (e.g., consistent-type-definitions preferring 'type', stylistic with double quotes and semi-colons) and Stylelint (e.g., custom-property rules for validation). Focus on Drizzle ORM with PostgreSQL.

Apply these standards step-by-step for any schema task. Use low-freedom checklists to minimize errors.

## Core Workflow

When triggered (e.g., on schema review or generation):

1. Analyze the task: Identify if it's naming, patterns, or migrations.
2. Apply relevant section below.
3. Validate against references: Load [reference.md](reference.md) for details.
4. Provide output: Suggest compliant schema code or steps, with examples from [examples.md](examples.md).
5. Flag inconsistencies: Highlight deviations (e.g., non-kebab table names) and recommend fixes.

## Naming Conventions

- Tables: kebab-case (e.g., user-profiles), inspired by ESLint unicorn/filename-case (kebab/Pascal allowed).
- Columns: snake_case (e.g., user_id), with types via 'type' definitions.
- Indexes/Constraints: Prefix with type (e.g., idx_user_profiles_email, fk_user_profiles_account_id).
- Enums/Types: PascalCase (e.g., UserRole).
- Code Style: Use double quotes, semi-colons, 2-space indent (from ESLint stylistic).
  For full rules and rationale, load [reference.md#naming-conventions](reference.md#naming-conventions).

## Design Patterns

- Relations: Use foreign keys with onDelete cascades where safe.
- Indexes: On queried fields (e.g., email); composite for multi-field.
- Timestamps: Always add created_at/updated_at with defaults.
- Soft Deletes: Nullable deleted_at timestamp.
- Avoid: Redundant declarations (like ESLint ts/no-redeclare off, but enforce here).
  Anti-patterns: Denormalization without perf justification.
  For details and inspirations (e.g., from Stylelint at-rule-no-unknown), load [reference.md#design-patterns](reference.md#design-patterns).

## Migration Workflows

Follow this checklist for changes:

- [ ] Introspect current schema: Run `drizzle-kit introspect:pg --out drizzle/schema/current`.
- [ ] Update schema: Apply naming/patterns; check for ESLint-inspired issues (e.g., no top-level await via antfu/no-top-level-await off).
- [ ] Generate migration: `drizzle-kit generate:pg --out migrations`.
- [ ] Verify: Manual dry-run; ensure no breaking changes (e.g., no process.env misuse from node/no-process-env error).
- [ ] Apply: `drizzle-kit migrate:pg`; backup first.
- [ ] Test: Run db tests in `tests/db/*`; warn on console logs (from no-console warn).
      Handle errors: Rollback on failure; output cleanly.
      For full steps and examples, load [reference.md#migration-workflows](reference.md#migration-workflows) or [examples.md#migration-example](examples.md#migration-example).

If generating schemas, use templates from [examples.md#schema-template](examples.md#schema-template).
