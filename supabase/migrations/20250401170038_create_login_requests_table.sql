CREATE TABLE IF NOT EXISTS api.login_requests (
  anonymous_user_id UUID PRIMARY KEY,
  personal_number BIGINT NOT NULL,
  approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE api.login_requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.login_requests
TO authenticated;

-- Policy for anonymous users (The users requesting login approval)
CREATE POLICY "Anonymously logged in users can see thier own login requests"
ON api.login_requests
FOR SELECT
TO authenticated
USING (
  ((SELECT auth.uid()) = anonymous_user_id)
);

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on login_requests table"
ON api.login_requests
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('login_requests.select')) );

CREATE POLICY "Allow authorized insert access on login_requests table"
ON api.login_requests
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('login_requests.insert')) );

CREATE POLICY "Allow authorized update access on login_requests table"
ON api.login_requests
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('login_requests.update')) );

CREATE POLICY "Allow authorized delete access on login_requests table"
ON api.login_requests
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('login_requests.delete')) );

-- Permissions for admins and moderators
INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'login_requests.select'),
  ('admin', 'login_requests.insert'),
  ('admin', 'login_requests.update'),
  ('admin', 'login_requests.delete'),
  ('moderator', 'login_requests.select'),
  ('moderator', 'login_requests.insert'),
  ('moderator', 'login_requests.update'),
  ('moderator', 'login_requests.delete');
