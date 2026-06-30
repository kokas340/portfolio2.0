import React from "react";
import "./Educations.css";
import Education from "./Education";
import pt from "../../images/pt.png";
import dk from "../../images/dk.png";

function Educations() {
  return (
    <div className="container-fluid-pattern33 w-full px-3" id="education">
      <div className="mx-auto w-full max-w-[1140px] px-3" >
        <div className="flex flex-wrap justify-center pb-12">
          <div className="w-full text-center mb-12">
            <p className="titleMain">Education 🎓</p>
            <hr className="custom-hr mb-4" />
            <div className="">
              <p className="subtitle2">
                My academic journey has equipped me with strong technical foundations
                and practical project experience. From software development to machine learning,
                I’ve applied my skills to real-world challenges through hands-on academic projects.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-3" >
        <div className="flex flex-wrap justify-center pb-12">
          <Education
            institute={"VIA University College"}
            location={"Horsens, Denmark"}
            degree={"BA in Software Engineering"}
            date={"2023 - 2025"}
            flag={dk}
            description={
              "Graduated with a Bachelor's in Software Engineering, specializing in Machine Learning. My bachelor project was developed in collaboration with Beumer Group, where I built an object detection system to automatically identify fragile labels in logistics packages. The solution improved automation in handling sensitive goods and reduced manual errors in logistics processes. Find in project section."
            }
          />

          <Education
            institute={"Cristóvão Colombo"}
            location={"Madeira, Portugal"}
            degree={"Informatics & Programming"}
            date={"2018 - 2021"}
            flag={pt}
            description={
              "At Cristóvão Colombo, I developed a supermarket management system as a final project. It included two applications: one for managers to control stock and deliveries, and another for users to order products. The system used Java Spring Boot for the backend, React for the web management tool, and React Native for the mobile app. This project taught me how to design and implement complete multi-platform software solutions."
            }
          />
        </div>
      </div>


    </div>
  );
}

export default Educations;
