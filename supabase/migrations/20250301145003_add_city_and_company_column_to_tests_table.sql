ALTER TABLE api.tests
ADD COLUMN city BIGINT REFERENCES api.cities(id),
ADD COLUMN company BIGINT REFERENCES api.companies(id);
