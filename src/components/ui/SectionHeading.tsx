import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-7 flex items-center gap-4">
          <span className="mono-label text-accent">{index}</span>
          <span className="h-px w-10 bg-accent/40" />
          <span className="mono-label">{label}</span>
        </div>
      </Reveal>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal delay={0.05}>
          <h2 className="display max-w-4xl text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[0.98] text-fg">
            {title}
          </h2>
        </Reveal>
        {(description || aside) && (
          <Reveal delay={0.12} className="max-w-md lg:pb-2">
            {description && (
              <p className="text-sm leading-7 text-muted md:text-base">
                {description}
              </p>
            )}
            {aside}
          </Reveal>
        )}
      </div>
      <div className="hairline mt-10" />
    </div>
  );
}
