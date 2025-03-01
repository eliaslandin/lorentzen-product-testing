CREATE TABLE IF NOT EXISTS api.tests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMPTZ,
  city BIGINT REFERENCES api.cities(id) NOT NULL,
  active BOOLEAN DEFAULT FALSE NOT NULL,
  company BIGINT REFERENCES api.companies(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE api.tests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.tests
TO authenticated;

CREATE POLICY "Allow authorized select access on tests table"
ON api.tests
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('tests.select')) );

CREATE POLICY "Allow authorized insert access on tests table"
ON api.tests
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('tests.insert')) );

CREATE POLICY "Allow authorized update access on tests table"
ON api.tests
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('tests.update')) );

CREATE POLICY "Allow authorized delete access on tests table"
ON api.tests
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('tests.delete')) );
