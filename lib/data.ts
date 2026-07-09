/**
 * Dati neutri rispetto alla lingua: id, prezzi, immagini, contatti.
 * Tutti i testi localizzati vivono nei dizionari (lib/i18n).
 */

export type ApartmentId = "atena" | "era";

export type Apartment = {
  id: ApartmentId;
  name: string;
  /** Prezzo per notte in centesimi di euro (usato lato server per Stripe). */
  pricePerNight: number;
  maxGuests: number;
  image: string;
  /** Galleria foto (la prima è la copertina). */
  gallery: string[];
};

/**
 * Costruisce l'elenco dei percorsi immagine numerati (es. atena-01.webp …).
 * Le foto sono ordinate con la copertina in prima posizione.
 */
function gallery(folder: string, prefix: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `/images/${folder}/${prefix}-${String(i + 1).padStart(2, "0")}.webp`
  );
}

const atenaGallery = gallery("apartments/atena", "atena", 20);
const eraGallery = gallery("apartments/era", "era", 14);

export const apartments: Apartment[] = [
  {
    id: "atena",
    name: "Atena",
    pricePerNight: 12000, // 120,00 €
    maxGuests: 4,
    image: atenaGallery[0],
    gallery: atenaGallery,
  },
  {
    id: "era",
    name: "Era",
    pricePerNight: 11000, // 110,00 €
    maxGuests: 4,
    image: eraGallery[0],
    gallery: eraGallery,
  },
];

/** Foto degli spazi comuni: piscina, giardino e zone pranzo all'aperto. */
export const outdoorGallery: string[] = gallery("outdoor", "outdoor", 23);

/** Lookup rapido per id (usato lato server in fase di checkout). */
export function getApartment(id: string): Apartment | undefined {
  return apartments.find((a) => a.id === id);
}

export const contact = {
  address: "Via dei Papaveri, Cefalù (PA)",
  phone: "+39 000 000 0000",
  phoneHref: "tel:+390000000000",
  email: "info@ildonodiatena.it",
  emailHref: "mailto:info@ildonodiatena.it",
  mapsQuery: "Via+dei+Papaveri,+Cefalù",
};
