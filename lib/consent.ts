"use client";

/** Gestione del consenso ai cookie di terze parti (client-side). */

export type Consent = "accepted" | "rejected";

const KEY = "ida_cookie_consent";
export const CONSENT_EVENT = "ida-consent-change";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function setConsent(value: Consent): void {
  localStorage.setItem(KEY, value);
  // Cookie leggibile anche lato server/altri tab, validità 6 mesi.
  document.cookie = `${KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 180}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
