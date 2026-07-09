export const runtime = "edge";

import Link from "next/link";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Cookie Policy" };

const content = {
  it: {
    back: "← Torna alla home",
    title: "Cookie Policy",
    intro:
      "Il sito utilizza cookie tecnici necessari al corretto funzionamento e, previo consenso, cookie di terze parti per servizi quali la mappa di Google Maps e il pagamento sicuro tramite Stripe.",
    h1: "Cookie tecnici",
    p1: "Indispensabili per la navigazione e l'utilizzo delle funzionalità del sito (ad esempio il processo di prenotazione). Non richiedono consenso.",
    h2: "Cookie di terze parti",
    p2: "Google Maps e Stripe possono impostare cookie propri. Si rimanda alle rispettive informative per i dettagli.",
    p3: "È possibile gestire le preferenze sui cookie dalle impostazioni del proprio browser.",
    note: "Documento da personalizzare con i dati legali definitivi prima della pubblicazione.",
  },
  en: {
    back: "← Back to home",
    title: "Cookie Policy",
    intro:
      "The website uses technical cookies necessary for its correct operation and, with your consent, third-party cookies for services such as Google Maps and secure payment via Stripe.",
    h1: "Technical cookies",
    p1: "Essential for browsing and using the site's features (for example the booking process). They do not require consent.",
    h2: "Third-party cookies",
    p2: "Google Maps and Stripe may set their own cookies. Please refer to their respective notices for details.",
    p3: "You can manage your cookie preferences from your browser settings.",
    note: "Document to be customised with the final legal details before publication.",
  },
};

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const t = content[locale];

  return (
    <main className="py-24">
      <Container className="max-w-3xl">
        <Link href={`/${locale}`} className="text-sm font-medium text-ink-700 hover:text-bordeaux-600">
          {t.back}
        </Link>
        <h1 className="mt-6 text-4xl text-ink-950">{t.title}</h1>
        <div className="mt-8 space-y-5 text-ink-700">
          <p>{t.intro}</p>
          <h2 className="text-2xl text-ink-950">{t.h1}</h2>
          <p>{t.p1}</p>
          <h2 className="text-2xl text-ink-950">{t.h2}</h2>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p className="text-sm text-ink-950/40">{t.note}</p>
        </div>
      </Container>
    </main>
  );
}