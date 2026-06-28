import Image from "next/image";
import { Check } from "lucide-react";
import { apartments, type Apartment } from "@/lib/data";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/**
 * Gli Appartamenti — layout a sezioni alternate (immagine/testo).
 * I dati arrivano da lib/data.ts; l'alternanza è gestita dall'indice (reverse).
 */
export default function Apartments() {
  return (
    <section id="appartamenti" className="bg-cream py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Gli spazi"
          title="Due appartamenti indipendenti"
          description="Atena ed Era: due soluzioni autonome con ampi spazi esterni, pensate per garantirti privacy, comfort e distanziamento nel cuore della natura siciliana."
        />

        <div className="mt-20 flex flex-col gap-20 md:gap-28">
          {apartments.map((apartment, index) => (
            <ApartmentRow
              key={apartment.id}
              apartment={apartment}
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
  reverse,
}: {
  apartment: Apartment;
  reverse: boolean;
}) {
  return (
    <article
      id={apartment.id}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Immagine */}
      <div
        className={cn(
          "group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-olive-900/10",
          reverse && "lg:order-last"
        )}
      >
        <Image
          src={apartment.image}
          alt={apartment.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Testo */}
      <div className={cn(reverse && "lg:order-first")}>
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-terracotta-500">
          Appartamento
        </p>
        <h3 className="text-4xl font-semibold text-olive-900 md:text-5xl">
          {apartment.name}
        </h3>
        <p className="mt-2 text-lg italic text-olive-600">
          {apartment.tagline}
        </p>

        <p className="mt-6 text-lg leading-relaxed text-olive-700">
          {apartment.description}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {apartment.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-olive-800"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-olive-100 text-olive-600">
                <Check className="h-4 w-4" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Button href="#location" variant="ghost">
            Richiedi disponibilità
          </Button>
        </div>
      </div>
    </article>
  );
}
