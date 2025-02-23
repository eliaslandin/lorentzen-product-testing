CREATE OR REPLACE FUNCTION api.check_user_permissions(requested_permission TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
AS $$
  DECLARE
    bind_permissions int;
    users_roles TEXT [];
  BEGIN
    SELECT array_agg(value::TEXT) INTO users_roles
    FROM jsonb_array_elements_text(auth.jwt() -> 'app_metadata' -> 'user_roles') AS value;

    SELECT COUNT(*)
    INTO bind_permissions
    FROM api.role_permission_relations
    WHERE permission = requested_permission
    AND role = ANY(user_roles);

    RETURN bind_permissions > 0;
  END;
$$;
