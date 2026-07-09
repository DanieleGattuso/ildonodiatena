import {
  Waves,
  Leaf,
  Wifi,
  Car,
  Snowflake,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Waves,
  Leaf,
  Wifi,
  Car,
  Snowflake,
  Trees,
};

/** 2. La Struttura — specchietto piatto di servizi, nessuna card decorativa. */
export default function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="struttura" className="bg-surface-100 py-24 md:py-32">
      <Container>
        <SectionHeading title={dict.title} description={dict.description} />

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.title}>
                {Icon && <Icon className="h-6 w-6 text-bordeaux-600" />}
                <h3 className="mt-4 font-sans text-lg font-semibold text-ink-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
