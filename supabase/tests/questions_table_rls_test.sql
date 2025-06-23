BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(6);

INSERT INTO auth.users (id, email) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'user1@test.com'),
	('987fcdeb-51a2-43d7-9012-345678901234', 'user2@test.com');

INSERT INTO api.profiles (id, name, personal_number) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'User 1', 199407031234),
	('987fcdeb-51a2-43d7-9012-345678901234', 'User 2', 200101024321);

INSERT INTO api.tests (id, name, active) 
OVERRIDING SYSTEM VALUE
VALUES	(1, 'Test 1', TRUE),
	(2, 'Test 2', FALSE);

-- Make User 1 part of Test 1 and 2
INSERT INTO api.user_test_relations (user_id, test_id)
VALUES
('123e4567-e89b-12d3-a456-426614174000', 1),
('123e4567-e89b-12d3-a456-426614174000', 2);

INSERT INTO api.questions (id, title, test_id)
OVERRIDING SYSTEM VALUE
VALUES
(1, 'Test 1 Question 1', 1),
(2, 'Test 1 Question 2', 1),
(3, 'Test 2 Question 1', 2);

-- as User 1
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';

-- Users can't select if test is inactive
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.questions WHERE test_id = 2 $$,
	ARRAY[0::BIGINT],
	'Shouldnt be able to select if test is inactive'
	);

-- Users can't insert
SELECT throws_ok(
	$$
	INSERT INTO api.questions(title)
	VALUES ('User created question')
	$$
	);

-- Users can't update
SELECT results_ne(
	$$
	UPDATE api.questions
	SET title = 'User updated'
	WHERE id = 1
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to update'
	);

-- Users can't delete
SELECT results_ne(
	$$
	DELETE FROM api.questions
	WHERE id = 1
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to delete'
	);

-- Users can view questions if part of test and test is active
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.questions WHERE test_id = 1 $$,
	ARRAY[2::BIGINT],
	'Should be able to see questions if part of test and test is active'
	);


-- as User 2
SET LOCAL request.jwt.claim.sub = '987fcdeb-51a2-43d7-9012-345678901234';

-- Users can't select if not part of test
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.questions WHERE test_id = 1 $$,
	ARRAY[0::BIGINT],
	'Shouldnt be able to select if not part of test'
	);

SELECT * FROM finish();
ROLLBACK;
