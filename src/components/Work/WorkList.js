import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin, Briefcase, Clock } from "lucide-react";
import "./WorkList.css";
import wh from "../../images/wh.png";
import gc from "../../images/gc.png";

const experiences = [
  {
    company: "WasteHero",
    icon: wh,
    title: "Product Owner & Full-Stack Developer",
    date: "07/2023 – Present",
    current: true,
    location: "Aarhus, Denmark",
    type: "Full-time",
    tenure: "2+ years",
    tech: ["React", "TypeScript", "REST APIs", "QA Automation", "Agile"],
    description:
      "Started at WasteHero as a QA intern, running manual tests and building automated checks to support the development team. Grew into a part-time QA role, mentoring new student QAs and improving test coverage and workflows. From there I moved into full-time frontend development with React and TypeScript, building reusable components, fixing bugs, and integrating APIs alongside the backend team. Today I work as a Product Owner and full-stack developer, shaping the product roadmap and priorities while still building the features that bring it to life.",
  },
  {
    company: "GoClick",
    icon: gc,
    title: "Fullstack Software Developer Intern",
    date: "01/2021 – 06/2021",
    location: "Madeira, Portugal",
    type: "Internship",
    tenure: "6 months",
    tech: ["Spring Boot", "React Native", "JWT", "Azure"],
    description:
      "At GoClick, I took ownership of a full-stack delivery app built for a supermarket chain. I developed secure backend services using Spring Boot and implemented JWT-based authentication to manage access control. On the frontend, I used React Native to deliver a smooth, mobile-first experience with real-time delivery tracking and intuitive ordering flows. I also handled deployment through Azure, ensuring stability and scalability. This project strengthened my ability to design, build, and maintain cloud-based applications from end to end while collaborating closely with the team to meet real user needs.",
  },
];

function WorkList() {
  const [active, setActive] = useState(0);
  const role = experiences[active];

  return (
    <div className="container-fluid-pattern44 w-full px-3" id="work">
      <div className="mx-auto w-full max-w-[1140px] px-3">
        <div className="flex flex-wrap justify-center pb-12">
          <div className="w-full text-center mb-12">
            <p className="titleMain">Work Experience 💼</p>
            <hr className="custom-hr mb-4" />
            <p className="subtitle2">
              My professional journey involves working with real-world software
              systems, collaborating with cross-functional teams, and delivering
              impactful solutions. These roles have helped me grow technically,
              professionally, and personally.
            </p>
          </div>

          <div className="work-panel">
            {/* Left rail — company selector + quick facts */}
            <div className="work-rail">
              <div className="work-tabs" role="tablist" aria-label="Work experience">
                {experiences.map((exp, i) => (
                  <button
                    key={exp.company}
                    role="tab"
                    aria-selected={i === active}
                    className={`work-tab ${i === active ? "is-active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <img
                      src={exp.icon}
                      alt={`${exp.company} logo`}
                      className="work-tab-icon"
                    />
                    <span className="work-tab-text">
                      <span className="work-tab-company">{exp.company}</span>
                      <span className="work-tab-role">{exp.title}</span>
                    </span>
                    {exp.current && (
                      <span className="work-tab-current">Current</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="work-rail-facts">
                <dl className="work-facts">
                  <div className="work-fact">
                    <MapPin size={15} />
                    <span>{role.location}</span>
                  </div>
                  <div className="work-fact">
                    <Briefcase size={15} />
                    <span>{role.type}</span>
                  </div>
                  <div className="work-fact">
                    <Clock size={15} />
                    <span>{role.tenure}</span>
                  </div>
                </dl>

                <p className="work-rail-label">Stack</p>
                <div className="work-rail-tech">
                  {role.tech.map((t) => (
                    <span className="work-chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right detail — animates on selection */}
            <div className="work-detail">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h3 className="experience-title">{role.title}</h3>
                  <span className="company-name">{role.company}</span>
                  <div className="work-meta">
                    <span className="work-meta-item">
                      <CalendarDays size={16} className="work-icon" />
                      {role.date}
                    </span>
                    {role.current && (
                      <span className="work-badge">Current</span>
                    )}
                  </div>
                  <p className="experience-description">{role.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkList;
