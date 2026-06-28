import Link from "next/link";
import { XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prenotazione annullata",
  robots: { index: false },
};

export default function CancelledPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="max-w-lg text-center">
        <XCircle className="mx-auto h-16 w-16 text-terracotta-400" />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-olive-900">
          Pagamento annullato
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-olive-700">
          La prenotazione non è stata completata e non è stato addebitato alcun
          importo. Le date restano disponibili: puoi riprovare quando vuoi.
        </p>
        <Link
          href="/#prenota"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta-500 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-terracotta-600"
        >
          Riprova la prenotazione
        </Link>
      </div>
    </main>
  );
}
