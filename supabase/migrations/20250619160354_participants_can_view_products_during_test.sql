DROP POLICY IF EXISTS "Test participants can view products during test"
ON api.products;

CREATE POLICY "Test participants can view products during test"
ON api.products
FOR SELECT
TO authenticated
USING ( (api.user_is_in_test(test_id) AND api.test_is_active(test_id)) );
