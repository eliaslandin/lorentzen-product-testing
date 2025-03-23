ALTER TABLE api.user_test_relations
DROP CONSTRAINT user_test_relations_user_id_fkey;

ALTER TABLE api.user_test_relations
ADD CONSTRAINT user_test_relations_user_id_fkey
FOREIGN KEY (user_id) REFERENCES api.profiles(id)
ON DELETE CASCADE;


ALTER TABLE api.city_user_relations
DROP CONSTRAINT city_user_relations_user_id_fkey;

ALTER TABLE api.city_user_relations
ADD CONSTRAINT city_user_relations_user_id_fkey
FOREIGN KEY (user_id) REFERENCES api.profiles(id)
ON DELETE CASCADE;
