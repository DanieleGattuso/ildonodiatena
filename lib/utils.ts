/**
 * Concatena classi condizionali rimuovendo i valori falsy.
 * Versione leggera di clsx, sufficiente per i nostri componenti.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
