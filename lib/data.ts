/**
 * Sorgente unica dei contenuti del sito.
 * Aggiornare qui testi, foto, prezzi e dati di contatto: i componenti li consumano.
 */

export type Apartment = {
  id: "atena" | "era";
  name: string;
  tagline: string;
  description: string;
  features: string[];
  /** Prezzo per notte in centesimi di euro (usato lato server per Stripe). */
  pricePerNight: number;
  maxGuests: number;
  image: string;
  imageAlt: string;
  /** Galleria foto (oltre all'immagine di copertina). */
  gallery: string[];
};

export const apartments: Apartment[] = [
  {
    id: "atena",
    name: "Atena",
    tagline: "Eleganza luminosa affacciata sulla piscina",
    description:
      "L'appartamento Atena è una sintesi di luce e comfort: ambienti spaziosi che si aprono su un'ampia veranda privata con vista diretta sulla piscina. Gli arredi richiamano i toni caldi della terra siciliana, mentre gli spazi esterni indipendenti garantiscono privacy e relax assoluto, nel pieno rispetto del distanziamento.",
    features: [
      "Veranda privata sulla piscina",
      "2 camere da letto matrimoniali",
      "Cucina abitabile completa",
      "Climatizzazione in ogni ambiente",
    ],
    pricePerNight: 12000, // 120,00 €
    maxGuests: 4,
    image: "/images/apartments/atena.jpg",
    imageAlt:
      "Interni luminosi dell'appartamento Atena con veranda affacciata sulla piscina",
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
    tagline: "Intimità e natura tra ulivi e agrumi",
    description:
      "Era è il rifugio ideale per chi cerca quiete e contatto con la natura. Circondato dal verde della tenuta biologica, offre un generoso spazio esterno immerso tra ulivi e agrumeti. Gli interni accoglienti e indipendenti, uniti agli ampi spazi all'aperto, lo rendono perfetto per godere della tranquillità siciliana in totale autonomia.",
    features: [
      "Giardino privato tra gli ulivi",
      "2 camere da letto",
      "Zona pranzo all'aperto",
      "Ingresso totalmente indipendente",
    ],
    pricePerNight: 11000, // 110,00 €
    maxGuests: 4,
    image: "/images/apartments/era.jpg",
    imageAlt:
      "Spazio esterno dell'appartamento Era immerso tra ulivi e agrumeti",
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

export const navLinks = [
  { label: "La Struttura", href: "#struttura" },
  { label: "Appartamenti", href: "#appartamenti" },
  { label: "Territorio", href: "#territorio" },
  { label: "Prenota", href: "#prenota" },
  { label: "Dove siamo", href: "#location" },
];

export type Feature = {
  icon: string; // nome icona lucide
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: "Waves",
    title: "Piscina",
    description:
      "Ampia piscina immersa nel verde, cuore della struttura e luogo perfetto per il relax sotto il sole siciliano.",
  },
  {
    icon: "Leaf",
    title: "Energia rinnovabile",
    description:
      "Impianto fotovoltaico e caldaia a pellet: una struttura sostenibile, a basso impatto ambientale.",
  },
  {
    icon: "Wifi",
    title: "Wi-Fi gratuito",
    description:
      "Connessione veloce in tutta la proprietà, per restare connesso anche in vacanza.",
  },
  {
    icon: "Car",
    title: "Parcheggio privato",
    description:
      "Posto auto riservato all'interno della tenuta, comodo e sicuro.",
  },
  {
    icon: "Snowflake",
    title: "Climatizzazione",
    description:
      "Aria condizionata in tutti gli ambienti per il massimo comfort in ogni stagione.",
  },
  {
    icon: "Trees",
    title: "Tenuta biologica",
    description:
      "Uliveti e agrumeti coltivati biologicamente che circondano gli appartamenti.",
  },
];
