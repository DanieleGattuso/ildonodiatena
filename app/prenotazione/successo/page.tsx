import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenotazione confermata",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-olive-500" />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-olive-900">
          Grazie, prenotazione confermata!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-olive-700">
          Il pagamento è andato a buon fine. Riceverai a breve un'email di
          conferma con tutti i dettagli del tuo soggiorno a Il dono di Atena.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta-500 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-terracotta-600"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
