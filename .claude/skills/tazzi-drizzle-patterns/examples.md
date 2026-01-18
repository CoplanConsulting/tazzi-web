# Examples for Tazzi Drizzle Patterns

Code snippets following ESLint stylistic.

## Table Definition Example

Basic user table:

```typescript
import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "user"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Query Building Example

Fetch users with pagination:

```typescript
import { db } from "./db"; // Your Drizzle instance
import { users } from "./schema";

const result = await db.select()
  .from(users)
  .where(ilike(users.email, "%example%"))
  .limit(10)
  .offset(0);
```

## Relations Example

Posts related to users:

```typescript
import { relations } from "drizzle-orm";
import { integer, pgTable, serial } from "drizzle-orm/pg-core";

import { users } from "./users";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

// Query example
const postWithUser = await db.select()
  .from(posts)
  .leftJoin(users, eq(posts.userId, users.id))
  .where(eq(posts.id, 1));
```

## Integrations Example

Auth-integrated query:

```typescript
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/node-postgres";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const { data: { user } } = await supabase.auth.getUser();

const db = drizzle(supabase.pool); // Or your connection

const ownedPosts = await db.select()
  .from(posts)
  .where(eq(posts.userId, user.id));
```

This gives you a practical base to start schema work—e.g., define a few tables using the patterns, then query them. If Tazzi has specific entities (e.g., users, rides if it's transport-related?), we can customize examples. Want to refine or add sections?
