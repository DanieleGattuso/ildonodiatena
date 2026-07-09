import type { Metadata, Viewport } from "next";
import { Marcellus, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ildonodiatena.it"),
  title: {
    default: "Il dono di Atena | Villa con piscina a Cefalù",
    template: "%s | Il dono di Atena",
  },
  description:
    "Il dono di Atena: la tua oasi di relax a Cefalù. Villa con piscina, due appartamenti indipendenti immersi in una tenuta biologica di ulivi e agrumi.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${marcellus.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
