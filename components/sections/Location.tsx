import { MapPin, Car, Building2, Plane } from "lucide-react";
import { contact } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Car,
    title: "Vicino al casello autostradale",
    text: "Accesso rapido e comodo per chi arriva in auto, senza attraversare il traffico cittadino.",
  },
  {
    icon: Building2,
    title: "4 km dal centro storico",
    text: "A pochi minuti dalla cattedrale, dal lungomare e dalle vie del centro di Cefalù.",
  },
  {
    icon: Plane,
    title: "Aeroporto di Palermo",
    text: "A circa un'ora di auto dall'aeroporto internazionale Falcone-Borsellino.",
  },
];

/** 5. Location — posizione strategica + mappa. */
export default function Location() {
  return (
    <section id="location" className="bg-cream py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Dove siamo"
          title="Una posizione strategica"
          description="Immersa nella campagna ma a due passi dal mare e dalla città: il punto di partenza ideale per scoprire Cefalù e la Sicilia."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Punti chiave + indirizzo */}
          <div className="flex flex-col justify-center">
            <div className="space-y-7">
              {points.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-olive-900">
                      {title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-olive-700">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-3 rounded-xl bg-olive-50 px-5 py-4 text-olive-800">
              <MapPin className="h-5 w-5 flex-none text-terracotta-500" />
              <span className="font-medium">{contact.address}</span>
            </div>
          </div>

          {/* Mappa */}
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-olive-900/10">
            <iframe
              title="Mappa di Il dono di Atena a Cefalù"
              src={`https://www.google.com/maps?q=${contact.mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
