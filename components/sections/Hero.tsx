import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

type HeroProps = {
  lang: Locale;
  dict: Dictionary["hero"];
};

/**
 * Hero full-screen con immagine di sfondo ottimizzata, overlay per leggibilità,
 * titolo elegante e doppia CTA.
 *
 * Per usare un VIDEO di sfondo, sostituire il blocco <Image> con un <video>.
 */
export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/hero/villa.webp"
        alt={dict.subtitle}
        fill
        priority
        sizes="100vw"
        className="object-cover animate-subtle-zoom"
      />

      <div className="absolute inset-0 bg-olive-900/45" />
      <div className="absolute inset-0 overlay-bottom" />

      <Container className="relative z-10 text-center text-cream">
        <p className="mb-5 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-widest text-cream/90 opacity-0 animate-fade-up [animation-delay:200ms]">
          <MapPin className="h-4 w-4" />
          {dict.location}
        </p>

        <h1 className="mx-auto max-w-4xl font-serif text-4xl font-semibold leading-tight opacity-0 animate-fade-up [animation-delay:400ms] sm:text-5xl md:text-6xl lg:text-7xl">
          {dict.title}
          <span className="mt-3 block text-2xl font-light italic text-cream/90 sm:text-3xl md:text-4xl">
            {dict.subtitle}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 opacity-0 animate-fade-up [animation-delay:600ms]">
          {dict.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-up [animation-delay:800ms] sm:flex-row">
          <Button href="#prenota" variant="primary">
            {dict.ctaPrimary}
          </Button>
          <Button href="#appartamenti" variant="outline">
            {dict.ctaSecondary}
          </Button>
        </div>
      </Container>

      <a
        href="#struttura"
        aria-label={dict.scroll}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/80 transition-colors hover:text-cream"
      >
        <ChevronDown className="h-8 w-8 animate-scroll-hint" />
      </a>
    </section>
  );
}
