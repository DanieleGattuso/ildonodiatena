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
    <section id="location" className="bg-cream py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <div className="space-y-7">
              {dict.items.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title} className="flex gap-4">
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-500">
                      {Icon && <Icon className="h-6 w-6" />}
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
                );
              })}
            </div>

            <div className="mt-9 flex items-center gap-3 rounded-xl bg-olive-50 px-5 py-4 text-olive-800">
              <MapPin className="h-5 w-5 flex-none text-terracotta-500" />
              <span className="font-medium">{contact.address}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl shadow-olive-900/10">
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
