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
    <section
      id="territorio"
      className="relative overflow-hidden bg-ink-950 py-24 text-cream md:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 flex-none bg-terracotta-400" />
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-cream/60">
                {dict.eyebrow}
              </p>
            </div>
            <h2 className="text-5xl font-semibold leading-[1.02] md:text-6xl">
              {dict.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/65">
              {dict.description}
            </p>

            <div className="mt-10 grid gap-8 border-t border-ink-800 pt-10 sm:grid-cols-2">
              {dict.items.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title}>
                    {Icon && <Icon className="h-5 w-5 text-terracotta-400" />}
                    <h3 className="mt-3 font-semibold text-cream">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden border border-ink-800">
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
