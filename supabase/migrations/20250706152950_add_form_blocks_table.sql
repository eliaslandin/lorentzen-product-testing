DROP TABLE IF EXISTS api.questions;

CREATE TYPE api.block_type AS ENUM(
  'heading',
  'image',
  'question',
  'text'
);

CREATE TABLE IF NOT EXISTS api.form_blocks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_id BIGINT REFERENCES api.products(id) ON DELETE CASCADE NOT NULL,
  test_id BIGINT REFERENCES api.tests(id) ON DELETE CASCADE NOT NULL,
  type api.block_type NOT NULL,
  data JSONB NOT NULL,
  position INT NOT NULL CHECK (position > 0),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (product_id, position)
);

ALTER TABLE api.form_blocks ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.form_blocks 
TO authenticated;

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on form_blocks table"
ON api.form_blocks
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('form_blocks.select')) );

CREATE POLICY "Allow authorized insert access on form_blocks table"
ON api.form_blocks
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('form_blocks.insert')) );

CREATE POLICY "Allow authorized update access on form_blocks table"
ON api.form_blocks
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('form_blocks.update')) );

CREATE POLICY "Allow authorized delete access on form_blocks table"
ON api.form_blocks
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('form_blocks.delete')) );

-- Policies for users
CREATE POLICY "Test participants can view form_blocks during test"
ON api.form_blocks
FOR SELECT
TO authenticated
USING ( api.test_is_active(test_id) AND api.user_is_in_test(test_id) );

-- Policies for roles ie admin, moderator
INSERT INTO api.permissions (permission)
VALUES
  ('form_blocks.select'),
  ('form_blocks.insert'),
  ('form_blocks.update'),
  ('form_blocks.delete');

INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'form_blocks.select'),
  ('admin', 'form_blocks.insert'),
  ('admin', 'form_blocks.update'),
  ('admin', 'form_blocks.delete'),
  ('moderator', 'form_blocks.select');
