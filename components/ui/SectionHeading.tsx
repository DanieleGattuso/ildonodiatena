import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

/** Intestazione coerente per ogni sezione: occhiello + titolo serif + descrizione. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-medium uppercase tracking-widest",
            invert ? "text-terracotta-200" : "text-terracotta-500"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-4xl font-semibold leading-tight md:text-5xl",
          invert ? "text-cream" : "text-olive-900"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            invert ? "text-cream/80" : "text-olive-700"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
