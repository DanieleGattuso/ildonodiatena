import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-terracotta-500 text-cream hover:bg-terracotta-600 shadow-lg shadow-terracotta-900/20",
  outline:
    "border border-cream/70 text-cream hover:bg-cream hover:text-olive-900",
  ghost:
    "border border-olive-300 text-olive-800 hover:bg-olive-500 hover:text-cream hover:border-olive-500",
};

/** CTA riutilizzabile. Usa next/link per ancore interne e link esterni. */
export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5",
        "text-sm font-medium uppercase tracking-widest transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-400",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
