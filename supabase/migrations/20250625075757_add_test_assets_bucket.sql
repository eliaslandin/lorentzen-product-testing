INSERT INTO storage.buckets (id, name, file_size_limit)
VALUES ('test_assets', 'test_assets', 1024 * 1024 * 2);

-- Policies for roles ie admin, moderator
CREATE POLICY "Allow authorized select access on objects in test_assets bucket"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'test_assets'
  AND (SELECT api.check_user_permissions('buckets.test_assets.select'))
);

CREATE POLICY "Allow authorized insert access on objects in test_assets bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'test_assets'
  AND (SELECT api.check_user_permissions('buckets.test_assets.insert'))
);

CREATE POLICY "Allow authorized update access on objects in test_assets bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'test_assets'
  AND (SELECT api.check_user_permissions('buckets.test_assets.update'))
);

CREATE POLICY "Allow authorized delete access on objects in test_assets bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'test_assets'
  AND (SELECT api.check_user_permissions('buckets.test_assets.delete'))
);

-- Policies for users
CREATE POLICY "Participants can view test assets during test"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'test_assets'
  AND api.test_is_active((storage.foldername(name))[1]::BIGINT)
  AND api.user_is_in_test((storage.foldername(name))[1]::BIGINT)
);

-- Policies for roles ie admin, moderator
INSERT INTO api.permissions (permission)
VALUES
  ('buckets.test_assets.select'),
  ('buckets.test_assets.insert'),
  ('buckets.test_assets.update'),
  ('buckets.test_assets.delete');

INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'buckets.test_assets.select'),
  ('admin', 'buckets.test_assets.insert'),
  ('admin', 'buckets.test_assets.update'),
  ('admin', 'buckets.test_assets.delete'),
  ('moderator', 'buckets.test_assets.select');
