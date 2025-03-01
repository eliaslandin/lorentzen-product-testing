CREATE TABLE IF NOT EXISTS api.cities (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255)
);

ALTER TABLE api.cities ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE api.cities TO authenticated;

CREATE POLICY "Allow authorized select access on cities table"
ON api.cities
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('cities.select')) );

CREATE POLICY "Allow authorized insert access on cities table"
ON api.cities
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('cities.insert')) );

CREATE POLICY "Allow authorized update access on cities table"
ON api.cities
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('cities.update')) );

CREATE POLICY "Allow authorized delete access on cities table"
ON api.cities
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('cities.delete')) );
