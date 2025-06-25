BEGIN;
CREATE EXTENSION IF NOT EXISTS pgtap WITH SCHEMA EXTENSIONS;

SELECT plan(5);

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

-- Make User 1 part of Test 1 and 2
INSERT INTO api.user_test_relations (user_id, test_id)
VALUES
('123e4567-e89b-12d3-a456-426614174000', 1),
('123e4567-e89b-12d3-a456-426614174000', 2);

INSERT INTO storage.buckets (id, name)
VALUES ('other_bucket', 'other_bucket');

INSERT INTO storage.objects (name, bucket_id, owner, metadata)
OVERRIDING SYSTEM VALUE
VALUES
(
	'1/Other File 1.png', 
	'other_bucket', 
	'444e4567-e89b-12d3-a456-426614174123',
	'{"metadata":{"size":1024}}'::jsonb
),
(
	'1/File 1.png', 
	'test_assets', 
	'444e4567-e89b-12d3-a456-426614174123',
	'{"metadata":{"size":1024}}'::jsonb
),
(
	'2/File 2.png', 
	'test_assets', 
	'444e4567-e89b-12d3-a456-426614174123',
	'{"metadata":{"size":1024}}'::jsonb
),
(
	'3/File 3.png', 
	'test_assets', 
	'444e4567-e89b-12d3-a456-426614174123',
	'{"metadata":{"size":1024}}'::jsonb
);


-- as User 1
SET LOCAL ROLE authenticated;
SET LOCAL request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';

SELECT (storage.foldername(name))[1] AS foldern FROM storage.objects;

-- Users can only see files from active test that user is part of
SELECT results_eq(
	$$ SELECT COUNT(*) FROM storage.objects WHERE bucket_id = 'test_assets' $$,
	ARRAY[1::BIGINT],
	'Should only be able to see files from active test that user is part of'
	);

-- Users can't insert
SELECT throws_ok(
	$$
	INSERT INTO storage.objects(name, bucket_id, owner)
	VALUES ('1/User created file.png', 'test_assets', '123e4567-e89b-12d3-a456-426614174000')
	$$
	);

-- Users can't update
SELECT results_ne(
	$$
	UPDATE storage.objects
	SET name = 'User updated.png'
	WHERE name = '1/File 1.png'
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to update'
	);

-- Users can't delete
SELECT results_ne(
	$$
	DELETE FROM storage.objects
	WHERE name = '1/File 1.png'
	RETURNING 1
	$$,
	'VALUES (1)',
	'Shouldnt be able to delete'
	);

-- as User 2
SET LOCAL request.jwt.claim.sub = '987fcdeb-51a2-43d7-9012-345678901234';

-- Users can't select if not part of test
SELECT results_eq(
	$$ SELECT COUNT(*) FROM storage.objects WHERE bucket_id = 'test_assets' $$,
	ARRAY[0::BIGINT],
	'Shouldnt be able to select if not part of test'
	);

SELECT * FROM finish();
ROLLBACK;
