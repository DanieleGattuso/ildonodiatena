import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ildonodiatena.it"),
  title: {
    default: "Il dono di Atena | Villa con piscina a Cefalù",
    template: "%s | Il dono di Atena",
  },
  description:
    "Il dono di Atena: la tua oasi di relax a Cefalù. Villa con piscina, due appartamenti indipendenti immersi in una tenuta biologica di ulivi e agrumi, a 4 km dal centro storico.",
  keywords: [
    "villa Cefalù",
    "casa vacanze Cefalù",
    "villa con piscina Sicilia",
    "Il dono di Atena",
    "appartamenti Cefalù",
  ],
  openGraph: {
    title: "Il dono di Atena | Villa con piscina a Cefalù",
    description:
      "La tua oasi di relax a Cefalù: villa con piscina, due appartamenti indipendenti in una tenuta biologica di ulivi e agrumi.",
    locale: "it_IT",
    type: "website",
    url: "https://www.ildonodiatena.it",
    siteName: "Il dono di Atena",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
