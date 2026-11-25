export type JourneyEntry = {
  id: string;
  period: string;
  title: string;
  organisation: string;
  kind: "education" | "experience";
  detail: string;
};

export const journey: JourneyEntry[] = [
  {
    id: "bac",
    period: "2023",
    title: "Baccalauréat — Physical Sciences & Chemistry",
    organisation: "Lycée Ibno Roched, Dakhla",
    kind: "education",
    detail: "Scientific foundation before moving into computer engineering.",
  },
  {
    id: "dut",
    period: "2024 — 2025",
    title: "University Diploma of Technology — Computer Engineering",
    organisation: "Higher School of Technology (EST), Dakhla",
    kind: "education",
    detail: "Core programming, data structures and software fundamentals.",
  },
  {
    id: "culture",
    period: "Jun — Jul 2024",
    title: "Front-End Developer Intern",
    organisation: "Regional Directorate of Culture, Dakhla",
    kind: "experience",
    detail: "Built responsive web interfaces with HTML, CSS and JavaScript.",
  },
  {
    id: "license",
    period: "2025 — 2026",
    title: "Bachelor's — Cybersecurity and Artificial Intelligence",
    organisation: "Higher School of Technology (EST), Dakhla",
    kind: "education",
    detail: "Connected security thinking with machine learning foundations.",
  },
  {
    id: "urban",
    period: "Apr — Jun 2025",
    title: "Full Stack Developer Intern",
    organisation: "Agence Urbaine de Dakhla",
    kind: "experience",
    detail:
      "Internal management platform: Java, Spring Boot, Angular, PostgreSQL, Docker and Git.",
  },
  {
    id: "master",
    period: "2026 — Present",
    title: "Master's cycle — Data & Artificial Intelligence Engineering (IDIA)",
    organisation: "ENSIASD",
    kind: "education",
    detail: "Current focus: data engineering, applied AI and research-oriented development.",
  },
  {
    id: "ocp",
    period: "Apr — Jun 2026",
    title: "AI Developer Intern",
    organisation: "OCP Phosboucraa, Laâyoune",
    kind: "experience",
    detail:
      "Real-time PPE detection for industrial environments using Python, OpenCV and YOLOv8.",
  },
];
