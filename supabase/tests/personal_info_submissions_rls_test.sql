BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(9);

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

-- Users can't select if test is inactive
-- Users can't insert if test is inactive
-- Users can't update if test is inactive

-- Users can't update the user id
-- Users can't update the test id

-- Users can't select if not part of test
-- Users can't insert if not part of test
-- Users can't update if not part of test

-- Users can select if test is test and test is active
-- Users can insert if part of test and test is active
-- Users can update if test is test and test is active

SELECT * FROM finish();
ROLLBACK;
