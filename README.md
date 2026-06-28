# Il dono di Atena — Sito vetrina

Sito vetrina della villa con piscina **Il dono di Atena** a Cefalù.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (palette ispirata alla natura siciliana)
- **Lucide React** (icone)
- **TypeScript**

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000
npm run build    # build di produzione
npm start        # avvio build
```

## Struttura

```
app/                 Layout, homepage, pagine policy, stili globali
components/
  layout/            Navbar, Footer
  sections/          Blocchi della homepage (Hero, Apartments, ...)
  ui/                Primitive riusabili (Button, Container, SectionHeading)
lib/                 data.ts (contenuti) + utils.ts
public/images/       Asset organizzati per sezione (hero, apartments, territory)
```

## Contenuti

Testi, dati appartamenti e contatti sono centralizzati in `lib/data.ts`.

## Immagini

Inserire gli asset reali in `public/images/`:

- `hero/villa.jpg` — sfondo della Hero (consigliato ≥ 2400px di larghezza)
- `apartments/atena.jpg`, `apartments/era.jpg` — foto degli appartamenti
- `territory/...` — vista, uliveto, agrumeto

`next/image` ottimizza automaticamente formato (AVIF/WebP) e dimensioni.

## Stato

Implementate finora: **Hero** e **Gli Appartamenti**.
Da completare: La Struttura, Esperienza e Territorio, Location & Footer.
