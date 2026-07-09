import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Button from "@/components/ui/Button";

type HeroProps = {
  lang: Locale;
  dict: Dictionary["hero"];
};

/**
 * Hero a due pannelli: testo su superficie ink piena a sinistra, fotografia
 * notturna a vivo a destra — nessun overlay sopra l'immagine, perché il
 * testo non le sta mai sopra. Stesso ink-950 del resto del sito: la cucitura
 * con la navbar è invisibile.
 */
export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 bg-ink-950 lg:grid-cols-[44%_1fr]">
      <div className="relative h-[52vh] lg:order-2 lg:h-auto">
        <Image
          src="/images/hero/villa.webp"
          alt={dict.subtitle}
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover animate-subtle-zoom"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end gap-8 px-6 py-14 sm:px-10 lg:order-1 lg:gap-10 lg:px-14 lg:py-16">
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-cream/50 opacity-0 animate-fade-up [animation-delay:150ms]">
          <MapPin className="h-3.5 w-3.5" />
          {dict.location}
        </p>

        <h1 className="font-serif text-6xl font-semibold leading-[0.95] tracking-tight text-cream opacity-0 animate-fade-up [animation-delay:300ms] sm:text-7xl lg:text-8xl">
          {dict.title}
        </h1>

        <p className="max-w-sm font-serif text-xl italic leading-snug text-cream/75 opacity-0 animate-fade-up [animation-delay:450ms] lg:text-2xl">
          {dict.subtitle}
        </p>

        <p className="max-w-xs text-sm leading-relaxed text-cream/55 opacity-0 animate-fade-up [animation-delay:600ms]">
          {dict.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 opacity-0 animate-fade-up [animation-delay:750ms]">
          <Button href="#prenota" variant="line">
            {dict.ctaPrimary}
          </Button>
          <Button href="#appartamenti" variant="line" className="text-cream/60 hover:text-cream">
            {dict.ctaSecondary}
          </Button>
        </div>

        <a
          href="#struttura"
          aria-label={dict.scroll}
          className="mt-2 w-fit text-cream/40 transition-colors hover:text-cream lg:mt-6"
        >
          <ChevronDown className="h-6 w-6 animate-scroll-hint" />
        </a>
      </div>
    </section>
  );
}
