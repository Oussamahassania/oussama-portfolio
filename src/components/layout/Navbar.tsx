"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";

function Mark() {
  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8" aria-hidden="true">
      <circle
        cx="18"
        cy="18"
        r="15.5"
        fill="none"
        stroke="rgba(94,234,212,0.35)"
        strokeWidth="1"
      />
      <path
        d="M9 25V11l9 10 9-10v14"
        fill="none"
        stroke="#5eead4"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      <circle cx="18" cy="21" r="1.8" fill="#c6f26d" />
    </svg>
  );
}

export function Navbar() {
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -52% 0px", threshold: [0, 0.1, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl">
      <div className="container-page flex h-[68px] items-center justify-between">
        <motion.a
          href="#home"
          initial={reduced ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group flex items-center gap-3"
          aria-label="Oussama Hassania — home"
        >
          <span className="transition-transform duration-500 group-hover:rotate-12">
            <Mark />
          </span>
          <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fg sm:block">
            oussama<span className="text-accent">.</span>hassania
          </span>
        </motion.a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item, i) => {
            const isActive = active === item.href;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                initial={reduced ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative rounded-full px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.13em] transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-accent/25 bg-accent/[0.07]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full border border-line-strong px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg transition-colors hover:border-accent/60 hover:text-accent md:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent/60 lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink/95 lg:hidden"
          >
            <div className="container-page flex flex-col py-4">
              {navItems.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-white/[0.05] py-3.5 font-display text-xl transition-colors ${
                    active === item.href ? "text-accent" : "text-fg"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[0.6rem] tracking-widest text-muted-2">
                    {item.index}
                  </span>
                  <span className="sr-only">section {i + 1}</span>
                </a>
              ))}
              <div className="mt-5 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                <span>{profile.location}</span>
                <a href={`mailto:${profile.email}`} className="text-accent">
                  Email me
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
