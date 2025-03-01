CREATE TABLE IF NOT EXISTS api.city_user_relations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city_id BIGINT REFERENCES api.cities(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE (user_id, city_id)
);

ALTER TABLE api.city_user_relations ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE api.city_user_relations
TO authenticated;

CREATE POLICY "Allow authorized select access on city_user_relations table"
ON api.city_user_relations
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('city_user_relations.select')) );

CREATE POLICY "Allow authorized insert access on city_user_relations table"
ON api.city_user_relations
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('city_user_relations.insert')) );

CREATE POLICY "Allow authorized update access on city_user_relations table"
ON api.city_user_relations
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('city_user_relations.update')) );

CREATE POLICY "Allow authorized delete access on city_user_relations table"
ON api.city_user_relations
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('city_user_relations.delete')) );
