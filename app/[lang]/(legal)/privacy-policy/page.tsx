export const runtime = "edge";

import Link from "next/link";
import type { Metadata } from "next";
import { contact } from "@/lib/data";
import { isLocale } from "@/lib/i18n/config";
import Container from "@/components/ui/Container";

export const metadata: Metadata = { title: "Privacy Policy" };

const content = {
  it: {
    back: "← Torna alla home",
    title: "Privacy Policy",
    intro:
      "La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito e che effettuano una prenotazione presso Il dono di Atena, in conformità al Regolamento UE 2016/679 (GDPR).",
    h1: "Titolare del trattamento",
    p1pre: "Il titolare del trattamento è Il dono di Atena, ",
    p1post: ". Per qualsiasi richiesta è possibile scrivere a ",
    h2: "Dati raccolti",
    p2: "Raccogliamo i dati forniti volontariamente in fase di prenotazione (nome, email, date e numero di ospiti). I dati di pagamento sono gestiti direttamente da Stripe e non transitano dai nostri server.",
    h3: "Finalità",
    p3: "I dati sono utilizzati esclusivamente per gestire la prenotazione, adempiere agli obblighi di legge e rispondere alle richieste di contatto.",
    note: "Documento da personalizzare con i dati legali definitivi prima della pubblicazione.",
  },
  en: {
    back: "← Back to home",
    title: "Privacy Policy",
    intro:
      "This notice describes how the personal data of users who visit the website and make a booking at Il dono di Atena is processed, in accordance with EU Regulation 2016/679 (GDPR).",
    h1: "Data controller",
    p1pre: "The data controller is Il dono di Atena, ",
    p1post: ". For any request you can write to ",
    h2: "Data collected",
    p2: "We collect the data you voluntarily provide when booking (name, email, dates and number of guests). Payment data is handled directly by Stripe and does not pass through our servers.",
    h3: "Purposes",
    p3: "Data is used solely to manage your booking, comply with legal obligations and respond to contact requests.",
    note: "Document to be customised with the final legal details before publication.",
  },
};

export default async function PrivacyPolicyPage({
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
          <p>
            {t.p1pre}
            {contact.address}
            {t.p1post}
            <a href={contact.emailHref} className="text-ink-950 underline underline-offset-2">
              {contact.email}
            </a>
            .
          </p>
          <h2 className="text-2xl text-ink-950">{t.h2}</h2>
          <p>{t.p2}</p>
          <h2 className="text-2xl text-ink-950">{t.h3}</h2>
          <p>{t.p3}</p>
          <p className="text-sm text-ink-950/40">{t.note}</p>
        </div>
      </Container>
    </main>
  );
}