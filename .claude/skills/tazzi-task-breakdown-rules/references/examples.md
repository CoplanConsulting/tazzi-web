# Task Breakdown Examples

## Well-Formed Task List

```json
{
  "feature": "Tour CRUD",
  "totalTasks": 3,
  "estimatedComplexity": "medium",
  "tasks": [
    {
      "id": 1,
      "title": "Create tours schema and migration",
      "description": "Define the tours table with Drizzle ORM and set up RLS policies",
      "status": "pending",
      "dependencies": [],
      "priority": "high",
      "details": "Complexity: 3/10. Create schema in server/db/schema/tours.ts. Fields: id (uuid), name (text), start_date (date), end_date (date), created_by (uuid FK to auth.users), created_at (timestamp). Add RLS policy for user isolation.",
      "testStrategy": "Run migration, query tours table structure in Supabase. Verify RLS by attempting to read another user's tour (should fail).",
      "subtasks": []
    },
    {
      "id": 2,
      "title": "Build tour creation form",
      "description": "Create a form component for adding new tours with validation",
      "status": "pending",
      "dependencies": [1],
      "priority": "high",
      "details": "Complexity: 6/10. Create pages/tours/new.vue. Use VeeValidate with Zod schema. Fields: name (required, 3-100 chars), start_date (required), end_date (required, after start_date). Submit to Supabase, redirect on success.",
      "testStrategy": "1. Submit with valid data - tour created, redirected. 2. Submit empty name - validation error inline. 3. Submit end_date before start_date - validation error.",
      "subtasks": [
        {
          "id": 1,
          "title": "Create page and basic layout",
          "description": "Set up new.vue with form structure",
          "status": "pending",
          "dependencies": [],
          "details": "Create pages/tours/new.vue with card layout"
        },
        {
          "id": 2,
          "title": "Define Zod validation schema",
          "description": "Create tour creation schema",
          "status": "pending",
          "dependencies": [],
          "details": "Create schemas/tour.ts"
        },
        {
          "id": 3,
          "title": "Implement VeeValidate form",
          "description": "Wire up fields with validation",
          "status": "pending",
          "dependencies": [1, 2],
          "details": "useForm with zodResolver"
        },
        {
          "id": 4,
          "title": "Add Supabase mutation",
          "description": "Handle submission with insert",
          "status": "pending",
          "dependencies": [3],
          "details": "composables/useTours.ts"
        }
      ]
    },
    {
      "id": 3,
      "title": "Create tour list page",
      "description": "Display user's tours with actions",
      "status": "pending",
      "dependencies": [1],
      "priority": "medium",
      "details": "Complexity: 5/10. Create pages/tours/index.vue. Fetch tours, display in table, handle empty state.",
      "testStrategy": "1. No tours - empty state shown. 2. With tours - all displayed correctly. 3. Other user's tours not visible.",
      "subtasks": []
    }
  ]
}
```

## Anti-Patterns

### Vague tasks

```json
{
  "title": "Set up the backend",
  "details": "Create the backend stuff"
}
```

**Problem:** No clear deliverable. What files? What patterns?

### Missing dependencies

```json
{
  "id": 2,
  "title": "Build form that submits to API",
  "dependencies": []
}
```

**Problem:** If task 1 creates the API, task 2 must depend on it.

### Circular dependencies

```json
{ "id": 1, "dependencies": [2] },
{ "id": 2, "dependencies": [1] }
```

**Problem:** Impossible to execute.

### Useless test strategy

```json
{
  "testStrategy": "Make sure it works correctly"
}
```

**Problem:** Not actionable. Specify exact verification steps.

### Over-decomposition

```json
{ "id": 1, "title": "Create file" },
{ "id": 2, "title": "Add imports" },
{ "id": 3, "title": "Write function" }
```

**Problem:** These are one task. Don't create artificial granularity.

## Feature Splitting Example

**Before:** "Tour Management" (15 tasks)

**After:**

- "Tour CRUD" (5 tasks)
- "Tour Team Members" (4 tasks)
- "Tour Itinerary" (6 tasks)
