ALTER TABLE api.login_requests
ADD UNIQUE (pair_code);
