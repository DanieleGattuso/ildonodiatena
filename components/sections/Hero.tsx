import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/**
 * Hero full-screen con immagine di sfondo ottimizzata, overlay per leggibilità,
 * titolo elegante e doppia CTA (prenotazioni + scopri la struttura).
 *
 * Per usare un VIDEO di sfondo, sostituire il blocco <Image> con:
 *   <video autoPlay muted loop playsInline poster="/images/hero/poster.jpg"
 *     className="absolute inset-0 h-full w-full object-cover">
 *     <source src="/images/hero/villa.mp4" type="video/mp4" />
 *   </video>
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Immagine di sfondo ottimizzata */}
      <Image
        src="/images/hero/villa.jpg"
        alt="Villa Il dono di Atena con piscina immersa nel verde a Cefalù"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-subtle-zoom"
      />

      {/* Overlay scuro per il contrasto del testo */}
      <div className="absolute inset-0 bg-olive-900/45" />
      <div className="absolute inset-0 overlay-bottom" />

      {/* Contenuto */}
      <Container className="relative z-10 text-center text-cream">
        <p className="mb-5 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-widest text-cream/90 opacity-0 animate-fade-up [animation-delay:200ms]">
          <MapPin className="h-4 w-4" />
          Cefalù · Sicilia
        </p>

        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-tight opacity-0 animate-fade-up [animation-delay:400ms] sm:text-5xl md:text-6xl lg:text-7xl">
          Il dono di Atena
          <span className="mt-3 block text-2xl font-light italic text-cream/90 sm:text-3xl md:text-4xl">
            La tua oasi di relax a Cefalù
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 opacity-0 animate-fade-up [animation-delay:600ms]">
          Due appartamenti indipendenti con piscina, immersi in una tenuta
          biologica di ulivi e agrumi, a pochi minuti dal centro storico.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up [animation-delay:800ms] sm:flex-row">
          <Button href="#location" variant="primary">
            Info e prenotazioni
          </Button>
          <Button href="#appartamenti" variant="outline">
            Scopri gli appartamenti
          </Button>
        </div>
      </Container>

      {/* Indicatore di scroll */}
      <a
        href="#struttura"
        aria-label="Scorri verso il basso"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/80 transition-colors hover:text-cream"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </a>
    </section>
  );
}
