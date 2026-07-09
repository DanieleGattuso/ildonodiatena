import type { Dictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";

/**
 * Dichiarazione tipografica dopo l'hero: il nome della struttura spiegato in
 * due frasi. Solo testo, respiro generoso — la chiusa in bordeaux è l'unico
 * accento.
 */
export default function Manifesto({ dict }: { dict: Dictionary["manifesto"] }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <p className="mx-auto max-w-2xl text-center font-serif text-3xl leading-snug text-ink-950 md:text-4xl [text-wrap:balance]">
          {dict.lead}
          <br />
          <span className="text-bordeaux-600">{dict.close}</span>
        </p>
      </Container>
    </section>
  );
}
