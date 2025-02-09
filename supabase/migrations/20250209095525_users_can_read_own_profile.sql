CREATE POLICY "Users can read own profile"
ON profile
USING ((SELECT auth.uid()) = profile.id);