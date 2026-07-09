import Image from "next/image";
import { Eye, Mountain, Waves, Sprout, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";

const iconMap: Record<string, LucideIcon> = { Eye, Mountain, Waves, Sprout };

/** 4. Esperienza e Territorio — vista panoramica e produzione bio. */
export default function Experience({
  dict,
}: {
  dict: Dictionary["experience"];
}) {
  return (
    <section id="territorio" className="overflow-hidden py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-4xl leading-[1.08] text-ink-950 md:text-5xl">
              {dict.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-700">
              {dict.description}
            </p>

            <div className="mt-10 grid gap-8 border-t border-surface-200 pt-10 sm:grid-cols-2">
              {dict.items.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title}>
                    {Icon && <Icon className="h-5 w-5 text-bordeaux-600" />}
                    <h3 className="mt-3 font-sans font-semibold text-ink-950">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/territory/vista.webp"
              alt={dict.imageAlt}
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
