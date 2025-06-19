CREATE OR REPLACE FUNCTION api.user_is_in_test(p_test_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM api.user_test_relations
    WHERE test_id = p_test_id AND user_id = ( SELECT auth.uid() )
  );
END;
$$;
