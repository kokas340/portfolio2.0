import React from "react";
import "./Projects.css";
import Project from "./Project";
import pc1 from "../../images/pc1.png";
import pc2 from "../../images/pc2.png";
import blackJack from "../../images/bjImage.png";
import pnta from "../../images/pnta.png";

function Projects() {
  return (
    <div className="container-fluid  container-fluid-pattern2" id="projects">
      <div className="container  ">
        <div className=" justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5 pbBig">
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
                {" "}
                GitHub{" "}
              </a>{" "}
              .
            </p>
          </div>
          <Project
            hasUrl={true}
            imageSrc={blackJack}
            title="Blackjack AI ♠️"
            text="I developed a neural network model for playing the card game Blackjack as part of a semester project. The work involved preprocessing game data to train the model effectively, focusing on improving decision-making and performance during gameplay."
            buttonText="View Project"
            buttonLink="https://github.com/FuLLeNN/MLA1-A7/blob/master/blackjackModel.ipynb"
            button={true}
            technologies={[
              "Python",
              "TensorFlow",
              "NumPy",
              "Jupyter",
              "Scikit-Learn",
              "Matplotlib",
            ]}
          />
          <Project
            hasUrl={true}
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
            hasUrl={false}
            imageSrc={pnta}
            title="Pnta 🎉"
            text="This app connects people across Denmark who enjoy bars and clubs. I designed and implemented the backend architecture and managed integration with the management platform. I also handled the website's design and implementation. "
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
            hasUrl={true}
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
