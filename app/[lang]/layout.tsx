import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/lib/i18n/config";
import LangSync from "@/components/layout/LangSync";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isIt = lang === "it";
  return {
    title: isIt
      ? "Il dono di Atena | Villa con piscina a Cefalù"
      : "Il dono di Atena | Villa with pool in Cefalù",
    description: isIt
      ? "La tua oasi di relax a Cefalù: villa con piscina, due appartamenti indipendenti in una tenuta biologica di ulivi e agrumi."
      : "Your relaxing oasis in Cefalù: a villa with pool and two independent apartments in an organic estate of olive and citrus trees.",
    alternates: {
      languages: { it: "/it", en: "/en" },
    },
    openGraph: {
      locale: isIt ? "it_IT" : "en_GB",
      type: "website",
      siteName: "Il dono di Atena",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <LangSync lang={lang} />
      {children}
    </>
  );
}
