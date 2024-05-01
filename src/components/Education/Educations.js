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
    <div className="container-fluid container-fluid-pattern3">
      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">Education 🎓</p>
            <hr className="custom-hr" />
            <div className="">
              <p className="subtitle2">
                Here, you'll discover more about my educational journey,
                including my experiences and areas of expertise.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center pb-5">
          <Education
            institute={"VIA UNIVERSITY"}
            location={"Horsens, Denmark"}
            degree={"Software Engineering"}
            date={"2022-2025"}
            flag={dk}
            companyName={"WasteHero"}
            icon={wh}
            model={monitor}
            experienceTitle={"STUDENT QA ENGINEER + 5 MONTH INTERN"}
            experienceDescription={
              "Designed and executed meticulous test cases, identifying, and reporting bugs. Collaborating closely with developers, I enhanced product reliability and facilitated the delivery of high-quality software. Additionally, I took on the responsibility of 'translating' support tickets for developers, ensuring seamless communication and quick issue resolution."
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
              "Developed a supermarket delivery application. I designed and implemented a secure Spring Boot RESTful API with security features like JWT. Successfully deployed the API to AWS EC2 instance and also developed a user-friendly mobile app using React Native, connected with the API. Worked closely with designers to deliver a user friendly ecommerce platform."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Educations;
