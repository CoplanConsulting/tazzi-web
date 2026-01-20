-- Enable RLS on all tables
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_capabilities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view their orgs" ON orgs;
DROP POLICY IF EXISTS "Users can view org members" ON org_users;
DROP POLICY IF EXISTS "Users can view roles" ON roles;
DROP POLICY IF EXISTS "Users can view capabilities" ON capabilities;
DROP POLICY IF EXISTS "Users can view role capabilities" ON role_capabilities;

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

-- roles: all authenticated users can read roles
CREATE POLICY "Users can view roles" ON roles
  FOR SELECT USING (auth.role() = 'authenticated');

-- capabilities: all authenticated users can read capabilities
CREATE POLICY "Users can view capabilities" ON capabilities
  FOR SELECT USING (auth.role() = 'authenticated');

-- role_capabilities: all authenticated users can read role-capability mappings
CREATE POLICY "Users can view role capabilities" ON role_capabilities
  FOR SELECT USING (auth.role() = 'authenticated');

-- Note: INSERT/UPDATE/DELETE operations are handled server-side with service role key
-- which bypasses RLS, so no INSERT policies needed for signup flow
