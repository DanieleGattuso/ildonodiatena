import Link from "next/link";
import type { Metadata } from "next";
import { contact } from "@/lib/data";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <div className="prose mt-8 space-y-5 text-olive-700">
          <p>
            La presente informativa descrive le modalità di trattamento dei dati
            personali degli utenti che consultano il sito e che effettuano una
            prenotazione presso Il dono di Atena, in conformità al Regolamento UE
            2016/679 (GDPR).
          </p>
          <h2 className="font-serif text-2xl text-olive-900">Titolare del trattamento</h2>
          <p>
            Il titolare del trattamento è Il dono di Atena, {contact.address}.
            Per qualsiasi richiesta è possibile scrivere a{" "}
            <a href={contact.emailHref} className="text-terracotta-500 hover:underline">
              {contact.email}
            </a>
            .
          </p>
          <h2 className="font-serif text-2xl text-olive-900">Dati raccolti</h2>
          <p>
            Raccogliamo i dati forniti volontariamente in fase di prenotazione
            (nome, email, date e numero di ospiti). I dati di pagamento sono
            gestiti direttamente da Stripe e non transitano dai nostri server.
          </p>
          <h2 className="font-serif text-2xl text-olive-900">Finalità</h2>
          <p>
            I dati sono utilizzati esclusivamente per gestire la prenotazione,
            adempiere agli obblighi di legge e rispondere alle richieste di
            contatto.
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
