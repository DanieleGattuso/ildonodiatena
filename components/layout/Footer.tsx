import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { contact, navLinks } from "@/lib/data";
import Container from "@/components/ui/Container";

/** Footer con contatti, navigazione e link alle policy. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive-900 text-cream/80">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-cream">
              Il dono di Atena
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              La tua oasi di relax a Cefalù: villa con piscina immersa in una
              tenuta biologica di ulivi e agrumi.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-cream">
              Esplora
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-terracotta-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-cream">
              Contatti
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-terracotta-200" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-none text-terracotta-200" />
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-terracotta-200"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none text-terracotta-200" />
                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-terracotta-200"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm sm:flex-row">
          <p>© {year} Il dono di Atena. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-terracotta-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-terracotta-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
