DROP POLICY IF EXISTS "Users can see their own personal info"
ON api.personal_info_submissions;

CREATE POLICY "Users can see their own personal info"
ON api.personal_info_submissions
FOR SELECT
TO authenticated
USING (
  (SELECT auth.uid()) = user_id 
  AND api.test_is_active(test_id)
  AND api.user_is_in_test(test_id)
);

DROP POLICY IF EXISTS "Users can insert their own personal info"
ON api.personal_info_submissions;

CREATE POLICY "Users can insert their own personal info"
ON api.personal_info_submissions
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT auth.uid()) = user_id 
  AND api.test_is_active(test_id)
  AND api.user_is_in_test(test_id)
);

DROP POLICY IF EXISTS "Users can update their own personal info"
ON api.personal_info_submissions;

CREATE POLICY "Users can update their own personal info"
ON api.personal_info_submissions
FOR UPDATE
TO authenticated
USING (
  (SELECT auth.uid()) = user_id 
  AND api.test_is_active(test_id)
  AND api.user_is_in_test(test_id)
)
WITH CHECK (
  (SELECT auth.uid()) = user_id
);

CREATE OR REPLACE FUNCTION api.prevent_update_test_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.test_id IS DISTINCT FROM OLD.test_id THEN
    RAISE EXCEPTION 'Updating test id is not allowed';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER personal_info_submissions_prevent_update_test_id
BEFORE UPDATE ON api.personal_info_submissions
FOR EACH ROW EXECUTE FUNCTION api.prevent_update_test_id();
