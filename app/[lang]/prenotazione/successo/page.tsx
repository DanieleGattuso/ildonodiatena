export const runtime = "edge";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = { robots: { index: false } };

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "it";
  const dict = getDictionary(locale).success;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-bordeaux-600" />
        <h1 className="mt-6 text-4xl text-ink-950">
          {dict.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-700">{dict.text}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center justify-center bg-bordeaux-600 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-bordeaux-700"
        >
          {dict.home}
        </Link>
      </div>
    </main>
  );
}