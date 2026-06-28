import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { hasOverlap, createPendingBooking } from "@/lib/db";
import { getApartment } from "@/lib/data";
import { nightsBetween, validateDateRange } from "@/lib/booking";

export const runtime = "edge";

type CheckoutBody = {
  apartmentId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  name?: string;
  email?: string;
  lang?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** POST /api/checkout → crea la sessione Stripe Checkout e una prenotazione pending. */
export async function POST(request: NextRequest) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const { apartmentId, checkIn, checkOut, guests, name, email, lang } = body;
  const locale = lang === "en" ? "en" : "it";

  // --- Validazione input ---
  const apartment = apartmentId ? getApartment(apartmentId) : undefined;
  if (!apartment) {
    return NextResponse.json(
      { error: "Appartamento non valido." },
      { status: 400 }
    );
  }
  if (!name?.trim() || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Nome ed email validi sono obbligatori." },
      { status: 400 }
    );
  }
  const guestCount = Number(guests);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > apartment.maxGuests) {
    return NextResponse.json(
      { error: `Numero di ospiti non valido (max ${apartment.maxGuests}).` },
      { status: 400 }
    );
  }
  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: "Date mancanti." }, { status: 400 });
  }
  const range = validateDateRange(checkIn, checkOut);
  if (!range.ok) {
    return NextResponse.json({ error: range.error }, { status: 400 });
  }

  try {
    const { DB, STRIPE_SECRET_KEY } = getEnv();

    // --- Controllo disponibilità (autorità lato server) ---
    if (await hasOverlap(DB, apartment.id, checkIn, checkOut)) {
      return NextResponse.json(
        { error: "Le date selezionate non sono più disponibili." },
        { status: 409 }
      );
    }

    // --- Calcolo prezzo lato server (non fidarsi del client) ---
    const nights = nightsBetween(checkIn, checkOut);
    const amountTotal = nights * apartment.pricePerNight;

    const bookingId = crypto.randomUUID();
    const origin = request.nextUrl.origin;
    const stripe = getStripe(STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountTotal,
            product_data: {
              name: `Soggiorno • Appartamento ${apartment.name}`,
              description: `${checkIn} → ${checkOut} · ${nights} ${
                nights === 1 ? "notte" : "notti"
              } · ${guestCount} ${guestCount === 1 ? "ospite" : "ospiti"}`,
            },
          },
        },
      ],
      metadata: {
        bookingId,
        apartmentId: apartment.id,
        checkIn,
        checkOut,
      },
      success_url: `${origin}/${locale}/prenotazione/successo?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/prenotazione/annullata`,
    });

    // --- Prenotazione pending (blocca le date durante il pagamento) ---
    await createPendingBooking(DB, {
      id: bookingId,
      apartment_id: apartment.id,
      guest_name: name.trim(),
      guest_email: email,
      check_in: checkIn,
      check_out: checkOut,
      guests: guestCount,
      nights,
      amount_total: amountTotal,
      currency: "eur",
      stripe_session_id: session.id,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Impossibile avviare il pagamento. Riprova." },
      { status: 500 }
    );
  }
}
