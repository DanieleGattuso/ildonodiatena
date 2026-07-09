"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getConsent, setConsent, CONSENT_EVENT } from "@/lib/consent";

type Props = {
  src: string;
  title: string;
  notice: string;
  enableLabel: string;
};

/**
 * Incorpora Google Maps solo dopo il consenso ai cookie di terze parti (GDPR).
 * Finché manca, mostra un segnaposto con pulsante per caricare la mappa.
 */
export default function MapEmbed({ src, title, notice, enableLabel }: Props) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(getConsent() === "accepted");
    const onChange = () => setAllowed(getConsent() === "accepted");
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (allowed) {
    return (
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[380px] w-full border-0"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 bg-ink-900 p-8 text-center">
      <MapPin className="h-10 w-10 text-cream/30" />
      <p className="max-w-sm text-sm leading-relaxed text-cream/60">{notice}</p>
      <button
        onClick={() => setConsent("accepted")}
        className="bg-terracotta-500 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-cream transition-colors hover:bg-cream hover:text-ink-950"
      >
        {enableLabel}
      </button>
    </div>
  );
}
