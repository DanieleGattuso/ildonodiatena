import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import {
  confirmBookingBySession,
  cancelBookingBySession,
  getBookingBySession,
} from "@/lib/db";
import { sendBookingConfirmation } from "@/lib/email";

export const runtime = "edge";

/**
 * POST /api/webhooks/stripe → conferma/annulla la prenotazione in base agli eventi Stripe.
 * Verifica la firma con STRIPE_WEBHOOK_SECRET (constructEventAsync per il runtime edge).
 */
export async function POST(request: NextRequest) {
  const env = getEnv();
  const { DB, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = env;
  const stripe = getStripe(STRIPE_SECRET_KEY);

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Firma mancante." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("webhook signature error", err);
    return NextResponse.json({ error: "Firma non valida." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const paymentIntent =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent?.id ?? null);
        await confirmBookingBySession(DB, session.id, paymentIntent);
        // Email di conferma (no-op se Resend non è configurato).
        const booking = await getBookingBySession(DB, session.id);
        if (booking) await sendBookingConfirmation(env, booking);
        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        await cancelBookingBySession(DB, session.id);
        break;
      }
      default:
        // Eventi non gestiti: ignorati con 200 per evitare retry inutili.
        break;
    }
  } catch (err) {
    console.error("webhook handler error", err);
    return NextResponse.json({ error: "Errore interno." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
