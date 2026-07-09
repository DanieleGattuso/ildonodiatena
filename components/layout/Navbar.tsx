"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { contact } from "@/lib/data";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

type NavbarProps = {
  lang: Locale;
  dict: Dictionary["nav"];
};

/**
 * Navbar trasparente sopra l'hero fotografico (testo bianco), che diventa
 * superficie chiara piena dopo lo scroll. Il menu mobile è sempre su
 * superficie chiara per garantire leggibilità.
 */
export default function Navbar({ lang, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000`;
  };

  // Su hero trasparente il testo è bianco; da scrollato (o a menu aperto)
  // si passa all'inchiostro su fondo chiaro.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "border-b border-surface-200 bg-surface-50"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href={`/${lang}`}
          className={cn(
            "whitespace-nowrap font-serif text-2xl transition-colors",
            solid ? "text-ink-950" : "text-white"
          )}
        >
          Il dono di Atena
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {dict.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                solid
                  ? "text-ink-700 hover:text-bordeaux-600"
                  : "text-white/85 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}

          <LocaleSwitcher current={lang} onSwitch={switchLocale} solid={solid} />

          <a
            href={contact.phoneHref}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors",
              solid
                ? "bg-bordeaux-600 text-white hover:bg-bordeaux-700"
                : "bg-white text-ink-950 hover:bg-bordeaux-100"
            )}
          >
            <Phone className="h-3.5 w-3.5" />
            {dict.book}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.closeMenu : dict.openMenu}
          className={cn("lg:hidden", solid ? "text-ink-950" : "text-white")}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-surface-200 bg-surface-50 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {dict.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-ink-950 transition-colors hover:text-bordeaux-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LocaleSwitcher current={lang} onSwitch={switchLocale} solid />
            </div>
            <div className="px-3 pt-2">
              <a
                href={contact.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 bg-bordeaux-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-bordeaux-700"
              >
                <Phone className="h-4 w-4" />
                {dict.bookNow}
              </a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}

function LocaleSwitcher({
  current,
  onSwitch,
  solid,
}: {
  current: Locale;
  onSwitch: (l: Locale) => void;
  solid: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm font-medium uppercase",
        solid ? "text-ink-700" : "text-white/85"
      )}
    >
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={`/${l}`}
            onClick={() => onSwitch(l)}
            aria-current={l === current ? "true" : undefined}
            className={cn(
              "transition-colors",
              solid ? "hover:text-bordeaux-600" : "hover:text-white",
              l === current
                ? solid
                  ? "text-bordeaux-600"
                  : "text-white underline underline-offset-4"
                : "opacity-75"
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
