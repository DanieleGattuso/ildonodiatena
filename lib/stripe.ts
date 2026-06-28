import Stripe from "stripe";

/**
 * Crea un client Stripe compatibile con il runtime edge di Cloudflare Workers
 * (usa il fetch HTTP client invece del modulo http di Node).
 */
export function getStripe(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    apiVersion: "2025-02-24.acacia",
    httpClient: Stripe.createFetchHttpClient(),
  });
}
