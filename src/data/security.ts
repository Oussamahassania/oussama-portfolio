export const security = {
  headline: "TOP 4%",
  headlineLabel: "TryHackMe ranking",
  intro:
    "Curiosity about how systems break became a disciplined practice: web application security testing, structured learning and responsible disclosure.",
  stats: [
    { value: "4%", label: "TryHackMe top percentile" },
    { value: "100+", label: "Rooms & challenges completed" },
    { value: "VDP", label: "Multiple disclosure programs" },
  ],
  terminal: [
    { prompt: "profile", text: "--security", muted: true },
    { prompt: "tryhackme", text: "top 4% · 100+ rooms completed" },
    { prompt: "focus", text: "web application security testing" },
    { prompt: "tooling", text: "OWASP Top 10 · Burp Suite · Wazuh basics" },
    { prompt: "disclosure", text: "multiple VDP programs · findings reported" },
    { prompt: "outcomes", text: "duplicate & informative reports included", muted: true },
    { prompt: "note", text: "no bounty or critical finding is claimed", muted: true },
  ],
  statement:
    "Hands-on experience in web security testing and vulnerability research, with participation in multiple VDP programs and experience reporting security findings.",
} as const;
