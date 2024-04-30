import React from "react";
import "./Projects.css";
import Project from "./Project";
import pc1 from "../../images/pc1.png";
import pc2 from "../../images/pc2.png";

function Projects() {
  return (
    <div className="container-fluid  container-fluid-pattern2">
      <div className="container  " style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">PROJECTS 💻</p>
            <hr className="custom-hr" />
            <div className="">
              <p className="subtitle2">
                Here, you'll discover some of the projects I've been involved
                in. Additional projects will be showcased on GitHub.
              </p>
            </div>
          </div>
          <Project
            imageSrc={pc2}
            title="Pet Feeder 🦴"
            text="As the team leader for the cloud team, I spearheaded the development of an API connecting the Arduino from the IoT team and facilitating bidirectional data exchange with the frontend team."
            buttonText="View Project"
            buttonLink="https://github.com/Pet-Feeder-SEP4/PetFeeder"
            technologies={[
              "Java",
              "Spring",
              "Websockets",
              "PostgreSQL",
              "Docker",
              "Azure",
            ]}
          />
          <Project
            imageSrc={pc1}
            title="Riga Cup ⚽"
            text="Responsible for crafting the backend infrastructure, I orchestrated the management of tournaments and teams within this system for Riga Cup"
            buttonText="Visit Website"
            buttonLink="https://www.rigacup.lv/"
            technologies={["PHP", "SQL", "REACT"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
