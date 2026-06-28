/** Logica condivisa di prenotazione (date, notti, prezzi). Pura e testabile. */

/** Converte una Date in stringa locale YYYY-MM-DD (senza shift di timezone). */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Numero di notti tra due date in formato YYYY-MM-DD. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T00:00:00Z`).getTime();
  const end = new Date(`${checkOut}T00:00:00Z`).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

/** Valida l'intervallo: formato corretto, check-out dopo check-in, non nel passato. */
export function validateDateRange(
  checkIn: string,
  checkOut: string
): { ok: true } | { ok: false; error: string } {
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoRe.test(checkIn) || !isoRe.test(checkOut)) {
    return { ok: false, error: "Date non valide." };
  }
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1) {
    return { ok: false, error: "Il check-out deve essere successivo al check-in." };
  }
  const today = toDateString(new Date());
  if (checkIn < today) {
    return { ok: false, error: "Non è possibile prenotare date passate." };
  }
  return { ok: true };
}

/** Formatta un importo in centesimi come valuta EUR. */
export function formatEuro(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
