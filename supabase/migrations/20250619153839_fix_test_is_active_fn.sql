DROP FUNCTION IF EXISTS test_is_active;

CREATE OR REPLACE FUNCTION api.test_is_active(test_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
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
