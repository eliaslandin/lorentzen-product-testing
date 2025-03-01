INSERT INTO api.role_permission_relations (role, permission)
VALUES
  ('admin', 'tests.select'),
  ('admin', 'tests.insert'),
  ('admin', 'tests.update'),
  ('admin', 'tests.delete'),
  ('admin', 'companies.select'),
  ('admin', 'companies.insert'),
  ('admin', 'companies.update'),
  ('admin', 'companies.delete');
