CREATE OR REPLACE FUNCTION test_is_active(test_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
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
