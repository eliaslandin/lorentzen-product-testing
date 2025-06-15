CREATE TABLE IF NOT EXISTS api.products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  test_id BIGINT NOT NULL REFERENCES api.tests(id) ON DELETE CASCADE
);

ALTER TABLE api.products ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE api.products
TO authenticated;

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on products table"
ON api.products
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('products.select')) );

CREATE POLICY "Allow authorized insert access on products table"
ON api.products
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('products.insert')) );

CREATE POLICY "Allow authorized update access on products table"
ON api.products
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('products.update')) );

CREATE POLICY "Allow authorized delete access on products table"
ON api.products
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('products.delete')) );

INSERT INTO api.permissions (permission)
VALUES 
  ('products.select'),
  ('products.insert'),
  ('products.update'),
  ('products.delete');


INSERT INTO api.role_permission_relations (role, permission)
VALUES 
  ('admin', 'products.select'),
  ('admin', 'products.insert'),
  ('admin', 'products.update'),
  ('admin', 'products.delete'),
  ('moderator', 'products.select'),
  ('moderator', 'products.update');
