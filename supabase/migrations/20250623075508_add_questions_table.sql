CREATE TABLE IF NOT EXISTS api.questions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  product_id BIGINT REFERENCES api.products(id) ON DELETE CASCADE,
  test_id BIGINT NOT NULL REFERENCES api.tests(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE api.questions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.questions 
TO authenticated;

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on questions table"
ON api.questions
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('questions.select')) );

CREATE POLICY "Allow authorized insert access on questions table"
ON api.questions
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('questions.insert')) );

CREATE POLICY "Allow authorized update access on questions table"
ON api.questions
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('questions.update')) );

CREATE POLICY "Allow authorized delete access on questions table"
ON api.questions
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('questions.delete')) );

-- Policies for users
CREATE POLICY "Test participants can view questions during test"
ON api.questions
FOR SELECT
TO authenticated
USING ( api.test_is_active(test_id) AND api.user_is_in_test(test_id) );

-- Policies for roles ie admin, moderator
INSERT INTO api.permissions (permission)
VALUES
  ('questions.select'),
  ('questions.insert'),
  ('questions.update'),
  ('questions.delete');

INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'questions.select'),
  ('admin', 'questions.insert'),
  ('admin', 'questions.update'),
  ('admin', 'questions.delete'),
  ('moderator', 'questions.select');
