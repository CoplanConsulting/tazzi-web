# Feature Spec: Days Schema

## Feature Name

Tour Days Schema

## Problem Statement

Tour managers need to track individual days within a tour - show days, travel days, days off, rehearsals, and press days. Each day needs status tracking, location info, and timezone awareness to coordinate schedules across the touring party.

## Desired Outcome

A Drizzle ORM schema for `days` that integrates with the existing `tours` table, follows project conventions, and provides type-safe queries with Zod validation.

## User Stories

- As a tour manager, I want to create days within a tour so that I can build out the full tour schedule
- As a tour manager, I want to assign a type and status to each day so that the crew knows what to expect
- As a tour manager, I want to record location and timezone for each day so that logistics can be coordinated

## Scope

### In Scope

- `days` table schema with all core fields
- Enums: `day_type`, `day_status` (timezone as IANA text, not enum)
- Relation to `tours` table (many days → one tour)
- Placeholder relations for future `events` and `travel_itineraries` tables
- Composite index on `(tourId, date)` for common queries
- Zod schemas via `drizzle-zod` with IANA timezone validation
- Type exports (`Day`, `NewDay`)
- Database migration
- Export from schema index

### Out of Scope

- `events` table implementation (future feature)
- `travel_itineraries` table implementation (future feature)
- API endpoints for CRUD operations
- UI components for day management
- RLS policies (separate task)

## Technical Design

### Enums

```typescript
// Lowercase, industry-standard values
export const dayTypeEnum = pgEnum('day_type', [
  'show',
  'travel',
  'off',
  'rehearsal',
  'press',
  'promo',
])

export const dayStatusEnum = pgEnum('day_status', [
  'tentative',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
])
```

### Table Schema

```typescript
export const days = pgTable('days', {
  // Audited columns (id, createdBy, createdAt, updatedAt)
  ...tableColumns.audited(),

  // Tour relationship
  tourId: uuid('tour_id').notNull().references(() => tours.id, { onDelete: 'cascade' }),

  // Day identification
  date: date('date').notNull(),           // Local calendar date at venue
  dayNumber: integer('day_number'),        // Optional: explicit ordering (e.g., "Day 1 of tour")

  // Classification
  dayType: dayTypeEnum('day_type').notNull().default('off'),
  status: dayStatusEnum('day_status').notNull().default('tentative'),

  // Location
  city: text('city'),
  state: text('state'),
  country: text('country'),
  venueName: text('venue_name'),           // Display name, FK to venues table later
  timezone: text('timezone').notNull(),    // IANA string: 'America/New_York'

  // Metadata
  notes: text('notes'),
}, (table) => [
  // Composite index for common query: "all days for tour by date"
  index('days_tour_date_idx').on(table.tourId, table.date),
])
```

### Timezone Approach

- **Store**: IANA timezone string (e.g., `'America/New_York'`, `'Europe/London'`)
- **Validate**: Zod schema with regex pattern or IANA validator
- **Why**: Enums are brittle for timezones; IANA strings are industry standard (Google Calendar, Outlook, etc.)

### Zod Validation

```typescript
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// IANA timezone pattern (basic validation)
const ianaTimezonePattern = /^[A-Za-z_]+\/[A-Za-z_]+$/

export const insertDaySchema = createInsertSchema(days, {
  timezone: z.string().regex(ianaTimezonePattern, 'Must be valid IANA timezone'),
}).omit({ id: true, createdBy: true, createdAt: true, updatedAt: true })

export const selectDaySchema = createSelectSchema(days)
```

## Key Flows

### Happy Path

1. Developer imports `days` schema
2. Creates a new day record linked to a tour
3. Drizzle validates via Zod schema (including IANA timezone)
4. Record inserted with defaults applied

### Edge Cases to Handle

- Tour deletion cascades to delete all days
- Date validation ensures valid date format
- Enum values constrained at database level
- Timezone validated as IANA format

## Acceptance Criteria

- [ ] `days` table created with all specified fields
- [ ] Uses `tableColumns.audited()` pattern
- [ ] `tourId` FK with cascade delete
- [ ] Two enums defined: `dayTypeEnum`, `dayStatusEnum`
- [ ] Timezone stored as TEXT with IANA format
- [ ] Composite index on `(tourId, date)`
- [ ] Relations defined in `relations.ts`
- [ ] Zod schemas with IANA timezone validation
- [ ] Types exported: `Day`, `NewDay`
- [ ] Migration generated (enums before table)
- [ ] Exports added to `lib/db/schema/index.ts`
- [ ] `drizzle-zod` added as dependency
- [ ] Passes `npm run lint`
