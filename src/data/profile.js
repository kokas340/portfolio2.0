// Single source of truth for the site's content. Every claim here comes from the
// CV (cvTailor master.json) or the confirmed experience log, so keep it that way:
// edit facts here, not inside components.

import smartvision from "../images/work/smartvision.webp";
import petfeeder from "../images/work/petfeeder.webp";
import rigacup from "../images/work/rigacup.webp";
import pnta from "../images/work/pnta.webp";
import blackjack from "../images/work/blackjack.webp";
import whLogo from "../images/wh.png";
import gcLogo from "../images/gc.png";

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function yearsSince(isoDate, now = new Date()) {
  return Math.floor((now - new Date(isoDate)) / MS_PER_YEAR);
}

// "3 yrs 3 mos" between a start month and now (or an end month).
export function tenure(startIso, endIso) {
  const start = new Date(startIso);
  const end = endIso ? new Date(endIso) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (endIso) months += 1; // inclusive of the final month for closed roles
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export const person = {
  name: "Jack Spinola",
  role: "Software Engineer",
  location: "Aarhus, Denmark",
  email: "jackspinola198@hotmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jack-spinola-0a835927b/",
    github: "https://github.com/kokas340",
    source: "https://github.com/kokas340/portfolio2.0",
  },
};

// Two beats: the product owner half, then the developer half.
export const hero = {
  eyebrow: `Product owner & developer · ${person.location}`,
  title: ["I decide what to build.", "Then I build it."],
  lede:
    "Hi, I'm Jack, product owner and full-stack developer at WasteHero. I talk to customers, turn what they need into a plan, then build and ship it with my team, on call included.",
};

