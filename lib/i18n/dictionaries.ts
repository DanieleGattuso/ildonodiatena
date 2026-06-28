import type { Locale } from "./config";
import { it, type Dictionary } from "./it";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { it, en };

/** Restituisce il dizionario per la lingua richiesta. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? it;
}

export type { Dictionary };
