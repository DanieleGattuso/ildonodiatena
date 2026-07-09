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
  "group inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300";

const variants = {
  solid: "bg-terracotta-500 px-8 py-4 text-cream hover:bg-cream hover:text-ink-950",
  line: "border-b border-cream/35 pb-1 text-cream hover:border-cream",
};

/**
 * Unico sistema di CTA del sito: superficie piena (solid) per l'azione
 * primaria, sottolineatura a filo (line) per tutto il resto. Nessuna
 * pillola, nessuna ombra — riusato identico in ogni sezione.
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
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
