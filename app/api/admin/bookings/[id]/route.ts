import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { getBookingById, updateBookingStatus } from "@/lib/db";

export const runtime = "edge";

type Action = "confirm" | "cancel" | "refund";

/**
 * PATCH /api/admin/bookings/:id  body { action }
 * confirm → conferma · cancel → annulla · refund → rimborsa su Stripe e annulla.
 * Protetto da ADMIN_TOKEN.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { DB, ADMIN_TOKEN, STRIPE_SECRET_KEY } = getEnv();

  if (!ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Area admin non configurata." },
      { status: 503 }
    );
  }
  const provided =
    request.headers.get("x-admin-token") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (provided !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  const { id } = await params;
  let action: Action;
  try {
    ({ action } = (await request.json()) as { action: Action });
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const booking = await getBookingById(DB, id);
  if (!booking) {
    return NextResponse.json(
      { error: "Prenotazione non trovata." },
      { status: 404 }
    );
  }

  try {
    switch (action) {
      case "confirm":
        await updateBookingStatus(DB, id, "confirmed");
        break;

      case "cancel":
        await updateBookingStatus(DB, id, "cancelled");
        break;

      case "refund": {
        if (!booking.stripe_payment_intent) {
          return NextResponse.json(
            { error: "Nessun pagamento da rimborsare per questa prenotazione." },
            { status: 400 }
          );
        }
        const stripe = getStripe(STRIPE_SECRET_KEY);
        await stripe.refunds.create({
          payment_intent: booking.stripe_payment_intent,
        });
        await updateBookingStatus(DB, id, "cancelled");
        break;
      }

      default:
        return NextResponse.json(
          { error: "Azione non valida." },
          { status: 400 }
        );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin action error", err);
    return NextResponse.json(
      { error: "Errore nell'esecuzione dell'azione." },
      { status: 500 }
    );
  }
}
