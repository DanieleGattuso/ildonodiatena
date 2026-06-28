# Guida al deploy — Il dono di Atena

Runbook passo-passo per pubblicare il sito su **Cloudflare Pages** con database
**D1** e pagamenti **Stripe**. Due percorsi: A) integrazione Git nativa di
Cloudflare (consigliata, zero segreti in CI), B) GitHub Actions (incluso).

---

## 0. Prerequisiti

- Account **Cloudflare** e account **Stripe**
- `npm i -g wrangler` e `wrangler login` (per i comandi da terminale)
- Repository su GitHub (questo)

---

## 1. Crea il database D1

```bash
wrangler d1 create ildonodiatena-db
```

Copia il `database_id` restituito dentro **wrangler.toml**:

```toml
[[d1_databases]]
binding = "DB"
database_name = "ildonodiatena-db"
database_id = "IL-TUO-DATABASE-ID"
```

Applica lo schema (tabelle):

```bash
npm run db:migrate:remote   # produzione
npm run db:migrate:local    # solo per sviluppo locale
```

---

## 2. Stripe

1. Dashboard Stripe → **Developers → API keys** → copia la *Secret key*
   (`sk_test_…` in test, `sk_live_…` in produzione).
2. **Developers → Webhooks → Add endpoint**:
   - URL: `https://<tuo-dominio>/api/webhooks/stripe`
   - Eventi: `checkout.session.completed`, `checkout.session.expired`
   - Copia il **Signing secret** (`whsec_…`).

---

## 3A. Deploy con Cloudflare Pages (Git) — consigliato

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Seleziona questo repository.
3. Build settings:
   - **Framework preset**: nessuno / None
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
4. **Settings → Functions → Compatibility flags**: aggiungi `nodejs_compat`
   (production e preview).
5. **Settings → Bindings → D1 database**: aggiungi binding `DB` → `ildonodiatena-db`.
6. **Settings → Environment variables / Secrets** (production e preview):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `ADMIN_TOKEN` (per l'area `/admin`)
   - `RESEND_API_KEY` ed `EMAIL_FROM` (opzionali, per le email)
7. Salva e avvia il deploy. Ogni push su `main` ripubblica automaticamente.

---

## 3B. Deploy con GitHub Actions (alternativa)

Il workflow `.github/workflows/deploy.yml` builda e pubblica a ogni push su `main`.

Imposta i **GitHub Secrets** (Settings → Secrets and variables → Actions):

| Secret | Valore |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Token con permesso *Cloudflare Pages: Edit* |
| `CLOUDFLARE_ACCOUNT_ID` | ID account Cloudflare |

> Il token si crea da Cloudflare → My Profile → API Tokens → Create Token →
> template "Edit Cloudflare Workers" oppure permesso *Account · Cloudflare Pages · Edit*.

I binding D1 e i secret Stripe/Admin vanno comunque configurati una volta nel
progetto Pages (vedi passi 5–6 della sezione 3A): il deploy via Actions li riusa.

---

## 4. Dominio personalizzato

Cloudflare Pages → progetto → **Custom domains** → aggiungi `ildonodiatena.it`
e `www.ildonodiatena.it`. Se il DNS è già su Cloudflare, i record vengono
configurati automaticamente.

---

## 5. Verifica post-deploy

- [ ] La home si apre e reindirizza a `/it` (o `/en` da browser in inglese)
- [ ] Il calendario mostra le date e il totale si aggiorna
- [ ] Una prenotazione di test porta a Stripe Checkout (usa carta `4242 4242 4242 4242`)
- [ ] Dopo il pagamento, `/it/prenotazione/successo` e la prenotazione risulta
      `confirmed` in `/admin`
- [ ] L'email di conferma arriva (se Resend è configurato)
- [ ] La mappa in "Dove siamo" si carica

---

## Note

- **Auto-scadenza**: le prenotazioni non pagate si liberano da sole dopo 60 min.
- **Test vs Live Stripe**: usa le chiavi `test` finché non sei pronto, poi
  sostituiscile con le `live` e aggiorna il webhook con l'endpoint di produzione.
- **Immagini**: sostituisci i placeholder in `public/images/` con le foto reali
  prima del lancio.
