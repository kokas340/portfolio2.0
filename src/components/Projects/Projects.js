import React from "react";
import "./Projects.css";
import Project from "./Project";
import pc1 from "../../images/pc1.png";

function Projects() {
  return (
    <div className="container-fluid  container-fluid-pattern2">
      <div className="container  " style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="title">PROJECTS</p>
            <hr className="custom-hr" />
          </div>
          <Project
            imageSrc={pc1}
            title="Riga Cup"
            text="Responsible for crafting the backend infrastructure, I orchestrated the management of tournaments and teams within this system for Riga Cup"
            buttonText="View Project"
            buttonLink="https://www.rigacup.lv/"
            technologies={["PHP", "SQL", "REACT"]}
          />
          <Project
            imageSrc={pc1}
            title="Riga Cup"
            text="Responsible for crafting the backend infrastructure, I orchestrated the management of tournaments and teams within this system for Riga Cup"
            buttonText="View Project"
            buttonLink="https://www.rigacup.lv/"
            technologies={["PHP", "SQL", "REACT"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
