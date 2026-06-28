import type { Booking, CloudflareEnv } from "@/lib/types";
import { getApartment } from "@/lib/data";
import { formatEuro } from "@/lib/booking";

/**
 * Invia l'email di conferma prenotazione tramite Resend (HTTP API, edge-compatible).
 * Se RESEND_API_KEY non è configurata, la funzione esce senza errori (no-op).
 */
export async function sendBookingConfirmation(
  env: CloudflareEnv,
  booking: Booking
): Promise<void> {
  if (!env.RESEND_API_KEY) return;

  const apartment = getApartment(booking.apartment_id);
  const apartmentName = apartment?.name ?? booking.apartment_id;
  const from = env.EMAIL_FROM ?? "Il dono di Atena <onboarding@resend.dev>";

  const html = `
  <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#262a1a">
    <h1 style="color:#7a8645;font-size:26px">Prenotazione confermata</h1>
    <p>Gentile ${escapeHtml(booking.guest_name)},</p>
    <p>grazie per aver scelto <strong>Il dono di Atena</strong>. Il pagamento è
       andato a buon fine e la tua prenotazione è confermata.</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0;font-family:Arial,sans-serif;font-size:15px">
      <tr><td style="padding:8px 0;color:#5f6a36">Appartamento</td><td style="text-align:right"><strong>${escapeHtml(apartmentName)}</strong></td></tr>
      <tr><td style="padding:8px 0;color:#5f6a36">Check-in</td><td style="text-align:right">${booking.check_in}</td></tr>
      <tr><td style="padding:8px 0;color:#5f6a36">Check-out</td><td style="text-align:right">${booking.check_out}</td></tr>
      <tr><td style="padding:8px 0;color:#5f6a36">Notti</td><td style="text-align:right">${booking.nights}</td></tr>
      <tr><td style="padding:8px 0;color:#5f6a36">Ospiti</td><td style="text-align:right">${booking.guests}</td></tr>
      <tr><td style="padding:12px 0;border-top:1px solid #e7ead5;color:#5f6a36">Totale pagato</td><td style="text-align:right;border-top:1px solid #e7ead5"><strong>${formatEuro(booking.amount_total)}</strong></td></tr>
    </table>
    <p>Ti aspettiamo a Cefalù per un soggiorno indimenticabile.</p>
    <p style="color:#7a8645;font-size:13px">Il dono di Atena · Via dei Papaveri, Cefalù (PA)</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: booking.guest_email,
        subject: "Prenotazione confermata · Il dono di Atena",
        html,
      }),
    });
    if (!res.ok) {
      console.error("resend error", res.status, await res.text());
    }
  } catch (err) {
    // L'invio email non deve mai far fallire il webhook.
    console.error("email send failed", err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
