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
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-olive-100 bg-cream/95 p-5 shadow-2xl shadow-olive-900/10 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-6 w-6 flex-none text-terracotta-500" />
          <p className="text-sm leading-relaxed text-olive-700">
            {dict.text}{" "}
            <Link
              href={`/${lang}/cookie-policy`}
              className="font-medium text-terracotta-600 underline"
            >
              {dict.more}
            </Link>
          </p>
        </div>
        <div className="flex flex-none gap-3">
          <button
            onClick={() => choose("rejected")}
            className="rounded-full border border-olive-200 px-5 py-2.5 text-sm font-medium text-olive-700 transition-colors hover:bg-olive-50"
          >
            {dict.reject}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-full bg-terracotta-500 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-600"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
