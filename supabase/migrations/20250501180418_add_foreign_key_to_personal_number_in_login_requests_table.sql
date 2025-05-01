ALTER TABLE api.login_requests
ADD CONSTRAINT login_requests_personal_number_fkey
FOREIGN KEY (personal_number) REFERENCES api.profiles(personal_number);
