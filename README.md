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
- **i18n IT/EN** — routing `[lang]` + middleware + dizionari tipizzati
- **TypeScript**

## Deploy

Vedi **[DEPLOY.md](./DEPLOY.md)** per la guida passo-passo (Cloudflare Pages,
D1, Stripe, dominio). Il deploy è automatizzato via GitHub Actions
(`.github/workflows/deploy.yml`).

## Funzionalità principali

- Sito vetrina responsive con galleria foto + lightbox per ogni appartamento
- Multilingua **Italiano / Inglese** con selettore lingua
- Prenotazione con calendario disponibilità e **pagamento Stripe**
- Auto-scadenza prenotazioni non pagate (60 min)
- Email di conferma (Resend, opzionale)
- Area **admin** (`/admin`) con conferma / annulla / **rimborso** Stripe

## Struttura

```
app/
  layout.tsx                 Root layout (html/body, font)
  [lang]/                    Pagine localizzate (it/en)
    layout.tsx               generateStaticParams + metadata per lingua
    page.tsx                 Homepage (assembla le sezioni)
    (legal)/                 Privacy & Cookie policy (bilingui)
    prenotazione/            Pagine esito pagamento (successo/annullata)
  admin/                     Area admin (gestione prenotazioni)
  api/
    availability/route.ts    GET disponibilità (edge)
    checkout/route.ts        POST crea sessione Stripe + booking pending (edge)
    webhooks/stripe/route.ts POST conferma prenotazione + email (edge)
    admin/bookings/          GET lista + PATCH azioni (conferma/annulla/rimborso)
middleware.ts                Redirect e rilevamento lingua
components/
  layout/                    Navbar (+ selettore lingua), Footer, LangSync
  sections/                  Hero, Features, Apartments, Experience, Booking, Location
  ui/                        Button, Container, SectionHeading, Gallery
lib/
  data.ts                    Dati neutri: appartamenti, prezzi, immagini, contatti
  i18n/                      config, dizionari it/en, getDictionary
  db.ts                      Query Cloudflare D1
  stripe.ts                  Client Stripe (fetch HTTP, edge-compatible)
  email.ts                   Email di conferma (Resend)
  booking.ts                 Logica date/notti/prezzi
  env.ts / types.ts          Binding Cloudflare e tipi
db/schema.sql                Schema D1
wrangler.toml                Config Cloudflare (binding D1)
.github/workflows/           CI + deploy Cloudflare Pages
```

## Flusso di prenotazione

1. L'utente sceglie appartamento e date (il calendario disabilita le date già occupate, lette da `/api/availability`).
2. `/api/checkout` **ricontrola la disponibilità lato server**, calcola il prezzo (notti × tariffa, mai dal client), crea una prenotazione `pending` su D1 e una sessione **Stripe Checkout**, poi reindirizza l'utente al pagamento.
3. A pagamento avvenuto, Stripe chiama `/api/webhooks/stripe` che (verificata la firma) imposta la prenotazione su `confirmed` e invia l'email di conferma (se Resend è configurato). Una sessione scaduta la imposta su `cancelled` liberando le date.

**Auto-scadenza prenotazioni pending:** una prenotazione `pending` blocca le date solo per 60 minuti (tempo per pagare). Trascorso il termine viene ignorata automaticamente nei controlli di disponibilità — nessun cron job necessario.

**Area admin:** la pagina `/admin` (protetta da `ADMIN_TOKEN`) mostra tutte le prenotazioni con stato, ospite, date e importo.

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
| `RESEND_API_KEY` | opzionale | Abilita l'email di conferma via Resend |
| `EMAIL_FROM` | opzionale | Mittente delle email (dominio verificato su Resend) |
| `ADMIN_TOKEN` | opzionale | Token per accedere all'area admin su `/admin` |

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
