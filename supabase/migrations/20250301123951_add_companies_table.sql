CREATE TABLE IF NOT EXISTS api.companies (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE api.companies ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.companies
TO authenticated;

CREATE POLICY "Allow authorized select access on companies table"
ON api.companies
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('companies.select')) );

CREATE POLICY "Allow authorized insert access on companies table"
ON api.companies
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('companies.insert')) );

CREATE POLICY "Allow authorized update access on companies table"
ON api.companies
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('companies.update')) );

CREATE POLICY "Allow authorized delete access on companies table"
ON api.companies
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('companies.delete')) );
