export const it = {
  nav: {
    links: [
      { label: "La Struttura", href: "#struttura" },
      { label: "Appartamenti", href: "#appartamenti" },
      { label: "Territorio", href: "#territorio" },
      { label: "Prenota", href: "#prenota" },
      { label: "Dove siamo", href: "#location" },
    ],
    book: "Prenota",
    bookNow: "Prenota ora",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
  },
  hero: {
    location: "Cefalù · Sicilia",
    title: "Il dono di Atena",
    subtitle: "La tua oasi di relax a Cefalù",
    description:
      "Due appartamenti indipendenti con piscina, immersi in una tenuta biologica di ulivi e agrumi, a pochi minuti dal centro storico.",
    ctaPrimary: "Info e prenotazioni",
    ctaSecondary: "Scopri gli appartamenti",
    scroll: "Scorri verso il basso",
  },
  features: {
    eyebrow: "La struttura",
    title: "Tutto il comfort, nel rispetto della natura",
    description:
      "Una struttura moderna e sostenibile, pensata per offrirti il massimo del relax con un occhio di riguardo all'ambiente.",
    items: [
      { icon: "Waves", title: "Piscina", description: "Ampia piscina immersa nel verde, cuore della struttura e luogo perfetto per il relax sotto il sole siciliano." },
      { icon: "Leaf", title: "Energia rinnovabile", description: "Impianto fotovoltaico e caldaia a pellet: una struttura sostenibile, a basso impatto ambientale." },
      { icon: "Wifi", title: "Wi-Fi gratuito", description: "Connessione veloce in tutta la proprietà, per restare connesso anche in vacanza." },
      { icon: "Car", title: "Parcheggio privato", description: "Posto auto riservato all'interno della tenuta, comodo e sicuro." },
      { icon: "Snowflake", title: "Climatizzazione", description: "Aria condizionata in tutti gli ambienti per il massimo comfort in ogni stagione." },
      { icon: "Trees", title: "Tenuta biologica", description: "Uliveti e agrumeti coltivati biologicamente che circondano gli appartamenti." },
    ],
  },
  apartments: {
    eyebrow: "Gli spazi",
    title: "Due appartamenti indipendenti",
    description:
      "Atena ed Era: due soluzioni autonome con ampi spazi esterni, pensate per garantirti privacy, comfort e distanziamento nel cuore della natura siciliana.",
    label: "Appartamento",
    cta: "Richiedi disponibilità",
    photos: "foto",
    items: {
      atena: {
        tagline: "Eleganza luminosa affacciata sulla piscina",
        description:
          "L'appartamento Atena è una sintesi di luce e comfort: ambienti spaziosi che si aprono su un'ampia veranda privata con vista diretta sulla piscina. Gli arredi richiamano i toni caldi della terra siciliana, mentre gli spazi esterni indipendenti garantiscono privacy e relax assoluto, nel pieno rispetto del distanziamento.",
        alt: "Interni luminosi dell'appartamento Atena con veranda affacciata sulla piscina",
        features: [
          "Veranda privata sulla piscina",
          "2 camere da letto matrimoniali",
          "Cucina abitabile completa",
          "Climatizzazione in ogni ambiente",
        ],
      },
      era: {
        tagline: "Intimità e natura tra ulivi e agrumi",
        description:
          "Era è il rifugio ideale per chi cerca quiete e contatto con la natura. Circondato dal verde della tenuta biologica, offre un generoso spazio esterno immerso tra ulivi e agrumeti. Gli interni accoglienti e indipendenti, uniti agli ampi spazi all'aperto, lo rendono perfetto per godere della tranquillità siciliana in totale autonomia.",
        alt: "Spazio esterno dell'appartamento Era immerso tra ulivi e agrumeti",
        features: [
          "Giardino privato tra gli ulivi",
          "2 camere da letto",
          "Zona pranzo all'aperto",
          "Ingresso totalmente indipendente",
        ],
      },
    },
  },
  experience: {
    eyebrow: "Esperienza & Territorio",
    title: "Dove la vista incontra i sapori di Sicilia",
    description:
      "Dalla tenuta lo sguardo abbraccia la cattedrale normanna, la Rocca e, nelle giornate più nitide, le Isole Eolie. Tutt'intorno, uliveti e agrumeti biologici raccontano l'autenticità della terra siciliana: un'esperienza che si vive e si assapora.",
    items: [
      { icon: "Eye", title: "Vista cattedrale normanna", text: "Lo sguardo si apre sul profilo della celebre cattedrale e sui tetti del centro storico." },
      { icon: "Mountain", title: "La Rocca di Cefalù", text: "L'imponente promontorio che domina la città, meta ideale per escursioni al tramonto." },
      { icon: "Waves", title: "Isole Eolie all'orizzonte", text: "Nelle giornate limpide, la sagoma delle Eolie disegna l'orizzonte sul mare." },
      { icon: "Sprout", title: "Produzione biologica", text: "Olio extravergine d'oliva e agrumi coltivati biologicamente all'interno della tenuta." },
    ],
    imageAlt: "Vista panoramica da Il dono di Atena: cattedrale, Rocca e uliveti",
  },
  booking: {
    eyebrow: "Prenota ora",
    title: "Verifica disponibilità e prenota",
    description:
      "Scegli l'appartamento, seleziona le date sul calendario e completa la prenotazione in pochi passi con pagamento sicuro.",
    apartment: "Appartamento",
    perNight: "/ notte",
    name: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    email: "Email",
    emailPlaceholder: "mario@email.it",
    guests: "Ospiti",
    guest: "ospite",
    guestsPlural: "ospiti",
    night: "notte",
    nightsPlural: "notti",
    selectDates: "Seleziona le date sul calendario",
    total: "Totale",
    submit: "Procedi al pagamento",
    redirecting: "Reindirizzamento…",
    secure:
      "Pagamento sicuro tramite Stripe. Nessun dato della carta transita dai nostri server.",
    errorGeneric: "Errore imprevisto.",
  },
  location: {
    eyebrow: "Dove siamo",
    title: "Una posizione strategica",
    description:
      "Immersa nella campagna ma a due passi dal mare e dalla città: il punto di partenza ideale per scoprire Cefalù e la Sicilia.",
    items: [
      { icon: "Car", title: "Vicino al casello autostradale", text: "Accesso rapido e comodo per chi arriva in auto, senza attraversare il traffico cittadino." },
      { icon: "Building2", title: "4 km dal centro storico", text: "A pochi minuti dalla cattedrale, dal lungomare e dalle vie del centro di Cefalù." },
      { icon: "Plane", title: "Aeroporto di Palermo", text: "A circa un'ora di auto dall'aeroporto internazionale Falcone-Borsellino." },
    ],
    mapTitle: "Mappa di Il dono di Atena a Cefalù",
    mapNotice:
      "Per mostrare la mappa è necessario caricare contenuti di Google Maps, che può impostare cookie di terze parti.",
    enableMap: "Carica la mappa",
  },
  footer: {
    tagline:
      "La tua oasi di relax a Cefalù: villa con piscina immersa in una tenuta biologica di ulivi e agrumi.",
    explore: "Esplora",
    contacts: "Contatti",
    rights: "Tutti i diritti riservati.",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
  },
  success: {
    title: "Grazie, prenotazione confermata!",
    text: "Il pagamento è andato a buon fine. Riceverai a breve un'email di conferma con tutti i dettagli del tuo soggiorno a Il dono di Atena.",
    home: "Torna alla home",
  },
  cancelled: {
    title: "Pagamento annullato",
    text: "La prenotazione non è stata completata e non è stato addebitato alcun importo. Le date restano disponibili: puoi riprovare quando vuoi.",
    retry: "Riprova la prenotazione",
  },
  cookieBanner: {
    text: "Usiamo cookie tecnici e, previo consenso, cookie di terze parti (Google Maps, Stripe) per migliorare la tua esperienza.",
    accept: "Accetta",
    reject: "Solo necessari",
    more: "Cookie Policy",
  },
};

export type Dictionary = typeof it;
