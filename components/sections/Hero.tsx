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
 * Hero fotografico a tutto schermo: la fotografia della villa È il design.
 * Un velo scuro dal basso garantisce la leggibilità del titolo centrato;
 * la navbar sovrastante resta trasparente fino allo scroll.
 */
export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src="/images/hero/villa.webp"
        alt={dict.subtitle}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover animate-subtle-zoom"
      />
      {/* Velo di leggibilità: forte in basso sotto il testo, appena
          percettibile in alto sotto la navbar trasparente. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/15 to-ink-950/30"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-40 text-center sm:pb-24">
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-white/90 opacity-0 animate-fade-up [animation-delay:200ms]">
          <MapPin className="h-4 w-4" />
          {dict.location}
        </p>

        <h1 className="mt-5 text-5xl leading-[1.05] text-white opacity-0 animate-fade-up [animation-delay:350ms] sm:text-6xl lg:text-7xl">
          {dict.title}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90 opacity-0 animate-fade-up [animation-delay:500ms] lg:text-xl">
          {dict.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-0 animate-fade-up [animation-delay:650ms]">
          <Button href="#prenota" variant="solid">
            {dict.ctaPrimary}
          </Button>
          <Button
            href="#appartamenti"
            variant="line"
            className="border-white/40 text-white hover:border-white hover:text-white"
          >
            {dict.ctaSecondary}
          </Button>
        </div>

        <a
          href="#struttura"
          aria-label={dict.scroll}
          className="mt-12 inline-block text-white/70 transition-colors hover:text-white"
        >
          <ChevronDown className="h-6 w-6 animate-scroll-hint" />
        </a>
      </div>
    </section>
  );
}
