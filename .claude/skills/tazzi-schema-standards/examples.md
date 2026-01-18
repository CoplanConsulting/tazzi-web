# Examples for Tazzi Schema Standards

Load as needed for illustrations. All code follows ESLint stylistic (2-space indent, double quotes, semi-colons).

## Schema Template

Basic table boilerplate:

````typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const exampleTable = pgTable("example-table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
});

## Naming Example
Non-compliant: `UserProfiles` (camelCase table).
Compliant: `user-profiles` (kebab-case).

Column: Non-compliant: `UserID` → Compliant: `user_id`.

## Design Pattern Example
Relations with index:

```typescript
import { pgTable, serial, integer, index, foreignKey } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content"),
}, (table) => ({
  userFk: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
  }).onDelete("cascade"),
  userIdx: index("idx_posts_user_id").on(table.userId),
}));
````

## Migration Example

Workflow for adding a column:

1. Update schema.ts: Add `status: text("status").default("active");`.
2. Generate: `drizzle-kit generate:pg`.
3. Verify: Review migration SQL for ALTER TABLE ADD COLUMN.
4. Apply: `drizzle-kit migrate:pg`.
   Output: "Migration applied successfully; no data loss detected."
