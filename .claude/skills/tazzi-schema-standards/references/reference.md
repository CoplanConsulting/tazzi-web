# Reference for Tazzi Schema Standards

This file provides detailed explanations, rationales, and expansions. Load sections as needed from SKILL.md.

## Naming Conventions

Rationale: Aligns with ESLint unicorn/filename-case (kebab/Pascal) and stylistic (double quotes, semi) for code consistency; prevents issues like Stylelint custom-property-no-missing-var-function.

- Tables: kebab-case, singular/plural based on entity (e.g., user-profiles for collections). Prefix for env (e.g., dev-user-profiles) if multi-env.
- Columns: snake_case, descriptive (e.g., account_id not id). Use serial for IDs.
- Indexes: idx*[table]*[fields] (e.g., idx_user_profiles_email_unique).
- Constraints: fk*[table]*[ref_table]\_[field] (e.g., fk_user_profiles_accounts_id).
- Enums: PascalCase, values in lowercase (e.g., enum UserRole { admin, user }).
- Avoid: CamelCase in names (reserve for TS types); uppercase keywords (use lowercase SQL).
  Edge cases: For views/materialized views, use view\_[name].

## Design Patterns

Rationale: Builds on ESLint ts/consistent-type-imports/off but enforces type consistency here; avoids unknown rules like Stylelint at-rule-no-unknown.

- Relations:
  - One-to-Many: e.g., users to posts via foreignKey on posts.user_id.
  - Many-to-Many: Junction table (e.g., user_roles with user_id and role_id).
  - Cascades: onDelete: 'cascade' for owned data; 'set null' for optional.
- Indexes:
  - Single: On unique fields (e.g., email.unique()).
  - Composite: For queries (e.g., index(['status', 'created_at'])).
  - Performance: GIN for JSONB; BTREE default.
- Timestamps: timestamp('created_at').defaultNow().notNull(); same for updated_at.
- Soft Deletes: timestamp('deleted_at').default(null); filter queries with where(eq(deleted_at, null)).
- Audit Logs: Optional table audit_logs with who/what/when.
  Anti-patterns:
- Over-normalization leading to join explosions.
- Missing indexes on foreign keys.
- Denormalized fields without indexing justification.

## Migration Workflows

Rationale: Inspired by ESLint perfectionist/sort-imports for ordered steps; node/prefer-global/process off but ensure env safety.

Full Checklist Expansion:

1. Backup DB: Export via pg_dump.
2. Introspect: Ensure schema.ts matches DB.
3. Edit Schema: Use VS Code with ESLint/Stylelint for linting schema code.
4. Generate: Check generated SQL for issues (e.g., no destructive drops without flag).
5. Verify: Simulate with --dry-run if available; review for data loss.
6. Apply: In transaction; log minimally (align with no-console).
7. Post-Apply: Re-introspect and compare.
   Rollback: Use drizzle-kit down or manual revert.
   Edge cases: For large migrations, split into batches; handle schema locks.
