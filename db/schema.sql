-- Schema database Cloudflare D1 per Il dono di Atena.
-- Applicare con:
--   npm run db:migrate:local    (sviluppo)
--   npm run db:migrate:remote   (produzione)

CREATE TABLE IF NOT EXISTS bookings (
  id                     TEXT PRIMARY KEY,
  apartment_id           TEXT NOT NULL,
  guest_name             TEXT NOT NULL,
  guest_email            TEXT NOT NULL,
  check_in               TEXT NOT NULL,            -- YYYY-MM-DD
  check_out              TEXT NOT NULL,            -- YYYY-MM-DD
  guests                 INTEGER NOT NULL,
  nights                 INTEGER NOT NULL,
  amount_total           INTEGER NOT NULL,         -- centesimi
  currency               TEXT NOT NULL DEFAULT 'eur',
  status                 TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | cancelled
  stripe_session_id      TEXT,
  stripe_payment_intent  TEXT,
  created_at             TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Velocizza i controlli di disponibilità per appartamento e stato.
CREATE INDEX IF NOT EXISTS idx_bookings_apartment_status
  ON bookings (apartment_id, status);

-- Lookup rapido dal webhook Stripe.
CREATE INDEX IF NOT EXISTS idx_bookings_session
  ON bookings (stripe_session_id);
