ALTER TABLE api.products
ADD COLUMN image_id UUID REFERENCES storage.objects(id) ON DELETE SET NULL;
