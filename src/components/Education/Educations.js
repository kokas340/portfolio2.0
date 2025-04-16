import React from "react";
import "./Educations.css"; // Ensure this path is correct
import Education from "./Education";
import pt from "../../images/pt.png";
import dk from "../../images/dk.png";
import gc from "../../images/gc.png";
import wh from "../../images/wh.png";
import monitor from "../../models/monitor.glb";
import monitor2 from "../../models/monitor2.glb";

function Educations() {
  return (
    <div className="container-fluid container-fluid-pattern3" id="education">
      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">Education 🎓</p>
            <hr className="custom-hr mb-3" />
            <div className="">
              <p className="subtitle2">
                My academic background reflects a strong foundation in software
                engineering, with hands-on experience gained through internships
                and industry collaborations. Each step has helped me grow
                technically, professionally, and personally.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center pb-5">
          <Education
            institute={"VIA UNIVERSITY"}
            location={"Horsens, Denmark"}
            degree={"Software Engineering"}
            date={"2023-Today"}
            flag={dk}
            companyName={"WasteHero"}
            icon={wh}
            model={monitor}
            experienceTitle={"STUDENT QA ENGINEER + 5 MONTH INTERN"}
            experienceDescription={
              "At WasteHero, I play a key role in ensuring product quality by leading the creation and execution of thorough test cases. I work closely with the development team to identify and resolve critical issues, directly contributing to stable and reliable releases. I also coordinate with both support and development teams to prioritize issues effectively, reduce friction, and keep product iterations moving forward smoothly. In addition, I contribute to automating frontend test flows using Cypress, helping us catch regressions early and speed up the QA cycle."
            }
          />

          <Education
            institute={"CRISTÓVÃO COLOMBO"}
            location={"Madeira, Portugal"}
            degree={"Informatics & Programming"}
            date={"2018-2021"}
            flag={pt}
            icon={gc}
            model={monitor2}
            companyName={"GoClick"}
            experienceTitle={"SOFTWARE DEVELOPER INTERN"}
            experienceDescription={
              "At GoClick, I took ownership of a full-stack delivery app built for a supermarket chain. I developed secure backend services using Spring Boot and implemented JWT-based authentication to manage access control. On the frontend, I used React Native to deliver a smooth, mobile-first experience with real-time delivery tracking and intuitive ordering flows. I also handled deployment through Azure, ensuring stability and scalability. This project strengthened my ability to design, build, and maintain cloud-based applications from end to end while collaborating closely with the team to meet real user needs."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Educations;
