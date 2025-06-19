alter table "api"."personal_info_submissions" drop constraint "personal_info_submissions_privacy_policy_accepted_check";

alter table "api"."personal_info_submissions" add constraint "personal_info_submissions_gdpr_accepted_check" CHECK ((privacy_policy_accepted IS TRUE)) not valid;

alter table "api"."personal_info_submissions" validate constraint "personal_info_submissions_gdpr_accepted_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION api.test_is_active(test_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM api.tests
    WHERE id = test_id AND active = TRUE
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION api.check_user_permissions(requested_permission text)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
AS $function$DECLARE
    bind_permissions int;
    users_roles TEXT [];
  BEGIN
    IF jsonb_typeof(auth.jwt() -> 'app_metadata' -> 'user_roles') = 'array' THEN
      SELECT array_agg(value::TEXT)
      INTO users_roles
      FROM jsonb_array_elements_text(auth.jwt() -> 'app_metadata' -> 'user_roles') AS value;
    ELSE
      users_roles := ARRAY[]::TEXT[];
    END IF;

    SELECT COUNT(*)
    INTO bind_permissions
    FROM api.role_permission_relations
    WHERE permission = requested_permission
    AND role = ANY(users_roles);

    RETURN bind_permissions > 0;
  END;$function$
;

CREATE OR REPLACE FUNCTION api.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
AS $function$DECLARE
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
      claims := jsonb_set(claims, '{app_metadata, user_roles}', 'null');
    END IF;

    event := jsonb_set(event, '{claims}', claims);

    RETURN event;
  END;$function$
;

create policy "Test participants can view products during test"
on "api"."products"
as permissive
for all
to authenticated
using ((api.user_is_in_test(test_id) AND api.test_is_active(test_id)));



drop function if exists "public"."test_is_active"(test_id bigint);


