"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Mail, FileText } from "lucide-react";
import { useState } from "react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projects, type Project } from "@/data/projects";

const accentRing: Record<Project["accent"], string> = {
  cyan: "hover:border-accent/40",
  violet: "hover:border-violet/40",
  acid: "hover:border-acid/40",
};

const linkIcons = {
  github: GithubIcon,
  article: FileText,
  mail: Mail,
};

function ProjectCard({ project, reverse }: { project: Project; reverse: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  return (
    <Reveal className="border-t border-white/[0.08] py-12 md:py-16">
      <article className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-[0.65rem] tracking-[0.22em] text-accent">
              {project.index}
            </span>
            <span className="mono-label">{project.domain}</span>
            <span className="text-white/10">/</span>
            <span className="mono-label">{project.period}</span>
            {project.status && (
              <span className="rounded-full border border-acid/25 bg-acid/[0.06] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-acid">
                {project.status}
              </span>
            )}
          </div>

          <h3 className="display mt-6 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] text-fg">
            {project.name}
          </h3>
          <p className="mt-4 text-lg leading-snug text-fg/80 md:text-xl">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-xl text-[0.9rem] leading-7 text-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="rounded border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-muted"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 8 && (
              <span className="rounded border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-muted-2">
                +{project.technologies.length - 8}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {project.links.map((link) => {
              const Icon = linkIcons[link.kind];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.kind === "mail" ? undefined : "_blank"}
                  rel={link.kind === "mail" ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent transition-colors hover:text-fg"
                >
                  <Icon size={14} />
                  {link.label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
            >
              {expanded ? "Hide details" : "Engineering details"}
              <ChevronDown
                size={13}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div
            className={`relative aspect-[4/3] w-full transition-transform duration-700 ${
              accentRing[project.accent]
            }`}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.015]">
              <ProjectVisual visual={project.visual} />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-2">
            <span>{project.context}</span>
            <span>fig. {project.index}</span>
          </div>
        </div>
      </article>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-10 grid gap-8 border-l border-accent/30 pl-6 md:grid-cols-3 md:gap-10">
              <div>
                <div className="mono-label mb-3">Problem</div>
                <p className="text-sm leading-7 text-muted">{project.problem}</p>
              </div>
              <div>
                <div className="mono-label mb-3">Architecture</div>
                <ul className="space-y-2">
                  {project.architecture.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mono-label mb-3">Key features</div>
                <ul className="mb-6 space-y-2">
                  {project.features.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet/70" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mono-label mb-2">Engineering decision</div>
                <p className="text-sm leading-7 text-muted">{project.decision}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Selected Work"
          title={
            <>
              Systems built to be <span className="text-accent">understood</span>.
            </>
          }
          description="From computer vision to commerce APIs — a focused set of projects where the engineering decisions matter as much as the result."
        />
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
