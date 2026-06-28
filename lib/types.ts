export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  apartment_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  guests: number;
  nights: number;
  amount_total: number; // centesimi
  currency: string;
  status: BookingStatus;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  created_at: string;
};

/** Intervallo prenotato esposto al frontend per disabilitare le date nel calendario. */
export type BookedRange = {
  from: string; // YYYY-MM-DD (check-in)
  to: string; // YYYY-MM-DD (check-out)
};

/** Ambiente Cloudflare con i binding e i secret usati dall'app. */
export interface CloudflareEnv {
  DB: D1Database;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  /** Opzionali: se assenti, le rispettive funzioni si disattivano in sicurezza. */
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  ADMIN_TOKEN?: string;
}
