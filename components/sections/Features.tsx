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

/** 2. La Struttura — griglia di servizi con icone. */
export default function Features({ dict }: { dict: Dictionary["features"] }) {
  return (
    <section id="struttura" className="bg-sand-50 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-olive-100 bg-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:border-olive-200 hover:shadow-xl hover:shadow-olive-900/5"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-olive-100 text-olive-600 transition-colors duration-300 group-hover:bg-terracotta-500 group-hover:text-cream">
                  {Icon && <Icon className="h-7 w-7" />}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-olive-900">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-olive-700">
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
