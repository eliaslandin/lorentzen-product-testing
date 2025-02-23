INSERT INTO api.role_permissions (role, permission)
VALUES
  ('admin', 'profiles.select'),
  ('admin', 'profiles.insert'),
  ('admin', 'profiles.update'),
  ('admin', 'profiles.delete'),
  ('admin', 'role_user_relations.select'),
  ('admin', 'role_user_relations.insert'),
  ('admin', 'role_user_relations.update'),
  ('admin', 'role_user_relations.delete'),
  ('moderator', 'profiles.select');
