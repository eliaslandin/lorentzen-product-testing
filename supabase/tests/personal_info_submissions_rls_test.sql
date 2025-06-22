BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(11);

INSERT INTO auth.users (id, email) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'user1@test.com'),
	('987fcdeb-51a2-43d7-9012-345678901234', 'user2@test.com');

INSERT INTO api.profiles (id, name, personal_number) 
VALUES	('123e4567-e89b-12d3-a456-426614174000', 'User 1', 199407031234),
	('987fcdeb-51a2-43d7-9012-345678901234', 'User 2', 200101024321);

INSERT INTO api.tests (id, name, active) 
OVERRIDING SYSTEM VALUE
VALUES	(1, 'Test 1', TRUE),
	(2, 'Test 2', FALSE),
	(3, 'Test 3', TRUE);

-- Make User 1 part of Test 1 and 2 and User 2 part of Test 3
INSERT INTO api.user_test_relations (user_id, test_id)
VALUES
('123e4567-e89b-12d3-a456-426614174000', 1),
('123e4567-e89b-12d3-a456-426614174000', 2),
('987fcdeb-51a2-43d7-9012-345678901234', 3);

INSERT INTO api.personal_info_submissions(user_id, test_id, email, terms_accepted, privacy_policy_accepted)
VALUES
	('123e4567-e89b-12d3-a456-426614174000', 1, 'user1test1@test.com', TRUE, TRUE),
	('123e4567-e89b-12d3-a456-426614174000', 2, 'user1test2@test.com', TRUE, TRUE),
	('987fcdeb-51a2-43d7-9012-345678901234', 2, 'user2test1@test.com', TRUE, TRUE);

-- as User 1
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';

-- Users can't select if test is inactive
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.personal_info_submissions WHERE test_id = 2 $$,
	ARRAY[0::BIGINT],
	'Shouldnt be able to select if test is inactive'
	);

-- Users can't insert if test is inactive
SELECT throws_ok(
	$$
	INSERT INTO api.personal_info_submissions(user_id, test_id, email, terms_accepted, privacy_policy_accepted)
	VALUES ('123e4567-e89b-12d3-a456-426614174000', 2, 'user1test1@test.com', TRUE, TRUE)
	$$
	);

-- Users can't update if test is inactive
SELECT results_ne(
	$$
	UPDATE api.personal_info_submissions
	SET email = 'updated@test.com'
	WHERE user_id = '123e4567-e89b-12d3-a456-426614174000' AND test_id = 2
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to update if test is inactive'
	);

-- Users can't update the user id
SELECT throws_ok(
	$$
	UPDATE api.personal_info_submissions
	SET user_id = '987fcdeb-51a2-43d7-9012-345678901234'
	WHERE user_id = '123e4567-e89b-12d3-a456-426614174000' AND test_id = 1
	$$
	);

-- Users can't update the test id
SELECT throws_ok(
	$$
	UPDATE api.personal_info_submissions
	SET test_id = 'updated_test_id'
	WHERE user_id = '123e4567-e89b-12d3-a456-426614174000' AND test_id = 1
	$$
	);

-- Users can view their submissions if part of test and test is active
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.personal_info_submissions WHERE test_id = 1 $$,
	ARRAY[1::BIGINT],
	'Should be able to see their own submissions if test is active'
	);

-- Users can update if part of test and test is active
SELECT results_eq(
	$$
	UPDATE api.personal_info_submissions
	SET email = 'updated@test.com'
	WHERE user_id = '123e4567-e89b-12d3-a456-426614174000' AND test_id = 1
	RETURNING 1
	$$,
	'VALUES (1)',
	'Should be able to see update own submissions if test is active'
);


-- as User 2
SET LOCAL request.jwt.claim.sub = '987fcdeb-51a2-43d7-9012-345678901234';

-- Users can't select if not part of test
SELECT results_eq(
	$$ SELECT COUNT(*) FROM api.personal_info_submissions WHERE test_id = 1 $$,
	ARRAY[0::BIGINT],
	'Shouldnt be able to select if not part of test'
	);

-- Users can't insert if not part of test
SELECT throws_ok(
	$$
	INSERT INTO api.personal_info_submissions(user_id, test_id, email, terms_accepted, privacy_policy_accepted)
	VALUES ('987fcdeb-51a2-43d7-9012-345678901234', 1, 'user2test1@test.com', TRUE, TRUE)
	$$
	);

-- Users can't update if not part of test
SELECT results_ne(
	$$
	UPDATE api.personal_info_submissions
	SET email = 'updated@test.com'
	WHERE user_id = '987fcdeb-51a2-43d7-9012-345678901234' AND test_id = 1
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to update if not part of test'
	);

-- Users can insert if part of test and test is active
SELECT results_eq(
	$$
	INSERT INTO api.personal_info_submissions(user_id, test_id, email, terms_accepted, privacy_policy_accepted)
	VALUES ('987fcdeb-51a2-43d7-9012-345678901234', 3, 'user2test3@test.com', TRUE, TRUE)
	RETURNING email
	$$,
	$$ VALUES ('user2test3@test.com'::VARCHAR) $$,
	'Should be able to insert their own submissions if test is active'
);

SELECT * FROM finish();
ROLLBACK;
