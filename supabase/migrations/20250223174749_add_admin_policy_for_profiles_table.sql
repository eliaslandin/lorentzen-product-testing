CREATE POLICY "Allow authorized select access on profiles table"
ON api.profiles
FOR SELECT
TO authenticated
USING ( (SELECT api.check_user_permissions('profiles.select')) );

CREATE POLICY "Allow authorized insert access on profiles table"
ON api.profiles
FOR INSERT
TO authenticated
WITH CHECK ( (SELECT api.check_user_permissions('profiles.insert')) );

CREATE POLICY "Allow authorized update access on profiles table"
ON api.profiles
FOR UPDATE
TO authenticated
USING ( (SELECT api.check_user_permissions('profiles.update')) );

CREATE POLICY "Allow authorized delete access on profiles table"
ON api.profiles
FOR DELETE
TO authenticated
USING ( (SELECT api.check_user_permissions('profiles.delete')) );
