import React, { useState, useEffect } from "react";
import "./Education.css";
import ThreeScene from "../ThreeScene/ThreeScene";
import moveIcon from "../../images/move.png";
function Education({
  degree,
  institute,
  location,
  date,
  flag,
  companyName,
  experienceTitle,
  experienceDescription,
  icon,
  model,
  
}) {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowIcon(window.innerWidth > 558);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="col-xl-6 mb-5 ">
      <p className="degree">
        {degree} - <span className="institute">{institute}</span>
      </p>

      <p className="date">
        {date} - <span className="location">{location}</span>
        <img src={flag} alt="Flag" className="flag-icon" />
      </p>

      <div className="internship-details">
        <p className="experience-title">{experienceTitle}</p>
        <p className="comapny">
          {" "}
          {companyName}{" "}
          <img src={icon} alt="Company Logo" className="company-icon" />
        </p>
        <div style={{ position: "relative" }}>
          {showIcon && (
            <img
              src={moveIcon}
              alt="Move Icon"
              className="move-icon"
              style={{
                position: "absolute",
                width: "30px",
                right: 90,
                top:30,
                pointerEvents: "none",
              }}
            />
          )}
          <ThreeScene model={model} />
        </div>

        <p className="experience-description wed">{experienceDescription}</p>
      </div>
    </div>
  );
}

export default Education;
