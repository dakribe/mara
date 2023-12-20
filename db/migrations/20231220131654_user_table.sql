-- +goose Up
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

-- +goose Down
DROP TABLE users;
