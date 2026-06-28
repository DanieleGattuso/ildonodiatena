import type { Booking, BookedRange, BookingStatus } from "@/lib/types";

/**
 * Helper di accesso al database Cloudflare D1.
 * Tutte le funzioni ricevono l'istanza D1 per restare testabili e disaccoppiate.
 */

/** Stati che occupano effettivamente le date (bloccano nuove prenotazioni). */
const BLOCKING_STATUSES: BookingStatus[] = ["pending", "confirmed"];

/** Ritorna gli intervalli occupati per un appartamento (per il calendario). */
export async function getBookedRanges(
  db: D1Database,
  apartmentId: string
): Promise<BookedRange[]> {
  const { results } = await db
    .prepare(
      `SELECT check_in AS "from", check_out AS "to"
         FROM bookings
        WHERE apartment_id = ?1
          AND status IN ('pending', 'confirmed')`
    )
    .bind(apartmentId)
    .all<BookedRange>();
  return results ?? [];
}

/**
 * Verifica se esiste una prenotazione attiva sovrapposta all'intervallo richiesto.
 * Due intervalli [a,b) e [c,d) si sovrappongono se a < d e c < b.
 */
export async function hasOverlap(
  db: D1Database,
  apartmentId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const row = await db
    .prepare(
      `SELECT COUNT(*) AS n
         FROM bookings
        WHERE apartment_id = ?1
          AND status IN ('pending', 'confirmed')
          AND check_in < ?3
          AND check_out > ?2`
    )
    .bind(apartmentId, checkIn, checkOut)
    .first<{ n: number }>();
  return (row?.n ?? 0) > 0;
}

/** Inserisce una prenotazione in stato "pending" (in attesa del pagamento). */
export async function createPendingBooking(
  db: D1Database,
  booking: Omit<
    Booking,
    "status" | "stripe_payment_intent" | "created_at"
  > & { status?: BookingStatus }
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO bookings
         (id, apartment_id, guest_name, guest_email, check_in, check_out,
          guests, nights, amount_total, currency, status, stripe_session_id)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, 'pending', ?11)`
    )
    .bind(
      booking.id,
      booking.apartment_id,
      booking.guest_name,
      booking.guest_email,
      booking.check_in,
      booking.check_out,
      booking.guests,
      booking.nights,
      booking.amount_total,
      booking.currency,
      booking.stripe_session_id
    )
    .run();
}

/** Conferma una prenotazione dopo il pagamento andato a buon fine. */
export async function confirmBookingBySession(
  db: D1Database,
  sessionId: string,
  paymentIntent: string | null
): Promise<void> {
  await db
    .prepare(
      `UPDATE bookings
          SET status = 'confirmed', stripe_payment_intent = ?2
        WHERE stripe_session_id = ?1
          AND status = 'pending'`
    )
    .bind(sessionId, paymentIntent)
    .run();
}

/** Annulla una prenotazione pending (sessione scaduta o pagamento fallito). */
export async function cancelBookingBySession(
  db: D1Database,
  sessionId: string
): Promise<void> {
  await db
    .prepare(
      `UPDATE bookings
          SET status = 'cancelled'
        WHERE stripe_session_id = ?1
          AND status = 'pending'`
    )
    .bind(sessionId)
    .run();
}

export type { Booking, BookedRange };
