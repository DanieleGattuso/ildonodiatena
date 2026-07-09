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
      className="relative overflow-hidden bg-olive-900 py-24 text-cream md:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-terracotta-200">
              {dict.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              {dict.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              {dict.description}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {dict.items.map(({ icon, title, text }) => {
                const Icon = iconMap[icon];
                return (
                  <div key={title} className="flex gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cream/10 text-terracotta-200">
                      {Icon && <Icon className="h-5 w-5" />}
                    </span>
                    <div>
                      <h3 className="font-semibold text-cream">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-cream/70">
                        {text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
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
