INSERT INTO api.permissions (permission)
VALUES
  ('user_test_relations.select'),
  ('user_test_relations.insert'),
  ('user_test_relations.update'),
  ('user_test_relations.delete');

INSERT INTO api.role_permission_relations (role, permission)
VALUES 
  ('admin', 'user_test_relations.select'),
  ('admin', 'user_test_relations.insert'),
  ('admin', 'user_test_relations.update'),
  ('admin', 'user_test_relations.delete');
