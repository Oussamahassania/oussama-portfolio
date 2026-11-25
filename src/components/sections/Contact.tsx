"use client";

import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/Oussamahassania",
    href: profile.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/oussama-hassania",
    href: profile.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Resume",
    value: "PDF · latest version",
    href: profile.resume,
    icon: Download,
    external: false,
    download: true,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 signal-grid opacity-25 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.10),transparent_65%)]" />

      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="mono-label text-accent">07</span>
                <span className="h-px w-10 bg-accent/40" />
                <span className="mono-label">Contact / Next step</span>
              </div>
              <h2 className="display text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] text-fg">
                Let&apos;s build
                <br />
                <span className="text-gradient">something real.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-base leading-8 text-muted">
                Open to AI engineering, machine learning, data and backend roles — and always interested in a serious conversation about secure, well-built systems.
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="link-underline group mt-10 inline-flex items-center gap-3 font-display text-xl text-fg transition-colors hover:text-accent md:text-3xl"
              >
                {profile.email}
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-2 transition-colors hover:text-accent"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied to clipboard" : "Copy email address"}
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="card-surface overflow-hidden rounded-2xl">
              <div className="border-b border-white/[0.07] px-6 py-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-2 md:px-8">
                Direct channels
              </div>
              <div className="divide-y divide-white/[0.06]">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.label}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      download={channel.download}
                      className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.025] md:px-8"
                    >
                      <Icon size={17} className="shrink-0 text-accent/70" />
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-base text-fg">
                          {channel.label}
                        </div>
                        <div className="truncate font-mono text-[0.65rem] tracking-wide text-muted-2">
                          {channel.value}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-muted-2 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  );
                })}
              </div>
              <div className="border-t border-white/[0.07] px-6 py-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2 md:px-8">
                {profile.location} · responses usually within a few days
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
