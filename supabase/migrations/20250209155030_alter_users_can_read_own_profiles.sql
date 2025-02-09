ALTER POLICY "Users can read own profile"
ON profile
TO authenticated
USING ((SELECT auth.uid()) = profile.id);