export const facts = [
  { value: `${yearsSince("2023-07-01")}+ years`, label: "shipping production software at WasteHero" },
  { value: "2.5 years", label: "from QA intern to product owner" },
  { value: "4 countries", label: "of customers I work with directly" },
  { value: "5 engineers", label: "in my squad, where I run the 1:1s" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Featured case studies, strongest first. `story` links to /story/:id when a
// process page exists in storyline.json.
export const featured = [
  {
    id: "devhub",
    year: "2026",
    context: "Internal tool at WasteHero",
    title: "Dev Hub",
    summary:
      "An always-on home for my team's AI coding agents: persistent Claude Code sessions on an office workstation, driven from a desktop, web or phone client, so agent runs survive closed laptops and dropped Wi-Fi.",
    points: [
      "One-click environments: free ports, a git worktree, a database cloned from a golden dump, backend and frontend started",
      "Sign in with Slack, per-user session isolation, and live token and cost tracking for every session",
      "Runs as a self-healing Windows service, with onboarding and deploy docs I wrote for teammates",
    ],
    role: "Sole author · used by the team every day",
    stack: ["TypeScript", "Node.js", "Electron", "React", "WebSocket"],
    visual: { kind: "devhub" },
    links: [{ label: "How I built it", story: "devhub" }],
  },
  {
    id: "smartvision",
    year: "2025",
    context: "Bachelor's project · BEUMER Group × DPD",
    title: "Smart Vision",
    summary:
      "Real-time detection of parcels, fragile labels and tires on a warehouse sorting line, from the camera feed all the way to a live dashboard for the warehouse team.",
    points: [
      "Built the Kubernetes file watcher and queue that feed every new camera frame to the model",
      "YOLOv8 tracked in MLflow and served by MLServer on KServe; detections flow into Elasticsearch and Kibana",
      "Collected and labelled warehouse images from scratch and used active learning to make fragile-label detection reliable",
    ],
    role: "ML pipeline and deployment · team of two",
    stack: ["Python", "YOLOv8", "Kubernetes", "MLflow", "Elasticsearch"],
    visual: { kind: "image", src: smartvision, alt: "YOLOv8 detections drawn over parcels on a sorting line, next to the training log" },
    links: [
      { label: "Case study", story: "smartvision" },
      { label: "Project report", href: "/portfolio2.0/reports/ProjectReport.pdf" },
    ],
  },
  {
    id: "petfeeder",
    year: "2023",
    context: "VIA University College · team project",
    title: "PetFeeder",
    summary:
      "A smart pet feeder you control from your phone. I led the cloud team that built the backend connecting the app to the feeders in real time.",
    points: [
      "Spring Boot REST API for authentication, feeding schedules, notifications and history",
      "Live two-way link to the IoT feeders over WebSocket",
      "PostgreSQL with JPA, JWT auth, Docker, and continuous delivery to Azure with GitHub Actions",
    ],
    role: "Cloud team lead · team of four",
    stack: ["Java", "Spring Boot", "WebSocket", "PostgreSQL", "Azure"],
    visual: { kind: "image", src: petfeeder, alt: "PetFeeder web app landing page" },
    links: [
      { label: "Case study and video", story: "petfeeder" },
      { label: "Code", href: "https://github.com/Pet-Feeder-SEP4/PetFeeder" },
    ],
  },
];

export const moreProjects = [
  {
    id: "pnta",
    year: "2024",
    title: "Pnta",
    summary: "Nightlife app for Denmark: the backend, the manager platform and the marketing website.",
    role: "Backend lead",
    stack: ["Java", "Spring Boot", "PostgreSQL", "React", "TypeScript", "Docker", "Azure"],
    image: pnta,
    links: [
      { label: "Case study", story: "pnta" },
      { label: "Website code", href: "https://github.com/orgs/PantaRheiOrg/repositories" },
    ],
  },
  {
    id: "rigacup",
    year: "2024",
    title: "Riga Cup",
    summary: "Registration and scheduling platform for an international youth football tournament: database, APIs and authentication.",
    role: "Freelance, backend lead",
    stack: ["PHP", "SQL", "React"],
    image: rigacup,
    links: [
      { label: "Case study", story: "rigacup" },
      { label: "Live site", href: "https://www.rigacup.lv/" },
    ],
  },
  {
    id: "blackjack",
    year: "2024",
    title: "Blackjack AI",
    summary: "Trained and compared XGBoost and neural networks to learn the best move for any hand.",
    role: "Machine learning semester project",
    stack: ["Python", "TensorFlow", "scikit-learn", "XGBoost", "Jupyter"],
    image: blackjack,
    links: [
      { label: "Case study", story: "blackjack" },
      { label: "Notebook", href: "https://github.com/FuLLeNN/MLA1-A7/blob/master/blackjackModel.ipynb" },
    ],
  },
];

export const experience = [
  {
    company: "WasteHero",
    logo: whLogo,
    title: "Full-Stack Developer & Product Owner",
    place: "Aarhus, Denmark",
    start: "2023-07-01",
    dates: "Jul 2023 – Now",
    ladder: [
      { when: "Jul 2023", what: "QA intern" },
      { when: "Jan 2024", what: "Developer" },
      { when: "Jan 2026", what: "Product owner, billing & pricing" },
    ],
    points: [
      "Product owner for billing and pricing, the backbone of the platform: I own the backlog, run planning, refinement and reviews, and work directly with customers in Denmark, Norway, Finland and Qatar.",
      "Redesigned the products and pricing module end to end: a simpler product model, client-facing catalogue tables, and typed REST APIs with FastAPI and generated TypeScript clients.",
      "Ship and run what I build: production deploys, PostgreSQL migrations and indexing, invoicing on Celery, Sentry and Mezmo alerts, and a shared on-call rotation.",
      "Drove Insights as product owner: plain-language questions become dashboards over a customer's own data. The model only plans; the backend validates and runs every query.",
      "Onboard and mentor developers and interns, with regular one-to-ones across a squad of five.",
    ],
    stack: ["Python", "Django", "FastAPI", "PostgreSQL", "Celery", "React", "TypeScript", "GraphQL"],
  },
  {
    company: "GoClick",
    logo: gcLogo,
    title: "Full-Stack Developer Intern",
    place: "Madeira, Portugal",
    start: "2021-01-01",
    end: "2021-06-01",
    dates: "Jan – Jun 2021",
    points: [
      "Built a grocery delivery app for a supermarket chain: a Spring Boot backend, a React Native app and an admin web app for stock, orders and deliveries.",
      "Designed the REST APIs for stock, delivery tracking and order pickup, with JPA/Hibernate persistence and JWT-secured endpoints.",
      "Shipped it to Azure with Docker and CI/CD pipelines.",
    ],
    stack: ["Java", "Spring Boot", "React Native", "TypeScript", "Azure"],
  },
];

export const education = [
  { school: "VIA University College", degree: "BA in Software Engineering", place: "Horsens, Denmark" },
  { school: "Cristóvão Colombo", degree: "Informatics & Programming · GPA 17/20", place: "Madeira, Portugal" },
];

export const toolbox = [
  {
    label: "Every day",
    items: ["Python", "Django", "FastAPI", "PostgreSQL", "Celery", "TypeScript", "React", "GraphQL", "REST & OpenAPI", "AI coding agents"],
  },
  {
    label: "Shipped with",
    items: ["Java", "Spring Boot", "React Native", "Node.js", "Electron", "WebSocket", "Docker", "Kubernetes", "Azure", "PyTorch", "YOLOv8", "MLflow", "Elasticsearch", "n8n"],
  },
];

export const about = {
  paragraphs: [
    "I'm Jack, a software engineer living in Denmark since 2022. I joined WasteHero as a QA intern, learned the product inside out, and grew into the product owner of the system I used to test. So I care about both halves: building the right thing, and building it right.",
    "I'm happiest on software that touches the physical world: IoT pet feeders, warehouse cameras, garbage trucks moving on a live map. Off the clock it's football, music and travel.",
  ],
  facts: [
    { label: "Based in", value: "Aarhus, Denmark" },
    { label: "Before that", value: "Madeira, Portugal" },
    { label: "Languages", value: "English and Portuguese (fluent), Danish (A1)" },
    { label: "Coding since", value: "2018" },
  ],
};
