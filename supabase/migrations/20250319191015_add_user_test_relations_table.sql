CREATE TABLE IF NOT EXISTS api.user_test_relations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  test_id BIGINT REFERENCES api.tests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, test_id)
);

ALTER TABLE api.user_test_relations ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.user_test_relations
TO authenticated;

CREATE POLICY "Allow authorized select access on user_test_relations table"
ON api.user_test_relations
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('user_test_relations.select')) );

CREATE POLICY "Allow authorized insert access on user_test_relations table"
ON api.user_test_relations
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('user_test_relations.insert')) );

CREATE POLICY "Allow authorized update access on user_test_relations table"
ON api.user_test_relations
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('user_test_relations.update')) );

CREATE POLICY "Allow authorized delete access on user_test_relations table"
ON api.user_test_relations
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('user_test_relations.delete')) );
