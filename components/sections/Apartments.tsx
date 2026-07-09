import { Check } from "lucide-react";
import { apartments, type Apartment } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Gallery from "@/components/ui/Gallery";

type ApartmentsDict = Dictionary["apartments"];

/**
 * Gli Appartamenti — layout a sezioni alternate (galleria/testo).
 * Dati neutri da lib/data.ts, testi localizzati dal dizionario.
 */
export default function Apartments({ dict }: { dict: ApartmentsDict }) {
  return (
    <section id="appartamenti" className="bg-ink-950 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-20 flex flex-col gap-20 md:gap-28">
          {apartments.map((apartment, index) => (
            <ApartmentRow
              key={apartment.id}
              apartment={apartment}
              dict={dict}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ApartmentRow({
  apartment,
  dict,
  reverse,
}: {
  apartment: Apartment;
  dict: ApartmentsDict;
  reverse: boolean;
}) {
  const t = dict.items[apartment.id];

  return (
    <article
      id={apartment.id}
      className="grid items-center gap-10 border-t border-ink-800 pt-14 lg:grid-cols-2 lg:gap-16"
    >
      <Gallery
        images={apartment.gallery}
        alt={t.alt}
        photosLabel={dict.photos}
        reverse={reverse}
      />

      <div className={cn(reverse && "lg:order-first")}>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-terracotta-400">
          {dict.label}
        </p>
        <h3 className="text-4xl font-semibold text-cream md:text-5xl">
          {apartment.name}
        </h3>
        <p className="mt-2 font-serif text-lg italic text-cream/60">
          {t.tagline}
        </p>

        <p className="mt-6 text-base leading-relaxed text-cream/65">
          {t.description}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {t.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-cream/80">
              <Check className="mt-0.5 h-4 w-4 flex-none text-terracotta-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Button href="#prenota" variant="line">
            {dict.cta}
          </Button>
        </div>
      </div>
    </article>
  );
}
