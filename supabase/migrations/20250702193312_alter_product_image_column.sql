ALTER TABLE api.products
DROP COLUMN image_id;

ALTER TABLE api.products
ADD COLUMN image_name TEXT;
