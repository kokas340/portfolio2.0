import React from "react";
import "./FindMe.css";
import image1 from "../../images/image1.png";
import image2 from "../../images/image2.png";
import image3 from "../../images/image3.png";
import image4 from "../../images/image4.png";

function FindMe() {
  return (
    <div className="container-fluid-pattern2">
      <div className="pb-12">
        <div className="w-full text-center mb-12">
          <p className="titleMain">Contact Me</p>
          <hr className="custom-hr" />
        </div>
      </div>
      <div className="container-fluid-pattern3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="text-center">
          <a
            href="https://www.linkedin.com/in/jack-spinola-0a835927b/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={image1} alt="LinkedIn" className="imageContact" />
          </a>
        </div>
        <div className="text-center">
          <a
            href="https://github.com/kokas340"
            target="_blank"
            rel="noreferrer"
          >
            <img src={image2} alt="GitHub" className="imageContact" />
          </a>
        </div>
        <div className="text-center">
          <a
            href="mailto:jackspinola198@hotmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src={image3} alt="Email" className="imageContact" />
          </a>
        </div>
        <div className="text-center">
          <a
            href="https://api.whatsapp.com/send/?phone=4591450703&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noreferrer"
          >
            <img src={image4} alt="Phone" className="imageContact" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FindMe;
