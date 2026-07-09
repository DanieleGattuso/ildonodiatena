import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line";
  /** Mostra la freccia finale. Attiva di default sulla variante line. */
  arrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-300";

const variants = {
  solid: "bg-bordeaux-600 px-7 py-3.5 text-white hover:bg-bordeaux-700",
  line: "border-b border-ink-950/30 pb-1 text-ink-950 hover:border-bordeaux-600 hover:text-bordeaux-600",
};

/**
 * Unico sistema di CTA del sito: superficie piena bordeaux (solid) per
 * l'azione primaria, sottolineatura a filo (line) per tutto il resto.
 * Nessuna pillola, nessuna ombra — riusato identico in ogni sezione.
 */
export default function Button({
  href,
  children,
  variant = "solid",
  arrow,
  className,
}: ButtonProps) {
  const showArrow = arrow ?? variant === "line";

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
