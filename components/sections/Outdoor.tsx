"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { outdoorGallery } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Spazi comuni all'aperto — piscina, giardino e zone pranzo.
 * Mosaico responsivo con foto in evidenza + lightbox a schermo intero
 * (frecce, tastiera, chiusura con ESC/overlay). Il mosaico mostra i primi
 * scatti; il lightbox naviga l'intera galleria.
 */
export default function Outdoor({ dict }: { dict: Dictionary["outdoor"] }) {
  const images = outdoorGallery;
  const preview = images.slice(0, 7);
  const remaining = images.length - preview.length;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next]);

  return (
    <section id="piscina" className="bg-surface-100 py-24 md:py-32">
      <Container>
        <SectionHeading title={dict.title} description={dict.description} />

        <div className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {preview.map((src, i) => {
            const featured = i === 0;
            const isLast = i === preview.length - 1;
            return (
              <button
                key={src}
                type="button"
                onClick={() => show(i)}
                aria-label={`${dict.alt} — ${i + 1}`}
                className={cn(
                  "group relative overflow-hidden",
                  featured && "col-span-2 row-span-2"
                )}
              >
                <Image
                  src={src}
                  alt={`${dict.alt} — ${i + 1}`}
                  fill
                  quality={featured ? 85 : 78}
                  sizes={
                    featured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                {isLast && remaining > 0 && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-ink-950/70 text-white transition-colors group-hover:bg-ink-950/80">
                    <Plus className="h-6 w-6" />
                    <span className="text-lg font-medium">
                      +{remaining} {dict.photos}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Container>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Chiudi"
            className="absolute right-5 top-5 text-white/70 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            aria-label="Precedente"
            className="absolute left-3 text-white/70 transition-colors hover:text-white sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index]}
              alt={`${dict.alt} — ${index + 1}`}
              fill
              quality={90}
              sizes="100vw"
              className="object-contain"
              priority
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink-950/80 px-4 py-1.5 text-sm text-white">
              {index + 1} / {images.length}
            </span>
          </div>

          <button
            aria-label="Successiva"
            className="absolute right-3 text-white/70 transition-colors hover:text-white sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
  );
}
