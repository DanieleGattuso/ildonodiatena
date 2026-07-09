"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryProps = {
  images: string[];
  alt: string;
  /** Etichetta localizzata per il badge "N foto". */
  photosLabel: string;
  /** Inverte l'ordine cover/thumb per i layout alternati (estetica). */
  reverse?: boolean;
};

/**
 * Galleria con immagine di copertina + miniature e lightbox a schermo intero
 * (navigazione con frecce, tastiera e chiusura con ESC/overlay). Bordi a
 * vivo, nessuna ombra: solo un filo (hairline) a separare le immagini dal
 * fondo ink.
 */
export default function Gallery({
  images,
  alt,
  photosLabel,
  reverse,
}: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const cover = images[0];
  const thumbs = images.slice(1, 4);

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

  // Navigazione da tastiera + blocco scroll quando il lightbox è aperto.
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
    <div className={cn(reverse && "lg:order-last")}>
      {/* Copertina */}
      <button
        type="button"
        onClick={() => show(0)}
        aria-label="Apri galleria"
        className="group relative block aspect-[4/3] w-full overflow-hidden border border-ink-800"
      >
        <Image
          src={cover}
          alt={alt}
          fill
          quality={85}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-ink-950/80 px-3 py-1.5 text-xs font-medium text-cream">
          <Expand className="h-3.5 w-3.5" />
          {images.length} {photosLabel}
        </span>
      </button>

      {/* Miniature */}
      {thumbs.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => show(i + 1)}
              aria-label={`Apri foto ${i + 2}`}
              className="relative aspect-[4/3] overflow-hidden border border-ink-800 transition hover:opacity-80"
            >
              <Image
                src={src}
                alt={`${alt} — foto ${i + 2}`}
                fill
                sizes="(max-width: 1024px) 33vw, 16vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/97 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            aria-label="Chiudi"
            className="absolute right-5 top-5 text-cream/70 hover:text-cream"
            onClick={() => setOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            aria-label="Precedente"
            className="absolute left-3 text-cream/70 hover:text-cream sm:left-6"
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
              alt={`${alt} — foto ${index + 1}`}
              fill
              quality={90}
              sizes="100vw"
              className="object-contain"
              priority
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink-950/80 px-4 py-1.5 text-sm text-cream">
              {index + 1} / {images.length}
            </span>
          </div>

          <button
            aria-label="Successiva"
            className="absolute right-3 text-cream/70 hover:text-cream sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </div>
  );
}
