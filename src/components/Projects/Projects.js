import React from "react";
import "./Projects.css";
import Project from "./Project";
import { motion } from "framer-motion";
import projects from "./Projects.json";

function Projects() {

  return (
    <div className="container-fluid-pattern22 w-full px-3" id="projects">
      <div className="mx-auto w-full max-w-[1140px] px-3">
        <div className="pb-12">
          <div className="w-full text-center mb-12 pbBig" style={{ position: 'relative', zIndex: 50 }}>
            <p className="titleMain">PROJECTS 💻</p>
            <hr className="custom-hr mb-4" />
            <p className="subtitle2">
              Here, you'll discover some of the projects I've been involved in.
              Additional projects will be showcased on{" "}
              <a
                href="https://github.com/kokas340"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-link"
              >
                GitHub
              </a>.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 50 }}>
            {projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay:0.2 }}
                className="project-stack"
                style={{ zIndex: projects.length - index }}
              >
                <Project {...proj} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
