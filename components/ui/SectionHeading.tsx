import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/**
 * Apertura di sezione coerente su tutto il sito: una riga hairline porta
 * l'etichetta, il titolo enorme segue sotto. Sempre su fondo ink — un solo
 * sistema di testo (crema a opacità decrescente), niente varianti "invert".
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <div
          className={cn(
            "mb-6 flex items-center gap-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-10 flex-none bg-terracotta-400" />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cream/60">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-5xl font-semibold leading-[1.02] text-cream md:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/65">
          {description}
        </p>
      )}
    </div>
  );
}
