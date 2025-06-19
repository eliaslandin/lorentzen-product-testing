BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(7);

INSERT INTO auth.users (id, email) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'user1@test.com'),
	('987fcdeb-51a2-43d7-9012-345678901234', 'user2@test.com');

-- Make Test 1 active
UPDATE api.tests
SET active = FALSE;

UPDATE api.tests
SET active = TRUE
WHERE id = 1;

-- Make User 1 part of Test 1 and 2
INSERT INTO api.user_test_relations (user_id, test_id)
VALUES 
	('123e4567-e89b-12d3-a456-426614174000', 1)
	('123e4567-e89b-12d3-a456-426614174000', 2);

INSERT INTO api.products (name, description, test_id) 
VALUES	
	('Test 1 Product 1', 'T1P1 Desc...', 1),
	('Test 1 Product 2', 'T1P2 Desc...', 1),
	('Test 2 Product 1', 'T2P1 Desc...', 2),

-- as User 1
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';

SELECT results_eq(
	api.test_is_active(1),
	TRUE,
	'Test 1 should be active'
);

SELECT results_eq(
	api.test_is_active(2),
	FALSE,
	'Test 2 should be inactive'
);

SELECT results_eq(
	api.user_is_in_test(1),
	TRUE,
	'User 1 should be part of Test 1'
);

SELECT results_eq(
	api.user_is_in_test(3),
	FALSE,
	'User 1 should not be part of Test 3'
);

SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.products $$,
	ARRAY[2::BIGINT],
	'Users part of active test should be able to view only active tests products'
);

SELECT throws_ok(
	$$ INSERT INTO api.products (name, test_id) VALUES ('User Created Product', 1) $$,
	'Users should not be able to create products'
);

SELECT throws_ok(
	$$ UPDATE api.products SET name = 'User Updated Product' WHERE id = 1 $$,
	'Users should not be able to update products'
);

SELECT throws_ok(
	$$ DELETE FROM api.products WHERE id = 1 $$,
	'Users should not be able to delete products'
);

-- as User 2
SET LOCAL request.jwt.claim.sub = '987fcdeb-51a2-43d7-9012-345678901234';

SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.products $$,
	ARRAY[0],
	'Users not part of active test should not be able to view test products'
);


SELECT * FROM finish();
ROLLBACK;
