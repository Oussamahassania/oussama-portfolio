import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { security } from "@/data/security";

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-20 overflow-hidden bg-ink-2/60 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 signal-grid opacity-25" />
      <div className="container-page relative">
        <SectionHeading
          index="04"
          label="Security / Practice"
          title={
            <>
              Understand the system. <span className="text-acid">Then test it.</span>
            </>
          }
          description="A measured, responsible approach to security — built on structured learning, hands-on labs and careful reporting."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="card-surface relative h-full overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(198,242,109,0.12),transparent_70%)]" />
              <div className="mono-label">{security.headlineLabel}</div>
              <div className="display mt-8 flex items-baseline gap-3 text-[clamp(4rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.07em] text-fg">
                {security.headline}
                <span className="h-3 w-3 rounded-full bg-acid shadow-[0_0_20px_rgba(198,242,109,0.7)]" />
              </div>
              <p className="mt-8 max-w-md text-sm leading-7 text-muted md:text-base">
                {security.intro}
              </p>
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-8">
                {security.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="display text-2xl font-medium text-accent md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mono-label mt-2 leading-5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080c0f] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-acid/60" />
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-2">
                  profile.readout
                </span>
              </div>

              <div className="space-y-3 font-mono text-[0.75rem] leading-6 md:text-[0.82rem]">
                {security.terminal.map((line, index) => (
                  <div key={line.prompt} className="flex flex-wrap gap-x-3 gap-y-1">
                    <span className="text-accent/80">$</span>
                    <span className="min-w-[7.5rem] text-fg/90">{line.prompt}</span>
                    <span
                      className={"muted" in line && line.muted ? "text-muted-2" : "text-muted"}
                    >
                      {line.text}
                    </span>
                    {index === security.terminal.length - 1 && (
                      <span className="inline-block h-4 w-1.5 bg-acid/70 motion-safe:animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-white/[0.07] pt-7">
                <p className="text-sm leading-7 text-fg/85">{security.statement}</p>
              </div>
              <div className="scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-acid/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
