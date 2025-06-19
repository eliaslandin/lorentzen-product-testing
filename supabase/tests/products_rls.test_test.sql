BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(1);

INSERT INTO auth.users (id, email) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'user1@test.com'),
	('987fcdeb-51a2-43d7-9012-345678901234', 'user2@test.com');

-- Make Test 1 active
UPDATE api.tests
SET active = FALSE;

UPDATE api.tests
SET active = TRUE
WHERE id = 1;

-- Make User 1 part of Test 1
INSERT INTO api.user_test_relations (user_id, test_id)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 1);

INSERT INTO api.products (name, description, test_id) 
VALUES	
	('Test 1 Product 1', 'T1P1 Desc...', 1),
	('Test 1 Product 2', 'T1P2 Desc...', 1),
	('Test 2 Product 1', 'T2P1 Desc...', 2),

-- as User 1
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';

SELECT results_eq(
	$$SELECT COUNT(*) FROM api.products$$,
	2,
	'Users part of active test can view test products'
);

SELECT * FROM finish();
ROLLBACK;
