CREATE TABLE IF NOT EXISTS requests (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('booking', 'partner')),
  payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'in-progress', 'closed')) DEFAULT 'new',
  city TEXT,
  club TEXT,
  source TEXT,
  manager_note TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE requests ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS manager_note TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS phone TEXT;

CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_requests_club ON requests(club);
CREATE INDEX IF NOT EXISTS idx_requests_source ON requests(source);
CREATE INDEX IF NOT EXISTS idx_requests_phone ON requests(phone);

CREATE TABLE IF NOT EXISTS live_current (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live_leaderboard (
  id BIGSERIAL PRIMARY KEY,
  rank INTEGER NOT NULL,
  nick TEXT NOT NULL,
  kd NUMERIC(8,2) NOT NULL,
  winrate NUMERIC(5,2) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_leaderboard_rank ON live_leaderboard(rank);
