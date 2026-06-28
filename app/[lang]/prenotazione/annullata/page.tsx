export const runtime = "edge";

import Link from "next/link";
import { XCircle } from "lucide-react";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = { robots: { index: false } };

export default async function CancelledPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale).cancelled;

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <div className="max-w-lg text-center">
        <XCircle className="mx-auto h-16 w-16 text-terracotta-400" />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-olive-900">
          {dict.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-olive-700">{dict.text}</p>
        <Link
          href={`/${locale}#prenota`}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta-500 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-terracotta-600"
        >
          {dict.retry}
        </Link>
      </div>
    </main>
  );
}