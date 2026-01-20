# Feature Spec: Signup with Organization Creation

**Version:** 1.1
**Date:** 2026-01-18

## Feature Name

Signup with Auto Org Creation

## Problem Statement

New users need to register for Tazzi and have their organization automatically created. Currently the signup form exists but doesn't connect to any backend - it just logs to console and redirects. This is the first real database interaction for the app.

## Desired Outcome

When a user submits the signup form, they are registered in Supabase Auth, an organization is created from their company name, and they are linked as the org admin - then redirected to onboarding.

## User Stories

- As a new user, I want to sign up with my company info so that my organization is automatically created
- As a new user, I want to be immediately logged in after signup so that I can start onboarding without extra steps
- As a new user, I want clear error messages if my email is already taken so that I know what went wrong

## Scope

### In Scope

- Supabase Auth user registration with firstName/lastName in user metadata
- Drizzle schema for `orgs`, `roles`, `capabilities`, `role_capabilities`, and `org_users` tables
- Row Level Security (RLS) policies for all tables
- Server API endpoint to handle signup flow (auth + DB inserts)
- Error handling for duplicate emails and failed registrations
- Auto-login after signup
- Redirect to `/onboarding` on success (stub page if not present)
- Seed default roles and capabilities via migration

### Out of Scope

- Email verification (deferred for early dev)
- Password reset flow (separate feature)
- Invite flow for adding users to existing orgs
- Full capabilities/permissions checking middleware
- OAuth/social login
- Rate limiting (add later)

## Non-Functional Requirements

- **Performance**: API response < 500ms under normal load
- **Security**: Follow OWASP auth best practices (Supabase handles password hashing, session management)
- **Accessibility**: Add ARIA labels to form error states for WCAG 2.1 AA compliance
- **Reliability**: Log all auth failures for debugging; implement rollback on partial failures

## Key Flows

### Happy Path

1. User fills out signup form (firstName, lastName, email, company, password, confirmPassword)
2. User clicks "Sign Up" - button shows loading state
3. Frontend validates confirmPassword matches password
4. Frontend calls `POST /api/auth/signup` endpoint
5. Server creates user in Supabase Auth with metadata (firstName, lastName)
6. Server creates org row with company name
7. Server creates org_users row linking user to org with "admin" role
8. Server returns success with session data
9. Frontend stores session, shows success toast
10. Frontend redirects to `/onboarding`

### Error Cases

- **Duplicate email**: Supabase returns specific error - show "An account with this email already exists"
- **Weak password**: Supabase enforces min 6 chars - show "Password must be at least 6 characters"
- **DB insert fails after auth created**: Log error, attempt to delete auth user via admin API, show "Registration failed, please try again"
- **Network error**: Show "Something went wrong, please try again"

### Rollback Strategy

Order of operations matters since we can't do cross-service transactions:

1. Create Supabase Auth user first (we need the user ID for DB inserts)
2. Create org and org_users in a single Drizzle transaction
3. If DB transaction fails, use Supabase Admin API to delete the auth user
4. If admin deletion fails, log for manual cleanup (edge case)

## Technical Considerations

### Database Schema

**`orgs` table:**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| name | varchar(255) | NOT NULL |
| created_at | timestamp | default now() |
| updated_at | timestamp | default now() |

**`roles` table:**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | varchar(50) | UNIQUE, NOT NULL |
| description | text | nullable |

**Seed data:**

- `admin` - Full access to organization
- `member` - Basic access to organization

**`capabilities` table:**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | varchar(100) | UNIQUE, NOT NULL |
| description | text | nullable |

**Seed data (initial set):**

- `org:manage` - Manage organization settings
- `org:delete` - Delete organization
- `members:invite` - Invite new members
- `members:remove` - Remove members
- `members:manage_roles` - Change member roles

**`role_capabilities` table:**
| Column | Type | Notes |
|--------|------|-------|
| role_id | uuid | FK → roles.id, ON DELETE CASCADE |
| capability_id | uuid | FK → capabilities.id, ON DELETE CASCADE |
| PK | composite | (role_id, capability_id) |

**Seed mapping:**

- `admin` gets all capabilities
- `member` gets none initially (view-only)

**`org_users` table:**
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| org_id | uuid | FK → orgs.id, ON DELETE CASCADE |
| user_id | uuid | FK → auth.users.id |
| role_id | uuid | FK → roles.id |
| created_at | timestamp | default now() |
| UNIQUE | constraint | (org_id, user_id) |

**Indexes:**

