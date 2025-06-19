CREATE TABLE IF NOT EXISTS api.personal_info_submissions (
  user_id UUID REFERENCES api.profiles(id) NOT NULL,
  test_id BIGINT REFERENCES api.tests(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email VARCHAR(255),
  tel VARCHAR(16),
  address VARCHAR(255),
  postal_code VARCHAR(16),
  terms_accepted BOOLEAN NOT NULL CHECK (terms_accepted IS TRUE),
  terms_accepted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  privacy_policy_accepted BOOLEAN NOT NULL CHECK (privacy_policy_accepted IS TRUE),
  privacy_policy_accepted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, test_id)
);
