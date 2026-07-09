import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { contact } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";

type FooterProps = {
  lang: Locale;
  dict: Dictionary["footer"];
  navLinks: Dictionary["nav"]["links"];
};

/** Footer immerso nel bordeaux profondo: contatti, navigazione e policy. */
export default function Footer({ lang, dict, navLinks }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bordeaux-800 text-bordeaux-100">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl text-white">
              Il dono di Atena
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{dict.tagline}</p>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold text-white">
              {dict.explore}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${lang}${link.href}`}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-semibold text-white">
              {dict.contacts}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-none" />
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-none" />
                <a
                  href={contact.emailHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-bordeaux-600/50 pt-8 text-sm sm:flex-row">
          <p>© {year} Il dono di Atena. {dict.rights}</p>
          <div className="flex gap-6">
            <Link
              href={`/${lang}/privacy-policy`}
              className="transition-colors hover:text-white"
            >
              {dict.privacy}
            </Link>
            <Link
              href={`/${lang}/cookie-policy`}
              className="transition-colors hover:text-white"
            >
              {dict.cookie}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
