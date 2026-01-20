# Feature Spec: Tour Creation & Onboarding Flow

## Feature Name

Tour Creation Onboarding

## Problem Statement

New users need to create their first tour after signing up. The onboarding pages were imported from a UI sandbox and need to be connected to actual backend functionality with a proper tours schema.

## Desired Outcome

Users can complete the 3-step onboarding flow to create their first tour, with data persisted to the database.

## User Stories

- As a new user, I want to be welcomed and guided to create my first tour so I can get started quickly
- As a user, I want to skip onboarding if I'm not ready to create a tour yet
- As a user, I want to enter tour name, start date, and end date to create a basic tour record

## Scope

### In Scope

- Tours database schema (Drizzle + migration)
- Common schema utilities (base.ts with reusable columns and Zod helpers)
- Zod validation schema for tour creation form
- API endpoint to create a tour
- Update onboarding pages to work with Tazzi app (branding, actual API calls)
- Basic form validation (name required, dates required, end date >= start date)

### Out of Scope

- Tour days generation (separate PRD)
- Dashboard page (routes to `/` for now)
- Calendar view
- Events/shows management
- Artist/tourManager as foreign keys (text fields for now)

## Key Flows

### Happy Path

1. User lands on `/onboarding` (Step 1) - sees welcome message with Tazzi branding
2. User clicks "Create Your First Tour"
3. User fills in tour name, start date, end date (Step 2)
4. User clicks "Create Tour"
5. API creates tour record with `orgId` from authenticated user's organization
6. User sees success page (Step 3) with tour name and calculated day count
7. User clicks "Go to Dashboard" → routes to `/`

### Edge Cases to Handle

- End date before start date → validation error on endDate field
- Empty tour name → validation error
- API error → show error toast, stay on form
- Skip for now → route to `/`
- Unauthenticated user → 401 error

## Technical Considerations

- **Database changes:** New `tours` table with enum for status, common schema utilities in base.ts
- **API changes:** `POST /api/tours` endpoint (orgId from session, not request body)
- **UI components:** Update existing onboarding pages (branding, API integration)
- **Dependencies:** Requires existing `orgs` table (already exists)
- **Timestamps:** Use `withTimezone: true` for all timestamp fields
- **Day count calculation:** Inclusive range = `Math.ceil((endDate - startDate) / 86400000) + 1`

## Open Questions

- None - all clarified

## Acceptance Criteria

- [ ] Common schema utilities (base.ts) exist with commonColumns, tablePresets, and Zod helpers
- [ ] Tours table exists with correct schema and foreign key to orgs
- [ ] Tour status enum includes: Upcoming, Active, Completed, Cancelled
- [ ] Default tour status is 'Upcoming'
- [ ] Timestamps use withTimezone: true and $onUpdate pattern
- [ ] Zod validation schema validates name (required), dates (required, end >= start with path on endDate)
- [ ] API endpoint creates tour using orgId from authenticated user's session (not from request body)
- [ ] Onboarding pages show "Tazzi" branding (not "Tour Manager Pro")
- [ ] Form submits to API and navigates to success on completion
- [ ] Skip button routes to `/`
- [ ] Success page shows tour name and calculated day count (inclusive)
- [ ] API errors display toast notification
