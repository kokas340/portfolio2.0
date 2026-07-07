import React from "react";
import {
  MonitorSmartphone,
  Server,
  Database,
  Cloud,
  Brain,
  Wrench,
} from "lucide-react";
import "./About.css";

const stack = [
  {
    name: "Frontend",
    Icon: MonitorSmartphone,
    items: [
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
      "Bootstrap",
      "Redux",
      "Framer Motion",
      "Material UI",
    ],
  },
  {
    name: "Backend",
    Icon: Server,
    items: [
      "Java",
      "Spring Boot",
      "C#",
      ".NET",
      "Node.js",
      "Express.js",
      "PHP",
      "CodeIgniter",
      "GraphQL",
    ],
  },
  {
    name: "Databases",
    Icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
  },
  {
    name: "DevOps & Cloud",
    Icon: Cloud,
    items: ["Docker", "Kubernetes", "Azure", "GitHub Actions", "Nginx", "Jenkins"],
  },
  {
    name: "ML & Data",
    Icon: Brain,
    items: [
      "PyTorch",
      "YOLOv9",
      "OpenCV",
      "SuperGradients",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    name: "Tools",
    Icon: Wrench,
    items: ["Git", "GitHub", "Jupyter", "PyQt5", "LabelImg", "TQDM"],
  },
];

function About() {
  const age =
    new Date().getFullYear() - 2002 - (new Date().getMonth() > 8 ? 0 : 1);

  return (
    <section id="about" className="about-section container-fluid-pattern55">
      <div className="mx-auto w-full max-w-[1140px] px-3 py-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Text Section */}
          <div>
            <h2 className="about-title">About Me 👨🏻‍💻</h2>
            <p className="about-text mt-4">
              I'm a <strong>{age}-year-old software engineer</strong> based in{" "}
              <strong>Aarhus, Denmark</strong>. My journey into tech began in
              high school with a focus on Informatics &amp; Programming, and I
              hold a Bachelor's degree in <strong>Software Engineering</strong>{" "}
              from VIA University College.
            </p>
            <p className="about-text mt-4">
              Today I work as a{" "}
              <strong>Product Owner and full-stack developer</strong> at
              WasteHero, shaping the product roadmap while still building the
              features behind it. Along the way I've led teams as a{" "}
              <strong>Team Leader</strong> and <strong>Scrum Master</strong>,
              shipping everything from machine-learning systems to full-stack
              web and mobile apps, work that's grown me as much as a
              communicator as it has as an engineer.
            </p>
            <p className="about-text mt-4">
              I care most about <strong>collaboration</strong>: sharing
              knowledge and pulling toward a shared goal is the part of software
              I enjoy most. Outside of coding, I'm into{" "}
              <strong>music, sports, and traveling</strong>: anything that
              sparks creativity or gets me moving.
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="tech-stack">
            <h4 className="skills-title">Tech Stack 💻</h4>
            <div className="tech-groups">
              {stack.map(({ name, Icon, items }) => (
                <div className="tech-group" key={name}>
                  <div className="tech-group-head">
                    <Icon size={17} className="tech-group-icon" />
                    <span className="tech-group-title">{name}</span>
                  </div>
                  <div className="tech-group-chips">
                    {items.map((t) => (
                      <span className="tech-chip" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
