ALTER TABLE api.personal_info_submissions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.personal_info_submissions
TO authenticated;

-- Policies for users
CREATE POLICY "Users can see their own personal info"
ON api.personal_info_submissions
FOR SELECT
TO authenticated
USING ( (SELECT auth.uid()) = user_id );

CREATE POLICY "Users can insert their own personal info"
ON api.personal_info_submissions
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT auth.uid()) = user_id );

CREATE POLICY "Users can update their own personal info"
ON api.personal_info_submissions
FOR UPDATE
TO authenticated
USING ( (SELECT auth.uid()) = user_id )
WITH CHECK ( (SELECT auth.uid()) = user_id );

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on personal_info_submissions table"
ON api.personal_info_submissions
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('personal_info_submissions.select')) );

CREATE POLICY "Allow authorized insert access on personal_info_submissions table"
ON api.personal_info_submissions
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('personal_info_submissions.insert')) );

CREATE POLICY "Allow authorized update access on personal_info_submissions table"
ON api.personal_info_submissions
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('personal_info_submissions.update')) );

CREATE POLICY "Allow authorized delete access on personal_info_submissions table"
ON api.personal_info_submissions
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('personal_info_submissions.delete')) );

-- Permissions for admins and moderators
INSERT INTO api.permissions (permission)
VALUES
  ('personal_info_submissions.select'),
  ('personal_info_submissions.insert'),
  ('personal_info_submissions.update'),
  ('personal_info_submissions.delete');

INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'personal_info_submissions.select'),
  ('admin', 'personal_info_submissions.insert'),
  ('admin', 'personal_info_submissions.update'),
  ('admin', 'personal_info_submissions.delete'),
  ('moderator', 'personal_info_submissions.select');
