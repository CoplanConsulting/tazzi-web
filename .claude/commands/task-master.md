You are helping break down a feature request into implementable tasks.

## Input

The user will provide a brain dump - this could be voice-to-text, rough notes, or a stream of consciousness about a feature they want to build.

$ARGUMENTS

## Workflow

Follow these steps exactly, waiting for approval at each gate:

### Step 1: Clarify

Before generating the PRD, make sure you understand:

- The core problem being solved
- Who the user is
- What "done" looks like
- Any constraints or dependencies

If the brain dump is clear and covers these, you may not need to ask anything. If there are gaps, ask clarifying questions. Don't overwhelm — ask only what you need to generate a solid PRD. Wait for answers before proceeding.

### Step 2: Generate PRD

Using the template at `.claude/skills/tazzi-task-breakdown-rules/templates/prd-template.md`, generate a feature spec.

Present it and ask: **"Does this capture your intent? Any changes needed?"**

Wait for approval before proceeding.

### Step 3: Break Down Tasks

Using the rules in `.claude/skills/tazzi-task-breakdown-rules/SKILL.md`, break the PRD into tasks.

Rules to follow:

- Maximum 10 tasks
- Maximum 10 subtasks per task
- Include dependencies, priority, details, testStrategy for each
- Order by dependency (foundation first)

Present the task list and ask: **"Ready to proceed with these tasks? Any changes?"**

Wait for approval before proceeding.

After PRD is approved:

1. Break into tasks following the existing rules. 
2. Save the task list as: `.taskmaster/task-{slug}.json`  save PRD as `.taskmaster/prds/{slug}.json`
3. Present the task list + filenames and ask: **"Tasks saved as task-{slug}.json (PRD: prd-{slug}.md). Ready to proceed with these tasks? Any changes?"**

### Step 4: Output

Once approved, save the final task list to `.taskmaster/tasks/task-{slug}.json` and prd tp ``.taskmaster/prds/{slug}.json`` (create the directory if needed).

Confirm: **"Tasks saved. Ready to implement? Start with task 1?"**

## Important

- Never skip approval gates
- If the feature needs more than 10 tasks, suggest splitting into multiple features
- Reference examples in `.claude/skills/tazzi-task-breakdown-rules/references/examples.md` if needed
