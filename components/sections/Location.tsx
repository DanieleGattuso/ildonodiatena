import { MapPin, Car, Building2, Plane, type LucideIcon } from "lucide-react";
import { contact } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import MapEmbed from "@/components/sections/MapEmbed";

const iconMap: Record<string, LucideIcon> = { Car, Building2, Plane };

/** 5. Location — posizione strategica + mappa. */
export default function Location({ dict }: { dict: Dictionary["location"] }) {
  return (
    <section id="location" className="py-24 md:py-32">
      <Container>
        <SectionHeading title={dict.title} description={dict.description} />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <div className="space-y-7 border-t border-surface-200 pt-10">
              {dict.items.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title} className="flex gap-4">
                    {Icon && (
                      <Icon className="mt-0.5 h-5 w-5 flex-none text-bordeaux-600" />
                    )}
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-ink-950">
                        {title}
                      </h3>
                      <p className="mt-1 leading-relaxed text-ink-700">
                        {text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex items-center gap-3 border border-surface-200 bg-surface-100 px-5 py-4 text-ink-950">
              <MapPin className="h-5 w-5 flex-none text-bordeaux-600" />
              <span className="font-medium">{contact.address}</span>
            </div>
          </div>

          <div className="overflow-hidden border border-surface-200">
            <MapEmbed
              src={`https://www.google.com/maps?q=${contact.mapsQuery}&output=embed`}
              title={dict.mapTitle}
              notice={dict.mapNotice}
              enableLabel={dict.enableMap}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
