import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

/**
 * Aggiunge il prefisso di lingua agli URL che ne sono privi.
 * Esclude API, area admin, asset statici e file con estensione.
 * La lingua viene scelta da cookie o header Accept-Language (fallback: it).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Già con prefisso lingua → passa.
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && locales.includes(cookie as (typeof locales)[number])) {
    return cookie;
  }
  const accept = request.headers.get("accept-language") ?? "";
  const preferred = accept.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && locales.includes(preferred as (typeof locales)[number])) {
    return preferred;
  }
  return defaultLocale;
}

export const config = {
  // Esclude api, admin, _next e qualsiasi percorso con un punto (file statici).
  matcher: ["/((?!api|admin|_next|.*\\.).*)"],
};
