CREATE TABLE IF NOT EXISTS booking_requests (
  id BIGSERIAL PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS partner_requests (
  id BIGSERIAL PRIMARY KEY,
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

CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at ON booking_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_club ON booking_requests(club);
CREATE INDEX IF NOT EXISTS idx_booking_requests_source ON booking_requests(source);
CREATE INDEX IF NOT EXISTS idx_booking_requests_phone ON booking_requests(phone);

CREATE INDEX IF NOT EXISTS idx_partner_requests_status ON partner_requests(status);
CREATE INDEX IF NOT EXISTS idx_partner_requests_created_at ON partner_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_requests_club ON partner_requests(club);
CREATE INDEX IF NOT EXISTS idx_partner_requests_source ON partner_requests(source);
CREATE INDEX IF NOT EXISTS idx_partner_requests_phone ON partner_requests(phone);

DROP TABLE IF EXISTS requests;

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