- `org_users.user_id` - B-tree index for quick auth lookups
- `org_users.org_id` - B-tree index for org member queries
- `role_capabilities.role_id` - B-tree index for permission checks

### Row Level Security (RLS)

All tables will have RLS enabled. Initial policies:

```sql
-- orgs: users can only see orgs they belong to
CREATE POLICY "Users can view their orgs" ON orgs
  FOR SELECT USING (
    id IN (SELECT org_id FROM org_users WHERE user_id = auth.uid())
  );

-- org_users: users can only see memberships in their orgs
CREATE POLICY "Users can view org members" ON org_users
  FOR SELECT USING (
    org_id IN (SELECT org_id FROM org_users WHERE user_id = auth.uid())
  );
```

Note: INSERT policies will allow service role only (server-side inserts).

### Seed Implementation

Seeding will be done via a dedicated seed script run after migrations:

```typescript
// lib/db/seed.ts
import { db } from './index'
import { roles, capabilities, roleCapabilities } from './schema'

await db.insert(roles).values([...]).onConflictDoNothing()
await db.insert(capabilities).values([...]).onConflictDoNothing()
await db.insert(roleCapabilities).values([...]).onConflictDoNothing()
```

Run with: `npx tsx lib/db/seed.ts` (add npm script: `"db:seed"`)

### API Endpoint

`POST /api/auth/signup`

**Request body:**

```typescript
{
  email: string; // valid email format
  password: string; // min 6 characters
  firstName: string; // 1-100 characters
  lastName: string; // 1-100 characters
  company: string; // 1-255 characters
}
```

**Success response (200):**

```typescript
{
  success: true;
  user: { id, email; }
}
```

**Error response (400/500):**

```typescript
{
  success: false
  error: string  // user-friendly message
  code?: string  // for debugging
}
```

### Server Setup Required

- Create `server/` directory with Nuxt server routes
- Create `server/utils/supabase.ts` - server-side Supabase client (needs service role key for admin operations)
- Create `server/utils/db.ts` - Drizzle instance for server
- Add `SUPABASE_SERVICE_ROLE_KEY` to env schema and `.env`

### Frontend Changes

- Update `signup.vue` to:
  - Call API endpoint with $fetch
  - Show loading state on button during submission
  - Display errors via vue-sonner toast (already installed)
  - Handle success redirect
- Create stub `/pages/onboarding.vue` if not present (simple placeholder page)

### Environment Variables

Already configured in `lib/env.ts`:

- `SUPABASE_URL` ✓
- `SUPABASE_KEY` ✓ (anon/public key)
- `SUPABASE_DB_URL` ✓

**Need to add:**

- `SUPABASE_SERVICE_ROLE_KEY` - for admin operations like deleting auth users

## Validation Rules

| Field     | Rules                             |
| --------- | --------------------------------- |
| email     | Valid email format, max 254 chars |
| password  | Min 6 chars (Supabase default)    |
| firstName | Required, 1-100 chars, trimmed    |
| lastName  | Required, 1-100 chars, trimmed    |
| company   | Required, 1-255 chars, trimmed    |

## Acceptance Criteria

- [ ] User can complete signup with valid credentials (valid email, 6+ char password, all fields filled)
- [ ] New user appears in Supabase Auth dashboard with firstName/lastName in user_metadata
- [ ] New org row created in `orgs` table with company name
- [ ] New org_users row links user (by auth.users.id) to org with admin role
- [ ] Submitting duplicate email shows toast: "An account with this email already exists"
- [ ] Submitting password < 6 chars shows appropriate error
- [ ] User session is established after signup (can verify via Supabase client)
- [ ] User is redirected to `/onboarding` after successful signup
- [ ] Roles table contains "admin" and "member" seed data
- [ ] Capabilities table contains initial capability seed data
- [ ] RLS policies prevent users from seeing other orgs' data
- [ ] Loading spinner shows on submit button during API call
- [ ] Form errors have appropriate ARIA labels for screen readers

## Success Metrics

Track via Supabase dashboard and logs:

- Signup success rate (target: > 95% of valid submissions)
- Average API response time (target: < 500ms)
- Error frequency by type (duplicate email vs. other failures)

## Testing Notes

**Manual testing:**

1. Sign up with new email → verify redirect and DB state
2. Sign up with existing email → verify error toast
3. Sign up with short password → verify error
4. Check Supabase dashboard for user metadata
5. Query DB directly to verify org and org_users rows

**Future (out of scope):**

- Unit tests for API endpoint with mocked Supabase
- E2E tests with Playwright/Cypress
