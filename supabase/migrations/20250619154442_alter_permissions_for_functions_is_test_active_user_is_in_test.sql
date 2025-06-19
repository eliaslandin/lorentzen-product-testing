CREATE OR REPLACE FUNCTION api.test_is_active(test_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS
$$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM api.tests
    WHERE id = test_id AND active = TRUE
  );
END;
$$;

CREATE OR REPLACE FUNCTION api.user_is_in_test(p_test_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS
$$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM api.user_test_relations
    WHERE test_id = p_test_id AND user_id = ( SELECT auth.uid() )
  );
END;
$$;
