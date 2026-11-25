import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

function IdentityDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[330px]" aria-hidden="true">
      <svg viewBox="0 0 320 320" className="h-full w-full">
        <defs>
          <linearGradient id="about-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="about-core">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(238,243,241,0.08)" />
        <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(238,243,241,0.07)" strokeDasharray="3 7" />
        <circle cx="160" cy="160" r="66" fill="none" stroke="rgba(94,234,212,0.18)" />
        <circle cx="160" cy="160" r="58" fill="url(#about-core)" />
        <circle cx="160" cy="160" r="40" fill="none" stroke="url(#about-line)" strokeWidth="1.2" />

        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 160 + Math.cos(rad) * 66;
          const y1 = 160 + Math.sin(rad) * 66;
          const x2 = 160 + Math.cos(rad) * 150;
          const y2 = 160 + Math.sin(rad) * 150;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(238,243,241,0.08)"
            />
          );
        })}

        <path
          d="M160 52 C216 92 220 210 160 268 C100 210 104 92 160 52Z"
          fill="none"
          stroke="url(#about-line)"
          strokeWidth="1.1"
        />
        <path
          d="M52 160 C92 104 210 100 268 160 C210 220 92 216 52 160Z"
          fill="none"
          stroke="rgba(167,139,250,0.28)"
          strokeWidth="1"
        />

        {[
          [160, 52],
          [268, 160],
          [160, 268],
          [52, 160],
          [220, 100],
          [100, 220],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i < 4 ? 3.5 : 2.5}
            fill={i % 2 === 0 ? "#5eead4" : "#a78bfa"}
          />
        ))}
        <circle cx="160" cy="160" r="4" fill="#c6f26d" />
        <text x="160" y="29" textAnchor="middle" fill="#788783" fontSize="9" fontFamily="monospace" letterSpacing="2">
          IDENTITY / VECTOR
        </text>
        <text x="160" y="305" textAnchor="middle" fill="#788783" fontSize="9" fontFamily="monospace" letterSpacing="2">
          AI · SEC · ENG
        </text>
      </svg>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="About / Profile"
          title={
            <>
              Curiosity, made <span className="text-accent">concrete</span>.
            </>
          }
          description="A student engineer building at the seam between intelligent systems, secure software and real-world constraints."
        />

        <div className="grid gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="display text-[clamp(1.7rem,3.2vw,2.9rem)] font-medium leading-[1.18] text-fg">
                {profile.about.lead}
              </p>
            </Reveal>
            <div className="mt-10 space-y-6">
              {profile.about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="max-w-2xl text-[0.95rem] leading-[1.9] text-muted md:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25} className="mt-12">
              <div className="mono-label mb-4">Direction / ambitions</div>
              <div className="flex flex-wrap gap-2">
                {profile.about.ambitions.map((ambition) => (
                  <span
                    key={ambition}
                    className="rounded-full border border-line px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg/80 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {ambition}
                  </span>
                ))}
              </div>
              <a
                href="#security"
                className="link-underline mt-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-acid transition-colors hover:text-fg"
              >
                Explore the security practice →
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="card-surface relative overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="signal-grid-fine pointer-events-none absolute inset-0 opacity-30" />
              <IdentityDiagram />
              <div className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/[0.07] pt-8">
                <div>
                  <div className="mono-label mb-2">Based in</div>
                  <p className="text-sm text-fg">{profile.location}</p>
                </div>
                <div>
                  <div className="mono-label mb-2">Current</div>
                  <p className="text-sm text-fg">MSc cycle · IDIA</p>
                </div>
                <div>
                  <div className="mono-label mb-2">Background</div>
                  <p className="text-sm text-fg">Cybersecurity & AI</p>
                </div>
                <div>
                  <div className="mono-label mb-2">Languages</div>
                  <p className="text-sm text-fg">Arabic · English · French</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
