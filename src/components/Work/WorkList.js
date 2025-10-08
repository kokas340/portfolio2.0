import React from "react";
import "./WorkList.css";
import Work from "./Work";
import wh from "../../images/wh.png";
import gc from "../../images/gc.png";
import monitor from "../../models/monitor.glb";
import monitor2 from "../../models/monitor2.glb";

function WorkList() {
  return (
    <div className="container-fluid container-fluid-pattern44" id="work">
      <div className="container " >
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">Work Experience 💼</p>
            <hr className="custom-hr mb-3" />
            <div className="">
              <p className="subtitle2">
                My professional journey involves working with real-world software systems, collaborating with cross-functional teams, and delivering impactful solutions. These roles have helped me grow technically, professionally, and personally.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid " >
        <div className="row justify-content-center pb-5">
          <Work
            companyName={"WasteHero"}
            icon={wh}
            date="07/2023 – PRESENT"
            model={monitor}
            experienceTitle={"FRONTEND SOFTWARE DEVELOPER"}
            experienceDescription={
              "Started at WasteHero as a QA intern, performing manual tests and creating automated checks to support the development team. Transitioned to a part-time QA role, mentoring new student QAs and helping improve test coverage and workflows. Later moved into full-time frontend development, working with React and TypeScript to build reusable components, fix bugs, and integrate APIs. Collaborated closely with backend developers to deliver new customer-facing features, improve code maintainability, and enhance overall user experience while ensuring high-quality releases."
            }
          />
          <Work
            companyName={"GoClick"}
            icon={gc}
            date="01/2021 – 06/2021"
            model={monitor2}
            experienceTitle={"FULLSTACK SOFTWARE DEVELOPER INTERN"}
            experienceDescription={
              "At GoClick, I took ownership of a full-stack delivery app built for a supermarket chain. I developed secure backend services using Spring Boot and implemented JWT-based authentication to manage access control. On the frontend, I used React Native to deliver a smooth, mobile-first experience with real-time delivery tracking and intuitive ordering flows. I also handled deployment through Azure, ensuring stability and scalability. This project strengthened my ability to design, build, and maintain cloud-based applications from end to end while collaborating closely with the team to meet real user needs."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default WorkList;
