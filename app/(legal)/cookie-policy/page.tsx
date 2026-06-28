import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-cream py-24">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-terracotta-500 hover:underline"
        >
          ← Torna alla home
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-olive-900">
          Cookie Policy
        </h1>
        <div className="mt-8 space-y-5 text-olive-700">
          <p>
            Il sito utilizza cookie tecnici necessari al corretto funzionamento e,
            previo consenso, cookie di terze parti per servizi quali la mappa di
            Google Maps e il pagamento sicuro tramite Stripe.
          </p>
          <h2 className="font-serif text-2xl text-olive-900">Cookie tecnici</h2>
          <p>
            Indispensabili per la navigazione e l'utilizzo delle funzionalità del
            sito (ad esempio il processo di prenotazione). Non richiedono consenso.
          </p>
          <h2 className="font-serif text-2xl text-olive-900">Cookie di terze parti</h2>
          <p>
            Google Maps e Stripe possono impostare cookie propri. Si rimanda alle
            rispettive informative per i dettagli.
          </p>
          <p>
            È possibile gestire le preferenze sui cookie dalle impostazioni del
            proprio browser.
          </p>
          <p className="text-sm text-olive-500">
            Documento da personalizzare con i dati legali definitivi prima della
            pubblicazione.
          </p>
        </div>
      </Container>
    </main>
  );
}
