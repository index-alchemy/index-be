DROP TABLE if EXISTS users CASCADE;
DROP TABLE if EXISTS preferences CASCADE;
DROP TABLE if EXISTS sprints CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cohort TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE preferences (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  sprint_id BIGINT REFERENCES sprints(id) ON DELETE CASCADE,
  preference TEXT[] NOT NULL
);

CREATE TABLE comments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  pitch_id BIGINT REFERENCES pitches(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATS TABLE sprints (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  cohort TEXT,
  results JSON,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
