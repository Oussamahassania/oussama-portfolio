"use client";

import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { easeOut } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/ButtonLink";

const NeuralCanvas = dynamic(
  () => import("@/components/three/NeuralCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 signal-grid opacity-30" aria-hidden="true" />
    ),
  },
);

const signals = [
  { value: "03", label: "internships" },
  { value: "TOP 4%", label: "TryHackMe" },
  { value: "05", label: "selected projects" },
];

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: easeOut },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 signal-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_at_65%_50%,black,transparent_72%)]" />
        <div className="absolute -right-[15%] -top-[22%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.10),transparent_62%)]" />
        <div className="absolute -bottom-[35%] left-[5%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08),transparent_65%)]" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-80 md:left-[18%]"
        aria-hidden="true"
      >
        <NeuralCanvas />
      </div>

      <div className="container-page relative z-10">
        <motion.div {...rise(0.05)} className="mb-8 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/[0.05] px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">
            <span className="status-dot" />
            Open to opportunities
          </span>
          <span className="mono-label hidden sm:inline">
            AI · SECURITY · SOFTWARE / 2026
          </span>
        </motion.div>

        <h1
          id="hero-heading"
          className="display max-w-[15ch] text-[clamp(3.4rem,11.2vw,10.2rem)] font-semibold leading-[0.83]"
        >
          <motion.span {...rise(0.12)} className="block text-fg">
            OUSSAMA
          </motion.span>
          <motion.span {...rise(0.22)} className="block text-outline">
            HASSANIA
          </motion.span>
        </h1>

        <motion.div {...rise(0.34)} className="mt-10 max-w-2xl">
          <p className="display text-[clamp(1.35rem,2.6vw,2.2rem)] font-medium leading-tight text-gradient">
            {profile.tagline}
          </p>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-muted md:text-base">
            {profile.summary}
          </p>
        </motion.div>

        <motion.div
          {...rise(0.46)}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <ButtonLink href="#projects">View My Work</ButtonLink>
          <ButtonLink href={profile.resume} download variant="outline">
            Download Resume
          </ButtonLink>
          <ButtonLink href="#contact" variant="quiet" className="px-4">
            Contact Me
          </ButtonLink>
        </motion.div>

        <motion.div
          {...rise(0.58)}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/[0.07] pt-6 md:gap-x-14"
        >
          {signals.map((signal) => (
            <div key={signal.label} className="flex items-baseline gap-3">
              <span className="display text-xl font-medium text-fg md:text-2xl">
                {signal.value}
              </span>
              <span className="mono-label">{signal.label}</span>
            </div>
          ))}
          <div className="ml-auto hidden items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2 lg:flex">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Oussama"
              className="transition-colors hover:text-accent"
            >
              <Mail size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-2 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-transparent via-accent to-transparent motion-safe:animate-[scan-line_3.5s_linear_infinite]" />
        </span>
        <ArrowDown size={13} className="text-accent/70" />
      </a>
    </section>
  );
}
