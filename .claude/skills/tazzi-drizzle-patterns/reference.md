# Reference for Tazzi Drizzle Patterns

Detailed patterns for Drizzle in Tazzi. Load as needed.

## Table Definitions

Rationale: Ensures type safety, aligning with ESLint ts/consistent-type-imports.

- Basic: pgTable('table-name', { id: serial('id').primaryKey(), ... });
- Timestamps: timestamp('created_at').defaultNow().notNull();
- Enums: pgEnum('role', ['admin', 'user']);
- Composites: uniqueIndex('uniq_table_col1_col2').on(columns.col1, columns.col2);
  Edge: Use infer for types (e.g., type TableType = typeof table.$inferSelect;).
  Anti-Patterns: Mixing varchar/text without length; no defaults for optionals.

## Query Building

Rationale: Promotes readable, performant code like Stylelint extends.

- Select: db.select().from(table).where(eq(table.id, 1));
- Insert: db.insert(table).values({ name: 'value' }).returning();
- Update/Delete: db.update(table).set({ name: 'new' }).where(eq(table.id, 1));
- Pagination: .limit(10).offset(0);
- Prepared: const stmt = db.select().from(table).prepare();
  Edge: Use sql`` for dynamic; transaction: db.transaction(async (tx) => {...});
  Anti-Patterns: Raw strings for params (SQL injection risk); over-fetching.

## Relations

Rationale: Builds integrity, like foreign keys in Supabase patterns.

- Define: relations(table, ({ one, many }) => ({ parent: one(parentTable, { fields: [table.parentId], references: [parentTable.id] }) }));
- Query: db.select().from(child).leftJoin(parent, eq(child.parentId, parent.id));
- Many-to-Many: Junction table with relations on both sides.
  Edge: Virtual fields for computed; cascades via onDelete.
  Anti-Patterns: Joins without indexes; ignoring RLS in multi-user queries.

## Integrations

Rationale: Secure and efficient, avoiding ESLint antfu/no-top-level-await.

- Supabase: const db = drizzle(createClient(supabaseUrl, supabaseKey).pool);
- Auth: const { user } = await supabase.auth.getUser(); then filter by user.id.
- Errors: Try/catch with custom messages; rollback on fail.
- Logging: Use structured logs, not console (align with no-console).
  Edge: Migrations via drizzle-kit; realtime with Supabase subs.
  Anti-Patterns: Sync ops in async contexts; env leaks.
