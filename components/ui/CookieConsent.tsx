"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getConsent, setConsent } from "@/lib/consent";

type Props = {
  lang: Locale;
  dict: Dictionary["cookieBanner"];
};

/** Banner GDPR: appare finché l'utente non sceglie. Persiste la scelta. */
export default function CookieConsent({ lang, dict }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 border border-ink-800 bg-ink-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 flex-none text-terracotta-400" />
          <p className="text-sm leading-relaxed text-cream/65">
            {dict.text}{" "}
            <Link
              href={`/${lang}/cookie-policy`}
              className="font-medium text-cream underline underline-offset-2"
            >
              {dict.more}
            </Link>
          </p>
        </div>
        <div className="flex flex-none gap-3">
          <button
            onClick={() => choose("rejected")}
            className="border border-ink-800 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
          >
            {dict.reject}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="bg-terracotta-500 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-cream transition-colors hover:bg-cream hover:text-ink-950"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
