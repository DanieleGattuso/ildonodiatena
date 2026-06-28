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

export const apartments: Apartment[] = [
  {
    id: "atena",
    name: "Atena",
    pricePerNight: 12000, // 120,00 €
    maxGuests: 4,
    image: "/images/apartments/atena.jpg",
    gallery: [
      "/images/apartments/atena.jpg",
      "/images/apartments/atena-1.jpg",
      "/images/apartments/atena-2.jpg",
      "/images/apartments/atena-3.jpg",
    ],
  },
  {
    id: "era",
    name: "Era",
    pricePerNight: 11000, // 110,00 €
    maxGuests: 4,
    image: "/images/apartments/era.jpg",
    gallery: [
      "/images/apartments/era.jpg",
      "/images/apartments/era-1.jpg",
      "/images/apartments/era-2.jpg",
      "/images/apartments/era-3.jpg",
    ],
  },
];

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
