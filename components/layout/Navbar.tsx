"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { contact } from "@/lib/data";
import { locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type NavbarProps = {
  lang: Locale;
  dict: Dictionary["nav"];
};

/**
 * Navbar sempre a superficie piena (ink-950): nessuno stato trasparente da
 * bilanciare contro foto imprevedibili. Il bordo hairline si accende solo
 * dopo lo scroll, per dare profondità senza ombre.
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-ink-950 transition-[border-color] duration-500",
        "border-b",
        scrolled ? "border-ink-800" : "border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href={`/${lang}`}
          className="whitespace-nowrap font-serif text-2xl font-semibold tracking-wide text-cream"
        >
          Il dono di Atena
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {dict.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-cream/70 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}

          <LocaleSwitcher current={lang} onSwitch={switchLocale} />

          <Button href={contact.phoneHref} variant="solid" arrow={false} className="px-5 py-2.5">
            <Phone className="h-3.5 w-3.5" />
            {dict.book}
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? dict.closeMenu : dict.openMenu}
          className="text-cream lg:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-ink-800 bg-ink-950 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {dict.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LocaleSwitcher current={lang} onSwitch={switchLocale} />
            </div>
            <div className="px-3 pt-2">
              <Button
                href={contact.phoneHref}
                variant="solid"
                arrow={false}
                className="w-full"
              >
                <Phone className="h-4 w-4" />
                {dict.bookNow}
              </Button>
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
}: {
  current: Locale;
  onSwitch: (l: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase text-cream/70">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          <Link
            href={`/${l}`}
            onClick={() => onSwitch(l)}
            aria-current={l === current ? "true" : undefined}
            className={cn(
              "transition-colors hover:text-cream",
              l === current ? "text-cream" : "opacity-70"
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
