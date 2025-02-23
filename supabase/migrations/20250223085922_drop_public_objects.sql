DROP TABLE IF EXISTS public.test;

DROP TABLE IF EXISTS public.profile;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS public.handle_new_user;
