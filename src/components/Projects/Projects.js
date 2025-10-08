import React from "react";
import "./Projects.css";
import Project from "./Project";
import { motion } from "framer-motion";
import projects from "./Projects.json";

function Projects() {

  return (
    <div className="container-fluid container-fluid-pattern22" id="projects">
      <div className="container">
        <div className="justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5 pbBig" style={{ position: 'relative', zIndex: 50 }}>
            <p className="titleMain">PROJECTS 💻</p>
            <hr className="custom-hr mb-3" />
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
