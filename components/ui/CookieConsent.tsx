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
      <div className="mx-auto flex max-w-4xl flex-col gap-4 border border-surface-300 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 flex-none text-bordeaux-600" />
          <p className="text-sm leading-relaxed text-ink-700">
            {dict.text}{" "}
            <Link
              href={`/${lang}/cookie-policy`}
              className="font-medium text-ink-950 underline underline-offset-2"
            >
              {dict.more}
            </Link>
          </p>
        </div>
        <div className="flex flex-none gap-3">
          <button
            onClick={() => choose("rejected")}
            className="border border-surface-300 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-ink-400 hover:text-ink-950"
          >
            {dict.reject}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="bg-bordeaux-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bordeaux-700"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
