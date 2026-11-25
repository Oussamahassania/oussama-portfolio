"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/skills";

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const signalRef = useRef<HTMLDivElement>(null);
  const active = skillCategories[activeIndex];

  useEffect(() => {
    if (reduced || !signalRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        signalRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: signalRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
          },
        },
      );
    });
    return () => context.revert();
  }, [reduced]);

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 overflow-hidden bg-ink-2/60 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 signal-grid opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="container-page relative">
        <SectionHeading
          index="02"
          label="Capabilities / Stack"
          title={
            <>
              Tools are easy. <span className="text-violet">Judgment</span> is the work.
            </>
          }
          description="A working map of the languages, frameworks and practices I use — organised by the problems they solve."
        />

        <div className="grid gap-8 lg:grid-cols-[270px_1fr] lg:gap-12">
          <Reveal>
            <div className="flex flex-col gap-1" role="tablist" aria-label="Skill categories">
              {skillCategories.map((category, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                      selected
                        ? "border-accent/30 bg-accent/[0.07]"
                        : "border-transparent hover:border-line hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`font-mono text-[0.62rem] tracking-widest ${
                          selected ? "text-accent" : "text-muted-2"
                        }`}
                      >
                        {category.index}
                      </span>
                      <span
                        className={`font-display text-lg transition-colors ${
                          selected ? "text-fg" : "text-muted group-hover:text-fg"
                        }`}
                      >
                        {category.title}
                      </span>
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        selected ? "bg-accent shadow-[0_0_10px_#5eead4]" : "bg-white/10"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="mono-label mt-8 hidden max-w-[240px] leading-6 lg:block">
              Select a domain to inspect the current toolchain.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface relative min-h-[420px] overflow-hidden rounded-2xl p-7 md:p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(94,234,212,0.10),transparent_70%)]" />
              <div className="relative flex items-center justify-between gap-4">
                <span className="mono-label text-accent/80">skill.query --list</span>
                <span className="font-mono text-[0.62rem] tracking-widest text-muted-2">
                  [{String(activeIndex + 1).padStart(2, "0")} / 04]
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-10"
                >
                  <h3 className="display text-3xl font-medium text-fg md:text-5xl">
                    {active.title}
                  </h3>
                  <p className="mono-label mt-3">{active.caption}</p>

                  <div className="mt-10 flex flex-wrap gap-2.5">
                    {active.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.35,
                          delay: reduced ? 0 : index * 0.025,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group inline-flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.015] px-3.5 py-2.5 text-[0.82rem] text-fg/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-fg"
                      >
                        <span className="h-1 w-1 rounded-full bg-accent/50 transition-all group-hover:bg-accent" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-7 bottom-7 md:inset-x-10 md:bottom-9">
                <div
                  ref={signalRef}
                  className="h-px w-full origin-left bg-gradient-to-r from-accent via-violet/60 to-transparent"
                />
                <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
                  <span>{active.signal}</span>
                  <span>verified / applied</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
