import Image from "next/image";
import { Eye, Mountain, Waves, Sprout } from "lucide-react";
import Container from "@/components/ui/Container";

const highlights = [
  {
    icon: Eye,
    title: "Vista cattedrale normanna",
    text: "Lo sguardo si apre sul profilo della celebre cattedrale e sui tetti del centro storico.",
  },
  {
    icon: Mountain,
    title: "La Rocca di Cefalù",
    text: "L'imponente promontorio che domina la città, meta ideale per escursioni al tramonto.",
  },
  {
    icon: Waves,
    title: "Isole Eolie all'orizzonte",
    text: "Nelle giornate limpide, la sagoma delle Eolie disegna l'orizzonte sul mare.",
  },
  {
    icon: Sprout,
    title: "Produzione biologica",
    text: "Olio extravergine d'oliva e agrumi coltivati biologicamente all'interno della tenuta.",
  },
];

/** 4. Esperienza e Territorio — vista panoramica e produzione bio. */
export default function Experience() {
  return (
    <section id="territorio" className="relative overflow-hidden bg-olive-900 py-24 text-cream md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Testo */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-terracotta-200">
              Esperienza & Territorio
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              Dove la vista incontra i sapori di Sicilia
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              Dalla tenuta lo sguardo abbraccia la cattedrale normanna, la Rocca
              e, nelle giornate più nitide, le Isole Eolie. Tutt'intorno, uliveti
              e agrumeti biologici raccontano l'autenticità della terra siciliana:
              un'esperienza che si vive e si assapora.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cream/10 text-terracotta-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-cream">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immagine */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
            <Image
              src="/images/territory/vista.jpg"
              alt="Vista panoramica da Il dono di Atena: cattedrale, Rocca e uliveti"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
