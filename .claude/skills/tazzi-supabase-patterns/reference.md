# Reference for Tazzi Supabase Patterns

Detailed expansions for Supabase in Tazzi. Load sections as needed.

## Row Level Security (RLS)

Rationale: Prevents unauthorized access, aligning with security-first (like Stylelint custom-property-no-missing-var-function for validation).

- Enabling: ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
- Policy Creation: CREATE POLICY policy_name ON table_name FOR ALL USING (auth.uid() = user_id);
- Roles: Use auth.role() for admin checks (e.g., USING (auth.role() = 'admin')).
- Testing: Simulate via Supabase dashboard or pgTAP.
  Edge Cases: Anon access (e.g., public reads: USING (true) with limits); realtime subscriptions filter via RLS.
  Anti-Patterns: Disabling RLS on prod tables; policies without USING/CHECK clauses.

## Authentication

Rationale: Secure user flows, avoiding ESLint antfu/no-top-level-await pitfalls in async auth.

- Setup: Use @supabase/supabase-js client; init with env vars (but via process.env safely).
- JWT Handling: In API: const { data: { user } } = await supabase.auth.getUser();
- Custom Claims: Add via Postgres triggers (e.g., update users set role = 'admin' where id = auth.uid()).
- OAuth: Integrate Google/GitHub; handle redirects in Nuxt.
- Security: Rate limit sign-ups; use captcha for public forms.
  Edge Cases: Token refresh; offline auth (store sessions securely).
  Anti-Patterns: Storing passwords client-side; ignoring email verification.

## Foreign Keys

Rationale: Ensures referential integrity, like ESLint ts/no-redeclare to avoid duplicates.

- Definition: ALTER TABLE child ADD CONSTRAINT fk_name FOREIGN KEY (child_col) REFERENCES parent (parent_col);
- Cascades: ON DELETE CASCADE for dependent data (e.g., user deletes remove posts); SET NULL for optional.
- Indexes: Automatically created on FK, but add explicit for perf (e.g., CREATE INDEX ON child (child_col)).
- Composite: FOREIGN KEY (col1, col2) REFERENCES parent (col1, col2).
  Edge Cases: Self-referencing (e.g., hierarchical data); deferred constraints for batches.
  Anti-Patterns: Missing FKs leading to orphans; over-cascading causing data loss.
