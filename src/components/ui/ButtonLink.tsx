import { ArrowUpRight, Download } from "lucide-react";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "quiet";
  download?: boolean;
  external?: boolean;
  className?: string;
};

const styles: Record<string, string> = {
  primary:
    "bg-accent text-ink hover:bg-[#8df6e5] shadow-[0_0_0_0_rgba(94,234,212,0)] hover:shadow-[0_12px_40px_-18px_rgba(94,234,212,0.9)]",
  outline:
    "border border-line-strong text-fg hover:border-accent/60 hover:bg-accent/[0.06]",
  quiet: "text-muted hover:text-fg",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download = false,
  external = false,
  className = "",
}: ButtonLinkProps) {
  const Icon = download ? Download : ArrowUpRight;
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.82rem] font-medium tracking-tight transition-all duration-300 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <Icon
        size={15}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
