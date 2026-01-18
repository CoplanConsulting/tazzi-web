---
name: tazzi-task-breakdown-rules
description: Decomposes features into structured, dependency-aware tasks. Use when breaking down a PRD, feature request, or voice-to-text brain dump into implementable work. Outputs JSON task lists with max 10 tasks per feature, max 10 subtasks per task.
---

# Task Breakdown Rules

Transform feature requests into structured, dependency-aware task lists.

## Hard Limits

- **Maximum 10 tasks per feature**
- **Maximum 10 subtasks per task**

Exceeding either limit means the scope is too big—split the feature.

## Task Structure

Every task requires these fields:

```json
{
  "id": 1,
  "title": "Short, action-oriented title",
  "description": "One sentence explaining the outcome",
  "status": "pending",
  "dependencies": [],
  "priority": "high",
  "details": "Complexity: N/10. Implementation guidance with specific files and patterns.",
  "testStrategy": "Specific steps to verify completion",
  "subtasks": []
}
```

| Field          | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `id`           | Sequential integer starting at 1                                  |
| `title`        | Under 60 characters, action-oriented                              |
| `description`  | Single sentence outcome                                           |
| `status`       | `pending`, `in-progress`, `done`, `review`, `deferred`            |
| `dependencies` | Array of task IDs this depends on                                 |
| `priority`     | `high`, `medium`, `low`                                           |
| `details`      | Include complexity score (1-10), files to create/modify, patterns |
| `testStrategy` | Actionable verification steps, not "test it works"                |
| `subtasks`     | Array of subtask objects for complex tasks                        |

## Dependency Ordering

Order tasks so foundational work comes first:

1. **Foundation** (no dependencies): Schema, config, base setup
2. **Building blocks**: Core components, API routes
3. **Integration**: Connecting pieces
4. **Polish**: Error handling, edge cases

## Complexity Scoring

| Score | Subtasks Needed |
| ----- | --------------- |
| 1-3   | None            |
| 4-6   | 3-5 subtasks    |
| 7-10  | 6-10 subtasks   |

## When to Split Features

- More than 10 tasks needed
- Long dependency chains
- Parts could ship independently

## Output Format

```json
{
  "feature": "Feature name",
  "totalTasks": 5,
  "estimatedComplexity": "medium",
  "tasks": [...]
}
```

For detailed examples and anti-patterns, see [references/examples.md](references/examples.md).

For converting brain dumps into structured PRDs, see [templates/prd-template.md](templates/prd-template.md).
