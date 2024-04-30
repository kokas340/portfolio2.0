import React from "react";
import "./Education.css";

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
}) {
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
        <p className="experience-description wed">{experienceDescription}</p>
      </div>
    </div>
  );
}

export default Education;
