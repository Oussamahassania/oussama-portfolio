import { withBasePath } from "@/lib/paths";

export const profile = {
  name: "Oussama Hassania",
  displayName: "OUSSAMA HASSANIA",
  initials: "OH",
  role: "AI & Data Engineering Student",
  disciplines: ["Machine Learning", "Backend Engineering", "Cybersecurity"],
  location: "Dakhla, Morocco",
  tagline: "Building Intelligent Systems. Engineering the Future.",
  summary:
    "AI & Data Engineering Student passionate about Machine Learning, Software Engineering, and Cybersecurity.",
  email: "oussamahassania87@gmail.com",
  phone: "+212 6 33 93 38 43",
  linkedin: "https://linkedin.com/in/oussama-hassania",
  github: "https://github.com/Oussamahassania",
  existingSite: "https://oussamahassania.github.io",
  resume: withBasePath("/Oussama-Hassania-Resume.pdf"),
  about: {
    lead:
      "I work at the intersection of intelligent systems, secure software and disciplined engineering.",
    paragraphs: [
      "I am an engineering student in the Master's cycle in Data & Artificial Intelligence Engineering at ENSIASD. My path started in computer engineering, continued through a bachelor's degree in Cybersecurity and Artificial Intelligence, and now centres on data intelligence and applied machine learning.",
      "Alongside my studies, I have built REST APIs and full-stack platforms with Java and Spring Boot, developed computer-vision systems in Python, and spent hands-on time in web security testing and vulnerability research. Three internships taught me to ship code that other people actually depend on — and to care about the unglamorous parts: data models, error handling, tests and clear documentation.",
      "I am looking toward research-oriented AI development and engineering roles where I can grow into an AI / ML engineer while keeping the security and backend foundations sharp.",
    ],
    ambitions: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Software Engineer",
      "Data Engineer",
    ],
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Intermediate" },
      { name: "French", level: "Basic" },
    ],
  },
} as const;
