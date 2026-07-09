import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Su fondo bordeaux (sezioni immerse) il testo passa al bianco. */
  onDark?: boolean;
};

/**
 * Apertura di sezione: titolo Marcellus e, se serve, un capoverso di
 * accompagnamento. Nessuna etichetta sopra il titolo — il titolo basta.
 */
export default function SectionHeading({
  title,
  description,
  align = "left",
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <h2
        className={cn(
          "text-4xl leading-[1.08] md:text-5xl",
          onDark ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            onDark ? "text-bordeaux-100" : "text-ink-700"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
