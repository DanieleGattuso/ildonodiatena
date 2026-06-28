# Il dono di Atena — Sito vetrina + prenotazioni

Sito vetrina della villa con piscina **Il dono di Atena** a Cefalù, con sistema
di prenotazione, calendario disponibilità e pagamento online via Stripe.

## Stack

- **Next.js 15** (App Router) — frontend + API (route handlers edge)
- **Tailwind CSS** — palette ispirata alla natura siciliana
- **Lucide React** — icone
- **react-day-picker** — calendario disponibilità
- **Cloudflare Pages** — hosting (via `@cloudflare/next-on-pages`)
- **Cloudflare D1** — database prenotazioni (SQLite all'edge)
- **Stripe Checkout** — pagamento online (hosted)
- **TypeScript**

## Struttura

```
app/
  layout.tsx                 Layout, font, metadata SEO
  page.tsx                   Homepage (assembla le sezioni)
  (legal)/                   Privacy & Cookie policy
  prenotazione/              Pagine esito pagamento (successo/annullata)
  api/
    availability/route.ts    GET disponibilità (edge)
    checkout/route.ts        POST crea sessione Stripe + booking pending (edge)
    webhooks/stripe/route.ts POST conferma prenotazione (edge)
components/
  layout/                    Navbar, Footer
  sections/                  Hero, Features, Apartments, Experience, Booking, Location
  ui/                        Button, Container, SectionHeading
lib/
  data.ts                    Contenuti, appartamenti, prezzi
  db.ts                      Query Cloudflare D1
  stripe.ts                  Client Stripe (fetch HTTP, edge-compatible)
  booking.ts                 Logica date/notti/prezzi
  env.ts / types.ts          Binding Cloudflare e tipi
db/schema.sql                Schema D1
wrangler.toml                Config Cloudflare (binding D1)
```

## Flusso di prenotazione

1. L'utente sceglie appartamento e date (il calendario disabilita le date già occupate, lette da `/api/availability`).
2. `/api/checkout` **ricontrola la disponibilità lato server**, calcola il prezzo (notti × tariffa, mai dal client), crea una prenotazione `pending` su D1 e una sessione **Stripe Checkout**, poi reindirizza l'utente al pagamento.
3. A pagamento avvenuto, Stripe chiama `/api/webhooks/stripe` che (verificata la firma) imposta la prenotazione su `confirmed`. Una sessione scaduta la imposta su `cancelled` liberando le date.

## Setup

### 1. Dipendenze

```bash
npm install
```

### 2. Database D1

```bash
npx wrangler d1 create ildonodiatena-db   # copia il database_id in wrangler.toml
npm run db:migrate:local                  # crea le tabelle in locale
npm run db:migrate:remote                 # crea le tabelle in produzione
```

### 3. Secret Stripe

In locale: copia `.dev.vars.example` in `.dev.vars` e inserisci le chiavi.

In produzione (Cloudflare):

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET
```

### 4. Webhook Stripe

Nel dashboard Stripe crea un endpoint webhook verso
`https://<tuo-dominio>/api/webhooks/stripe` con gli eventi
`checkout.session.completed` e `checkout.session.expired`, poi copia il
*signing secret* (`whsec_...`) in `STRIPE_WEBHOOK_SECRET`.

In locale: `stripe listen --forward-to localhost:8788/api/webhooks/stripe`.

## Comandi

```bash
npm run dev            # sviluppo (http://localhost:3000) con binding D1 locali
npm run build          # build Next.js
npm run pages:build    # build per Cloudflare Pages
npm run pages:dev      # preview locale su runtime Cloudflare (porta 8788)
npm run pages:deploy   # deploy su Cloudflare Pages
```

## 🔑 Variabili e key necessarie

| Nome | Dove | Descrizione |
|------|------|-------------|
| `database_id` | `wrangler.toml` | ID del database D1 creato con `wrangler d1 create` |
| `STRIPE_SECRET_KEY` | `.dev.vars` (locale) / Pages secret (prod) | Chiave segreta Stripe (`sk_test_...` / `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | `.dev.vars` (locale) / Pages secret (prod) | Signing secret del webhook (`whsec_...`) |

## Immagini

Inserire gli asset reali in `public/images/`:

- `hero/villa.jpg` — sfondo Hero (≥ 2400px)
- `apartments/atena.jpg`, `apartments/era.jpg`
- `territory/vista.jpg`

`next/image` ottimizza automaticamente formato (AVIF/WebP) e dimensioni.

## Personalizzazioni rapide

- **Tariffe / max ospiti**: `lib/data.ts` (`pricePerNight`, `maxGuests`).
- **Contatti, telefono, indirizzo**: `lib/data.ts` (`contact`).
- **Servizi (sezione La Struttura)**: `lib/data.ts` (`features`).
