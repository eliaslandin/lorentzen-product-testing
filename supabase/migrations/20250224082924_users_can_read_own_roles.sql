CREATE POLICY "Allow users to read their own role"
ON api.role_user_relations
FOR SELECT
TO authenticated
USING ( (SELECT auth.uid()) = user_id );
