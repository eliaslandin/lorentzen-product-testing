CREATE POLICY "Users can read which tests they are a part of"
ON api.user_test_relations
FOR SELECT
TO authenticated
USING ( (SELECT auth.uid()) = user_id );
