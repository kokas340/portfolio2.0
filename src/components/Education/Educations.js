import React from "react";
import "./Educations.css";
import Education from "./Education";

function Educations() {
  return (
    <div className="container-fluid container-fluid-pattern3">
      <div className="container  " style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="title">Education</p>
            <hr className="custom-hr" />
          </div>
        </div>
        <div className="row justify-content-center pb-5">
         <Education institute={"VIA "} location={"Denmark"} degree={"Softa"} date={"2022-2025"}/>
         <Education institute={"VIA "} location={"Denmark"} degree={"Softa"} date={"2022-2025"}/>
        </div>
      </div>
    </div>
  );
}

export default Educations;
