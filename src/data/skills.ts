export type SkillCategory = {
  id: string;
  index: string;
  title: string;
  caption: string;
  skills: string[];
  signal: string;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    index: "01",
    title: "AI & Machine Learning",
    caption: "Models, data and perception",
    signal: "neural.signals / active",
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow / Keras",
      "Deep Learning",
      "Machine Learning",
      "Computer Vision",
      "YOLOv8",
      "OpenCV",
      "Explainable AI",
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend & Software",
    caption: "APIs, services and tests",
    signal: "services.status / healthy",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Git",
      "Docker",
      "JUnit",
      "Mockito",
    ],
  },
  {
    id: "data",
    index: "03",
    title: "Data Engineering",
    caption: "Pipelines and structure",
    signal: "pipelines.queue / ready",
    skills: [
      "Data Processing",
      "Data Analysis",
      "ETL concepts",
      "Data Modeling",
      "Power BI",
    ],
  },
  {
    id: "security",
    index: "04",
    title: "Cybersecurity",
    caption: "Offensive practice and defence",
    signal: "threat.scan / running",
    skills: [
      "Web Penetration Testing",
      "OWASP Top 10",
      "Burp Suite",
      "Vulnerability Assessment",
      "TryHackMe",
      "VDP experience",
      "Wazuh (SIEM) basics",
    ],
  },
];
