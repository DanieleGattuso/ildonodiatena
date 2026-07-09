import type { Dictionary } from "./it";

export const en: Dictionary = {
  nav: {
    links: [
      { label: "The Property", href: "#struttura" },
      { label: "Apartments", href: "#appartamenti" },
      { label: "Pool", href: "#piscina" },
      { label: "Surroundings", href: "#territorio" },
      { label: "Book", href: "#prenota" },
      { label: "Location", href: "#location" },
    ],
    book: "Book",
    bookNow: "Book now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    location: "Cefalù · Sicily",
    title: "Il dono di Atena",
    subtitle: "Your relaxing oasis in Cefalù",
    description:
      "Two independent apartments with a swimming pool, surrounded by an organic estate of olive and citrus trees, just minutes from the historic centre.",
    ctaPrimary: "Info & booking",
    ctaSecondary: "Discover the apartments",
    scroll: "Scroll down",
  },
  features: {
    eyebrow: "The property",
    title: "Every comfort, in harmony with nature",
    description:
      "A modern, sustainable property designed to offer you total relaxation while respecting the environment.",
    items: [
      { icon: "Waves", title: "Swimming pool", description: "A large pool surrounded by greenery, the heart of the property and the perfect place to relax under the Sicilian sun." },
      { icon: "Leaf", title: "Renewable energy", description: "Photovoltaic system and pellet boiler: a sustainable, low-impact property." },
      { icon: "Wifi", title: "Free Wi-Fi", description: "Fast connection throughout the property, to stay connected even on holiday." },
      { icon: "Car", title: "Private parking", description: "A reserved parking space within the estate, convenient and safe." },
      { icon: "Snowflake", title: "Air conditioning", description: "Air conditioning in every room for maximum comfort in any season." },
      { icon: "Trees", title: "Organic estate", description: "Organically grown olive groves and citrus orchards surrounding the apartments." },
    ],
  },
  apartments: {
    eyebrow: "The spaces",
    title: "Two independent apartments",
    description:
      "Atena and Era: two self-contained options with generous outdoor spaces, designed to give you privacy, comfort and distance in the heart of Sicilian nature.",
    label: "Apartment",
    cta: "Check availability",
    photos: "photos",
    items: {
      atena: {
        tagline: "Bright elegance overlooking the pool",
        description:
          "The Atena apartment is a blend of light and comfort: spacious rooms opening onto a large private veranda with a direct view of the pool. The furnishings echo the warm tones of the Sicilian earth, while the independent outdoor spaces ensure absolute privacy and relaxation.",
        alt: "Bright interiors of the Atena apartment with a veranda overlooking the pool",
        features: [
          "Private veranda by the pool",
          "2 double bedrooms",
          "Fully equipped eat-in kitchen",
          "Air conditioning in every room",
        ],
      },
      era: {
        tagline: "Intimacy and nature among olive and citrus trees",
        description:
          "Era is the ideal retreat for those seeking quiet and contact with nature. Surrounded by the greenery of the organic estate, it offers a generous outdoor space among olive and citrus trees. Its welcoming, independent interiors and ample outdoor areas make it perfect for enjoying Sicilian tranquillity in full autonomy.",
        alt: "Outdoor space of the Era apartment surrounded by olive and citrus trees",
        features: [
          "Private garden among the olive trees",
          "2 bedrooms",
          "Outdoor dining area",
          "Fully independent entrance",
        ],
      },
    },
  },
  outdoor: {
    eyebrow: "Shared spaces",
    title: "The pool and the outdoor areas",
    description:
      "At the heart of the property, the pool is surrounded by a large olive garden, sun loungers and shaded dining areas: the perfect place to relax in the sun or dine under the Sicilian stars.",
    alt: "Pool and garden at Il dono di Atena",
    photos: "photos",
  },
  experience: {
    eyebrow: "Experience & Surroundings",
    title: "Where the view meets the flavours of Sicily",
    description:
      "From the estate the view embraces the Norman cathedral, the Rocca and, on the clearest days, the Aeolian Islands. All around, organic olive groves and citrus orchards tell the authentic story of the Sicilian land: an experience to live and to taste.",
    items: [
      { icon: "Eye", title: "Norman cathedral view", text: "The view opens onto the profile of the famous cathedral and the rooftops of the old town." },
      { icon: "Mountain", title: "The Rocca of Cefalù", text: "The imposing headland dominating the town, an ideal destination for sunset hikes." },
      { icon: "Waves", title: "Aeolian Islands on the horizon", text: "On clear days, the silhouette of the Aeolian Islands draws the horizon over the sea." },
      { icon: "Sprout", title: "Organic production", text: "Extra-virgin olive oil and citrus fruits grown organically within the estate." },
    ],
    imageAlt: "Panoramic view from Il dono di Atena: cathedral, Rocca and olive groves",
  },
  booking: {
    eyebrow: "Book now",
    title: "Check availability and book",
    description:
      "Choose the apartment, select your dates on the calendar and complete your booking in a few steps with secure payment.",
    apartment: "Apartment",
    perNight: "/ night",
    name: "Full name",
    namePlaceholder: "John Smith",
    email: "Email",
    emailPlaceholder: "john@email.com",
    guests: "Guests",
    guest: "guest",
    guestsPlural: "guests",
    night: "night",
    nightsPlural: "nights",
    selectDates: "Select your dates on the calendar",
    total: "Total",
    submit: "Proceed to payment",
    redirecting: "Redirecting…",
    secure:
      "Secure payment via Stripe. No card details pass through our servers.",
    errorGeneric: "Unexpected error.",
  },
  location: {
    eyebrow: "Location",
    title: "A strategic location",
    description:
      "Nestled in the countryside yet a stone's throw from the sea and the town: the ideal starting point to discover Cefalù and Sicily.",
    items: [
      { icon: "Car", title: "Near the motorway exit", text: "Quick and convenient access for those arriving by car, without crossing city traffic." },
      { icon: "Building2", title: "4 km from the old town", text: "Just minutes from the cathedral, the seafront and the streets of central Cefalù." },
      { icon: "Plane", title: "Palermo airport", text: "About an hour's drive from the Falcone-Borsellino international airport." },
    ],
    mapTitle: "Map of Il dono di Atena in Cefalù",
    mapNotice:
      "To show the map we need to load Google Maps content, which may set third-party cookies.",
    enableMap: "Load the map",
  },
  footer: {
    tagline:
      "Your relaxing oasis in Cefalù: a villa with a pool set in an organic estate of olive and citrus trees.",
    explore: "Explore",
    contacts: "Contacts",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
  success: {
    title: "Thank you, booking confirmed!",
    text: "Your payment was successful. You will shortly receive a confirmation email with all the details of your stay at Il dono di Atena.",
    home: "Back to home",
  },
  cancelled: {
    title: "Payment cancelled",
    text: "The booking was not completed and no amount was charged. The dates are still available: you can try again whenever you like.",
    retry: "Try booking again",
  },
  cookieBanner: {
    text: "We use technical cookies and, with your consent, third-party cookies (Google Maps, Stripe) to improve your experience.",
    accept: "Accept",
    reject: "Necessary only",
    more: "Cookie Policy",
  },
};
