export const runtime = "edge";

import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Apartments from "@/components/sections/Apartments";
import Experience from "@/components/sections/Experience";
import Booking from "@/components/sections/Booking";
import Location from "@/components/sections/Location";
import CookieConsent from "@/components/ui/CookieConsent";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main>
        <Hero lang={lang} dict={dict.hero} />
        <Features dict={dict.features} />
        <Apartments dict={dict.apartments} />
        <Experience dict={dict.experience} />
        <Booking lang={lang} dict={dict.booking} />
        <Location dict={dict.location} />
      </main>
      <Footer lang={lang} dict={dict.footer} navLinks={dict.nav.links} />
      <CookieConsent lang={lang} dict={dict.cookieBanner} />
    </>
  );
}