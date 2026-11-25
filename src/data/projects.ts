export type ProjectVisual =
  | "forma"
  | "ppe"
  | "drowsiness"
  | "phishing"
  | "churn";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "article" | "mail";
};

export type Project = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  context: string;
  period: string;
  status?: string;
  description: string;
  problem: string;
  architecture: string[];
  features: string[];
  decision: string;
  technologies: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  accent: "cyan" | "violet" | "acid";
};

export const projects: Project[] = [
  {
    id: "forma",
    index: "01",
    name: "FORMA — Commerce Platform",
    shortName: "FORMA",
    tagline: "A complete commerce system, designed around a secure Spring Boot API.",
    domain: "Backend / Full Stack",
    context: "Personal project",
    period: "2025 — 2026",
    description:
      "FORMA pairs a layered Spring Boot commerce API with a React storefront and an admin studio. The backend covers catalogue, search, cart, orders, payments, reviews and users; the frontend consumes that surface with typed API hooks and server-state management.",
    problem:
      "A practice platform for modelling the entire commerce lifecycle — including authentication boundaries, stock state and admin operations — instead of another isolated CRUD demo.",
    architecture: [
      "Spring Boot API · JPA / Hibernate · H2 dev profile",
      "Spring Security with JWT and role-based access control",
      "JPA Specifications for search, filters and pagination",
      "React 19 + TypeScript + Vite + TanStack Query",
      "Simulated payment gateway with retry-friendly design",
    ],
    features: [
      "Storefront: catalogue, live search, filters, product pages and reviews",
      "Persistent server-side cart with optimistic quantity updates",
      "Checkout, order history, refunds and cancellation flows",
      "Admin studio: dashboard, product/category CRUD, orders and users",
      "Upload handling, email templates and scheduled stock/order jobs",
      "Controller, integration and service test layers",
    ],
    decision:
      "The dev profile runs without Postgres, Redis or SMTP via H2, an in-process cache and seeded data. That keeps the full stack runnable on a laptop while the security rules, role checks and API contracts stay production-shaped.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "JPA / Hibernate",
      "Redis-ready cache",
      "React",
      "TypeScript",
      "Vite",
      "JUnit",
      "Mockito",
    ],
    links: [
      {
        label: "View repository",
        href: "https://github.com/Oussamahassania/ecomerce-platform-with-spring-boot",
        kind: "github",
      },
    ],
    visual: "forma",
    accent: "cyan",
  },
  {
    id: "ppe",
    index: "02",
    name: "Industrial PPE Detection",
    shortName: "PPE VISION",
    tagline: "Real-time computer vision for workplace safety compliance.",
    domain: "Computer Vision",
    context: "AI Developer Intern · OCP Phosboucraa",
    period: "Apr — Jun 2026",
    description:
      "An AI system that detects personal protective equipment worn by workers in an industrial environment. Built during an internship, it applies YOLOv8 object detection to camera frames and turns detections into compliance signals.",
    problem:
      "Manual PPE checks are inconsistent and difficult to audit across multiple industrial zones. Automated visual verification gives supervisors a continuous, reviewable signal.",
    architecture: [
      "Camera frame ingestion and preprocessing with OpenCV",
      "YOLOv8 inference with per-class confidence thresholds",
      "Detection classes: helmet, vest, gloves, goggles and person",
      "Compliance evaluation and violation alerting",
      "Zone-level reporting for safety review",
    ],
    features: [
      "Real-time detection on industrial video frames",
      "Class-specific confidence thresholds",
      "Multi-stream frame handling",
      "Annotated detections for operator review",
      "Compliance reporting by zone",
    ],
    decision:
      "Per-class thresholds matter more than a single global cutoff: a missed helmet and a uncertain glove detection carry very different safety consequences.",
    technologies: ["Python", "YOLOv8", "OpenCV", "Computer Vision", "Deep Learning"],
    links: [
      {
        label: "Project notes",
        href: "https://oussamahassania.github.io/posts/ppe-detection-system/",
        kind: "article",
      },
    ],
    visual: "ppe",
    accent: "acid",
  },
  {
    id: "drowsiness",
    index: "03",
    name: "Drowsiness Detection System",
    shortName: "VIGIL",
    tagline: "Fatigue detection from facial geometry and learned patterns.",
    domain: "Machine Learning",
    context: "Academic project · EST Dakhla",
    period: "2024 — 2025",
    description:
      "A computer-vision system that monitors a driver's face in real time. It combines geometric signals — eye and mouth aspect ratios — with a deep-learning classifier to flag drowsiness and trigger an alert.",
    problem:
      "Driver fatigue is difficult to spot from the outside. A camera-based system can provide an immediate, low-cost warning while the risk is still actionable.",
    architecture: [
      "Webcam frame capture and face detection with OpenCV",
      "Facial landmark extraction",
      "Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) signals",
      "TensorFlow / Keras classifier",
      "Rule-based thresholds combined with model output",
      "Audio and visual alert layer",
    ],
    features: [
      "Live webcam inference",
      "Geometric drowsiness indicators",
      "Combined threshold + classifier decision",
      "Real-time driver alerting",
    ],
    decision:
      "Pairing interpretable geometric signals with a learned classifier keeps the decision traceable: when an alert fires, you can see whether it came from eye closure, yawning or the model.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas"],
    links: [
      {
        label: "Project notes",
        href: "https://oussamahassania.github.io/posts/drowsiness-detection/",
        kind: "article",
      },
    ],
    visual: "drowsiness",
    accent: "violet",
  },
  {
    id: "phishing",
    index: "04",
    name: "Phishing Email Detection",
    shortName: "SIGNAL",
    tagline: "Line-level language classification for suspicious email content.",
    domain: "NLP / Security",
    context: "Team project",
    period: "2025",
    description:
      "A Flask inference service that scores individual lines of an email with a transformer tokenizer and a TensorFlow sequence classifier, then aggregates them into a single verdict using heuristic risk weights.",
    problem:
      "Phishing signals are often concentrated in a few lines of an otherwise ordinary message. Treating the entire email as one truncated input can dilute those signals.",
    architecture: [
      "Flask API with CORS and a `/predict` endpoint",
      "HuggingFace tokenizer + TensorFlow sequence classifier",
      "Per-line probability scoring",
      "Risk-word and URL weighting heuristics",
      "Weighted aggregation into an email-level label",
    ],
    features: [
      "Batch predictions for multiple emails",
      "Line-level risk weighting",
      "Legitimate / phishing verdict with confidence",
      "Local model loading without external inference calls",
    ],
    decision:
      "The service splits an email into lines before classification, so short urgent phrases, links and credential requests retain their influence in the final score.",
    technologies: ["Python", "Flask", "TensorFlow", "Transformers", "NumPy"],
    links: [
      {
        label: "View repository",
        href: "https://github.com/Oussamahassania/phishing-email-detection-withai",
        kind: "github",
      },
    ],
    visual: "phishing",
    accent: "cyan",
  },
  {
    id: "churn",
    index: "05",
    name: "Explainable Customer Churn",
    shortName: "CHURN / XAI",
    tagline: "Understanding the 'why' behind churn predictions.",
    domain: "Explainable AI",
    context: "Exploratory research",
    period: "2026",
    status: "Private · in progress",
    description:
      "An exploratory line of work on customer churn using the Telco Customer Churn dataset. The focus is interpretability: which customer attributes drive a prediction, and how to communicate those reasons clearly rather than reporting a score alone.",
    problem:
      "A churn score is only useful when a team can understand and act on it. This work examines feature-level explanations around contract, tenure and monthly charges.",
    architecture: [
      "Telco Customer Churn dataset exploration",
      "Classical machine-learning baselines under evaluation",
      "Feature-level interpretation and explanation workflow",
      "Documentation and reproducibility in progress",
    ],
    features: [
      "Dataset exploration and preprocessing",
      "Interpretable feature focus",
      "Explanation-first reporting approach",
    ],
    decision:
      "Interpretability is treated as part of the model, not an afterthought — the output should explain which signals moved a decision.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Explainable AI"],
    links: [
      {
        label: "Request details",
        href: "mailto:oussamahassania87@gmail.com?subject=Explainable%20Churn%20project",
        kind: "mail",
      },
    ],
    visual: "churn",
    accent: "acid",
  },
];
