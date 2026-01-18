# Examples for Tazzi Supabase Patterns

Illustrations with code/SQL. Follows ESLint stylistic.

## RLS Example

Policy for user-owned profiles:

````sql
CREATE POLICY "User can access own profile" ON profiles
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

Authentication Example
Nuxt middleware for auth check:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return navigateTo("/login");
  }
});
````

## Foreign Keys Example

Adding FK with cascade:

```sql
ALTER TABLE posts
ADD CONSTRAINT fk_posts_user
FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE;
```

```

This keeps things modular and actionable. If it feels right, we could tackle `tazzi-drizzle-patterns` next (or whichever from your list). Thoughts?
```
