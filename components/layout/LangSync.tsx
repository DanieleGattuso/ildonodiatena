"use client";

import { useEffect } from "react";

/** Allinea l'attributo lang di <html> alla lingua corrente (lato client). */
export default function LangSync({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
