/**
 * Sorgente unica dei contenuti del sito.
 * Aggiornare qui testi, foto e dati di contatto: i componenti li consumano.
 */

export type Apartment = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
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
    image: "/images/apartments/atena.jpg",
    imageAlt:
      "Interni luminosi dell'appartamento Atena con veranda affacciata sulla piscina",
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
    image: "/images/apartments/era.jpg",
    imageAlt:
      "Spazio esterno dell'appartamento Era immerso tra ulivi e agrumeti",
  },
];

export const contact = {
  address: "Via dei Papaveri, Cefalù (PA)",
  phone: "+39 000 000 0000",
  phoneHref: "tel:+390000000000",
  email: "info@ildonodiatena.it",
  emailHref: "mailto:info@ildonodiatena.it",
};

export const navLinks = [
  { label: "La Struttura", href: "#struttura" },
  { label: "Appartamenti", href: "#appartamenti" },
  { label: "Territorio", href: "#territorio" },
  { label: "Dove siamo", href: "#location" },
];
