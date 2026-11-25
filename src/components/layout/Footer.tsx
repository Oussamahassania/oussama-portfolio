import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-2">
      <div className="container-page flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-2">
          © 2026 {profile.name} · Built with intent
        </p>
        <div className="flex items-center gap-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">
            LinkedIn
          </a>
          <a href={profile.resume} download className="link-underline hover:text-fg">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
