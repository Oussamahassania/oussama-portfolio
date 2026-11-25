import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden bg-ink-2/60 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 signal-grid opacity-20" />
      <div className="container-page relative">
        <SectionHeading
          index="06"
          label="Journey / Timeline"
          title={
            <>
              Built one <span className="text-accent">decision</span> at a time.
            </>
          }
          description="Academic progression, internships and the projects that shaped the way I engineer software."
        />

        <div className="relative grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="display text-2xl font-medium leading-snug text-fg md:text-3xl">
                From computer engineering to data intelligence — with security as a constant lens.
              </p>
              <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
                Every step added a layer: systems fundamentals, secure design, applied AI and production-shaped backend work.
              </p>
              <div className="mono-label mt-10 flex items-center gap-3">
                <span className="h-px w-8 bg-accent/50" />
                {journey.length} milestones
              </div>
            </div>
          </Reveal>

          <ol className="relative border-l border-white/[0.09] pl-7 md:pl-10">
            {journey.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.04}>
                <li className="group relative pb-12 last:pb-0">
                  <span
                    className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink md:-left-[43px] ${
                      entry.kind === "experience" ? "bg-accent" : "bg-violet"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-[0.68rem] tracking-[0.16em] text-accent">
                      {entry.period}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.14em] ${
                        entry.kind === "experience"
                          ? "border-accent/25 text-accent"
                          : "border-violet/25 text-violet"
                      }`}
                    >
                      {entry.kind}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-xl font-medium text-fg md:text-2xl">
                    {entry.title}
                  </h3>
                  <div className="mt-1 text-sm text-fg/60">{entry.organisation}</div>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
                    {entry.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
