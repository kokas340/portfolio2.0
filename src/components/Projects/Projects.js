import React from "react";
import "./Projects.css";
import Project from "./Project";
import pc1 from "../../images/pc1.png";
import pc2 from "../../images/pc2.png";
import pnta from "../../images/pnta.png";

function Projects() {
  return (
    <div className="container-fluid  container-fluid-pattern2">
      <div className="container  ">
        <div className=" justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">PROJECTS 💻</p>
            <hr className="custom-hr" />
            <p className="subtitle2">
              Here, you'll discover some of the projects I've been involved in.
              Additional projects will be showcased on GitHub.
            </p>
          </div>
          <Project
            imageSrc={pc2}
            title="Pet Feeder 🦴"
            text="As the team leader for the cloud team, I spearheaded the development of an API connecting the Arduino from the IoT team and facilitating bidirectional data exchange with the frontend team."
            buttonText="View Project"
            buttonLink="https://github.com/Pet-Feeder-SEP4/PetFeeder"
            button={true}
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
            imageSrc={pnta}
            title="Pnta 🎉"
            text="
         
This app connects people across Denmark who enjoy bars and clubs. I designed and implemented the backend architecture and managed integration with the management platform. I also handled the website's design and implementation. "
            buttonText="Comming soon"
            button={false}
            buttonLink=""
            technologies={[
              "Java",
              "Spring",
              "Websockets",
              "PostgreSQL",
              "TypeScript",
              "React",
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
            button={true}
            technologies={["PHP", "SQL", "REACT"]}
          />
        </div>
      </div>
    </div>
  );
}

export default Projects;
