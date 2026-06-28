export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

/** True se la stringa è una lingua supportata. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
