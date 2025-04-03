CREATE OR REPLACE FUNCTION api.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
  DECLARE
    claims jsonb;
    users_roles VARCHAR(255) [];
  BEGIN
    SELECT array_agg(role) INTO users_roles FROM api.role_user_relations WHERE user_id = (event->>'user_id')::UUID;

    claims := event->'claims';

    -- Add app_metadata object if absent
    IF jsonb_typeof(claims->'app_metadata') IS NULL THEN
      claims := jsonb_set(claims, '{app_metadata}', '{}');
    END IF;

    IF users_roles IS NOT NULL THEN
      claims := jsonb_set(claims, '{app_metadata, user_roles}', to_jsonb(users_roles));
    ELSE
      claims := jsonb_set(claims, '{app_metadata}', claims->'app_metadata' - 'user_roles');
    END IF;

    event := jsonb_set(event, '{claims}', claims);

    RETURN event;
  END;
$$;
