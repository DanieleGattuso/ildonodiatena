"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, contact } from "@/lib/data";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

/**
 * Navbar trasparente sopra la Hero, diventa solida (sfondo crema) allo scroll.
 * Include menu mobile a tendina.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-serif text-2xl font-semibold tracking-wide transition-colors",
            scrolled ? "text-olive-900" : "text-cream"
          )}
        >
          Il dono di Atena
        </Link>

        {/* Navigazione desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wider transition-colors hover:text-terracotta-400",
                scrolled ? "text-olive-800" : "text-cream"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-cream transition-colors hover:bg-terracotta-600"
          >
            <Phone className="h-4 w-4" />
            Prenota
          </a>
        </nav>

        {/* Toggle menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          className={cn(
            "md:hidden",
            scrolled || open ? "text-olive-900" : "text-cream"
          )}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </Container>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-olive-100 bg-cream md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-olive-800 transition-colors hover:bg-olive-50"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={contact.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-500 px-5 py-3 text-sm font-medium uppercase tracking-wider text-cream"
            >
              <Phone className="h-4 w-4" />
              Prenota ora
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
