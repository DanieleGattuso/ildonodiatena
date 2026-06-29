import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

const BASE = "https://www.ildonodiatena.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/privacy-policy", "/cookie-policy"];

  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("yearly" as const),
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${path}`])
        ),
      },
    }))
  );
}
