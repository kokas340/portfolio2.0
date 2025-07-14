import React from "react";
import "./WorkList.css";
import Work from "./Work";
import wh from "../../images/wh.png";
import gc from "../../images/gc.png";
import monitor from "../../models/monitor.glb";
import monitor2 from "../../models/monitor2.glb";

function WorkList() {
  return (
    <div className="container-fluid container-fluid-pattern3" id="work">
      <div className="container" >
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

        <div className="row justify-content-center pb-5">
          <Work
            companyName={"WasteHero"}
            icon={wh}
            date="2023 - Today"
            model={monitor}
            experienceTitle={"Lead QA ENGINEER"}
            experienceDescription={
              "I started at WasteHero as a student worker, where I completed my internship and gained hands-on experience with QA processes. After transitioning to a full-time role, I was promoted to Lead QA Engineer. In this role, I manage and mentor other student QAs, helping them integrate into the team while ensuring high-quality delivery. I take ownership of end-to-end quality workflows—from defining test strategies and structured test cases to building automated test flows using Cypress. I work closely with developers and support teams to surface critical issues early, reduce bugs in production, and streamline release readiness."
            }
          />

          <Work
            companyName={"GoClick"}
            icon={gc}
            date="2023 - Today"
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
